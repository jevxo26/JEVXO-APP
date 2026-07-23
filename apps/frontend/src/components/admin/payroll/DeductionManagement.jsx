"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useGetAllDeductionsQuery,
  useDeleteDeductionMutation,
  useApplyDeductionMutation,
} from "@/api/deductionApi";
import { toast } from "sonner";
import {
  Search,
  Trash2,
  Edit,
  AlertCircle,
  DollarSign,
  Calendar,
  FileText,
  Briefcase,
  Umbrella,
  User,
  MoreHorizontal,
  CheckCircle,
} from "lucide-react";
import CreateDeductionDialog from "./CreateDeductionDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * DeductionManagement Component
 * 
 * Displays and manages all payroll deductions in the system.
 * Features:
 * - View all deductions with employee, amount, reason, and type
 * - Filter deductions by employee name or reason
 * - Create new deductions (project penalties, leave deductions, manual)
 * - Delete deductions
 * - Visual indicators for deduction types
 * 
 * Integrates with:
 * - Projects (for project penalties)
 * - Leave Management (for leave deductions)
 * - Payroll (deductions are applied to payroll calculations)
 */
export default function DeductionManagement() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDeduction, setEditingDeduction] = useState(null);
  const { data: deductions = [], isLoading } = useGetAllDeductionsQuery();
  const [deleteDeduction, { isLoading: isDeleting }] = useDeleteDeductionMutation();
  const [applyDeduction] = useApplyDeductionMutation();

  /**
   * Handle deduction deletion
   * Removes a deduction from the system
   */
  const handleDelete = async (deduction) => {
    const toastId = toast.loading(`Deleting deduction...`);
    try {
      await deleteDeduction(deduction.id).unwrap();
      toast.success(`Deduction removed successfully`, { id: toastId });
    } catch (error) {
      toast.error(error?.data?.message || `Failed to delete deduction`, {
        id: toastId,
      });
    }
  };

  const handleApply = async (deduction) => {
    const toastId = toast.loading(`Applying deduction...`);
    try {
      await applyDeduction(deduction.id).unwrap();
      toast.success(`Deduction applied to payroll successfully`, { id: toastId });
    } catch (error) {
      toast.error(error?.data?.message || `Failed to apply deduction`, {
        id: toastId,
      });
    }
  };

  // Currency formatter for consistent money display
  const formatter = useMemo(
    () =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    []
  );

  /**
   * Transform deductions data for table display
   * Extracts team member info, formats amounts, and categorizes types
   */
  const tableRows = useMemo(() => {
    return deductions.map((d) => {
      const team = d.team || {};
      const name =
        `${team.firstName || ""} ${team.lastName || ""}`.trim() || "Unknown";
      const role = team.position || "-";
      const avatar = team.profileImage || "";
      const amount = Number(d.amount || 0);
      const reason = d.reason || "No reason provided";
      const type = d.type || "MANUAL";
      const date = d.date ? new Date(d.date).toLocaleDateString() : "-";
      const projectName = d.project?.name || null;
      const leaveType = d.leave?.type || null;

      return {
        id: d.id,
        name,
        role,
        avatar,
        amount: formatter.format(amount),
        amountRaw: amount,
        reason,
        type,
        date,
        projectName,
        leaveType,
        payrollId: d.payrollId,
        teamId: d.teamId, // Need original IDs for editing
        projectId: d.projectId,
      };
    });
  }, [deductions, formatter]);

  /**
   * Filter deductions based on search term
   * Searches across employee name, role, and reason
   */
  const filteredData = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return tableRows.filter(
      (deduction) =>
        deduction.name.toLowerCase().includes(q) ||
        deduction.role.toLowerCase().includes(q) ||
        deduction.reason.toLowerCase().includes(q)
    );
  }, [searchTerm, tableRows]);

  /**
   * Get badge styling based on deduction type
   */
  const getTypeBadge = (type, projectName, leaveType) => {
    if (type === "PROJECT_PENALTY") {
      return (
        <Badge className="bg-orange-500/15 text-orange-200 border border-orange-400/60 font-medium flex items-center gap-1">
          <Briefcase className="w-3 h-3" />
          Project Penalty
          {projectName && (
            <span className="text-xs opacity-70">({projectName})</span>
          )}
        </Badge>
      );
    }
    if (type === "LEAVE_DEDUCTION") {
      return (
        <Badge className="bg-blue-500/15 text-blue-200 border border-blue-400/60 font-medium flex items-center gap-1">
          <Umbrella className="w-3 h-3" />
          Leave Deduction
          {leaveType && (
            <span className="text-xs opacity-70">({leaveType})</span>
          )}
        </Badge>
      );
    }
    return (
      <Badge className="bg-purple-500/15 text-purple-200 border border-purple-400/60 font-medium flex items-center gap-1">
        <FileText className="w-3 h-3" />
        Manual
      </Badge>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header with Search and Create Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:max-w-sm bg-white/5 border-none rounded-lg px-3 py-1 shadow-sm focus-within:ring-1 focus-within:ring-[#EFFC76] transition-all">
          <Search className="w-4 h-4 text-white/40" />
          <Input
            type="text"
            placeholder="Search deductions..."
            className="border-0 bg-transparent shadow-none focus-visible:ring-0 px-0 h-8 text-sm text-white placeholder:text-white/40 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <CreateDeductionDialog 
          open={isDialogOpen}
          editingDeduction={editingDeduction} 
          onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) setEditingDeduction(null);
          }}
        />
      </div>

      {/* Deductions Table */}
      <div className="bg-[#1A1A1A] rounded-xl sm:rounded-2xl overflow-hidden overflow-x-auto border border-white/5">
        <Table>
          <TableHeader className="bg-[#1A1A1A]">
            <TableRow className="border-white/5 hover:bg-transparent">
              <TableHead className="w-[200px] sm:w-[250px] text-[#EFFC76] font-bold uppercase text-xs sm:text-sm py-5">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#EFFC76]" />
                  Employee
                </div>
              </TableHead>
              <TableHead className="text-[#EFFC76] font-bold uppercase text-xs sm:text-sm py-5">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#EFFC76]" />
                  Amount
                </div>
              </TableHead>
              <TableHead className="text-[#EFFC76] font-bold uppercase text-xs sm:text-sm py-5">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#EFFC76]" />
                  Reason
                </div>
              </TableHead>
              <TableHead className="text-[#EFFC76] font-bold uppercase text-xs sm:text-sm py-5">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-[#EFFC76]" />
                  Type
                </div>
              </TableHead>
              <TableHead className="text-[#EFFC76] font-bold uppercase text-xs sm:text-sm py-5">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#EFFC76]" />
                  Date
                </div>
              </TableHead>
              <TableHead className="text-right text-[#EFFC76] font-bold uppercase text-xs sm:text-sm py-5">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-white/60 text-sm"
                >
                  Loading deductions...
                </TableCell>
              </TableRow>
            ) : filteredData.length > 0 ? (
              filteredData.map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-white/5 cursor-pointer transition-colors border-white/5 group"
                  onClick={() => router.push(`/admin/payroll/deductions/${row.id}`)}
                >
                  {/* Employee Info */}
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Avatar className="w-8 h-8 sm:w-9 sm:h-9">
                        <AvatarImage src={row.avatar} />
                        <AvatarFallback className="bg-[#EFFC76]/20 text-[#EFFC76] text-xs sm:text-sm">
                          {row.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-white text-xs sm:text-sm truncate max-w-[100px] sm:max-w-none group-hover:text-[#EFFC76] transition-colors">
                          {row.name}
                        </div>
                        <div className="text-[10px] sm:text-xs text-white/60 truncate max-w-[100px] sm:max-w-none group-hover:text-[#EFFC76]/70 transition-colors">
                          {row.role}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* Amount */}
                  <TableCell className="text-rose-300 font-bold text-xs sm:text-sm whitespace-nowrap group-hover:text-rose-200 transition-colors">
                    -{row.amount}
                  </TableCell>

                  {/* Reason */}
                  <TableCell className="text-white/80 text-xs sm:text-sm max-w-[200px] truncate group-hover:text-white transition-colors">
                    {row.reason}
                  </TableCell>

                  {/* Type Badge */}
                  <TableCell>
                    {getTypeBadge(row.type, row.projectName, row.leaveType)}
                  </TableCell>

                  {/* Date */}
                  <TableCell className="text-white/60 text-xs sm:text-sm whitespace-nowrap group-hover:text-white/80 transition-colors">
                    {row.date}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-2">
                      {!row.payrollId ? (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4 text-white/60" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-[#1A1A1A] border-white/10 text-white">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              className="focus:bg-white/10 focus:text-white cursor-pointer"
                              onClick={() => {
                                setEditingDeduction(deductions.find(d => d.id === row.id));
                                setIsDialogOpen(true);
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-emerald-400 focus:text-emerald-400 focus:bg-emerald-500/10 cursor-pointer"
                              onClick={() => handleApply(row)}
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Apply to Payroll
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-white/10" />
                            <DropdownMenuItem
                              className="text-rose-400 focus:text-rose-400 focus:bg-rose-500/10 cursor-pointer"
                              disabled={isDeleting}
                              onClick={() => handleDelete(row)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      ) : (
                        <Badge className="bg-green-500/15 text-green-200 border border-green-400/60 text-xs">
                          Applied
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-white/60 text-sm"
                >
                  {searchTerm
                    ? `No deductions found matching "${searchTerm}"`
                    : "No deductions yet. Create one to get started."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
