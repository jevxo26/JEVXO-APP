"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Layers, Code2, Globe, Cpu, Smartphone, ShieldCheck, Zap, Palette, Rocket, Lock } from "lucide-react";
import LogoSpinner from "@/components/Home/LogoSpinner";

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
import CosmicBackground from "@/components/Home/CosmicBackground";

import DevOpsWorkflow from "@/components/Home/DevOpsWorkflow";
import WhyChooseUs from "@/components/Home/WhyChooseUs";
import WorkShowcase from "@/components/Home/WorkShowcase";
import OurTeam from "@/components/Home/OurTeam";
import MyBlock from "@/components/Home/MyBlock";
import Testimonial from "@/components/Home/Testimonial";
import Faq from "@/components/Home/Faq";

const sectionAnimation = {
  initial: { opacity: 0, y: 35 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
};

const TestPages = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="page-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[99999]"
          >
            <LogoSpinner fullScreen={true} message="Loading JEVXO..." />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="overflow-x-hidden">
        {/* Background Cosmic Particle Grid */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <CosmicBackground />
        </div>

        <div className="relative z-10 space-y-0">
          {/* 1. Hero Banner */}
          <motion.section {...sectionAnimation}>
            <Banner />
          </motion.section>

          {/* 2. Who We Are Section */}
          <motion.section {...sectionAnimation} className="-mt-8 md:-mt-12">
            <WhoWeAre />
          </motion.section>

          {/* 3. Connected Ecosystem Section */}
          <motion.section {...sectionAnimation} className="py-16 text-white relative">
            {/* Animated Header */}
            <div className="text-center mb-12 flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-3"
              >
                <span className="text-[#EFFC76] text-xs font-mono font-bold uppercase tracking-[0.3em]">
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

              {/* Right Column: MyBlock Card Component */}
              <div className="lg:col-span-6 relative flex flex-col">
                <MyBlock cards={expertiseCards} />
              </div>
            </div>
          </motion.section>

          {/* 4. Why We Are The Best Section */}
          <motion.section {...sectionAnimation} className="-mt-10 md:-mt-14">
            <WhyChooseUs />
          </motion.section>

          {/* 5. CI/CD & DevOps Infrastructure */}
          <motion.section {...sectionAnimation} className="-mt-10 md:-mt-14">
            <DevOpsWorkflow />
          </motion.section>

          {/* 6. Work Showcase Section */}
          <motion.section {...sectionAnimation} className="-mt-10 md:-mt-14">
            <WorkShowcase />
          </motion.section>

          {/* 7. Meet The Team Section */}
          <motion.section {...sectionAnimation} className="-mt-10 md:-mt-14">
            <OurTeam />
          </motion.section>

          {/* 8. Testimonials Double Marquee Section */}
          <motion.section {...sectionAnimation} className="-mt-10 md:-mt-14">
            <Testimonial />
          </motion.section>

          {/* 9. FAQ Accordion Section */}
          <motion.section {...sectionAnimation} className="-mt-10 md:-mt-14">
            <Faq />
          </motion.section>
        </div>
      </div>
    </>
  );
};

export default TestPages;
