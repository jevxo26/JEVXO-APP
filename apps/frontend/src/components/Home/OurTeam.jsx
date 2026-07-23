"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const teamMembers = [
  {
    name: "Tareq Hassan",
    role: "Senior FullStack Developer",
    badgeTitle: "TAREQ HASSAN",
    badgeRole: "Senior FullStack Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop",
  },
  {
    name: "Iqbal Hasan",
    role: "Web Developer",
    badgeTitle: "IQBAL",
    badgeRole: "Web Developer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop",
  },
  {
    name: "MD Mahafuj Hossain",
    role: "Web Developer",
    badgeTitle: "MAHAFUJ",
    badgeRole: "Web Developer",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop",
  },
  {
    name: "Abdullah",
    role: "Web Developer",
    badgeTitle: "ABDULLAH",
    badgeRole: "Web Developer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&auto=format&fit=crop",
  },
  {
    name: "Arko Debnath Turjo",
    role: "Senior Creative Designer",
    badgeTitle: "ARKO",
    badgeRole: "Graphic Designer",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop",
  },
  {
    name: "Redowan",
    role: "Graphic & Motion Designer",
    badgeTitle: "REDOWAN",
    badgeRole: "Graphic Designer",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop",
  },
  {
    name: "Alexander West",
    role: "Founder & CEO",
    badgeTitle: "ALEXANDER",
    badgeRole: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop",
  },
];

// Quadruple items to make the hardware marquee completely seamless with zero gap
const infiniteMembers = [...teamMembers, ...teamMembers, ...teamMembers];

const OurTeam = () => {
  return (
    <section className="py-24 relative overflow-hidden text-white select-none">
      {/* CSS Keyframe for 60fps/120fps Ultra Smooth Hardware-Accelerated Marquee */}
      <style jsx global>{`
        @keyframes smoothTeamMarquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.3333%, 0, 0);
          }
        }
        .animate-team-marquee {
          animation: smoothTeamMarquee 24s linear infinite;
          will-change: transform;
        }
        .animate-team-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#EFFC76]/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Header Container */}
      <div className="w-10/12 mx-auto relative z-10 mb-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[#EFFC76] text-xs font-mono font-bold uppercase tracking-[0.25em] block mb-2"
            >
              OUR TEAM
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight"
            >
              Meet{" "}
              <span className="italic font-serif text-[#EFFC76] font-normal">
                The Minds
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-gray-400 text-sm sm:text-base font-light mt-2 max-w-xl leading-relaxed"
            >
              The creative strategists, tech experts, and visionaries making it all happen.
            </motion.p>
          </div>

          {/* View Team Button Header */}
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-[#EFFC76] hover:text-black hover:border-[#EFFC76] text-xs font-semibold tracking-wider transition-all duration-300 group shadow-md self-start md:self-auto"
          >
            <span>View Team</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Full Width Continuous Infinite Left Auto-Scrolling Marquee Track */}
      <div className="w-full relative z-10 overflow-hidden py-4">
        
        {/* Left & Right Smooth Gradient Fade Overlays */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-36 bg-gradient-to-r from-[#050b05] via-[#050b05]/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-36 bg-gradient-to-l from-[#050b05] via-[#050b05]/80 to-transparent z-20 pointer-events-none" />

        <div className="flex overflow-hidden">
          <div className="flex items-center gap-5 w-max animate-team-marquee">
            {infiniteMembers.map((member, idx) => (
              <div
                key={idx}
                className="group/card relative flex-shrink-0 w-[265px] sm:w-[285px] rounded-2xl overflow-hidden border border-white/10 bg-[#091209] hover:border-[#EFFC76]/60 shadow-[0_20px_45px_rgba(0,0,0,0.85)] hover:shadow-[0_0_35px_rgba(239,252,118,0.25)] transition-all duration-500 cursor-pointer flex flex-col justify-between"
              >
                {/* Image Studio Frame - Dark Portrait Background */}
                <div className="relative w-full h-[330px] sm:h-[350px] overflow-hidden bg-[#060b06]">
                  
                  {/* Top-Left Brand Logo Watermark matching reference image */}
                  <div className="absolute top-3 left-4 z-20 flex items-center gap-1.5 text-[10px] font-mono text-gray-300 tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EFFC76]" />
                    <span className="font-bold text-white uppercase">JEVXO</span>
                  </div>

                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top grayscale contrast-125 brightness-90 group-hover/card:grayscale-0 group-hover/card:contrast-100 group-hover/card:brightness-105 group-hover/card:scale-105 transition-all duration-700 ease-out"
                  />

                  {/* Dark Studio Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#091209] via-transparent to-black/30 pointer-events-none" />

                  {/* Printed Studio Graphic Overlay over lower body (Reference Image Style) */}
                  <div className="absolute bottom-6 left-0 right-0 z-20 text-center px-4">
                    <h4 className="text-white text-sm font-extrabold uppercase tracking-wider drop-shadow-md">
                      {member.badgeTitle}
                    </h4>
                    <div className="mt-1 inline-block border border-white/40 px-3 py-0.5 rounded-md backdrop-blur-sm bg-black/40">
                      <span className="text-[10px] font-mono text-gray-200 tracking-wide">
                        {member.badgeRole}
                      </span>
                    </div>
                    <div className="mt-1 text-[8px] font-mono text-gray-400 tracking-widest opacity-80 uppercase">
                      -- JEVXO CODE --
                    </div>
                  </div>
                </div>

                {/* Bottom Card Info Section */}
                <div className="p-4 bg-[#070e07] relative z-10 flex flex-col justify-between border-t border-white/10">
                  <div className="flex items-center gap-2 mb-1">
                    {/* Speech Bubble / Dot Icon */}
                    <div className="w-3 h-3 rounded-full bg-[#EFFC76] flex items-center justify-center shrink-0 shadow-[0_0_8px_#EFFC76]">
                      <div className="w-1 h-1 bg-black rounded-full" />
                    </div>
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover/card:text-[#EFFC76] transition-colors duration-300 line-clamp-1">
                      {member.name}
                    </h3>
                  </div>

                  <p className="text-[11px] font-mono text-[#EFFC76] font-medium tracking-wide ml-5">
                    {member.role}
                  </p>
                </div>

                {/* Bottom Hover Glowing Line */}
                <div className="w-full h-[2px] bg-white/10 group-hover/card:bg-[#EFFC76] transition-colors duration-500 shadow-[0_0_10px_#EFFC76]" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default OurTeam;
