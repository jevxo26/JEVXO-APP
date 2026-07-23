"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Globe2,
  CheckCircle2,
  Users,
  Building2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  Briefcase,
  Send,
  PhoneCall,
  MapPin,
  Mail,
  ChevronRight,
  Handshake,
  Award,
  X,
  UploadCloud,
} from "lucide-react";
import CosmicBackground from "@/components/Home/CosmicBackground";

// Active Country Sales Partner Roster
const partnerRoster = [
  {
    country: "Malaysia",
    flag: "🇲🇾",
    code: "MY",
    city: "Kuala Lumpur",
    partnerName: "Apex Digital Systems Sdn Bhd",
    contact: "+60 11-2187 8963",
    email: "malaysia.partner@jevxo.com",
    badge: "Regional Hub",
    activeClients: "25+ Enterprise Accounts",
  },
  {
    country: "United States",
    flag: "🇺🇸",
    code: "US",
    city: "Austin, Texas",
    partnerName: "Horizon Cloud Partners LLC",
    contact: "+1 (512) 890-3421",
    email: "us.partner@jevxo.com",
    badge: "North America Tier-1",
    activeClients: "40+ Enterprise Accounts",
  },
  {
    country: "United Kingdom",
    flag: "🇬🇧",
    code: "UK",
    city: "London",
    partnerName: "Thames Tech Solutions Ltd",
    contact: "+44 20 7946 0912",
    email: "uk.partner@jevxo.com",
    badge: "Europe Hub",
    activeClients: "18+ Enterprise Accounts",
  },
  {
    country: "Singapore",
    flag: "🇸🇬",
    code: "SG",
    city: "Marina Bay",
    partnerName: "Nexus Enterprise Solutions Pte",
    contact: "+65 6789 0123",
    email: "singapore.partner@jevxo.com",
    badge: "APAC Core",
    activeClients: "30+ Enterprise Accounts",
  },
  {
    country: "United Arab Emirates",
    flag: "🇦🇪",
    code: "AE",
    city: "Dubai Silicon Oasis",
    partnerName: "Crescent Tech Ventures FZ",
    contact: "+971 4 321 8900",
    email: "uae.partner@jevxo.com",
    badge: "MENA Region",
    activeClients: "22+ Enterprise Accounts",
  },
  {
    country: "Australia",
    flag: "🇦🇺",
    code: "AU",
    city: "Sydney, NSW",
    partnerName: "Pacific Rim Software Partners",
    contact: "+61 2 8011 4567",
    email: "australia.partner@jevxo.com",
    badge: "Oceania Core",
    activeClients: "15+ Enterprise Accounts",
  },
  {
    country: "Canada",
    flag: "🇨🇦",
    code: "CA",
    city: "Toronto, ON",
    partnerName: "Maplewood Technology Inc.",
    contact: "+1 (416) 555-0198",
    email: "canada.partner@jevxo.com",
    badge: "Americas Tier-1",
    activeClients: "12+ Enterprise Accounts",
  },
  {
    country: "Germany",
    flag: "🇩🇪",
    code: "DE",
    city: "Berlin",
    partnerName: "Vanguard Digital GmbH",
    contact: "+49 30 1234567",
    email: "germany.partner@jevxo.com",
    badge: "EU Central",
    activeClients: "14+ Enterprise Accounts",
  },
  {
    country: "Bangladesh",
    flag: "🇧🇩",
    code: "BD",
    city: "Dhaka",
    partnerName: "JEVXO Asia Operations & R&D Hub",
    contact: "+880 1836-815340",
    email: "bangladesh.partner@jevxo.com",
    badge: "Global R&D Base",
    activeClients: "50+ Enterprise Accounts",
  },
];

// Step-by-Step Onboarding Process
const onboardingSteps = [
  {
    step: "01",
    title: "Application Submission",
    description: "Submit your agency details, choose your target country, email address, and WhatsApp contact.",
  },
  {
    step: "02",
    title: "Territory Vetting & Contract",
    description: "JEVXO partnership directors review territory exclusivity and execute a commission contract.",
  },
  {
    step: "03",
    title: "Collateral & Training Enablement",
    description: "Receive product demo databases, marketing pitch decks, and dedicated pre-sales support channels.",
  },
  {
    step: "04",
    title: "Inbound Lead Routing & Revenue",
    description: "Receive regional client leads directly from JEVXO and secure up to 35% monthly recurring commission.",
  },
];

// Partner Benefits
const partnerBenefits = [
  {
    icon: DollarSign,
    title: "Up to 35% Recurring Payouts",
    description: "Generate consistent, high-yield recurring revenue streams for all active client software subscriptions.",
  },
  {
    icon: ShieldCheck,
    title: "Exclusive Regional Rights",
    description: "Get full territorial protection and direct lead routing for your designated country hub.",
  },
  {
    icon: Briefcase,
    title: "Technical Architect Backing",
    description: "Our core engineering team joins your client pitch calls to assist with solution architecture design.",
  },
  {
    icon: TrendingUp,
    title: "Co-Branded Marketing Materials",
    description: "Professional slides, localized document landing pages, and co-branded enterprise assets.",
  },
];

const CountrySalesPartnerPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    country: "",
    company: "",
    website: "",
    businessSize: "",
    salesFocus: "",
    logoFileName: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, logoFileName: e.target.files[0].name });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        whatsapp: "",
        country: "",
        company: "",
        website: "",
        businessSize: "",
        salesFocus: "",
        logoFileName: "",
        message: "",
      });
    }, 2500);
  };

  return (
    <div className="min-h-screen pt-28 pb-36 relative overflow-x-hidden text-white bg-[#050505]">
      {/* Background Cosmic Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CosmicBackground />
      </div>

      <div className="relative z-10 w-10/12 mx-auto space-y-20 md:space-y-28">
        
        {/* ================= HERO INTRO ================= */}
        <section className="text-center max-w-4xl mx-auto pt-6 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-wider text-[#EFFC76] mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#EFFC76] animate-pulse" />
            Global Sales Franchise
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-6xl font-medium text-white tracking-tight"
          >
            Become A JEVXO{" "}
            <span className="font-serif italic text-[#EFFC76]">
              Country Sales Partner
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto font-light"
          >
            Review our onboarding milestones, unlock exclusive regional benefits, and apply today to join our global enterprise sales roster.
          </motion.p>
        </section>

        {/* ================= SECTION 1: HOW TO JOIN & BENEFITS ================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Onboarding Steps */}
          <div className="lg:col-span-6 space-y-8">
            <div className="flex items-center gap-2 text-xs text-[#EFFC76] font-bold uppercase tracking-wider">
              <Sparkles size={14} />
              <span>Step-by-Step Onboarding</span>
            </div>

            <div className="space-y-6">
              {onboardingSteps.map((step) => (
                <div
                  key={step.step}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all backdrop-blur-sm"
                >
                  <div className="text-2xl font-extrabold text-[#EFFC76] bg-white/5 border border-white/10 rounded-xl w-12 h-12 flex items-center justify-center shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base mb-1">{step.title}</h4>
                    <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exclusive Partner Benefits */}
          <div className="lg:col-span-6 space-y-8">
            <div className="flex items-center gap-2 text-xs text-[#EFFC76] font-bold uppercase tracking-wider">
              <Award size={14} />
              <span>Exclusive Partner Benefits</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {partnerBenefits.map((b) => (
                <div
                  key={b.title}
                  className="p-5 rounded-2xl bg-[#0c0c0e]/80 border border-white/10 hover:border-[#EFFC76]/40 transition-all backdrop-blur-md group"
                >
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#EFFC76] w-fit mb-4 group-hover:bg-[#EFFC76] group-hover:text-black transition-colors">
                    <b.icon size={20} />
                  </div>
                  <h4 className="text-white font-bold text-sm mb-2">{b.title}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed font-light">{b.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= SECTION 2: ACTIVE COUNTRY ROSTER ================= */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#EFFC76] uppercase tracking-widest bg-white/5 border border-white/10 px-3.5 py-1 rounded-full">
              GLOBAL ROSTER
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Our Active Sales Partner Countries
            </h2>
            <p className="text-gray-400 text-sm font-light">
              Connect with our official regional agencies or authorized local representatives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerRoster.map((partner, idx) => (
              <motion.div
                key={partner.country}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-[#0d0d10]/95 border border-white/10 rounded-2xl p-5 hover:border-[#EFFC76]/50 transition-all backdrop-blur-md flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{partner.flag}</span>
                      <div>
                        <h3 className="text-base font-bold text-white group-hover:text-[#EFFC76] transition-colors">
                          {partner.country}
                        </h3>
                        <span className="text-xs text-gray-400 flex items-center gap-1 font-light">
                          <MapPin size={11} className="text-[#EFFC76]" />
                          {partner.city}
                        </span>
                      </div>
                    </div>
                    <span className="text-[9px] font-bold uppercase bg-white/5 text-gray-300 border border-white/10 px-2 py-0.5 rounded-full">
                      {partner.badge}
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-xs text-white font-semibold mb-3">
                    {partner.partnerName}
                  </div>

                  <div className="space-y-1.5 text-xs text-gray-300">
                    <div className="flex items-center gap-2">
                      <PhoneCall size={12} className="text-[#EFFC76] shrink-0" />
                      <span>{partner.contact}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={12} className="text-[#EFFC76] shrink-0" />
                      <span className="truncate">{partner.email}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-gray-500">
                  <span>{partner.activeClients}</span>
                  <div className="w-5 h-5 rounded-full bg-white/5 group-hover:bg-[#EFFC76] group-hover:text-black flex items-center justify-center transition-all">
                    <ChevronRight size={12} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= SECTION 3: CALL TO ACTION ================= */}
        <section className="bg-gradient-to-r from-indigo-950/20 via-[#0d0d10] to-purple-950/20 border border-white/10 rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-40 bg-[#EFFC76]/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="text-xs uppercase font-bold tracking-widest text-[#EFFC76] bg-[#EFFC76]/10 border border-[#EFFC76]/20 px-4 py-1.5 rounded-full inline-block">
              PARTNER NETWORK
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
              Ready to Establish Franchise Exclusivity in Your Country?
            </h2>
            <p className="text-gray-300 text-sm sm:text-base font-light">
              Click below to launch the Partner Registration request. Submit your target territory, email, and WhatsApp contact number to start.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-3 bg-[#EFFC76] text-black font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-full hover:bg-[#EFFC76]/90 transition-all shadow-[0_10px_30px_rgba(239,252,118,0.2)]"
              >
                <span>Apply Now (Launch Application)</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* ================= REGISTRATION MODAL WINDOW ================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto pt-10 pb-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-lg bg-[#0d0d10] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_30px_70px_rgba(0,0,0,0.9)] z-10 overflow-hidden my-auto"
            >
              <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-[#EFFC76]" />

              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>

              <div className="mb-5 space-y-1 text-center">
                <h3 className="text-xl font-bold text-white flex items-center justify-center gap-2">
                  <Handshake className="text-[#EFFC76]" size={20} />
                  <span>Sales Partner Application</span>
                </h3>
                <p className="text-xs text-gray-400 font-light">
                  Submit your details to secure regional partner status.
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
                  <h4 className="text-lg font-bold text-white">Application Received!</h4>
                  <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
                    Our team will contact you via WhatsApp and email to schedule your onboarding.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5 max-h-[75vh] overflow-y-auto pr-1">
                  
                  {/* File Upload for Partner Logo */}
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">
                      Partner Agency Logo / Profile Photo *
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="flex flex-col items-center justify-center px-4 py-3 bg-white/5 border border-dashed border-white/20 rounded-xl cursor-pointer hover:border-[#EFFC76]/50 transition-colors w-full">
                        <div className="flex items-center gap-2 text-xs text-gray-300 font-medium">
                          <UploadCloud size={16} className="text-[#EFFC76]" />
                          <span>{formData.logoFileName ? formData.logoFileName : "Select Logo File"}</span>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                          required={!formData.logoFileName}
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alexander West"
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
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="email@partnerfirm.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#EFFC76] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">
                        WhatsApp Number *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.whatsapp}
                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                        placeholder="e.g. +60 11-2187 8963"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#EFFC76] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">
                        Country Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        placeholder="e.g. Malaysia"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#EFFC76] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">
                        Agency Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Nexus Tech"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#EFFC76] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">
                        Business Size *
                      </label>
                      <select
                        required
                        value={formData.businessSize}
                        onChange={(e) => setFormData({ ...formData, businessSize: e.target.value })}
                        className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#EFFC76] transition-colors"
                      >
                        <option value="">Select Size</option>
                        <option value="1-10">1-10 Employees</option>
                        <option value="11-50">11-50 Employees</option>
                        <option value="50+">50+ Employees</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">
                        Primary Sales Focus *
                      </label>
                      <select
                        required
                        value={formData.salesFocus}
                        onChange={(e) => setFormData({ ...formData, salesFocus: e.target.value })}
                        className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#EFFC76] transition-colors"
                      >
                        <option value="">Select Focus</option>
                        <option value="erp">ERP & Custom Software</option>
                        <option value="crm">CRM & Marketing Automation</option>
                        <option value="ai">AI Solutions & Chatbots</option>
                        <option value="multi">All Categories</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">
                      Website URL
                    </label>
                    <input
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="https://yourwebsite.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#EFFC76] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">
                      Brief Message
                    </label>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us briefly about your current enterprise sales network..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#EFFC76] transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#EFFC76] text-black font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl hover:bg-[#EFFC76]/90 transition-all shadow-[0_5px_15px_rgba(239,252,118,0.2)] mt-2"
                  >
                    <span>Submit Application</span>
                    <Send size={12} />
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

export default CountrySalesPartnerPage;
