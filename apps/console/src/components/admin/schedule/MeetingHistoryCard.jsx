"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, 
  Clock, 
  Users, 
  Copy, 
  Check, 
  ExternalLink,
  Video,
  MoreVertical,
  Trash2,
  RotateCcw
} from "lucide-react";
import { toast } from "sonner";
import { copyToClipboard } from "@/lib/generateMeetingLink";
import { format, parseISO, isPast, isFuture } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  useDeleteMeetingMutation,
  useRestoreMeetingMutation,
  usePermanentDeleteMeetingMutation
} from "@/api/admin/meeting/meetingApi";

const STATUS_STYLES = {
  upcoming: {
    badge: "bg-blue-500/20 text-blue-300 border-blue-400/30",
    icon: "text-blue-400",
  },
  completed: {
    badge: "bg-green-500/20 text-green-300 border-green-400/30",
    icon: "text-green-400",
  },
  cancelled: {
    badge: "bg-red-500/20 text-red-300 border-red-400/30",
    icon: "text-red-400",
  },
  trash: {
    badge: "bg-red-500/20 text-red-400 border-red-500/30",
    icon: "text-red-400",
  },
};

export default function MeetingHistoryCard({ meeting }) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [deleteMeeting, { isLoading: isDeleting }] = useDeleteMeetingMutation();
  const [restoreMeeting, { isLoading: isRestoring }] = useRestoreMeetingMutation();
  const [permanentDeleteMeeting, { isLoading: isPermanentlyDeleting }] = usePermanentDeleteMeetingMutation();

  const isTrashed = !!meeting.deletedAt;

  const handleCopyLink = async () => {
    const success = await copyToClipboard(meeting.meetingLink);
    if (success) {
      setCopiedLink(true);
      toast.success("Meeting link copied!");
      setTimeout(() => setCopiedLink(false), 2000);
    } else {
      toast.error("Failed to copy link");
    }
  };

  const handleDelete = async () => {
    try {
      if (isTrashed) {
        if (confirm("Are you sure you want to permanently delete this meeting? This action cannot be undone.")) {
          await permanentDeleteMeeting(meeting.id).unwrap();
          toast.success("Meeting permanently deleted");
        }
      } else {
        await deleteMeeting(meeting.id).unwrap();
        toast.success("Meeting moved to trash");
      }
    } catch (error) {
      console.error("Failed to delete meeting:", error);
      toast.error("Failed to delete meeting");
    }
  };

  const handleRestore = async () => {
    try {
      await restoreMeeting(meeting.id).unwrap();
      toast.success("Meeting restored successfully");
    } catch (error) {
      console.error("Failed to restore meeting:", error);
      toast.error("Failed to restore meeting");
    }
  };

  const meetingDate = parseISO(meeting.dateTime);
  const isUpcoming = isFuture(meetingDate);
  const statusKey = isTrashed ? 'trash' : meeting.status;
  const statusStyle = STATUS_STYLES[statusKey] || STATUS_STYLES.upcoming;
  const statusLabel = isTrashed ? 'Trashed' : (meeting.status.charAt(0).toUpperCase() + meeting.status.slice(1));

  return (
    <Card className="glass-card border-white/20 hover:border-white/30 transition-all duration-300 group">
      <CardContent className="p-4 md:p-5">
        {/* Header with Topic, Status, and Menu */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-lg font-semibold text-white mb-1 truncate">
              {meeting.topic}
            </h3>
            {meeting.description && (
              <p className="text-sm text-white/60 line-clamp-2">
                {meeting.description}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
             <span
              className={`px-2.5 py-1 rounded-full text-xs font-medium border shrink-0 ${statusStyle.badge}`}
            >
              {statusLabel}
            </span>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-white/50 hover:text-white hover:bg-white/10">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-black/90 border-white/20 text-white backdrop-blur-xl">
                 {isTrashed && (
                   <DropdownMenuItem 
                    onClick={handleRestore}
                    className="text-white focus:text-white focus:bg-white/10 cursor-pointer"
                    disabled={isRestoring}
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    {isRestoring ? "Restoring..." : "Restore"}
                  </DropdownMenuItem>
                 )}
                 <DropdownMenuItem 
                  onClick={handleDelete}
                  className="text-red-400 focus:text-red-300 focus:bg-white/10 cursor-pointer"
                  disabled={isDeleting || isPermanentlyDeleting}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {isTrashed 
                    ? (isPermanentlyDeleting ? "Deleting..." : "Delete Permanently")
                    : (isDeleting ? "Deleting..." : "Delete Meeting")
                  }
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Date, Time, and Duration */}
        <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-white/70">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#EFFC76]" />
            <span>{format(meetingDate, "MMM dd, yyyy")}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#EFFC76]" />
            <span>{format(meetingDate, "hh:mm a")}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Video className="w-4 h-4 text-[#EFFC76]" />
            <span>{meeting.duration} min</span>
          </div>
        </div>

        {/* Attendees */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-white/60" />
            <span className="text-xs text-white/60 font-medium">
              {meeting.attendees.length} Attendee{meeting.attendees.length > 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {meeting.attendees.slice(0, 5).map((attendee, index) => (
                <Avatar
                  key={attendee.id || index}
                  className="w-8 h-8 border-2 border-black"
                  title={attendee.name}
                >
                  <AvatarImage src={attendee.avatar} />
                  <AvatarFallback className="bg-[#EFFC76]/20 text-[#EFFC76] text-xs">
                    {attendee.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            {meeting.attendees.length > 5 && (
              <span className="text-xs text-white/50">
                +{meeting.attendees.length - 5} more
              </span>
            )}
          </div>
        </div>

        {/* Meeting Link and Actions */}
        {!isTrashed && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-3 border-t border-white/10">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-white/50 mb-1">Meeting Link</p>
              <p className="text-xs text-white/70 font-mono truncate">
                {meeting.meetingLink}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyLink}
                className="glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 mr-1.5" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 mr-1.5" />
                    Copy
                  </>
                )}
              </Button>
              {isUpcoming && meeting.status === "upcoming" && (
                <Button
                  size="sm"
                  className="bg-[#EFFC76] hover:bg-[#e0ef5f] text-black"
                  onClick={() => window.open(meeting.meetingLink, "_blank")}
                >
                  <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                  Join
                </Button>
              )}
            </div>
          </div>
        )}
        
        {isTrashed && (
           <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRestore}
                disabled={isRestoring}
                className="glass-button border border-white/30 bg-white/5 text-white hover:bg-white/10"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                Restore
              </Button>
              <Button
                size="sm"
                onClick={handleDelete}
                disabled={isPermanentlyDeleting}
                className="bg-red-500/20 text-red-500 hover:bg-red-500/30 border border-red-500/30"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                Delete Forever
              </Button>
           </div>
        )}

        {/* Organizer */}
        {meeting.organizer && (
          <div className="mt-3 pt-3 border-t border-white/10">
            <p className="text-xs text-white/50">
              Organized by <span className="text-white/70 font-medium">{meeting.organizer}</span>
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
