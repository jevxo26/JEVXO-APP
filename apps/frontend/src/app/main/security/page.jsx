"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  Key,
  Server,
  FileCheck,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Cpu,
  Eye,
  Database,
  Download,
  Send,
  X,
} from "lucide-react";
import CosmicBackground from "@/components/Home/CosmicBackground";

const securityPillars = [
  {
    icon: Lock,
    title: "Zero-Trust Architecture & RBAC",
    description: "Strict identity verification for every user and service request. Least-privilege access control, MFA enforcement, and micro-segmented perimeter defense.",
  },
  {
    icon: Key,
    title: "End-to-End Encryption Standards",
    description: "AES-256 bit encryption at rest for database instances and object stores. TLS 1.3 encryption in transit with Hardware Security Module (HSM) key rotation.",
  },
  {
    icon: Server,
    title: "99.99% SLA Uptime & Disaster Recovery",
    description: "Multi-region redundant cloud cluster deployment with automated failover, real-time incremental database snapshots, and RPO < 1 min, RTO < 5 min.",
  },
  {
    icon: Eye,
    title: "24/7 Automated Threat Intelligence & SIEM",
    description: "Continuous AI log analysis, real-time DDoS mitigation, automated vulnerability scanning, and instant security incident triage.",
  },
  {
    icon: Database,
    title: "Sovereign Cloud Data Isolation",
    description: "Strict logical and physical data isolation for enterprise clients. Option for on-premise air-gapped private cloud deployments.",
  },
  {
    icon: FileCheck,
    title: "Third-Party Audits & Compliance",
    description: "Regular independent SOC 2 Type II audits, ISO 27001 certification reviews, and annual external penetration testing reports.",
  },
];

const certifications = [
  {
    code: "SOC 2 Type II",
    title: "Trust Services Criteria",
    description: "Audited for Security, Availability, Processing Integrity & Confidentiality.",
    badge: "Certified",
  },
  {
    code: "ISO 27001:2022",
    title: "Information Security Management",
    description: "Certified international standard for ISMS processes and risk management.",
    badge: "Certified",
  },
  {
    code: "GDPR & CCPA",
    title: "Data Privacy & Governance",
    description: "Full compliance with European Union & California consumer data rights.",
    badge: "Compliant",
  },
  {
    code: "PCI-DSS Level 1",
    title: "Payment Card Security",
    description: "Highest level certification for processing payment card transactions.",
    badge: "Level 1 Verified",
  },
  {
    code: "HIPAA Ready",
    title: "Healthcare Information Security",
    description: "BAA contracts available for healthcare ePHI data processing.",
    badge: "Compliant",
  },
  {
    code: "AES-256 / TLS 1.3",
    title: "Cryptographic Standard",
    description: "Military-grade cryptographic algorithms protecting all data streams.",
    badge: "Enforced",
  },
];

const SecurityPage = () => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reportForm, setReportForm] = useState({
    name: "",
    email: "",
    severity: "Medium",
    details: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setIsReportModalOpen(false);
      setSubmitted(false);
      setReportForm({ name: "", email: "", severity: "Medium", details: "" });
    }, 2500);
  };

  return (
    <div className="min-h-screen pt-28 pb-36 relative overflow-x-hidden text-white bg-[#050505] select-none">
      {/* Background Cosmic Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CosmicBackground />
      </div>

      <div className="relative z-10 w-10/12 mx-auto space-y-20 md:space-y-28">
        {/* ================= HERO SECTION ================= */}
        <section className="text-center max-w-4xl mx-auto pt-6 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-wider text-[#EFFC76] mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#EFFC76] animate-pulse" />
            Trust & Security Center
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-6xl font-medium text-white tracking-tight"
          >
            Bank-Grade Security &{" "}
            <span className="font-serif italic text-[#EFFC76]">
              Enterprise Data Shield
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto font-light"
          >
            We engineer security into every layer of our software pipeline—from zero-trust microservice architecture to continuous threat detection and compliance assurance.
          </motion.p>

          {/* Status Bar */}
          <div className="mt-8 inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-[#0c0c0e]/90 border border-white/10 text-xs text-gray-300 backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">All Systems Operational</span>
            <span className="text-gray-500">|</span>
            <span className="text-gray-400">99.998% Uptime (Last 30 Days)</span>
          </div>
        </section>

        {/* ================= SECURITY PILLARS ================= */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#EFFC76] uppercase tracking-widest bg-white/5 border border-white/10 px-3.5 py-1 rounded-full">
              DEFENSE IN DEPTH
            </span>
            <h2 className="text-3xl font-bold text-white tracking-tight mt-3">
              6 Core Pillars of JEVXO Security
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityPillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="p-6 rounded-2xl bg-[#0c0c0e]/90 border border-white/10 hover:border-[#EFFC76]/40 transition-all backdrop-blur-md group"
              >
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[#EFFC76] w-fit mb-5 group-hover:bg-[#EFFC76] group-hover:text-black transition-colors">
                  <pillar.icon size={22} />
                </div>
                <h3 className="text-white font-bold text-base mb-2">{pillar.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed font-light">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= COMPLIANCE & CERTIFICATIONS ================= */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#EFFC76] uppercase tracking-widest bg-white/5 border border-white/10 px-3.5 py-1 rounded-full">
              GLOBAL COMPLIANCE
            </span>
            <h2 className="text-3xl font-bold text-white tracking-tight mt-3">
              Certified Standards & Accreditations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, idx) => (
              <motion.div
                key={cert.code}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="p-6 rounded-2xl bg-[#0d0d10]/95 border border-white/10 hover:border-[#EFFC76]/50 transition-all backdrop-blur-md flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold text-[#EFFC76]">{cert.code}</span>
                    <span className="text-[9px] font-bold uppercase bg-white/10 text-gray-300 border border-white/10 px-2 py-0.5 rounded-full">
                      {cert.badge}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white">{cert.title}</h4>
                  <p className="text-gray-400 text-xs font-light leading-relaxed">{cert.description}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center gap-1.5 text-xs text-[#EFFC76] font-semibold">
                  <CheckCircle2 size={13} />
                  <span>Audit Verified</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= VULNERABILITY DISCLOSURE CTA ================= */}
        <section className="bg-gradient-to-r from-indigo-950/20 via-[#0d0d10] to-slate-900/40 border border-white/10 rounded-3xl p-10 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <span className="text-xs uppercase font-bold tracking-widest text-[#EFFC76] bg-[#EFFC76]/10 border border-[#EFFC76]/20 px-4 py-1 rounded-full inline-block">
              RESPONSIBLE DISCLOSURE
            </span>
            <h2 className="text-3xl font-bold text-white">
              Found a Security Concern or Bug?
            </h2>
            <p className="text-gray-300 text-sm font-light leading-relaxed">
              We work closely with independent cybersecurity researchers to keep our software ecosystem safe. Report vulnerabilities directly to our security team.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setIsReportModalOpen(true)}
                className="inline-flex items-center gap-2 bg-[#EFFC76] text-black font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full hover:bg-[#EFFC76]/90 transition-all shadow-[0_10px_25px_rgba(239,252,118,0.2)]"
              >
                <AlertCircle size={15} />
                <span>Submit Security Report</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* ================= SECURITY REPORT MODAL ================= */}
      <AnimatePresence>
        {isReportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 overflow-y-auto pt-10 pb-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsReportModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              className="relative w-full max-w-lg bg-[#0d0d10] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_30px_70px_rgba(0,0,0,0.9)] z-10 overflow-hidden my-auto"
            >
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>

              <div className="mb-5 space-y-1 text-center">
                <h3 className="text-xl font-bold text-white flex items-center justify-center gap-2">
                  <ShieldCheck className="text-[#EFFC76]" size={20} />
                  <span>Submit Security Incident / Bug Report</span>
                </h3>
                <p className="text-xs text-gray-400 font-light">
                  Encrypted communication directly to JEVXO Security Operations Center
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
                  <h4 className="text-lg font-bold text-white">Report Received!</h4>
                  <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">
                    Our SecOps team will evaluate your submission and contact you within 6 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">
                      Researcher Name / Handle *
                    </label>
                    <input
                      type="text"
                      required
                      value={reportForm.name}
                      onChange={(e) => setReportForm({ ...reportForm, name: e.target.value })}
                      placeholder="e.g. Alex (Bug Hunter)"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#EFFC76] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">
                        Contact Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={reportForm.email}
                        onChange={(e) => setReportForm({ ...reportForm, email: e.target.value })}
                        placeholder="security@researcher.com"
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#EFFC76] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">
                        Estimated Severity *
                      </label>
                      <select
                        value={reportForm.severity}
                        onChange={(e) => setReportForm({ ...reportForm, severity: e.target.value })}
                        className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#EFFC76] transition-colors"
                      >
                        <option value="Low">Low (Informational)</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1.5 tracking-wider">
                      Vulnerability Details / Reproduction Steps *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={reportForm.details}
                      onChange={(e) => setReportForm({ ...reportForm, details: e.target.value })}
                      placeholder="Provide endpoint details, steps to reproduce, or proof-of-concept..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#EFFC76] transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#EFFC76] text-black font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl hover:bg-[#EFFC76]/90 transition-all shadow-[0_5px_15px_rgba(239,252,118,0.2)] mt-2"
                  >
                    <span>Submit Security Report</span>
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

export default SecurityPage;
