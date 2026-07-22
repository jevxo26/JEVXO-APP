"use client";
import React from "react";
import { motion } from "framer-motion";
import { Award, Users, CheckCircle2, Globe2 } from "lucide-react";

const stats = [
  {
    icon: CheckCircle2,
    value: "150+",
    label: "Projects Delivered",
    description: "Enterprise software, SaaS & Mobile apps",
  },
  {
    icon: Users,
    value: "99.9%",
    label: "Client Satisfaction",
    description: "Verified reviews & long-term retention",
  },
  {
    icon: Globe2,
    value: "20+",
    label: "Countries Served",
    description: "Global enterprise & startup partners",
  },
  {
    icon: Award,
    value: "24/7",
    label: "Dedicated Support",
    description: "Real-time monitoring & maintenance",
  },
];

const Stats = () => {
  return (
    <section className="py-20 px-4 md:px-8 relative overflow-hidden bg-transparent border-y border-white/5">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#0a0a0c]/60 border border-white/10 rounded-2xl p-6 text-center hover:border-[#EFFC76]/30 transition-all backdrop-blur-sm"
            >
              <div className="inline-flex p-3 rounded-full bg-white/5 border border-white/10 text-[#EFFC76] mb-4">
                <stat.icon size={24} />
              </div>
              <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
                {stat.value}
              </h3>
              <p className="text-lg font-semibold text-gray-200 mb-1">
                {stat.label}
              </p>
              <p className="text-xs text-gray-400 font-light">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
