"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Rocket } from "lucide-react";

const Banner = () => {
  return (
    <div className="min-h-screen text-white overflow-hidden bg-transparent">
      <section className="relative min-h-screen flex items-center">
        <div className="relative z-10 w-10/12 mx-auto pt-20 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">

            {/* ── LEFT COLUMN (TEXT) ── */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">

              {/* Available Badge */}
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 mb-6"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#EFFC76] animate-pulse" />
                <span className="text-[#EFFC76] text-xs md:text-sm font-semibold uppercase tracking-[0.25em]">
                  AVAILABLE FOR NEW PROJECTS
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="mb-8"
              >
                <h1 className="text-[3.8rem] sm:text-[5rem] md:text-[6.2rem] lg:text-[6.8rem] font-black leading-[0.9] tracking-tight text-white uppercase">
                  BUILD.
                  <br />
                  DESIGN.
                </h1>
                <div className="mt-2">
                  <span className="font-serif italic text-white text-[3rem] sm:text-[4.2rem] md:text-[5.2rem] lg:text-[5.8rem] font-normal lowercase tracking-normal">
                    that's
                  </span>
                  <br />
                  <span className="text-[#EFFC76] text-[2.8rem] sm:text-[4rem] md:text-[4.2rem]  font-black uppercase tracking-tight leading-[0.9]">
                    JEVXO AGENCY
                  </span>
                </div>
              </motion.div>

              {/* Description with Left Border Line */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="border-l-2 border-white/20 pl-5 mb-10 max-w-lg"
              >
                <p className="text-gray-400 text-sm sm:text-base md:text-lg font-light leading-relaxed">
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
                  <button className="px-8 py-3.5 bg-[#EFFC76] text-black rounded-2xl text-sm font-bold hover:bg-[#f0ff7a] transition-all duration-300 shadow-[0_0_25px_rgba(239,252,118,0.35)]">
                    Get Started
                  </button>
                </Link>
                <Link href="/about">
                  <button className="px-8 py-3.5 bg-black/40 border border-white/20 text-white rounded-2xl text-sm font-medium hover:border-white/40 hover:bg-white/5 transition-all duration-300 backdrop-blur-md">
                    View Our Work
                  </button>
                </Link>
              </motion.div>

            </div>

            {/* ── RIGHT COLUMN (IMAGE & BADGES) ── */}
            <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end mt-10 lg:mt-0">
              <div className="relative w-full max-w-[420px] lg:max-w-[460px]">

                {/* Main Photo Card with Arched Top Corners */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="relative rounded-[45px] overflow-hidden border border-white/10 shadow-2xl bg-[#091209]"
                >
                  <Image
                    src="/hero-team.png"
                    alt="JEVXO Team"
                    width={460}
                    height={540}
                    className="object-cover w-full h-[400px] sm:h-[460px] lg:h-[500px] grayscale contrast-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060d06]/80 via-transparent to-transparent pointer-events-none" />
                </motion.div>

                {/* Floating Badge Left-Gap: 98% PROJECT SUCCESS */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.6 }}
                  className="absolute -left-28 sm:-left-36 md:-left-44 top-[24%] bg-[#09150a]/95 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-4 shadow-2xl min-w-[140px] z-30 pointer-events-none"
                >
                  <p className="text-white text-3xl font-black italic tracking-tight">98%</p>
                  <p className="text-[#EFFC76] text-[9px] font-bold uppercase tracking-wider mt-0.5">PROJECT SUCCESS</p>
                  <div className="flex gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-3 h-1 rounded-full bg-[#EFFC76]" />
                    ))}
                  </div>
                </motion.div>

                {/* Floating Badge Bottom-Right: 250+ HAPPY CLIENTS */}
                <motion.div
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.8 }}
                  className="absolute -right-6 bottom-14 bg-[#09150a]/95 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-3.5 shadow-2xl z-30"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <div className="w-7 h-7 rounded-full bg-[#1e2e1e] border border-white/20 flex items-center justify-center text-[8px] text-white font-bold">U1</div>
                      <div className="w-7 h-7 rounded-full bg-[#2a3e2a] border border-white/20 flex items-center justify-center text-[8px] text-white font-bold">U2</div>
                      <div className="w-7 h-7 rounded-full bg-[#364e36] border border-white/20 flex items-center justify-center text-[8px] text-white font-bold">U3</div>
                    </div>
                    <div>
                      <p className="text-white text-base font-extrabold">250+</p>
                      <p className="text-gray-400 text-[9px] font-semibold uppercase tracking-wider">HAPPY CLIENTS</p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Pill Bottom-Left: 🚀 5+ YEARS EXP. */}
                <motion.div
                  initial={{ opacity: 0, y: 25, rotate: -4 }}
                  animate={{ opacity: 1, y: 0, rotate: -4 }}
                  transition={{ duration: 0.7, delay: 1 }}
                  className="absolute -left-6 sm:-left-12 -bottom-5 bg-[#EFFC76] text-black rounded-2xl px-6 py-3 shadow-[0_10px_25px_rgba(239,252,118,0.35)] flex items-center gap-2 border border-black/10 z-30 whitespace-nowrap"
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
