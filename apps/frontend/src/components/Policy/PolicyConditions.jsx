"use client";
import React from "react";
import { motion } from "framer-motion";

const PolicyConditions = () => {
  const sections = [
    {
      title: "1. Information We Collect",
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="text-white font-bold mb-2 text-base">Personal & Enterprise Information</h4>
            <p className="text-gray-300 text-sm font-light leading-relaxed">
              We collect corporate contact details such as name, business email address, phone number, and transaction records to provision services, provide 24/7 technical support, and offer personalized software experiences.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-2 text-base">Device & Telemetry Data</h4>
            <p className="text-gray-300 text-sm font-light leading-relaxed">
              We gather non-sensitive interaction telemetry, including IP address ranges, device operating system types, browser fingerprints, and API performance benchmarks to maintain zero-downtime cluster performance.
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "2. How We Use Your Information",
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 text-sm font-light leading-relaxed">
            We process data strictly to fulfill enterprise platform operations:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm ml-2 font-light">
            <li><span className="text-white font-semibold">Service Delivery:</span> Providing cloud instances, API endpoints, and real-time dashboard analytics.</li>
            <li><span className="text-white font-semibold">Security & Audit:</span> Monitoring threat telemetry, preventing unauthorized access, and maintaining SOC 2 compliance.</li>
            <li><span className="text-white font-semibold">Customer Support:</span> Assisting engineering teams with SLA response guarantees.</li>
          </ul>
        </div>
      ),
    },
    {
      title: "3. Data Protection & Zero-Trust Security",
      content: (
        <p className="text-gray-300 text-sm font-light leading-relaxed">
          We implement AES-256 bit payload encryption at rest and TLS 1.3 encryption in transit. JEVXO never sells, rents, or monetizes client data to third-party advertisers.
        </p>
      ),
    },
    {
      title: "4. Your Data Rights & Contact",
      content: (
        <div className="space-y-4">
          <p className="text-gray-300 text-sm font-light leading-relaxed">
            Enterprise clients hold complete rights to request data exports, logical data deletion, or access control audits by contacting <a href="mailto:support@jevxo.com" className="text-[#EFFC76] underline font-semibold">support@jevxo.com</a>.
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
          <span className="bg-[#EFFC76] text-black px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-extrabold">PRIVACY</span>
          <span>Privacy Policy</span>
        </motion.div>

        {/* Updated Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-400 font-mono text-xs mb-12"
        >
          Last Updated: Jan 2026 | JEVXO Data Protection Office
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

export default PolicyConditions;
