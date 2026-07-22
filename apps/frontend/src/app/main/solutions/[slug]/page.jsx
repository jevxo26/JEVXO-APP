"use client";

import React from "react";
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
  TrendingUp,
  Clock,
  Award,
  ChevronRight,
} from "lucide-react";
import CosmicBackground from "@/components/Home/CosmicBackground";
import { solutionsData } from "../page";

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.1,
      ease: [0.215, 0.61, 0.355, 1.0],
    },
  }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardHover = {
  hover: {
    y: -8,
    scale: 1.02,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const SolutionDetailPage = () => {
  const params = useParams();
  const slug = params?.slug;

  const solution = solutionsData.find((s) => s.id === slug) || solutionsData[0];

  return (
    <div className="min-h-screen pt-28 pb-24 relative overflow-x-hidden text-white bg-[#050505]">
      {/* Background Particle Mesh */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CosmicBackground />
      </div>

      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#EFFC76]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 space-y-20 md:space-y-28">
        
        {/* Top Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/solutions"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-300 hover:text-[#EFFC76] transition-colors bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md hover:border-[#EFFC76]/40"
          >
            <ArrowLeft size={14} />
            <span>Back to All 6 Solutions</span>
          </Link>
        </motion.div>

        {/* 1. HERO SECTION WITH ANIMATIONS */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6"
          >
            {/* Category Pill */}
            <motion.div variants={fadeIn} custom={0}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#EFFC76]/30 text-xs text-[#EFFC76] font-bold uppercase tracking-wider backdrop-blur-md">
                <Sparkles size={14} />
                <span>{solution.category} SOLUTION</span>
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeIn}
              custom={1}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]"
            >
              {solution.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeIn}
              custom={2}
              className="text-gray-300 text-lg sm:text-xl font-light leading-relaxed max-w-2xl"
            >
              {solution.fullDescription}
            </motion.p>

            {/* Impact Badges */}
            <motion.div variants={fadeIn} custom={3} className="flex flex-wrap gap-4 pt-2">
              {solution.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-[#0e0e12] border border-white/10 rounded-2xl px-5 py-3 flex flex-col justify-center backdrop-blur-md hover:border-[#EFFC76]/40 transition-colors"
                >
                  <span className="text-2xl font-extrabold text-[#EFFC76] tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs text-gray-400 font-medium">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Action Button */}
            <motion.div variants={fadeIn} custom={4} className="pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-[#EFFC76] text-black font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-full hover:bg-[#EFFC76]/90 transition-all shadow-[0_10px_30px_rgba(239,252,118,0.2)] group"
              >
                <span>Book Solution Architecture Call</span>
                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Image Banner Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative h-[420px] sm:h-[480px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] group"
          >
            <img
              src={solution.image}
              alt={solution.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 z-10 space-y-1">
              <span className="text-[11px] font-bold text-[#EFFC76] uppercase tracking-wider block">
                PRODUCTION-READY ARCHITECTURE
              </span>
              <p className="text-white text-sm font-medium leading-snug">
                Customizable software framework engineered for high availability & security.
              </p>
            </div>
          </motion.div>
        </section>

        {/* 2. KEY CAPABILITIES SECTION WITH STAGGERED FADE-IN */}
        <section className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#EFFC76] uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              ENTERPRISE FEATURES
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Key Capabilities & System Features
            </h2>
            <p className="text-gray-400 text-sm font-light">
              Engineered with zero technical debt, high throughput, and seamless third-party integrations.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {solution.features.map((feat, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                custom={i}
                whileHover="hover"
                variants={cardHover}
                className="bg-[#0c0c0e]/90 border border-white/10 rounded-2xl p-6 hover:border-[#EFFC76]/50 transition-all duration-300 backdrop-blur-md hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between group"
              >
                <div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[#EFFC76] w-fit mb-5 group-hover:bg-[#EFFC76] group-hover:text-black transition-colors duration-300">
                    <CheckCircle2 size={22} />
                  </div>
                  <span className="text-[11px] font-semibold text-[#EFFC76] uppercase tracking-wider block mb-1">
                    Capability 0{i + 1}
                  </span>
                  <h3 className="text-base font-semibold text-white mb-2 leading-snug">
                    {feat}
                  </h3>
                </div>
                <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500 group-hover:text-gray-300 transition-colors">
                  <span>JEVXO Module</span>
                  <ChevronRight size={14} className="text-[#EFFC76]" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* 3. RECOMMENDED TECH STACK */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-r from-[#0c0c0e] via-[#101014] to-[#0c0c0e] border border-white/10 rounded-3xl p-8 sm:p-12 backdrop-blur-md relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs text-[#EFFC76] font-medium">
                <Cpu size={15} />
                <span>TECH STACK & DEPLOYMENT</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">Recommended Framework Stack</h3>
              <p className="text-gray-400 text-sm font-light max-w-xl">
                Fully tailored to integrate with your existing cloud infrastructure, OAuth servers, and relational or vector databases.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 max-w-md justify-start md:justify-end">
              {solution.techStack.map((tech) => (
                <motion.span
                  key={tech}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-medium text-xs tracking-wide hover:border-[#EFFC76]/50 hover:text-[#EFFC76] transition-all cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 4. IMPLEMENTATION ROADMAP */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#EFFC76] uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              DELIVERY RHYTHM
            </span>
            <h2 className="text-3xl font-bold text-white">4-Step Implementation Roadmap</h2>
            <p className="text-gray-400 text-sm font-light">From initial discovery blueprint to production launch and 24/7 SLA support.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Technical Discovery", desc: "System blueprinting & API specifications" },
              { step: "02", title: "UI/UX & Architecture", desc: "Pixel-perfect prototypes & database schemas" },
              { step: "03", title: "Agile Development", desc: "Iterative sprints & automated CI/CD testing" },
              { step: "04", title: "Launch & 24/7 SLA", desc: "Cloud deployment, monitoring & maintenance" },
            ].map((st, idx) => (
              <motion.div
                key={st.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#0a0a0c]/80 border border-white/10 rounded-2xl p-6 hover:border-[#EFFC76]/40 transition-all"
              >
                <span className="text-3xl font-extrabold text-[#EFFC76] block mb-2">{st.step}</span>
                <h4 className="text-base font-semibold text-white mb-1">{st.title}</h4>
                <p className="text-xs text-gray-400 font-light leading-relaxed">{st.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 5. CALL TO ACTION BANNER */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-gradient-to-r from-indigo-950/30 via-[#0d0d10] to-purple-950/30 border border-white/10 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl"
        >
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="text-xs uppercase font-bold tracking-widest text-[#EFFC76] bg-[#EFFC76]/10 border border-[#EFFC76]/20 px-4 py-1.5 rounded-full inline-block">
              BUILD WITH JEVXO
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              Ready to Implement {solution.title}?
            </h2>
            <p className="text-gray-300 text-sm sm:text-base font-light">
              Connect with our enterprise solution architects today for a technical roadmap call and custom proposal.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 bg-white text-black font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-full hover:bg-gray-100 transition-colors shadow-lg group"
              >
                <span>BOOK FREE CONSULTATION</span>
                <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
};

export default SolutionDetailPage;
