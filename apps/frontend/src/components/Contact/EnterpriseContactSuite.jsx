"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Copy, 
  Check, 
  Send,
  Zap,
  Globe,
  ShieldCheck,
  Code2,
  Cpu,
  Layers,
  Lock,
  FileText,
  Users,
  Building2,
  ChevronRight,
  Plus,
  Minus
} from "lucide-react";
import SmoothButton from "@/Share/SmoothButton";

const EnterpriseContactSuite = () => {
  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    designation: "",
    companyName: "",
    country: "",
    companyType: "",
    message: "",
    serviceType: "Custom Software",
    budgetRange: "$15k - $50k",
    timeline: "Accelerated (4-8 Weeks)",
    ndaRequired: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);

  const servicesList = [
    { id: "custom-software", title: "Custom Enterprise Software", icon: Code2, desc: "High-scale custom web & backend systems." },
    { id: "saas-platform", title: "SaaS Product Development", icon: Layers, desc: "Turnkey multi-tenant cloud platforms." },
    { id: "ai-automation", title: "AI & RAG LLM Workflows", icon: Cpu, desc: "Autonomous AI agents & custom models." },
    { id: "cloud-devops", title: "Cloud & DevOps Architecture", icon: Zap, desc: "Kubernetes, AWS/GCP, microservices." },
    { id: "mobile-app", title: "Cross-Platform Mobile Ecosystems", icon: Globe, desc: "iOS/Android apps with offline sync." },
    { id: "security-audit", title: "Cybersecurity & Code Audit", icon: ShieldCheck, desc: "Vulnerability analysis & SOC2 prep." },
  ];

  const budgetOptions = [
    "< $10k (MVP)",
    "$10k - $25k (Standard)",
    "$25k - $50k (Enterprise)",
    "$50k+ (Custom Scale)"
  ];

  const timelineOptions = [
    "Rapid Prototype (2-4 Weeks)",
    "Accelerated (4-8 Weeks)",
    "Enterprise Full Build (2-4 Months)",
    "Dedicated Engineering Squad"
  ];

  const statsList = [
    { label: "Response SLA", value: "< 15 Mins", detail: "24/7 Global Desk" },
    { label: "IP Ownership", value: "100% Transfer", detail: "Full Code Rights" },
    { label: "Security Protocol", value: "Bank-Grade", detail: "Strict NDA & SOC2" },
    { label: "Delivery Record", value: "99.8% On-Time", detail: "Sprint Demo Driven" },
  ];

  const faqs = [
    {
      question: "How quickly can JEVXO onboard and start development?",
      answer: "Following our initial discovery call and requirements lock, we can deploy a dedicated engineering squad or begin Sprint 0 within 3 to 5 business days."
    },
    {
      question: "Who owns the source code and Intellectual Property (IP)?",
      answer: "You retain 100% full ownership of all source code, architecture designs, database schemas, and intellectual property. IP transfer is explicitly guaranteed in our contracts."
    },
    {
      question: "What is your project estimation and billing methodology?",
      answer: "We offer both Milestone-Based Fixed Pricing for well-defined scopes and Dedicated Team Retainers (Time & Material) for evolving agile products."
    },
    {
      question: "Can we execute an NDA prior to sharing project details?",
      answer: "Yes, absolutely. You can download or request our standard mutual NDA, or we can sign your company's custom NDA before reviewing any proprietary specs."
    },
    {
      question: "How do you ensure code quality, security, and scalability?",
      answer: "Every codebase undergoes automated CI/CD unit testing, static code analysis, vulnerability scanning, and peer code reviews before staging deployment."
    }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("contact@jevxo.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission (ready for future backend API hookup)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 6000);
    }, 1200);
  };

  return (
    <div className="w-11/12 md:max-w-[1280px] mx-auto pt-28 pb-20 relative text-white">
      
      {/* 1. HERO SECTION */}
      <div className="text-center mb-16 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#EFFC76]/30 bg-[#EFFC76]/10 text-xs font-bold uppercase tracking-wider text-[#EFFC76] mb-6 shadow-[0_0_20px_rgba(239,252,118,0.2)]"
        >
          <div className="w-2 h-2 rounded-full bg-[#EFFC76] animate-pulse" />
          24/7 Global Software Engineering Desk
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-tight max-w-5xl mx-auto"
        >
          Build Next-Gen Software With{" "}
          <span className="font-serif italic text-[#EFFC76]">
            Enterprise Architects
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-6 text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
        >
          From complex enterprise SaaS to custom AI workflows and mobile platforms—partner with JEVXO to transform vision into high-scale code.
        </motion.p>

        {/* Action Quick Chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-8"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300">
            <Lock size={14} className="text-[#EFFC76]" />
            <span>Strict NDA Guarantee</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300">
            <Clock size={14} className="text-[#EFFC76]" />
            <span>15-Min Response SLA</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-300">
            <CheckCircle2 size={14} className="text-[#EFFC76]" />
            <span>100% IP Code Transfer</span>
          </div>
        </motion.div>

        {/* Ambient Top Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[280px] bg-[#EFFC76]/15 blur-[130px] pointer-events-none -z-10" />
      </div>

      {/* 2. STATS & SECURITY METRICS BAR */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 relative z-10">
        {statsList.map((st, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="p-5 rounded-2xl border border-white/10 bg-[#0a0a0e]/90 backdrop-blur-xl text-center relative overflow-hidden group hover:border-[#EFFC76]/40 transition-all duration-300 shadow-lg"
          >
            <div className="text-2xl md:text-3xl font-extrabold text-[#EFFC76] mb-1">{st.value}</div>
            <div className="text-white text-xs font-bold uppercase tracking-wider">{st.label}</div>
            <div className="text-gray-400 text-[11px] font-light mt-0.5">{st.detail}</div>
          </motion.div>
        ))}
      </div>

      {/* 3. DIRECT CONTACT CHANNELS (3-Column Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 relative z-10">
        {/* Email Card */}
        <div className="p-6 rounded-2xl border border-white/10 bg-[#0c0c10]/90 backdrop-blur-xl relative overflow-hidden group hover:border-[#EFFC76]/40 transition-all duration-300 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#EFFC76]">
              <Mail size={22} />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#EFFC76]/10 text-[#EFFC76] border border-[#EFFC76]/20">
              Technical Desk
            </span>
          </div>
          <h3 className="text-white text-base font-bold mb-1">Direct Engineering Mail</h3>
          <p className="text-gray-400 text-xs font-light mb-4">Send your RFPs, specs, or architecture documents.</p>
          
          <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5">
            <span className="text-white text-xs font-semibold select-all truncate">contact@jevxo.com</span>
            <button
              onClick={handleCopyEmail}
              className="text-gray-400 hover:text-[#EFFC76] transition-colors p-1"
              title="Copy Email"
            >
              {copiedEmail ? <Check size={16} className="text-[#EFFC76]" /> : <Copy size={16} />}
            </button>
          </div>
        </div>

        {/* WhatsApp & Hotline Card */}
        <div className="p-6 rounded-2xl border border-white/10 bg-[#0c0c10]/90 backdrop-blur-xl relative overflow-hidden group hover:border-[#EFFC76]/40 transition-all duration-300 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#EFFC76]">
              <Phone size={22} />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Advisor
            </span>
          </div>
          <h3 className="text-white text-base font-bold mb-1">Global Phone & WhatsApp</h3>
          <p className="text-gray-400 text-xs font-light mb-4">Connect with a principal solution architect instantly.</p>
          
          <a
            href="https://wa.me/8801886500056"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between bg-[#EFFC76]/10 border border-[#EFFC76]/30 hover:bg-[#EFFC76] hover:text-black transition-all rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#EFFC76] group/wa"
          >
            <span>+880 1886-500056</span>
            <ArrowRight size={15} className="group-hover/wa:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Innovation Hub HQ Card */}
        <div className="p-6 rounded-2xl border border-white/10 bg-[#0c0c10]/90 backdrop-blur-xl relative overflow-hidden group hover:border-[#EFFC76]/40 transition-all duration-300 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#EFFC76]">
              <Building2 size={22} />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/10 text-gray-300 border border-white/10">
              HQ Center
            </span>
          </div>
          <h3 className="text-white text-base font-bold mb-1">Global HQ & Tech Hub</h3>
          <p className="text-gray-400 text-xs font-light mb-4">Dhaka, Bangladesh — Operational Worldwide.</p>
          
          <div className="flex items-center gap-2 text-xs font-medium text-gray-300 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5">
            <Globe size={14} className="text-[#EFFC76]" />
            <span>Mon - Sat: 9:00 AM - 10:00 PM EST</span>
          </div>
        </div>
      </div>

      {/* 4. MAIN PROJECT DISCOVERY FORM CARD */}
      <div className="relative z-10 mb-20">
        <div className="absolute inset-0 bg-[#EFFC76]/10 blur-[90px] rounded-[2.5rem] pointer-events-none" />

        <div className="relative bg-[#07070a]/95 border border-white/15 rounded-[2rem] p-8 md:p-12 lg:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.9)] overflow-hidden">
          
          {/* Top Line Accent */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#EFFC76] to-transparent opacity-80" />

          {/* Form Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-8 mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#EFFC76] text-xs font-bold uppercase tracking-wider bg-[#EFFC76]/10 px-3 py-1 rounded-full border border-[#EFFC76]/20">
                  Sprint Discovery
                </span>
                <span className="text-gray-400 text-xs font-light">Free Architecture Estimate</span>
              </div>
              <h2 className="text-white text-2xl md:text-4xl font-bold tracking-tight">Enterprise Project Specification</h2>
              <p className="text-gray-400 text-sm font-light mt-1">Select your service parameters and details to receive a tailored engineering proposal.</p>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-gray-300 bg-white/5 border border-white/10 px-4 py-2 rounded-xl shrink-0">
              <ShieldCheck size={16} className="text-[#EFFC76]" />
              <span>Encrypted Submission</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            
            {/* Step 1: Select Service Architecture */}
            <div>
              <label className="block text-gray-300 text-xs font-bold uppercase tracking-wider mb-3">
                1. Select Service Category
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {servicesList.map((srv) => {
                  const Icon = srv.icon;
                  const isSelected = formData.serviceType === srv.title;
                  return (
                    <div
                      key={srv.id}
                      onClick={() => setFormData((prev) => ({ ...prev, serviceType: srv.title }))}
                      className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 flex items-start gap-3.5 ${
                        isSelected
                          ? "bg-[#EFFC76]/10 border-[#EFFC76] shadow-[0_0_20px_rgba(239,252,118,0.15)]"
                          : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
                      }`}
                    >
                      <div className={`p-2.5 rounded-lg shrink-0 ${isSelected ? "bg-[#EFFC76] text-black" : "bg-white/5 text-gray-400"}`}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <div className={`text-sm font-bold ${isSelected ? "text-[#EFFC76]" : "text-white"}`}>
                          {srv.title}
                        </div>
                        <div className="text-gray-400 text-[11px] font-light leading-snug mt-0.5">
                          {srv.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Budget & Timeline Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Budget */}
              <div>
                <label className="block text-gray-300 text-xs font-bold uppercase tracking-wider mb-3">
                  2. Project Budget Bracket
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {budgetOptions.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, budgetRange: b }))}
                      className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left truncate ${
                        formData.budgetRange === b
                          ? "bg-[#EFFC76] text-black border-[#EFFC76] font-bold shadow-[0_0_15px_rgba(239,252,118,0.3)]"
                          : "bg-white/5 border-white/10 text-gray-300 hover:border-white/20 hover:bg-white/10"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <label className="block text-gray-300 text-xs font-bold uppercase tracking-wider mb-3">
                  3. Target Launch Timeline
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {timelineOptions.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, timeline: t }))}
                      className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all border text-left truncate ${
                        formData.timeline === t
                          ? "bg-[#EFFC76] text-black border-[#EFFC76] font-bold shadow-[0_0_15px_rgba(239,252,118,0.3)]"
                          : "bg-white/5 border-white/10 text-gray-300 hover:border-white/20 hover:bg-white/10"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3: Contact & Company Details */}
            <div className="pt-6 border-t border-white/10 space-y-6">
              <div className="text-gray-300 text-xs font-bold uppercase tracking-wider">
                4. Contact & Organization Details
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div className="space-y-2">
                  <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider ml-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="e.g. Alexander"
                    required
                    className="w-full bg-[#0d0d12] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#EFFC76] focus:ring-1 focus:ring-[#EFFC76]/50 transition-all text-sm"
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider ml-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="e.g. Vance"
                    required
                    className="w-full bg-[#0d0d12] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#EFFC76] focus:ring-1 focus:ring-[#EFFC76]/50 transition-all text-sm"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider ml-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alexander@company.com"
                    required
                    className="w-full bg-[#0d0d12] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#EFFC76] focus:ring-1 focus:ring-[#EFFC76]/50 transition-all text-sm"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider ml-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    required
                    className="w-full bg-[#0d0d12] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#EFFC76] focus:ring-1 focus:ring-[#EFFC76]/50 transition-all text-sm"
                  />
                </div>

                {/* Designation */}
                <div className="space-y-2">
                  <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider ml-1">
                    Designation / Role *
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    placeholder="e.g. CTO, VP of Tech, Founder"
                    required
                    className="w-full bg-[#0d0d12] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#EFFC76] focus:ring-1 focus:ring-[#EFFC76]/50 transition-all text-sm"
                  />
                </div>

                {/* Company Name */}
                <div className="space-y-2">
                  <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider ml-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Acme Technologies Inc."
                    required
                    className="w-full bg-[#0d0d12] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#EFFC76] focus:ring-1 focus:ring-[#EFFC76]/50 transition-all text-sm"
                  />
                </div>

                {/* Country */}
                <div className="space-y-2">
                  <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider ml-1">
                    Country *
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="e.g. United States, UK, Bangladesh"
                    required
                    className="w-full bg-[#0d0d12] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#EFFC76] focus:ring-1 focus:ring-[#EFFC76]/50 transition-all text-sm"
                  />
                </div>

                {/* Industry */}
                <div className="space-y-2">
                  <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider ml-1">
                    Industry Sector *
                  </label>
                  <input
                    type="text"
                    name="companyType"
                    value={formData.companyType}
                    onChange={handleChange}
                    placeholder="e.g. Fintech, SaaS, Logistics, Healthtech"
                    required
                    className="w-full bg-[#0d0d12] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#EFFC76] focus:ring-1 focus:ring-[#EFFC76]/50 transition-all text-sm"
                  />
                </div>

                {/* Project Details */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider ml-1">
                    Project Overview & Technical Specifications *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Outline key software goals, target user load, integrations required..."
                    required
                    className="w-full bg-[#0d0d12] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#EFFC76] focus:ring-1 focus:ring-[#EFFC76]/50 transition-all resize-none text-sm"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* NDA Checkbox */}
            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="ndaRequired"
                name="ndaRequired"
                checked={formData.ndaRequired}
                onChange={handleChange}
                className="w-4 h-4 rounded accent-[#EFFC76] cursor-pointer"
              />
              <label htmlFor="ndaRequired" className="text-xs text-gray-300 cursor-pointer font-light select-none">
                Please send a standard Mutual NDA (Non-Disclosure Agreement) prior to detailed discovery call.
              </label>
            </div>

            {/* Success Message */}
            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-6 py-4 rounded-xl flex items-center gap-3"
              >
                <CheckCircle2 size={20} className="shrink-0 text-emerald-400" />
                <span className="text-sm font-medium">Request submitted successfully! A JEVXO principal architect will get back to you within 15 minutes.</span>
              </motion.div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4.5 rounded-xl bg-[#EFFC76] hover:bg-[#dbe759] text-black font-extrabold text-base uppercase tracking-wider transition-all shadow-[0_0_30px_rgba(239,252,118,0.25)] flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isSubmitting ? (
                  <span>Processing Request...</span>
                ) : (
                  <>
                    <span>Submit Discovery Request</span>
                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>

      {/* 5. BRAND NEW SECTION: GLOBAL ARCHITECTURE & TRUST MATRIX */}
      <div className="w-full border border-white/10 md:p-12 p-6 rounded-3xl mx-auto my-16 bg-[#07070a]/90 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#EFFC76] to-transparent opacity-80" />

        <div className="text-center mb-12 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-wider text-[#EFFC76] mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#EFFC76] animate-pulse" />
            Global Architecture & Trust Matrix
          </div>
          <h2 className="text-3xl md:text-5xl font-medium text-white tracking-tight leading-tight">
            Engineered For Maximum <br />
            <span className="font-serif italic text-[#EFFC76]">Uptime & Performance</span>
          </h2>
          <p className="mt-4 text-gray-400 text-sm md:text-base font-light max-w-xl mx-auto">
            Our technical commitment to global enterprises across security, compliance, code quality, and cloud infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-[#EFFC76]/40 transition-all duration-300 relative group">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#EFFC76] mb-4 group-hover:scale-110 transition-transform">
              <Zap size={22} />
            </div>
            <h3 className="text-white text-base font-bold mb-2">99.99% Guaranteed SLA</h3>
            <p className="text-gray-400 text-xs font-light leading-relaxed mb-4">
              High-availability microservices architecture with automated multi-region cloud failover & 24/7 cluster monitoring.
            </p>
            <div className="text-[10px] font-bold text-[#EFFC76] uppercase tracking-wider bg-[#EFFC76]/10 px-2.5 py-1 rounded-full w-fit border border-[#EFFC76]/20">
              Zero-Downtime Architecture
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-[#EFFC76]/40 transition-all duration-300 relative group">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#EFFC76] mb-4 group-hover:scale-110 transition-transform">
              <Lock size={22} />
            </div>
            <h3 className="text-white text-base font-bold mb-2">Bank-Grade Encryption</h3>
            <p className="text-gray-400 text-xs font-light leading-relaxed mb-4">
              End-to-end TLS 1.3 encryption, AES-256 data protection at rest, strict SOC2 Type II guidelines & vulnerability audits.
            </p>
            <div className="text-[10px] font-bold text-[#EFFC76] uppercase tracking-wider bg-[#EFFC76]/10 px-2.5 py-1 rounded-full w-fit border border-[#EFFC76]/20">
              Encrypted Data Shield
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-[#EFFC76]/40 transition-all duration-300 relative group">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#EFFC76] mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck size={22} />
            </div>
            <h3 className="text-white text-base font-bold mb-2">100% IP Code Ownership</h3>
            <p className="text-gray-400 text-xs font-light leading-relaxed mb-4">
              Complete transfer of source code rights, repository ownership, database schemas, and zero proprietary vendor lock-in.
            </p>
            <div className="text-[10px] font-bold text-[#EFFC76] uppercase tracking-wider bg-[#EFFC76]/10 px-2.5 py-1 rounded-full w-fit border border-[#EFFC76]/20">
              Full IP Transfer Contract
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-[#EFFC76]/40 transition-all duration-300 relative group">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#EFFC76] mb-4 group-hover:scale-110 transition-transform">
              <Code2 size={22} />
            </div>
            <h3 className="text-white text-base font-bold mb-2">Agile CI/CD Delivery</h3>
            <p className="text-gray-400 text-xs font-light leading-relaxed mb-4">
              Continuous integration & deployment pipelines with bi-weekly demo releases, automated testing & staging environments.
            </p>
            <div className="text-[10px] font-bold text-[#EFFC76] uppercase tracking-wider bg-[#EFFC76]/10 px-2.5 py-1 rounded-full w-fit border border-[#EFFC76]/20">
              Bi-Weekly Sprint Releases
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default EnterpriseContactSuite;
