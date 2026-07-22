"use client";
import SmoothButton from "@/Share/SmoothButton";
import {
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Home,
  Layers,
  Zap,
  Building2,
  Users,
  Briefcase,
  ShoppingCart,
  Truck,
  Bot,
  Sparkles,
  Info,
  Globe,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import CosmicBackground from "@/components/Home/CosmicBackground";

const Navbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBottomMenuOpen, setIsBottomMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (path) => {
    if (path === "/") return pathname === "/";
    return pathname?.startsWith(path);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const solutionsTimeoutRef = useRef(null);
  const productsTimeoutRef = useRef(null);

  const handleSolutionsMouseEnter = () => {
    if (solutionsTimeoutRef.current) clearTimeout(solutionsTimeoutRef.current);
    if (productsTimeoutRef.current) clearTimeout(productsTimeoutRef.current);
    setIsProductsOpen(false);
    setIsSolutionsOpen(true);
  };

  const handleSolutionsMouseLeave = () => {
    solutionsTimeoutRef.current = setTimeout(() => {
      setIsSolutionsOpen(false);
    }, 150);
  };

  const handleProductsMouseEnter = () => {
    if (productsTimeoutRef.current) clearTimeout(productsTimeoutRef.current);
    if (solutionsTimeoutRef.current) clearTimeout(solutionsTimeoutRef.current);
    setIsSolutionsOpen(false);
    setIsProductsOpen(true);
  };

  const handleProductsMouseLeave = () => {
    productsTimeoutRef.current = setTimeout(() => {
      setIsProductsOpen(false);
    }, 150);
  };

  const products = [
    {
      title: "SquadCart",
      description: "E-commerce platform with analytics and integrations.",
      href: "/products/squadcart",
      badge: "Live",
    },
    {
      title: "CleverERP",
      description: "ERP to manage finance, inventory, and workflows.",
      href: "/products",
      badge: "New",
    },
  ];

  const solutionsList = [
    {
      title: "Business Management & ERP",
      description: "All-in-one ERP, finance & workflow control.",
      href: "/solutions/business-management",
      icon: Building2,
      badge: "Enterprise",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&auto=format&fit=crop",
    },
    {
      title: "Smart CRM & Sales Automation",
      description: "Automated sales pipelines & AI lead scoring.",
      href: "/solutions/smart-crm",
      icon: Users,
      badge: "Popular",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=300&auto=format&fit=crop",
    },
    {
      title: "HRMS & Automated Payroll",
      description: "Employee onboarding, attendance & salary.",
      href: "/solutions/hrms-payroll",
      icon: Briefcase,
      badge: "Core",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop",
    },
    {
      title: "E-Commerce Engine & SquadCart",
      description: "Headless storefronts & inventory sync.",
      href: "/solutions/ecommerce-engine",
      icon: ShoppingCart,
      badge: "Featured",
      image: "https://images.unsplash.com/photo-1556742049-0a670fc80028?w=300&auto=format&fit=crop",
    },
    {
      title: "AI Automation & Smart Chatbots",
      description: "Custom RAG LLMs & 24/7 support bots.",
      href: "/solutions/ai-automation-chatbots",
      icon: Bot,
      badge: "AI Next-Gen",
      image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=300&auto=format&fit=crop",
    },
    {
      title: "Supply Chain & Logistics Hub",
      description: "Real-time fleet tracking & inventory.",
      href: "/solutions/supply-chain-logistics",
      icon: Truck,
      badge: "Scalable",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=300&auto=format&fit=crop",
    },
  ];

  return (
    <>
      {/* Desktop Navigation Bar */}
      <nav
        className={`hidden md:flex fixed top-0 left-0 right-0 z-[9999] w-full transition-all duration-300 ${
          scrolled
            ? "bg-[#050508]/95 backdrop-blur-3xl border-b border-[#EFFC76]/25 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
            : "bg-[#050505]/80 backdrop-blur-2xl border-b border-white/10 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.7)]"
        }`}
      >
        {/* Glowing Top-Line Accent */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#EFFC76] to-transparent opacity-80 pointer-events-none" />
        {/* Glowing Bottom-Line Accent */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#EFFC76]/60 to-transparent opacity-60 pointer-events-none" />


        {/* Custom Cosmic Background */}
        <div className="absolute inset-0 pointer-events-none opacity-50 z-0 overflow-hidden">
          <CosmicBackground />
        </div>

        <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-12 relative z-10">
          
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/jevxo.png"
              alt="JEVXO Logo"
              width={220}
              height={70}
              className="rounded-md object-contain h-9 w-auto"
            />
          </Link>

          {/* Desktop Links with Active Tab Highlight */}
          <div className="flex items-center space-x-2 lg:space-x-3 whitespace-nowrap">
            <Link
              href="/"
              className={`group flex items-center gap-1.5 transition-all text-sm ${
                isActive("/")
                  ? "text-[#EFFC76] bg-[#EFFC76]/10 border border-[#EFFC76]/30 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(239,252,118,0.2)] font-semibold"
                  : "text-gray-300 hover:text-white px-3 py-1 rounded-full hover:bg-white/5 font-medium"
              }`}
            >
              <Home size={14} className={isActive("/") ? "text-[#EFFC76]" : "text-gray-400 group-hover:text-[#EFFC76] transition-colors"} />
              <span>Home</span>
            </Link>

            <Link
              href="/about"
              className={`group flex items-center gap-1.5 transition-all text-sm ${
                isActive("/about")
                  ? "text-[#EFFC76] bg-[#EFFC76]/10 border border-[#EFFC76]/30 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(239,252,118,0.2)] font-semibold"
                  : "text-gray-300 hover:text-white px-3 py-1 rounded-full hover:bg-white/5 font-medium"
              }`}
            >
              <Info size={14} className={isActive("/about") ? "text-[#EFFC76]" : "text-gray-400 group-hover:text-[#EFFC76] transition-colors"} />
              <span>About</span>
            </Link>

            {/* SOLUTIONS MEGA DROPDOWN WITH PREMIUM ANIMATIONS */}
            <div
              className="relative py-2"
              onMouseEnter={handleSolutionsMouseEnter}
              onMouseLeave={handleSolutionsMouseLeave}
            >
              <Link
                href="/solutions"
                className={`group flex items-center gap-1.5 transition-all text-sm ${
                  isActive("/solutions")
                    ? "text-[#EFFC76] bg-[#EFFC76]/10 border border-[#EFFC76]/30 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(239,252,118,0.2)] font-semibold"
                    : "text-gray-300 hover:text-white px-3 py-1 rounded-full hover:bg-white/5 font-medium"
                }`}
              >
                <Layers size={14} className={isActive("/solutions") ? "text-[#EFFC76]" : "text-gray-400 group-hover:text-[#EFFC76] transition-colors"} />
                <span>Solutions</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${
                    isSolutionsOpen || isActive("/solutions") ? "rotate-180 text-[#EFFC76]" : "group-hover:text-white"
                  }`}
                />
              </Link>

              <AnimatePresence>
                {isSolutionsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.97 }}
                    transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50"
                  >
                    <div className="w-[840px] bg-[#0b0b0e]/95 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden relative group/menu">
                      
                      {/* Ambient Glowing Top Line & Aura */}
                      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#EFFC76] to-transparent opacity-80" />
                      <div className="absolute top-0 right-0 w-80 h-40 bg-[#EFFC76]/5 rounded-full blur-[80px] pointer-events-none" />

                      {/* Header Bar */}
                      <div className="px-7 pt-5 pb-4 flex items-center justify-between border-b border-white/10 relative z-10">
                        <div>
                          <div className="text-white font-bold text-base tracking-tight flex items-center gap-2">
                            <span>Enterprise Software Solutions</span>
                            <span className="bg-[#EFFC76] text-black text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                              6 Core Architectures
                            </span>
                          </div>
                          <p className="text-gray-400 text-xs mt-0.5 font-light">
                            Production-grade software systems designed for enterprise scalability & high security.
                          </p>
                        </div>

                        <Link
                          href="/solutions"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#EFFC76] hover:text-white transition-colors bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full"
                        >
                          <span>Explore All</span>
                          <ArrowRight size={13} />
                        </Link>
                      </div>

                      {/* 2-Column Grid for 6 Solutions with Hover Animations */}
                      <div className="p-6 relative z-10">
                        <div className="grid grid-cols-2 gap-4">
                          {solutionsList.map((sol) => (
                            <motion.div
                              key={sol.title}
                              whileHover={{ y: -3, scale: 1.01 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Link
                                href={sol.href}
                                onClick={() => setIsSolutionsOpen(false)}
                                className="group flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#EFFC76]/40 transition-all duration-300 p-3.5 backdrop-blur-md relative overflow-hidden"
                              >
                                {/* Thumbnail Image */}
                                <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-gray-900 border border-white/10 group-hover:border-[#EFFC76]/50 transition-colors">
                                  <img
                                    src={sol.image}
                                    alt={sol.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                  />
                                </div>

                                {/* Details */}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-1 mb-1">
                                    <h4 className="text-white font-bold text-xs truncate group-hover:text-[#EFFC76] transition-colors">
                                      {sol.title}
                                    </h4>
                                    <span className="text-[9px] font-bold uppercase bg-white/10 text-gray-300 group-hover:bg-[#EFFC76] group-hover:text-black px-1.5 py-0.5 rounded shrink-0 transition-colors">
                                      {sol.badge}
                                    </span>
                                  </div>
                                  <p className="text-gray-400 text-[11px] leading-relaxed line-clamp-1 font-light">
                                    {sol.description}
                                  </p>
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/services"
              className={`group flex items-center gap-1.5 transition-all text-sm ${
                isActive("/services")
                  ? "text-[#EFFC76] bg-[#EFFC76]/10 border border-[#EFFC76]/30 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(239,252,118,0.2)] font-semibold"
                  : "text-gray-300 hover:text-white px-3 py-1 rounded-full hover:bg-white/5 font-medium"
              }`}
            >
              <Zap size={14} className={isActive("/services") ? "text-[#EFFC76]" : "text-gray-400 group-hover:text-[#EFFC76] transition-colors"} />
              <span>Services</span>
            </Link>

            {/* PRODUCTS MEGA DROPDOWN WITH ANIMATION & CUSTOM BG */}
            <div
              className="relative py-2"
              onMouseEnter={handleProductsMouseEnter}
              onMouseLeave={handleProductsMouseLeave}
            >
              <Link
                href="/products"
                className={`group flex items-center gap-1.5 transition-all text-sm ${
                  isActive("/products")
                    ? "text-[#EFFC76] bg-[#EFFC76]/10 border border-[#EFFC76]/30 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(239,252,118,0.2)] font-semibold"
                    : "text-gray-300 hover:text-white px-3 py-1 rounded-full hover:bg-white/5 font-medium"
                }`}
              >
                <Briefcase size={14} className={isActive("/products") ? "text-[#EFFC76]" : "text-gray-400 group-hover:text-[#EFFC76] transition-colors"} />
                <span>Products</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${
                    isProductsOpen || isActive("/products") ? "rotate-180 text-[#EFFC76]" : "group-hover:text-white"
                  }`}
                />
              </Link>

              <AnimatePresence>
                {isProductsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.97 }}
                    transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50"
                  >
                    <div className="w-[620px] bg-[#0b0b0e]/95 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden relative">
                      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#EFFC76] to-transparent opacity-80" />

                      <div className="px-6 pt-5 pb-3 flex items-start justify-between gap-6 border-b border-white/10">
                        <div>
                          <div className="text-white font-bold tracking-tight">
                            JEVXO SaaS Products
                          </div>
                          <div className="text-gray-400 text-xs mt-0.5 font-light">
                            Turnkey platforms ready for instant enterprise deployment.
                          </div>
                        </div>
                        <Link
                          href="/products"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#EFFC76] hover:text-white transition-colors"
                        >
                          <span>View All</span>
                          <ArrowRight size={13} />
                        </Link>
                      </div>

                      <div className="p-5">
                        <div className="grid grid-cols-2 gap-4">
                          {products.map((item) => (
                            <motion.div
                              key={item.title}
                              whileHover={{ y: -2, scale: 1.01 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Link
                                href={item.href}
                                onClick={() => setIsProductsOpen(false)}
                                className="group block rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#EFFC76]/40 transition-colors p-4 relative"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div>
                                    <div className="text-white font-bold text-sm group-hover:text-[#EFFC76] transition-colors">
                                      {item.title}
                                    </div>
                                    <div className="text-gray-400 text-xs mt-1 leading-relaxed font-light">
                                      {item.description}
                                    </div>
                                  </div>
                                  <span className="text-[10px] font-extrabold uppercase bg-[#EFFC76] text-black px-2 py-0.5 rounded-full shrink-0">
                                    {item.badge}
                                  </span>
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/industries"
              className={`group flex items-center gap-1.5 transition-all text-sm ${
                isActive("/industries")
                  ? "text-[#EFFC76] bg-[#EFFC76]/10 border border-[#EFFC76]/30 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(239,252,118,0.2)] font-semibold"
                  : "text-gray-300 hover:text-white px-3 py-1 rounded-full hover:bg-white/5 font-medium"
              }`}
            >
              <Building2 size={14} className={isActive("/industries") ? "text-[#EFFC76]" : "text-gray-400 group-hover:text-[#EFFC76] transition-colors"} />
              <span>Industries</span>
            </Link>

            <Link
              href="/security"
              className={`group flex items-center gap-1.5 transition-all text-sm ${
                isActive("/security")
                  ? "text-[#EFFC76] bg-[#EFFC76]/10 border border-[#EFFC76]/30 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(239,252,118,0.2)] font-semibold"
                  : "text-gray-300 hover:text-white px-3 py-1 rounded-full hover:bg-white/5 font-medium"
              }`}
            >
              <ShieldCheck size={14} className={isActive("/security") ? "text-[#EFFC76]" : "text-gray-400 group-hover:text-[#EFFC76] transition-colors"} />
              <span>Security</span>
            </Link>

            <Link
              href="/country-sales-partner"
              className={`text-[#EFFC76] transition-all text-xs font-bold uppercase tracking-wider flex items-center gap-2 px-4 py-1.5 rounded-full whitespace-nowrap group ${
                isActive("/country-sales-partner")
                  ? "bg-[#EFFC76] text-black border border-[#EFFC76] shadow-[0_0_25px_rgba(239,252,118,0.4)]"
                  : "bg-white/5 border border-[#EFFC76]/30 hover:border-[#EFFC76] hover:bg-[#EFFC76]/10 hover:text-white shadow-[0_0_20px_rgba(239,252,118,0.15)]"
              }`}
            >
              <span className={`w-2 h-2 rounded-full animate-pulse shrink-0 ${isActive("/country-sales-partner") ? "bg-black" : "bg-[#EFFC76]"}`} />
              <Globe size={13} className={isActive("/country-sales-partner") ? "text-black" : "text-[#EFFC76]"} />
              <span>Partner Roster</span>
            </Link>

            <Link
              href="/contact"
              className={`group flex items-center gap-1.5 transition-all text-sm ${
                isActive("/contact")
                  ? "text-[#EFFC76] bg-[#EFFC76]/10 border border-[#EFFC76]/30 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(239,252,118,0.2)] font-semibold"
                  : "text-gray-300 hover:text-white px-3 py-1 rounded-full hover:bg-white/5 font-medium"
              }`}
            >
              <Mail size={14} className={isActive("/contact") ? "text-[#EFFC76]" : "text-gray-400 group-hover:text-[#EFFC76] transition-colors"} />
              <span>Contact</span>
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <Link href="/contact">
              <SmoothButton>Get In Touch</SmoothButton>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-[9998] flex items-center justify-between px-5 py-3 bg-[#07070a]/95 backdrop-blur-2xl border-b border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.7)]">
        {/* Top glow line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#EFFC76] to-transparent opacity-70 pointer-events-none" />
        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#EFFC76]/50 to-transparent opacity-50 pointer-events-none" />

        <Link href="/">
          <Image
            src="/jevxo.png"
            alt="JEVXO Logo"
            width={130}
            height={42}
            className="h-9 w-auto object-contain"
          />
        </Link>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`p-2 rounded-xl border transition-all duration-200 ${
            isMenuOpen
              ? "bg-[#EFFC76]/10 border-[#EFFC76]/40 text-[#EFFC76]"
              : "bg-white/5 border-white/10 text-gray-300 hover:text-[#EFFC76] hover:border-[#EFFC76]/30"
          }`}
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Bottom Dock - iOS Style */}
      <div className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 w-10/12 max-w-sm z-50">
        <div className="bg-[#0A0A0A]/95 backdrop-blur-2xl border border-[#272725] rounded-2xl shadow-2xl px-3 py-2.5">
          <div className="grid grid-cols-5 gap-1 items-end">

            {/* Home */}
            <Link href="/" className="flex flex-col items-center gap-1 group">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                isActive("/") ? "bg-[#EFFC76]/20 border border-[#EFFC76]/50" : "bg-white/5 border border-white/10 group-hover:bg-white/10"
              }`}>
                <Home size={20} className={isActive("/") ? "text-[#EFFC76]" : "text-gray-400 group-hover:text-white"} />
              </div>
              <span className={`text-[9px] font-medium tracking-wide ${isActive("/") ? "text-[#EFFC76]" : "text-gray-500"}`}>Home</span>
            </Link>

            {/* Solutions */}
            <Link href="/solutions" className="flex flex-col items-center gap-1 group">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                isActive("/solutions") ? "bg-[#EFFC76]/20 border border-[#EFFC76]/50" : "bg-white/5 border border-white/10 group-hover:bg-white/10"
              }`}>
                <Building2 size={20} className={isActive("/solutions") ? "text-[#EFFC76]" : "text-gray-400 group-hover:text-white"} />
              </div>
              <span className={`text-[9px] font-medium tracking-wide ${isActive("/solutions") ? "text-[#EFFC76]" : "text-gray-500"}`}>Solutions</span>
            </Link>

            {/* Center Logo Button */}
            <div className="flex flex-col items-center -mt-4">
              <Link href="/">
                <div className="w-14 h-14 rounded-2xl bg-[#0d0d10] border border-[#EFFC76]/40 shadow-[0_0_20px_rgba(239,252,118,0.25)] flex items-center justify-center hover:scale-105 transition-transform p-1.5">
                  <Image
                    src="/jevxo.png"
                    alt="JEVXO Logo"
                    width={52}
                    height={26}
                    className="object-contain w-full h-full"
                  />
                </div>
              </Link>
            </div>

            {/* Services */}
            <Link href="/services" className="flex flex-col items-center gap-1 group">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                isActive("/services") ? "bg-[#EFFC76]/20 border border-[#EFFC76]/50" : "bg-white/5 border border-white/10 group-hover:bg-white/10"
              }`}>
                <Zap size={20} className={isActive("/services") ? "text-[#EFFC76]" : "text-gray-400 group-hover:text-white"} />
              </div>
              <span className={`text-[9px] font-medium tracking-wide ${isActive("/services") ? "text-[#EFFC76]" : "text-gray-500"}`}>Services</span>
            </Link>

            {/* More */}
            <button
              onClick={() => setIsBottomMenuOpen(!isBottomMenuOpen)}
              className="flex flex-col items-center gap-1 group"
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                isBottomMenuOpen ? "bg-[#EFFC76]/20 border border-[#EFFC76]/50" : "bg-white/5 border border-white/10 group-hover:bg-white/10"
              }`}>
                {isBottomMenuOpen
                  ? <X size={20} className="text-[#EFFC76]" />
                  : <Menu size={20} className="text-gray-400 group-hover:text-white" />
                }
              </div>
              <span className={`text-[9px] font-medium tracking-wide ${isBottomMenuOpen ? "text-[#EFFC76]" : "text-gray-500"}`}>More</span>
            </button>

          </div>
        </div>
      </div>

      {/* Bottom Floating Menu - NeonCode scattered style */}
      <AnimatePresence>
        {isBottomMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBottomMenuOpen(false)}
              className="fixed inset-0 z-[47] md:hidden bg-black/40 backdrop-blur-[2px]"
            />

            {/* Individually scattered floating cards */}
            {[
              { href: "/",                       icon: Home,       label: "Home",       col: 0 },
              { href: "/about",                  icon: Users,      label: "About",      col: 1 },
              { href: "/solutions",              icon: Building2,  label: "Solutions",  col: 2 },
              { href: "/services",               icon: Zap,        label: "Services",   col: 3 },
              { href: "/products",               icon: Layers,     label: "Products",   col: 0 },
              { href: "/industries",             icon: Briefcase,  label: "Industries", col: 1 },
              { href: "/security",               icon: ShieldCheck,label: "Security",   col: 2 },
              { href: "/country-sales-partner",  icon: Globe,      label: "Partners",   col: 3 },
              { href: "/contact",                icon: ArrowRight, label: "Contact",    col: 0 },
            ].map(({ href, icon: Icon, label, col }, i) => {
              const row = Math.floor(i / 4);
              const cardW = 66; // px
              const gap = 10;   // px
              const leftBase = 12;
              const bottomBase = 110; // above dock
              const left = leftBase + col * (cardW + gap);
              const bottom = bottomBase + row * (cardW + gap + 18);
              return (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, scale: 0.4, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.4, y: 30 }}
                  transition={{ type: "spring", damping: 18, stiffness: 280, delay: i * 0.04 }}
                  className="fixed z-[48] md:hidden"
                  style={{ left, bottom, width: cardW }}
                >
                  <Link
                    href={href}
                    onClick={() => setIsBottomMenuOpen(false)}
                    className="flex flex-col items-center gap-1 group"
                  >
                    <div
                      className={`rounded-[18px] flex items-center justify-center transition-all duration-200 shadow-xl ${
                        isActive(href)
                          ? "bg-[#EFFC76]/25 border border-[#EFFC76]/60 shadow-[0_0_16px_rgba(239,252,118,0.3)]"
                          : "bg-[#111114]/95 border border-white/10 group-hover:border-white/25 group-hover:bg-white/10"
                      }`}
                      style={{ width: cardW, height: cardW }}
                    >
                      <Icon
                        size={24}
                        className={isActive(href) ? "text-[#EFFC76]" : "text-gray-400 group-hover:text-white"}
                      />
                    </div>
                    <span
                      className={`text-[9px] font-medium text-center leading-tight w-full ${
                        isActive(href) ? "text-[#EFFC76]" : "text-gray-400"
                      }`}
                    >
                      {label}
                    </span>
                  </Link>
                </motion.div>
              );
            })}

            {/* Close card - bottom right corner above dock */}
            <motion.div
              initial={{ opacity: 0, scale: 0.4, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.4, y: 30 }}
              transition={{ type: "spring", damping: 18, stiffness: 280, delay: 9 * 0.04 }}
              className="fixed z-[48] md:hidden"
              style={{ right: 12, bottom: 110, width: 66 }}
            >
              <button
                onClick={() => setIsBottomMenuOpen(false)}
                className="flex flex-col items-center gap-1 group w-full"
              >
                <div
                  className="rounded-[18px] flex items-center justify-center bg-[#EFFC76]/15 border border-[#EFFC76]/40 shadow-[0_0_14px_rgba(239,252,118,0.2)] group-hover:bg-[#EFFC76]/25 transition-all"
                  style={{ width: 66, height: 66 }}
                >
                  <X size={22} className="text-[#EFFC76]" />
                </div>
                <span className="text-[9px] font-medium text-[#EFFC76]">Close</span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Full Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-[60] flex flex-col px-8 md:hidden overflow-y-auto"
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between py-6">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                <Image
                  src="/jevxo.png"
                  alt="JEVXO Logo"
                  width={100}
                  height={32}
                  className="h-12 w-auto -ml-5 object-contain"
                />
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col space-y-5 mt-3 pb-32 flex-grow">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="block text-xl font-medium text-white hover:text-[#EFFC76]"
              >
                Home
              </Link>

              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className="block text-xl font-medium text-white hover:text-[#EFFC76]"
              >
                About
              </Link>

              {/* Mobile Solutions Accordion */}
              <div className="flex flex-col">
                <div
                  className="flex items-center justify-between cursor-pointer group py-1"
                  onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
                >
                  <span className="text-xl font-medium text-white hover:text-[#EFFC76]">
                    Solutions
                  </span>
                  <ChevronDown
                    className={`text-white transition-transform duration-300 ${
                      mobileSolutionsOpen ? "rotate-180 text-[#EFFC76]" : ""
                    }`}
                    size={22}
                  />
                </div>
                <AnimatePresence>
                  {mobileSolutionsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden flex flex-col space-y-2 mt-2 pl-4 border-l border-white/10"
                    >
                      {solutionsList.map((sol) => (
                        <Link
                          key={sol.title}
                          href={sol.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="text-sm text-gray-400 font-medium hover:text-[#EFFC76] py-1 block"
                        >
                          {sol.title}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/services"
                onClick={() => setIsMenuOpen(false)}
                className="block text-xl font-medium text-white hover:text-[#EFFC76]"
              >
                Services
              </Link>

              {/* Mobile Products Accordion */}
              <div className="flex flex-col">
                <div
                  className="flex items-center justify-between cursor-pointer group py-1"
                  onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                >
                  <span className="text-xl font-medium text-white hover:text-[#EFFC76]">
                    Products
                  </span>
                  <ChevronDown
                    className={`text-white transition-transform duration-300 ${
                      mobileProductsOpen ? "rotate-180 text-[#EFFC76]" : ""
                    }`}
                    size={22}
                  />
                </div>
                <AnimatePresence>
                  {mobileProductsOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden flex flex-col space-y-2 mt-2 pl-4 border-l border-white/10"
                    >
                      {products.map((p) => (
                        <Link
                          key={p.title}
                          href={p.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="text-sm text-gray-400 font-medium hover:text-[#EFFC76] py-1 block"
                        >
                          {p.title}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/industries"
                onClick={() => setIsMenuOpen(false)}
                className="block text-xl font-medium text-white hover:text-[#EFFC76]"
              >
                Industries
              </Link>

              <Link
                href="/security"
                onClick={() => setIsMenuOpen(false)}
                className="block text-xl font-medium text-white hover:text-[#EFFC76]"
              >
                Security
              </Link>

              <Link
                href="/country-sales-partner"
                onClick={() => setIsMenuOpen(false)}
                className="block text-xl font-medium text-[#EFFC76]"
              >
                Partner Roster
              </Link>

              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block text-xl font-medium text-white hover:text-[#EFFC76]"
              >
                Contact
              </Link>

              <div className="pt-4">
                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="block"
                >
                  <button className="inline-flex items-center gap-2 bg-transparent border border-white/20 text-white px-6 py-2.5 rounded-full hover:bg-[#EFFC76] hover:text-black hover:border-[#EFFC76] transition-all group">
                    <span className="font-semibold text-lg">
                      Free Consultation
                    </span>
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-6 mt-auto pt-6 pb-8">
                {[
                  FaFacebookF,
                  FaInstagram,
                  FaXTwitter,
                  FaLinkedinIn,
                  FaYoutube,
                ].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-gray-400 hover:text-[#EFFC76] transition-colors p-2 -ml-2"
                  >
                    <Icon size={22} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
