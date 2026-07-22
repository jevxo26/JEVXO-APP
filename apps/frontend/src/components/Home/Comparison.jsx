"use client";
import React from "react";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import ComparisonItem from "./ComparisonItem";

const Comparison = () => {
  return (
    <section className="bg-transparent py-20 md:-mt-22 -mt-25 px-4 md:px-8 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-wider text-[#EFFC76] mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#EFFC76] animate-pulse" />
            Comparison Matrix
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-medium text-white tracking-tight"
          >
            JEVXO Advantage,{" "}
            <span className="font-serif italic text-[#EFFC76]">
              See The Difference
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto font-light"
          >
            Compare traditional agencies vs JEVXO's agile, AI-powered enterprise software execution.
          </motion.p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-6 md:gap-12 relative">
          {/* The Rest */}
          <div className="bg-[#111]  rounded-[22px] p-4 md:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-red-500/5 to-transparent pointer-events-none opacity-50"></div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2,
                  },
                },
              }}
              className="space-y-5 md:space-y-6 relative z-10 h-full flex flex-col justify-center"
            >
              <ComparisonItem
                icon={X}
                color="text-red-500"
                bg="bg-red-500/10"
                text="Generic Solutions"
              />
              <ComparisonItem
                icon={X}
                color="text-red-500"
                bg="bg-red-500/10"
                text="Cookie-cutter Designs"
              />
              <ComparisonItem
                icon={X}
                color="text-red-500"
                bg="bg-red-500/10"
                text="Lack of Support"
              />
              <ComparisonItem
                icon={X}
                color="text-red-500"
                bg="bg-red-500/10"
                text="Hidden Costs"
              />
              <ComparisonItem
                icon={X}
                color="text-red-500"
                bg="bg-red-500/10"
                text="Short-Term Relevance"
              />
            </motion.div>
          </div>

          {/* JEVXO - Elevated Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative bg-[#0A0A0A] rounded-[22px]   overflow-hidden group"
          >
            {/* Glowing Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#EFFC76]/20 via-transparent to-transparent opacity-50 pointer-events-none"></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#EFFC76] to-transparent opacity-70"></div>

            {/* Inner Gradient */}
            <div className="absolute top-0 right-0 w-full h-[500px] bg-gradient-to-b from-[#EFFC76]/5 to-transparent pointer-events-none"></div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.4,
                  },
                },
              }}
              className="relative z-10  space-y-4 md:space-y-6  p-4 md:p-10 h-full f8ex flex-col justify-center"
            >
              <ComparisonItem
                icon={Check}
                color="text-white"
                iconColor="text-black"
                bg="bg-[#EFFC76]"
                text="AI-Driven Design"
                isPremium
              />
              <ComparisonItem
                icon={Check}
                color="text-white"
                iconColor="text-black"
                bg="bg-[#EFFC76]"
                text="Premium, Minimal Aesthetic"
                isPremium
              />
              <ComparisonItem
                icon={Check}
                color="text-white"
                iconColor="text-black"
                bg="bg-[#EFFC76]"
                text="Performance Optimized"
                isPremium
              />
              <ComparisonItem
                icon={Check}
                color="text-white"
                iconColor="text-black"
                bg="bg-[#EFFC76]"
                text="Future-Proof Technology"
                isPremium
              />
              <ComparisonItem
                icon={Check}
                color="text-white"
                iconColor="text-black"
                bg="bg-[#EFFC76]"
                text="Unmatched Flexibility"
                isPremium
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;
