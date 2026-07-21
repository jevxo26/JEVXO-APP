"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ScheduleHeader from "@/components/admin/schedule/ScheduleHeader";
import ScheduleGrid from "@/components/admin/schedule/ScheduleGrid";
import ScheduleMeetingDialog from "@/components/admin/schedule/ScheduleMeetingDialog";
import MeetingHistoryCard from "@/components/admin/schedule/MeetingHistoryCard";
import ConnectCalendarButton from "@/components/admin/schedule/ConnectCalendarButton";
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
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarIcon, Clock, Search, History } from "lucide-react";
import { toast } from "sonner";
import { addDays, format, startOfWeek, subDays } from "date-fns";
import { useGetOurTeamQuery } from "@/api/admin/our-team/ourTeamApi";
import {
  useCreateScheduleMutation,
  useGetSchedulesQuery,
  useUpdateScheduleMutation,
} from "@/api/admin/schedule/scheduleApi";
import {
  useGetMeetingsQuery,
  useGetTrashedMeetingsQuery,
} from "@/api/admin/meeting/meetingApi";
import { useAuth } from "@/contexts/AuthContext";
import PrivateRoute from "@/components/auth/PrivateRoute";
import AppLayout from "@/components/layout/AppLayout";

import { useConnectGoogleCalendarMutation } from "@/api/admin/calendar/googleCalendarApi";

import { Suspense } from "react";

function ScheduleContent() {
  const { userRole } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [connectCalendar, { isLoading: isConnectingCalendar }] =
    useConnectGoogleCalendarMutation();

  useEffect(() => {
    const code = searchParams.get("google_code");
    if (code) {
      connectCalendar(code)
        .unwrap()
        .then(() => {
          toast.success("Google Calendar connected successfully!");
          router.replace("/admin/schedule");
        })
        .catch((err) => {
          toast.error("Failed to connect calendar");
          console.error(err);
        });
    }
  }, [searchParams, connectCalendar, router]);

  const [isAddShiftDialogOpen, setIsAddShiftDialogOpen] = useState(false);
  const [isScheduleMeetingDialogOpen, setIsScheduleMeetingDialogOpen] =
    useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Meeting History State

  // Meeting History State
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 });
  const endDate = addDays(startDate, 6);
  const weekStartDate = format(startDate, "yyyy-MM-dd");
  const weekEndDate = format(endDate, "yyyy-MM-dd");

  const { data: teamData, isLoading: isLoadingTeam } = useGetOurTeamQuery();
  const teamMembers = teamData?.data || teamData || [];

  const { data: schedulesData, isLoading: isLoadingSchedules } =
    useGetSchedulesQuery();
  const schedules = schedulesData?.data || schedulesData || [];
  const [createSchedule, { isLoading: isCreatingSchedule }] =
    useCreateScheduleMutation();
  const [updateSchedule, { isLoading: isUpdatingSchedule }] =
    useUpdateScheduleMutation();

  const { data: meetingsResp, isLoading: isLoadingMeetings } =
    useGetMeetingsQuery(undefined, { skip: filterStatus === "trash" });
  const { data: trashedResp, isLoading: isLoadingTrash } =
    useGetTrashedMeetingsQuery(undefined, { skip: filterStatus !== "trash" });

  const [newShift, setNewShift] = useState({
    teamId: "",
    day: "Mon",
    date: "",
    startTime: "",
    endTime: "",
    position: "",
    notes: "",
  });

  const handleInputChange = (field, value) => {
    setNewShift((prev) => ({ ...prev, [field]: value }));
  };

  const scheduleRows = useMemo(() => {
    // Filter to current week if backend stored weekStartDate; otherwise show all schedules
    const normalized = schedules.filter((s) => {
      const ws = s?.weekStartDate
        ? format(new Date(s.weekStartDate), "yyyy-MM-dd")
        : null;
      return !ws || ws === weekStartDate;
    });

    return normalized.map((s) => ({
      id: s.id ?? s.teamId,
      teamId: s.teamId,
      name: s.team?.name || "Unknown",
      role: s.team?.role || "Team Member",
      avatar: s.team?.avatar || "/avatars/01.png",
      shifts: Array.isArray(s.shifts)
        ? s.shifts
        : [null, null, null, null, null, null, null],
    }));
  }, [schedules, weekStartDate]);

  const canAddShift = ["admin", "manager"].includes(
    (userRole || "").toLowerCase(),
  );
  const canPublish = ["admin", "manager"].includes(
    (userRole || "").toLowerCase(),
  );
  const canScheduleMeeting = ["admin", "manager"].includes(
    (userRole || "").toLowerCase(),
  );

  const handleAddShift = async () => {
    // Validation
    if (
      !newShift.teamId ||
      !newShift.date ||
      !newShift.startTime ||
      !newShift.endTime
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    const teamIdNum = Number(newShift.teamId);
    if (Number.isNaN(teamIdNum)) {
      toast.error("Invalid employee selection");
      return;
    }

    const dayIndexMap = {
      Mon: 0,
      Tue: 1,
      Wed: 2,
      Thu: 3,
      Fri: 4,
      Sat: 5,
      Sun: 6,
    };
    const idx = dayIndexMap[newShift.day] ?? 0;

    const shift = {
      day: newShift.day,
      startTime: newShift.startTime,
      endTime: newShift.endTime,
      time: `${newShift.startTime} - ${newShift.endTime}`,
      label: newShift.position || "SHIFT",
      type:
        newShift.position === "night"
          ? "night"
          : newShift.position || "morning",
      notes: newShift.notes || undefined,
    };

    const existing = schedules.find((s) => {
      const ws = s?.weekStartDate
        ? format(new Date(s.weekStartDate), "yyyy-MM-dd")
        : null;
      return s?.teamId === teamIdNum && (!ws || ws === weekStartDate);
    });

    const nextShifts = Array.isArray(existing?.shifts)
      ? [...existing.shifts]
      : [null, null, null, null, null, null, null];
    while (nextShifts.length < 7) nextShifts.push(null);
    nextShifts[idx] = shift;

    try {
      if (existing?.id) {
        await updateSchedule({
          id: existing.id,
          teamId: teamIdNum,
          shifts: nextShifts,
          weekStartDate,
          weekEndDate,
        }).unwrap();
      } else {
        await createSchedule({
          teamId: teamIdNum,
          shifts: nextShifts,
          weekStartDate,
          weekEndDate,
        }).unwrap();
      }

      toast.success("Shift saved successfully!");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to save shift");
      return;
    }

    // Reset form and close dialog
    setNewShift({
      teamId: "",
      day: "Mon",
      date: "",
      startTime: "",
      endTime: "",
      position: "",
      notes: "",
    });
    setIsAddShiftDialogOpen(false);
  };

  const handleScheduleMeeting = async (meetingData) => {
    // In real app, this would make API calls to:
    // 1. POST /api/meetings/create - Save meeting to database
    // 2. POST /api/meetings/notify - Send email notifications

    console.log("Meeting scheduled:", meetingData);
  };

  // Map meetings from API and hydrate attendees from teamMembers
  const meetings = useMemo(() => {
    const raw =
      filterStatus === "trash"
        ? trashedResp?.data || trashedResp || []
        : meetingsResp?.data || meetingsResp || [];

    return raw.map((m) => {
      const attendeeIds = Array.isArray(m.attendeeIds) ? m.attendeeIds : [];
      const attendees = attendeeIds
        .map((id) => teamMembers.find((t) => t.id === id))
        .filter(Boolean)
        .map((t) => ({
          id: t.id,
          name:
            `${t.firstName || ""} ${t.lastName || ""}`.trim() ||
            t.name ||
            "Team Member",
          email: t.email,
          avatar: t.profileImage || t.avatar,
        }));

      return {
        id: m.id ?? m.meetingId,
        meetingId: m.meetingId,
        topic: m.topic,
        description: m.description,
        dateTime: m.dateTime,
        duration: m.durationMinutes,
        meetingLink: m.meetingLink,
        status: m.deletedAt ? "trash" : m.status || "upcoming",
        organizer: m.organizerName || "Organizer",
        attendees,
        createdAt: m.createdAt,
        deletedAt: m.deletedAt,
      };
    });
  }, [meetingsResp, trashedResp, teamMembers, filterStatus]);

  // Filter and search meetings
  const filteredMeetings = meetings.filter((meeting) => {
    // Filter by status
    const matchesStatus =
      filterStatus === "all" || meeting.status === filterStatus;

    // Filter by search query
    const matchesSearch =
      searchQuery === "" ||
      meeting.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meeting.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  return (
    <PrivateRoute>
      <AppLayout>
        <div className="px-4 py-6 md:px-8 md:py-8 flex flex-col text-white">
          <div className="max-w-[1600px] w-full mx-auto flex flex-col h-full space-y-6">
            <ScheduleHeader
              startDate={startDate}
              endDate={endDate}
              onPrevWeek={() => setCurrentDate((d) => subDays(d, 7))}
              onNextWeek={() => setCurrentDate((d) => addDays(d, 7))}
              onAddShift={() => setIsAddShiftDialogOpen(true)}
              showAddShift={canAddShift}
              showScheduleMeeting={canScheduleMeeting}
              onScheduleMeeting={() => setIsScheduleMeetingDialogOpen(true)}
            >
              <ConnectCalendarButton />
            </ScheduleHeader>
            <div className="flex-1 min-h-0">
              <ScheduleGrid rows={scheduleRows} />
            </div>

            {/* Meeting History Section */}
            <div className="mt-8">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <History className="w-6 h-6 text-[#EFFC76]" />
                <h2 className="text-xl md:text-2xl font-bold text-white">
                  Meeting History
                </h2>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#EFFC76]/20 text-[#EFFC76] border border-[#EFFC76]/30">
                  {filteredMeetings.length}{" "}
                  {filteredMeetings.length === 1 ? "Meeting" : "Meetings"}
                </span>
              </div>

              {/* Filters and Search */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
                {/* Status Filter Tabs */}
                <div className="flex flex-wrap items-center gap-2 p-1 rounded-lg border border-white/15 bg-white/5 backdrop-blur-xl w-full md:w-fit">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFilterStatus("all")}
                    className={`text-sm ${
                      filterStatus === "all"
                        ? "bg-[#EFFC76] text-black hover:bg-[#e0ef5f] hover:text-black"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    All
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFilterStatus("upcoming")}
                    className={`text-sm ${
                      filterStatus === "upcoming"
                        ? "bg-[#EFFC76] text-black hover:bg-[#e0ef5f] hover:text-black"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    Upcoming
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFilterStatus("completed")}
                    className={`text-sm ${
                      filterStatus === "completed"
                        ? "bg-[#EFFC76] text-black hover:bg-[#e0ef5f] hover:text-black"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    Completed
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFilterStatus("trash")}
                    className={`text-sm ${
                      filterStatus === "trash"
                        ? "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30"
                        : "text-white/70 hover:text-red-400 hover:bg-red-500/10"
                    }`}
                  >
                    Trash
                  </Button>
                </div>

                {/* Search */}
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                  <Input
                    type="text"
                    placeholder="Search meetings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                  />
                </div>
              </div>

              {/* Meeting Cards Grid */}
              {isLoadingMeetings ? (
                <div className="glass-panel rounded-2xl p-8 text-center text-white/70">
                  Loading meetings...
                </div>
              ) : filteredMeetings.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {filteredMeetings.map((meeting) => (
                    <MeetingHistoryCard key={meeting.id} meeting={meeting} />
                  ))}
                </div>
              ) : (
                <div className="glass-panel rounded-2xl p-12 text-center">
                  <History className="w-16 h-16 text-white/20 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white/70 mb-2">
                    No meetings found
                  </h3>
                  <p className="text-sm text-white/50">
                    {searchQuery
                      ? "Try adjusting your search query"
                      : filterStatus === "all"
                        ? "Schedule your first meeting to get started"
                        : `No ${filterStatus} meetings at the moment`}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Add Shift Dialog */}
          <Dialog
            open={isAddShiftDialogOpen}
            onOpenChange={setIsAddShiftDialogOpen}
          >
            <DialogContent className=" md:max-w-lg  glass-card border-white/20 text-white">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-white">
                  <CalendarIcon className="w-5 h-5 text-[#EFFC76]" />
                  Add New Shift
                </DialogTitle>
                <DialogDescription className="text-white/70">
                  Schedule a new shift for an employee. All fields marked with *
                  are required.
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-4 py-[15px] px-[6px] md:px-0">
                {/* Employee */}
                <div className="grid gap-2 col-span-2">
                  <Label htmlFor="shift-employee" className="text-white">
                    Employee <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={newShift.teamId}
                    onValueChange={(value) =>
                      handleInputChange("teamId", value)
                    }
                  >
                    <SelectTrigger className="bg-black/40 border border-white/20 text-white w-full">
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A1A1A] border-white/10 text-white">
                      {isLoadingTeam ? (
                        <SelectItem
                          value="loading"
                          disabled
                          className="text-white/50"
                        >
                          Loading...
                        </SelectItem>
                      ) : (
                        teamMembers.map((m) => (
                          <SelectItem
                            key={m.id}
                            value={String(m.id)}
                            className="focus:bg-white/10 focus:text-white cursor-pointer"
                          >
                            {`${m.firstName || ""} ${m.lastName || ""}`.trim() ||
                              m.name ||
                              "Team Member"}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {/* Day */}
                <div className="grid gap-2">
                  <Label htmlFor="shift-day" className="text-white">
                    Day <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={newShift.day}
                    onValueChange={(value) => handleInputChange("day", value)}
                  >
                    <SelectTrigger className="bg-black/40 border border-white/20 text-white w-full">
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A1A1A] border-white/10 text-white">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                        (d) => (
                          <SelectItem
                            key={d}
                            value={d}
                            className="focus:bg-white/10 focus:text-white cursor-pointer"
                          >
                            {d}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date */}
                <div className="grid gap-2">
                  <Label htmlFor="shift-date" className="text-white">
                    Date <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="shift-date"
                    type="date"
                    value={newShift.date}
                    onChange={(e) =>
                      handleInputChange("date", e.target.value)
                    }
                    className="bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                  />
                </div>

                {/* Start Time */}
                <div className="grid gap-2">
                  <Label htmlFor="shift-start" className="text-white">
                    Start Time <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                    <Input
                      id="shift-start"
                      type="time"
                      value={newShift.startTime}
                      onChange={(e) =>
                        handleInputChange("startTime", e.target.value)
                      }
                      className="pl-10 bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                    />
                  </div>
                </div>

                {/* End Time */}
                <div className="grid gap-2">
                  <Label htmlFor="shift-end" className="text-white">
                    End Time <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                    <Input
                      id="shift-end"
                      type="time"
                      value={newShift.endTime}
                      onChange={(e) =>
                        handleInputChange("endTime", e.target.value)
                      }
                      className="pl-10 bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                    />
                  </div>
                </div>

                {/* Position */}
                <div className="grid gap-2">
                  <Label htmlFor="shift-position" className="text-white">
                    Position
                  </Label>
                  <Select
                    value={newShift.position}
                    onValueChange={(value) =>
                      handleInputChange("position", value)
                    }
                  >
                    <SelectTrigger className="bg-black/40 border border-white/20 text-white w-full">
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1A1A1A] border-white/10 text-white">
                      <SelectItem
                        value="morning"
                        className="focus:bg-white/10 focus:text-white cursor-pointer"
                      >
                        Morning Shift
                      </SelectItem>
                      <SelectItem
                        value="afternoon"
                        className="focus:bg-white/10 focus:text-white cursor-pointer"
                      >
                        Afternoon Shift
                      </SelectItem>
                      <SelectItem
                        value="evening"
                        className="focus:bg-white/10 focus:text-white cursor-pointer"
                      >
                        Evening Shift
                      </SelectItem>
                      <SelectItem
                        value="night"
                        className="focus:bg-white/10 focus:text-white cursor-pointer"
                      >
                        Night Shift
                      </SelectItem>
                      <SelectItem
                        value="DESIGN"
                        className="focus:bg-white/10 focus:text-white cursor-pointer"
                      >
                        Design
                      </SelectItem>
                      <SelectItem
                        value="PRODUCT"
                        className="focus:bg-white/10 focus:text-white cursor-pointer"
                      >
                        Product
                      </SelectItem>
                      <SelectItem
                        value="DEV"
                        className="focus:bg-white/10 focus:text-white cursor-pointer"
                      >
                        Dev
                      </SelectItem>
                      <SelectItem
                        value="MARKETING"
                        className="focus:bg-white/10 focus:text-white cursor-pointer"
                      >
                        Marketing
                      </SelectItem>
                      <SelectItem
                        value="CHECK-IN"
                        className="focus:bg-white/10 focus:text-white cursor-pointer"
                      >
                        Check-in
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Notes */}
                <div className="grid gap-2">
                  <Label htmlFor="shift-notes" className="text-white">
                    Notes
                  </Label>
                  <Input
                    id="shift-notes"
                    value={newShift.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    placeholder="Additional notes..."
                    className="bg-black/40 border border-white/20 text-white placeholder:text-white/40 focus-visible:ring-[#EFFC76]"
                  />
                </div>
              </div>

              <DialogFooter className="border-t border-white/10 pt-4 mt-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAddShiftDialogOpen(false)}
                  className="glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddShift}
                  disabled={isCreatingSchedule || isUpdatingSchedule}
                  className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black glass-button"
                >
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {isCreatingSchedule || isUpdatingSchedule
                    ? "Saving..."
                    : "Add Shift"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Schedule Meeting Dialog */}
          <ScheduleMeetingDialog
            open={isScheduleMeetingDialogOpen}
            onOpenChange={setIsScheduleMeetingDialogOpen}
            onSubmit={handleScheduleMeeting}
            teamMembers={teamMembers}
          />
        </div>
      </AppLayout>
    </PrivateRoute>
  );
}

export default function Schedule() {
  return (
    <Suspense
      fallback={<div className="p-8 text-white">Loading schedule...</div>}
    >
      <ScheduleContent />
    </Suspense>
  );
}
