"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Layers, Code2, Globe, Cpu, Smartphone, ShieldCheck, Zap, Palette, Rocket, Lock } from "lucide-react";

// 10 Cards Data Array
const expertiseCards = [
  {
    id: "01",
    title: "Branding & Identity",
    desc: "We create memorable brand identities that resonate with your audience and stand out in the market.",
    img: "/meeting-card.png",
    icon: Layers,
  },
  {
    id: "02",
    title: "Custom Web Development",
    desc: "High-performance web applications built with Next.js, React, and cutting-edge cloud infrastructure.",
    img: "/web-dev-card.png",
    icon: Code2,
  },
  {
    id: "03",
    title: "Mobile App Architecture",
    desc: "Native and cross-platform mobile apps for iOS & Android with intuitive user experience.",
    img: "/who-we-are-main.png",
    icon: Smartphone,
  },
  {
    id: "04",
    title: "AI Integration & Automation",
    desc: "Empower your business with custom LLM workflows, chatbots, and predictive analytics models.",
    img: "/hero-team.png",
    icon: Cpu,
  },
  {
    id: "05",
    title: "Cloud Infrastructure & DevOps",
    desc: "Scalable AWS and GCP cloud deployment, CI/CD automated pipelines, and 99.99% uptime guarantee.",
    img: "/who-we-are-small.png",
    icon: Globe,
  },
  {
    id: "06",
    title: "Cybersecurity & Compliance",
    desc: "Enterprise-grade data encryption, zero-trust protocols, and rigorous security auditing.",
    img: "/branding-card.png",
    icon: ShieldCheck,
  },
  {
    id: "07",
    title: "UI/UX & Interactive Design",
    desc: "State-of-the-art user interfaces with glassmorphism, micro-animations, and fluid transitions.",
    img: "/meeting-card.png",
    icon: Palette,
  },
  {
    id: "08",
    title: "SaaS Product Engineering",
    desc: "End-to-end multi-tenant SaaS application development from MVP validation to global scale.",
    img: "/web-dev-card.png",
    icon: Rocket,
  },
  {
    id: "09",
    title: "Performance & SEO Optimization",
    desc: "Core Web Vitals optimization, INP speed fixes, and search engine ranking acceleration.",
    img: "/who-we-are-main.png",
    icon: Zap,
  },
  {
    id: "10",
    title: "Enterprise Maintenance & Support",
    desc: "24/7 dedicated engineering support, automated back-ups, and continuous feature delivery.",
    img: "/hero-team.png",
    icon: Lock,
  },
];
import BeamCircle from "@/components/lightswind/beam-circle";
import WhoWeAre from "@/components/Home/WhoWeAre";
import Banner from "@/components/Home/Banner";
import Comparison from "@/components/Home/Comparison";
import Faq from "@/components/Home/Faq";
import Innovation from "@/components/Home/Innovation";
import Integration from "@/components/Home/Integration";
import LaunchYourSite from "@/components/Home/LaunchYourSite";
import OurProcess from "@/components/Home/OurProcess";
import Pricing from "@/components/Home/Pricing";
import Testimonial from "@/components/Home/Testimonial";
import CosmicBackground from "@/components/Home/CosmicBackground";
import DevOpsWorkflow from "@/components/Home/DevOpsWorkflow";
import PortfolioCard from "@/components/case-studies/PortfolioCard";
import TechStack from "@/components/Home/TechStack";
import OurTeam from "@/components/Home/OurTeam";

const TestPages = () => {
  return (
    <div className="overflow-x-hidden">
      {/* Background Cosmic Particle Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CosmicBackground />
      </div>

      <div className="relative z-10 space-y-0">
        {/* 1. Hero Banner */}
        <section>
          <Banner />
        </section>

        {/* 2. Who We Are Section */}
        <section className="-mt-8 md:-mt-12">
          <WhoWeAre />
        </section>

        {/* 4. Connected Ecosystem Section (100% NeonCode Reference Layout) */}
        <section className="py-16 text-white relative">
          
          {/* Animated Header */}
          <div className="text-center mb-12 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-3"
            >
              <span className="text-[#EFFC76] text-xs font-extrabold uppercase tracking-[0.3em]">
                WHAT WE DO
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight max-w-2xl"
            >
              We craft digital experiences{" "}
              <span className="italic font-serif text-[#EFFC76] font-normal block sm:inline">
                that excite & inspire
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-400 text-sm md:text-base font-light max-w-lg mt-3"
            >
              Innovative solutions for complex challenges designed to grow your business.
            </motion.p>
          </div>

          <div className="w-10/12 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">

            {/* Left Column: Sticky Concentric Orbits with Center Logo */}
            <div className="lg:col-span-6 lg:sticky lg:top-24 flex flex-col items-center lg:items-start justify-center py-6">
              <BeamCircle size={500} />
              <div className="mt-4 flex items-center gap-2 text-xs font-mono text-gray-500 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EFFC76] animate-ping" />
                SCROLL DOWN ↓
              </div>
            </div>

            {/* Right Column: 10 Sticky Stacked Cards Scroll Effect */}
            <div className="lg:col-span-6 flex flex-col gap-8 py-4 relative">
              {expertiseCards.map((card, idx) => {
                const IconComponent = card.icon;
                const topOffset = 96 + idx * 14; // Staggered top offset for smooth card deck stacking
                return (
                  <div
                    key={card.id}
                    className="sticky w-full transition-all duration-300"
                    style={{
                      top: `${topOffset}px`,
                      zIndex: idx + 1,
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 50, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: false, margin: "-50px" }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="group relative w-full rounded-[36px] overflow-hidden border border-white/15 hover:border-[#EFFC76]/60 shadow-[0_-12px_40px_rgba(0,0,0,0.85)] bg-[#081208] transition-all duration-500 cursor-pointer hover:shadow-[0_0_50px_rgba(239,252,118,0.45)]"
                    >
                      {/* Circular Badge Icon overlapping top-left corner */}
                      <div className="absolute top-4 left-4 z-30 w-16 h-16 rounded-full bg-[#EFFC76] text-black flex items-center justify-center shadow-[0_0_30px_rgba(239,252,118,0.5)] border-2 border-black/20 group-hover:scale-110 transition-transform duration-500">
                        <div className="w-12 h-12 rounded-full bg-[#EFFC76] border border-black/10 flex items-center justify-center">
                          <IconComponent size={24} className="text-black stroke-[2.5]" />
                        </div>
                      </div>

                      {/* Card Background Image & Bottom Hover Overlay */}
                      <div className="relative w-full h-[320px] sm:h-[360px]">
                        <Image
                          src={card.img}
                          alt={card.title}
                          fill
                          className="object-cover brightness-95 contrast-110 group-hover:scale-105 transition-transform duration-700"
                        />
                        {/* Default Dark Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#060d06] via-[#060d06]/50 to-transparent group-hover:opacity-0 transition-opacity duration-500" />
                        
                        {/* Hover Bottom Neon Yellow-Green Gradient Layer */}
                        <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-t from-[#EFFC76] via-[#EFFC76]/95 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                      </div>

                      {/* Card Content Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
                        <p className="text-gray-400 group-hover:text-black/60 text-3xl font-extrabold tracking-widest mb-1 opacity-40 group-hover:opacity-80 transition-all duration-500">
                          {card.id}
                        </p>
                        <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-black tracking-tight mb-2 transition-colors duration-500">
                          {card.title}
                        </h3>
                        <p className="text-gray-300 group-hover:text-black/85 text-xs sm:text-sm font-light leading-relaxed max-w-sm transition-colors duration-500">
                          {card.desc}
                        </p>
                      </div>

                    </motion.div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>

        {/* 5. Innovation & Feature Highlights */}
        <section className="-mt-10 md:-mt-14">
          <Innovation />
        </section>

        {/* 6. Modern Tech Stack & Tools */}
        <section className="-mt-10 md:-mt-14">
          <TechStack />
        </section>

        {/* 7. Selected Work / Case Studies */}
        <section className="-mt-10 md:-mt-14">
          <PortfolioCard />
        </section>

        {/* 8. Our Engineering & Development Process */}
        <section className="-mt-10 md:-mt-14">
          <OurProcess />
        </section>

        {/* 9. CI/CD & DevOps Infrastructure */}
        <section className="-mt-10 md:-mt-14">
          <DevOpsWorkflow />
        </section>

        {/* 10. Ecosystem Integrations */}
        <section className="-mt-10 md:-mt-14">
          <Integration />
        </section>



        {/* 12. Fast Launch Solutions */}
        <section className="-mt-10 md:-mt-14">
          <LaunchYourSite />
        </section>

        {/* 13. Transparent Pricing */}
        <section className="-mt-10 md:-mt-14">
          <Pricing />
        </section>

        {/* 14. Competitive Comparison */}
        <section className="-mt-10 md:-mt-14">
          <Comparison />
        </section>

        {/* 15. Leadership & Engineering Team */}
        <section className="-mt-10 md:-mt-14">
          <OurTeam />
        </section>

        {/* 16. Client Testimonials */}
        <section className="-mt-10 md:-mt-14">
          <Testimonial />
        </section>

        {/* 17. FAQ */}
        <section className="-mt-10 md:-mt-14">
          <Faq />
        </section>


      </div>
    </div>
  );
};

export default TestPages;
