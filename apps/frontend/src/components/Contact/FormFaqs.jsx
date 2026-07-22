"use client";
import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Lock, Code2, Globe, Cpu } from "lucide-react";

const FormFaqs = () => {
  return (
    <div className="w-11/12 md:max-w-[1280px] border border-white/10 md:p-12 p-6 rounded-3xl mx-auto my-16 bg-[#07070a]/90 backdrop-blur-2xl shadow-2xl relative overflow-hidden text-white">
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#EFFC76] to-transparent opacity-80" />

      <div className="text-center mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-wider text-[#EFFC76] mb-4">
          <div className="w-1.5 h-1.5 rounded-full bg-[#EFFC76] animate-pulse" />
          Global Architecture & Trust Matrix
        </div>
        <h2 className="text-3xl md:text-5xl font-medium text-white tracking-tight leading-tight">
          Engineered For Maximum <br />
          <span className="font-serif italic text-[#EFFC76]">Uptime & Performance</span>
        </h2>
        <p className="mt-4 text-gray-400 text-sm md:text-base font-light max-w-xl mx-auto">
          Our technical commitment to global enterprises across security, compliance, code quality, and cloud infrastructure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-[#EFFC76]/40 transition-all duration-300 relative group">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#EFFC76] mb-4 group-hover:scale-110 transition-transform">
            <Zap size={22} />
          </div>
          <h3 className="text-white text-base font-bold mb-2">99.99% Guaranteed SLA</h3>
          <p className="text-gray-400 text-xs font-light leading-relaxed mb-4">
            High-availability microservices architecture with automated multi-region cloud failover & 24/7 cluster monitoring.
          </p>
          <div className="text-[10px] font-bold text-[#EFFC76] uppercase tracking-wider bg-[#EFFC76]/10 px-2.5 py-1 rounded-full w-fit border border-[#EFFC76]/20">
            Zero-Downtime Architecture
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-[#EFFC76]/40 transition-all duration-300 relative group">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#EFFC76] mb-4 group-hover:scale-110 transition-transform">
            <Lock size={22} />
          </div>
          <h3 className="text-white text-base font-bold mb-2">Bank-Grade Encryption</h3>
          <p className="text-gray-400 text-xs font-light leading-relaxed mb-4">
            End-to-end TLS 1.3 encryption, AES-256 data protection at rest, strict SOC2 Type II guidelines & vulnerability audits.
          </p>
          <div className="text-[10px] font-bold text-[#EFFC76] uppercase tracking-wider bg-[#EFFC76]/10 px-2.5 py-1 rounded-full w-fit border border-[#EFFC76]/20">
            Encrypted Data Shield
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-[#EFFC76]/40 transition-all duration-300 relative group">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#EFFC76] mb-4 group-hover:scale-110 transition-transform">
            <ShieldCheck size={22} />
          </div>
          <h3 className="text-white text-base font-bold mb-2">100% IP Code Ownership</h3>
          <p className="text-gray-400 text-xs font-light leading-relaxed mb-4">
            Complete transfer of source code rights, repository ownership, database schemas, and zero proprietary vendor lock-in.
          </p>
          <div className="text-[10px] font-bold text-[#EFFC76] uppercase tracking-wider bg-[#EFFC76]/10 px-2.5 py-1 rounded-full w-fit border border-[#EFFC76]/20">
            Full IP Transfer Contract
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-[#EFFC76]/40 transition-all duration-300 relative group">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#EFFC76] mb-4 group-hover:scale-110 transition-transform">
            <Code2 size={22} />
          </div>
          <h3 className="text-white text-base font-bold mb-2">Agile CI/CD Delivery</h3>
          <p className="text-gray-400 text-xs font-light leading-relaxed mb-4">
            Continuous integration & deployment pipelines with bi-weekly demo releases, automated testing & staging environments.
          </p>
          <div className="text-[10px] font-bold text-[#EFFC76] uppercase tracking-wider bg-[#EFFC76]/10 px-2.5 py-1 rounded-full w-fit border border-[#EFFC76]/20">
            Bi-Weekly Sprint Releases
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormFaqs;