"use client";

import React from "react";
import { ChevronLeft, ChevronRight, PlayCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, subMonths, addMonths } from "date-fns";
import CreatePayrollDialog from "@/components/admin/payroll/CreatePayrollDialog";

export default function PayrollHeader() {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [openCreate, setOpenCreate] = React.useState(false);

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  return (
    <>
      <div className="flex flex-col xl:flex-row justify-between gap-4 mb-6 items-center">
        <div className="flex items-center gap-3 sm:gap-4 w-full xl:w-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#EFFC76]/20 to-transparent blur-xl" />
            <Sparkles className="w-6 h-6 text-[#EFFC76] relative z-10" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
              Payroll
            </h1>
            <p className="text-xs text-white/50 mt-0.5 font-medium">
              Manage salaries, bonuses, and process payments.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full xl:w-auto">
          <div className="flex items-center justify-between w-full sm:w-auto glass-card rounded-xl px-2 py-1 border-white/20">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevMonth}
              className="h-8 w-8 text-white/70 hover:text-[#EFFC76] hover:bg-white/10"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium px-4 min-w-[140px] text-center text-white">
              {format(currentDate, "MMMM yyyy")}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNextMonth}
              className="h-8 w-8 text-white/70 hover:text-[#EFFC76] hover:bg-white/10"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <Button
            onClick={() => setOpenCreate(true)}
            className="w-full sm:w-auto bg-gradient-to-r from-[#EFFC76] to-[#e0ef5f] hover:from-[#e0ef5f] hover:to-[#d0df4f] text-black font-bold shadow-lg shadow-[#EFFC76]/30 hover:shadow-xl hover:shadow-[#EFFC76]/40 transition-all duration-300 hover:scale-105"
          >
            <PlayCircle className="w-4 h-4 mr-1.5" />
            <span>Create Payroll</span>
          </Button>
        </div>
      </div>

      <CreatePayrollDialog
        open={openCreate}
        onOpenChange={setOpenCreate}
        defaultYear={currentDate.getFullYear()}
        defaultMonth={currentDate.getMonth() + 1}
      />
    </>
  );
}
