"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";
import AppointmentModal from "@/components/Home/AppointmentModal";
import { useQuery } from "@/hooks/useApi";

const defaultProjects = [
  {
    id: "01",
    title: "Microfinance Operations Suite",
    client: "Confidential Finance Client (NDA)",
    category: "Web App",
    year: "2025",
    desc: "A branch-ready loan operations system with real-time repayment tracking, role-based access, and daily reporting automation.",
    img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop",
    sector: "Financial Services",
    duration: "10 weeks",
    team: "6 specialists",
    outcome: "52% faster reconciliation",
    link: "/main/case-studies/1",
  },
  {
    id: "02",
    title: "Meta Performance Engine",
    client: "Regional Wellness Brand",
    category: "Marketing",
    year: "2025",
    desc: "A performance campaign framework with conversion events, creative testing matrix, and weekly scaling decisions.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
    sector: "Health and Fitness",
    duration: "6 weeks",
    team: "4 specialists",
    outcome: "2.9x ROAS in 45 days",
    link: "/main/case-studies/2",
  },
  {
    id: "03",
    title: "Premium Brand Refresh",
    client: "Interior and Lifestyle Company",
    category: "Branding",
    year: "2025",
    desc: "A full identity refresh across logo system, visual language, and brand communication for higher-ticket positioning.",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop",
    sector: "Retail and Design",
    duration: "4 weeks",
    team: "3 specialists",
    outcome: "63% growth in qualified inquiries",
    link: "/main/case-studies/3",
  },
  {
    id: "04",
    title: "Omnichannel E-Commerce Hub",
    client: "Global Retail Enterprise",
    category: "Websites",
    year: "2026",
    desc: "Headless storefront architecture connected to multi-warehouse inventory with sub-second page load benchmarks.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
    sector: "E-Commerce",
    duration: "12 weeks",
    team: "8 specialists",
    outcome: "100/100 Lighthouse Speed",
    link: "/main/case-studies/4",
  },
  {
    id: "05",
    title: "Cross-Platform Mobile Wallet",
    client: "FinTech Startup",
    category: "Mobile App",
    year: "2026",
    desc: "Biometric authentication, instant peer-to-peer transfers, and multi-currency virtual card issuance.",
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop",
    sector: "FinTech",
    duration: "14 weeks",
    team: "7 specialists",
    outcome: "250k+ Active Downloads",
    link: "/main/case-studies/5",
  },
  {
    id: "06",
    title: "Social Growth Campaign Studio",
    client: "Tech Media Network",
    category: "Social Presence",
    year: "2026",
    desc: "Viral short-form video strategy, automated cross-platform distribution, and audience sentiment analytics.",
    img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&auto=format&fit=crop",
    sector: "Media & Agency",
    duration: "8 weeks",
    team: "5 specialists",
    outcome: "4.5M Impressions/mo",
    link: "/main/case-studies/6",
  },
];

const categories = [
  "All",
  "Web App",
  "Marketing",
  "Branding",
  "Websites",
  "Mobile App",
  "Social Presence",
];

const PortfolioCard = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data } = useQuery("/case-studies");

  // Map API data or fallback to exact reference projects
  const apiProjects = data?.data?.map((p, idx) => ({
    id: p.id || `0${idx + 1}`,
    title: p.title || "Enterprise Software Solution",
    client: p.client || "Global Client",
    category: p.categories?.[0]?.name || "Web App",
    year: "2025",
    desc: p.description || p.features?.[0] || "Custom enterprise software engineering.",
    img: p.imageUrl || "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop",
    sector: p.sector || "Software Engineering",
    duration: p.duration || "8 weeks",
    team: p.team || "5 specialists",
    outcome: p.outcome || "99.9% Uptime SLA",
    link: `/main/case-studies/${p.id}`,
  }));

  const allProjects = apiProjects && apiProjects.length > 0 ? apiProjects : defaultProjects;

  const filteredProjects =
    activeCategory === "All"
      ? allProjects
      : allProjects.filter((item) => item.category === activeCategory);

  return (
    <>
      <section className="py-20 relative text-white overflow-hidden select-none" id="portfolio-section">
        
        {/* Background Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[600px] bg-[#EFFC76]/5 rounded-full blur-[190px] pointer-events-none" />

        {/* 10/12 Container Width */}
        <div className="w-10/12 mx-auto relative z-10">

          {/* Section Header */}
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#EFFC76]/30 bg-[#EFFC76]/10 text-[#EFFC76] text-xs font-mono font-bold uppercase tracking-[0.2em] mb-4 shadow-[0_0_15px_rgba(239,252,118,0.2)]"
              >
                <span className="w-2 h-2 rounded-full bg-[#EFFC76] animate-pulse" />
                REAL PROJECT SHOWCASE
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight"
              >
                Recent <span className="italic font-serif text-[#EFFC76] font-normal">Projects</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-gray-400 text-sm sm:text-base font-light mt-3 max-w-xl leading-relaxed"
              >
                Explore some of our finest work delivered to clients worldwide.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 bg-[#081808]/80 border border-[#EFFC76]/30 px-4 py-2 rounded-2xl backdrop-blur-md self-start md:self-auto"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#EFFC76] shadow-[0_0_10px_#EFFC76]" />
              <span className="text-xs font-mono text-gray-300">
                SHOWING <span className="text-[#EFFC76] font-bold">{filteredProjects.length}</span> PROJECTS
              </span>
            </motion.div>
          </div>

          {/* Category Filter Pills (Exact Reference Screenshot Style) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-mono font-bold transition-all duration-300 border ${
                    isActive
                      ? "bg-[#EFFC76] text-black border-[#EFFC76] shadow-[0_0_20px_rgba(239,252,118,0.5)] scale-105"
                      : "bg-[#061206]/80 text-gray-300 border-[#EFFC76]/20 hover:border-[#EFFC76]/60 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </motion.div>

          {/* 3-Column Projects Grid matching Reference Screenshot */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.93 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.93 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group relative rounded-[32px] overflow-hidden border border-[#EFFC76]/25 bg-[#051105]/92 backdrop-blur-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.9)] hover:border-[#EFFC76] hover:shadow-[0_0_40px_rgba(239,252,118,0.3)] transition-all duration-500 cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Top Image Card Frame */}
                    <div className="relative w-full h-[220px] rounded-[24px] overflow-hidden border border-white/10 mb-5 bg-[#081208]">
                      <Image
                        src={project.img}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-108 transition-transform duration-700 brightness-95 group-hover:brightness-105"
                      />
                      
                      {/* Dark Ambient Gradient Layer */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#051105] via-transparent to-black/40 pointer-events-none" />

                      {/* Top Left Category Pill */}
                      <div className="absolute top-3 left-3 z-20">
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono font-extrabold uppercase bg-black/65 backdrop-blur-md text-[#EFFC76] border border-[#EFFC76]/40 shadow-sm">
                          {project.category}
                        </span>
                      </div>

                      {/* Top Right Year Tag */}
                      <div className="absolute top-3 right-3 z-20">
                        <span className="text-[10px] font-mono font-bold text-gray-300 bg-black/60 px-2.5 py-0.5 rounded-full border border-white/10">
                          {project.year}
                        </span>
                      </div>
                    </div>

                    {/* Project Title & Client Line */}
                    <div className="mb-4">
                      <h3 className="text-xl font-extrabold text-white group-hover:text-[#EFFC76] transition-colors duration-300 tracking-tight leading-snug mb-1">
                        {project.title}
                      </h3>
                      <p className="text-xs font-semibold text-[#EFFC76]/90 line-clamp-1">
                        {project.client}
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-xs font-light leading-relaxed mb-5 line-clamp-3">
                      {project.desc}
                    </p>

                    {/* 4-Box Metrics Grid matching Screenshot */}
                    <div className="grid grid-cols-2 gap-2.5 mb-6">
                      <div className="bg-[#081a08]/90 border border-[#EFFC76]/20 rounded-xl p-2.5">
                        <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider block mb-0.5">Sector</span>
                        <span className="text-xs font-extrabold text-white line-clamp-1">{project.sector}</span>
                      </div>

                      <div className="bg-[#081a08]/90 border border-[#EFFC76]/20 rounded-xl p-2.5">
                        <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider block mb-0.5">Duration</span>
                        <span className="text-xs font-extrabold text-white line-clamp-1">{project.duration}</span>
                      </div>

                      <div className="bg-[#081a08]/90 border border-[#EFFC76]/20 rounded-xl p-2.5">
                        <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider block mb-0.5">Team</span>
                        <span className="text-xs font-extrabold text-white line-clamp-1">{project.team}</span>
                      </div>

                      <div className="bg-[#081a08]/90 border border-[#EFFC76]/20 rounded-xl p-2.5">
                        <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider block mb-0.5">Top outcome</span>
                        <span className="text-xs font-extrabold text-[#EFFC76] line-clamp-1">{project.outcome}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Buttons: View case study + Start project */}
                  <div className="flex items-center gap-2 pt-2">
                    <Link
                      href={project.link}
                      className="flex-1 text-center bg-[#EFFC76] hover:bg-[#f3ff8c] text-black font-extrabold text-xs py-2.5 px-4 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(239,252,118,0.4)]"
                    >
                      View case study
                    </Link>

                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="flex-1 text-center bg-black/40 hover:bg-[#EFFC76]/15 text-white hover:text-[#EFFC76] border border-white/20 hover:border-[#EFFC76] font-semibold text-xs py-2.5 px-4 rounded-full transition-all duration-300"
                    >
                      Start project
                    </button>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* Appointment / Project Kickoff Modal */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default PortfolioCard;
