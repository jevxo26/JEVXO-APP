"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Briefcase,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Bot,
  Truck,
  Building2,
  ShoppingCart,
  Users,
  Sparkles,
} from "lucide-react";
import CosmicBackground from "@/components/Home/CosmicBackground";

export const solutionsData = [
  {
    id: "business-management",
    title: "Business Management & ERP",
    category: "Enterprise",
    badge: "Enterprise",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
    shortDescription: "All-in-one platform for enterprise resource planning, financial control, and operational workflows.",
    fullDescription: "Our Business Management & ERP solution unifies core business operations—finance, inventory management, multi-branch tracking, and team workflows—into a centralized, high-performance real-time dashboard.",
    features: [
      "Real-time Financial Analytics & Profit Reporting",
      "Automated Multi-Warehouse Inventory Sync",
      "Multi-Branch & Multi-Currency System Operations",
      "Granular Role-Based Access Control & Audit Logs",
    ],
    techStack: ["Next.js 14", "Node.js", "PostgreSQL", "Docker", "Redis"],
    stats: [
      { label: "Efficiency Boost", value: "45%" },
      { label: "Uptime SLA", value: "99.9%" },
      { label: "Deploy Time", value: "< 2 Wks" },
    ]
  },
  {
    id: "smart-crm",
    title: "Smart CRM & Sales Automation",
    category: "Sales & Marketing",
    badge: "Popular",
    icon: Users,
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop",
    shortDescription: "Automated customer relationship management, sales pipelines, and AI lead scoring.",
    fullDescription: "Empower your sales and support teams with AI-powered lead tracking, automated email sequences, visual deals pipeline managers, and deep customer behavioral analytics.",
    features: [
      "Drag-and-Drop Interactive Deal Pipelines",
      "AI-Powered Lead Scoring & Intent Insights",
      "Omnichannel WhatsApp & Email Integration",
      "Automated Follow-ups & Task Reminders",
    ],
    techStack: ["React 18", "TypeScript", "Python", "MongoDB", "Tailwind CSS"],
    stats: [
      { label: "Lead Conv. Rate", value: "+38%" },
      { label: "Response Speed", value: "Instant" },
      { label: "Team Adopt", value: "95%" },
    ]
  },
  {
    id: "hrms-payroll",
    title: "HRMS & Automated Payroll",
    category: "Human Resources",
    badge: "Core",
    icon: Briefcase,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop",
    shortDescription: "Comprehensive HR management, employee onboarding, attendance tracking, and automated payroll.",
    fullDescription: "Streamline global workforce management. From automated onboarding workflows and biometric attendance tracking to tax-compliant, multi-currency salary disbursements.",
    features: [
      "Automated Salary & Tax Disbursement Engine",
      "Leave & Attendance Tracking Portal",
      "Employee Self-Service Dashboard",
      "Performance Appraisal & Goal Milestone Tracking",
    ],
    techStack: ["Next.js", "NestJS", "PostgreSQL", "AWS SES"],
    stats: [
      { label: "Payroll Speed", value: "10x Faster" },
      { label: "Error Rate", value: "0.0%" },
      { label: "Saves Hr/Mo", value: "120+ Hrs" },
    ]
  },
  {
    id: "ecommerce-engine",
    title: "E-Commerce Engine & SquadCart",
    category: "E-Commerce",
    badge: "Featured",
    icon: ShoppingCart,
    image: "https://images.unsplash.com/photo-1556742049-0a670fc80028?w=800&auto=format&fit=crop",
    shortDescription: "High-conversion headless storefronts, multi-vendor marketplaces, and inventory sync.",
    fullDescription: "Architect lightning-fast digital storefronts. SquadCart delivers headless commerce capabilities with instant sub-second page loads, global multi-currency checkout, and real-time inventory management.",
    features: [
      "Headless Storefront & Sub-Second Page Speed",
      "Multi-Vendor Marketplace & Seller Hub",
      "One-Click Checkout & Local Payment Gateways",
      "Real-Time Stock Sync across Amazon, Web & POS",
    ],
    techStack: ["Next.js App Router", "Node.js", "Stripe API", "Redis"],
    stats: [
      { label: "Page Load", value: "< 0.4s" },
      { label: "Conv. Uplift", value: "+40%" },
      { label: "Uptime", value: "99.99%" },
    ]
  },
  {
    id: "ai-automation-chatbots",
    title: "AI Automation & Smart Chatbots",
    category: "AI & Innovation",
    badge: "AI Next-Gen",
    icon: Bot,
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop",
    shortDescription: "Custom LLM integrations, automated customer support agents, and workflow bots.",
    fullDescription: "Elevate your customer service and internal operations with custom AI agents trained specifically on your enterprise knowledge base, docs, and customer interaction logs.",
    features: [
      "Custom RAG Knowledge Base Integration",
      "24/7 Multilingual AI Support Agents",
      "Automated Support Ticket Resolution & Escalation",
      "Instant Hand-off to Human Customer Reps",
    ],
    techStack: ["Python", "LangChain", "OpenAI / Anthropic APIs", "Pinecone DB"],
    stats: [
      { label: "Ticket Auto-Resolve", value: "70%" },
      { label: "Support Cost", value: "-60%" },
      { label: "Availability", value: "24/7/365" },
    ]
  },
  {
    id: "supply-chain-logistics",
    title: "Supply Chain & Logistics Hub",
    category: "Logistics",
    badge: "Scalable",
    icon: Truck,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop",
    shortDescription: "Real-time fleet tracking, warehouse inventory automation, and order fulfillment.",
    fullDescription: "Gain complete end-to-end visibility into your supply chain. Track delivery vehicles in real-time, automate warehouse stock transfers, and eliminate order delays.",
    features: [
      "Live GPS Vehicle Tracking & Route Optimization",
      "Barcode & QR Warehouse Inventory Management",
      "Automated Freight & Courier API Integration",
      "Real-Time Proof of Delivery & Signature Capture",
    ],
    techStack: ["React Native", "Node.js", "Google Maps API", "PostgreSQL"],
    stats: [
      { label: "Delivery Speed", value: "+25%" },
      { label: "Route Cost", value: "-18%" },
      { label: "Fleet Visibility", value: "100%" },
    ]
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const SolutionsPage = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 relative overflow-x-hidden text-white bg-[#050505]">
      {/* Cosmic Background Effect */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CosmicBackground />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Header */}
        <section className="text-center max-w-4xl mx-auto pt-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-[#EFFC76]" />
            <span className="text-[#EFFC76] text-xs font-bold uppercase tracking-wider">
              JEVXO SOFTWARE ECOSYSTEM
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight"
          >
            6 Core Enterprise Solutions Built For <br />
            <span className="bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
              Maximum Scale & Performance
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-400 text-lg font-light leading-relaxed max-w-2xl mx-auto"
          >
            Production-grade software architectures engineered with modern tech stacks, high availability, and premium UI aesthetics.
          </motion.p>
        </section>

        {/* 6 Solutions Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {solutionsData.map((sol) => (
            <motion.div
              key={sol.id}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="group bg-[#0d0d10]/90 border border-white/10 rounded-3xl overflow-hidden hover:border-[#EFFC76]/50 transition-all duration-300 backdrop-blur-md flex flex-col justify-between hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)]"
            >
              <div>
                {/* Image Banner */}
                <div className="relative h-60 w-full overflow-hidden bg-gray-900">
                  <img
                    src={sol.image}
                    alt={sol.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-[11px] font-bold tracking-wider uppercase bg-[#EFFC76] text-black px-3 py-1 rounded-full shadow-md">
                      {sol.badge}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[#EFFC76] group-hover:bg-[#EFFC76] group-hover:text-black transition-colors duration-300">
                      <sol.icon size={22} />
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 font-medium block">
                        {sol.category}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#EFFC76] transition-colors">
                        {sol.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed font-light">
                    {sol.shortDescription}
                  </p>

                  <div className="space-y-2 pt-2 border-t border-white/5">
                    {sol.features.slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                        <CheckCircle2 size={14} className="text-[#EFFC76] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {sol.stats.slice(0, 2).map((s, idx) => (
                    <span key={idx} className="text-[11px] font-semibold bg-white/5 border border-white/10 px-2.5 py-1 rounded-md text-gray-300">
                      {s.label}: <strong className="text-[#EFFC76]">{s.value}</strong>
                    </span>
                  ))}
                </div>

                <Link
                  href={`/solutions/${sol.id}`}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-white group-hover:text-[#EFFC76] transition-colors"
                >
                  <span>Explore</span>
                  <div className="w-7 h-7 rounded-full bg-white/5 group-hover:bg-[#EFFC76] group-hover:text-black flex items-center justify-center transition-all">
                    <ArrowRight size={14} />
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SolutionsPage;
