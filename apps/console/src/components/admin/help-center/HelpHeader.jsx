"use client";

import React from "react";
import { Search, Sparkles, LifeBuoy } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function HelpHeader() {
  return (
    <div className="relative rounded-3xl p-8 md:p-12 mb-12 overflow-hidden border border-white/10 shadow-2xl">
      {/* Premium Background Effects */}
      {/* <div className="absolute"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px]  rounded-full -translate-y-1/2 translate-x-1/3 blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full translate-y-1/3 -translate-x-1/4 blur-[80px]"></div> */}

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] "></div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full  border border-white/10 mb-6 backdrop-blur-md">
          <LifeBuoy className="w-4 h-4 text-[#EFFC76]" />
          <span className="text-xs font-medium text-white/80 tracking-wide uppercase">
            Help Center & Support
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent">
          How can we help you today?
        </h1>
        <p className="text-white/60 mb-10 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
          Search our knowledge base for answers, browse popular topics, or
          connect with our support team.
        </p>

        <div className="relative max-w-xl mx-auto group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#EFFC76]/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative flex items-center bg-[#1A1A1A]/80 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-2xl">
            <Search className="w-6 h-6 text-white/40 ml-3 mr-2" />
            <Input
              className="w-full border-none bg-transparent shadow-none text-white text-lg placeholder:text-white/30 focus-visible:ring-0 h-12"
              placeholder="Search for articles, guides, or troubleshooting..."
            />
            <div className="hidden sm:flex items-center gap-1 pr-2">
              <span className="px-2 py-1 rounded-md bg-white/10 border border-white/10 text-xs text-white/40 font-mono">
                CMD+K
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-white/60">
          <span className="opacity-70">Popular:</span>
          {["Getting Started", "API Keys", "Billing", "User Roles"].map(
            (tag) => (
              <button
                key={tag}
                className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#EFFC76]/30 hover:text-[#EFFC76] transition-all duration-300"
              >
                {tag}
              </button>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
