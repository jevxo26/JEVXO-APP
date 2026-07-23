"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const WhoWeAre = () => {
  return (
    <section className="py-20 bg-transparent text-white relative overflow-hidden select-none">
      <div className="w-10/12 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Images Composition */}
          <div className="lg:col-span-6 relative flex items-center justify-start min-h-[520px] md:min-h-[600px]">
            
            {/* Main Black & White Tall Image Card */}
            <motion.div
              initial={{ opacity: 0, x: -40, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.02 }}
              className="relative w-9/12 h-[480px] md:h-[560px] rounded-[36px] overflow-hidden border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.9)] ml-auto group"
            >
              <Image
                src="/who-we-are-main.png"
                alt="JEVXO Team Working"
                fill
                className="object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Overlay Small Vibrant Image Card (Bottom Left) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.05, rotate: -1 }}
              className="absolute left-0 -bottom-4 w-6/12 h-[260px] md:h-[300px] rounded-[28px] overflow-hidden border-2 border-[#EFFC76]/50 shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_25px_rgba(239,252,118,0.2)] z-20 group"
            >
              <Image
                src="/who-we-are-small.png"
                alt="Team Celebration"
                fill
                className="object-cover group-hover:scale-108 transition-transform duration-700"
              />
            </motion.div>
          </div>

          {/* Right Side: Text & Metrics Content */}
          <div className="lg:col-span-6 flex flex-col items-start text-left lg:pl-6">
            
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#EFFC76]/30 bg-[#EFFC76]/10 text-[#EFFC76] text-xs font-mono font-bold uppercase tracking-[0.25em] shadow-[0_0_15px_rgba(239,252,118,0.2)]">
                <span className="w-2 h-2 rounded-full bg-[#EFFC76] animate-pulse" />
                WHO WE ARE
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6"
            >
              We craft digital experiences <br />
              <span className="font-serif italic font-normal text-[#EFFC76]">that excite & inspire</span>
            </motion.h2>

            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-gray-300 text-sm sm:text-base leading-relaxed font-light mb-10 max-w-xl"
            >
              We are a team of creative minds dedicated to transforming brands. From strategy to execution, we bring your vision to life with modern technology and neon aesthetics.
            </motion.p>

            {/* Divider Line */}
            <div className="w-full h-[1px] bg-white/10 mb-10" />

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-3 gap-6 w-full mb-10"
            >
              <motion.div whileHover={{ y: -4 }}>
                <p className="text-3xl md:text-4xl font-black text-white tracking-tight">5+</p>
                <p className="text-gray-400 text-xs mt-1 font-medium">Years Experience</p>
              </motion.div>

              <motion.div whileHover={{ y: -4 }}>
                <p className="text-3xl md:text-4xl font-black text-[#EFFC76] tracking-tight">120+</p>
                <p className="text-gray-400 text-xs mt-1 font-medium">Projects Done</p>
              </motion.div>

              <motion.div whileHover={{ y: -4 }}>
                <p className="text-3xl md:text-4xl font-black text-white tracking-tight">50+</p>
                <p className="text-gray-400 text-xs mt-1 font-medium">Happy Clients</p>
              </motion.div>
            </motion.div>

            {/* Link: Read Our Story */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[#EFFC76] font-extrabold text-sm hover:text-white border-b-2 border-[#EFFC76] hover:border-white pb-1 transition-all group"
              >
                <span>Read Our Story</span>
                <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
