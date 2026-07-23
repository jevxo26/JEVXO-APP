"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetProjectMembersQuery,
  useAssignProjectMemberMutation,
  useRemoveProjectMemberMutation,
} from "@/api/admin/projects/projectMemberApi";
import { useGetOurTeamQuery } from "@/api/admin/our-team/ourTeamApi";
import { toast } from "sonner";
import { Plus, Trash2, DollarSign, User, FileText, Users } from "lucide-react";

export default function ProjectTeamManagement({ projectId }) {
  const { data: membersResponse, isLoading: membersLoading } = useGetProjectMembersQuery(projectId);
  const members = Array.isArray(membersResponse) ? membersResponse : (membersResponse?.data || []);

  const { data: teamMembersResponse } = useGetOurTeamQuery();
  const teamMembers = Array.isArray(teamMembersResponse) ? teamMembersResponse : (teamMembersResponse?.data || []);

  const [assignMember, { isLoading: isAssigning }] = useAssignProjectMemberMutation();
  const [removeMember, { isLoading: isRemoving }] = useRemoveProjectMemberMutation();

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    teamMemberId: "",
    assignedAmount: "",
    notes: "",
  });

  const handleAssign = async (e) => {
    e.preventDefault();
    if (!formData.teamMemberId) {
      toast.error("Please select a team member");
      return;
    }

    const toastId = toast.loading("Assigning member...");
    try {
      await assignMember({
        projectId: Number(projectId),
        teamMemberId: Number(formData.teamMemberId),
        assignedAmount: Number(formData.assignedAmount || 0),
        notes: formData.notes,
      }).unwrap();
      toast.success("Member assigned successfully", { id: toastId });
      setOpen(false);
      setFormData({ teamMemberId: "", assignedAmount: "", notes: "" });
    } catch (error) {
      toast.error(error?.data?.message || "Failed to assign member", { id: toastId });
    }
  };

  const handleRemove = async (id) => {
    const toastId = toast.loading("Removing member...");
    try {
      await removeMember(id).unwrap();
      toast.success("Member removed from project", { id: toastId });
    } catch (error) {
      toast.error(error?.data?.message || "Failed to remove member", { id: toastId });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[#EFFC76]/10 border border-[#EFFC76]/20">
            <Users className="w-5 h-5 text-[#EFFC76]" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Project Team & Budget</h3>
            <p className="text-sm text-white/50">Manage team allocation and budget distribution</p>
          </div>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black font-medium">
              <Plus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black/90 backdrop-blur-xl border-white/10 text-white">
            <DialogHeader>
              <DialogTitle>Assign Team Member</DialogTitle>
              <DialogDescription className="text-white/60">
                Assign an employee to this project and define the amount they will receive.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAssign} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Team Member</Label>
                <Select
                  value={formData.teamMemberId}
                  onValueChange={(val) => setFormData({ ...formData, teamMemberId: val })}
                >
                  <SelectTrigger className="bg-white/5 border-white/10 text-white h-11">
                    <SelectValue placeholder="Select member" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A1A1A] border-white/10 text-white">
                    {teamMembers.map((member) => (
                      <SelectItem key={member.id} value={member.id.toString()}>
                        {member.firstName} {member.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Assigned Amount (Bonus/Pay)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-white/40" />
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="pl-9 bg-white/5 border-white/10 text-white"
                    value={formData.assignedAmount}
                    onChange={(e) => setFormData({ ...formData, assignedAmount: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Notes</Label>
                <Input
                  placeholder="Role in project, special terms, etc."
                  className="bg-white/5 border-white/10 text-white"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
            </form>
            <DialogFooter>
              <Button 
                variant="ghost" 
                onClick={() => setOpen(false)}
                className="bg-transparent border border-white/10 text-white hover:bg-white/10 hover:text-white"
              >
                Cancel
              </Button>
              <Button 
                className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black" 
                onClick={handleAssign}
                disabled={isAssigning}
              >
                {isAssigning ? "Assigning..." : "Assign Member"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.2)] overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5 border-b border-white/10">
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="text-[#EFFC76] font-semibold uppercase text-xs tracking-wider h-14">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Member
                </div>
              </TableHead>
              <TableHead className="text-[#EFFC76] font-semibold uppercase text-xs tracking-wider h-14">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Assigned Amount
                </div>
              </TableHead>
              <TableHead className="text-[#EFFC76] font-semibold uppercase text-xs tracking-wider h-14">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Notes
                </div>
              </TableHead>
              <TableHead className="text-right text-[#EFFC76] font-semibold uppercase text-xs tracking-wider h-14">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {membersLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12 text-white/40">Loading members...</TableCell>
              </TableRow>
            ) : members.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-12 text-white/40">
                  <div className="flex flex-col items-center gap-2">
                    <Users className="w-8 h-8 text-white/20" />
                    <p>No members assigned yet.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              members.map((m) => (
                <TableRow key={m.id} className="border-white/5 hover:bg-white/5 group transition-colors">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-white/10">
                        <AvatarImage src={m.teamMember?.profileImage} />
                        <AvatarFallback className="bg-[#EFFC76]/10 text-[#EFFC76] font-medium">
                          {m.teamMember?.firstName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-white">{m.teamMember?.firstName} {m.teamMember?.lastName}</div>
                        <div className="text-xs text-white/40">{m.teamMember?.position}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#EFFC76]/10 border border-[#EFFC76]/20 text-[#EFFC76] font-mono font-bold">
                      ${Number(m.assignedAmount).toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell className="py-4 text-white/60 text-sm max-w-[200px] truncate">
                    {m.notes || "-"}
                  </TableCell>
                  <TableCell className="text-right py-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white/40 hover:text-red-400 hover:bg-red-400/10 h-8 w-8"
                      onClick={() => handleRemove(m.id)}
                      disabled={isRemoving}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
