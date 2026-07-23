"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  Sparkles,
  Server,
  Lock,
  ArrowRight,
} from "lucide-react";
import CosmicBackground from "@/components/Home/CosmicBackground";
import AppointmentModal from "@/components/Home/AppointmentModal";
import { solutionsData } from "../page";

const SolutionDetailPage = () => {
  const params = useParams();
  const slug = params?.slug;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const solution = solutionsData.find((s) => s.id === slug) || solutionsData[0];

  return (
    <>
      <div className="min-h-screen pt-28 pb-36 relative overflow-x-hidden text-white bg-[#050505] select-none">
        
        {/* Cosmic Background Mesh */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <CosmicBackground />
        </div>

        {/* Ambient Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#EFFC76]/5 rounded-full blur-[180px] pointer-events-none" />

        {/* 10/12 Container Width */}
        <div className="w-10/12 mx-auto relative z-10 space-y-16">
          
          {/* Top Back Navigation */}
          <div>
            <Link
              href="/main/solutions"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#EFFC76]/40 bg-[#EFFC76]/10 text-[#EFFC76] text-xs font-mono font-bold hover:bg-[#EFFC76] hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(239,252,118,0.2)] group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to All 6 Software Solutions</span>
            </Link>
          </div>

          {/* ================= HERO SECTION ================= */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Title & Overview (7 Cols) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#EFFC76]/15 text-[#EFFC76] border border-[#EFFC76]/30 uppercase tracking-widest">
                  {solution.category} PLATFORM
                </span>
                <span className="px-3.5 py-1 rounded-full text-[10px] font-mono font-bold bg-white/5 text-gray-300 border border-white/10 uppercase tracking-widest">
                  {solution.badge}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight uppercase">
                {solution.title}
              </h1>

              <p className="text-gray-300 text-base sm:text-lg md:text-xl font-light leading-relaxed">
                {solution.fullDescription}
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {solution.stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-[#051105]/92 border border-[#EFFC76]/25 rounded-2xl p-4 backdrop-blur-xl"
                  >
                    <span className="text-2xl sm:text-3xl font-black text-[#EFFC76] tracking-tight block">
                      {stat.value}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-gray-300 uppercase block mt-1">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#EFFC76] hover:bg-[#f3ff8c] text-black font-extrabold text-xs sm:text-sm px-8 py-4 rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(239,252,118,0.5)] flex items-center gap-2"
                >
                  <span>Book Solution Architecture Call</span>
                  <ArrowUpRight size={18} className="stroke-[2.5]" />
                </button>

                <Link
                  href="/main/contact"
                  className="bg-[#081808]/90 border border-[#EFFC76]/40 hover:border-[#EFFC76] text-white hover:text-[#EFFC76] font-semibold text-xs sm:text-sm px-7 py-4 rounded-full transition-all duration-300 backdrop-blur-xl"
                >
                  Contact Sales Team
                </Link>
              </div>
            </motion.div>

            {/* Right Column: Image Frame (5 Cols) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative h-[360px] sm:h-[440px] rounded-[32px] overflow-hidden border border-[#EFFC76]/35 shadow-[0_20px_50px_rgba(0,0,0,0.95)] group bg-[#081208]"
            >
              <img
                src={solution.image}
                alt={solution.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040a04]/90 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 right-6 z-10 space-y-1">
                <span className="text-[10px] font-mono font-bold text-[#EFFC76] uppercase tracking-widest block">
                  ENTERPRISE DEPLOYMENT READY
                </span>
                <p className="text-white text-xs sm:text-sm font-light leading-snug">
                  High-availability architecture backed by 99.99% cloud uptime SLA.
                </p>
              </div>
            </motion.div>

          </section>

          {/* ================= SOFTWARE MODULES BREAKDOWN ================= */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#051105]/92 border border-[#EFFC76]/30 rounded-[32px] p-7 sm:p-9 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-xl bg-[#EFFC76]/15 border border-[#EFFC76]/40 text-[#EFFC76]">
                <Layers size={18} />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#EFFC76] font-bold uppercase tracking-widest block">PLATFORM CAPABILITIES</span>
                <h3 className="text-xl sm:text-2xl font-black text-white">Core Software Modules Included</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {solution.features.map((feat, i) => (
                <div key={i} className="bg-[#081808] border border-[#EFFC76]/20 rounded-2xl p-5 hover:border-[#EFFC76] transition-all group">
                  <span className="text-xs font-mono font-black text-[#EFFC76] px-2.5 py-1 rounded-lg bg-[#EFFC76]/15 border border-[#EFFC76]/30 inline-block mb-3">
                    Module 0{i + 1}
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#EFFC76] transition-colors leading-snug">
                    {feat}
                  </h4>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ================= INTEGRATIONS & TECH STACK ================= */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#051105]/92 border border-[#EFFC76]/30 rounded-[32px] p-7 sm:p-9 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2 text-[#EFFC76]">
                  <Cpu size={18} />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest">ECOSYSTEM INTEGRATIONS</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">Pre-Built Software Integrations</h3>
                <p className="text-gray-300 text-xs sm:text-sm font-light mt-1">
                  Connect seamlessly with your existing infrastructure, payment gateways, and databases.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5 max-w-lg">
                {solution.integrations.map((ing, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-xl text-xs font-mono font-extrabold bg-[#091f09] text-[#EFFC76] border border-[#EFFC76]/40 hover:border-[#EFFC76] hover:bg-[#EFFC76] hover:text-black transition-all cursor-default shadow-md"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ================= BOTTOM CTA ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#051105]/95 border border-[#EFFC76]/35 rounded-[32px] p-8 sm:p-12 text-center relative overflow-hidden backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.95)]"
          >
            <div className="max-w-2xl mx-auto space-y-4">
              <span className="text-[10px] font-mono font-extrabold text-[#EFFC76] uppercase tracking-widest px-4 py-1.5 rounded-full bg-[#EFFC76]/15 border border-[#EFFC76]/30 inline-block">
                EXECUTIVE KICK-OFF
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                Ready to Implement {solution.title}?
              </h2>
              <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
                Connect with our enterprise solution architects today for a technical roadmap call and custom proposal.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center gap-2 bg-[#EFFC76] hover:bg-[#f3ff8c] text-black font-extrabold text-xs sm:text-sm px-8 py-4 rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(239,252,118,0.5)]"
                >
                  <span>Book Free Solution Architecture Call</span>
                  <ArrowRight size={16} className="stroke-[2.5]" />
                </button>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default SolutionDetailPage;
