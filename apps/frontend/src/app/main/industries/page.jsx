"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Building2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  HeartPulse,
  ShoppingCart,
  Truck,
  Building,
  Landmark,
  CheckCircle2,
  Layers,
  Lock,
  Globe2,
  ChevronRight,
  Send,
  X,
} from "lucide-react";
import CosmicBackground from "@/components/Home/CosmicBackground";

const industryList = [
  {
    id: "fintech",
    icon: CreditCard,
    title: "FinTech & Digital Banking",
    tagline: "PCI-DSS Compliant Payment Gateways & AI Fraud Detection",
    description:
      "Enterprise core banking platforms, automated ledger systems, micro-lending portals, and real-time transaction processing networks built with sub-millisecond execution.",
    compliance: ["PCI-DSS Level 1", "ISO 27001", "SOC 2 Type II", "KYC / AML AI"],
    features: [
      "Real-time Core Banking & Ledger APIs",
      "AI Fraud Scoring & Anomaly Detection",
      "Automated Merchant Payout Engines",
      "Multi-Currency Wallet Architecture",
    ],
    stats: "99.999% Financial Uptime",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&auto=format&fit=crop",
  },
  {
    id: "healthcare",
    icon: HeartPulse,
    title: "Healthcare & MedTech Systems",
    tagline: "HIPAA Compliant EHR, Telemedicine & AI Diagnostics",
    description:
      "Secure patient management ecosystems, telemedicine video consultations, AI-powered diagnostic image routing, and HL7/FHIR compliant electronic health records.",
    compliance: ["HIPAA Certified", "GDPR Health", "FHIR Interoperability", "AES-256 Encryption"],
    features: [
      "Encrypted Telemedicine Video Portals",
      "Automated Lab & Hospital Billing Workflow",
      "AI Patient Triage & Appointment Scheduling",
      "HL7 / FHIR Medical Records Sync",
    ],
    stats: "20M+ Patient Records Managed",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop",
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    title: "E-Commerce & SquadCart Engine",
    tagline: "Headless Omnichannel Storefronts & Multi-Vendor Hubs",
    description:
      "High-scale headless storefronts, multi-vendor marketplaces, dynamic pricing algorithms, and real-time inventory synchronization across global fulfillment centers.",
    compliance: ["PCI Compliance", "Fast CDN edge", "Zero Downtime Deploy"],
    features: [
      "Headless React & Next.js Storefronts",
      "Sub-Second Page Load Speed (INP Optimized)",
      "Multi-Vendor Marketplace & Commission Split",
      "Automated POS & Inventory Sync",
    ],
    stats: "5.4M Daily Transactions Processed",
    image: "https://images.unsplash.com/photo-1556742049-0a670fc80028?w=600&auto=format&fit=crop",
  },
  {
    id: "logistics",
    icon: Truck,
    title: "Supply Chain & Fleet Telematics",
    tagline: "IoT Telemetry, Route Optimization & Automated Dispatch",
    description:
      "End-to-end supply chain visibility, GPS fleet tracking, automated warehouse inventory control, and predictive maintenance schedules.",
    compliance: ["ISO 9001", "Real-Time Telemetry", "Geofencing APIs"],
    features: [
      "Real-Time GPS Fleet Tracking & Geofencing",
      "AI Route & Fuel Optimization Engines",
      "Automated Warehouse Dispatch & QR Scanning",
      "Cold-Chain Temperature Monitoring",
    ],
    stats: "1.2M Fleet Vehicles Managed",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop",
  },
  {
    id: "realestate",
    icon: Building,
    title: "PropTech & Property Management",
    tagline: "Automated Lease Contracts, Tenant Portals & IoT Smart Buildings",
    description:
      "Enterprise real estate platforms, automated rent collection gateways, digital e-signature lease execution, and IoT smart building maintenance ticketing.",
    compliance: ["Digital E-Sign Act", "Automated Billing", "Bank API Sync"],
    features: [
      "Tenant & Landlord Digital Portals",
      "Automated Monthly Rent Invoicing",
      "Smart Maintenance Ticketing & Dispatch",
      "Property Valuation & Analytics Dashboards",
    ],
    stats: "350k+ Residential Units Managed",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&auto=format&fit=crop",
  },
  {
    id: "publicsector",
    icon: Landmark,
    title: "Government & Sovereign Cloud",
    tagline: "Air-Gapped Infrastructure, High-Security Public Portals & Audit Trail",
    description:
      "Mission-critical government portals, citizen service automation, air-gapped sovereign cloud deployments, and strict RBAC audit tracking.",
    compliance: ["GovCloud Sovereign", "ISO 27001", "NIST Framework", "GDPR compliant"],
    features: [
      "Air-Gapped Sovereign Cloud Deployment",
      "Encrypted Citizen Identity & Service Portals",
      "Tamper-Proof Audit Logging & RBAC",
      "Inter-Agency Automated Data Exchange",
    ],
    stats: "100% Sovereign Data Isolation",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=600&auto=format&fit=crop",
  },
];

const IndustriesPage = () => {
  const [activeTab, setActiveTab] = useState("fintech");
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [selectedIndustryForForm, setSelectedIndustryForForm] = useState("FinTech & Digital Banking");
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    industry: "FinTech & Digital Banking",
    projectScope: "",
  });

  const currentIndustry = industryList.find((item) => item.id === activeTab);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setIsConsultModalOpen(false);
      setSubmitted(false);
      setForm({ name: "", email: "", company: "", industry: "FinTech & Digital Banking", projectScope: "" });
    }, 2500);
  };

  return (
    <div className="min-h-screen pt-28 pb-24 relative overflow-x-hidden text-white bg-[#050505]">
      {/* Background Cosmic Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CosmicBackground />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 space-y-20 md:space-y-28">
        {/* ================= HERO SECTION ================= */}
        <section className="text-center max-w-4xl mx-auto pt-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md"
          >
            <Building2 className="w-4 h-4 text-[#EFFC76]" />
            <span className="text-[#EFFC76] text-xs font-bold uppercase tracking-wider">
              Industry Vertical Architectures
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            Tailored Enterprise Solutions for <br />
            <span className="bg-gradient-to-r from-white via-gray-200 to-[#EFFC76] bg-clip-text text-transparent">
              Global Industry Leaders
            </span>
          </h1>

          <p className="text-gray-400 text-lg font-light leading-relaxed max-w-2xl mx-auto">
            From PCI-DSS FinTech platforms to HIPAA MedTech clouds, JEVXO engineers battle-tested software systems compliance-ready for your sector.
          </p>
        </section>

        {/* ================= INTERACTIVE INDUSTRY NAVIGATOR ================= */}
        <section className="space-y-12">
          {/* Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {industryList.map((ind) => {
              const Icon = ind.icon;
              const isActive = activeTab === ind.id;
              return (
                <button
                  key={ind.id}
                  onClick={() => setActiveTab(ind.id)}
                  className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2.5 text-center group ${
                    isActive
                      ? "bg-[#EFFC76] text-black border-[#EFFC76] shadow-[0_10px_25px_rgba(239,252,118,0.25)] font-bold"
                      : "bg-[#0c0c0e]/90 text-gray-300 border-white/10 hover:border-white/20 hover:text-white"
                  }`}
                >
                  <Icon size={22} className={isActive ? "text-black" : "text-[#EFFC76] group-hover:scale-110 transition-transform"} />
                  <span className="text-xs font-semibold leading-tight">{ind.title.split("&")[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Active Industry Showcase Card */}
          {currentIndustry && (
            <motion.div
              key={currentIndustry.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0b0b0e]/95 border border-white/15 rounded-3xl p-8 lg:p-12 backdrop-blur-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.8)]"
            >
              <div className="absolute top-0 right-0 w-96 h-48 bg-[#EFFC76]/5 rounded-full blur-[90px] pointer-events-none" />

              {/* Details Column */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-[#EFFC76]/10 border border-[#EFFC76]/30 text-[#EFFC76]">
                    <currentIndustry.icon size={26} />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      {currentIndustry.title}
                    </h2>
                    <p className="text-xs font-semibold text-[#EFFC76] uppercase tracking-wider mt-0.5">
                      {currentIndustry.tagline}
                    </p>
                  </div>
                </div>

                <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
                  {currentIndustry.description}
                </p>

                {/* Features List */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    Core Architectural Capabilities
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentIndustry.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-2 text-xs text-gray-200">
                        <CheckCircle2 size={15} className="text-[#EFFC76] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Compliance Badges */}
                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-3">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    Certifications:
                  </span>
                  {currentIndustry.compliance.map((c) => (
                    <span
                      key={c}
                      className="text-[10px] font-extrabold uppercase bg-white/5 border border-white/10 text-[#EFFC76] px-3 py-1 rounded-full"
                    >
                      {c}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <div className="pt-4 flex items-center gap-4">
                  <button
                    onClick={() => {
                      setSelectedIndustryForForm(currentIndustry.title);
                      setForm({ ...form, industry: currentIndustry.title });
                      setIsConsultModalOpen(true);
                    }}
                    className="inline-flex items-center gap-2 bg-[#EFFC76] text-black font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full hover:bg-[#EFFC76]/90 transition-all shadow-[0_10px_25px_rgba(239,252,118,0.2)]"
                  >
                    <span>Request {currentIndustry.title.split("&")[0]} Blueprint</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>

              {/* Image & Stats Column */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-video lg:aspect-square shadow-2xl group">
                  <img
                    src={currentIndustry.image}
                    alt={currentIndustry.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Verified Scale</div>
                      <div className="text-white font-bold text-sm text-[#EFFC76]">{currentIndustry.stats}</div>
                    </div>
                    <ShieldCheck size={24} className="text-[#EFFC76]" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </section>
      </div>

      {/* ================= REQUEST PROPOSAL MODAL ================= */}
      <AnimatePresence>
        {isConsultModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto pt-10 pb-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsConsultModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-lg bg-[#0d0d10] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_30px_70px_rgba(0,0,0,0.9)] z-10 overflow-hidden my-auto"
            >
              <button
                onClick={() => setIsConsultModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>

              <div className="mb-5 space-y-1 text-center">
                <h3 className="text-xl font-bold text-white flex items-center justify-center gap-2">
                  <Building2 className="text-[#EFFC76]" size={20} />
                  <span>Request Industry Architecture Blueprint</span>
                </h3>
                <p className="text-xs text-gray-400 font-light">
                  Tailored software proposal for {selectedIndustryForForm}
                </p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-[#EFFC76] text-black flex items-center justify-center mx-auto animate-pulse">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-white">Proposal Request Sent!</h4>
                  <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
                    Our lead solution architect will email your custom industry technical proposal within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. David Vance"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#EFFC76] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">
                        Business Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="david@company.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#EFFC76] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.company}
                        onChange={(e) => setForm({ ...form, company: e.target.value })}
                        placeholder="e.g. Apex Global"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#EFFC76] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">
                      Project Scope & Requirements
                    </label>
                    <textarea
                      rows={3}
                      value={form.projectScope}
                      onChange={(e) => setForm({ ...form, projectScope: e.target.value })}
                      placeholder="Briefly describe your required software scale and integrations..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#EFFC76] transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#EFFC76] text-black font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl hover:bg-[#EFFC76]/90 transition-all shadow-[0_5px_15px_rgba(239,252,118,0.2)] mt-2"
                  >
                    <span>Request Proposal</span>
                    <Send size={14} />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default IndustriesPage;
