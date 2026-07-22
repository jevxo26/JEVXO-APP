"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  SiJavascript,
  SiNextdotjs,
  SiNestjs,
  SiTailwindcss,
  SiDocker,
  SiGo,
  SiGit,
  SiTerraform,
  SiReact,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { Puzzle } from "lucide-react";
import SmoothButton from "@/Share/SmoothButton";

const Integration = () => {
  // Brand icons for technology stack
  const integrationIcons = [
    { icon: SiJavascript, color: "bg-[#F7DF1E]", iconColor: "text-black" }, // JS
    { icon: SiNextdotjs, color: "bg-white", iconColor: "text-black" }, // Next.js
    { icon: SiNestjs, color: "bg-[#E0234E]", iconColor: "text-white" }, // Nest.js
    { icon: SiTailwindcss, color: "bg-[#06B6D4]", iconColor: "text-white" }, // Tailwind
    { icon: SiDocker, color: "bg-[#2496ED]", iconColor: "text-white" }, // Docker
    { icon: SiGo, color: "bg-[#00ADD8]", iconColor: "text-white" }, // Golang
    { icon: FaAws, color: "bg-[#232F3E]", iconColor: "text-[#FF9900]" }, // AWS
    {
      icon: SiGit,
      color: "bg-[#F05032]",
      iconColor: "text-white",
      isMain: true,
    }, // Git (Main)
    { icon: SiTerraform, color: "bg-[#7B42BC]", iconColor: "text-white" }, // Terraform
    { icon: SiReact, color: "bg-[#61DAFB]", iconColor: "text-black" }, // React
  ];

  return (
    <section className="-mt-30 md:-mt-17  py-24 px-4 overflow-hidden relative">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-wider text-[#EFFC76] mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#EFFC76] animate-pulse" />
            Integrations & Workflows
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-medium text-white tracking-tight"
          >
            Seamless Ecosystem{" "}
            <span className="font-serif italic text-[#EFFC76]">
              Integrations
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto font-light"
          >
            Connect JEVXO platforms seamlessly with your existing enterprise toolchains, APIs, and cloud services.
          </motion.p>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-20"
        >
          <SmoothButton> View About JEVXO </SmoothButton>
        </motion.div>

        {/* Icons Row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-wrap justify-center items-center gap-4 md:gap-8"
        >
          {integrationIcons.map((item, index) => {
            const Icon = item.icon;
            const isMain = item.isMain;

            return (
              <motion.div
                key={index}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.5 + index * 0.05,
                }}
                whileHover={{ scale: 1.1 }}
                className={`
                                    relative rounded-full flex items-center justify-center transition-all duration-300
                                    ${
                                      isMain
                                        ? "w-20 h-20 shadow-[0_0_40px_rgba(240,80,50,0.6)] z-20 scale-110"
                                        : "w-12 h-12 md:w-14 md:h-14 opacity-80 hover:opacity-100 grayscale-[50%] hover:grayscale-0"
                                    }
                                    ${item.color}
                                `}
              >
                {/* Main Icon Ring Effect */}
                {isMain && (
                  <div className="absolute inset-0 rounded-full border-4 border-[#F05032]/30 animate-pulse" />
                )}

                <Icon
                  className={`${isMain ? "w-8 h-8" : "w-6 h-6"} ${
                    item.iconColor
                  }`}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Integration;
