"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles } from "lucide-react";

export default function RecruitmentHeader({
  activeTab,
  onTabChange,
  onNewJob,
}) {
  return (
    <div className="flex flex-col xl:flex-row justify-between gap-4 mb-6 items-center">
      <div className="flex items-center gap-3 sm:gap-4 w-full xl:w-auto">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#EFFC76]/20 to-transparent blur-xl" />
          <Sparkles className="w-6 h-6 text-[#EFFC76] relative z-10" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-white to-white/70 bg-clip-text text-transparent">
            Recruitment
          </h1>
          <p className="text-xs text-white/50 mt-0.5 font-medium">
            Manage job postings, candidates, and interviews
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full xl:w-auto">
        <Tabs
          value={activeTab}
          onValueChange={onTabChange}
          className="w-full sm:w-auto"
        >
          <TabsList className="w-full sm:w-auto grid grid-cols-3 sm:flex bg-white/5 border border-white/10">
            <TabsTrigger
              value="jobs"
              className="data-[state=active]:bg-[#EFFC76] data-[state=active]:text-black text-white/70"
            >
              Jobs
            </TabsTrigger>
            <TabsTrigger
              value="candidates"
              className="data-[state=active]:bg-[#EFFC76] data-[state=active]:text-black text-white/70"
            >
              Candidates
            </TabsTrigger>
            <TabsTrigger
              value="calendar"
              className="data-[state=active]:bg-[#EFFC76] data-[state=active]:text-black text-white/70"
            >
              Calendar
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {activeTab === "jobs" && (
          <Button
            onClick={onNewJob}
            className="bg-gradient-to-r from-[#EFFC76] to-[#e0ef5f] hover:from-[#e0ef5f] hover:to-[#d0df4f] text-black font-bold shadow-lg shadow-[#EFFC76]/30 hover:shadow-xl hover:shadow-[#EFFC76]/40 transition-all duration-300 hover:scale-105"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Post New Job
          </Button>
        )}
      </div>
    </div>
  );
}
