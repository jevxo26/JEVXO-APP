"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Trash2, RotateCcw, AlertTriangle, ArrowLeft, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useGetTrashedProjectsQuery,
  useRestoreProjectMutation,
  usePermanentDeleteProjectMutation,
} from "@/api/admin/projects/projectsApi";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

/**
 * Project Trash Page
 * 
 * Displays soft-deleted projects that can be restored or permanently deleted.
 * Projects are automatically permanently deleted after 14 days.
 */
export default function ProjectTrash() {
  const router = useRouter();
  const { data: trashedProjects, isLoading, error } = useGetTrashedProjectsQuery();
  const [restoreProject] = useRestoreProjectMutation();
  const [permanentDeleteProject] = usePermanentDeleteProjectMutation();
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    projectId: null,
    projectName: "",
  });

  const handleRestore = async (projectId, projectName) => {
    const toastId = toast.loading("Restoring project...");
    try {
      await restoreProject(projectId).unwrap();
      toast.success(`"${projectName}" has been restored`, { id: toastId });
    } catch (error) {
      toast.error("Failed to restore project", { id: toastId });
      console.error("Restore error:", error);
    }
  };

  const handlePermanentDeleteClick = (projectId, projectName) => {
    setConfirmDialog({
      open: true,
      projectId,
      projectName,
    });
  };

  const handleConfirmPermanentDelete = async () => {
    const { projectId, projectName } = confirmDialog;
    const toastId = toast.loading("Permanently deleting project...");
    
    try {
      await permanentDeleteProject(projectId).unwrap();
      toast.success(`"${projectName}" has been permanently deleted`, { id: toastId });
    } catch (error) {
      toast.error("Failed to delete project", { id: toastId });
      console.error("Delete error:", error);
    }
  };

  if (isLoading) {
    return (
      <PrivateRoute>
        <AppLayout>
          <div className="px-4 py-4 md:px-8 md:py-6 flex items-center justify-center min-h-screen">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EFFC76] mx-auto mb-4"></div>
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
          <div className="px-4 py-4 md:px-8 md:py-6 min-h-screen text-white">
            <div className="max-w-[1600px] w-full mx-auto">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <Trash2 className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">
                    Project Trash
                  </h1>
                  <p className="text-white/60 text-sm sm:text-base">
                    Deleted projects are kept for 14 days before permanent deletion
                  </p>
                </div>
              </div>

              {/* Error State */}
              <div className="glass-card rounded-xl p-8 md:p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-8 h-8 text-red-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Unable to Load Trash</h3>
                  <p className="text-white/60 mb-6">
                    There was an error loading trashed projects. This might be because the backend is still deploying.
                  </p>
                  <Button
                    onClick={() => router.push("/admin/projects")}
                    className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Projects
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </AppLayout>
      </PrivateRoute>
    );
  }

  const projects = Array.isArray(trashedProjects) ? trashedProjects : trashedProjects?.data || [];

  return (
    <PrivateRoute>
      <AppLayout>
        <div className="px-4 py-4 md:px-8 md:py-6 min-h-screen text-white">
          <div className="max-w-[1600px] w-full mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <Trash2 className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">
                    Project Trash
                  </h1>
                  <p className="text-white/60 text-sm sm:text-base">
                    Deleted projects are kept for 14 days before permanent deletion
                  </p>
                </div>
              </div>
              <Button
                onClick={() => router.push("/admin/projects")}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 w-full md:w-auto"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Projects
              </Button>
            </div>

            {/* Warning Banner */}
            {projects.length > 0 && (
              <div className="glass-card rounded-xl p-4 flex items-start gap-3 border border-amber-500/30 bg-amber-500/5">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-amber-200">Auto-deletion in 14 days</p>
                  <p className="text-amber-200/80 mt-1">
                    Projects in trash will be automatically and permanently deleted after 14 days.
                    Restore them before then to prevent data loss.
                  </p>
                </div>
              </div>
            )}

            {/* Trashed Projects List */}
            {projects.length === 0 ? (
              <div className="glass-card rounded-xl p-12 md:p-16 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trash2 className="w-10 h-10 text-white/20" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Trash is Empty</h3>
                  <p className="text-white/60 mb-6">
                    Deleted projects will appear here and can be restored within 14 days
                  </p>
                  <Button
                    onClick={() => router.push("/admin/projects")}
                    className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Projects
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => {
                  const deletedAt = new Date(project.deletedAt);
                  const timeAgo = formatDistanceToNow(deletedAt, { addSuffix: true });
                  
                  return (
                    <div
                      key={project.id}
                      className="glass-card rounded-xl p-4 md:p-6 hover:shadow-lg transition-all duration-200"
                    >
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="p-2 bg-red-500/10 border border-red-500/20 rounded-lg flex-shrink-0">
                              <Trash2 className="w-5 h-5 text-red-400" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-lg text-white mb-1 truncate">
                                {project.name}
                              </h3>
                              <p className="text-sm text-white/70 line-clamp-2 mb-2">
                                {project.description || "No description"}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-3 text-xs text-white/50 ml-14">
                            <span className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md">
                              <Clock className="w-3.5 h-3.5" />
                              Deleted {timeAgo}
                            </span>
                            {project.totalTasks !== undefined && (
                              <span className="bg-white/5 px-2 py-1 rounded-md">
                                {project.totalTasks} tasks
                              </span>
                            )}
                            {project.status && (
                              <span className="bg-white/5 px-2 py-1 rounded-md">
                                {project.status}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 lg:flex-shrink-0">
                          <Button
                            onClick={() => handleRestore(project.id, project.name)}
                            size="sm"
                            className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex-1 lg:flex-initial"
                          >
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Restore
                          </Button>
                          <Button
                            onClick={() => handlePermanentDeleteClick(project.id, project.name)}
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
              title="Permanently Delete Project?"
              description={`Are you sure you want to PERMANENTLY delete "${confirmDialog.projectName}"? This action cannot be undone and the project will be lost forever.`}
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
