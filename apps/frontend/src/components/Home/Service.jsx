"use client";
import React from "react";
import ServiceCard from "./ServiceCard";
import {
  Brain,
  MessageSquare,
  LineChart,
  ScanFace,
  Mic,
  LayoutGrid,
  PenTool,
  Shield,
  Monitor,
  BarChart,
  Database,
  UserPen,
  Globe,
  Code,
  Cloud,
  Smartphone,
  TrendingUp,
  Palette,
} from "lucide-react";
import { motion } from "framer-motion";
import SmoothButton from "@/Share/SmoothButton";
import { servicesData } from "@/constants/services";
import { useQuery } from "@/hooks/useApi";

const Service = () => {
  const bottomTags = [
    { name: "Content Strategy", icon: PenTool },
    { name: "Cybersecurity", icon: Shield },
    { name: "SEO Optimization", icon: Monitor },
    { name: "Data Insight", icon: BarChart },
    { name: "Analytics", icon: LineChart },
    { name: "Branding", icon: UserPen },
    { name: "Database Design", icon: Database },
    { name: "Lead Generation", icon: Globe },
  ];

  const { data, isLoading, isError } = useQuery(`/our-service`);
  console.log("Services", data);

  return (
    <section className="bg-transparent py-20 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-wider text-[#EFFC76] mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#EFFC76] animate-pulse" />
            Our Expertise
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-medium text-white tracking-tight"
          >
            Comprehensive Services For{" "}
            <span className="font-serif italic text-[#EFFC76]">
              Digital Excellence
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto font-light"
          >
            From custom Web & Mobile apps to Enterprise Cloud Infrastructure, we craft solutions tailored to scale your vision.
          </motion.p>

          <div className="mt-8">
            <SmoothButton>Book an Appointment</SmoothButton>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} {...service} delay={index * 0.1} />
          ))}
        </div>

        {/* Bottom Tags */}
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {bottomTags.map((tag, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.05 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#EFFC76]/50 hover:bg-white/10 transition-all cursor-default"
            >
              <div className="p-1 rounded-full bg-[#EFFC76]/20 text-[#EFFC76]">
                <tag.icon size={14} />
              </div>
              <span className="text-gray-300 text-sm">{tag.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
