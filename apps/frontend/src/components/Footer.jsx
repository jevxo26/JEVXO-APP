"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaXTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { CheckCircle2 } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 4000);
    }
  };

  // Stagger Container Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };

  return (
    <footer className="relative z-20 bg-[#040904] pt-20 pb-36 sm:pb-40 overflow-hidden border-t border-white/10 text-white select-none">
      {/* Vivid Background Radial Green Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#EFFC76]/8 rounded-full blur-[180px] pointer-events-none"
      />

      {/* 10/12 Container Width */}
      <div className="w-10/12 mx-auto relative z-10">

        {/* Top 4-Column Grid Layout with Framer Motion Stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16 relative z-10"
        >
          
          {/* Column 1: Brand & Socials (4 Cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-4">
            <Link href="/main" className="inline-block text-2xl sm:text-3xl font-extrabold tracking-tight mb-4 group">
              <span className="text-white group-hover:text-gray-200 transition-colors">JEV</span>
              <span className="text-[#EFFC76] group-hover:drop-shadow-[0_0_12px_#EFFC76] transition-all">XO</span>
            </Link>

            <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed mb-6 max-w-sm">
              Architecting state-of-the-art enterprise software platforms, AI automation agents, and high-performance digital products for global scale.
            </p>

            {/* Social Icon Buttons */}
            <div className="flex items-center gap-3">
              {[
                { icon: FaXTwitter, href: "#", name: "X (Twitter)" },
                { icon: FaFacebookF, href: "#", name: "Facebook" },
                { icon: FaInstagram, href: "#", name: "Instagram" },
                { icon: FaLinkedinIn, href: "#", name: "LinkedIn" },
              ].map(({ icon: Icon, href, name }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  aria-label={name}
                  whileHover={{ scale: 1.15, rotate: 4 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-[#0d1a0d]/90 border border-[#EFFC76]/25 flex items-center justify-center text-gray-300 hover:text-black hover:bg-[#EFFC76] hover:border-[#EFFC76] transition-all duration-300 shadow-md group"
                >
                  <Icon size={14} className="group-hover:scale-110 transition-transform" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Platform Links (2.5 Cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h4 className="text-white font-bold text-sm tracking-wider mb-5">
              Platform
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-400 font-light">
              {[
                { name: "Home", href: "/main" },
                { name: "About Us", href: "/main/about" },
                { name: "Case Studies", href: "/main/case-studies" },
                { name: "Solutions Suite", href: "/main/solutions" },
                { name: "SaaS Products", href: "/main/products" },
                { name: "Industries", href: "/main/industries" },
                { name: "Contact Us", href: "/main/contact" },
              ].map((link, idx) => (
                <li key={idx}>
                  <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Link href={link.href} className="hover:text-[#EFFC76] transition-colors">
                      {link.name}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Services (2.5 Cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h4 className="text-white font-bold text-sm tracking-wider mb-5">
              Engineering
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-400 font-light">
              {[
                { name: "Web Development", href: "/main/services/web-development" },
                { name: "Cloud & DevOps", href: "/main/services/cloud-computing" },
                { name: "Mobile Architecture", href: "/main/services/mobile-app-development" },
                { name: "UI/UX & Motion", href: "/main/services/ui-ux-design" },
                { name: "AI & Automation", href: "/main/services/custom-software-development" },
                { name: "Cybersecurity", href: "/main/services/digital-marketing" },
              ].map((link, idx) => (
                <li key={idx}>
                  <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
                    <Link href={link.href} className="hover:text-[#EFFC76] transition-colors">
                      {link.name}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Newsletter & Trust (4 Cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-4">
            <h4 className="text-white font-bold text-sm tracking-wider mb-5">
              Enterprise Newsletter
            </h4>
            <p className="text-gray-400 text-xs sm:text-sm font-light mb-4 leading-relaxed">
              Subscribe to JEVXO Insights for modern software architecture patterns, AI agent updates, and industry reports.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-[#EFFC76]/15 border border-[#EFFC76]/40 rounded-xl text-[#EFFC76] text-xs font-mono font-bold">
                <CheckCircle2 size={16} />
                <span>Thank you for subscribing to JEVXO Insights!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your corporate email"
                  className="w-full bg-[#071407] border border-[#EFFC76]/25 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#EFFC76] transition-colors"
                  required
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#EFFC76] hover:bg-[#f3ff8c] text-black font-extrabold text-xs sm:text-sm py-3.5 px-6 rounded-xl transition-all duration-300 shadow-[0_0_25px_rgba(239,252,118,0.5)]"
                >
                  Subscribe
                </motion.button>
              </form>
            )}
          </motion.div>

        </motion.div>

        {/* Bottom Bar Container with Overlaid Giant Lowercase Watermark */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative pt-8 border-t border-white/10 z-10"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-light relative z-10">
            <div>
              &copy; {currentYear} <span className="text-white font-bold">JEVXO</span> Inc. All rights reserved.
            </div>

            <div className="flex flex-wrap items-center gap-6">
              <Link href="/main/privacy-policy" className="hover:text-[#EFFC76] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/main/terms-and-conditions" className="hover:text-[#EFFC76] transition-colors">
                Terms of Service
              </Link>
              <Link href="/main/refund-policy" className="hover:text-[#EFFC76] transition-colors">
                Refund Policy
              </Link>
              <Link href="/main/security" className="hover:text-[#EFFC76] transition-colors">
                Trust & Security
              </Link>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Giant Lowercase Watermark Text Backdrop */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 pointer-events-none select-none w-full text-center z-0 overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[18vw] sm:text-[22vw] lg:text-[280px] font-black text-white/[0.035] leading-none tracking-tighter lowercase"
        >
          jevxo.
        </motion.h1>
      </div>
    </footer>
  );
};

export default Footer;