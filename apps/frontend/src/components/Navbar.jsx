"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronUp,
  ChevronDown,
  Plus,
  Home,
  Info,
  Briefcase,
  Mail,
  ShieldCheck,
  Zap,
  UserCheck,
  UserPlus,
  Layers,
  Sparkles,
  HelpCircle,
  Globe2,
  Building,
  Package,
  User,
  LogOut,
  LayoutDashboard,
  Settings,
} from "lucide-react";
import AppointmentModal from "@/components/Home/AppointmentModal";
import { useAuth } from "@/contexts/AuthContext";

const exploreCards = [
  { name: "Home", href: "/main", icon: Home },
  { name: "About", href: "/main/about", icon: Info },
  { name: "Projects", href: "/main/case-studies", icon: Briefcase },
  { name: "Services", href: "/main/services", icon: Zap },
  { name: "Solutions", href: "/main/solutions", icon: Layers },
  { name: "Products", href: "/main/products", icon: Package },
  { name: "Industries", href: "/main/industries", icon: Building },
  { name: "Country Partner", href: "/main/country-sales-partner", icon: Globe2 },
  { name: "Security", href: "/main/security", icon: ShieldCheck },
  { name: "Contact", href: "/main/contact", icon: Mail },
];

const UserAvatar = ({ user, size = "w-8 h-8", iconSize = 15 }) => {
  const [imgError, setImgError] = useState(false);
  const initials = [user?.firstName?.[0], user?.lastName?.[0]].filter(Boolean).join("").toUpperCase() || user?.name?.[0]?.toUpperCase() || "U";
  const isDummyUrl = user?.profileImage?.includes("example.com");
  const showImage = user?.profileImage && !imgError && !isDummyUrl;

  return (
    <div className={`relative ${size} rounded-full shrink-0 flex items-center justify-center`}>
      {showImage ? (
        <img
          src={user.profileImage}
          alt={user?.firstName || "Profile"}
          className={`${size} rounded-full object-cover border border-[#EFFC76]/70 shadow-sm`}
          onError={() => setImgError(true)}
        />
      ) : (
        <div className={`${size} rounded-full bg-gradient-to-tr from-[#0d1e0d] via-[#1a3a1a] to-[#2e522e] border border-[#EFFC76]/70 flex items-center justify-center shadow-inner`}>
          {initials ? (
            <span className="text-[11px] font-mono font-black text-[#EFFC76] tracking-wider leading-none">
              {initials}
            </span>
          ) : (
            <User size={iconSize} className="text-[#EFFC76]" />
          )}
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const exploreRef = useRef(null);
  const profileRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsExploreOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsExploreOpen(false);
    }, 250);
  };

  // Close explore and profile popups on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (exploreRef.current && !exploreRef.current.contains(e.target)) {
        setIsExploreOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (path) => {
    if (!pathname) return false;
    if (path === "/main" || path === "/") {
      return pathname === "/" || pathname === "/main";
    }
    // Match exact path or subroutes (e.g. /main/services/web-development matches /main/services)
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const isAnyExploreActive = exploreCards.some((card) => isActive(card.href));

  return (
    <>
      {/* ULTRA-PREMIUM FLOATING BOTTOM NAVIGATION DOCK */}
      <motion.div
        initial={{ y: 70, opacity: 0, scale: 0.92 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 22 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[96vw] select-none"
      >
        {/* Main Dock Container Bar (Ultra-Premium Glassmorphism & Neon Aura) */}
        <div className="bg-[#040c04]/94 backdrop-blur-2xl border border-[#EFFC76]/50 rounded-full px-5 sm:px-8 py-3.5 flex items-center gap-3 sm:gap-5 shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_30px_rgba(239,252,118,0.25)] hover:shadow-[0_0_45px_rgba(239,252,118,0.4)] hover:border-[#EFFC76] transition-all duration-500">
          
          {/* 1. Left Logo Badge */}
          <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/main"
              className="bg-[#0b1b0b] border border-[#EFFC76]/45 hover:border-[#EFFC76] hover:bg-[#122812] px-4 py-2 rounded-full flex items-center gap-2.5 text-white font-extrabold text-xs sm:text-sm shadow-[0_0_15px_rgba(239,252,118,0.25)] transition-all duration-300 group"
            >
              <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0 bg-black/50 border border-[#EFFC76]/50 flex items-center justify-center">
                <Image
                  src="/jevxo.png"
                  alt="JEVXO Logo"
                  width={18}
                  height={18}
                  className="object-contain group-hover:scale-110 transition-transform"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
              <span className="tracking-wide">
                JEV<span className="text-[#EFFC76]">XO</span>
              </span>
            </Link>
          </motion.div>

          {/* Divider */}
          <div className="h-6 w-[1px] bg-[#EFFC76]/30 hidden sm:block" />

          {/* 2. Middle Links & Explore Trigger */}
          <nav className="flex items-center gap-1.5 sm:gap-3 text-xs sm:text-sm font-semibold text-gray-200">
            
            {/* Projects Link */}
            <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/main/case-studies"
                className={`px-5 py-2.5 rounded-full border transition-all duration-300 font-extrabold block ${
                  isActive("/main/case-studies")
                    ? "text-black bg-[#EFFC76] border-[#EFFC76] shadow-[0_0_25px_rgba(239,252,118,0.85)] scale-105"
                    : "text-gray-200 border-transparent hover:text-[#EFFC76] hover:bg-[#EFFC76]/20 hover:border-[#EFFC76]/50 hover:shadow-[0_0_15px_rgba(239,252,118,0.3)]"
                }`}
              >
                Projects
              </Link>
            </motion.div>

            {/* Services Link */}
            <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/main/services"
                className={`px-5 py-2.5 rounded-full border transition-all duration-300 font-extrabold block ${
                  isActive("/main/services")
                    ? "text-black bg-[#EFFC76] border-[#EFFC76] shadow-[0_0_25px_rgba(239,252,118,0.85)] scale-105"
                    : "text-gray-200 border-transparent hover:text-[#EFFC76] hover:bg-[#EFFC76]/20 hover:border-[#EFFC76]/50 hover:shadow-[0_0_15px_rgba(239,252,118,0.3)]"
                }`}
              >
                Services
              </Link>
            </motion.div>

            {/* Solutions Link */}
            <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/main/solutions"
                className={`px-5 py-2.5 rounded-full border transition-all duration-300 font-extrabold block ${
                  isActive("/main/solutions")
                    ? "text-black bg-[#EFFC76] border-[#EFFC76] shadow-[0_0_25px_rgba(239,252,118,0.85)] scale-105"
                    : "text-gray-200 border-transparent hover:text-[#EFFC76] hover:bg-[#EFFC76]/20 hover:border-[#EFFC76]/50 hover:shadow-[0_0_15px_rgba(239,252,118,0.3)]"
                }`}
              >
                Solutions
              </Link>
            </motion.div>

            {/* Explore Button Trigger Wrapper */}
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              {/* Ultra-Sleek Glassmorphic 3D Overlapping Cards Deck */}
              <AnimatePresence>
                {isExploreOpen && (
                  <motion.div
                    ref={exploreRef}
                    initial={{ opacity: 0, y: 30, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.88 }}
                    transition={{ type: "spring", stiffness: 350, damping: 24 }}
                    className="absolute bottom-16 left-1/2 -translate-x-1/2 mb-4 z-50 pointer-events-auto flex items-center justify-center min-w-[580px] h-[120px]"
                  >
                    {exploreCards.map((card, idx) => {
                      const Icon = card.icon;
                      const active = isActive(card.href);
                      
                      // Compact 3D Arch offsets
                      const totalCards = exploreCards.length;
                      const midIndex = (totalCards - 1) / 2;
                      const offset = idx - midIndex;
                      const xOffset = offset * 48;
                      const yOffset = Math.pow(Math.abs(offset), 1.4) * 4.5 - 14;
                      const rotate = offset * 3.5;
                      const zIndex = 30 - Math.abs(offset);

                      return (
                        <motion.div
                          key={card.name}
                          initial={{ opacity: 0, y: 35, scale: 0.7 }}
                          animate={{
                            opacity: 1,
                            x: xOffset,
                            y: yOffset,
                            rotate: rotate,
                            scale: 1,
                          }}
                          exit={{ opacity: 0, y: 20, scale: 0.7 }}
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 22,
                            delay: idx * 0.02,
                          }}
                          whileHover={{
                            scale: 1.25,
                            y: yOffset - 18,
                            rotate: 0,
                            zIndex: 60,
                            transition: { type: "spring", stiffness: 450, damping: 18 },
                          }}
                          style={{ zIndex }}
                          className="absolute"
                        >
                          <Link
                            href={card.href}
                            onClick={() => setIsExploreOpen(false)}
                            className={`group flex flex-col items-center justify-center w-[68px] sm:w-[78px] h-[78px] sm:h-[88px] rounded-2xl sm:rounded-3xl p-2 border transition-all duration-300 shadow-2xl ${
                              active
                                ? "bg-[#EFFC76] text-black border-[#EFFC76] shadow-[0_0_30px_rgba(239,252,118,0.95)] ring-2 ring-[#EFFC76] font-black scale-110"
                                : "bg-[#040e04]/94 backdrop-blur-2xl text-gray-200 border-[#EFFC76]/35 hover:border-[#EFFC76] hover:bg-[#EFFC76] hover:text-black shadow-[0_10px_25px_rgba(0,0,0,0.85),0_0_15px_rgba(239,252,118,0.2)] hover:shadow-[0_0_30px_rgba(239,252,118,0.7)]"
                            }`}
                          >
                            <div className={`p-2 rounded-xl mb-1 transition-all ${
                              active 
                                ? "bg-black text-[#EFFC76]" 
                                : "bg-white/10 border border-[#EFFC76]/30 text-[#EFFC76] group-hover:bg-black group-hover:text-[#EFFC76] group-hover:scale-110"
                            }`}>
                              <Icon size={18} className="stroke-[2.5]" />
                            </div>
                            <span className={`text-[8.5px] sm:text-[9.5px] font-mono leading-tight text-center line-clamp-1 ${
                              active ? "font-black text-black" : "font-extrabold text-gray-200 group-hover:text-black"
                            }`}>
                              {card.name}
                            </span>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsExploreOpen((prev) => !prev)}
                className={`px-5 py-2.5 rounded-full border transition-all duration-300 flex items-center gap-1.5 font-extrabold ${
                  isExploreOpen || isAnyExploreActive
                    ? "bg-[#EFFC76] text-black border-[#EFFC76] shadow-[0_0_25px_rgba(239,252,118,0.85)]"
                    : "border-[#EFFC76]/40 bg-[#0d1e0d] hover:border-[#EFFC76] hover:bg-[#EFFC76]/20 hover:text-[#EFFC76] text-white shadow-[0_0_15px_rgba(239,252,118,0.15)] hover:shadow-[0_0_20px_rgba(239,252,118,0.3)]"
                }`}
              >
                <span>Explore</span>
                <ChevronUp
                  size={16}
                  className={`transition-transform duration-300 stroke-[2.5] ${isExploreOpen ? "rotate-180 text-black" : isAnyExploreActive ? "text-black" : "text-[#EFFC76]"}`}
                />
              </motion.button>
            </div>

            {/* Language Badge */}
            <motion.div whileHover={{ scale: 1.06 }} className="hidden sm:flex items-center justify-center px-4 py-2.5 rounded-full bg-[#0d1e0d] border border-[#EFFC76]/30 text-xs font-mono font-bold text-[#EFFC76] hover:border-[#EFFC76]/60 hover:text-white hover:bg-[#EFFC76]/20 transition-all cursor-default">
              EN
            </motion.div>

            {/* User Profile Pill & Professional Menu */}
            {isAuthenticated && user ? (
              <div className="relative" ref={profileRef}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setIsProfileOpen((prev) => !prev)}
                  className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-[#051405]/90 border border-[#EFFC76]/50 hover:border-[#EFFC76] text-xs font-mono font-bold text-white transition-all cursor-pointer shadow-[0_0_25px_rgba(239,252,118,0.25)] hover:shadow-[0_0_35px_rgba(239,252,118,0.45)] backdrop-blur-md"
                >
                  {/* Avatar with Online Status Indicator */}
                  <div className="relative shrink-0">
                    <UserAvatar user={user} size="w-8 h-8" iconSize={15} />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#051405] rounded-full shadow-[0_0_8px_#34d399] z-10" />
                  </div>

                  {/* Name & Role Tag */}
                  <div className="flex flex-col items-start text-left pr-1">
                    <span className="text-[12px] font-bold text-white tracking-tight leading-tight max-w-[130px] truncate">
                      {[user.firstName, user.lastName].filter(Boolean).join(" ") || user.name || user.email}
                    </span>
                    <span className="text-[9px] font-mono font-semibold text-[#EFFC76]/80 uppercase tracking-wider">
                      {user.role || user.position || "Member"}
                    </span>
                  </div>

                  <ChevronDown
                    size={14}
                    className={`text-[#EFFC76] transition-transform duration-300 ${isProfileOpen ? "rotate-180 text-white" : ""}`}
                  />
                </motion.div>

                {/* Professional Profile Dropdown Menu (Opens Upward) */}
                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute right-0 bottom-full mb-3 w-72 bg-[#040e04]/95 border border-[#EFFC76]/40 rounded-2xl p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.95),0_0_30px_rgba(239,252,118,0.2)] backdrop-blur-2xl z-50 overflow-hidden"
                    >
                      {/* Header Info */}
                      <div className="flex items-center gap-3 pb-3 mb-3 border-b border-white/10">
                        <UserAvatar user={user} size="w-11 h-11" iconSize={20} />
                        <div className="overflow-hidden text-left">
                          <h4 className="text-sm font-bold text-white truncate">
                            {[user.firstName, user.lastName].filter(Boolean).join(" ") || user.email}
                          </h4>
                          <p className="text-[11px] text-gray-400 font-mono truncate">{user.email}</p>
                          {user.department?.name && (
                            <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-[#EFFC76]/10 border border-[#EFFC76]/30 text-[9px] text-[#EFFC76] font-mono">
                              {user.department.name}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="space-y-1">
                        <Link
                          href="/console"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#EFFC76]/15 border border-transparent hover:border-[#EFFC76]/40 text-xs font-mono font-bold text-white transition-all group"
                        >
                          <LayoutDashboard size={16} className="text-[#EFFC76] group-hover:scale-110 transition-transform" />
                          <span>Main Dashboard</span>
                        </Link>

                        <Link
                          href="/console/settings"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 text-xs font-mono font-medium text-gray-300 hover:text-white transition-all group"
                        >
                          <Settings size={16} className="text-gray-400 group-hover:text-[#EFFC76] transition-colors" />
                          <span>Account Settings</span>
                        </Link>
                      </div>

                      {/* Logout Action */}
                      <div className="pt-3 mt-3 border-t border-white/10">
                        <button
                          onClick={() => {
                            setIsProfileOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 hover:border-red-500/60 text-red-400 hover:text-red-300 text-xs font-mono font-bold transition-all shadow-sm group"
                        >
                          <LogOut size={15} className="group-hover:-translate-x-0.5 transition-transform" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link href="/main/login">
                <motion.div whileHover={{ scale: 1.06 }} className="flex items-center justify-center px-6 py-2.5 rounded-full bg-[#0d1e0d] border border-[#EFFC76]/50 text-xs font-mono font-bold text-[#EFFC76] hover:border-[#EFFC76] hover:text-black hover:bg-[#EFFC76] transition-all cursor-pointer shadow-[0_0_20px_rgba(239,252,118,0.3)]">
                  Login
                </motion.div>
              </Link>
            )}
          </nav>
        </div>
      </motion.div>

      {/* Appointment / Contact Modal */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
