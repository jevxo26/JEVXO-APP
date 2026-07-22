"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const WhoWeAre = () => {
  return (
    <section className="py-20 bg-transparent text-white relative overflow-hidden">
      <div className="max-w-10/12 mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Images Composition */}
          <div className="lg:col-span-6 relative flex items-center justify-start min-h-[520px] md:min-h-[600px]">
            
            {/* Main Black & White Tall Image Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-9/12 h-[480px] md:h-[560px] rounded-[36px] overflow-hidden border border-white/10 shadow-2xl ml-auto"
            >
              <Image
                src="/who-we-are-main.png"
                alt="JEVXO Team Working"
                fill
                className="object-cover grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Overlay Small Vibrant Image Card (Bottom Left) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute left-0 -bottom-4 w-6/12 h-[260px] md:h-[300px] rounded-[28px] overflow-hidden border-2 border-[#EFFC76]/40 shadow-[0_20px_40px_rgba(0,0,0,0.8)] z-20"
            >
              <Image
                src="/who-we-are-small.png"
                alt="Team Celebration"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* Right Side: Text & Metrics Content */}
          <div className="lg:col-span-6 flex flex-col items-start text-left lg:pl-6">
            
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-4"
            >
              <span className="text-[#EFFC76] text-xs font-bold uppercase tracking-[0.25em]">
                WHO WE ARE
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-white mb-6"
            >
              We craft digital experiences <br />
              <span className="font-serif italic font-normal text-[#EFFC76]">that excite & inspire</span>
            </motion.h2>

            {/* Paragraph */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-400 text-sm sm:text-base leading-relaxed font-light mb-10 max-w-xl"
            >
              We are a team of creative minds dedicated to transforming brands. From strategy to execution, we bring your vision to life with modern technology and neon aesthetics.
            </motion.p>

            {/* Divider Line */}
            <div className="w-full h-[1px] bg-white/10 mb-10" />

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-3 gap-6 w-full mb-10"
            >
              <div>
                <p className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">5+</p>
                <p className="text-gray-400 text-xs mt-1 font-medium">Years Experience</p>
              </div>

              <div>
                <p className="text-3xl md:text-4xl font-extrabold text-[#EFFC76] tracking-tight">120+</p>
                <p className="text-gray-400 text-xs mt-1 font-medium">Projects Done</p>
              </div>

              <div>
                <p className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">50+</p>
                <p className="text-gray-400 text-xs mt-1 font-medium">Happy Clients</p>
              </div>
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
                className="inline-flex items-center gap-2 text-white font-semibold text-sm hover:text-[#EFFC76] border-b border-white hover:border-[#EFFC76] pb-1 transition-all group"
              >
                <span>Read Our Story</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
