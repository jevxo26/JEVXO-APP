"use client";

import React, { use, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  Briefcase,
  Umbrella,
  User,
  Activity,
  AlertCircle,
  Target,
  Edit,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  useGetDeductionByIdQuery,
  useDeleteDeductionMutation,
  useApplyDeductionMutation,
} from "@/api/deductionApi";
import AppLayout from "@/components/layout/AppLayout";
import PrivateRoute from "@/components/auth/PrivateRoute";
import { motion } from "framer-motion";
import { toast } from "sonner";
import CreateDeductionDialog from "@/components/admin/payroll/CreateDeductionDialog";

export default function DeductionDetailsPage({ params }) {
  const router = useRouter();
  const { id } = use(params);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  const { 
    data: deductionResponse, 
    isLoading, 
    error 
  } = useGetDeductionByIdQuery(id);

  const [deleteDeduction, { isLoading: isDeleting }] = useDeleteDeductionMutation();
  const [applyDeduction, { isLoading: isApplying }] = useApplyDeductionMutation();

  const deduction = Array.isArray(deductionResponse) 
    ? deductionResponse[0] 
    : deductionResponse?.data || deductionResponse;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white p-4 md:p-8 flex items-center justify-center">
        <div className="text-white/60">Loading deduction details...</div>
      </div>
    );
  }

  if (error || !deduction) {
    return (
      <div className="min-h-screen bg-black text-white p-4 md:p-8 flex items-center justify-center">
        <div className="text-red-400">Failed to load deduction details</div>
      </div>
    );
  }

  const team = deduction.team || {};
  const fullName = `${team.firstName || ""} ${team.lastName || ""}`.trim() || "Unknown";
  const initials = fullName.split(" ").map(n => n[0]).join("").toUpperCase();
  
  const getTypeBadge = (type) => {
    if (type === "PROJECT_PENALTY") {
      return (
        <Badge className="bg-orange-500/15 text-orange-200 border border-orange-400/60 font-medium flex items-center gap-1.5 px-3 py-1 text-sm">
          <Briefcase className="w-3.5 h-3.5" />
          Project Penalty
        </Badge>
      );
    }
    if (type === "LEAVE_DEDUCTION") {
      return (
        <Badge className="bg-blue-500/15 text-blue-200 border border-blue-400/60 font-medium flex items-center gap-1.5 px-3 py-1 text-sm">
          <Umbrella className="w-3.5 h-3.5" />
          Leave Deduction
        </Badge>
      );
    }
    return (
      <Badge className="bg-purple-500/15 text-purple-200 border border-purple-400/60 font-medium flex items-center gap-1.5 px-3 py-1 text-sm">
        <FileText className="w-3.5 h-3.5" />
        Manual Deduction
      </Badge>
    );
  };

  const getStatusBadge = (payrollId) => {
     if (payrollId) {
        return (
          <Badge className="bg-emerald-500/15 text-emerald-200 border border-emerald-400/60 font-medium flex items-center gap-1.5 px-3 py-1 text-sm">
            <CheckCircle className="w-3.5 h-3.5" />
            Applied to Payroll
          </Badge>
        );
     }
     return (
        <Badge className="bg-yellow-500/15 text-yellow-200 border border-yellow-400/60 font-medium flex items-center gap-1.5 px-3 py-1 text-sm">
          <Clock className="w-3.5 h-3.5" />
          Pending Application
        </Badge>
     );
  };

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting deduction...");
    try {
      await deleteDeduction(id).unwrap();
      toast.success("Deduction deleted successfully", { id: toastId });
      router.push("/admin/payroll");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete deduction", { id: toastId });
    }
  };

  const handleApply = async () => {
    const toastId = toast.loading("Applying deduction to payroll...");
    try {
      await applyDeduction(id).unwrap();
      toast.success("Deduction applied to payroll successfully", { id: toastId });
    } catch (error) {
      toast.error(error?.data?.message || "Failed to apply deduction", { id: toastId });
    }
  };

  return (
    <PrivateRoute>
      <AppLayout>
        <div className="min-h-screen text-white p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="text-white/70 hover:text-[#EFFC76] hover:bg-white/5"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to List
              </Button>

              {/* Action Buttons */}
              {!deduction.payrollId && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditDialogOpen(true)}
                    className="border-white/10 text-white hover:bg-white/10"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleApply}
                    disabled={isApplying}
                    className="border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    {isApplying ? "Applying..." : "Apply to Payroll"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="border-rose-500/20 text-rose-400 hover:bg-rose-500/10"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    {isDeleting ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {/* Title Section */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">Deduction Details</h1>
                  <p className="text-white/60">
                    Created on {new Date(deduction.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                    {getTypeBadge(deduction.type)}
                    {getStatusBadge(deduction.payrollId)}
                </div>
              </div>

              {/* Main Info Card */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-6 md:p-8 space-y-8">
                  
                  {/* Amount Section */}
                  <div className="flex flex-col items-center justify-center py-6 border-b border-white/10">
                    <span className="text-white/50 uppercase tracking-wider text-sm font-medium mb-2">Total Amount</span>
                    <div className="text-5xl font-bold text-rose-400 flex items-center">
                        <span>-${Number(deduction.amount).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Employee Info */}
                    <div className="space-y-4">
                        <h3 className="text-white/50 uppercase tracking-wider text-xs font-semibold flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Employee
                        </h3>
                        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                            <Avatar className="w-12 h-12 border border-white/10">
                                <AvatarImage src={team.profileImage} />
                                <AvatarFallback className="bg-[#EFFC76]/20 text-[#EFFC76] font-bold">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-bold text-lg text-white">{fullName}</div>
                                <div className="text-sm text-white/50">{team.position || "No Position"}</div>
                                <div className="text-xs text-white/40 mt-1">{team.email}</div>
                            </div>
                        </div>
                    </div>

                    {/* Meta Info */}
                    <div className="space-y-4">
                        <h3 className="text-white/50 uppercase tracking-wider text-xs font-semibold flex items-center gap-2">
                             <Activity className="w-4 h-4" />
                             Details
                        </h3>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-white/60 text-sm">Deduction Date</span>
                                <span className="text-white font-medium">
                                    {deduction.date ? new Date(deduction.date).toLocaleDateString() : "N/A"}
                                </span>
                            </div>
                             <Separator className="bg-white/10" />
                            <div className="flex justify-between items-center">
                                <span className="text-white/60 text-sm">Type</span>
                                <span className="text-white font-medium capitalize">
                                    {deduction.type?.replace('_', ' ').toLowerCase()}
                                </span>
                            </div>
                        </div>
                    </div>
                  </div>

                  {/* Context Info (Project/Task) */}
                  {(deduction.projectId || deduction.taskId) && (
                      <div className="space-y-4 pt-4">
                           <h3 className="text-white/50 uppercase tracking-wider text-xs font-semibold flex items-center gap-2">
                                <Target className="w-4 h-4" />
                                Context
                           </h3>
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {deduction.projectId && (
                                    <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                        <div className="text-xs text-white/40 mb-1 uppercase">Project</div>
                                        <div className="font-medium text-white flex items-center gap-2">
                                            <Briefcase className="w-4 h-4 text-[#EFFC76]" />
                                            {deduction.project?.name || `Project #${deduction.projectId}`}
                                        </div>
                                    </div>
                                )}
                                {deduction.taskId && (
                                     <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                        <div className="text-xs text-white/40 mb-1 uppercase">Task</div>
                                        <div className="font-medium text-white flex items-center gap-2">
                                            <FileText className="w-4 h-4 text-[#EFFC76]" />
                                            {deduction.task?.title 
                                              ? `#${deduction.taskId}: ${deduction.task.title}` 
                                              : `Task #${deduction.taskId}`}
                                        </div>
                                    </div>
                                )}
                           </div>
                      </div>
                  )}

                  {/* Reason Section */}
                  <div className="space-y-4 pt-4">
                    <h3 className="text-white/50 uppercase tracking-wider text-xs font-semibold flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        Reason
                    </h3>
                    <div className="bg-rose-500/5 border border-rose-500/20 p-6 rounded-xl">
                        <p className="text-white/90 leading-relaxed">
                            {deduction.reason || "No reason provided."}
                        </p>
                    </div>
                  </div>

                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>

        {/* Edit Dialog */}
        <CreateDeductionDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          editingDeduction={deduction}
        />
      </AppLayout>
    </PrivateRoute>
  );
}
