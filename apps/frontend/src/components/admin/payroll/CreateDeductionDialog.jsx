"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateDeductionMutation, useUpdateDeductionMutation } from "@/api/deductionApi";
import { useGetOurTeamQuery } from "@/api/admin/our-team/ourTeamApi";
import { useGetProjectsQuery } from "@/api/admin/projects/projectsApi";
import {
  useGetProjectMemberByEmployeeQuery,
  useGetProjectMembersQuery,
} from "@/api/admin/projects/projectMemberApi";
import { useGetTasksQuery } from "@/api/admin/projects/tasksApi";
import { toast } from "sonner";
import {
  Plus,
  DollarSign,
  FileText,
  Briefcase,
  User,
  Calendar,
} from "lucide-react";

/**
 * CreateDeductionDialog Component
 *
 * Modal dialog for creating new payroll deductions.
 * Supports three types of deductions:
 *
 * 1. PROJECT_PENALTY - For employees who miss project deadlines
 *    - Requires: employee, amount, reason, project selection
 *
 * 2. LEAVE_DEDUCTION - For unpaid leave or leave violations
 *    - Requires: employee, amount, reason
 *    - Can optionally link to a leave request
 *
 * 3. MANUAL - Admin-initiated deductions for other reasons
 *    - Requires: employee, amount, reason
 *
 * Features:
 * - Dynamic form fields based on deduction type
 * - Project selection for project penalties
 * - Real-time validation
 * - Toast notifications for success/error
 */
export default function CreateDeductionDialog({
  open,
  prefilledTeamId = null,
  prefilledProjectId = null,
  prefilledTaskId = null,
  prefilledType = "MANUAL",
  triggerButton = null,
  editingDeduction = null,
  onOpenChange = null, // Optional callback when dialog opens/closes
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = typeof open !== "undefined";
  const isOpen = isControlled ? open : internalOpen;
  
  const handleOpenChange = (newOpen) => {
    if (onOpenChange) {
      onOpenChange(newOpen);
    }
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    if (!newOpen) {
      // Small timeout to allow animation to finish before resetting form
      setTimeout(() => resetForm(), 300);
    }
  };

  const [createDeduction, { isLoading: isCreating }] = useCreateDeductionMutation();
  const [updateDeduction, { isLoading: isUpdating }] = useUpdateDeductionMutation();
  const isLoading = isCreating || isUpdating;
  const { data: teamMembersResponse } = useGetOurTeamQuery();
  const teamMembers = Array.isArray(teamMembersResponse)
    ? teamMembersResponse
    : teamMembersResponse?.data || [];

  const { data: projectsResponse } = useGetProjectsQuery();
  const projects = Array.isArray(projectsResponse)
    ? projectsResponse
    : projectsResponse?.data || [];

  // Form state
  const [formData, setFormData] = useState({
    teamId: prefilledTeamId || "",
    amount: "",
    reason: "",
    type: prefilledType,
    projectId: prefilledProjectId || "",
    taskId: prefilledTaskId || "",
    date: new Date().toISOString().split("T")[0],
  });

  // Populate form when editingDeduction changes
  React.useEffect(() => {
    if (editingDeduction) {
      setFormData({
        teamId: editingDeduction.teamId || editingDeduction.team?.id || "",
        amount: editingDeduction.amount || "",
        reason: editingDeduction.reason || "",
        type: editingDeduction.type || "MANUAL",
        projectId: editingDeduction.projectId || "",
        taskId: editingDeduction.taskId || "",
        date: editingDeduction.date ? new Date(editingDeduction.date).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
      });
    } else {
      resetForm();
    }
  }, [editingDeduction]);

  // Get project members if a project is selected
  const { data: projectMembersResponse, isLoading: loadingProjectMembers } =
    useGetProjectMembersQuery(formData.projectId, {
      skip: !formData.projectId,
    });

  const projectMembers = Array.isArray(projectMembersResponse)
    ? projectMembersResponse
    : projectMembersResponse?.data || [];

  // Get tasks if project is selected
  const { data: tasksResponse } = useGetTasksQuery(formData.projectId, {
    skip: !formData.projectId || formData.type !== "PROJECT_PENALTY",
  });

  const tasks = Array.isArray(tasksResponse)
    ? tasksResponse
    : tasksResponse?.data || [];

  // Query to get assigned amount for the project
  const { data: projectMemberInfo } = useGetProjectMemberByEmployeeQuery(
    { projectId: formData.projectId, teamMemberId: formData.teamId },
    {
      skip:
        !formData.projectId ||
        !formData.teamId ||
        formData.type !== "PROJECT_PENALTY",
    },
  );

  const assignedAmount = projectMemberInfo?.assignedAmount || 0;

  // Filter team members based on project if project penalty is selected
  const displayTeamMembers = React.useMemo(() => {
    if (
      formData.type === "PROJECT_PENALTY" &&
      formData.projectId &&
      projectMembers.length > 0
    ) {
      return projectMembers.map((m) => m.teamMember).filter(Boolean);
    }
    return teamMembers;
  }, [formData.type, formData.projectId, teamMembers, projectMembers]);

  /**
   * Reset form to initial state
   */
  const resetForm = () => {
    setFormData({
      teamId: prefilledTeamId || "",
      amount: "",
      reason: "",
      type: prefilledType,
      projectId: prefilledProjectId || "",
      taskId: prefilledTaskId || "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  /**
   * Handle form field changes
   */
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * Validate form data before submission
   */
  const validateForm = () => {
    if (!formData.teamId) {
      toast.error("Please select an employee");
      return false;
    }
    if (!formData.amount || Number(formData.amount) <= 0) {
      toast.error("Please enter a valid amount");
      return false;
    }
    if (!formData.reason.trim()) {
      toast.error("Please provide a reason for the deduction");
      return false;
    }
    if (formData.type === "PROJECT_PENALTY" && !formData.projectId) {
      toast.error("Please select a project for the penalty");
      return false;
    }
    return true;
  };

  /**
   * Handle form submission
   * Creates a new deduction and closes the dialog
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const toastId = toast.loading(editingDeduction ? "Updating deduction..." : "Creating deduction...");
    try {
      // Prepare deduction data
      const deductionData = {
        teamId: Number(formData.teamId),
        amount: Number(formData.amount),
        reason: formData.reason,
        type: formData.type,
        date: formData.date,
      };

      // Add optional fields based on type
      if (formData.type === "PROJECT_PENALTY" && formData.projectId) {
        deductionData.projectId = Number(formData.projectId);
        if (formData.taskId) {
            deductionData.taskId = Number(formData.taskId);
        }
      }

      if (editingDeduction) {
        await updateDeduction({ id: editingDeduction.id, ...deductionData }).unwrap();
        toast.success("Deduction updated successfully", { id: toastId });
      } else {
        await createDeduction(deductionData).unwrap();
        toast.success("Deduction created successfully", { id: toastId });
      }
      
      resetForm();
      handleOpenChange(false);
    } catch (error) {
      toast.error(error?.data?.message || (editingDeduction ? "Failed to update deduction" : "Failed to create deduction"), {
        id: toastId,
      });
    }
  };

  /**
   * Get predefined reason templates based on deduction type
   */
  const getReasonTemplates = () => {
    if (formData.type === "PROJECT_PENALTY") {
      return [
        "Missed project deadline",
        "Incomplete deliverables",
        "Poor quality work requiring rework",
        "Failure to meet project milestones",
        "Unexcused absence during critical project phase",
      ];
    }
    if (formData.type === "LEAVE_DEDUCTION") {
      return [
        "Unpaid leave",
        "Exceeded leave balance",
        "Unapproved absence",
        "Leave without notice",
      ];
    }
    return [
      "Disciplinary action",
      "Equipment damage",
      "Policy violation",
      "Advance salary recovery",
    ];
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {!editingDeduction && (
        <DialogTrigger asChild>
          {triggerButton || (
            <Button className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black font-semibold">
              <Plus className="w-4 h-4 mr-2" />
              Add Deduction
            </Button>
          )}
        </DialogTrigger>
      )}
      <DialogContent className="w-[calc(100%-2.5rem)] max-h-[calc(100vh-5rem)] overflow-y-auto sm:max-w-[600px] bg-black/30 backdrop-blur-xl border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#EFFC76]">
            {editingDeduction ? "Edit Payroll Deduction" : "Create Payroll Deduction"}
          </DialogTitle>
          <DialogDescription className="text-white/60">
            {editingDeduction 
              ? "Update the details of this deduction." 
              : "Add a deduction to an employee's payroll. This will be applied to their next payment cycle."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 py-4">
          {/* Employee Selection */}
          <div className="space-y-2 col-span-2 md:col-span-1">
            <Label
              htmlFor="teamId"
              className="text-white flex items-center gap-2"
            >
              <User className="w-4 h-4 text-[#EFFC76]" />
              Employee *
            </Label>
            <Select
              value={formData.teamId.toString()}
              onValueChange={(value) => handleChange("teamId", value)}
              disabled={!!prefilledTeamId}
            >
              <SelectTrigger className="bg-white/5 border-white/10 text-white h-11">
                <SelectValue placeholder="Select employee" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1A1A] border-white/10 text-white">
                {displayTeamMembers.map((member) => (
                  <SelectItem
                    key={member.id}
                    value={member.id.toString()}
                    className="text-white hover:bg-white/5"
                  >
                    {member.firstName} {member.lastName}{" "}
                    {member.position ? `- ${member.position}` : ""}
                  </SelectItem>
                ))}
                {displayTeamMembers.length === 0 && (
                  <SelectItem value="none" disabled>
                    No members found for this project
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Project Selection (only for PROJECT_PENALTY) */}
          {formData.type === "PROJECT_PENALTY" && (
            <div className="space-y-2 col-span-2 md:col-span-1">
              <Label
                htmlFor="projectId"
                className="text-white flex items-center gap-2"
              >
                <Briefcase className="w-4 h-4 text-[#EFFC76]" />
                Project *
              </Label>
              <Select
                value={formData.projectId.toString()}
                onValueChange={(value) => handleChange("projectId", value)}
                disabled={!!prefilledProjectId}
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white h-11">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1A] border-white/10 text-white">
                  {projects.map((project) => (
                    <SelectItem
                      key={project.id}
                      value={project.id.toString()}
                      className="text-white hover:bg-white/5"
                    >
                      {project.name} - {project.status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Task Selection (only if Project is selected) */}
          {formData.type === "PROJECT_PENALTY" && formData.projectId && (
            <div className="space-y-2 col-span-2 md:col-span-1">
              <Label
                htmlFor="taskId"
                className="text-white flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-[#EFFC76]" />
                Task (Optional)
              </Label>
              <Select
                value={formData.taskId ? formData.taskId.toString() : "none"}
                onValueChange={(value) => handleChange("taskId", value === "none" ? "" : value)}
                disabled={!!prefilledTaskId}
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white h-11">
                  <SelectValue placeholder="Select task" />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1A] border-white/10 text-white">
                  <SelectItem value="none" className="text-white/50 hover:bg-white/5">
                    No specific task
                  </SelectItem>
                  {tasks.map((task) => (
                    <SelectItem
                      key={task.id}
                      value={task.id.toString()}
                      className="text-white hover:bg-white/5"
                    >
                      {task.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="col-span-2 grid grid-cols-2 gap-4">
            {/* Amount */}
            <div className="space-y-2 col-span-2 md:col-span-1">
              <Label
                htmlFor="amount"
                className="text-white flex items-center gap-2"
              >
                <DollarSign className="w-4 h-4 text-[#EFFC76]" />
                Deduction Amount *
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => handleChange("amount", e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/40 h-11"
              />
              {assignedAmount > 0 && (
                <div className="flex items-center justify-between text-xs mt-1">
                  <span className="text-white/60">
                    Assigned:{" "}
                    <span className="text-[#EFFC76] font-bold">
                      ${assignedAmount}
                    </span>
                  </span>
                  <Button
                    type="button"
                    variant="link"
                    className="h-auto p-0 text-[#EFFC76] text-xs"
                    onClick={() => handleChange("amount", assignedAmount)}
                  >
                    Deduct Full
                  </Button>
                </div>
              )}
            </div>
            {/* Date */}
            <div className="space-y-2 col-span-2 md:col-span-1">
              <Label
                htmlFor="date"
                className="text-white flex items-center gap-2"
              >
                <Calendar className="w-4 h-4 text-[#EFFC76]" />
                Deduction Date
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                className="bg-white/5 border-white/10 text-white h-11"
              />
            </div>
          </div>

          {/* Deduction Type and Date Wrapper */}
          <div className="col-span-2 grid grid-cols-2 gap-4">
            {/* Deduction Type */}
            <div className="space-y-2 col-span-2 md:col-span-1">
              <Label
                htmlFor="type"
                className="text-white flex items-center gap-2"
              >
                <FileText className="w-4 h-4 text-[#EFFC76]" />
                Deduction Type *
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleChange("type", value)}
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1A1A1A] border-white/10 text-white">
                  <SelectItem
                    value="PROJECT_PENALTY"
                    className="text-white hover:bg-white/5"
                  >
                    Project Penalty - Late delivery or poor performance
                  </SelectItem>
                  <SelectItem
                    value="LEAVE_DEDUCTION"
                    className="text-white hover:bg-white/5"
                  >
                    Leave Deduction - Unpaid leave or violations
                  </SelectItem>
                  <SelectItem
                    value="MANUAL"
                    className="text-white hover:bg-white/5"
                  >
                    Manual - Other reasons
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Reason */}
          <div className="space-y-2 col-span-2">
            <Label
              htmlFor="reason"
              className="text-white flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-[#EFFC76]" />
              Reason for Deduction *
            </Label>
            <Textarea
              id="reason"
              placeholder="Provide a detailed reason for this deduction..."
              value={formData.reason}
              onChange={(e) => handleChange("reason", e.target.value)}
              className="bg-white/5 border-white/10 text-white placeholder:text-white/40 min-h-[100px]"
            />
            {/* Quick reason templates */}
            <div className="flex flex-wrap gap-2 mt-2">
              {getReasonTemplates().map((template, index) => (
                <Button
                  key={index}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleChange("reason", template)}
                  className="text-xs bg-white/5 border-white/10 text-white/70 hover:bg-[#EFFC76]/10 hover:text-[#EFFC76] hover:border-[#EFFC76]/30"
                >
                  {template}
                </Button>
              ))}
            </div>
          </div>
        </form>

        <DialogFooter>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              resetForm();
              handleOpenChange(false);
            }}
            className="bg-transparent border border-white/10 text-white hover:bg-white/10 hover:text-white"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black font-semibold"
          >
            {isLoading ? (editingDeduction ? "Updating..." : "Creating...") : (editingDeduction ? "Update Deduction" : "Create Deduction")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
