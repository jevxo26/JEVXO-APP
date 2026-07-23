"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Rocket, Gem, Cpu, Lock } from "lucide-react";

const whyUsCards = [
  {
    id: "01",
    title: "Creative Approach",
    desc: "We bring fresh and innovative ideas to every project to make your brand stand out.",
    icon: ShieldCheck,
  },
  {
    id: "02",
    title: "Expert Team",
    desc: "Our team consists of industry experts with years of experience in delivering top solutions.",
    icon: Zap,
  },
  {
    id: "03",
    title: "Fast Delivery",
    desc: "We value your time. We ensure on-time delivery without compromising on quality.",
    icon: Rocket,
  },
  {
    id: "04",
    title: "24/7 Support",
    desc: "Our support team is always available to help you with any issues or queries.",
    icon: Gem,
  },
  {
    id: "05",
    title: "Scalable Tech",
    desc: "Built on high-performance cloud infrastructure designed for infinite scale and reliability.",
    icon: Cpu,
  },
  {
    id: "06",
    title: "Cyber Security",
    desc: "Enterprise-grade data encryption, zero-trust protocols, and maximum security protection.",
    icon: Lock,
  },
];

const WhyChooseUs = () => {
  const [activeCard, setActiveCard] = useState(3); // Default focus on card 04

  return (
    <section className="py-20 relative text-white overflow-hidden select-none">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#EFFC76]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-10/12 mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-16 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full border border-[#EFFC76]/40 bg-[#EFFC76]/10 text-[#EFFC76] text-xs font-mono font-bold uppercase tracking-[0.25em] shadow-[0_0_15px_rgba(239,252,118,0.2)]">
              WHY CHOOSE US
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mt-4"
          >
            Why We Are{" "}
            <span className="italic font-serif text-[#EFFC76] font-normal block sm:inline">
              The Best?
            </span>
          </motion.h2>


          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-400 text-sm sm:text-base font-light max-w-xl mt-3 leading-relaxed"
          >
            We don't just build websites; we build experiences that drive growth and engagement.
          </motion.p>
        </div>

        {/* Desktop Overlapping Cards Deck / Mobile Grid */}
        <div className="relative min-h-[420px] flex items-center justify-center">

          {/* Desktop Horizontal Overlapping Deck (Exact Reference Design) */}
          <div className="hidden lg:flex items-center justify-center w-full relative py-8">
            {whyUsCards.map((card, idx) => {
              const IconComponent = card.icon;
              const isFocused = activeCard === idx;
              const total = whyUsCards.length;
              const middleIndex = (total - 1) / 2;

              // Calculate horizontal fan-out offset
              let translateX = (idx - middleIndex) * 105; 
              if (activeCard !== null) {
                if (idx < activeCard) {
                  translateX -= 45;
                } else if (idx > activeCard) {
                  translateX += 45;
                }
              }

              return (
                <motion.div
                  key={card.id}
                  onMouseEnter={() => setActiveCard(idx)}
                  animate={{
                    x: translateX,
                    scale: isFocused ? 1.06 : 0.94,
                    zIndex: isFocused ? 40 : idx + 1,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 24 }}
                  className="absolute w-[310px] h-[380px] rounded-[32px] p-8 border border-white/15 bg-gradient-to-b from-[#162a14] via-[#0f1c0e] to-[#091308] shadow-[0_20px_50px_rgba(0,0,0,0.85)] cursor-pointer backdrop-blur-xl group hover:border-[#EFFC76]/70 transition-colors duration-300"
                  style={{
                    boxShadow: isFocused
                      ? "0 25px 60px rgba(0, 0, 0, 0.95), 0 0 35px rgba(239, 252, 118, 0.25)"
                      : "0 15px 35px rgba(0,0,0,0.7)",
                  }}
                >
                  {/* Top Bar: Icon & Number Badge */}
                  <div className="flex items-center justify-between mb-16">
                    <div className="w-14 h-14 rounded-2xl bg-[#081208] border border-[#EFFC76]/30 flex items-center justify-center group-hover:scale-110 group-hover:border-[#EFFC76] transition-all duration-300 shadow-[inset_0_0_15px_rgba(239,252,118,0.15)]">
                      <IconComponent className="text-[#EFFC76] w-7 h-7 stroke-[2]" />
                    </div>
                    <span className="px-3 py-1 text-xs font-mono font-semibold text-gray-400 group-hover:text-[#EFFC76] bg-white/5 group-hover:bg-[#EFFC76]/10 rounded-full border border-white/10 group-hover:border-[#EFFC76]/30 transition-all">
                      {card.id}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="mt-auto">
                    <h3 className="text-2xl font-extrabold text-white group-hover:text-[#EFFC76] tracking-tight mb-3 transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="text-gray-300 text-sm font-light leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile & Tablet Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-6 w-full">
            {whyUsCards.map((card) => {
              const IconComponent = card.icon;
              return (
                <div
                  key={card.id}
                  className="rounded-[28px] p-6 border border-white/15 bg-gradient-to-b from-[#162a14] via-[#0f1c0e] to-[#091308] shadow-[0_15px_40px_rgba(0,0,0,0.8)] relative group hover:border-[#EFFC76]/60 transition-all"
                >
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-xl bg-[#081208] border border-[#EFFC76]/30 flex items-center justify-center">
                      <IconComponent className="text-[#EFFC76] w-6 h-6 stroke-[2]" />
                    </div>
                    <span className="px-2.5 py-0.5 text-xs font-mono text-gray-400 bg-white/5 rounded-full border border-white/10">
                      {card.id}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
