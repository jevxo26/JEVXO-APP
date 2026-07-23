"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  HeartHandshake,
  Cpu,
  Code2,
  Server,
  Database,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  Users,
  Globe2,
  Award,
  Rocket,
  Compass,
} from "lucide-react";
import CosmicBackground from "@/components/Home/CosmicBackground";
import OurTeam from "@/components/Home/OurTeam";

// Key Stats Data
const stats = [
  {
    icon: CheckCircle2,
    value: "150+",
    label: "Projects Delivered",
    description: "Enterprise software, SaaS & Mobile apps",
  },
  {
    icon: Users,
    value: "99.9%",
    label: "Client Satisfaction",
    description: "Verified reviews & long-term retention",
  },
  {
    icon: Globe2,
    value: "20+",
    label: "Countries Served",
    description: "Global enterprise & startup partners",
  },
  {
    icon: Award,
    value: "24/7",
    label: "Dedicated Support",
    description: "Real-time monitoring & SLA maintenance",
  },
];

// Core Values Data
const companyValues = [
  {
    icon: Sparkles,
    title: "Innovation First",
    description:
      "We pioneer cutting-edge frameworks, AI automation, and modern cloud architectures to keep your business far ahead of competitors.",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Reliability",
    description:
      "Security, zero-downtime deployments, and high availability are embedded into every layer of software we architect.",
  },
  {
    icon: Zap,
    title: "Agile & Rapid Execution",
    description:
      "Rapid sprint cycles and automated CI/CD pipelines ensure seamless, transparent, and predictable product delivery.",
  },
  {
    icon: HeartHandshake,
    title: "Strategic Partnership",
    description:
      "We act as a seamless extension of your engineering team, offering strategic technical guidance and round-the-clock support.",
  },
];



// Development Process Steps
const processSteps = [
  {
    step: "01",
    title: "Discovery & Architecture",
    description: "We analyze your business goals, technical requirements, and design scalable system blueprints.",
  },
  {
    step: "02",
    title: "UI/UX & Prototyping",
    description: "We craft intuitive, high-converting interfaces with pixel-perfect precision and micro-interactions.",
  },
  {
    step: "03",
    title: "Agile Engineering & QA",
    description: "Iterative sprint development with continuous integration, automated testing, and code reviews.",
  },
  {
    step: "04",
    title: "Deployment & Scaling",
    description: "Smooth production launch, cloud monitoring, performance optimization, and 24/7 dedicated support.",
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-28 pb-36 relative overflow-x-hidden text-white bg-[#050505] select-none">
      {/* Background Cosmic Particle Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CosmicBackground />
      </div>

      <div className="relative z-10 w-10/12 mx-auto space-y-20 md:space-y-28">
        
        {/* ================= 1. HERO SECTION ================= */}
        <section className="text-center pt-6 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-wider text-[#EFFC76] mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#EFFC76] animate-pulse" />
            About JEVXO Company
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-6xl font-medium text-white tracking-tight max-w-5xl mx-auto"
          >
            Empowering Enterprises With{" "}
            <span className="font-serif italic text-[#EFFC76]">
              Next-Gen Software
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto font-light"
          >
            JEVXO is a premier software engineering company delivering custom web applications, mobile platforms, cloud computing, and AI automation built for global scale.
          </motion.p>
        </section>

        {/* ================= 2. IMPACT STATS SECTION ================= */}
        <section className="-mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#0a0a0c]/80 border border-white/10 rounded-2xl p-6 text-center hover:border-[#EFFC76]/30 transition-all backdrop-blur-md"
              >
                <div className="inline-flex p-3 rounded-full bg-white/5 border border-white/10 text-[#EFFC76] mb-4">
                  <stat.icon size={22} />
                </div>
                <h3 className="text-4xl font-extrabold text-white mb-1 tracking-tight">
                  {stat.value}
                </h3>
                <p className="text-base font-semibold text-gray-200 mb-1">
                  {stat.label}
                </p>
                <p className="text-xs text-gray-400 font-light">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= 3. COMPANY STORY & PHILOSOPHY ================= */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#EFFC76] font-medium">
                <Compass size={14} />
                <span>Our Story & Vision</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
                Built on Technical Excellence & <br />
                <span className="text-gray-400">Creative Innovation</span>
              </h2>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed font-light">
                Founded with a mission to bridge complex business challenges with elegant digital engineering, JEVXO transforms ambitious concepts into high-performing digital products.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="text-white font-semibold text-base mb-1">Custom Software</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">Scalable web & SaaS solutions crafted specifically for your workflow.</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <h4 className="text-white font-semibold text-base mb-1">Cloud & DevOps</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">Automated deployment, high availability, and 99.9% uptime architectures.</p>
                </div>
              </div>
            </div>

            {/* Right Image Banner */}
            <div className="lg:col-span-5 relative h-[420px] rounded-3xl overflow-hidden border border-white/10 group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
              <img
                src="https://i.ibb.co.com/j9mhfwk5/image.png"
                alt="JEVXO Company Innovation"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-6 left-6 right-6 z-20">
                <span className="text-xs uppercase font-semibold text-[#EFFC76] tracking-wider block mb-1">JEVXO Culture</span>
                <p className="text-white text-sm font-medium leading-snug">Engineering digital products that empower enterprise growth worldwide.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 4. CORE VALUES SECTION ================= */}
        <section>
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Our Core Engineering Principles
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-light">
              The foundational values that drive our development standards and client partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyValues.map((val, idx) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#0c0c0e]/80 border border-white/10 rounded-2xl p-6 hover:border-[#EFFC76]/40 transition-all backdrop-blur-md group"
              >
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[#EFFC76] w-fit mb-5 group-hover:bg-[#EFFC76] group-hover:text-black transition-colors">
                  <val.icon size={22} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {val.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">
                  {val.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>



        {/* ================= 6. MEET OUR ENGINEERING TEAM ================= */}
        <section className="-mt-8">
          <OurTeam />
        </section>

        {/* ================= 7. DEVELOPMENT PROCESS ================= */}
        <section>
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Our Development Methodology
            </h2>
            <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto font-light">
              How we take your ideas from initial architectural discovery to production launch.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((p, idx) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#0a0a0c]/80 border border-white/10 rounded-2xl p-6 relative overflow-hidden group hover:border-[#EFFC76]/40 transition-all"
              >
                <div className="text-4xl font-extrabold text-[#EFFC76]/30 group-hover:text-[#EFFC76] transition-colors mb-4">
                  {p.step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {p.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-light">
                  {p.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

     
      </div>
    </div>
  );
};

export default AboutPage;
