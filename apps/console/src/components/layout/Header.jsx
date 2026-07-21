"use client";

import React from "react";
import {
  Calendar,
  Search,
  Bell,
  User,
  ChevronLeft,
  ChevronRight,
  Menu,
  LogOut,
  Shield,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const Header = ({ title = "Squadlog", subtitle, onMenuClick }) => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const defaultSubtitle =
    subtitle ||
    "An overview of key HR metrics and quick insights on employee activity.";

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const getUserInitials = () => {
    if (!user) return "U";
    const name = user.name || user.username || user.email || "";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name[0]?.toUpperCase() || "U";
  };

  const getUserName = () => {
    if (!user) return "User";
    return user.name || user.username || user.email || "User";
  };

  return (
    <header className="relative bg-black/10 backdrop-blur-xl border-b border-white/5 px-4 lg:px-8 py-4 lg:py-10.5 text-white shadow-2xl z-40">
      <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-[#EFFC76]/50 to-transparent opacity-50" />

      <div className="flex items-center lg:items-start justify-between mb-0 relative z-10 gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 -ml-2 text-white/70 hover:text-[#EFFC76] transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white mb-1 tracking-tight flex items-center gap-3">
              {title}
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full bg-[#EFFC76]/10 border border-[#EFFC76]/20 text-[10px] font-bold text-[#EFFC76] tracking-widest uppercase">
                Console
              </span>
            </h1>
            <p className="text-white/50 text-sm hidden sm:block font-light tracking-wide">
              {defaultSubtitle}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 lg:gap-6">
          {/* Date Range Picker */}
          <div className="hidden md:flex items-center gap-3 px-4 py-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-300 group cursor-pointer">
            <button className="text-white/40 group-hover:text-[#EFFC76] transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2.5">
              <Calendar className="w-4 h-4 text-[#EFFC76]" />
              <span className="text-xs font-medium text-white/70 group-hover:text-white transition-colors tracking-wide">
                Jan 1 - Jan 7, 2025
              </span>
            </div>
            <button className="text-white/40 group-hover:text-[#EFFC76] transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2.5 text-white/60 hover:text-[#EFFC76] hover:bg-[#EFFC76]/10 rounded-full transition-all duration-300">
              <Search className="w-5 h-5" />
            </button>
            <button className="relative p-2.5 text-white/60 hover:text-[#EFFC76] hover:bg-[#EFFC76]/10 rounded-full transition-all duration-300 group">
              <Bell className="w-5 h-5 group-hover:animate-swing" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-[#EFFC76] rounded-full shadow-[0_0_8px_#EFFC76] animate-pulse"></span>
            </button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="pl-2 pr-1 py-1 flex items-center gap-3 hover:bg-white/5 rounded-full transition-all duration-300 border border-transparent hover:border-white/10 group">
                <Avatar className="w-9 h-9 border-2 border-[#EFFC76]/20 group-hover:border-[#EFFC76] transition-colors shadow-[0_0_15px_rgba(239,252,118,0.1)]">
                  {user?.profileImage ? (
                    <AvatarImage src={user.profileImage} alt={getUserName()} />
                  ) : null}
                  <AvatarFallback className="bg-[#EFFC76] text-black text-sm font-bold">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-72 bg-gradient-to-b from-[#111111]/95 to-[#0A0A0A]/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] rounded-2xl p-2 mt-2"
            >
              <DropdownMenuLabel className="p-4 bg-white/5 rounded-xl mb-2">
                <div className="flex items-center gap-4">
                  <Avatar className="w-12 h-12 border border-white/10 shadow-lg">
                    {user?.profileImage ? (
                      <AvatarImage
                        src={user.profileImage}
                        alt={getUserName()}
                      />
                    ) : null}
                    <AvatarFallback className="bg-gradient-to-br from-[#EFFC76] to-[#d0df4f] text-black font-bold text-lg">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-white text-md font-medium  tracking-tight">
                      {getUserName()}
                    </span>
                    {user?.email && (
                      <span className="text-white/50 text-xs font-medium tracking-wide">
                        {user.email}
                      </span>
                    )}
                  </div>
                </div>
              </DropdownMenuLabel>

              {user?.role && (
                <div className="px-2 py-2 mb-2">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#EFFC76]/5 border border-[#EFFC76]/10">
                    <Shield className="w-4 h-4 text-[#EFFC76]" />
                    <span className="text-[#EFFC76] text-xs font-bold uppercase tracking-wider">
                      {user.role} Account
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-1 px-1">
                <DropdownMenuItem className="group flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 focus:text-white focus:bg-white/5 cursor-pointer transition-all duration-200">
                  <User className="w-4 h-4 group-hover:text-[#EFFC76] transition-colors" />
                  <span className="text-sm font-medium">Profile Settings</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-white/10 my-2" />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="group flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:text-red-300 focus:text-red-300 focus:bg-red-500/10 cursor-pointer transition-all duration-200"
                >
                  <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Sign Out</span>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
