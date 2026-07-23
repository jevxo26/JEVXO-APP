"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Code2,
  Smartphone,
  Cpu,
  Globe,
  ShieldCheck,
  Palette,
  PenTool,
  Shield,
  Monitor,
  BarChart,
  LineChart,
  UserPen,
  Database,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import AppointmentModal from "@/components/Home/AppointmentModal";

const servicesList = [
  {
    id: "01",
    slug: "web-development",
    title: "Custom Web Development",
    tagline: "FULL-STACK PLATFORMS",
    description: "High-performance web applications built with Next.js, React, and cutting-edge cloud infrastructure engineered for sub-second latency.",
    icon: Code2,
    features: ["Next.js & React 19", "GraphQL & REST APIs", "Sub-Second Latency", "Headless Storefronts"],
    href: "/main/services/web-development",
  },
  {
    id: "02",
    slug: "mobile-app-development",
    title: "Mobile App Architecture",
    tagline: "IOS & ANDROID NATIVE",
    description: "Cross-platform mobile applications with intuitive UI, biometric zero-trust security, and real-time transaction ledgers.",
    icon: Smartphone,
    features: ["React Native & Flutter", "Biometric Auth", "Offline Data Sync", "Push Notifications"],
    href: "/main/services/mobile-app-development",
  },
  {
    id: "03",
    slug: "custom-software-development",
    title: "AI Integration & Automation",
    tagline: "LLM WORKFLOWS & RAG",
    description: "Empower your business with custom LLM workflows, RAG vector document search, and 24/7 intelligent automated customer support.",
    icon: Cpu,
    features: ["LangChain & OpenAI", "RAG Vector Pipelines", "Custom LLM Fine-Tuning", "Automated Agents"],
    href: "/main/services/custom-software-development",
  },
  {
    id: "04",
    slug: "cloud-computing",
    title: "Cloud Infrastructure & DevOps",
    tagline: "GCP & AWS CLOUD NATIVE",
    description: "Scalable GCP and AWS cloud deployment, CI/CD automated release pipelines, containerized Docker clusters, and 99.99% uptime SLA.",
    icon: Globe,
    features: ["Docker & Kubernetes", "Automated CI/CD", "Zero-Downtime Releases", "24/7 Cloud Monitoring"],
    href: "/main/services/cloud-computing",
  },
  {
    id: "05",
    slug: "digital-marketing",
    title: "Cybersecurity & Compliance",
    tagline: "ZERO-TRUST PROTECTION",
    description: "Enterprise-grade data encryption, zero-trust authorization protocols, continuous vulnerability auditing, and SOC2 / ISO compliance.",
    icon: ShieldCheck,
    features: ["Zero-Trust Protocols", "Continuous Threat Audits", "End-to-End Encryption", "SOC2 Compliance"],
    href: "/main/services/digital-marketing",
  },
  {
    id: "06",
    slug: "ui-ux-design",
    title: "UI/UX & Interactive Design",
    tagline: "DESIGN SYSTEMS & MOTION",
    description: "State-of-the-art user interfaces crafted with glassmorphism, micro-animations, design tokens, and fluid interactive transitions.",
    icon: Palette,
    features: ["Figma Design Systems", "Micro-Interactions", "Responsive Tokens", "User Behavior Audits"],
    href: "/main/services/ui-ux-design",
  },
];

const bottomTags = [
  { name: "Content Strategy", icon: PenTool },
  { name: "Cybersecurity", icon: Shield },
  { name: "SEO Optimization", icon: Monitor },
  { name: "Data Insight", icon: BarChart },
  { name: "Analytics", icon: LineChart },
  { name: "Branding", icon: UserPen },
  { name: "Database Design", icon: Database },
  { name: "Lead Generation", icon: Globe },
];

const Service = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="bg-transparent py-20 relative overflow-hidden select-none">
        
        {/* Background Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[600px] bg-[#EFFC76]/5 rounded-full blur-[190px] pointer-events-none" />

        {/* 10/12 Container Width */}
        <div className="w-10/12 mx-auto relative z-10">

          {/* Section Header */}
          <div className="text-center mb-16 relative z-20">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#EFFC76]/30 bg-[#EFFC76]/10 text-[#EFFC76] text-xs font-mono font-bold uppercase tracking-[0.25em] mb-4 shadow-[0_0_15px_rgba(239,252,118,0.2)]"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#EFFC76] animate-pulse" />
              EXPERT DIGITAL SERVICES
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight uppercase max-w-4xl mx-auto"
            >
              Comprehensive Services For{" "}
              <span className="font-serif italic font-normal text-[#EFFC76] lowercase block sm:inline">
                digital excellence
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="mt-6 text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
            >
              From custom Web & Mobile apps to Enterprise Cloud Infrastructure & AI Automation, we craft high-performance solutions tailored to scale your business.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-8 flex justify-center"
            >
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-3.5 bg-[#EFFC76] hover:bg-[#f3ff8c] text-black rounded-full text-sm font-extrabold flex items-center gap-2 transition-all duration-300 shadow-[0_0_25px_rgba(239,252,118,0.5)]"
              >
                <span>Book an Appointment</span>
                <ArrowUpRight size={18} className="stroke-[2.5]" />
              </button>
            </motion.div>
          </div>

          {/* 6 Core Engineering Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {servicesList.map((service, index) => {
              const IconComponent = service.icon;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="group relative rounded-[32px] overflow-hidden border border-[#EFFC76]/25 bg-[#051105]/92 backdrop-blur-2xl p-7 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.9)] hover:border-[#EFFC76] hover:shadow-[0_0_40px_rgba(239,252,118,0.3)] transition-all duration-500 flex flex-col justify-between"
                >
                  {/* Top Glowing Border Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#EFFC76] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <Link href={service.href} className="block flex-1 flex flex-col justify-between">
                    <div>
                      {/* Header: Icon & ID */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-[#0b1d0b] border border-[#EFFC76]/40 flex items-center justify-center text-[#EFFC76] group-hover:scale-110 group-hover:bg-[#EFFC76] group-hover:text-black transition-all duration-500 shadow-[0_0_20px_rgba(239,252,118,0.2)]">
                          <IconComponent size={26} className="stroke-[2.2]" />
                        </div>
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#EFFC76]/15 text-[#EFFC76] border border-[#EFFC76]/30">
                          {service.id}
                        </span>
                      </div>

                      <span className="text-[10px] font-mono font-extrabold text-[#EFFC76] uppercase tracking-widest block mb-1">
                        {service.tagline}
                      </span>

                      <h3 className="text-2xl font-black text-white group-hover:text-[#EFFC76] transition-colors duration-300 leading-tight mb-3">
                        {service.title}
                      </h3>

                      <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* Features Chips */}
                      <div className="grid grid-cols-2 gap-2 mb-6">
                        {service.features.map((feat, i) => (
                          <div key={i} className="flex items-center gap-2 bg-[#EFFC76]/10 border border-[#EFFC76]/25 rounded-xl px-2.5 py-1.5 text-[11px] font-mono text-[#EFFC76]">
                            <CheckCircle2 size={13} className="shrink-0 text-[#EFFC76]" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Link Button */}
                    <div className="pt-4 border-t border-[#EFFC76]/20 flex items-center justify-between mt-auto">
                      <span className="text-xs font-mono font-bold text-gray-400 group-hover:text-white transition-colors">
                        Learn More
                      </span>

                      <div className="w-9 h-9 rounded-full bg-white/5 group-hover:bg-[#EFFC76] group-hover:text-black border border-white/15 group-hover:border-[#EFFC76] flex items-center justify-center transition-all duration-300 text-gray-300 shadow-md shrink-0">
                        <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 stroke-[2.5]" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Skill Tags */}
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {bottomTags.map((tag, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + index * 0.04 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#081808]/90 border border-[#EFFC76]/30 hover:border-[#EFFC76] hover:bg-[#EFFC76]/20 hover:text-[#EFFC76] transition-all cursor-default shadow-md"
              >
                <div className="p-1 rounded-full bg-[#EFFC76]/20 text-[#EFFC76]">
                  <tag.icon size={14} />
                </div>
                <span className="text-gray-200 text-xs font-mono font-semibold">{tag.name}</span>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Service;
