"use client";

import React, { useState } from "react";
import { useParams, notFound } from "next/navigation";
import { servicesData } from "@/constants/services";
import CosmicBackground from "@/components/Home/CosmicBackground";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Zap,
  Sparkles,
  ShieldCheck,
  Check,
  Cpu,
  Clock,
  Rocket,
} from "lucide-react";
import AppointmentModal from "@/components/Home/AppointmentModal";
import DevOpsWorkflow from "@/components/Home/DevOpsWorkflow";
import WebDevelopmentWorkflow from "@/components/Home/WebDevelopmentWorkflow";
import CloudComputingWorkflow from "@/components/Home/CloudComputingWorkflow";
import MobileAppWorkflow from "@/components/Home/MobileAppWorkflow";
import UiUxDesignWorkflow from "@/components/Home/UiUxDesignWorkflow";
import DigitalMarketingWorkflow from "@/components/Home/DigitalMarketingWorkflow";
import GraphicDesignWorkflow from "@/components/Home/GraphicDesignWorkflow";
import WordPressWorkflow from "@/components/Home/WordPressWorkflow";
import CustomSoftwareWorkflow from "@/components/Home/CustomSoftwareWorkflow";

const slugAliases = {
  // Web Development Aliases
  "custom-website": "web-development",
  "web-dev": "web-development",
  "web-development": "web-development",
  "web-app": "web-development",
  "web-applications": "web-development",
  "e-commerce": "web-development",
  "ecommerce": "web-development",
  "frontend": "web-development",
  "full-stack": "web-development",
  "nextjs": "web-development",
  "react-development": "web-development",

  // Cloud Computing & DevOps Aliases
  "cloud": "cloud-computing",
  "cloud-computing": "cloud-computing",
  "cloud-infrastructure": "cloud-computing",
  "devops": "cloud-computing",
  "devops-automation": "cloud-computing",
  "aws-gcp": "cloud-computing",
  "kubernetes": "cloud-computing",
  "docker": "cloud-computing",

  // Mobile App Development Aliases
  "mobile-app": "mobile-app-development",
  "mobile-app-development": "mobile-app-development",
  "mobile": "mobile-app-development",
  "ios-app": "mobile-app-development",
  "android-app": "mobile-app-development",
  "react-native": "mobile-app-development",
  "flutter": "mobile-app-development",
  "app-development": "mobile-app-development",

  // UI/UX & Visual Design Aliases
  "ui-ux-design": "ui-ux-design",
  "ui-ux": "ui-ux-design",
  "ux-design": "ui-ux-design",
  "ui-design": "ui-ux-design",
  "product-design": "ui-ux-design",
  "branding": "ui-ux-design",
  "brand-identity": "ui-ux-design",

  // Digital Marketing & SEO Aliases
  "digital-marketing": "digital-marketing",
  "marketing": "digital-marketing",
  "seo": "digital-marketing",
  "seo-optimization": "digital-marketing",
  "growth-marketing": "digital-marketing",
  "security": "security",
  "cybersecurity": "cybersecurity",

  // Graphic Design Aliases
  "graphic-design": "graphic-design",
  "graphics": "graphic-design",
  "visual-design": "graphic-design",
  "logo-design": "graphic-design",

  // WordPress Development Aliases
  "wordpress-development": "wordpress-development",
  "wordpress": "wordpress-development",
  "cms-development": "wordpress-development",
  "woocommerce": "wordpress-development",

  // Custom Software & AI Development Aliases
  "custom-software-development": "custom-software-development",
  "custom-software": "custom-software-development",
  "software-development": "custom-software-development",
  "saas-development": "custom-software-development",
  "ai-automation": "ai-automation",
  "ai-ml": "ai-automation",
  "artificial-intelligence": "ai-automation",
  "llm-integration": "ai-automation",
};

const customServiceOverrides = {
  "ai-automation": {
    slug: "ai-automation",
    title: "AI Integration & Automation",
    subtitle: "LLM Workflows & RAG Vectors",
    description: "Empower your business with custom LLM workflows, RAG vector document search, and 24/7 intelligent automated customer support.",
    longDescription: "Transform enterprise operations with custom AI agents trained specifically on your business data. We build RAG vector search pipelines, custom LLM fine-tuning, and automated workflow bots that slash operational costs by over 60%.",
    features: ["Custom RAG Vector Search", "LangChain & OpenAI API Integration", "24/7 Autonomous AI Customer Support Agents", "LLM Fine-Tuning & Prompt SOPs"],
    benefits: ["60% Reduction in Operational Costs", "Instant Multilingual Customer Support", "Zero Manual Document Searching", "Sub-second AI Inference Latency"],
  },
  "security": {
    slug: "security",
    title: "Cybersecurity & Compliance",
    subtitle: "Zero-Trust Data Protection",
    description: "Enterprise-grade data encryption, zero-trust authorization protocols, continuous vulnerability auditing, and SOC2 / ISO compliance.",
    longDescription: "Secure your digital assets with bank-grade zero-trust architectures. We implement automated vulnerability scanning, end-to-end payload encryption, SOC2 Type II compliance, and real-time threat prevention gateways.",
    features: ["Zero-Trust Identity & Access Control", "Continuous Vulnerability Scanning", "End-to-End Payload Encryption", "SOC2 & ISO 27001 Compliance"],
    benefits: ["100% Data Breach Prevention Score", "Regulatory Compliance Guarantee", "Real-Time Threat Detection", "Zero Unauthorized Access Incidents"],
  },
  "cybersecurity": {
    slug: "cybersecurity",
    title: "Cybersecurity & Compliance",
    subtitle: "Zero-Trust Data Protection",
    description: "Enterprise-grade data encryption, zero-trust authorization protocols, continuous vulnerability auditing, and SOC2 / ISO compliance.",
    longDescription: "Secure your digital assets with bank-grade zero-trust architectures. We implement automated vulnerability scanning, end-to-end payload encryption, SOC2 Type II compliance, and real-time threat prevention gateways.",
    features: ["Zero-Trust Identity & Access Control", "Continuous Vulnerability Scanning", "End-to-End Payload Encryption", "SOC2 & ISO 27001 Compliance"],
    benefits: ["100% Data Breach Prevention Score", "Regulatory Compliance Guarantee", "Real-Time Threat Detection", "Zero Unauthorized Access Incidents"],
  },
};

const ServiceDetail = () => {
  const params = useParams();
  const rawSlug = String(params?.slug || "");
  const mappedSlug = slugAliases[rawSlug] || rawSlug;
  const slug = mappedSlug;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentIndex = servicesData.findIndex((s) => s.slug === mappedSlug);
  const service = customServiceOverrides[rawSlug] || customServiceOverrides[mappedSlug] || servicesData[currentIndex] || servicesData.find((s) => s.slug === "web-development") || servicesData[0];
  const nextService = servicesData[(currentIndex + 1) % servicesData.length] || servicesData[0];




  if (!service && currentIndex === -1) {
    return notFound();
  }

  return (
    <>
      <div className="min-h-screen text-white relative overflow-x-hidden pt-28 pb-36 select-none">
        
        {/* Background Cosmic Particle Grid */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <CosmicBackground />
        </div>

        {/* 10/12 Container Width */}
        <div className="w-10/12 mx-auto relative z-10">

          {/* Top Navigation: Back to Services */}
          <div className="mb-8">
            <Link
              href="/main/services"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#EFFC76]/40 bg-[#EFFC76]/10 text-[#EFFC76] text-xs font-mono font-bold hover:bg-[#EFFC76] hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(239,252,118,0.2)] group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to Services</span>
            </Link>
          </div>

          {/* ================= HERO HEADER ================= */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl"
            >
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="px-3.5 py-1 rounded-full text-[10px] font-mono font-bold bg-[#EFFC76]/15 text-[#EFFC76] border border-[#EFFC76]/30 uppercase tracking-widest">
                  SERVICE OVERVIEW
                </span>
                {service?.subtitle && (
                  <span className="px-3.5 py-1 rounded-full text-[10px] font-mono font-bold bg-white/5 text-gray-300 border border-white/10 uppercase tracking-widest">
                    {service.subtitle}
                  </span>
                )}
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight uppercase mb-6">
                {service?.title || "Custom Engineering Service"}
              </h1>

              <p className="text-gray-300 text-base sm:text-lg md:text-xl font-light leading-relaxed mb-8">
                {service?.longDescription || service?.description || "High-performance enterprise solution engineered for sub-second response times, security, and cloud scalability."}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#EFFC76] hover:bg-[#f3ff8c] text-black font-extrabold text-xs sm:text-sm px-7 py-3.5 rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(239,252,118,0.5)] flex items-center gap-2"
                >
                  <span>Start a Project</span>
                  <ArrowRight size={16} className="stroke-[2.5]" />
                </button>

                <Link
                  href="/main/case-studies"
                  className="bg-[#081808]/90 border border-[#EFFC76]/40 hover:border-[#EFFC76] text-white hover:text-[#EFFC76] font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-full transition-all duration-300 backdrop-blur-xl"
                >
                  View Related Case Studies
                </Link>
              </div>
            </motion.div>
          </div>

          {/* ================= 2-COLUMN MAIN BODY GRID ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">

            {/* Left Column: Features & Benefits (8 Cols) */}
            <div className="lg:col-span-8 space-y-10">

              {/* KEY FEATURES SECTION */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#051105]/92 border border-[#EFFC76]/30 rounded-[32px] p-7 sm:p-8 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
              >
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 rounded-xl bg-[#EFFC76]/15 border border-[#EFFC76]/40 text-[#EFFC76]">
                    <Zap size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#EFFC76] font-bold uppercase tracking-widest block">CAPABILITIES</span>
                    <h3 className="text-xl sm:text-2xl font-black text-white">Key Service Features</h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service?.features?.map((feature, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.02, x: 3 }}
                      className="p-5 rounded-2xl bg-[#081808] border border-[#EFFC76]/20 hover:border-[#EFFC76] transition-all flex items-start gap-3"
                    >
                      <div className="p-1 rounded-lg bg-[#EFFC76]/20 text-[#EFFC76] shrink-0 mt-0.5">
                        <CheckCircle2 size={16} />
                      </div>
                      <h4 className="font-bold text-sm text-white leading-snug">{feature}</h4>
                    </motion.div>
                  )) || (
                    <p className="text-gray-400 text-sm">Features data updated for enterprise scale.</p>
                  )}
                </div>
              </motion.div>

              {/* BENEFITS SECTION */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#051105]/92 border border-[#EFFC76]/30 rounded-[32px] p-7 sm:p-8 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
              >
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 rounded-xl bg-[#EFFC76]/15 border border-[#EFFC76]/40 text-[#EFFC76]">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#EFFC76] font-bold uppercase tracking-widest block">VALUE DELIVERED</span>
                    <h3 className="text-xl sm:text-2xl font-black text-white">Client Business Benefits</h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service?.benefits?.map((benefit, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-[#0b240b] border border-[#EFFC76]/40 shadow-[0_0_15px_rgba(239,252,118,0.15)]">
                      <div className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-[#EFFC76] text-black font-bold flex items-center justify-center text-xs">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      <span className="text-xs sm:text-sm font-mono font-bold text-[#EFFC76]">{benefit}</span>
                    </div>
                  )) || [
                    "Sub-second page load performance",
                    "Bank-grade security & compliance",
                    "Continuous CI/CD deployment pipeline",
                    "24/7 dedicated engineering support"
                  ].map((b, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-[#0b240b] border border-[#EFFC76]/40">
                      <div className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-[#EFFC76] text-black font-bold flex items-center justify-center text-xs">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      <span className="text-xs sm:text-sm font-mono font-bold text-[#EFFC76]">{b}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>

            {/* Right Column: Sticky Consultation Box (4 Cols) */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="sticky top-32 p-7 rounded-[32px] bg-[#051105]/95 border border-[#EFFC76]/35 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.95)]"
              >
                <span className="text-[10px] font-mono font-extrabold text-[#EFFC76] uppercase tracking-widest block mb-2">
                  EXECUTIVE KICK-OFF
                </span>

                <h3 className="text-2xl font-black text-white mb-3">
                  Ready to start your project?
                </h3>

                <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed mb-6">
                  Let's discuss how our <strong className="text-[#EFFC76]">{service?.title}</strong> engineering team can help you build sub-second scalable systems.
                </p>

                {/* Value Checklist */}
                <div className="space-y-2.5 mb-8">
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-200">
                    <CheckCircle2 size={15} className="text-[#EFFC76] shrink-0" />
                    <span>100% Source Code Ownership</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-200">
                    <CheckCircle2 size={15} className="text-[#EFFC76] shrink-0" />
                    <span>Dedicated Technical PM</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-gray-200">
                    <CheckCircle2 size={15} className="text-[#EFFC76] shrink-0" />
                    <span>99.99% SLA Uptime Guarantee</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-4 rounded-full bg-[#EFFC76] hover:bg-[#f3ff8c] text-black font-extrabold text-sm text-center transition-all duration-300 shadow-[0_0_25px_rgba(239,252,118,0.5)] flex items-center justify-center gap-2"
                >
                  <span>Book a Consultation</span>
                  <ArrowRight size={16} className="stroke-[2.5]" />
                </button>
              </motion.div>
            </div>

          </div>

          {/* ================= WORKFLOW COMPONENT SECTION ================= */}
          <div className="mb-20">
            {slug === 'web-development' || slug === 'custom-website' ? (
              <WebDevelopmentWorkflow />
            ) : slug === 'cloud-computing' || slug === 'cloud' ? (
              <CloudComputingWorkflow />
            ) : slug === 'mobile-app-development' || slug === 'mobile-app' ? (
              <MobileAppWorkflow />
            ) : slug === 'ui-ux-design' || slug === 'branding' ? (
              <UiUxDesignWorkflow />
            ) : slug === 'digital-marketing' ? (
              <DigitalMarketingWorkflow />
            ) : slug === 'graphic-design' ? (
              <GraphicDesignWorkflow />
            ) : slug === 'wordpress-development' ? (
              <WordPressWorkflow />
            ) : slug === 'custom-software-development' ? (
              <CustomSoftwareWorkflow />
            ) : (
              <DevOpsWorkflow />
            )}
          </div>

          {/* ================= NEXT SERVICE NAVIGATION FOOTER ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-t border-white/10 pt-12"
          >
            <span className="text-gray-400 font-mono text-xs uppercase tracking-widest block mb-3">
              NEXT ENGINEERING SERVICE
            </span>

            <Link href={`/main/services/${nextService.slug}`} className="group inline-block">
              <h2 className="text-3xl sm:text-5xl font-black text-white group-hover:text-[#EFFC76] transition-colors mb-3">
                {nextService.title}
              </h2>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#EFFC76] group-hover:translate-x-3 transition-transform">
                <span>Explore Service Details</span>
                <ArrowRight size={16} />
              </div>
            </Link>
          </motion.div>

        </div>
      </div>

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ServiceDetail;
