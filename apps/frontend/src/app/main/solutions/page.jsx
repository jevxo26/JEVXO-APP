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
  Cpu,
  Server,
  Lock,
  ArrowUpRight,
} from "lucide-react";
import CosmicBackground from "@/components/Home/CosmicBackground";
import AppointmentModal from "@/components/Home/AppointmentModal";

export const solutionsData = [
  {
    id: "business-management",
    title: "Business Management & Enterprise ERP",
    category: "Enterprise ERP",
    badge: "Tier-1 Enterprise",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
    shortDescription: "All-in-one real-time ERP platform for financial ledger accounting, multi-warehouse stock sync, and multi-branch operations.",
    fullDescription: "Our Business Management & Enterprise ERP solution unifies core business operations—financial accounting, multi-warehouse stock tracking, regional branch ledgers, and automated team approval workflows—into a centralized, high-performance real-time dashboard built for scale.",
    features: [
      "Real-time Financial Analytics & Profit Ledger Reporting",
      "Automated Multi-Warehouse Inventory & POS Synchronization",
      "Multi-Branch & Multi-Currency Regional System Operations",
      "Granular Role-Based Access Control (RBAC) & Audit Logs",
    ],
    modules: ["Financial Ledger", "Multi-Warehouse POS", "Role-Based Audit", "Tax Compliance"],
    integrations: ["QuickBooks", "SAP", "Stripe", "Bank APIs", "Docker"],
    deployModels: ["SaaS Multi-Tenant Cloud", "Dedicated Private Cluster"],
    techStack: ["Next.js 14", "Node.js", "PostgreSQL", "Docker", "Redis"],
    stats: [
      { label: "Efficiency Boost", value: "45%" },
      { label: "Uptime SLA", value: "99.99%" },
      { label: "Deploy Time", value: "< 2 Wks" },
    ]
  },
  {
    id: "smart-crm",
    title: "Smart CRM & AI Sales Pipeline",
    category: "Sales & Marketing",
    badge: "High Growth",
    icon: Users,
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop",
    shortDescription: "Automated customer relationship management, visual deals pipeline managers, and AI intent lead scoring.",
    fullDescription: "Empower your sales and customer success teams with AI-powered lead tracking, automated email sequences, drag-and-drop deals pipeline managers, and deep customer behavioral analytics built for rapid revenue conversion.",
    features: [
      "Drag-and-Drop Interactive Deals & Pipeline Manager",
      "AI-Powered Lead Scoring & Intent Analytics",
      "Omnichannel WhatsApp & Email Sequence Automation",
      "Automated Sales Follow-ups & Team Task Reminders",
    ],
    modules: ["Deals Pipeline", "AI Lead Scoring", "WhatsApp Gateway", "Contact Matrix"],
    integrations: ["Salesforce", "WhatsApp Business", "HubSpot API", "Gmail", "Zapier"],
    deployModels: ["Cloud Managed SaaS", "API Integration Middleware"],
    techStack: ["React 18", "TypeScript", "Python", "MongoDB", "Tailwind"],
    stats: [
      { label: "Lead Conv. Rate", value: "+38%" },
      { label: "Response Speed", value: "Instant" },
      { label: "Team Adoption", value: "95%" },
    ]
  },
  {
    id: "hrms-payroll",
    title: "HRMS & Automated Global Payroll",
    category: "Human Resources",
    badge: "Core HR",
    icon: Briefcase,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop",
    shortDescription: "Comprehensive workforce management, digital onboarding, biometric attendance, and multi-currency payroll.",
    fullDescription: "Streamline global workforce management. From automated onboarding workflows and biometric attendance tracking to tax-compliant, multi-currency salary disbursements and employee self-service portals.",
    features: [
      "Automated Salary & Tax Disbursement Engine",
      "Leave & Biometric Attendance Tracking Portal",
      "Employee Self-Service Dashboard & Payslips",
      "Performance Appraisal & Goal Milestone Tracking",
    ],
    modules: ["Automated Payroll", "Biometric Clocking", "Tax Calculation", "Self-Service Portal"],
    integrations: ["Wise", "PayPal", "Bank Direct Deposit", "Slack", "AWS SES"],
    deployModels: ["Global Cloud SaaS", "Enterprise Hybrid Deployment"],
    techStack: ["Next.js", "NestJS", "PostgreSQL", "AWS SES", "Docker"],
    stats: [
      { label: "Payroll Speed", value: "10x Faster" },
      { label: "Disbursement Accuracy", value: "100%" },
      { label: "HR Time Saved", value: "120+ Hrs/Mo" },
    ]
  },
  {
    id: "ecommerce-engine",
    title: "Headless E-Commerce & SquadCart",
    category: "E-Commerce",
    badge: "Flagship SaaS",
    icon: ShoppingCart,
    image: "https://images.unsplash.com/photo-1556742049-0a670fc80028?w=800&auto=format&fit=crop",
    shortDescription: "High-conversion headless storefronts, multi-vendor marketplace engines, and sub-second checkout speeds.",
    fullDescription: "Architect lightning-fast digital storefronts. SquadCart delivers headless commerce capabilities with instant sub-second page loads, global multi-currency checkout, and real-time inventory management across all sales channels.",
    features: [
      "Headless Storefront & Sub-Second Page Load Benchmarks",
      "Multi-Vendor Marketplace & Seller Commission Hub",
      "One-Click Checkout & Local Payment Gateways",
      "Real-Time Stock Sync across Amazon, Storefront & POS",
    ],
    modules: ["Headless Storefront", "Multi-Vendor Hub", "Dynamic Checkout", "Inventory Sync"],
    integrations: ["Stripe", "PayPal", "Shopify POS", "Cloudflare", "ShipStation"],
    deployModels: ["Edge-Cached Headless Cloud", "Multi-Vendor SaaS Hub"],
    techStack: ["Next.js App Router", "Node.js", "Stripe API", "Redis", "Cloudflare"],
    stats: [
      { label: "Page Load Speed", value: "< 0.3s" },
      { label: "Conversion Uplift", value: "+40%" },
      { label: "Uptime SLA", value: "99.99%" },
    ]
  },
  {
    id: "ai-automation-chatbots",
    title: "AI Enterprise Agents & RAG Vector Engine",
    category: "AI & Innovation",
    badge: "Next-Gen AI",
    icon: Bot,
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop",
    shortDescription: "Custom LLM integrations, automated customer support agents, and RAG vector knowledge base search.",
    fullDescription: "Elevate customer support and internal operations with custom AI agents trained specifically on your enterprise knowledge base, docs, and customer interaction logs with sub-second response times.",
    features: [
      "Custom RAG Knowledge Base & Vector Database Search",
      "24/7 Multilingual AI Autonomous Support Agents",
      "Automated Support Ticket Resolution & Escalation Rules",
      "Instant Hand-off to Human Support Representatives",
    ],
    modules: ["RAG Vector Pipeline", "24/7 Support Agent", "Ticket Resolver", "Human Hand-off"],
    integrations: ["OpenAI API", "Pinecone DB", "Intercom", "Zendesk", "LangChain"],
    deployModels: ["Managed AI Cloud API", "Air-Gapped Private LLM"],
    techStack: ["Python", "LangChain", "OpenAI", "Pinecone DB", "React"],
    stats: [
      { label: "Ticket Auto-Resolve", value: "72%" },
      { label: "Support Cost", value: "-60%" },
      { label: "24/7 Availability", value: "100%" },
    ]
  },
  {
    id: "supply-chain-logistics",
    title: "Supply Chain & Fleet Control Hub",
    category: "Logistics",
    badge: "Fleet Scale",
    icon: Truck,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop",
    shortDescription: "Real-time GPS vehicle tracking, barcode warehouse automation, and automated dispatch engines.",
    fullDescription: "Gain complete end-to-end visibility into your supply chain. Track delivery fleets in real-time, automate warehouse stock transfers with QR scanning, and eliminate order fulfillment delays.",
    features: [
      "Live GPS Vehicle Telematics & Route Optimization",
      "Barcode & QR Warehouse Inventory Management",
      "Automated Freight & Courier API Integration",
      "Real-Time Proof of Delivery & Digital Signature",
    ],
    modules: ["Fleet Telematics", "QR Warehouse Sync", "Route Optimizer", "Digital Proof"],
    integrations: ["Google Maps API", "FedEx", "DHL", "Samsara", "PostgreSQL"],
    deployModels: ["Enterprise IoT Cloud", "On-Premise Fleet Server"],
    techStack: ["React Native", "Node.js", "Google Maps API", "PostgreSQL", "MQTT"],
    stats: [
      { label: "Delivery Speed", value: "+28%" },
      { label: "Route Cost", value: "-20%" },
      { label: "Fleet Visibility", value: "100%" },
    ]
  },
];

const categories = ["All Solutions", "Enterprise ERP", "Sales & Marketing", "Human Resources", "E-Commerce", "AI & Innovation", "Logistics"];

const SolutionsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Solutions");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredSolutions = selectedCategory === "All Solutions"
    ? solutionsData
    : solutionsData.filter((sol) => sol.category === selectedCategory);

  return (
    <>
      <div className="min-h-screen pt-28 pb-36 relative overflow-x-hidden text-white bg-[#050505] select-none">
        
        {/* Cosmic Background Effect */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <CosmicBackground />
        </div>

        {/* 10/12 Container Width */}
        <div className="w-10/12 mx-auto relative z-10 space-y-16">
          
          {/* Header Section */}
          <section className="text-center max-w-4xl mx-auto pt-6 relative z-20">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#EFFC76]/30 bg-[#EFFC76]/10 text-[#EFFC76] text-xs font-mono font-bold uppercase tracking-[0.25em] mb-6 shadow-[0_0_15px_rgba(239,252,118,0.2)]"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#EFFC76] animate-pulse" />
              ENTERPRISE SOFTWARE SUITE
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight uppercase"
            >
              Enterprise Software Built For{" "}
              <span className="font-serif italic font-normal text-[#EFFC76] lowercase block sm:inline">
                maximum scale
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7 }}
              className="mt-6 text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
            >
              Explore JEVXO's flagship enterprise software platforms engineered to automate workflows, accelerate revenue, and secure your digital assets.
            </motion.p>
          </section>

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-mono font-bold transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-[#EFFC76] text-black shadow-[0_0_20px_rgba(239,252,118,0.4)] scale-105"
                    : "bg-[#081808]/90 border border-[#EFFC76]/30 text-gray-300 hover:border-[#EFFC76] hover:text-[#EFFC76]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Enterprise Software Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredSolutions.map((sol, idx) => {
              const IconComponent = sol.icon;

              return (
                <motion.div
                  key={sol.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group bg-[#051105]/92 border border-[#EFFC76]/30 rounded-[32px] overflow-hidden hover:border-[#EFFC76] hover:shadow-[0_0_40px_rgba(239,252,118,0.3)] transition-all duration-500 backdrop-blur-2xl flex flex-col justify-between"
                >
                  <div>
                    {/* Software Image Showcase Banner */}
                    <div className="relative h-64 w-full overflow-hidden bg-[#081208]">
                      <img
                        src={sol.image}
                        alt={sol.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#051105] via-transparent to-transparent" />
                      
                      <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                        <span className="text-[10px] font-mono font-black tracking-widest uppercase bg-[#EFFC76] text-black px-3.5 py-1.5 rounded-full shadow-md">
                          {sol.badge}
                        </span>
                      </div>
                    </div>

                    {/* Software Details Content */}
                    <div className="p-7 sm:p-8 space-y-5">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-[#0b1d0b] border border-[#EFFC76]/40 flex items-center justify-center text-[#EFFC76] group-hover:bg-[#EFFC76] group-hover:text-black transition-all duration-500 shrink-0 shadow-md">
                          <IconComponent size={22} className="stroke-[2.2]" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono font-bold text-[#EFFC76] uppercase tracking-wider block">
                            {sol.category} PLATFORM
                          </span>
                          <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-[#EFFC76] transition-colors leading-tight">
                            {sol.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
                        {sol.shortDescription}
                      </p>

                      {/* Modules Chips */}
                      <div className="grid grid-cols-2 gap-2 pt-1">
                        {sol.modules.map((mod, i) => (
                          <div key={i} className="flex items-center gap-2 bg-[#081808] border border-[#EFFC76]/25 rounded-xl px-3 py-1.5 text-[11px] font-mono text-gray-200">
                            <CheckCircle2 size={13} className="text-[#EFFC76] shrink-0" />
                            <span className="truncate">{mod}</span>
                          </div>
                        ))}
                      </div>

                      {/* Integrations Row */}
                      <div className="pt-3 border-t border-[#EFFC76]/20 flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-gray-400 uppercase">Integrations:</span>
                        {sol.integrations.map((ing, i) => (
                          <span key={i} className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-[#EFFC76]/10 text-[#EFFC76] border border-[#EFFC76]/20">
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Footer */}
                  <div className="p-7 sm:p-8 pt-0 border-t border-[#EFFC76]/20 mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {sol.stats.slice(0, 2).map((s, idx) => (
                        <span key={idx} className="text-[10px] font-mono font-bold bg-[#081808] border border-[#EFFC76]/30 px-3 py-1 rounded-xl text-gray-200">
                          {s.label}: <strong className="text-[#EFFC76]">{s.value}</strong>
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/main/solutions/${sol.id}`}
                      className="inline-flex items-center gap-2 text-xs font-mono font-bold text-white group-hover:text-[#EFFC76] transition-colors"
                    >
                      <span>Explore Software</span>
                      <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#EFFC76] group-hover:text-black border border-white/15 group-hover:border-[#EFFC76] flex items-center justify-center transition-all shadow-md">
                        <ArrowUpRight size={15} className="stroke-[2.5]" />
                      </div>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Enterprise Trust & SLA Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-white/10">
            <div className="bg-[#051105]/92 border border-[#EFFC76]/25 rounded-2xl p-5 text-center backdrop-blur-xl">
              <ShieldCheck size={24} className="text-[#EFFC76] mx-auto mb-2" />
              <h4 className="text-xs font-mono font-extrabold text-white">SOC 2 Type II</h4>
              <p className="text-[10px] font-mono text-gray-400 mt-0.5">Certified Cloud Security</p>
            </div>

            <div className="bg-[#051105]/92 border border-[#EFFC76]/25 rounded-2xl p-5 text-center backdrop-blur-xl">
              <Zap size={24} className="text-[#EFFC76] mx-auto mb-2" />
              <h4 className="text-xs font-mono font-extrabold text-white">Sub-Second Speed</h4>
              <p className="text-[10px] font-mono text-gray-400 mt-0.5">Edge INP Benchmarks</p>
            </div>

            <div className="bg-[#051105]/92 border border-[#EFFC76]/25 rounded-2xl p-5 text-center backdrop-blur-xl">
              <Lock size={24} className="text-[#EFFC76] mx-auto mb-2" />
              <h4 className="text-xs font-mono font-extrabold text-white">PCI-DSS Level 1</h4>
              <p className="text-[10px] font-mono text-gray-400 mt-0.5">Bank-Grade Compliance</p>
            </div>

            <div className="bg-[#051105]/92 border border-[#EFFC76]/25 rounded-2xl p-5 text-center backdrop-blur-xl">
              <Server size={24} className="text-[#EFFC76] mx-auto mb-2" />
              <h4 className="text-xs font-mono font-extrabold text-white">99.99% SLA Uptime</h4>
              <p className="text-[10px] font-mono text-gray-400 mt-0.5">24/7 Dedicated Support</p>
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

export default SolutionsPage;
