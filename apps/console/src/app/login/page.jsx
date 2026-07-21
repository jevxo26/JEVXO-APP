"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Mail,
  Lock,
  Loader2,
  Eye,
  EyeOff,
  ArrowRight,
  Zap,
  ShieldCheck,
  Hexagon,
} from "lucide-react";
import { 
  useLoginMutation, 
  useForgotPasswordMutation, 
  useResetPasswordMutation 
} from "@/api/auth/authApi";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const profiles = [
  {
    name: "Marcus Reid",
    email: "marcus.reid@squadlog.io",
    role: "Lead Software Engineer",
    bg: "bg-[url('https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop')]",
  },
  {
    name: "Elara Voke",
    email: "elara.v@squadlog.io",
    role: "Product Designer",
    bg: "bg-[url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop')]",
  },
  {
    name: "David Chen",
    email: "david.c@squadlog.io",
    role: "System Architect",
    bg: "bg-[url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop')]",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const { login: setAuthUser, isAuthenticated } = useAuth();
  const [loginMutation, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(0);
  const [view, setView] = useState("login"); // login, forgot, reset
  const [resetEmail, setResetEmail] = useState("");

  const [forgotPassword, { isLoading: isForgotLoading }] = useForgotPasswordMutation();
  const [resetPassword, { isLoading: isResetLoading }] = useResetPasswordMutation();

  // Auto-rotate profiles
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentProfile((prev) => (prev + 1) % profiles.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Forms
  const loginForm = useForm();
  const forgotForm = useForm();
  const resetForm = useForm();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data) => {
    try {
      const result = await loginMutation({
        email: data.email,
        password: data.password,
      }).unwrap();

      if (result?.data?.access_token && result?.data?.user) {
        setAuthUser(result.data);
        toast.success("Welcome back, Commander!");

        const urlParams = new URLSearchParams(window.location.search);
        const returnUrl = urlParams.get("returnUrl") || "/";
        router.push(returnUrl);
      }
    } catch (error) {
      toast.error(error?.data?.message || error?.message || "Invalid email or password");
    }
  };

  const onForgotSubmit = async (data) => {
    try {
      await forgotPassword(data.email).unwrap();
      setResetEmail(data.email);
      setView("reset");
      toast.success("OTP sent to your email");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to send OTP");
    }
  };

  const onResetSubmit = async (data) => {
    try {
      if (data.newPassword !== data.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      await resetPassword({
        email: resetEmail,
        otp: data.otp,
        newPassword: data.newPassword
      }).unwrap();
      setView("login");
      toast.success("Password reset successful. Please login.");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to reset password");
    }
  };

  const handleQuickFill = () => {
    loginForm.setValue("email", "ashikurovi2003@gmail.com");
    loginForm.setValue("password", "123456");
  };

  return (
    <div className="min-h-screen flex w-full bg-[#0A0A0A] text-white selection:bg-[#EFFC76]/30">
      {/* LEFT SIDE - FORM SECTION */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-16 lg:p-24 bg-[#0A0A0A] relative overflow-hidden">
        {/* Decorative background for form side */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_2%_2%,rgba(239,252,118,0.05),transparent_40%)] pointer-events-none" />
        
        <div className="w-full max-w-md space-y-8 relative z-10">
          {/* Logo Section */}
          <div className="flex items-center gap-3 mb-10">
            <div className="p-3 rounded-xl bg-[#EFFC76]/10 border border-[#EFFC76]/20 group-hover:rotate-12 transition-all duration-300 shadow-lg shadow-[#EFFC76]/10">
              <img src="/customIcon.png" alt="SquadLog" className="w-8 h-8" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">
              SquadLog <span className="text-[#EFFC76]">Console</span>
            </span>
          </div>

          {/* Header Texts */}
          <div className="space-y-2">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl font-bold tracking-tight"
            >
              {view === "login" && "Welcome Back"}
              {view === "forgot" && "Reset Password"}
              {view === "reset" && "New Password"}
            </motion.h1>
            <p className="text-white/60 text-sm font-medium">
              {view === "login" && "Enter your credentials to access the commander dashboard."}
              {view === "forgot" && "Enter your email to receive a reset code."}
              {view === "reset" && "Enter the code and your new password."}
            </p>
          </div>

          {/* Modern Visual Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-white/10"></div>
            <div className="w-2 h-2 rounded-full bg-[#EFFC76]/40"></div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/10 to-white/10"></div>
          </div>

          {/* Login Form */}
          <AnimatePresence mode="wait">
            {view === "login" && (
              <motion.form 
                key="login"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6" 
                onSubmit={loginForm.handleSubmit(onSubmit)}
              >
                {/* Quick Fill (Dev Only) */}
                <div className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center justify-between group/fill">
                  <div className="text-xs text-white/50">
                    <span className="block mb-0.5">Demo Account Available</span>
                  </div>
                  <Button
                    type="button"
                    onClick={handleQuickFill}
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs text-[#EFFC76] hover:text-[#EFFC76] hover:bg-[#EFFC76]/10"
                  >
                    Auto Fill <Zap className="w-3 h-3 ml-1" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold ml-1 text-white/80">
                    Email Address
                  </label>
                  <div className="relative group/input">
                    <input
                      id="email"
                      type="email"
                      {...loginForm.register("email", { required: "Email is required" })}
                      placeholder="commander@squadlog.io"
                      className="w-full px-4 py-3.5 pl-11 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#EFFC76]/30 focus:border-[#EFFC76]/50 transition-all"
                      disabled={isLoading}
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within/input:text-[#EFFC76] transition-colors" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between ml-1">
                    <label htmlFor="password" className="block text-sm font-semibold text-white/80">
                      Password
                    </label>
                    <button 
                      type="button"
                      onClick={() => setView("forgot")}
                      className="text-sm font-medium text-white/40 hover:text-[#EFFC76] transition-colors"
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative group/input">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...loginForm.register("password", { required: "Password is required" })}
                      placeholder="••••••••"
                      className="w-full px-4 py-3.5 pl-11 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#EFFC76]/30 focus:border-[#EFFC76]/50 transition-all"
                      disabled={isLoading}
                    />
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within/input:text-[#EFFC76] transition-colors" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-7 px-4 bg-[#EFFC76] hover:bg-[#dce865] active:scale-[0.98] text-black font-bold text-base rounded-xl shadow-xl shadow-[#EFFC76]/10 transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
                >
                  {isLoading ? (
                    <Loader2 size={22} className="animate-spin" />
                  ) : (
                    <>
                      Sign Into Console
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </motion.form>
            )}

            {view === "forgot" && (
              <motion.form 
                key="forgot"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6" 
                onSubmit={forgotForm.handleSubmit(onForgotSubmit)}
              >
                <div className="space-y-1">
                  <label className="text-sm font-medium text-white/80 ml-1">
                    Email Address
                  </label>
                  <div className="relative group/input">
                    <input
                      {...forgotForm.register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      type="email"
                      placeholder="name@company.com"
                      className="w-full px-4 py-3.5 pl-11 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#EFFC76]/30 focus:border-[#EFFC76]/50 transition-all"
                    />
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within/input:text-[#EFFC76] transition-colors" />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isForgotLoading}
                  className="w-full py-7 px-4 bg-[#EFFC76] hover:bg-[#dce865] text-black font-bold text-base rounded-xl"
                >
                  {isForgotLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : "Send Reset Code"}
                </Button>

                <div className="text-center">
                  <button 
                    type="button" 
                    onClick={() => setView("login")}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    Back to Login
                  </button>
                </div>
              </motion.form>
            )}

            {view === "reset" && (
              <motion.form 
                key="reset"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6" 
                onSubmit={resetForm.handleSubmit(onResetSubmit)}
              >
                <div className="space-y-4">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-white/80">
                    Code sent to <span className="text-[#EFFC76]">{resetEmail}</span>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-white/80 ml-1">
                      OTP Code
                    </label>
                    <div className="relative group/input">
                      <input
                        {...resetForm.register("otp", {
                          required: "OTP is required",
                          minLength: { value: 6, message: "Code must be 6 digits" }
                        })}
                        type="text"
                        placeholder="Enter 6-digit code"
                        className="w-full px-4 py-3.5 pl-11 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#EFFC76]/30 focus:border-[#EFFC76]/50 transition-all"
                      />
                      <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within/input:text-[#EFFC76] transition-colors" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-white/80 ml-1">
                      New Password
                    </label>
                    <div className="relative group/input">
                      <input
                        {...resetForm.register("newPassword", {
                          required: "Password is required",
                          minLength: { value: 6, message: "Min 6 characters" }
                        })}
                        type="password"
                        placeholder="New password"
                        className="w-full px-4 py-3.5 pl-11 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#EFFC76]/30 focus:border-[#EFFC76]/50 transition-all"
                      />
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within/input:text-[#EFFC76] transition-colors" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-white/80 ml-1">
                      Confirm New Password
                    </label>
                    <div className="relative group/input">
                      <input
                        {...resetForm.register("confirmPassword", {
                          required: "Please confirm password",
                        })}
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full px-4 py-3.5 pl-11 rounded-xl border border-white/10 bg-white/5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#EFFC76]/30 focus:border-[#EFFC76]/50 transition-all"
                      />
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within/input:text-[#EFFC76] transition-colors" />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isResetLoading}
                  className="w-full py-7 px-4 bg-[#EFFC76] hover:bg-[#dce865] text-black font-bold text-base rounded-xl"
                >
                  {isResetLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : "Reset Password"}
                </Button>

                <div className="text-center">
                   <button 
                    type="button" 
                    onClick={() => setView("login")}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    Back to Login
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Footer Info */}
          <div className="text-center mt-10">
            <p className="text-xs text-white/20 uppercase tracking-widest font-bold">
              Secure Infrastructure • Enterprise Ready
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - PREMIUM HERO SECTION */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#0a0a0a] via-[#121212] to-[#0a0a0a] relative overflow-hidden items-center justify-center p-12">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_50%_40%,rgba(239,252,118,0.08),transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#EFFC76]/5 blur-[100px] rounded-full"></div>
        
        <div className="relative z-10 w-full max-w-lg">
          <div className="mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl xl:text-7xl font-light text-white leading-[1.1] tracking-tight"
            >
              Command <br />
              <span className="font-serif italic font-medium text-[#EFFC76]">your Operations</span> <br />
              with precision
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-lg text-white/50 font-medium max-w-md"
            >
              The most advanced console ever built for high-performance team management and log analysis.
            </motion.p>
          </div>

          {/* Premium Glassmorphic Visuals */}
          <div className="relative h-[300px] w-full mt-10">
            {/* Main Dashboard Card Preview */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotate: -2 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="absolute right-0 top-0 w-[320px] h-[380px] bg-white/5 backdrop-blur-2xl rounded-3xl p-8 border border-white/10 shadow-3xl z-20 flex flex-col justify-between"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-[#EFFC76] flex items-center justify-center shadow-lg shadow-[#EFFC76]/20">
                  <Hexagon size={24} className="text-black" fill="currentColor" />
                </div>
                <div className="px-3 py-1 bg-white/5 rounded-full border border-white/10">
                  <span className="text-[10px] font-bold text-white tracking-widest uppercase">Global Network</span>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <p className="text-xs text-white/40 mb-1 font-semibold uppercase tracking-wider text-left">Internal Traffic</p>
                  <h3 className="text-4xl font-black text-white leading-none">12.8M</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs font-bold text-[#EFFC76] bg-[#EFFC76]/10 px-2 py-0.5 rounded">+18.2%</span>
                    <span className="text-[10px] text-white/20 tracking-wide font-medium">Uptime: 99.99%</span>
                  </div>
                </div>

                <div className="space-y-3 pt-6 border-t border-white/5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-white/30 uppercase tracking-tighter">Active Sessions</span>
                    <span className="text-white">42,812</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "85%" }}
                      transition={{ duration: 1.5, delay: 1 }}
                      className="h-full bg-[#EFFC76]"
                    ></motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Smaller floating element - Current Profile */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="absolute -left-10 bottom-0 w-[240px] bg-black/60 backdrop-blur-xl rounded-2xl p-5 border border-white/10 shadow-2xl z-30"
            >
               <AnimatePresence mode="wait">
                 <motion.div
                   key={currentProfile}
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: 10 }}
                   className="flex items-center gap-4"
                 >
                    <div className={`w-12 h-12 rounded-full border-2 border-[#EFFC76]/50 bg-cover bg-center ${profiles[currentProfile].bg}`} />
                    <div className="flex-1 overflow-hidden">
                      <p className="text-xs text-white font-bold truncate">{profiles[currentProfile].name}</p>
                      <p className="text-[10px] text-[#EFFC76] font-medium truncate">{profiles[currentProfile].role}</p>
                    </div>
                 </motion.div>
               </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
