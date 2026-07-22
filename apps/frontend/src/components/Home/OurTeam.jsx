"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import SmoothButton from "@/Share/SmoothButton";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const teamMembers = [
  {
    name: "Alexander West",
    role: "Founder & CEO",
    bio: "Pioneering enterprise software architecture and leading strategic growth for global digital transformations.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop",
  },
  {
    name: "Sophia Chen",
    role: "CTO & Lead Architect",
    bio: "Expert in distributed cloud systems, high-availability backends, and AI-driven automation pipelines.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop",
  },
  {
    name: "Marcus Johnson",
    role: "Senior Full-Stack Lead",
    bio: "Crafting robust Web & Mobile applications using React, Next.js, Node.js, and modern cloud infrastructure.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop",
  },
  {
    name: "Elena Rodriguez",
    role: "Head of Product Design",
    bio: "Designing world-class user interfaces and intuitive product experiences with a passion for micro-animations.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop",
  },
  {
    name: "David Kim",
    role: "Cloud & DevOps Lead",
    bio: "Managing multi-cloud Kubernetes clusters, automated CI/CD pipelines, and enterprise security compliance.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop",
  },
  {
    name: "Olivia Martinez",
    role: "Digital Strategy Lead",
    bio: "Accelerating brand growth through data analytics, SEO performance engineering, and conversion optimization.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop",
  },
];

const TeamCard = ({ member }) => {
  return (
    <div className="group relative bg-[#0d0d10]/90 border border-white/10 rounded-3xl p-5 flex flex-col justify-between hover:border-[#EFFC76]/50 transition-all duration-300 backdrop-blur-md h-full hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
      <div>
        {/* Header: Image & Role Badge */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-gray-800 shrink-0 border border-white/10 group-hover:border-[#EFFC76]/40 transition-colors">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg leading-tight group-hover:text-[#EFFC76] transition-colors">
              {member.name}
            </h3>
            <p className="text-[#EFFC76] text-xs font-medium tracking-wide mt-1">
              {member.role}
            </p>
          </div>
        </div>

        {/* Short 2-3 Line Description / Bio */}
        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-light line-clamp-3 mb-4">
          {member.bio}
        </p>
      </div>

      {/* Footer / Connect Action */}
      <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-gray-400 group-hover:text-white transition-colors">
        <span className="font-medium text-[11px] text-gray-500 group-hover:text-gray-300">JEVXO Team Expert</span>
        <div className="w-6 h-6 rounded-full bg-white/5 group-hover:bg-[#EFFC76] group-hover:text-black flex items-center justify-center transition-all">
          <ArrowUpRight size={13} />
        </div>
      </div>
    </div>
  );
};

const OurTeam = () => {
  return (
    <section className="py-24 -mt-16 md:-mt-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center text-center mb-16">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
          >
            <Users className="w-4 h-4 text-[#EFFC76]" />
            <span className="text-gray-300 text-sm">Our Engineering Team</span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-6 leading-tight max-w-4xl tracking-tight"
          >
            Meet the Minds Behind <br />
            <span className="text-gray-400">Your Success</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mb-8 font-light"
          >
            Expert developers, cloud architects, and product designers dedicated to
            delivering engineering excellence at JEVXO.
          </motion.p>

          {/* Button */}
          <SmoothButton>View About JEVXO</SmoothButton>
        </div>

        {/* Desktop Team Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TeamCard member={member} />
            </motion.div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden mt-8">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            loop={true}
            className="pb-12"
          >
            {teamMembers.map((member, index) => (
              <SwiperSlide key={index}>
                <TeamCard member={member} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Styles for Swiper Pagination */}
          <style jsx global>{`
            .swiper-pagination-bullet {
              background: rgba(255, 255, 255, 0.2) !important;
              opacity: 1 !important;
              width: 10px !important;
              height: 10px !important;
              transition: all 0.3s ease;
            }
            .swiper-pagination-bullet-active {
              background: #effc76 !important;
              width: 24px !important;
              border-radius: 5px !important;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
