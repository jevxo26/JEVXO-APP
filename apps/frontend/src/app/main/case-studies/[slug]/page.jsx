"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import CosmicBackground from "@/components/Home/CosmicBackground";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Zap,
  Layers,
  Sparkles,
  ShieldCheck,
  Rocket,
  Activity,
  Clock,
  CheckSquare,
  Cpu,
} from "lucide-react";
import Image from "next/image";
import AppointmentModal from "@/components/Home/AppointmentModal";
import { useQuery } from "@/hooks/useApi";

// Comprehensive Hardcoded Case Studies Dataset matching Real-World SaaS Product & Enterprise Standards
const fallbackCaseStudies = {
  "1": {
    id: "1",
    title: "Microfinance Operations Suite",
    client: "Confidential Finance Client (NDA)",
    description: "A branch-ready loan operations system with real-time repayment tracking, role-based access, and daily reporting automation.",
    serviceTrack: "Data-Driven Financial Architecture",
    team: "6 specialists",
    duration: "10 weeks",
    year: "2025",
    mainImg: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop",
    img2: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop",
    img3: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop",
    img4: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop",
    challenge: "Loan reconciliation and branch operations suffered from fragmented offline data tracking, manual ledger entries, and multi-day reporting delays across regional branches.",
    roadmap: [
      { phase: "Phase 01", title: "Discovery & System Blueprinting", desc: "Mapped branch workflows, compliance protocols, and database schemas for multi-tenant loan ledgers." },
      { phase: "Phase 02", title: "Security & Role-Based UI/UX", desc: "Designed intuitive interfaces with strict zero-trust permission models for field officers and managers." },
      { phase: "Phase 03", title: "Full-Stack Core & API Integration", desc: "Built automated repayment engines, ledger synchronization, and real-time sms/email notification gateways." },
      { phase: "Phase 04", title: "Deployment & 24/7 SLA Support", desc: "Deployed on GCP Docker clusters with automated daily backups, monitoring, and 99.99% uptime guarantees." },
    ],
    benefits: [
      { title: "52% Faster Reconciliation", desc: "Automated end-of-day ledger audits cut accounting overhead from 4 hours to under 30 minutes daily." },
      { title: "Bank-Grade Encryption", desc: "Zero-trust architecture ensuring all loan records and customer PII meet financial regulatory standards." },
      { title: "Multi-Branch Cloud Scale", desc: "Seamless cloud synchronization connecting regional branch offices into a centralized management hub." },
      { title: "Real-Time Field Tracking", desc: "Instant mobile repayment updates allowing officers to record transactions on-the-go with zero latency." },
    ],
    strategies: [
      "Built real-time ledger sync architecture with automated repayment tracking",
      "Designed role-based access control for branch managers and field officers",
      "Created automated end-of-day reconciliation engine with instant alerts"
    ],
    deliverables: [
      "Branch Management Dashboard",
      "Repayment Tracking Engine",
      "Role-Based Access Control",
      "Daily Reconciliation SOP"
    ],
    outcomes: [
      "52% faster daily reconciliation",
      "99.99% ledger accuracy score",
      "Zero offline data discrepancies"
    ],
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Docker", "GCP"],
    nextTitle: "Meta Performance Engine",
    nextId: "2",
  },
  "2": {
    id: "2",
    title: "Meta Performance Engine",
    client: "Regional Wellness Brand",
    description: "A performance campaign framework with conversion events, creative testing matrix, and weekly scaling decisions.",
    serviceTrack: "Data-Driven Meta Ads Campaign",
    team: "4 specialists",
    duration: "6 weeks",
    year: "2025",
    mainImg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop",
    img2: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop",
    img3: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop",
    img4: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop",
    challenge: "Ad budget increased month-over-month but cost per qualified lead remained unstable due to fragmented tracking and ad creative fatigue.",
    roadmap: [
      { phase: "Phase 01", title: "CAPI Audit & Pixel Architecture", desc: "Configured Server-Side Conversion API (CAPI) to eliminate data loss from browser ad-blockers." },
      { phase: "Phase 02", title: "Creative Matrix & Angle Testing", desc: "Engineered 12 video and carousel variations targeting core customer pain points." },
      { phase: "Phase 03", title: "Funnel Optimization & Retargeting", desc: "Built dynamic retargeting sequences for high-intent visitors and cart abandoners." },
      { phase: "Phase 04", title: "Weekly Scaling & Looker Dashboard", desc: "Established automated ROAS triggers and real-time executive performance dashboards." },
    ],
    benefits: [
      { title: "2.9x Return On Ad Spend", desc: "Consistently generated $2.90 in trackable revenue for every $1.00 spent on Meta advertising." },
      { title: "41% Reduction in CPL", desc: "Lowered cost-per-lead significantly while increasing lead qualification filters." },
      { title: "Predictable Scaling Matrix", desc: "Clear budget scaling rules preventing ad fatigue and stabilizing acquisition costs." },
      { title: "100% Attribution Clarity", desc: "Complete server-side tracking eliminating blind spots in customer purchase journeys." },
    ],
    strategies: [
      "Implemented event architecture with Pixel and CAPI API",
      "Designed audience ladder from cold to high-intent retargeting pools",
      "Created creative rotation rhythm based on fatigue signals"
    ],
    deliverables: [
      "Campaign build",
      "Creative testing framework",
      "Attribution dashboard",
      "Optimization SOP"
    ],
    outcomes: [
      "2.9x ROAS in 45 days",
      "41% lower CPL",
      "18% Increase in qualified appointments"
    ],
    techStack: ["Meta Ads", "GA4", "Looker Studio", "UTM Governance", "Tailwind"],
    nextTitle: "Premium Brand Refresh",
    nextId: "3",
  },
  "3": {
    id: "3",
    title: "Premium Brand Refresh",
    client: "Interior and Lifestyle Company",
    description: "A full identity refresh across logo system, visual language, and brand communication for higher-ticket positioning.",
    serviceTrack: "Brand Identity & Visual System",
    team: "3 specialists",
    duration: "4 weeks",
    year: "2025",
    mainImg: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop",
    img2: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=600&auto=format&fit=crop",
    img3: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&auto=format&fit=crop",
    img4: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=600&auto=format&fit=crop",
    challenge: "Outdated visual identity failed to communicate luxury positioning, causing low conversion on high-ticket proposals.",
    roadmap: [
      { phase: "Phase 01", title: "Brand Positioning & Audit", desc: "Analyzed premium competitor landscapes and defined luxury editorial brand pillars." },
      { phase: "Phase 02", title: "Visual Identity & Design Tokens", desc: "Created bespoke serif typography, bronze-gold color palettes, and logo marks." },
      { phase: "Phase 03", title: "Digital Storefront Engineering", desc: "Built a responsive high-converting website showcase with glassmorphism and micro-interactions." },
      { phase: "Phase 04", title: "Collateral & Brand Guidelines", desc: "Delivered comprehensive print, digital, and social media brand asset packages." },
    ],
    benefits: [
      { title: "2.4x Higher Ticket Size", desc: "Repositioned brand identity enabled closing significantly higher contract values per client." },
      { title: "63% Growth in Inquiries", desc: "Modern visual aesthetic led to a surge in qualified inbound organic lead submissions." },
      { title: "Unified Brand Language", desc: "Consistent brand presentation across website, proposal decks, and social channels." },
      { title: "Luxury Market Positioning", desc: "Established brand authority matching top-tier international design studios." },
    ],
    strategies: [
      "Designed custom typography, color tokens, and logo mark system",
      "Created luxury editorial layout guidelines for digital & print",
      "Engineered responsive high-converting digital storefront showcase"
    ],
    deliverables: [
      "Logo System & Guidelines",
      "Digital Brand Kit",
      "Editorial Showcase Site",
      "Social Media Templates"
    ],
    outcomes: [
      "63% growth in qualified inquiries",
      "2.4x higher average project ticket",
      "100% brand consistency score"
    ],
    techStack: ["Framer", "Figma", "Design Tokens", "React", "Tailwind"],
    nextTitle: "Omnichannel E-Commerce Hub",
    nextId: "4",
  },
  "4": {
    id: "4",
    title: "Omnichannel E-Commerce Hub",
    client: "Global Retail Enterprise",
    description: "Headless storefront architecture connected to multi-warehouse inventory with sub-second page load benchmarks.",
    serviceTrack: "Headless Commerce Architecture",
    team: "8 specialists",
    duration: "12 weeks",
    year: "2026",
    mainImg: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop",
    img2: "https://images.unsplash.com/photo-1556742049-0a67dd097c02?w=600&auto=format&fit=crop",
    img3: "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=600&auto=format&fit=crop",
    img4: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=600&auto=format&fit=crop",
    challenge: "Monolithic legacy storefront suffered from 4.2s page load times and stock synchronization delays across global warehouses.",
    roadmap: [
      { phase: "Phase 01", title: "Headless Architecture Design", desc: "Separated frontend Next.js presentation layer from backend ERP/inventory databases." },
      { phase: "Phase 02", title: "GraphQL Middleware & Caching", desc: "Built GraphQL middleware for sub-second inventory sync and Cloudflare Edge caching." },
      { phase: "Phase 03", title: "Stripe & Multi-Currency Checkout", desc: "Integrated global payment gateways, localized tax rules, and instant checkout flows." },
      { phase: "Phase 04", title: "Load Testing & Global Deployment", desc: "Executed simulated 100k user surge tests ensuring 100/100 Lighthouse performance." },
    ],
    benefits: [
      { title: "0.3s Global Page Loads", desc: "Edge-cached storefront delivering sub-second response times worldwide." },
      { title: "45% Higher Conversion Rate", desc: "Eliminated checkout friction resulting in massive revenue growth." },
      { title: "Real-Time Stock Sync", desc: "Instant inventory updates across all retail stores and digital channels." },
      { title: "Infinite Cyber Week Scale", desc: "Cloud-native infrastructure handling holiday traffic spikes effortlessly." },
    ],
    strategies: [
      "Architected Next.js headless storefront with Cloudflare Edge Caching",
      "Engineered GraphQL middleware for real-time multi-warehouse inventory",
      "Integrated multi-currency Stripe checkout with automated tax rules"
    ],
    deliverables: [
      "Sub-second Headless Storefront",
      "Inventory Middleware API",
      "Stripe Checkout Integration",
      "Real-Time Analytics Suite"
    ],
    outcomes: [
      "100/100 Lighthouse Performance",
      "45% increase in conversion rate",
      "0.3s global page load time"
    ],
    techStack: ["Next.js", "GraphQL", "Tailwind", "Stripe", "Cloudflare"],
    nextTitle: "Cross-Platform Mobile Wallet",
    nextId: "5",
  },
  "5": {
    id: "5",
    title: "Cross-Platform Mobile Wallet",
    client: "FinTech Startup",
    description: "Biometric authentication, instant peer-to-peer transfers, and multi-currency virtual card issuance.",
    serviceTrack: "Mobile Fintech Engineering",
    team: "7 specialists",
    duration: "14 weeks",
    year: "2026",
    mainImg: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop",
    img2: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop",
    img3: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=600&auto=format&fit=crop",
    img4: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop",
    challenge: "Fintech startup needed a secure, compliant mobile app capable of processing instant P2P transactions with biometric security.",
    roadmap: [
      { phase: "Phase 01", title: "Compliance & Security Blueprint", desc: "Designed zero-trust security layers meeting mobile banking standards." },
      { phase: "Phase 02", title: "React Native UI & Biometrics", desc: "Built fluid cross-platform interface supporting FaceID/TouchID logins." },
      { phase: "Phase 03", title: "WebSocket Real-Time Ledger", desc: "Engineered sub-second money transfer engine with instant push notifications." },
      { phase: "Phase 04", title: "App Store & Play Store Launch", desc: "Passed security audits and published on iOS App Store & Google Play Store." },
    ],
    benefits: [
      { title: "250k+ Mobile Downloads", desc: "Rapid user adoption driven by sleek UI and sub-second P2P transfers." },
      { title: "99.99% Transaction Success", desc: "Reliable transaction engine with zero lost payment events." },
      { title: "Virtual Card Management", desc: "Users can generate, freeze, and manage virtual cards instantly." },
      { title: "Bank-Grade Encryption", desc: "End-to-end payload encryption securing user funds and sensitive data." },
    ],
    strategies: [
      "Implemented biometric FaceID & TouchID zero-trust authentication",
      "Integrated WebSocket real-time transaction ledger for P2P transfers",
      "Built multi-currency virtual card management API with instant lock"
    ],
    deliverables: [
      "iOS & Android Mobile App",
      "P2P Transaction Ledger",
      "Virtual Card Issuance Module",
      "Biometric Auth Security Layer"
    ],
    outcomes: [
      "250k+ Active Mobile Downloads",
      "99.99% transaction success rate",
      "Sub-second P2P transfer speed"
    ],
    techStack: ["React Native", "Node.js", "Redis", "WebSockets", "AWS"],
    nextTitle: "Social Growth Campaign Studio",
    nextId: "6",
  },
  "6": {
    id: "6",
    title: "Social Growth Campaign Studio",
    client: "Tech Media Network",
    description: "Viral short-form video strategy, automated cross-platform distribution, and audience sentiment analytics.",
    serviceTrack: "Social Growth & Analytics",
    team: "5 specialists",
    duration: "8 weeks",
    year: "2026",
    mainImg: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1200&auto=format&fit=crop",
    img2: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop",
    img3: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop",
    img4: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop",
    challenge: "Media brand struggled to scale organic reach across short-form platforms without structured content automation.",
    roadmap: [
      { phase: "Phase 01", title: "Content Engine Architecture", desc: "Designed automated rendering pipeline for short-form clips." },
      { phase: "Phase 02", title: "Multi-Platform API Integration", desc: "Connected Meta, YouTube, and TikTok APIs for 1-click publishing." },
      { phase: "Phase 03", title: "AI Sentiment Analysis", desc: "Implemented OpenAI models to evaluate comment trends and audience retention." },
      { phase: "Phase 04", title: "Scaling & Analytics SOP", desc: "Trained media teams on data-driven content calendar scheduling." },
    ],
    benefits: [
      { title: "4.5M Monthly Reach", desc: "Achieved massive organic impression growth across social channels." },
      { title: "310% Subscriber Growth", desc: "Accelerated subscriber conversion rates through optimized video hooks." },
      { title: "85% Less Publishing Time", desc: "Automated distribution freed team resources for creative production." },
      { title: "Real-Time Sentiment AI", desc: "Instant feedback loops identifying high-performing content topics." },
    ],
    strategies: [
      "Engineered automated video rendering and distribution workflow",
      "Implemented AI sentiment analysis on audience engagement",
      "Deployed multi-channel scheduling platform for team collaboration"
    ],
    deliverables: [
      "Content Distribution Engine",
      "AI Sentiment Dashboard",
      "Viral Hook Matrix",
      "Multi-Platform Scheduler"
    ],
    outcomes: [
      "4.5M monthly organic impressions",
      "310% increase in subscriber growth",
      "85% reduction in publishing overhead"
    ],
    techStack: ["Python", "Meta API", "YouTube API", "OpenAI", "React"],
    nextTitle: "Microfinance Operations Suite",
    nextId: "1",
  },
};

const CaseStudyDetail = () => {
  const params = useParams();
  const router = useRouter();
  const slug = String(params.slug);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: detailData } = useQuery(`/case-studies/${slug}`);

  // Fetch or fallback to reference dataset
  const apiProject = detailData?.data || detailData;
  const project = fallbackCaseStudies[slug] || {
    id: slug,
    title: apiProject?.title || "Meta Performance Engine",
    client: apiProject?.client?.name || apiProject?.clientName || "Regional Wellness Brand",
    description: apiProject?.description || "A performance campaign framework with conversion events, creative testing matrix, and weekly scaling decisions.",
    serviceTrack: apiProject?.category || "Data-Driven Meta Ads Campaign",
    team: apiProject?.team || "4 specialists",
    duration: apiProject?.duration || "6 weeks",
    year: "2025",
    mainImg: apiProject?.imageUrl || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop",
    img2: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop",
    img3: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&auto=format&fit=crop",
    img4: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop",
    challenge: apiProject?.problem_statement || "Ad budget increased month-over-month but cost per qualified lead remained unstable due to fragmented tracking.",
    roadmap: [
      { phase: "Phase 01", title: "Discovery & Architecture", desc: "Mapped technical requirements and designed scalable system blueprints." },
      { phase: "Phase 02", title: "UI/UX & Prototyping", desc: "Crafted intuitive interfaces with zero-trust permission models." },
      { phase: "Phase 03", title: "Agile Engineering & API", desc: "Built automated engine components and real-time ledger sync." },
      { phase: "Phase 04", title: "Deployment & Support", desc: "Deployed on GCP Docker clusters with 99.99% uptime guarantees." },
    ],
    benefits: [
      { title: "52% Faster Reconciliation", desc: "Automated end-of-day ledger audits cut accounting overhead." },
      { title: "Bank-Grade Encryption", desc: "Zero-trust architecture ensuring all records meet regulatory standards." },
      { title: "Multi-Branch Cloud Scale", desc: "Seamless cloud synchronization connecting regional branch offices." },
      { title: "Real-Time Field Tracking", desc: "Instant updates allowing officers to record transactions with zero latency." },
    ],
    strategies: [
      "Implemented event architecture with Pixel and CAPI API",
      "Designed audience ladder from cold to high-intent retargeting pools",
      "Created creative rotation rhythm based on fatigue signals"
    ],
    deliverables: [
      "Campaign build",
      "Creative testing framework",
      "Attribution dashboard",
      "Optimization SOP"
    ],
    outcomes: Array.isArray(apiProject?.results) ? apiProject.results : [
      "2.9x ROAS in 45 days",
      "41% lower CPL",
      "18% Increase in qualified appointments"
    ],
    techStack: ["Meta Ads", "GA4", "Looker Studio", "UTM Governance", "Next.js"],
    nextTitle: "Premium Brand Refresh",
    nextId: "3",
  };

  return (
    <>
      <div className="min-h-screen text-white relative overflow-x-hidden pt-28 pb-36 select-none">
        
        {/* Background Cosmic Particle Grid */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <CosmicBackground />
        </div>

        {/* 10/12 Container Width */}
        <div className="w-10/12 mx-auto relative z-10">

          {/* Top Navigation Bar: Back to Portfolio */}
          <div className="mb-8">
            <Link
              href="/main/case-studies"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#EFFC76]/40 bg-[#EFFC76]/10 text-[#EFFC76] text-xs font-mono font-bold hover:bg-[#EFFC76] hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(239,252,118,0.2)] group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              <span>Back to portfolio</span>
            </Link>
          </div>

          {/* ================= HERO SECTION (2 COLUMNS) ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-14">
            
            {/* Left Column: Headline & Overview Bar (7 Cols) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 flex flex-col justify-between h-full"
            >
              <div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight mb-2">
                  {project.title}
                </h1>
                
                <p className="text-sm font-mono font-semibold text-[#EFFC76] mb-4">
                  {project.client}
                </p>

                <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed mb-8">
                  {project.description}
                </p>
              </div>

              {/* 4-Box Overview Bar (Exact Reference Screenshot Layout) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-[#051105]/92 border border-[#EFFC76]/25 rounded-2xl p-3.5 backdrop-blur-xl">
                  <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider block mb-1">SERVICE TRACK</span>
                  <span className="text-xs font-extrabold text-white leading-tight line-clamp-1">{project.serviceTrack}</span>
                </div>

                <div className="bg-[#051105]/92 border border-[#EFFC76]/25 rounded-2xl p-3.5 backdrop-blur-xl">
                  <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider block mb-1">TEAM</span>
                  <span className="text-xs font-extrabold text-white line-clamp-1">{project.team}</span>
                </div>

                <div className="bg-[#051105]/92 border border-[#EFFC76]/25 rounded-2xl p-3.5 backdrop-blur-xl">
                  <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider block mb-1">DURATION</span>
                  <span className="text-xs font-extrabold text-white line-clamp-1">{project.duration}</span>
                </div>

                <div className="bg-[#051105]/92 border border-[#EFFC76]/25 rounded-2xl p-3.5 backdrop-blur-xl">
                  <span className="text-[9px] font-mono text-gray-400 uppercase tracking-wider block mb-1">YEAR</span>
                  <span className="text-xs font-extrabold text-[#EFFC76] line-clamp-1">{project.year}</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Large Hero Showcase Photo (5 Cols) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative w-full h-[300px] sm:h-[360px] rounded-[32px] overflow-hidden border border-[#EFFC76]/35 shadow-[0_20px_50px_rgba(0,0,0,0.95)] group bg-[#081208]"
            >
              <Image
                src={project.mainImg}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#040a04]/80 via-transparent to-transparent pointer-events-none" />
            </motion.div>

          </div>

          {/* ================= STEP-BY-STEP IMPLEMENTATION ROADMAP (4 PHASES) ================= */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 bg-[#051105]/92 border border-[#EFFC76]/30 rounded-[32px] p-6 sm:p-9 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-xl bg-[#EFFC76]/15 border border-[#EFFC76]/40 text-[#EFFC76]">
                <Clock size={18} />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#EFFC76] font-bold uppercase tracking-widest block">EXECUTION ROADMAP</span>
                <h3 className="text-xl sm:text-2xl font-black text-white">Step-by-Step Implementation Process</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {project.roadmap.map((step, idx) => (
                <div key={idx} className="bg-[#081808] border border-[#EFFC76]/20 rounded-2xl p-5 hover:border-[#EFFC76]/60 transition-all group">
                  <span className="text-xs font-mono font-black text-[#EFFC76] px-2.5 py-1 rounded-lg bg-[#EFFC76]/15 border border-[#EFFC76]/30 inline-block mb-3">
                    {step.phase}
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#EFFC76] transition-colors mb-2">
                    {step.title}
                  </h4>
                  <p className="text-gray-300 text-xs font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ================= CLIENT BENEFITS & BUSINESS VALUE DELIVERED ================= */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 bg-[#051105]/92 border border-[#EFFC76]/30 rounded-[32px] p-6 sm:p-9 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-xl bg-[#EFFC76]/15 border border-[#EFFC76]/40 text-[#EFFC76]">
                <Rocket size={18} />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#EFFC76] font-bold uppercase tracking-widest block">VALUE DELIVERED</span>
                <h3 className="text-xl sm:text-2xl font-black text-white">How This Product Helps The Client</h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.benefits.map((b, idx) => (
                <div key={idx} className="bg-[#081808] border border-[#EFFC76]/20 rounded-2xl p-5 hover:border-[#EFFC76]/60 transition-all flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-[#EFFC76]/15 border border-[#EFFC76]/30 text-[#EFFC76] shrink-0 mt-0.5">
                    <CheckSquare size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#EFFC76] mb-1">
                      {b.title}
                    </h4>
                    <p className="text-gray-300 text-xs font-light leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ================= CONTENT GRID (2 COLUMNS) ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">

            {/* ── LEFT COLUMN: CHALLENGE, STRATEGY, DELIVERABLES (7 COLS) ── */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* CHALLENGE SECTION */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#051105]/92 border border-[#EFFC76]/25 rounded-[28px] p-6 sm:p-7 backdrop-blur-xl shadow-lg"
              >
                <span className="text-xs font-mono font-bold text-[#EFFC76] tracking-wider uppercase mb-3 block">
                  CHALLENGE
                </span>

                <div className="flex flex-col sm:flex-row gap-5 items-center">
                  <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed flex-1">
                    {project.challenge}
                  </p>
                  
                  {/* Photo Card 1 */}
                  <div className="relative w-full sm:w-[220px] h-[130px] rounded-2xl overflow-hidden border border-white/15 shrink-0 bg-[#081208]">
                    <Image
                      src={project.img2}
                      alt="Team Strategy Session"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>

              {/* STRATEGY SECTION */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#051105]/92 border border-[#EFFC76]/25 rounded-[28px] p-6 sm:p-7 backdrop-blur-xl shadow-lg"
              >
                <span className="text-xs font-mono font-bold text-[#EFFC76] tracking-wider uppercase mb-4 block">
                  STRATEGY & ARCHITECTURE
                </span>

                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  {/* 3 Strategy Glass Pill Cards */}
                  <div className="space-y-3 flex-1 w-full">
                    {project.strategies.map((strat, i) => (
                      <div
                        key={i}
                        className="bg-[#081a08] border border-[#EFFC76]/20 rounded-xl px-4 py-3 text-xs font-mono text-gray-200 flex items-center gap-3 hover:border-[#EFFC76]/50 transition-all"
                      >
                        <CheckCircle2 size={16} className="text-[#EFFC76] shrink-0" />
                        <span>{strat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Photo Card 2 */}
                  <div className="relative w-full sm:w-[220px] h-[145px] rounded-2xl overflow-hidden border border-white/15 shrink-0 bg-[#081208]">
                    <Image
                      src={project.img3}
                      alt="Strategy Matrix"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>

              {/* DELIVERABLES SECTION */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#051105]/92 border border-[#EFFC76]/25 rounded-[28px] p-6 sm:p-7 backdrop-blur-xl shadow-lg"
              >
                <span className="text-xs font-mono font-bold text-[#EFFC76] tracking-wider uppercase mb-4 block">
                  DELIVERABLES & SERVICES INCLUDED
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.deliverables.map((item, i) => (
                    <div
                      key={i}
                      className="bg-[#081a08] border border-[#EFFC76]/20 rounded-xl px-4 py-3 text-xs font-mono text-gray-200 flex items-center gap-2.5"
                    >
                      <Zap size={14} className="text-[#EFFC76] shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>

            {/* ── RIGHT COLUMN: OUTCOMES & TECH STACK (5 COLS) ── */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Photo Card 3 (Top Right Image) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative w-full h-[180px] rounded-[28px] overflow-hidden border border-white/15 shadow-xl bg-[#081208]"
              >
                <Image
                  src={project.img4}
                  alt="Analytics Dashboard"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* OUTCOMES SECTION (Glowing Neon Cards) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#051105]/92 border border-[#EFFC76]/30 rounded-[28px] p-6 sm:p-7 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.9)]"
              >
                <span className="text-xs font-mono font-bold text-[#EFFC76] tracking-wider uppercase mb-4 block">
                  MEASURABLE OUTCOMES & KEY METRICS
                </span>

                <div className="space-y-3">
                  {project.outcomes.map((out, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.02, x: 3 }}
                      className="bg-[#0b240b] border border-[#EFFC76]/50 rounded-2xl px-4 py-3.5 text-xs sm:text-sm font-mono font-extrabold text-[#EFFC76] shadow-[0_0_20px_rgba(239,252,118,0.25)] flex items-center gap-3 transition-all cursor-default"
                    >
                      <div className="p-1.5 rounded-lg bg-[#EFFC76] text-black shrink-0 shadow-sm">
                        <Sparkles size={14} className="stroke-[3]" />
                      </div>
                      <span>{out}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* TECH STACK & DEPLOYMENT ARCHITECTURE SECTION */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#051105]/92 border border-[#EFFC76]/30 rounded-[28px] p-6 sm:p-7 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.9)]"
              >
                <span className="text-xs font-mono font-bold text-[#EFFC76] tracking-wider uppercase mb-4 block">
                  TECH STACK & DEPLOYMENT ARCHITECTURE
                </span>

                <div className="flex flex-wrap gap-2.5">
                  {project.techStack.map((tech, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 rounded-xl text-xs font-mono font-extrabold bg-[#091f09] text-[#EFFC76] border border-[#EFFC76]/40 hover:border-[#EFFC76] hover:bg-[#EFFC76] hover:text-black transition-all duration-300 shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <Cpu size={14} className="shrink-0" />
                      <span>{tech}</span>
                    </motion.span>
                  ))}
                </div>

                {/* Deployment SLA Indicator */}
                <div className="mt-4 pt-3.5 border-t border-[#EFFC76]/20 flex items-center gap-2 text-[11px] font-mono text-gray-300">
                  <span className="w-2 h-2 rounded-full bg-[#EFFC76] animate-pulse" />
                  <span>Deployment: <strong className="text-[#EFFC76]">GCP/AWS Docker Clusters with 99.99% SLA Uptime</strong></span>
                </div>
              </motion.div>


            </div>

          </div>

          {/* ================= BOTTOM NAVIGATION CTA BAR ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/10"
          >
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#EFFC76] hover:bg-[#f3ff8c] text-black font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-full transition-all duration-300 shadow-[0_0_25px_rgba(239,252,118,0.5)]"
            >
              Start a similar project
            </button>

            {project.nextId && (
              <Link
                href={`/main/case-studies/${project.nextId}`}
                className="bg-[#081808]/90 border border-[#EFFC76]/40 hover:border-[#EFFC76] text-white hover:text-[#EFFC76] font-semibold text-xs sm:text-sm px-6 py-3.5 rounded-full transition-all duration-300 backdrop-blur-xl flex items-center gap-2 group"
              >
                <span>Next case: {project.nextTitle}</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            )}
          </motion.div>

          {/* ================= BRAND / PARTNER LOGOS STRIP ================= */}
          <div className="mt-20 pt-10 border-t border-white/10">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center text-center opacity-80 hover:opacity-100 transition-opacity">
              <div>
                <p className="text-white font-extrabold text-base">F Framer</p>
                <p className="text-[10px] font-mono text-gray-400 mt-0.5">Professional Partner</p>
              </div>

              <div>
                <p className="text-white font-extrabold text-base">W Webflow</p>
                <p className="text-[10px] font-mono text-gray-400 mt-0.5">Professional Partner</p>
              </div>

              <div>
                <p className="text-[#3b82f6] font-extrabold text-base">Behance</p>
                <p className="text-[10px] font-mono text-gray-400 mt-0.5">Top Team On Behance</p>
              </div>

              <div>
                <p className="text-[#ec4899] font-extrabold text-base">dribbble</p>
                <p className="text-[10px] font-mono text-gray-400 mt-0.5">Top Team On Dribbble</p>
              </div>

              <div>
                <p className="text-white font-extrabold text-base">Clutch</p>
                <p className="text-[10px] font-mono text-gray-400 mt-0.5">Reviewed On ★★★★★</p>
              </div>

              <div>
                <p className="text-[#4285f4] font-extrabold text-base">Google</p>
                <p className="text-[10px] font-mono text-gray-400 mt-0.5">Reviewed On ★★★★★</p>
              </div>
            </div>
          </div>

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

export default CaseStudyDetail;
