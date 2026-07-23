"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Cpu, ShieldCheck, Zap } from "lucide-react";

const ProductHeader = () => {
  return (
    <div className="text-center pt-24 sm:pt-28 pb-12 relative z-20 select-none">
      
      {/* Top Badge */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#EFFC76]/30 bg-[#EFFC76]/10 text-[#EFFC76] text-xs font-mono font-bold uppercase tracking-[0.25em] mb-6 shadow-[0_0_20px_rgba(239,252,118,0.2)]"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-[#EFFC76] animate-pulse" />
        <span>FLAGSHIP SOFTWARE SUITE</span>
      </motion.div>

      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight uppercase max-w-4xl mx-auto"
      >
        Engineered Software &{" "}
        <span className="font-serif italic font-normal text-[#EFFC76] lowercase block sm:inline">
          flagship products
        </span>
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-6 text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed px-4"
      >
        Powering the next generation of enterprise digital commerce, cloud automation, AI workflows, and operational platforms.
      </motion.p>

      {/* Stat Pills Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-10"
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#081808]/80 border border-[#EFFC76]/30 backdrop-blur-xl">
          <Zap size={16} className="text-[#EFFC76]" />
          <span className="text-xs font-mono font-semibold text-gray-300">Sub-second Latency</span>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#081808]/80 border border-[#EFFC76]/30 backdrop-blur-xl">
          <ShieldCheck size={16} className="text-[#EFFC76]" />
          <span className="text-xs font-mono font-semibold text-gray-300">SOC2 & ISO Compliant</span>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#081808]/80 border border-[#EFFC76]/30 backdrop-blur-xl">
          <Cpu size={16} className="text-[#EFFC76]" />
          <span className="text-xs font-mono font-semibold text-gray-300">99.99% SLA Uptime</span>
        </div>
      </motion.div>

    </div>
  );
};

export default ProductHeader;
