"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Sparkles, Activity, ShieldCheck, Zap } from "lucide-react";

const showcaseItems = [
  {
    id: 1,
    title: "Real-Time Cloud Analytics & Metrics Platform",
    category: "Web Development",
    metric: "99.99% Uptime | 2.4M Ops/sec",
    desc: "High-frequency telemetry stream visualization & real-time infrastructure engine.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop",
    tags: ["Next.js", "Go", "Telemetry"],
  },
  {
    id: 2,
    title: "Viper Studio Enterprise Brand Systems",
    category: "Branding",
    metric: "300% Engagement Growth",
    desc: "Scalable design tokens, typography system, and modern digital brand identity.",
    img: "/portfolio/cap.png",
    tags: ["Design System", "Tokens", "UX"],
  },
  {
    id: 3,
    title: "Omnichannel Mobile & Web Ecosystem",
    category: "Web Design",
    metric: "100/100 Lighthouse Score",
    desc: "Fluid cross-platform interface built with framer-motion micro-interactions.",
    img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop",
    tags: ["React Native", "iOS", "Tailwind"],
  },
  {
    id: 4,
    title: "SquadCart Headless E-Commerce Engine",
    category: "Page Setup",
    metric: "+45% Conversion Rate",
    desc: "Ultra-fast sub-second storefront with edge caching & automated checkout.",
    img: "/portfolio/watch.png",
    tags: ["Headless", "GraphQL", "Stripe"],
  },
  {
    id: 5,
    title: "Autonomous AI Agent & LLM Pipeline",
    category: "Digital Marketing",
    metric: "24/7 AI Automation",
    desc: "Custom RAG vector search workflow with intelligent automated customer support.",
    img: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop",
    tags: ["LangChain", "Python", "RAG"],
  },
  {
    id: 6,
    title: "Cybersecurity Zero-Trust Audit Suite",
    category: "Web Development",
    metric: "SOC2 & ISO Certified",
    desc: "Enterprise threat monitoring, compliance tracking, and zero-trust auth logs.",
    img: "/portfolio/phone.png",
    tags: ["Security", "Docker", "DevOps"],
  },
];

const categories = [
  "All",
  "Branding",
  "Web Design",
  "Web Development",
  "Page Setup",
  "Digital Marketing",
];

const WorkShowcase = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems =
    activeCategory === "All"
      ? showcaseItems
      : showcaseItems.filter((item) => item.category === activeCategory);

  return (
    <section className="py-24 relative text-white overflow-hidden select-none">
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#EFFC76]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* 10/12 Container Width */}
      <div className="w-10/12 mx-auto relative z-10">

        {/* Section Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#EFFC76]/30 bg-[#EFFC76]/10 text-[#EFFC76] text-xs font-mono font-bold uppercase tracking-[0.25em] mb-3 shadow-[0_0_15px_rgba(239,252,118,0.2)]"
            >
              <span className="w-2 h-2 rounded-full bg-[#EFFC76] animate-pulse" />
              OUR WORK SHOWCASE
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight"
            >
              Work <span className="italic font-serif text-[#EFFC76] font-normal">Showcase</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-gray-400 text-sm sm:text-base font-light mt-3 max-w-xl leading-relaxed"
            >
              We engineer production-ready, high-performance software systems and digital experiences.
            </motion.p>
          </div>

          {/* Active Count Metric Badge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-md self-start md:self-auto"
          >
            <div className="w-3 h-3 rounded-full bg-[#EFFC76] shadow-[0_0_10px_#EFFC76]" />
            <span className="text-xs font-mono text-gray-300">
              SHOWING <span className="text-[#EFFC76] font-bold">{filteredItems.length}</span> PROJECTS
            </span>
          </motion.div>
        </div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center gap-2.5 mb-14"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 border ${
                  isActive
                    ? "bg-[#EFFC76] text-black border-[#EFFC76] shadow-[0_0_25px_rgba(239,252,118,0.45)] scale-105"
                    : "bg-white/5 text-gray-300 border-white/10 hover:border-[#EFFC76]/50 hover:text-white"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* Premium Software Showcase Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-[32px] overflow-hidden border border-white/15 bg-gradient-to-b from-[#142613] via-[#0d180c] to-[#070f06] shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:border-[#EFFC76]/70 hover:shadow-[0_0_45px_rgba(239,252,118,0.35)] transition-all duration-500 cursor-pointer flex flex-col justify-between"
              >
                {/* Top Image Frame with Smooth Overlay */}
                <div className="relative w-full h-[240px] sm:h-[270px] overflow-hidden p-3 pb-0">
                  <div className="relative w-full h-full rounded-[24px] overflow-hidden border border-white/10">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-108 transition-transform duration-700 brightness-95 group-hover:brightness-105"
                    />
                    
                    {/* Dark Ambient Gradient Layer */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#091408] via-transparent to-black/30 pointer-events-none" />

                    {/* Top Floating Glass Badge */}
                    <div className="absolute top-3 left-3 z-20">
                      <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-[#060d06]/85 backdrop-blur-md text-[#EFFC76] border border-[#EFFC76]/40 shadow-md">
                        {item.category}
                      </span>
                    </div>

                    {/* Top Right Live Metric Tag */}
                    <div className="absolute top-3 right-3 z-20">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-black/60 backdrop-blur-md text-gray-200 border border-white/15">
                        {item.metric}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Content Area */}
                <div className="p-7 flex flex-col justify-between flex-1 relative z-10">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-[#EFFC76] transition-colors duration-300 leading-tight mb-2.5 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed mb-6 line-clamp-2">
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom Bar: Tags & Animated Arrow Button */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {item.tags.map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono font-semibold text-gray-300 group-hover:text-[#EFFC76] bg-white/5 group-hover:bg-[#EFFC76]/10 px-2.5 py-1 rounded-full border border-white/10 group-hover:border-[#EFFC76]/30 transition-all duration-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Action Icon Circle */}
                    <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-[#EFFC76] group-hover:text-black border border-white/15 group-hover:border-[#EFFC76] flex items-center justify-center transition-all duration-300 text-gray-300 shadow-md flex-shrink-0">
                      <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </div>

                {/* Bottom Neon Hover Glow Gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#EFFC76]/12 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default WorkShowcase;
