"use client";
import React from "react";
import { motion } from "framer-motion";
import { Rocket, Star } from "lucide-react";
import SmoothButton from "@/Share/SmoothButton";

const LaunchYourSite = () => {
  return (
    <section className="relative py-24 -mt-27 md:-mt-20 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative md:block hidden h-[300px] sm:h-[400px] lg:h-[500px] rounded-3xl overflow-hidden w-full"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
          <img
            src="https://i.ibb.co.com/j9mhfwk5/image.png"
            alt="Launch Your Site"
            className="h-full w-full object-cover"
          />
        </motion.div>

        {/* Right Side - Content */}
        <div className="flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-wider text-[#EFFC76] mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#EFFC76] animate-pulse" />
            Fast Track Deployment
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-6xl font-medium text-white tracking-tight mb-6"
          >
            Launch Your Project With JEVXO{" "}
            <span className="font-serif italic text-[#EFFC76]">
              Efficient & Scalable
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-400 text-lg mb-10 max-w-lg"
          >
            Transform your vision into reality effortlessly. Ready to stand out?
            Partner with us today!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-8"
          >
            <SmoothButton> Book an Appointment</SmoothButton>

            <div className="flex flex-col items-start">
              <div className="flex items-center gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-[#EFFC76] text-[#EFFC76]"
                  />
                ))}
              </div>
              <span className="text-gray-400 text-sm">
                Trusted by 50+ Clients
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LaunchYourSite;
