"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Settings, Sparkles } from "lucide-react";

export default function EmailHeader({ onConfigureClick }) {
  return (
    <div className="flex flex-col xl:flex-row justify-between gap-4 mb-6 items-center">
      <div className="flex items-center gap-3 sm:gap-4 w-full xl:w-auto">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#EFFC76]/20 to-transparent blur-xl" />
          <Sparkles className="w-6 h-6 text-[#EFFC76] relative z-10" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
            Email Alerts
          </h1>
          <p className="text-xs text-white/50 mt-0.5 font-medium">
            Send notifications to your team using SMTP
          </p>
        </div>
      </div>

      <Button
        onClick={onConfigureClick}
        className="gap-2 bg-gradient-to-r from-[#EFFC76] to-[#e0ef5f] hover:from-[#e0ef5f] hover:to-[#d0df4f] text-black font-bold shadow-lg shadow-[#EFFC76]/30 hover:shadow-xl hover:shadow-[#EFFC76]/40 transition-all duration-300 hover:scale-105"
      >
        <Settings className="w-4 h-4" />
        Configure SMTP
      </Button>
    </div>
  );
}
