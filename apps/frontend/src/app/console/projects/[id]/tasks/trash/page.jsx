"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Trash2, RotateCcw, AlertTriangle, ArrowLeft, Clock } from "lucide-react";
import { useGetTrashedTasksQuery, useRestoreTaskMutation, usePermanentDeleteTaskMutation } from "@/api/admin/projects/tasksApi";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";

export default function TaskTrash({ params }) {
  const router = useRouter();
  const projectId = params?.id ? Number(params.id) : null;
  
  const { data: trashedTasks, isLoading, error } = useGetTrashedTasksQuery(projectId, {
    skip: !projectId,
  });
  const [restoreTask] = useRestoreTaskMutation();
  const [permanentDeleteTask] = usePermanentDeleteTaskMutation();
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    taskId: null,
    taskName: "",
  });

  const handleRestore = async (taskId, taskName) => {
    const toastId = toast.loading("Restoring task...");
    try {
      await restoreTask(taskId).unwrap();
      toast.success(`"${taskName}" has been restored`, { id: toastId });
    } catch (error) {
      toast.error("Failed to restore task", { id: toastId });
      console.error("Restore error:", error);
    }
  };

  const handlePermanentDeleteClick = (taskId, taskName) => {
    setConfirmDialog({
      open: true,
      taskId,
      taskName,
    });
  };

  const handleConfirmPermanentDelete = async () => {
    const { taskId, taskName } = confirmDialog;
    const toastId = toast.loading("Permanently deleting task...");
    
    try {
      await permanentDeleteTask(taskId).unwrap();
      toast.success(`"${taskName}" has been permanently deleted`, { id: toastId });
    } catch (error) {
      toast.error("Failed to delete task", { id: toastId });
      console.error("Delete error:", error);
    }
  };

  if (isLoading) {
    return (
      <PrivateRoute>
        <AppLayout>
          <div className="px-4 py-4 md:px-8 md:py-6 flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-[#EFFC76]/20 border-t-[#EFFC76] rounded-full animate-spin"></div>
              <p className="text-white/60">Loading trash...</p>
            </div>
          </div>
        </AppLayout>
      </PrivateRoute>
    );
  }

  if (error) {
    return (
      <PrivateRoute>
        <AppLayout>
          <div className="px-4 py-4 md:px-8 md:py-6 flex items-center justify-center min-h-screen">
            <div className="text-center space-y-4">
              <AlertTriangle className="w-16 h-16 text-red-400 mx-auto" />
              <h2 className="text-xl font-bold text-white">Failed to Load Trash</h2>
              <p className="text-white/60">There was an error loading the trash.</p>
              <Button
                onClick={() => router.push(`/admin/projects/${projectId}`)}
                className="bg-[#EFFC76] text-black hover:bg-[#EFFC76]/90"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Project
              </Button>
            </div>
          </div>
        </AppLayout>
      </PrivateRoute>
    );
  }

  const tasks = Array.isArray(trashedTasks) ? trashedTasks : trashedTasks?.data || [];

  return (
    <PrivateRoute>
      <AppLayout>
        <div className="px-4 py-4 md:px-8 md:py-6 min-h-screen">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push(`/admin/projects/${projectId}`)}
                  className="text-white/70 hover:text-[#EFFC76] hover:bg-white/5"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Project
                </Button>
                <div className="h-6 w-px bg-white/20 hidden md:block" />
                <div>
                  <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Trash2 className="w-6 h-6 text-red-400" />
                    Task Trash
                  </h1>
                  <p className="text-white/60 text-sm mt-1">
                    Deleted tasks are kept for 14 days
                  </p>
                </div>
              </div>
            </div>

            {/* Warning Banner */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-amber-400 font-semibold mb-1">Auto-Delete Policy</h3>
                <p className="text-white/70 text-sm">
                  Tasks in trash are automatically deleted after 14 days. Restore them before then to prevent permanent deletion.
                </p>
              </div>
            </div>

            {/* Trash Content */}
            {tasks.length === 0 ? (
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-12 text-center">
                <Trash2 className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-white mb-2">Trash is Empty</h2>
                <p className="text-white/60 mb-6">
                  No deleted tasks found. Deleted tasks will appear here.
                </p>
                <Button
                  onClick={() => router.push(`/admin/projects/${projectId}`)}
                  className="bg-[#EFFC76] text-black hover:bg-[#EFFC76]/90"
                >
                  Back to Project
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {tasks.map((task) => {
                  const deletedDate = task.deletedAt ? new Date(task.deletedAt) : null;
                  const timeAgo = deletedDate ? formatDistanceToNow(deletedDate, { addSuffix: true }) : "Unknown";

                  return (
                    <div
                      key={task.id}
                      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 md:p-6 hover:border-white/20 transition-all"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start gap-3">
                            <Trash2 className="w-5 h-5 text-red-400 flex-shrink-0 mt-1" />
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-white mb-1">
                                {task.title || "Untitled Task"}
                              </h3>
                              {task.description && (
                                <p className="text-white/60 text-sm line-clamp-2">
                                  {task.description}
                                </p>
                              )}
                              <div className="flex items-center gap-4 mt-2 text-xs text-white/50">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5" />
                                  <span>Deleted {timeAgo}</span>
                                </div>
                                {task.priority && (
                                  <span className={`px-2 py-0.5 rounded ${
                                    task.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                                    task.priority === 'medium' ? 'bg-orange-500/20 text-orange-400' :
                                    'bg-green-500/20 text-green-400'
                                  }`}>
                                    {task.priority}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 lg:flex-shrink-0">
                          <Button
                            onClick={() => handleRestore(task.id, task.title)}
                            size="sm"
                            className="bg-[#EFFC76]/10 hover:bg-[#EFFC76]/20 text-[#EFFC76] border border-[#EFFC76]/30 flex-1 lg:flex-initial"
                          >
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Restore
                          </Button>
                          <Button
                            onClick={() => handlePermanentDeleteClick(task.id, task.title)}
                            size="sm"
                            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 flex-1 lg:flex-initial"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete Forever
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <ConfirmDialog
              open={confirmDialog.open}
              onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}
              onConfirm={handleConfirmPermanentDelete}
              title="Permanently Delete Task?"
              description={`Are you sure you want to PERMANENTLY delete "${confirmDialog.taskName}"? This action cannot be undone and the task will be lost forever.`}
              confirmText="Delete Forever"
              cancelText="Cancel"
              variant="danger"
            />
          </div>
        </div>
      </AppLayout>
    </PrivateRoute>
  );
}
