"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Briefcase,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Users,
  MapPin,
  Clock,
  DollarSign,
  Heart,
  Zap,
  GraduationCap,
  ShieldCheck,
  Globe2,
  X,
  Send,
  UploadCloud,
} from "lucide-react";
import CosmicBackground from "@/components/Home/CosmicBackground";

const openPositions = [
  {
    id: "sr-fullstack",
    title: "Senior Full Stack Cloud Architect",
    department: "Engineering",
    location: "Remote / Hybrid (Dhaka / Austin)",
    type: "Full-Time",
    experience: "5+ Years",
    salary: "$60,000 - $90,000 / year",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Kubernetes", "AWS/GCP"],
    description:
      "Design and deploy mission-critical, high-throughput microservices and enterprise SaaS architectures for our international clients.",
  },
  {
    id: "ai-engineer",
    title: "Lead AI & RAG Engineer",
    department: "AI Research & Labs",
    location: "Remote",
    type: "Full-Time",
    experience: "3+ Years",
    salary: "$70,000 - $100,000 / year",
    tags: ["PyTorch", "Python", "LLMs", "Vector DBs", "LangChain"],
    description:
      "Lead our AI engineering division in training fine-tuned LLMs, building custom RAG pipelines, and integrating multi-modal AI agents.",
  },
  {
    id: "devops-lead",
    title: "Principal DevOps & Infrastructure Lead",
    department: "Cloud Infrastructure",
    location: "Hybrid (Kuala Lumpur / Dhaka)",
    type: "Full-Time",
    experience: "6+ Years",
    salary: "$65,000 - $95,000 / year",
    tags: ["Terraform", "Docker", "CI/CD", "Prometheus", "Cybersecurity"],
    description:
      "Manage zero-downtime automated deployment pipelines, cloud security posture, and sovereign cloud infrastructure for enterprise customers.",
  },
  {
    id: "enterprise-sales",
    title: "Enterprise Solutions Executive",
    department: "Global Sales",
    location: "Remote (APAC / Europe)",
    type: "Full-Time",
    experience: "4+ Years",
    salary: "$50,000 - $80,000 + Commission",
    tags: ["B2B SaaS", "ERP Sales", "Solution Selling", "CRM"],
    description:
      "Drive strategic enterprise partnerships, manage key account relationships, and expand JEVXO's regional software ecosystem.",
  },
  {
    id: "uiux-designer",
    title: "Senior Product & Systems Designer",
    department: "Design & UX",
    location: "Remote",
    type: "Full-Time",
    experience: "4+ Years",
    salary: "$45,000 - $70,000 / year",
    tags: ["Figma", "Design Systems", "Framer", "Prototyping"],
    description:
      "Craft world-class, ultra-sleek user interfaces and intuitive design systems for complex SaaS and enterprise platforms.",
  },
];

const perks = [
  {
    icon: Globe2,
    title: "Global Remote-First Work",
    description: "Work from anywhere in the world with flexible hours and asynchronous communication workflows.",
  },
  {
    icon: DollarSign,
    title: "Competitive Compensation & Equity",
    description: "Top-tier benchmark salaries, annual performance bonuses, and equity options in JEVXO ventures.",
  },
  {
    icon: GraduationCap,
    title: "$3,000 Annual Learning Budget",
    description: "Generous allowance for cloud certifications, tech conferences, book stipends, and advanced courses.",
  },
  {
    icon: Heart,
    title: "Health & Wellness Coverage",
    description: "Comprehensive medical insurance for you and your dependents, plus annual health retreats.",
  },
  {
    icon: Zap,
    title: "Cutting-Edge Hardware Setup",
    description: "Latest Apple MacBook Pro or high-spec Workstation setup provided upon joining.",
  },
  {
    icon: ShieldCheck,
    title: "Career Growth & Fast Track",
    description: "Direct mentorship from global tech leaders and clear technical advancement pathways.",
  },
];

const CareersPage = () => {
  const [selectedDept, setSelectedDept] = useState("All");
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [applicantForm, setApplicantForm] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    portfolio: "",
    resumeName: "",
    coverNote: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const departments = ["All", "Engineering", "AI Research & Labs", "Cloud Infrastructure", "Global Sales", "Design & UX"];

  const filteredPositions =
    selectedDept === "All"
      ? openPositions
      : openPositions.filter((pos) => pos.department === selectedDept);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setApplicantForm({ ...applicantForm, resumeName: e.target.files[0].name });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSubmitted(false);
      setApplicantForm({
        name: "",
        email: "",
        phone: "",
        linkedin: "",
        portfolio: "",
        resumeName: "",
        coverNote: "",
      });
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
        <section className="text-center max-w-4xl mx-auto pt-6 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-wider text-[#EFFC76] mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#EFFC76] animate-pulse" />
            Careers At JEVXO
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-6xl font-medium text-white tracking-tight"
          >
            Build Software & Shape{" "}
            <span className="font-serif italic text-[#EFFC76]">
              Global AI Tech
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto font-light"
          >
            Join an elite engineering team building enterprise software, cloud platforms, and AI engines for high-growth global companies.
          </motion.p>
        </section>

        {/* ================= PERKS & CULTURE ================= */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#EFFC76] uppercase tracking-widest bg-white/5 border border-white/10 px-3.5 py-1 rounded-full">
              WHY JOIN US
            </span>
            <h2 className="text-3xl font-bold text-white tracking-tight mt-3">
              Perks Built for Top 1% Engineers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((perk, idx) => (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="p-6 rounded-2xl bg-[#0c0c0e]/90 border border-white/10 hover:border-[#EFFC76]/40 transition-all backdrop-blur-md group"
              >
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[#EFFC76] w-fit mb-5 group-hover:bg-[#EFFC76] group-hover:text-black transition-colors">
                  <perk.icon size={22} />
                </div>
                <h3 className="text-white font-bold text-base mb-2">{perk.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed font-light">{perk.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= OPEN POSITIONS ================= */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-[#EFFC76] uppercase tracking-widest bg-white/5 border border-white/10 px-3.5 py-1 rounded-full">
                OPEN ROLES
              </span>
              <h2 className="text-3xl font-bold text-white tracking-tight mt-3">
                Explore Available Career Opportunities
              </h2>
            </div>

            {/* Department Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 max-w-full">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                    selectedDept === dept
                      ? "bg-[#EFFC76] text-black border-[#EFFC76]"
                      : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredPositions.map((job) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-[#0d0d10]/95 border border-white/10 hover:border-[#EFFC76]/50 transition-all backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group"
              >
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase bg-white/10 text-[#EFFC76] px-2.5 py-0.5 rounded-full">
                      {job.department}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                      <MapPin size={11} className="text-[#EFFC76]" />
                      {job.location}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                      <Clock size={11} className="text-[#EFFC76]" />
                      {job.type}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-[#EFFC76] transition-colors">
                    {job.title}
                  </h3>

                  <p className="text-gray-400 text-xs font-light max-w-3xl leading-relaxed">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium bg-white/5 border border-white/10 text-gray-300 px-2 py-0.5 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col md:items-end gap-3 w-full md:w-auto shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-white/10">
                  <span className="text-xs font-bold text-[#EFFC76]">{job.salary}</span>
                  <button
                    onClick={() => handleApplyClick(job)}
                    className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-[#EFFC76] text-white hover:text-black border border-white/10 hover:border-[#EFFC76] font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-full transition-all group/btn"
                  >
                    <span>Apply Position</span>
                    <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* ================= APPLICATION MODAL ================= */}
      <AnimatePresence>
        {isModalOpen && selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto pt-10 pb-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-lg bg-[#0d0d10] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_30px_70px_rgba(0,0,0,0.9)] z-10 overflow-hidden my-auto"
            >
              <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-[#EFFC76]" />

              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>

              <div className="mb-5 space-y-1 text-center">
                <span className="text-[10px] font-bold uppercase text-[#EFFC76] bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                  {selectedJob.department}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Apply for {selectedJob.title}
                </h3>
                <p className="text-xs text-gray-400 font-light">
                  {selectedJob.location} • {selectedJob.type}
                </p>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-[#EFFC76] text-black flex items-center justify-center mx-auto animate-pulse">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-white">Application Submitted!</h4>
                  <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
                    Thank you for applying. Our talent team will review your profile and respond within 48 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5 max-h-[75vh] overflow-y-auto pr-1">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={applicantForm.name}
                      onChange={(e) => setApplicantForm({ ...applicantForm, name: e.target.value })}
                      placeholder="e.g. Farhan Tanvir"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#EFFC76] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={applicantForm.email}
                        onChange={(e) => setApplicantForm({ ...applicantForm, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#EFFC76] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="text"
                        required
                        value={applicantForm.phone}
                        onChange={(e) => setApplicantForm({ ...applicantForm, phone: e.target.value })}
                        placeholder="+880 1836-815340"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#EFFC76] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">
                        LinkedIn Profile URL
                      </label>
                      <input
                        type="url"
                        value={applicantForm.linkedin}
                        onChange={(e) => setApplicantForm({ ...applicantForm, linkedin: e.target.value })}
                        placeholder="https://linkedin.com/in/username"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#EFFC76] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">
                        GitHub / Portfolio URL
                      </label>
                      <input
                        type="url"
                        value={applicantForm.portfolio}
                        onChange={(e) => setApplicantForm({ ...applicantForm, portfolio: e.target.value })}
                        placeholder="https://github.com/username"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#EFFC76] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">
                      Resume / CV (PDF) *
                    </label>
                    <label className="flex items-center justify-center px-4 py-3 bg-white/5 border border-dashed border-white/20 rounded-xl cursor-pointer hover:border-[#EFFC76]/50 transition-colors w-full">
                      <div className="flex items-center gap-2 text-xs text-gray-300 font-medium">
                        <UploadCloud size={16} className="text-[#EFFC76]" />
                        <span>{applicantForm.resumeName ? applicantForm.resumeName : "Upload Resume (PDF)"}</span>
                      </div>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="hidden"
                        onChange={handleFileChange}
                        required={!applicantForm.resumeName}
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">
                      Cover Note / Why JEVXO?
                    </label>
                    <textarea
                      rows={3}
                      value={applicantForm.coverNote}
                      onChange={(e) => setApplicantForm({ ...applicantForm, coverNote: e.target.value })}
                      placeholder="Share a brief overview of your technical highlights..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#EFFC76] transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#EFFC76] text-black font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl hover:bg-[#EFFC76]/90 transition-all shadow-[0_5px_15px_rgba(239,252,118,0.2)] mt-2"
                  >
                    <span>Submit Application</span>
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

export default CareersPage;
