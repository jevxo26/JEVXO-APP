"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import CosmicBackground from "@/components/Home/CosmicBackground";

const LogoSpinner = ({ fullScreen = true, message = "Loading JEVXO..." }) => {
  const content = (
    <div className="relative flex flex-col items-center justify-center p-6 text-center z-10 select-none">
      {/* Background radial glow */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.35, 0.65, 0.35],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-72 h-72 rounded-full bg-[#EFFC76]/20 blur-[70px] pointer-events-none"
      />

      {/* Spinner Rings and Logo Container */}
      <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center mb-6">
        
        {/* Outer Clockwise Rotating Glowing Neon Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#EFFC76] border-r-[#EFFC76]/60 shadow-[0_0_30px_rgba(239,252,118,0.35)] pointer-events-none"
        />

        {/* Middle Counter-Clockwise Rotating Dashed Accent Orbit */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-2 rounded-full border-2 border-dashed border-[#EFFC76]/40 pointer-events-none"
        />

        {/* Inner Glowing Pulse Ring */}
        <motion.div
          animate={{
            scale: [0.92, 1.05, 0.92],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-6 rounded-full border border-[#EFFC76]/70 shadow-[inset_0_0_20px_rgba(239,252,118,0.3)] pointer-events-none"
        />

        {/* Orbiting Star / Glowing Dot */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 pointer-events-none flex items-start justify-center"
        >
          <div className="w-3.5 h-3.5 rounded-full bg-[#EFFC76] shadow-[0_0_12px_#EFFC76,-2px_-2px_10px_rgba(239,252,118,0.8)] -mt-1.5" />
        </motion.div>

        {/* Central Logo Container with Breathing Animation */}
        <motion.div
          animate={{
            scale: [0.95, 1.03, 0.95],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative z-10 p-4 rounded-2xl bg-[#060d06]/80 backdrop-blur-md border border-[#EFFC76]/30 shadow-[0_0_25px_rgba(0,0,0,0.8)] flex items-center justify-center"
        >
          <Image
            src="/jevxo.png"
            alt="JEVXO Logo"
            width={160}
            height={50}
            priority
            className="object-contain h-10 w-auto drop-shadow-[0_0_12px_rgba(239,252,118,0.5)]"
          />
        </motion.div>
      </div>

      {/* Animated Loading Text */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-2"
      >
        <span className="text-[#EFFC76] text-xs sm:text-sm font-mono tracking-[0.35em] uppercase font-bold flex items-center gap-1">
          {message}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          >
            ...
          </motion.span>
        </span>

        {/* Bottom Ambient Progress Glow Bar */}
        <div className="w-36 sm:w-44 h-1 bg-[#102412] rounded-full overflow-hidden relative border border-[#EFFC76]/20">
          <motion.div
            animate={{
              x: ["-100%", "100%"],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#EFFC76] to-transparent rounded-full shadow-[0_0_10px_#EFFC76]"
          />
        </div>
      </motion.div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#050b05] overflow-hidden">
        {/* Cosmic Background */}
        <div className="absolute inset-0 pointer-events-none">
          <CosmicBackground />
        </div>
        {content}
      </div>
    );
  }

  return content;
};

export default LogoSpinner;
