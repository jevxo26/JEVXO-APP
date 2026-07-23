"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import {
  CheckCircle2,
  Code,
  Plus,
  FolderKanban,
  Globe,
  Smartphone,
  Server,
  Database,
  Layout,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import NewProjectDialog from "@/components/admin/projects/NewProjectDialog";
import { useGetProjectsQuery, useDeleteProjectMutation } from "@/api/admin/projects/projectsApi";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function Projects() {
  const router = useRouter();
  const { userRole } = useAuth();
  const isAdmin = userRole === "admin";
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    projectId: null,
    projectName: "",
  });
  
  const {
    data: projectsResponse,
    isLoading,
    error,
    refetch,
  } = useGetProjectsQuery();
  const [deleteProject] = useDeleteProjectMutation();

  const handleDeleteClick = (e, projectId, projectName) => {
    e.stopPropagation(); // Prevent card click
    setConfirmDialog({
      open: true,
      projectId,
      projectName,
    });
  };

  const handleConfirmDelete = async () => {
    const { projectId, projectName } = confirmDialog;
    const toastId = toast.loading("Moving project to trash...");
    
    try {
      await deleteProject(projectId).unwrap();
      toast.success("Project moved to trash", { id: toastId });
    } catch (error) {
      toast.error("Failed to delete project", { id: toastId });
      console.error("Delete error:", error);
    }
  };

  // Extract projects from API response
  const projects = Array.isArray(projectsResponse)
    ? projectsResponse
    : projectsResponse?.data || [];

  // Format team members for display
  const formatTeamMembers = (teamMembers) => {
    if (!teamMembers || !Array.isArray(teamMembers)) return [];
    return teamMembers.map((member) => {
      const initials =
        (member.firstName?.[0] || "") + (member.lastName?.[0] || "") || "TM";
      return {
        name:
          `${member.firstName || ""} ${member.lastName || ""}`.trim() ||
          "Team Member",
        avatar: initials,
      };
    });
  };

  if (isLoading) {
    return (
      <div className="px-4 py-4 md:px-8 md:py-6 flex items-center justify-center min-h-screen text-white">
        <div className="text-white/60">Loading projects...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 py-4 md:px-8 md:py-6 flex items-center justify-center min-h-screen text-white">
        <div className="text-red-400">Failed to load projects</div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-500/20 text-emerald-300 border border-emerald-400/50";
      case "In Progress":
        return "bg-sky-500/20 text-sky-200 border border-sky-400/60";
      case "Planning":
        return "bg-indigo-500/20 text-indigo-200 border border-indigo-400/60";
      default:
        return "bg-white/10 text-white/70 border border-white/20";
    }
  };

  const getAppTypeColor = (type) => {
    switch (type) {
      case "Web Application":
        return "bg-purple-500/15 text-purple-300 border border-purple-400/50";
      case "Mobile Application":
        return "bg-orange-500/15 text-orange-300 border border-orange-400/50";
      case "Backend Service":
        return "bg-blue-500/15 text-blue-300 border border-blue-400/50";
      case "Database Layer":
        return "bg-emerald-500/15 text-emerald-300 border border-emerald-400/50";
      default:
        return "bg-[#EFFC76]/15 text-[#EFFC76] border border-[#EFFC76]/50";
    }
  };

  const getAppTypeIcon = (type) => {
    switch (type) {
      case "Web Application":
        return <Globe className="w-3.5 h-3.5" />;
      case "Mobile Application":
        return <Smartphone className="w-3.5 h-3.5" />;
      case "Backend Service":
        return <Server className="w-3.5 h-3.5" />;
      case "Database Layer":
        return <Database className="w-3.5 h-3.5" />;
      default:
        return <Code className="w-3.5 h-3.5" />;
    }
  };

  const handleProjectClick = (projectId) => {
    router.push(`/admin/projects/${projectId}`);
  };

  return (
    <PrivateRoute>
      <AppLayout>
        <div className="px-4 py-4 md:px-8 md:py-6 flex flex-col min-h-screen text-white">
          <div className="max-w-[1600px] w-full mx-auto flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                  <FolderKanban className="w-6 h-6 text-[#EFFC76]" />
                  Projects
                </h1>
                <p className="text-sm text-white/60 mt-1">
                  Manage your product, mobile and backend applications in one
                  place
                </p>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <Button
                  onClick={() => router.push("/admin/projects/trash")}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 flex-1 md:flex-initial"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Trash
                </Button>
                <Button
                  onClick={() => setShowNewProjectDialog(true)}
                  className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black glass-button flex-1 md:flex-initial"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Application Project
                </Button>
              </div>
            </div>

            {/* Projects Grid */}
            {projects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-white/60 mb-4">No projects yet</p>
                <Button
                  onClick={() => setShowNewProjectDialog(true)}
                  className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Project
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {projects.map((project) => {
                  const teamMembers = formatTeamMembers(
                    project.team || project.teamMembers || [],
                  );
                  return (
                    <div
                      key={project.id}
                      onClick={() => handleProjectClick(project.id)}
                      className="glass-card rounded-xl p-4 md:p-6 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] group"
                    >
                      {/* Project Header */}
                      <div className="mb-3 md:mb-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-bold text-base md:text-lg text-white group-hover:text-[#EFFC76] transition-colors line-clamp-1 flex-1">
                            {project.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(project.status)}`}
                            >
                              {project.status}
                            </span>
                            {isAdmin && (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <button
                                    onClick={(e) => e.stopPropagation()}
                                    className="p-1 hover:bg-white/10 rounded-md transition-colors"
                                  >
                                    <MoreVertical className="w-4 h-4 text-white/60" />
                                  </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-black/90 border-white/10">
                                  <DropdownMenuItem
                                    onClick={(e) => handleDeleteClick(e, project.id, project.name)}
                                    className="text-red-400 focus:text-red-300 focus:bg-red-500/10 cursor-pointer"
                                  >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete Project
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-white/70 line-clamp-2 leading-relaxed">
                          {project.description || "No description"}
                        </p>
                        {project.applicationType && (
                          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-white/70">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full ${getAppTypeColor(
                                project.applicationType,
                              )}`}
                            >
                              {getAppTypeIcon(project.applicationType)}
                              <span className="font-medium">
                                {project.applicationType}
                              </span>
                            </span>
                            {project.platform && (
                              <span className="px-2 py-1 rounded-full bg-white/5 border border-white/20 text-white/80 flex items-center gap-1.5">
                                <Layout className="w-3.5 h-3.5" />
                                {project.platform}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Progress */}
                      <div className="mb-3 md:mb-4">
                        <div className="flex justify-between text-xs font-medium text-white/60 mb-2">
                          <span>Progress</span>
                          <span className="text-[#EFFC76]">
                            {project.progress || 0}%
                          </span>
                        </div>
                        <Progress
                          value={project.progress || 0}
                          className="h-1.5 md:h-2 bg-white/10"
                          indicatorClassName="bg-[#EFFC76]"
                        />
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-white/10">
                        <div className="flex items-center gap-1.5 text-white/80 bg-[#EFFC76]/15 px-2 py-1 rounded-md border border-[#EFFC76]/50">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#EFFC76]" />
                          <span className="text-xs font-medium">
                            {project.tasksCompleted || 0}/
                            {project.totalTasks || 0} tasks
                          </span>
                        </div>

                        <div className="flex -space-x-2">
                          {teamMembers.slice(0, 3).map((member, idx) => (
                            <Avatar
                              key={idx}
                              className="h-7 w-7 border-2 border-black/60 ring-1 ring-[#EFFC76]/40"
                            >
                              <AvatarFallback className="text-[10px] bg-[#EFFC76]/15 text-[#EFFC76]">
                                {member.avatar}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {teamMembers.length > 3 && (
                            <div className="h-7 w-7 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center">
                              <span className="text-[10px] font-medium text-white/80">
                                +{teamMembers.length - 3}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <NewProjectDialog
            open={showNewProjectDialog}
            onOpenChange={setShowNewProjectDialog}
            onProjectCreated={() => {
              setShowNewProjectDialog(false);
              refetch();
            }}
          />

          <ConfirmDialog
            open={confirmDialog.open}
            onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}
            onConfirm={handleConfirmDelete}
            title="Move Project to Trash?"
            description={`Are you sure you want to move "${confirmDialog.projectName}" to trash? You can restore it within 14 days.`}
            confirmText="Move to Trash"
            cancelText="Cancel"
            variant="danger"
          />
        </div>
      </AppLayout>
    </PrivateRoute>
  );
}
