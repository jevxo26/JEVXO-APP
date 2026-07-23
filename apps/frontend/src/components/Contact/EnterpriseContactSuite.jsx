"use client";
import React, { useState, useMemo } from "react";
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
  Minus,
  MessageSquare,
  Calculator,
  HelpCircle,
  Award,
  Headphones,
  Calendar,
  Sparkle
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
    serviceType: "Custom Enterprise Software",
    budgetRange: "$25k - $50k",
    timeline: "Accelerated (4-8 Weeks)",
    ndaRequired: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);

  // Calculator State
  const [calcScope, setCalcScope] = useState("web-app");
  const [calcComplexity, setCalcComplexity] = useState("enterprise");
  const [calcTimeline, setCalcTimeline] = useState("standard");
  const [calcNda, setCalcNda] = useState(true);

  const servicesList = [
    { id: "custom-software", title: "Custom Enterprise Software", icon: Code2, desc: "High-scale custom web & backend systems." },
    { id: "saas-platform", title: "SaaS Product Development", icon: Layers, desc: "Turnkey multi-tenant cloud platforms." },
    { id: "ai-automation", title: "AI & RAG LLM Workflows", icon: Cpu, desc: "Autonomous AI agents & custom models." },
    { id: "cloud-devops", title: "Cloud & DevOps Architecture", icon: Zap, desc: "Kubernetes, AWS/GCP, microservices." },
    { id: "mobile-app", title: "Cross-Platform Mobile Ecosystems", icon: Globe, desc: "iOS/Android apps with offline sync." },
    { id: "security-audit", title: "Cybersecurity & Code Audit", icon: ShieldCheck, desc: "Vulnerability analysis & SOC2 prep." },
  ];

  const budgetOptions = [
    "< $10k (MVP Build)",
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
    { label: "Response SLA", value: "< 15 Mins", detail: "24/7 Global Engineering Desk" },
    { label: "IP Ownership", value: "100% Transfer", detail: "Full Source Code Rights" },
    { label: "Security Standard", value: "SOC2 / Bank-Grade", detail: "Mutual NDA Enforced" },
    { label: "Delivery Record", value: "99.8% On-Time", detail: "Agile Sprint Driven" },
  ];

  const faqs = [
    {
      question: "How quickly can JEVXO onboard and start active development?",
      answer: "Following our initial 20-minute discovery call and requirements lock, we can deploy a dedicated engineering squad or initiate Sprint 0 within 3 to 5 business days."
    },
    {
      question: "Who retains ownership of the source code and Intellectual Property (IP)?",
      answer: "You retain 100% full ownership of all source code, architecture blueprints, database schemas, and intellectual property upon delivery. IP transfer is legally guaranteed in our contracts."
    },
    {
      question: "What is your project estimation and billing structure?",
      answer: "We offer Milestone-Based Fixed Pricing for clearly defined product scopes and Dedicated Engineering Squad Retainers (Time & Material) for rapidly evolving enterprise products."
    },
    {
      question: "Can we execute an NDA prior to sharing confidential project specs?",
      answer: "Yes, absolutely. You can request our standard Mutual NDA, or we can sign your organization's custom NDA before reviewing any proprietary architecture documents."
    },
    {
      question: "How do you ensure enterprise code quality, security, and scalability?",
      answer: "Every codebase undergoes automated CI/CD unit testing, static code analysis, vulnerability scanning, sub-second INP performance checks, and mandatory peer code reviews before staging deployment."
    }
  ];

  const calcEstimatedCost = useMemo(() => {
    let base = 12000;
    if (calcScope === "saas") base += 8000;
    if (calcScope === "ai") base += 10000;
    if (calcScope === "mobile") base += 6000;

    if (calcComplexity === "enterprise") base *= 1.4;
    if (calcComplexity === "hyper-scale") base *= 1.8;

    if (calcTimeline === "urgent") base *= 1.25;

    return Math.round(base / 500) * 500;
  }, [calcScope, calcComplexity, calcTimeline]);

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

  const handleCopyPhone = () => {
    navigator.clipboard.writeText("+8801886500056");
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 7000);
    }, 1200);
  };

  return (
    <div className="w-11/12 md:max-w-[1280px] mx-auto pt-24 pb-20 relative text-white font-sans select-none">
      
      {/* Ambient Radial Background Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[#EFFC76]/12 blur-[150px] pointer-events-none -z-10 rounded-full" />
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] bg-[#EFFC76]/8 blur-[180px] pointer-events-none -z-10 rounded-full" />

      {/* 1. HERO SECTION */}
      <div className="text-center mb-16 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#EFFC76]/40 bg-[#EFFC76]/10 text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#EFFC76] mb-6 shadow-[0_0_25px_rgba(239,252,118,0.25)]"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#EFFC76] animate-pulse" />
          <span>24/7 GLOBAL SOFTWARE ENGINEERING DESK</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight max-w-5xl mx-auto uppercase"
        >
          Architect High-Impact Software With{" "}
          <span className="font-serif italic font-normal text-[#EFFC76] lowercase block sm:inline">
            Enterprise Engineers
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto font-light leading-relaxed"
        >
          From high-frequency SaaS platforms to autonomous AI workflows and cross-platform mobile apps—partner with JEVXO to transform vision into resilient, production-ready code.
        </motion.p>

        {/* Feature Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3.5 mt-8"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a0a0f]/80 border border-[#EFFC76]/30 text-xs font-mono text-gray-200 backdrop-blur-md shadow-md">
            <Lock size={14} className="text-[#EFFC76]" />
            <span>Strict Mutual NDA Enforced</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a0a0f]/80 border border-[#EFFC76]/30 text-xs font-mono text-gray-200 backdrop-blur-md shadow-md">
            <Clock size={14} className="text-[#EFFC76]" />
            <span>15-Minute Response SLA</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a0a0f]/80 border border-[#EFFC76]/30 text-xs font-mono text-gray-200 backdrop-blur-md shadow-md">
            <ShieldCheck size={14} className="text-[#EFFC76]" />
            <span>100% IP Code Guarantee</span>
          </div>
        </motion.div>
      </div>

      {/* 2. STATS BAR */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16 relative z-10">
        {statsList.map((st, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            whileHover={{ y: -4 }}
            className="p-6 rounded-2xl border border-[#EFFC76]/25 bg-[#08080d]/90 backdrop-blur-2xl text-center relative overflow-hidden group hover:border-[#EFFC76] hover:shadow-[0_0_30px_rgba(239,252,118,0.2)] transition-all duration-300"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#EFFC76]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="text-2xl sm:text-3xl font-extrabold text-[#EFFC76] mb-1.5 font-mono">{st.value}</div>
            <div className="text-white text-xs font-bold uppercase tracking-wider">{st.label}</div>
            <div className="text-gray-400 text-[11px] font-light mt-1">{st.detail}</div>
          </motion.div>
        ))}
      </div>

      {/* 3. DIRECT CONTACT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 relative z-10">
        {/* Email Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="p-7 rounded-3xl border border-[#EFFC76]/25 bg-[#08080d]/90 backdrop-blur-2xl relative overflow-hidden group hover:border-[#EFFC76] hover:shadow-[0_0_35px_rgba(239,252,118,0.25)] transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="w-12 h-12 rounded-2xl bg-[#EFFC76]/10 border border-[#EFFC76]/30 flex items-center justify-center text-[#EFFC76] group-hover:scale-110 group-hover:bg-[#EFFC76] group-hover:text-black transition-all duration-300">
                <Mail size={22} />
              </div>
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-[#EFFC76]/10 text-[#EFFC76] border border-[#EFFC76]/30">
                Direct Engineering
              </span>
            </div>
            <h3 className="text-white text-lg font-bold mb-1">Send Specs & RFPs</h3>
            <p className="text-gray-400 text-xs font-light mb-6">Attach scope docs or technical requests directly to our team.</p>
          </div>
          
          <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl px-4 py-3 group-hover:border-[#EFFC76]/50 transition-colors">
            <span className="text-white text-xs font-mono font-semibold select-all truncate">contact@jevxo.com</span>
            <button
              onClick={handleCopyEmail}
              className="text-gray-400 hover:text-[#EFFC76] transition-colors p-1.5 rounded-lg hover:bg-white/5"
              title="Copy Email"
            >
              {copiedEmail ? <Check size={16} className="text-[#EFFC76]" /> : <Copy size={16} />}
            </button>
          </div>
        </motion.div>

        {/* Phone & WhatsApp Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="p-7 rounded-3xl border border-[#EFFC76]/25 bg-[#08080d]/90 backdrop-blur-2xl relative overflow-hidden group hover:border-[#EFFC76] hover:shadow-[0_0_35px_rgba(239,252,118,0.25)] transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="w-12 h-12 rounded-2xl bg-[#EFFC76]/10 border border-[#EFFC76]/30 flex items-center justify-center text-[#EFFC76] group-hover:scale-110 group-hover:bg-[#EFFC76] group-hover:text-black transition-all duration-300">
                <Phone size={22} />
              </div>
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Architect Online
              </span>
            </div>
            <h3 className="text-white text-lg font-bold mb-1">Global WhatsApp & Call</h3>
            <p className="text-gray-400 text-xs font-light mb-6">Talk directly with a Principal Solution Architect today.</p>
          </div>
          
          <div className="flex items-center justify-between gap-2">
            <a
              href="https://wa.me/8801886500056"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-between bg-[#EFFC76] hover:bg-[#dbe759] text-black transition-all rounded-2xl px-4 py-3 text-xs font-bold font-mono group/wa shadow-[0_0_20px_rgba(239,252,118,0.2)]"
            >
              <span>+880 1886-500056</span>
              <ArrowRight size={15} className="group-hover/wa:translate-x-1 transition-transform" />
            </a>
            <button
              onClick={handleCopyPhone}
              className="p-3 bg-white/5 border border-white/10 rounded-2xl text-gray-300 hover:text-[#EFFC76] hover:border-[#EFFC76]/40 transition-all shrink-0"
              title="Copy Phone Number"
            >
              {copiedPhone ? <Check size={16} className="text-[#EFFC76]" /> : <Copy size={16} />}
            </button>
          </div>
        </motion.div>

        {/* Global HQ Center Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="p-7 rounded-3xl border border-[#EFFC76]/25 bg-[#08080d]/90 backdrop-blur-2xl relative overflow-hidden group hover:border-[#EFFC76] hover:shadow-[0_0_35px_rgba(239,252,118,0.25)] transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="w-12 h-12 rounded-2xl bg-[#EFFC76]/10 border border-[#EFFC76]/30 flex items-center justify-center text-[#EFFC76] group-hover:scale-110 group-hover:bg-[#EFFC76] group-hover:text-black transition-all duration-300">
                <Building2 size={22} />
              </div>
              <span className="text-[10px] font-mono uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-white/10 text-gray-300 border border-white/15">
                Global Operations
              </span>
            </div>
            <h3 className="text-white text-lg font-bold mb-1">Enterprise Tech HQ</h3>
            <p className="text-gray-400 text-xs font-light mb-6">Dhaka, Bangladesh — Serving Clients Across US, EU & APAC.</p>
          </div>
          
          <div className="flex items-center gap-2.5 text-xs font-mono text-gray-200 bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
            <Globe size={15} className="text-[#EFFC76] shrink-0" />
            <span className="truncate">Mon - Sat: 9:00 AM - 10:00 PM EST</span>
          </div>
        </motion.div>
      </div>

      {/* 4. MAIN PROJECT DISCOVERY FORM CARD */}
      <div className="relative z-10 mb-20">
        <div className="absolute inset-0 bg-[#EFFC76]/15 blur-[120px] rounded-[3rem] pointer-events-none" />

        <div className="relative bg-[#060609]/95 border border-[#EFFC76]/30 rounded-[2.5rem] p-6 sm:p-10 lg:p-14 shadow-[0_30px_100px_rgba(0,0,0,0.9)] overflow-hidden">
          
          {/* Accent Line */}
          <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-[#EFFC76] to-transparent opacity-90" />

          {/* Form Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-8 mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#EFFC76] text-[11px] font-mono font-bold uppercase tracking-widest bg-[#EFFC76]/10 px-3 py-1 rounded-full border border-[#EFFC76]/30">
                  Sprint Discovery
                </span>
                <span className="text-gray-400 text-xs font-light">Free Architecture Estimate</span>
              </div>
              <h2 className="text-white text-2xl sm:text-4xl font-extrabold tracking-tight">Enterprise Project Specification</h2>
              <p className="text-gray-400 text-sm font-light mt-1">Select your service parameters and organization details to receive a tailored technical proposal.</p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-gray-200 bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl shrink-0">
              <ShieldCheck size={16} className="text-[#EFFC76]" />
              <span>Encrypted Submission</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            
            {/* Step 1: Select Service Architecture */}
            <div>
              <label className="block text-gray-300 text-xs font-mono font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                <Code2 size={16} className="text-[#EFFC76]" />
                1. Select Service Architecture
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {servicesList.map((srv) => {
                  const Icon = srv.icon;
                  const isSelected = formData.serviceType === srv.title;
                  return (
                    <div
                      key={srv.id}
                      onClick={() => setFormData((prev) => ({ ...prev, serviceType: srv.title }))}
                      className={`p-4 sm:p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex items-start gap-4 ${
                        isSelected
                          ? "bg-[#EFFC76]/12 border-[#EFFC76] shadow-[0_0_25px_rgba(239,252,118,0.2)] scale-[1.01]"
                          : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
                      }`}
                    >
                      <div className={`p-3 rounded-xl shrink-0 transition-colors ${isSelected ? "bg-[#EFFC76] text-black" : "bg-white/5 text-gray-400"}`}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <div className={`text-sm font-bold ${isSelected ? "text-[#EFFC76]" : "text-white"}`}>
                          {srv.title}
                        </div>
                        <div className="text-gray-400 text-[11px] font-light leading-snug mt-1">
                          {srv.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Budget & Timeline Selectors */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
              {/* Budget */}
              <div>
                <label className="block text-gray-300 text-xs font-mono font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Calculator size={16} className="text-[#EFFC76]" />
                  2. Project Budget Bracket
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {budgetOptions.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, budgetRange: b }))}
                      className={`px-4 py-3 rounded-2xl text-xs font-mono transition-all border text-left truncate ${
                        formData.budgetRange === b
                          ? "bg-[#EFFC76] text-black border-[#EFFC76] font-bold shadow-[0_0_20px_rgba(239,252,118,0.3)]"
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
                <label className="block text-gray-300 text-xs font-mono font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Clock size={16} className="text-[#EFFC76]" />
                  3. Target Launch Timeline
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {timelineOptions.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, timeline: t }))}
                      className={`px-4 py-3 rounded-2xl text-xs font-mono transition-all border text-left truncate ${
                        formData.timeline === t
                          ? "bg-[#EFFC76] text-black border-[#EFFC76] font-bold shadow-[0_0_20px_rgba(239,252,118,0.3)]"
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
              <div className="text-gray-300 text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2">
                <Users size={16} className="text-[#EFFC76]" />
                4. Contact & Organization Details
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div className="space-y-2">
                  <label className="text-gray-300 text-xs font-mono uppercase tracking-wider ml-1">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="e.g. Alexander"
                    required
                    className="w-full bg-[#0a0a0f] border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#EFFC76] focus:ring-1 focus:ring-[#EFFC76]/50 transition-all text-sm"
                  />
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label className="text-gray-300 text-xs font-mono uppercase tracking-wider ml-1">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="e.g. Vance"
                    required
                    className="w-full bg-[#0a0a0f] border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#EFFC76] focus:ring-1 focus:ring-[#EFFC76]/50 transition-all text-sm"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-gray-300 text-xs font-mono uppercase tracking-wider ml-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alexander@company.com"
                    required
                    className="w-full bg-[#0a0a0f] border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#EFFC76] focus:ring-1 focus:ring-[#EFFC76]/50 transition-all text-sm"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label className="text-gray-300 text-xs font-mono uppercase tracking-wider ml-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    required
                    className="w-full bg-[#0a0a0f] border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#EFFC76] focus:ring-1 focus:ring-[#EFFC76]/50 transition-all text-sm"
                  />
                </div>

                {/* Designation */}
                <div className="space-y-2">
                  <label className="text-gray-300 text-xs font-mono uppercase tracking-wider ml-1">
                    Designation / Role *
                  </label>
                  <input
                    type="text"
                    name="designation"
                    value={formData.designation}
                    onChange={handleChange}
                    placeholder="e.g. CTO, VP of Product, Founder"
                    required
                    className="w-full bg-[#0a0a0f] border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#EFFC76] focus:ring-1 focus:ring-[#EFFC76]/50 transition-all text-sm"
                  />
                </div>

                {/* Company Name */}
                <div className="space-y-2">
                  <label className="text-gray-300 text-xs font-mono uppercase tracking-wider ml-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Acme Technologies Inc."
                    required
                    className="w-full bg-[#0a0a0f] border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#EFFC76] focus:ring-1 focus:ring-[#EFFC76]/50 transition-all text-sm"
                  />
                </div>

                {/* Country */}
                <div className="space-y-2">
                  <label className="text-gray-300 text-xs font-mono uppercase tracking-wider ml-1">
                    Country / Region *
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    placeholder="e.g. United States, UK, Bangladesh"
                    required
                    className="w-full bg-[#0a0a0f] border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#EFFC76] focus:ring-1 focus:ring-[#EFFC76]/50 transition-all text-sm"
                  />
                </div>

                {/* Industry */}
                <div className="space-y-2">
                  <label className="text-gray-300 text-xs font-mono uppercase tracking-wider ml-1">
                    Industry Sector *
                  </label>
                  <input
                    type="text"
                    name="companyType"
                    value={formData.companyType}
                    onChange={handleChange}
                    placeholder="e.g. Fintech, SaaS, Healthtech, Logistics"
                    required
                    className="w-full bg-[#0a0a0f] border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#EFFC76] focus:ring-1 focus:ring-[#EFFC76]/50 transition-all text-sm"
                  />
                </div>

                {/* Project Details */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-gray-300 text-xs font-mono uppercase tracking-wider ml-1">
                    Project Overview & Technical Requirements *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Outline key software goals, target user load, integrations required..."
                    required
                    className="w-full bg-[#0a0a0f] border border-white/10 rounded-2xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#EFFC76] focus:ring-1 focus:ring-[#EFFC76]/50 transition-all resize-none text-sm"
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
                Send a standard Mutual NDA (Non-Disclosure Agreement) prior to detailed discovery call.
              </label>
            </div>

            {/* Success Message */}
            <AnimatePresence>
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-6 py-4 rounded-2xl flex items-center gap-3"
                >
                  <CheckCircle2 size={20} className="shrink-0 text-emerald-400" />
                  <span className="text-sm font-medium">Request submitted successfully! A JEVXO principal architect will reach out to you within 15 minutes.</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 rounded-2xl bg-[#EFFC76] hover:bg-[#dbe759] text-black font-extrabold text-base uppercase tracking-wider font-mono transition-all shadow-[0_0_35px_rgba(239,252,118,0.3)] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isSubmitting ? (
                  <span>Processing Discovery Request...</span>
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

      {/* 5. INTERACTIVE PROJECT ESTIMATOR WIDGET */}
      <div className="w-full border border-[#EFFC76]/30 p-8 sm:p-12 rounded-[2.5rem] mx-auto mb-20 bg-[#07070b]/90 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#EFFC76] to-transparent opacity-80" />

        <div className="text-center mb-10 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#EFFC76]/30 bg-[#EFFC76]/10 text-[11px] font-mono uppercase tracking-widest text-[#EFFC76] mb-3">
            <Calculator size={13} />
            <span>Interactive Project Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Calculate Instant Budget <span className="font-serif italic font-normal text-[#EFFC76]">Estimate</span>
          </h2>
          <p className="mt-2 text-gray-400 text-sm font-light max-w-xl mx-auto">
            Configure software parameters below for an instant preliminary scope quote.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10 items-center">
          {/* Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Scope */}
            <div>
              <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider mb-2.5">
                Software Platform Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: "web-app", label: "Web Portal" },
                  { id: "saas", label: "SaaS Platform" },
                  { id: "ai", label: "AI Workflows" },
                  { id: "mobile", label: "Mobile App" }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setCalcScope(s.id)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-mono transition-all border ${
                      calcScope === s.id
                        ? "bg-[#EFFC76] text-black font-bold border-[#EFFC76]"
                        : "bg-white/5 border-white/10 text-gray-300 hover:border-white/20"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Complexity */}
            <div>
              <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider mb-2.5">
                System Complexity & Load
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: "standard", label: "MVP / Standard" },
                  { id: "enterprise", label: "Enterprise Grade" },
                  { id: "hyper-scale", label: "Hyper-Scale Cloud" }
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setCalcComplexity(c.id)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-mono transition-all border ${
                      calcComplexity === c.id
                        ? "bg-[#EFFC76] text-black font-bold border-[#EFFC76]"
                        : "bg-white/5 border-white/10 text-gray-300 hover:border-white/20"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Delivery Timeline */}
            <div>
              <label className="block text-xs font-mono text-gray-300 uppercase tracking-wider mb-2.5">
                Target Speed
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { id: "standard", label: "Standard Agile (4-8 Wks)" },
                  { id: "urgent", label: "Urgent Sprint (2-4 Wks)" }
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setCalcTimeline(t.id)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-mono transition-all border ${
                      calcTimeline === t.id
                        ? "bg-[#EFFC76] text-black font-bold border-[#EFFC76]"
                        : "bg-white/5 border-white/10 text-gray-300 hover:border-white/20"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Estimate Display Box */}
          <div className="p-7 rounded-3xl border border-[#EFFC76]/40 bg-[#0b0b12] text-center relative overflow-hidden shadow-[0_0_30px_rgba(239,252,118,0.15)] flex flex-col justify-between h-full">
            <div>
              <div className="text-gray-400 text-xs font-mono uppercase tracking-widest mb-2">Estimated Starting Budget</div>
              <div className="text-4xl sm:text-5xl font-extrabold text-[#EFFC76] font-mono tracking-tight my-2">
                ${calcEstimatedCost.toLocaleString()}
              </div>
              <div className="text-gray-400 text-[11px] font-light">
                Includes full architecture setup, staging environment & 30-day post-launch warranty.
              </div>
            </div>

            <div className="mt-6">
              <button 
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    budgetRange: `$${(calcEstimatedCost / 1000).toFixed(0)}k Scale`,
                  }));
                  window.scrollTo({ top: 650, behavior: "smooth" });
                }}
                className="w-full py-3.5 rounded-xl bg-[#EFFC76]/10 hover:bg-[#EFFC76] text-[#EFFC76] hover:text-black font-mono font-bold text-xs uppercase tracking-wider border border-[#EFFC76]/30 transition-all flex items-center justify-center gap-2"
              >
                <span>Lock Estimate into Form</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 6. BRAND TRUST & GLOBAL ARCHITECTURE MATRIX */}
      <div className="w-full border border-[#EFFC76]/25 sm:p-12 p-6 rounded-[2.5rem] mx-auto mb-20 bg-[#07070b]/90 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#EFFC76] to-transparent opacity-80" />

        <div className="text-center mb-12 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono uppercase tracking-widest text-[#EFFC76] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EFFC76] animate-pulse" />
            Global Architecture & Trust Matrix
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight uppercase">
            Engineered For Zero-Downtime <br />
            <span className="font-serif italic font-normal text-[#EFFC76] lowercase">Enterprise Uptime</span>
          </h2>
          <p className="mt-4 text-gray-400 text-sm sm:text-base font-light max-w-xl mx-auto">
            Our architectural guarantees to global enterprises across security, compliance, code quality, and cloud infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {/* Card 1 */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-[#EFFC76]/50 transition-all duration-300 relative group">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#EFFC76] mb-4 group-hover:scale-110 group-hover:bg-[#EFFC76] group-hover:text-black transition-all">
              <Zap size={22} />
            </div>
            <h3 className="text-white text-base font-bold mb-2">99.99% Guaranteed SLA</h3>
            <p className="text-gray-400 text-xs font-light leading-relaxed mb-4">
              High-availability microservices architecture with automated multi-region cloud failover & 24/7 cluster monitoring.
            </p>
            <div className="text-[10px] font-mono font-bold text-[#EFFC76] uppercase tracking-wider bg-[#EFFC76]/10 px-2.5 py-1 rounded-full w-fit border border-[#EFFC76]/20">
              Zero-Downtime Stack
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-[#EFFC76]/50 transition-all duration-300 relative group">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#EFFC76] mb-4 group-hover:scale-110 group-hover:bg-[#EFFC76] group-hover:text-black transition-all">
              <Lock size={22} />
            </div>
            <h3 className="text-white text-base font-bold mb-2">Bank-Grade Security</h3>
            <p className="text-gray-400 text-xs font-light leading-relaxed mb-4">
              End-to-end TLS 1.3 encryption, AES-256 data protection at rest, strict SOC2 Type II guidelines & vulnerability audits.
            </p>
            <div className="text-[10px] font-mono font-bold text-[#EFFC76] uppercase tracking-wider bg-[#EFFC76]/10 px-2.5 py-1 rounded-full w-fit border border-[#EFFC76]/20">
              SOC2 Shield Ready
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-[#EFFC76]/50 transition-all duration-300 relative group">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#EFFC76] mb-4 group-hover:scale-110 group-hover:bg-[#EFFC76] group-hover:text-black transition-all">
              <ShieldCheck size={22} />
            </div>
            <h3 className="text-white text-base font-bold mb-2">100% IP Code Transfer</h3>
            <p className="text-gray-400 text-xs font-light leading-relaxed mb-4">
              Complete legal transfer of source code rights, repository access, database schemas, and zero vendor lock-in.
            </p>
            <div className="text-[10px] font-mono font-bold text-[#EFFC76] uppercase tracking-wider bg-[#EFFC76]/10 px-2.5 py-1 rounded-full w-fit border border-[#EFFC76]/20">
              Full Code Rights
            </div>
          </div>

          {/* Card 4 */}
          <div className="p-6 rounded-2xl border border-white/10 bg-white/5 hover:border-[#EFFC76]/50 transition-all duration-300 relative group">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#EFFC76] mb-4 group-hover:scale-110 group-hover:bg-[#EFFC76] group-hover:text-black transition-all">
              <Code2 size={22} />
            </div>
            <h3 className="text-white text-base font-bold mb-2">Agile CI/CD Sprints</h3>
            <p className="text-gray-400 text-xs font-light leading-relaxed mb-4">
              Continuous delivery pipelines with bi-weekly demo releases, staging environments, and rapid iteration loops.
            </p>
            <div className="text-[10px] font-mono font-bold text-[#EFFC76] uppercase tracking-wider bg-[#EFFC76]/10 px-2.5 py-1 rounded-full w-fit border border-[#EFFC76]/20">
              Bi-Weekly Demos
            </div>
          </div>
        </div>
      </div>

      {/* 7. INTERACTIVE FAQ ACCORDION SECTION */}
      <div className="w-full max-w-4xl mx-auto mb-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#EFFC76]/30 bg-[#EFFC76]/10 text-[11px] font-mono uppercase tracking-widest text-[#EFFC76] mb-3">
            <HelpCircle size={13} />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Got Questions? We Have <span className="font-serif italic font-normal text-[#EFFC76]">Answers</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#EFFC76]/20 bg-[#08080c]/90 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? -1 : idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 hover:bg-white/5 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-white leading-snug">
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-xl shrink-0 transition-transform duration-300 ${isOpen ? "bg-[#EFFC76] text-black rotate-180" : "bg-white/5 text-gray-400"}`}>
                    <ChevronRight size={18} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 pt-1 text-gray-300 text-xs sm:text-sm font-light leading-relaxed border-t border-white/5"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default EnterpriseContactSuite;

