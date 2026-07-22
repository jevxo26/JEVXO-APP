"use client";
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import SmoothButton from "@/Share/SmoothButton";
import Link from "next/link";

const ContactReady = () => {
  return (
    <div className="w-11/12 md:max-w-[1280px] mx-auto my-20">
      <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-b from-[#0e0e14] via-[#08080c] to-[#040406] border border-[#EFFC76]/30 p-10 md:p-20 text-center shadow-[0_25px_80px_rgba(0,0,0,0.9)]">
        
        {/* Glowing Top Line & Spotlight */}
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#EFFC76] to-transparent opacity-100" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-[#EFFC76]/15 blur-[120px] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl mx-auto">
          
          {/* Uniform Pulsing Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#EFFC76]/30 bg-[#EFFC76]/10 text-xs font-bold uppercase tracking-wider text-[#EFFC76]"
          >
            <div className="w-2 h-2 rounded-full bg-[#EFFC76] animate-pulse" />
            Instant Enterprise Consultation
          </motion.div>

          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight leading-tight"
          >
            Ready To Launch Your Next <br className="hidden md:block" />
            <span className="font-serif italic text-[#EFFC76]">Software Breakthrough?</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-base md:text-lg font-light leading-relaxed max-w-xl"
          >
            Schedule an interactive discovery call with our software engineering team to outline architecture, cost estimates, and rapid execution timelines.
          </motion.p>

          {/* CTA Group */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <a href="https://wa.me/8801886500056" target="_blank" rel="noopener noreferrer">
              <SmoothButton>Book Instant Call</SmoothButton>
            </a>

            <div className="flex items-center gap-2 text-gray-400 text-xs font-medium px-4 py-3 rounded-full bg-white/5 border border-white/10">
              <ShieldCheck size={16} className="text-[#EFFC76]" />
              <span>Strict NDA Guaranteed</span>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default ContactReady;
