"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Layers, Cpu, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discover & Prepare",
    subtitle: "SYSTEM BLUEPRINTING",
    description: "We analyze your business challenges, define tech specs, and organize data schemas to build the perfect architectural foundation.",
    icon: Layers,
    rayCount: 7,
  },
  {
    number: "02",
    title: "Develop & Test",
    subtitle: "AGILE ENGINEERING",
    description: "Our engineering team builds and validates custom full-stack solutions with automated CI/CD testing matched to your goals.",
    icon: Cpu,
    rayCount: 13,
  },
  {
    number: "03",
    title: "Deploy & Optimize",
    subtitle: "24/7 SLA MAINTENANCE",
    description: "We seamlessly deploy to Docker cloud clusters, optimize sub-second latency, and continuously maintain 99.99% uptime SLA.",
    icon: Rocket,
    rayCount: 19,
  },
];

const OurServices = () => {
  return (
    <section className="bg-transparent py-20 relative overflow-hidden select-none">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#EFFC76]/5 rounded-full blur-[180px] pointer-events-none" />

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
            ENGINEERING WORKFLOW
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight uppercase"
          >
            Simple Steps,{" "}
            <span className="font-serif italic font-normal text-[#EFFC76] lowercase block sm:inline">
              powerful results
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="mt-6 text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
          >
            Our streamlined engineering execution ensures rapid time-to-market without compromising security or code quality.
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-28">
          {steps.map((step, index) => {
            const IconComponent = step.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.7 }}
                className="relative group"
              >
                {/* Rays Visual */}
                <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-64 h-28 pointer-events-none flex items-end justify-center">
                  <Rays count={step.rayCount} />
                </div>

                {/* Card Container */}
                <div className="relative z-10">
                  {/* Yellow Header Pill */}
                  <div className="bg-[#EFFC76] rounded-full p-2 pl-3 flex items-center gap-4 shadow-[0_0_25px_rgba(239,252,118,0.4)] relative z-20 w-full transform transition-transform duration-300 group-hover:-translate-y-1">
                    <div className="w-9 h-9 bg-[#0b1c0b] rounded-full flex items-center justify-center text-[#EFFC76] font-mono font-black text-sm shadow-inner shrink-0 border border-[#EFFC76]/50">
                      {step.number}
                    </div>
                    <span className="text-[#051105] font-black text-base sm:text-lg tracking-tight truncate">
                      {step.title}
                    </span>
                  </div>

                  {/* Dark Body Container */}
                  <div className="bg-[#051105]/92 border border-[#EFFC76]/30 rounded-[32px] p-7 pt-12 -mt-6 relative z-10 h-full min-h-[200px] flex flex-col justify-between group-hover:border-[#EFFC76] group-hover:shadow-[0_0_35px_rgba(239,252,118,0.25)] transition-all duration-300 backdrop-blur-2xl">
                    <span className="text-[10px] font-mono font-bold text-[#EFFC76] uppercase tracking-widest block mb-2">
                      {step.subtitle}
                    </span>
                    
                    <p className="text-gray-300 leading-relaxed text-xs sm:text-sm font-light">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

// Custom Rays Component
const Rays = ({ count }) => {
  const rand01 = (seed) => {
    let a = seed | 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  // Generate rays
  const rays = Array.from({ length: count }).map((_, i) => {
    const angle = -70 + (140 / (count - 1 || 1)) * i;
    const height = 60 + rand01(count * 100 + i) * 40; 
    
    return (
      <motion.div
        key={i}
        initial={{ height: 0, opacity: 0 }}
        whileInView={{ height: `${height}%`, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 1, 
          delay: 0.3 + rand01(count * 200 + i) * 0.4,
          type: "spring"
        }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          width: '2px',
          height: `${height}%`,
          background: 'linear-gradient(to top, #EFFC76, transparent)',
          transformOrigin: 'bottom center',
          transform: `translateX(-50%) rotate(${angle}deg)`,
          opacity: 0.8,
        }}
      />
    );
  });

  return (
    <div className="w-full h-full relative overflow-visible">
      {/* Center glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#EFFC76]/25 blur-2xl rounded-full" />
      {rays}
    </div>
  );
};

export default OurServices;
