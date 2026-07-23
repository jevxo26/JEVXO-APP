"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Layers, Code2, Globe, Cpu, Smartphone, ShieldCheck, Zap, Palette, Rocket, Lock } from "lucide-react";

export const defaultCards = [
  {
    id: "01",
    title: "Branding & Identity",
    desc: "We create memorable brand identities that resonate with your audience and stand out in the market.",
    img: "/meeting-card.png",
    icon: Layers,
    category: "Brand Engineering",
  },
  {
    id: "02",
    title: "Custom Web Development",
    desc: "High-performance web applications built with Next.js, React, and cutting-edge cloud infrastructure.",
    img: "/web-dev-card.png",
    icon: Code2,
    category: "Fullstack Web",
  },
  {
    id: "03",
    title: "Mobile App Architecture",
    desc: "Native and cross-platform mobile apps for iOS & Android with intuitive user experience.",
    img: "/who-we-are-main.png",
    icon: Smartphone,
    category: "iOS & Android",
  },
  {
    id: "04",
    title: "AI Integration & Automation",
    desc: "Empower your business with custom LLM workflows, chatbots, and predictive analytics models.",
    img: "/hero-team.png",
    icon: Cpu,
    category: "Artificial Intelligence",
  },
  {
    id: "05",
    title: "Cloud Infrastructure & DevOps",
    desc: "Scalable AWS and GCP cloud deployment, CI/CD automated pipelines, and 99.99% uptime guarantee.",
    img: "/who-we-are-small.png",
    icon: Globe,
    category: "DevOps & Cloud",
  },
  {
    id: "06",
    title: "Cybersecurity & Compliance",
    desc: "Enterprise-grade data encryption, zero-trust protocols, and rigorous security auditing.",
    img: "/branding-card.png",
    icon: ShieldCheck,
    category: "Zero Trust Security",
  },
  {
    id: "07",
    title: "UI/UX & Interactive Design",
    desc: "State-of-the-art user interfaces with glassmorphism, micro-animations, and fluid transitions.",
    img: "/meeting-card.png",
    icon: Palette,
    category: "Interactive UI/UX",
  },
  {
    id: "08",
    title: "SaaS Product Engineering",
    desc: "End-to-end multi-tenant SaaS application development from MVP validation to global scale.",
    img: "/web-dev-card.png",
    icon: Rocket,
    category: "SaaS Architecture",
  },
  {
    id: "09",
    title: "Performance & SEO Optimization",
    desc: "Core Web Vitals optimization, INP speed fixes, and search engine ranking acceleration.",
    img: "/who-we-are-main.png",
    icon: Zap,
    category: "CWV Performance",
  },
  {
    id: "10",
    title: "Enterprise Maintenance & Support",
    desc: "24/7 continuous monitoring, proactive security patches, and ongoing system upgrades.",
    img: "/hero-team.png",
    icon: Lock,
    category: "24/7 SLA Support",
  },
];

export function MyBlock({ cards = defaultCards }) {
  return (
    <div className="relative flex flex-col w-full">
      {cards.map((card, idx) => {
        const IconComponent = card.icon;
        return (
          <div
            key={card.id || idx}
            className="sticky w-full min-h-[380px] pb-10"
            style={{
              top: `${100 + Math.min(idx * 8, 40)}px`,
              zIndex: idx + 1,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group relative w-full rounded-[36px] overflow-hidden border border-white/15 hover:border-[#EFFC76]/70 shadow-[0_-15px_50px_rgba(0,0,0,0.95)] bg-[#081208] transition-all duration-500 cursor-pointer hover:shadow-[0_0_50px_rgba(239,252,118,0.45)]"
            >
              {/* Circular Badge Icon overlapping top-left corner */}
              <div className="absolute top-4 left-4 z-30 w-16 h-16 rounded-full bg-[#EFFC76] text-black flex items-center justify-center shadow-[0_0_30px_rgba(239,252,118,0.5)] border-2 border-black/20 group-hover:scale-110 transition-transform duration-500">
                <div className="w-12 h-12 rounded-full bg-[#EFFC76] border border-black/10 flex items-center justify-center">
                  <IconComponent size={24} className="text-black stroke-[2.5]" />
                </div>
              </div>

              {/* Top-Right Category Badge */}
              <div className="absolute top-4 right-4 z-30 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-[#EFFC76] uppercase tracking-wider group-hover:border-[#EFFC76]/50 transition-colors">
                {card.category}
              </div>

              {/* Card Background Image & Bottom Hover Overlay */}
              <div className="relative w-full h-[320px] sm:h-[360px] overflow-hidden">
                <Image
                  src={card.img}
                  alt={card.title}
                  fill
                  className="object-cover brightness-95 contrast-110 group-hover:scale-105 transition-transform duration-700"
                />
                {/* Default Dark Vignette Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060d06] via-[#060d06]/50 to-transparent group-hover:opacity-0 transition-opacity duration-500" />
                
                {/* Hover Bottom Neon Yellow-Green Gradient Layer */}
                <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-[#EFFC76] via-[#EFFC76]/95 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
              </div>

              {/* Card Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-gray-400 group-hover:text-black/60 text-3xl font-extrabold tracking-widest opacity-40 group-hover:opacity-80 transition-all duration-500">
                      {card.id}
                    </p>
                    <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-black group-hover:text-[#EFFC76] text-white flex items-center justify-center transition-all duration-500">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-black tracking-tight mb-2 transition-colors duration-500">
                    {card.title}
                  </h3>
                  <p className="text-gray-300 group-hover:text-black/85 text-xs sm:text-sm font-light leading-relaxed max-w-sm transition-colors duration-500">
                    {card.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Glowing Accent Line */}
              <div className="w-full h-1 bg-white/10 group-hover:bg-black transition-colors duration-500" />
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

export default MyBlock;
