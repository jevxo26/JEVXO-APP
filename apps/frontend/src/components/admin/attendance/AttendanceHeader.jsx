"use client";

import React from "react";
import { Download, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export default function AttendanceHeader() {
  const [date, setDate] = React.useState(new Date());

  return (
    <div className="flex flex-col xl:flex-row justify-between gap-4 mb-6 items-center">
      <div className="flex items-center gap-3 sm:gap-4 w-full xl:w-auto">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#EFFC76]/20 to-transparent blur-xl" />
          <Sparkles className="w-6 h-6 text-[#EFFC76] relative z-10" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
            Attendance
          </h1>
          <p className="text-xs text-white/50 mt-0.5 font-medium">
            Track employee attendance, work hours, and status.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap w-full xl:w-auto justify-end">
        <div className="flex items-center rounded-lg border border-white/15 bg-white/5 backdrop-blur-xl p-1 shadow-[0_0_24px_rgba(0,0,0,0.45)]">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white/60 hover:text-[#EFFC76] hover:bg-white/5"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <Popover>
            <PopoverTrigger asChild>
               <Button
                 variant="ghost"
                 className="h-8 px-3 text-sm font-medium text-white hover:bg-white/5 hover:text-[#EFFC76]"
               >
                 <CalendarIcon className="mr-2 h-4 w-4 text-[#EFFC76]" />
                 {format(date, "MMM dd, yyyy")}
               </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-white/60 hover:text-[#EFFC76] hover:bg-white/5"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <Button
          variant="outline"
          className="gap-2 glass-button border border-[#EFFC76]/60 bg-[#EFFC76] text-black hover:bg-[#e0ef5f]"
        >
          <Download className="w-4 h-4 text-black" />
          <span className="font-medium">Export Report</span>
        </Button>
      </div>
    </div>
  );
}
