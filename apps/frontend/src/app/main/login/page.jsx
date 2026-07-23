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
  ShieldCheck,
  Zap,
  Sparkles,
  CheckCircle2,
  ChevronLeft,
  Activity,
  Cpu,
  Globe2,
  Server,
  Layers,
  Star,
  Quote,
  Radio,
  Terminal,
} from "lucide-react";
import {
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} from "@/api/auth/authApi";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { login: setAuthUser, isAuthenticated } = useAuth();
  const [loginMutation, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [view, setView] = useState("login"); // login | forgot | reset
  const [resetEmail, setResetEmail] = useState("");

  const [forgotPassword, { isLoading: isForgotLoading }] = useForgotPasswordMutation();
  const [resetPassword, { isLoading: isResetLoading }] = useResetPasswordMutation();

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    setValue: setLoginValue,
    formState: { errors: loginErrors },
  } = useForm({
    defaultValues: {
      email: "admin@gmail.com",
      password: "password123",
    },
  });

  const {
    register: registerForgot,
    handleSubmit: handleForgotSubmit,
    formState: { errors: forgotErrors },
  } = useForm();

  const {
    register: registerReset,
    handleSubmit: handleResetSubmit,
    formState: { errors: resetErrors },
  } = useForm();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/console");
    }
  }, [isAuthenticated, router]);

  // Handle Login Submit
  const onLoginSubmit = async (data) => {
    try {
      const result = await loginMutation({
        email: data.email,
        password: data.password,
      }).unwrap();

      if (result?.data?.access_token && result?.data?.user) {
        setAuthUser(result.data);
        toast.success("Welcome back! Login successful.");

        const urlParams = new URLSearchParams(window.location.search);
        const returnUrl = urlParams.get("returnUrl") || "/console";
        router.push(returnUrl);
      } else {
        toast.error("Unexpected API response structure");
      }
    } catch (error) {
      toast.error(error?.data?.message || error?.message || "Invalid email or password");
    }
  };

  // Quick Instant Fill Demo Credentials
  const fillDemoCredentials = () => {
    setLoginValue("email", "admin@gmail.com");
    setLoginValue("password", "password123");
    toast.info("Demo credentials loaded!");
  };

  // Handle Forgot Password Submit
  const onForgotSubmit = async (data) => {
    try {
      await forgotPassword(data.email).unwrap();
      setResetEmail(data.email);
      setView("reset");
      toast.success("OTP reset code sent to your email!");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to send OTP code");
    }
  };

  // Handle Reset Password Submit
  const onResetSubmit = async (data) => {
    try {
      if (data.newPassword !== data.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      await resetPassword({
        email: resetEmail,
        otp: data.otp,
        newPassword: data.newPassword,
      }).unwrap();

      toast.success("Password reset successful! Please sign in.");
      setView("login");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#020902] text-white grid grid-cols-1 lg:grid-cols-12 relative overflow-hidden">
      {/* Background Cosmic Glows & Radials */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#EFFC76]/10 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0d200d15_1px,transparent_1px),linear-gradient(to_bottom,#0d200d15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* LEFT COLUMN: PREMIUM ENTERPRISE SHOWCASE */}
      <div className="lg:col-span-7 flex flex-col justify-between p-8 sm:p-12 lg:p-16 relative z-10 border-b lg:border-b-0 lg:border-r border-white/10 bg-[#020902]/60 backdrop-blur-md">
        {/* Brand Header */}
        <div>
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-[#EFFC76] text-black flex items-center justify-center font-mono font-black text-2xl shadow-[0_0_35px_rgba(239,252,118,0.75)] group-hover:scale-105 transition-transform">
              J
            </div>
            <div className="flex flex-col text-left">
              <span className="text-2xl font-mono font-black tracking-wider text-white">
                JEVXO <span className="text-[#EFFC76] text-xs tracking-widest font-bold uppercase ml-1.5 px-2.5 py-0.5 rounded-full bg-[#EFFC76]/10 border border-[#EFFC76]/40">Dashboard v3.4</span>
              </span>
              <span className="text-[11px] font-mono text-gray-400">Enterprise Cloud Infrastructure & AI Automation</span>
            </div>
          </Link>
        </div>

        {/* Hero Showcase Content */}
        <div className="my-10 lg:my-0 max-w-2xl text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Live Telemetry Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0d220d] border border-[#EFFC76]/50 text-[#EFFC76] text-xs font-mono font-bold mb-6 shadow-[0_0_20px_rgba(239,252,118,0.2)]">
              <Radio size={14} className="text-emerald-400 animate-pulse" />
              <span>Real-Time Enterprise Grid • 99.99% Uptime SLA</span>
            </div>

            {/* Premium Headline */}
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-[1.12] mb-6">
              Architecting Next-Gen <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EFFC76] via-emerald-300 to-[#EFFC76]">
                Digital Ecosystems
              </span>{" "}
              & Autonomous AI.
            </h1>

            <p className="text-sm sm:text-base text-gray-300 font-mono leading-relaxed mb-8">
              Unified command portal for mission-critical microservices, automated deployment pipelines, real-time log analytics, and team governance.
            </p>

            {/* Premium Metrics Showcase Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div className="p-4 rounded-2xl bg-[#041204]/80 border border-[#EFFC76]/30 backdrop-blur-xl shadow-lg hover:border-[#EFFC76]/60 transition-all">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] font-mono font-semibold text-gray-400">GLOBAL TRAFFIC</span>
                  <Activity size={16} className="text-[#EFFC76]" />
                </div>
                <div className="text-xl sm:text-2xl font-mono font-black text-white">14.2M req/sec</div>
                <div className="flex items-center gap-1.5 mt-1 text-[10px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Optimal Latency (4ms)</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#041204]/80 border border-[#EFFC76]/30 backdrop-blur-xl shadow-lg hover:border-[#EFFC76]/60 transition-all">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] font-mono font-semibold text-gray-400">SECURITY PROTOCOL</span>
                  <ShieldCheck size={16} className="text-emerald-400" />
                </div>
                <div className="text-xl sm:text-2xl font-mono font-black text-white">Zero-Trust</div>
                <div className="flex items-center gap-1.5 mt-1 text-[10px] font-mono text-gray-400">
                  <span>256-bit Encrypted SSL</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#041204]/80 border border-[#EFFC76]/30 backdrop-blur-xl shadow-lg hover:border-[#EFFC76]/60 transition-all">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] font-mono font-semibold text-gray-400">AI WORKFLOWS</span>
                  <Cpu size={16} className="text-[#EFFC76]" />
                </div>
                <div className="text-xl sm:text-2xl font-mono font-black text-white">128 Nodes</div>
                <div className="flex items-center gap-1.5 mt-1 text-[10px] font-mono text-emerald-400">
                  <span>Active Execution</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#041204]/80 border border-[#EFFC76]/30 backdrop-blur-xl shadow-lg hover:border-[#EFFC76]/60 transition-all">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[11px] font-mono font-semibold text-gray-400">DEPLOYMENT MESH</span>
                  <Globe2 size={16} className="text-emerald-400" />
                </div>
                <div className="text-xl sm:text-2xl font-mono font-black text-white">Multi-Region</div>
                <div className="flex items-center gap-1.5 mt-1 text-[10px] font-mono text-gray-400">
                  <span>Worldwide Edge Nodes</span>
                </div>
              </div>
            </div>

            {/* Premium Testimonial Quote */}
            <div className="mt-8 p-4 rounded-2xl bg-[#0d220d]/40 border border-[#EFFC76]/25 flex items-start gap-3">
              <Quote size={20} className="text-[#EFFC76] shrink-0 mt-0.5" />
              <div className="text-left">
                <p className="text-xs text-gray-300 font-mono italic">
                  "JEVXO Console provides unprecedented clarity into our microservices architecture and automated pipelines."
                </p>
                <span className="block mt-2 text-[10px] font-mono font-bold text-[#EFFC76]">
                  — Enterprise Engineering Team
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Hero Footer */}
        <div className="flex items-center justify-between text-xs font-mono text-gray-500 pt-6 border-t border-white/10">
          <span>© 2026 JEVXO Inc. All rights reserved.</span>
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Systems Operational
          </span>
        </div>
      </div>

      {/* RIGHT COLUMN: PREMIUM FORM CONTAINER */}
      <div className="lg:col-span-5 flex flex-col justify-center items-center p-6 sm:p-12 relative z-10 bg-[#040f04]/90 backdrop-blur-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="w-full max-w-lg"
        >
          {/* Card Box */}
          <div className="bg-[#051405]/95 border border-[#EFFC76]/40 rounded-3xl p-8 sm:p-10 shadow-[0_25px_65px_rgba(0,0,0,0.95),0_0_40px_rgba(239,252,118,0.2)] relative">
            <AnimatePresence mode="wait">
              {/* VIEW 1: LOGIN FORM */}
              {view === "login" && (
                <motion.div
                  key="login-view"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.25 }}
                  className="text-left"
                >
                  <div className="mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFFC76]/10 border border-[#EFFC76]/30 text-[10px] font-mono font-bold text-[#EFFC76] uppercase tracking-wider mb-3">
                      <Terminal size={12} />
                      <span>Commander Portal</span>
                    </div>
                    <h2 className="text-2xl font-black text-white tracking-tight">Sign In to Dashboard</h2>
                    <p className="text-xs text-gray-400 font-mono mt-1">
                      Enter your administrative credentials to unlock the dashboard
                    </p>
                  </div>

                  {/* Instant Demo Credentials Fill Button */}
                  <button
                    type="button"
                    onClick={fillDemoCredentials}
                    className="w-full mb-6 bg-gradient-to-r from-[#0d220d] via-[#163816] to-[#0d220d] border border-[#EFFC76]/60 hover:border-[#EFFC76] text-[#EFFC76] py-3.5 px-4 rounded-2xl text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_20px_rgba(239,252,118,0.2)] hover:shadow-[0_0_30px_rgba(239,252,118,0.4)] group cursor-pointer"
                  >
                    <Sparkles size={16} className="text-[#EFFC76] group-hover:scale-110 transition-transform" />
                    <span>⚡ Load Demo Credentials (admin@gmail.com)</span>
                  </button>

                  {/* Login Form */}
                  <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="space-y-5">
                    {/* Email Field */}
                    <div>
                      <label className="block text-xs font-mono text-gray-300 mb-2 font-semibold">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                          <Mail size={18} />
                        </div>
                        <input
                          type="email"
                          placeholder="name@company.com"
                          {...registerLogin("email", { required: "Email is required" })}
                          className="w-full pl-11 pr-4 py-3.5 bg-[#020b02] border border-white/15 focus:border-[#EFFC76] rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#EFFC76] transition-all font-mono"
                        />
                      </div>
                      {loginErrors.email && (
                        <p className="text-red-400 text-[11px] font-mono mt-1">
                          {loginErrors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Password Field */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-xs font-mono text-gray-300 font-semibold">
                          Password
                        </label>
                        <button
                          type="button"
                          onClick={() => setView("forgot")}
                          className="text-[11px] font-mono text-[#EFFC76] hover:underline"
                        >
                          Forgot password?
                        </button>
                      </div>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                          <Lock size={18} />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          {...registerLogin("password", { required: "Password is required" })}
                          className="w-full pl-11 pr-11 py-3.5 bg-[#020b02] border border-white/15 focus:border-[#EFFC76] rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#EFFC76] transition-all font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white"
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      {loginErrors.password && (
                        <p className="text-red-400 text-[11px] font-mono mt-1">
                          {loginErrors.password.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full mt-2 bg-[#EFFC76] hover:bg-[#f3ff8c] text-black font-mono font-black py-4 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_30px_rgba(239,252,118,0.6)] hover:shadow-[0_0_40px_rgba(239,252,118,0.85)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          <span>Authenticating...</span>
                        </>
                      ) : (
                        <>
                          <span>Sign In to Console</span>
                          <ArrowRight size={18} />
                        </>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}

              {/* VIEW 2: FORGOT PASSWORD */}
              {view === "forgot" && (
                <motion.div
                  key="forgot-view"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                  className="text-left"
                >
                  <button
                    type="button"
                    onClick={() => setView("login")}
                    className="inline-flex items-center gap-1 text-xs font-mono text-[#EFFC76] hover:underline mb-4"
                  >
                    <ChevronLeft size={14} /> Back to Sign In
                  </button>

                  <h2 className="text-2xl font-black text-white tracking-tight">Reset Password</h2>
                  <p className="text-xs text-gray-400 font-mono mt-1 mb-6">
                    Enter your registered email address to receive an OTP code
                  </p>

                  <form onSubmit={handleForgotSubmit(onForgotSubmit)} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-gray-300 mb-2 font-semibold">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                          <Mail size={18} />
                        </div>
                        <input
                          type="email"
                          placeholder="name@company.com"
                          {...registerForgot("email", { required: "Email is required" })}
                          className="w-full pl-11 pr-4 py-3.5 bg-[#020b02] border border-white/15 focus:border-[#EFFC76] rounded-xl text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#EFFC76] font-mono"
                        />
                      </div>
                      {forgotErrors.email && (
                        <p className="text-red-400 text-[11px] font-mono mt-1">
                          {forgotErrors.email.message}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isForgotLoading}
                      className="w-full bg-[#EFFC76] hover:bg-[#f3ff8c] text-black font-mono font-black py-3.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(239,252,118,0.5)] disabled:opacity-50"
                    >
                      {isForgotLoading ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <span>Send Reset OTP Code</span>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}

              {/* VIEW 3: RESET OTP & NEW PASSWORD */}
              {view === "reset" && (
                <motion.div
                  key="reset-view"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                  className="text-left"
                >
                  <h2 className="text-2xl font-black text-white tracking-tight">Verify OTP Code</h2>
                  <p className="text-xs text-gray-400 font-mono mt-1 mb-6">
                    Enter the code sent to <span className="text-[#EFFC76] font-bold">{resetEmail}</span>
                  </p>

                  <form onSubmit={handleResetSubmit(onResetSubmit)} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-gray-300 mb-1.5 font-semibold">
                        OTP Code
                      </label>
                      <input
                        type="text"
                        placeholder="6-digit code"
                        {...registerReset("otp", { required: "OTP code is required" })}
                        className="w-full px-4 py-3.5 bg-[#020b02] border border-white/15 focus:border-[#EFFC76] rounded-xl text-sm text-white focus:outline-none font-mono tracking-widest text-center text-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-gray-300 mb-1.5 font-semibold">
                        New Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        {...registerReset("newPassword", { required: "New password required" })}
                        className="w-full px-4 py-3.5 bg-[#020b02] border border-white/15 focus:border-[#EFFC76] rounded-xl text-sm text-white focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-gray-300 mb-1.5 font-semibold">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        {...registerReset("confirmPassword", { required: "Confirm password required" })}
                        className="w-full px-4 py-3.5 bg-[#020b02] border border-white/15 focus:border-[#EFFC76] rounded-xl text-sm text-white focus:outline-none font-mono"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isResetLoading}
                      className="w-full bg-[#EFFC76] hover:bg-[#f3ff8c] text-black font-mono font-black py-3.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(239,252,118,0.5)] disabled:opacity-50"
                    >
                      {isResetLoading ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <span>Save Password & Sign In</span>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Security Badge */}
          <div className="mt-8 text-center flex items-center justify-center gap-2 text-xs font-mono text-gray-500">
            <ShieldCheck size={16} className="text-emerald-400" />
            <span>Encrypted 256-bit SSL • Zero-Trust Access Layer</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
