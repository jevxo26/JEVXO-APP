"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

const Banner = () => {
  return (
    <div className="min-h-screen text-white overflow-hidden bg-transparent">
      <section className="relative min-h-screen flex items-center">
        <div className="relative z-10 w-full mx-auto pt-24 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            {/* ── LEFT COLUMN ── */}
            <div className="flex flex-col">

              {/* Available badge */}
              <motion.div
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 mb-8 w-fit"
              >
                <span className="w-2 h-2 rounded-full bg-[#EFFC76] animate-pulse" />
                <span className="text-[#EFFC76] text-xs font-semibold uppercase tracking-[0.2em]">
                  Available For New Projects
                </span>
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="mb-6"
              >
                <h1 className="text-[3.4rem] md:text-[4.5rem] lg:text-[5rem] font-black leading-[0.95] tracking-tight text-white uppercase">
                  BUILD.
                  <br />
                  DESIGN.
                  <br />
                  <span className="font-serif italic text-white/70 text-[3rem] md:text-[3.8rem] lg:text-[4.2rem] normal-case font-normal">
                    That's
                  </span>
                  <br />
                  <span className="text-[#EFFC76]">JEVXO</span>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-gray-400 text-base md:text-lg font-light leading-relaxed mb-10 max-w-sm border-l-2 border-[#EFFC76]/40 pl-4"
              >
                We are an enterprise software engineering firm focused on
                custom SaaS, AI workflows, and cloud architecture. Let's
                build something extraordinary together.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex items-center gap-4"
              >
                <Link href="/contact">
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-[#EFFC76] text-black rounded-lg text-sm font-bold hover:bg-[#f0ff7a] transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(239,252,118,0.4)]">
                    Get Started
                    <ArrowRight size={16} />
                  </button>
                </Link>
                <Link href="/about">
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-transparent border border-white/20 text-white rounded-lg text-sm font-semibold hover:border-white/40 hover:bg-white/5 transition-all duration-300">
                    View Our Work
                  </button>
                </Link>
              </motion.div>

              {/* Social proof row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex items-center gap-3 mt-10"
              >
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-[#EFFC76]/40 to-[#EFFC76]/10 border-2 border-[#050505] flex items-center justify-center text-[10px] font-bold text-[#EFFC76]">
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} className="fill-[#EFFC76] text-[#EFFC76]" />
                    ))}
                  </div>
                  <p className="text-gray-500 text-xs">Trusted by 50+ global clients</p>
                </div>
              </motion.div>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="relative flex items-center justify-center lg:justify-end">

              {/* Main photo card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="relative w-full max-w-[400px] lg:max-w-[440px]"
              >
                {/* Glow behind */}
                <div className="absolute inset-0 bg-[#EFFC76]/10 rounded-3xl blur-2xl scale-105 pointer-events-none" />

                {/* Image container */}
                <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                  <Image
                    src="/hero-team.png"
                    alt="JEVXO Engineering Team"
                    width={440}
                    height={500}
                    className="object-cover w-full h-[360px] md:h-[440px] grayscale contrast-110"
                  />
                  {/* Green tint overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/60 via-transparent to-transparent" />
                </div>

                {/* Floating badge — top left */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.8 }}
                  className="absolute -left-6 top-8 bg-[#0d0d12]/95 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 shadow-xl"
                >
                  <p className="text-[#EFFC76] text-2xl font-black">98%</p>
                  <p className="text-gray-400 text-[10px] uppercase tracking-wider">Project Success</p>
                  <div className="flex gap-0.5 mt-1.5">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-4 h-1.5 rounded-full bg-[#EFFC76] opacity-80" />
                    ))}
                  </div>
                </motion.div>

                {/* Floating badge — bottom right */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 1 }}
                  className="absolute -right-4 bottom-10 bg-[#0d0d12]/95 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-1.5">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-6 h-6 rounded-full bg-[#EFFC76]/30 border border-[#EFFC76]/50" />
                      ))}
                    </div>
                    <div>
                      <p className="text-white text-sm font-bold">250+</p>
                      <p className="text-gray-400 text-[10px] uppercase tracking-wider">Happy Clients</p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating badge — bottom left */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 1.1 }}
                  className="absolute left-4 -bottom-5 bg-[#EFFC76] text-black rounded-xl px-4 py-2.5 shadow-xl flex items-center gap-2"
                >
                  <span className="text-lg">⚡</span>
                  <p className="text-xs font-black uppercase tracking-wider">5+ Years Exp.</p>
                </motion.div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Banner;
