"use client";
import React from "react";
import { motion } from "framer-motion";

const ProductHeader = () => {
  return (
    <div className="text-center pt-20 mb-[-30px] relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-wider text-[#EFFC76] mb-6"
      >
        <div className="w-1.5 h-1.5 rounded-full bg-[#EFFC76] animate-pulse" />
        Product Portfolio
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-4xl md:text-6xl font-medium text-white tracking-tight"
      >
        Engineered Software &{" "}
        <span className="font-serif italic text-[#EFFC76]">
          Flagship Products
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto font-light"
      >
        Powering the next generation of enterprise digital commerce, cloud automation, and operational platforms.
      </motion.p>
    </div>
  );
};

export default ProductHeader;
