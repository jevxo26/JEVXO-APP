"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, MessageSquare, ArrowUpRight, CheckCircle2 } from "lucide-react";
import AppointmentModal from "@/components/Home/AppointmentModal";

const faqs = [
  {
    id: "01",
    question: "What core services does JEVXO specialize in?",
    answer:
      "We provide a full-spectrum digital solution including Custom Web Application Development (Next.js, React), Mobile App Development (iOS & Android), UI/UX Design, Cloud Infrastructure & DevOps, and SEO Performance Marketing.",
    highlights: ["Custom Web & Mobile Apps", "Cloud Infrastructure & DevOps", "UI/UX & Branding Design"],
  },
  {
    id: "02",
    question: "How long does a typical software project take?",
    answer:
      "Timelines depend on project scope. A standard landing page or brand website takes 1-2 weeks, while complex full-stack web platforms and custom mobile apps typically range from 4 to 8 weeks with agile milestone delivery.",
    highlights: ["1-2 Weeks for Brand Websites", "4-8 Weeks for Full-Stack Apps", "Weekly Sprint Demos"],
  },
  {
    id: "03",
    question: "What is your development and design workflow?",
    answer:
      "Our workflow follows 4 agile phases: 1) Discovery & Architecture, 2) Interactive UI/UX Prototyping, 3) High-Performance Development & QA Testing, and 4) Production Launch with 24/7 Monitoring.",
    highlights: ["Agile 4-Phase Roadmap", "Interactive Prototypes", "Rigorous QA Testing"],
  },
  {
    id: "04",
    question: "Do you provide post-launch maintenance & support?",
    answer:
      "Yes! We build long-term relationships and offer comprehensive post-launch support packages, including server monitoring, security updates, feature enhancements, and 24/7 emergency technical assistance.",
    highlights: ["24/7 Emergency Assistance", "Automated Backups & Patches", "SLA-Backed Performance"],
  },
  {
    id: "05",
    question: "Can you help migrate our legacy systems to the Cloud?",
    answer:
      "Absolutely. Our DevOps specialists migrate legacy monoliths to modern scalable cloud environments (Google Cloud, AWS) using Docker, Kubernetes, and optimized microservice architectures.",
    highlights: ["Zero-Downtime Migration", "GCP & AWS Cloud Native", "Docker & Kubernetes"],
  },
  {
    id: "06",
    question: "How are project payments and milestones structured?",
    answer:
      "We operate on a transparent milestone model: 30% deposit upon kickoff, 40% after mid-project prototype approval, and 30% upon final production delivery and code handover.",
    highlights: ["Transparent Milestone Model", "No Hidden Fees", "Full IP & Source Code Ownership"],
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(0); // Default open first item
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <section className="py-24 text-white relative overflow-hidden select-none">
        
        {/* Background Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[520px] bg-[#EFFC76]/6 rounded-full blur-[200px] pointer-events-none" />

        <div className="w-10/12 mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* ── LEFT COLUMN: TITLE & EXECUTIVE CONTACT CARD (5 COLS) ── */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-8">
              <div>
                {/* Section Badge */}
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#EFFC76]/30 bg-[#EFFC76]/10 text-[#EFFC76] text-xs font-mono font-bold uppercase tracking-[0.25em] mb-4 shadow-[0_0_15px_rgba(239,252,118,0.2)]"
                >
                  <span className="w-2 h-2 rounded-full bg-[#EFFC76] animate-pulse" />
                  FREQUENTLY ASKED QUESTIONS
                </motion.div>

                {/* Section Headline */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                  className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4"
                >
                  Got Questions?{" "}
                  <span className="italic font-serif text-[#EFFC76] font-normal">
                    We've Got Answers
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className="text-gray-400 text-sm sm:text-base font-light leading-relaxed"
                >
                  Find answers to common inquiries about our software development process, project timelines, pricing structure, and technology stack.
                </motion.p>
              </div>

              {/* Executive Glassmorphic Contact Card with Top Glow Accent Line */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="bg-[#051105]/95 backdrop-blur-2xl border border-[#EFFC76]/45 rounded-3xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_30px_rgba(239,252,118,0.15)] relative overflow-hidden group hover:border-[#EFFC76] transition-all duration-500"
              >
                {/* Glowing Top Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#EFFC76] to-transparent opacity-80" />

                <div className="flex items-center gap-3 mb-3 text-[#EFFC76]">
                  <div className="p-3 rounded-2xl bg-[#EFFC76]/15 border border-[#EFFC76]/40 shadow-[0_0_15px_rgba(239,252,118,0.2)]">
                    <MessageSquare size={22} className="stroke-[2.2]" />
                  </div>
                  <div>
                    <h4 className="text-white font-extrabold text-base sm:text-lg">Still Have Questions?</h4>
                    <span className="text-[#EFFC76] text-[10px] font-mono font-semibold uppercase tracking-wider">Direct Assistance</span>
                  </div>
                </div>

                <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed mb-6">
                  Can't find the answer you're looking for? Reach out to our engineering team for immediate guidance.
                </p>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-[#EFFC76] hover:bg-[#f3ff8c] text-black font-extrabold text-xs sm:text-sm py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_25px_rgba(239,252,118,0.5)]"
                >
                  <span>Ask A Question</span>
                  <ArrowUpRight size={18} className="stroke-[2.5]" />
                </motion.button>
              </motion.div>
            </div>

            {/* ── RIGHT COLUMN: ULTRA-MODERN GLASS ACCORDION DECK (7 COLS) ── */}
            <div className="lg:col-span-7 space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = activeIndex === index;

                return (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "bg-[#091e09]/95 backdrop-blur-2xl border-[#EFFC76] shadow-[0_0_30px_rgba(239,252,118,0.25)]"
                        : "bg-[#050f05]/90 backdrop-blur-xl border-[#EFFC76]/25 hover:border-[#EFFC76]/70 hover:bg-[#071707] hover:shadow-[0_0_20px_rgba(239,252,118,0.15)]"
                    }`}
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full flex items-center justify-between p-5 sm:p-6 text-left cursor-pointer group gap-4"
                    >
                      <div className="flex items-center gap-3 sm:gap-4">
                        {/* Number Badge */}
                        <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg border transition-all ${
                          isOpen
                            ? "bg-[#EFFC76] text-black border-[#EFFC76] font-black"
                            : "bg-[#EFFC76]/10 text-[#EFFC76] border-[#EFFC76]/30 group-hover:border-[#EFFC76]"
                        }`}>
                          {faq.id}
                        </span>

                        <span className={`text-sm sm:text-base font-bold tracking-tight transition-colors ${
                          isOpen ? "text-[#EFFC76]" : "text-white group-hover:text-[#EFFC76]"
                        }`}>
                          {faq.question}
                        </span>
                      </div>

                      {/* Icon Toggle Indicator */}
                      <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? "bg-[#EFFC76] text-black shadow-[0_0_15px_rgba(239,252,118,0.5)] rotate-180"
                          : "border border-[#EFFC76]/30 bg-[#0d1f0d] text-[#EFFC76] group-hover:border-[#EFFC76] group-hover:bg-[#EFFC76] group-hover:text-black"
                      }`}>
                        {isOpen ? <Minus size={16} className="stroke-[3]" /> : <Plus size={16} className="stroke-[2.5]" />}
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: "easeInOut" }}
                        >
                          <div className="px-5 sm:px-6 pb-6 text-gray-300 text-xs sm:text-sm font-light leading-relaxed border-t border-[#EFFC76]/20 pt-4 mt-1">
                            <p className="mb-4 text-gray-300 leading-relaxed">{faq.answer}</p>
                            
                            {/* Key Highlights Bullet Points */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                              {faq.highlights.map((item, hIdx) => (
                                <div key={hIdx} className="flex items-center gap-2 bg-[#EFFC76]/10 border border-[#EFFC76]/25 rounded-xl px-3 py-2 text-[11px] font-mono text-[#EFFC76]">
                                  <CheckCircle2 size={13} className="shrink-0 text-[#EFFC76]" />
                                  <span className="truncate">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* Contact / Appointment Modal */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Faq;
