"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Rocket, ArrowUpRight } from "lucide-react";

const Banner = () => {
  return (
    <div className="min-h-screen text-white overflow-hidden bg-transparent select-none">
      <section className="relative min-h-screen flex items-center">
        
        {/* Ambient Top & Center Radial Glows for Deep Atmosphere */}
        <div className="absolute -top-20 left-1/4 w-[600px] h-[500px] bg-[#EFFC76]/8 rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#EFFC76]/5 rounded-full blur-[180px] pointer-events-none" />

        <div className="relative z-10 w-10/12 mx-auto pt-32 sm:pt-36 lg:pt-40 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center">

            {/* ── LEFT COLUMN (TEXT & HEADLINE) ── */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">

              {/* Available Badge with Pulse Glow */}
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#EFFC76]/30 bg-[#EFFC76]/10 text-[#EFFC76] text-xs sm:text-sm font-mono font-bold uppercase tracking-[0.25em] mb-6 shadow-[0_0_20px_rgba(239,252,118,0.2)]"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#EFFC76] animate-pulse" />
                <span>AVAILABLE FOR NEW PROJECTS</span>
              </motion.div>

              {/* Main Headline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="mb-8"
              >
                <h1 className="text-[3.5rem] sm:text-[4.8rem] md:text-[5.8rem] lg:text-[6.4rem] font-black leading-[0.9] tracking-tight text-white uppercase">
                  BUILD.
                  <br />
                  DESIGN.
                </h1>
                <div className="mt-2">
                  <span className="font-serif italic text-[#EFFC76] text-[3rem] sm:text-[4.2rem] md:text-[5rem] lg:text-[5.6rem] font-normal lowercase tracking-normal">
                    that's
                  </span>
                  <br />
                  <span className="text-[#EFFC76] text-[2.6rem] sm:text-[3.8rem] md:text-[4.2rem] lg:text-[4.8rem] font-black uppercase tracking-tight leading-[0.9] drop-shadow-[0_0_25px_rgba(239,252,118,0.3)]">
                    JEVXO AGENCY
                  </span>
                </div>
              </motion.div>

              {/* Description with Left Border Line */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="border-l-2 border-[#EFFC76]/40 pl-5 mb-10 max-w-lg"
              >
                <p className="text-gray-300 text-sm sm:text-base md:text-lg font-light leading-relaxed">
                  We are a creative agency focused on branding, web design, and digital marketing solutions. Let's build something unique together.
                </p>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex items-center gap-4"
              >
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-[#EFFC76] hover:bg-[#f3ff8c] text-black rounded-full text-sm font-extrabold flex items-center gap-2 transition-all duration-300 shadow-[0_0_30px_rgba(239,252,118,0.5)]"
                  >
                    <span>Get Started</span>
                    <ArrowUpRight size={18} className="stroke-[2.5]" />
                  </motion.button>
                </Link>
                <Link href="/case-studies">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-[#081808]/80 border border-[#EFFC76]/30 text-white rounded-full text-sm font-semibold hover:border-[#EFFC76] hover:bg-white/10 transition-all duration-300 backdrop-blur-xl"
                  >
                    View Our Work
                  </motion.button>
                </Link>
              </motion.div>

            </div>

            {/* ── RIGHT COLUMN (STUDIO IMAGE & FLOATING METRIC CARDS) ── */}
            <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end mt-12 lg:mt-0">
              <div className="relative w-full max-w-[420px] lg:max-w-[460px]">

                {/* Main Photo Card with Studio Lighting Frame */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="relative rounded-[36px] overflow-hidden border border-[#EFFC76]/30 shadow-[0_25px_60px_rgba(0,0,0,0.9)] bg-[#091209] hover:border-[#EFFC76]/60 transition-all duration-500 group"
                >
                  <Image
                    src="/hero-team.png"
                    alt="JEVXO Team Studio"
                    width={460}
                    height={540}
                    className="object-cover w-full h-[400px] sm:h-[460px] lg:h-[500px] grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#040a04] via-transparent to-transparent pointer-events-none" />
                </motion.div>

                {/* Floating Badge Left-Gap: 98% PROJECT SUCCESS */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                  className="absolute -left-16 sm:-left-24 lg:-left-28 top-[24%] bg-[#081808]/92 backdrop-blur-2xl border border-[#EFFC76]/35 rounded-2xl p-4 sm:p-5 shadow-[0_20px_40px_rgba(0,0,0,0.95)] min-w-[150px] z-30 pointer-events-none"
                >
                  <p className="text-white text-3xl sm:text-4xl font-black italic tracking-tight">98%</p>
                  <p className="text-[#EFFC76] text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider mt-1">PROJECT SUCCESS</p>
                  <div className="flex gap-1 mt-2.5">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-3.5 h-1.5 rounded-full bg-[#EFFC76]" />
                    ))}
                  </div>
                </motion.div>

                {/* Floating Badge Bottom-Right: 250+ HAPPY CLIENTS */}
                <motion.div
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.8 }}
                  className="absolute -right-4 sm:-right-8 bottom-12 bg-[#081808]/92 backdrop-blur-2xl border border-[#EFFC76]/35 rounded-2xl p-3.5 sm:p-4 shadow-[0_20px_40px_rgba(0,0,0,0.95)] z-30"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="w-7 h-7 rounded-full bg-[#1e2e1e] border border-[#EFFC76]/40 flex items-center justify-center text-[9px] text-[#EFFC76] font-bold">U1</div>
                      <div className="w-7 h-7 rounded-full bg-[#2a3e2a] border border-[#EFFC76]/40 flex items-center justify-center text-[9px] text-[#EFFC76] font-bold">U2</div>
                      <div className="w-7 h-7 rounded-full bg-[#364e36] border border-[#EFFC76]/40 flex items-center justify-center text-[9px] text-[#EFFC76] font-bold">U3</div>
                    </div>
                    <div>
                      <p className="text-white text-base font-extrabold">250+</p>
                      <p className="text-[#EFFC76] text-[9px] font-mono font-semibold uppercase tracking-wider">HAPPY CLIENTS</p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Pill Bottom-Left: 🚀 5+ YEARS EXP. */}
                <motion.div
                  initial={{ opacity: 0, y: 25, rotate: -3 }}
                  animate={{ opacity: 1, y: 0, rotate: -3 }}
                  transition={{ duration: 0.7, delay: 1 }}
                  className="absolute -left-4 sm:-left-8 -bottom-4 bg-[#EFFC76] text-black rounded-full px-6 py-3 shadow-[0_10px_30px_rgba(239,252,118,0.45)] flex items-center gap-2 border border-black/10 z-30 whitespace-nowrap"
                >
                  <Rocket size={18} className="fill-black text-black" />
                  <span className="text-xs font-black uppercase tracking-wider">5+ YEARS EXP.</span>
                </motion.div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
