"use client";

import React from "react";
import { Download, Calendar, Filter, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

export default function ReportsHeader({ date, setDate }) {
  return (
    <div className="flex flex-col xl:flex-row justify-between gap-4 mb-6 items-center">
      <div className="flex items-center gap-3 sm:gap-4 w-full xl:w-auto">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#EFFC76]/20 to-transparent blur-xl" />
          <Sparkles className="w-6 h-6 text-[#EFFC76] relative z-10" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
            Reports
          </h1>
          <p className="text-xs text-white/50 mt-0.5 font-medium">
            Analyze business performance and team efficiency.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full xl:w-auto">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full sm:w-[260px] justify-start text-left font-normal bg-white/5 border border-white/20 text-white hover:bg-white/10 glass-button h-9 sm:h-10 text-xs sm:text-sm"
            >
              <Calendar className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-[#EFFC76]" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span className="text-white/60">Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <CalendarComponent
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="flex-1 sm:flex-none glass-button border border-white/20 bg-transparent text-white/80 hover:bg-white/10 hover:text-white h-9 sm:h-10 text-xs sm:text-sm"
          >
            <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Filter
          </Button>

          <Button className="flex-1 sm:flex-none bg-gradient-to-r from-[#EFFC76] to-[#e0ef5f] hover:from-[#e0ef5f] hover:to-[#d0df4f] text-black font-bold shadow-lg shadow-[#EFFC76]/30 hover:shadow-xl hover:shadow-[#EFFC76]/40 transition-all duration-300 hover:scale-105 h-9 sm:h-10 text-xs sm:text-sm border-none">
            <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5" />
            <span>Export</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
