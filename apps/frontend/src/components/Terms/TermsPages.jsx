"use client";

import React from "react";
import { motion } from "framer-motion";

const TermsPages = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: (
        <p className="text-gray-300 text-sm leading-relaxed font-light">
          By using JEVXO platform and services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions, as well as our Privacy Policy. These terms apply to all users of the platform, including visitors, registered users, enterprise partners, and clients.
        </p>
      ),
    },
    {
      title: "2. Use of Services",
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 text-sm leading-relaxed font-light">
            To ensure the platform operates smoothly and legally, we require users to adhere to certain rules and conditions regarding access and use of JEVXO software and cloud services:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm ml-2 font-light">
            <li>
              <span className="text-white font-semibold">Eligibility:</span> You must be at least 18 years of age or possess corporate legal capacity to use JEVXO enterprise solutions.
            </li>
            <li>
              <span className="text-white font-semibold">Account Security:</span> You are responsible for maintaining the confidentiality of your account authentication tokens and credentials.
            </li>
            <li>
              <span className="text-white font-semibold">Prohibited Activities:</span> You agree not to misuse JEVXO infrastructure, including unauthorized access attempts, reverse-engineering, or uploading malicious payloads.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "3. User Data & Intellectual Property",
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 text-sm leading-relaxed font-light">
            JEVXO respects your data rights and proprietary corporate data:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm ml-2 font-light">
            <li>
              <span className="text-white font-semibold">Data Ownership:</span> Clients retain full ownership of all data uploaded or processed through JEVXO platforms.
            </li>
            <li>
              <span className="text-white font-semibold">Platform IP:</span> JEVXO's underlying software, algorithms, design systems, and trademarks remain the exclusive intellectual property of JEVXO.
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: "4. Uptime & SLA Guarantees",
      content: (
        <p className="text-gray-300 text-sm leading-relaxed font-light">
          JEVXO provides enterprise clients with a 99.99% cloud uptime SLA. Planned maintenance schedules are announced at least 48 hours in advance through our dedicated Trust Center.
        </p>
      ),
    },
    {
      title: "5. Contact & Support",
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 text-sm leading-relaxed font-light">
            For questions or inquiries regarding these Terms & Conditions, please reach out to our legal compliance team at <a href="mailto:support@jevxo.com" className="text-[#EFFC76] underline">support@jevxo.com</a>.
          </p>
        </div>
      ),
    },
  ];

  return (
    <section className="bg-transparent min-h-screen py-24 relative overflow-hidden select-none">
      <div className="w-10/12 mx-auto relative z-10">
        
        {/* Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFFC76]/10 border border-[#EFFC76]/30 text-xs font-mono font-bold text-[#EFFC76] mb-8"
        >
          <span className="bg-[#EFFC76] text-black px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-extrabold">LEGAL</span>
          <span>Terms & Conditions</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 tracking-tight uppercase"
        >
          Terms & <span className="font-serif italic font-normal text-[#EFFC76] lowercase">Conditions</span>
        </motion.h1>

        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-gray-400 font-mono text-xs mb-16"
        >
          Last Updated: Jan 2026 | JEVXO Legal Compliance
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-12 max-w-4xl">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#051105]/92 border border-[#EFFC76]/20 rounded-3xl p-7 sm:p-8 backdrop-blur-2xl"
            >
              <h2 className="text-2xl font-black text-[#EFFC76] mb-4 tracking-tight">
                {section.title}
              </h2>
              {section.content}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TermsPages;