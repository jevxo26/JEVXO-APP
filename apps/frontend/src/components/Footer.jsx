"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import {
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  ArrowRight,
  ArrowUpRight,
  MapPin,
  Mail,
  Sparkles,
} from "lucide-react";

const FooterLink = ({ href, children }) => (
  <Link
    href={href}
    className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors py-1 font-normal text-sm"
  >
    <span className="relative overflow-hidden">
      <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
        {children}
      </span>
      <span className="absolute top-0 left-0 inline-block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-[#EFFC76]">
        {children}
      </span>
    </span>
  </Link>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  return (
    <footer
      ref={containerRef}
      className="relative z-20 bg-[#050505] pt-24 pb-12 overflow-hidden border-t border-white/5 text-white"
    >
      {/* Subtle Ambient Glow */}
      <div className="absolute top-0 right-1/3 w-[500px] h-[300px] bg-indigo-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8">


        {/* 2. Main Navigation Grid */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 md:gap-8 mb-24 relative z-10">
          
          {/* Brand Column */}
          <div className="max-w-xs">
            <Link
              href="/"
              className="text-3xl font-bold text-white tracking-tight mb-6 inline-flex items-center gap-2 group"
            >
              <span>Jevxo</span>
              <span className="w-2 h-2 rounded-full bg-[#EFFC76] group-hover:scale-125 transition-transform" />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 font-light">
              Crafting digital experiences with precision and passion. Based
              remotely, working globally.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Twitter, href: "#", name: "Twitter" },
                { icon: Instagram, href: "#", name: "Instagram" },
                { icon: Linkedin, href: "#", name: "LinkedIn" },
                { icon: Youtube, href: "#", name: "YouTube" },
              ].map(({ icon: Icon, href, name }, i) => (
                <a
                  key={i}
                  href={href}
                  aria-label={name}
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#EFFC76] hover:bg-white/10 hover:border-white/20 transition-all transform hover:scale-105"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Group */}
          <div className="flex flex-wrap gap-12 sm:gap-16 md:gap-20 lg:gap-24">
            {/* Company Column */}
            <div>
              <h4 className="text-white font-medium mb-6 text-base tracking-wide">Company</h4>
              <div className="flex flex-col gap-2.5">
                {[
                  { name: "About Us", href: "/about" },
                  { name: "Industries", href: "/industries" },
                  { name: "Partner Roster", href: "/country-sales-partner" },
                  { name: "Contact", href: "/contact" },
                ].map((item) => (
                  <FooterLink key={item.name} href={item.href}>
                    {item.name}
                  </FooterLink>
                ))}
              </div>
            </div>

            {/* Services & Architectures Column */}
            <div>
              <h4 className="text-white font-medium mb-6 text-base tracking-wide">Services</h4>
              <div className="flex flex-col gap-2.5">
                {[
                  { name: "Solutions", href: "/solutions" },
                  { name: "Products & SaaS", href: "/products" },
                  { name: "Custom Software", href: "/services/custom-website" },
                  { name: "Mobile Apps", href: "/services/mobile-app" },
                ].map((item) => (
                  <FooterLink key={item.name} href={item.href}>
                    {item.name}
                  </FooterLink>
                ))}
              </div>
            </div>

            {/* Trust & Legal Column */}
            <div>
              <h4 className="text-white font-medium mb-6 text-base tracking-wide">Trust & Legal</h4>
              <div className="flex flex-col gap-2.5">
                {[
                  { name: "Security & Trust", href: "/security" },
                  { name: "Privacy Policy", href: "/privacy-policy" },
                  { name: "Terms & Conditions", href: "/terms-and-conditions" },
                  { name: "Refund Policy", href: "/refund-policy" },
                ].map((item) => (
                  <FooterLink key={item.name} href={item.href}>
                    {item.name}
                  </FooterLink>
                ))}
              </div>
            </div>

            {/* Newsletter Column */}
            <div className="max-w-xs min-w-[200px]">
              <h4 className="text-white font-medium mb-6 text-base tracking-wide">Stay Updated</h4>
              <div className="relative group">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-transparent border-b border-white/20 py-3 pr-8 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#EFFC76] transition-colors rounded-none font-light"
                />
                <button
                  type="button"
                  aria-label="Subscribe"
                  className="absolute right-0 top-3 text-gray-400 group-focus-within:text-[#EFFC76] hover:text-[#EFFC76] transition-colors"
                >
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* 3. Bottom Anchor Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pt-10 border-t border-white/10 relative z-10">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-gray-400 text-xs sm:text-sm font-light">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-gray-500" /> New York, NY & Dhaka, BD
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} className="text-gray-500" /> hello@jevxo.com
            </div>
          </div>

          <div className="text-xs sm:text-sm text-gray-500 font-light">
            &copy; {currentYear} <span className="text-gray-300 font-medium">Jevxo</span>. All rights reserved.
          </div>
        </div>

        {/* Giant Faded Background Watermark Text */}
        <div className="absolute -bottom-10 right-0 pointer-events-none select-none mix-blend-overlay opacity-15 overflow-hidden">
          <h1 className="text-[18vw] font-black text-white/10 leading-none tracking-tighter">
            JEVXO
          </h1>
        </div>

      </div>
    </footer>
  );
};

export default Footer;