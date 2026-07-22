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
import CosmicBackground from "@/components/Home/CosmicBackground";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    setIsSolutionsOpen(true);
  };

  const handleSolutionsMouseLeave = () => {
    solutionsTimeoutRef.current = setTimeout(() => {
      setIsSolutionsOpen(false);
    }, 150);
  };

  const handleProductsMouseEnter = () => {
    if (productsTimeoutRef.current) clearTimeout(productsTimeoutRef.current);
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
        className={`hidden md:flex fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 relative overflow-hidden ${
          scrolled
            ? "bg-[#050508]/95 backdrop-blur-3xl border-b border-[#EFFC76]/25 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
            : "bg-[#050505]/80 backdrop-blur-2xl border-b border-white/10 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.7)]"
        }`}
      >
        {/* Glowing Top-Line Accent */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#EFFC76] to-transparent opacity-80 pointer-events-none" />

        {/* Custom Cosmic Background */}
        <div className="absolute inset-0 pointer-events-none opacity-50 z-0 overflow-hidden">
          <CosmicBackground />
        </div>

        <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-12 relative z-10">
          
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/fxiedLogo.png"
              alt="JEVXO Logo"
              width={120}
              height={40}
              className="rounded-md object-contain h-9 w-auto"
            />
          </Link>

          {/* Desktop Links with Icons */}
          <div className="flex items-center space-x-6 lg:space-x-8 whitespace-nowrap">
            <Link
              href="/"
              className="group flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              <Home size={14} className="text-gray-400 group-hover:text-[#EFFC76] transition-colors" />
              <span>Home</span>
            </Link>

            <Link
              href="/about"
              className="group flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              <Info size={14} className="text-gray-400 group-hover:text-[#EFFC76] transition-colors" />
              <span>About</span>
            </Link>

            {/* SOLUTIONS MEGA DROPDOWN WITH PREMIUM ANIMATIONS & CUSTOM OBSIDIAN GLASS BG */}
            <div
              className="relative py-2"
              onMouseEnter={handleSolutionsMouseEnter}
              onMouseLeave={handleSolutionsMouseLeave}
            >
              <Link
                href="/solutions"
                className="flex items-center gap-1.5 text-gray-300 hover:text-[#EFFC76] transition-colors text-sm font-medium group"
              >
                <Layers size={14} className="text-gray-400 group-hover:text-[#EFFC76] transition-colors" />
                <span>Solutions</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${
                    isSolutionsOpen ? "rotate-180 text-[#EFFC76]" : "group-hover:text-white"
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
              className="group flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              <Zap size={14} className="text-gray-400 group-hover:text-[#EFFC76] transition-colors" />
              <span>Services</span>
            </Link>

            <Link
              href="/industries"
              className="group flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              <Building2 size={14} className="text-gray-400 group-hover:text-[#EFFC76] transition-colors" />
              <span>Industries</span>
            </Link>

            <Link
              href="/careers"
              className="group flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              <Users size={14} className="text-gray-400 group-hover:text-[#EFFC76] transition-colors" />
              <span>Careers</span>
            </Link>

            <Link
              href="/security"
              className="group flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              <ShieldCheck size={14} className="text-gray-400 group-hover:text-[#EFFC76] transition-colors" />
              <span>Security</span>
            </Link>

            {/* PRODUCTS MEGA DROPDOWN WITH ANIMATION & CUSTOM BG */}
            <div
              className="relative py-2"
              onMouseEnter={handleProductsMouseEnter}
              onMouseLeave={handleProductsMouseLeave}
            >
              <Link
                href="/products"
                className="flex items-center gap-1.5 text-gray-300 hover:text-[#EFFC76] transition-colors text-sm font-medium group"
              >
                <Briefcase size={14} className="text-gray-400 group-hover:text-[#EFFC76] transition-colors" />
                <span>Products</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${
                    isProductsOpen ? "rotate-180 text-[#EFFC76]" : "group-hover:text-white"
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
              className="group flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              <Building2 size={14} className="text-gray-400 group-hover:text-[#EFFC76] transition-colors" />
              <span>Industries</span>
            </Link>

            <Link
              href="/careers"
              className="group flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              <Users size={14} className="text-gray-400 group-hover:text-[#EFFC76] transition-colors" />
              <span>Careers</span>
            </Link>

            <Link
              href="/security"
              className="group flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              <ShieldCheck size={14} className="text-gray-400 group-hover:text-[#EFFC76] transition-colors" />
              <span>Security</span>
            </Link>

            <Link
              href="/country-sales-partner"
              className="text-[#EFFC76] hover:text-black hover:bg-[#EFFC76] transition-all text-xs font-bold uppercase tracking-wider flex items-center gap-2 bg-white/5 border border-[#EFFC76]/30 hover:border-[#EFFC76] px-4 py-1.5 rounded-full whitespace-nowrap shadow-[0_0_20px_rgba(239,252,118,0.15)] group"
            >
              <span className="w-2 h-2 rounded-full bg-[#EFFC76] group-hover:bg-black animate-pulse shrink-0" />
              <Globe size={13} className="text-[#EFFC76] group-hover:text-black transition-colors" />
              <span>Partner Roster</span>
            </Link>

            <Link
              href="/contact"
              className="group flex items-center gap-1.5 text-gray-300 hover:text-white transition-colors text-sm font-medium"
            >
              <Mail size={14} className="text-gray-400 group-hover:text-[#EFFC76] transition-colors" />
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
      <div className="md:hidden absolute top-0 left-0 right-0 p-6 flex justify-center z-20 pointer-events-none bg-gradient-to-b from-black/80 to-transparent">
        <Link href="/" className="pointer-events-auto">
          <Image
            src="/fxiedLogo.png"
            alt="JEVXO Logo"
            width={120}
            height={40}
            className="h-15 w-auto"
          />
        </Link>
      </div>

      {/* Mobile Bottom Dock */}
      <div className="md:hidden fixed border bottom-8 left-4 right-4 z-50">
        <div className="bg-[#0A0A0A]/90 backdrop-blur-xl border border-[#272725] rounded-2xl grid grid-cols-5 items-end px-2 py-3 shadow-2xl relative">
          <div className="flex justify-center w-full">
            <Link
              href="/"
              className="text-gray-400 hover:text-[#EFFC76] transition-colors flex flex-col items-center gap-1 group"
            >
              <Home
                size={20}
                className="group-hover:-translate-y-0.5 transition-transform"
              />
              <span className="text-[10px] font-medium tracking-wide">
                Home
              </span>
            </Link>
          </div>

          <div className="flex justify-center w-full">
            <Link
              href="/solutions"
              className="text-gray-400 hover:text-[#EFFC76] transition-colors flex flex-col items-center gap-1 group"
            >
              <Building2
                size={20}
                className="group-hover:-translate-y-0.5 transition-transform"
              />
              <span className="text-[10px] font-medium tracking-wide">
                Solutions
              </span>
            </Link>
          </div>

          {/* Floating Central Button */}
          <div className="relative -top-6 flex flex-col items-center justify-end w-full">
            <Link href="/contact">
              <div className="bg-white/10 backdrop-blur-lg p-3 rounded-xl border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] transform transition-transform hover:scale-110 flex items-center justify-center">
                <Image
                  src="/customIcon.png"
                  alt="Center Icon"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          <div className="flex justify-center w-full">
            <Link
              href="/services"
              className="text-gray-400 hover:text-[#EFFC76] transition-colors flex flex-col items-center gap-1 group"
            >
              <Zap
                size={20}
                className="group-hover:-translate-y-0.5 transition-transform"
              />
              <span className="text-[10px] font-medium tracking-wide">
                Services
              </span>
            </Link>
          </div>

          <div className="flex justify-center w-full">
            <button
              onClick={() => setIsMenuOpen(true)}
              className={`text-gray-400 hover:text-[#EFFC76] transition-colors flex flex-col items-center gap-1 group ${
                isMenuOpen ? "text-[#EFFC76]" : ""
              }`}
            >
              <Menu
                size={20}
                className="group-hover:-translate-y-0.5 transition-transform"
              />
              <span className="text-[10px] font-medium tracking-wide">
                More
              </span>
            </button>
          </div>
        </div>
      </div>

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
                  src="/fxiedLogo.png"
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
