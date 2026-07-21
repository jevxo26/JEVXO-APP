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
  BarChart3,
  Users,
  ShieldCheck,
  Zap,
  Github,
  Chrome,
} from "lucide-react";
import { useLoginMutation } from "@/api/auth/authApi";
import { useAuth } from "@/contexts/AuthContext";
import TextField from "@/components/input/TextField";
import PasswordField from "@/components/input/PasswordField";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const profiles = [
  {
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop",
    name: "Marcus Reid",
    email: "marcus.reid@squadlog.io",
    role: "Lead Software Engineer",
    bg: "bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')]",
  },
  {
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    name: "Elara Voke",
    email: "elara.v@squadlog.io",
    role: "Product Designer",
    bg: "bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80')]",
  },
  {
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    name: "David Chen",
    email: "david.c@squadlog.io",
    role: "System Architect",
    bg: "bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80')]",
  },
];

export default function LoginPage() {
  const router = useRouter();
  const { login: setAuthUser, isAuthenticated } = useAuth();
  const [loginMutation, { isLoading }] = useLoginMutation();
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(0);

  // Auto-rotate profiles
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentProfile((prev) => (prev + 1) % profiles.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const handleQuickFill = () => {
    setValue("email", "ashikurovi2003@gmail.com");
    setValue("password", "123456");
  };

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data) => {
    setLoginError("");
    try {
      const result = await loginMutation({
        email: data.email,
        password: data.password,
      }).unwrap();

      if (result?.data?.access_token && result?.data?.user) {
        setAuthUser(result.data);
        toast.success("Welcome back, Commander!");

        // Get return URL from query params or default to dashboard
        const urlParams = new URLSearchParams(window.location.search);
        const returnUrl = urlParams.get("returnUrl") || "/";
        router.push(returnUrl);
      } else {
        setLoginError("Invalid response from server");
      }
    } catch (error) {
      const errorMessage =
        error?.data?.message || error?.message || "Invalid email or password";
      setLoginError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#0A0A0A] overflow-hidden">
      {/* Left Column - Login Form */}
      <div className="flex flex-col justify-center px-10  lg:px-8 relative z-10">
        <div className="w-full max-w-md mx-auto space-y-8">
          {/* Header */}
          <div className="text-center lg:text-left space-y-2">
            <div className="inline-flex items-center justify-center lg:justify-start gap-3 mb-6">
              <div className="p-3 rounded-xl bg-[#EFFC76]/10 border border-[#EFFC76]/20">
                <img src="/customIcon.png" alt="SquadLog" className="w-8 h-8" />
              </div>
              <span className="text-xl font-bold text-white tracking-wide">
                SquadLog Console
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Welcome back
            </h1>
            <p className="text-white/60 text-base">
              Enter your credentials to access your dashboard
            </p>
          </div>

          {/* Form */}
          <div className="glass-panel p-8 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden group">
            {/* Subtle glow effect on hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#EFFC76]/0 via-[#EFFC76]/5 to-[#EFFC76]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 relative z-10"
            >
              {/* Quick Fill (Dev Only) */}
              <div className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between group/fill">
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

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-white/80 ml-1">
                    Email Address
                  </label>
                  <div className="relative group/input">
                    <input
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      type="email"
                      placeholder="name@company.com"
                      className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 pl-11 text-white placeholder:text-white/30 focus:outline-none focus:border-[#EFFC76]/50 focus:ring-1 focus:ring-[#EFFC76]/50 transition-all duration-200"
                    />
                    <Mail className="absolute left-3.5 top-3.5 w-5 h-5 text-white/40 group-focus-within/input:text-[#EFFC76] transition-colors" />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-xs ml-1 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center ml-1">
                    <label className="text-sm font-medium text-white/80">
                      Password
                    </label>
                    <button
                      type="button"
                      className="text-xs text-[#EFFC76] hover:text-[#e0ef5f] transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative group/input">
                    <input
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full bg-[#121212] border border-white/10 rounded-xl px-4 py-3 pl-11 pr-11 text-white placeholder:text-white/30 focus:outline-none focus:border-[#EFFC76]/50 focus:ring-1 focus:ring-[#EFFC76]/50 transition-all duration-200"
                    />
                    <Lock className="absolute left-3.5 top-3.5 w-5 h-5 text-white/40 group-focus-within/input:text-[#EFFC76] transition-colors" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-white/40 hover:text-white transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-xs ml-1 mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#EFFC76] focus:ring-[#EFFC76]/50 focus:ring-offset-0"
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-white/60 cursor-pointer select-none"
                >
                  Remember me for 30 days
                </label>
              </div>

              {loginError && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2" />
                  <p className="text-red-400 text-sm flex-1">{loginError}</p>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#EFFC76] hover:bg-[#dce865] text-black font-bold py-6 text-base rounded-xl shadow-[0_0_20px_rgba(239,252,118,0.2)] hover:shadow-[0_0_30px_rgba(239,252,118,0.4)] transition-all duration-300"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Authenticating...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Sign In to Console <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#121212] px-2 text-white/40">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  type="button"
                  variant="outline"
                  className="relative h-12 rounded-xl border-white/10 bg-[#121212] text-white hover:border-[#EFFC76] hover:bg-[#EFFC76]/10 transition-all duration-300 group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                  <div className="relative flex items-center justify-center gap-3">
                    {/* <Github className="w-5 h-5 text-white group-hover:text-[#EFFC76] transition-colors" /> */}
                    <img
                      src="/github.png"
                      alt="GitHub"
                      className="h-5 w-5 object-contain"
                    />
                    <span className="font-semibold group-hover:text-[#EFFC76] transition-colors">
                      GitHub
                    </span>
                  </div>
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="relative h-12 rounded-xl border-white/10 bg-[#121212] text-white hover:border-[#EFFC76] hover:bg-[#EFFC76]/10 transition-all duration-300 group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

                  <div className="relative flex items-center justify-center gap-3">
                    <img
                      src="/google.png"
                      alt="Google"
                      width={20}
                      height={20}
                    />
                    <span className="font-semibold group-hover:text-[#EFFC76] transition-colors">
                      Google
                    </span>
                  </div>
                </Button>
              </div>
            </form>
          </div>

          <p className="text-center text-sm text-white/40">
            Don't have an account?{" "}
            <a href="#" className="text-[#EFFC76] hover:underline">
              Contact Admin
            </a>
          </p>
        </div>
      </div>

      {/* Right Column - User Profiles */}
      <div className="hidden lg:flex relative items-center justify-center overflow-hidden bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProfile}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className={`absolute inset-0 bg-cover bg-center ${profiles[currentProfile].bg}`}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 w-full max-w-lg px-8 flex flex-col items-center text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProfile}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="w-24 h-24 rounded-full border-4 border-white/10 shadow-2xl overflow-hidden mb-6 relative group">
                <div className="absolute inset-0 bg-[#EFFC76]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img 
                  src={profiles[currentProfile].image} 
                  alt={profiles[currentProfile].name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">
                {profiles[currentProfile].name}
              </h2>
              
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#EFFC76]/10 border border-[#EFFC76]/20 text-[#EFFC76] text-sm font-medium mb-4">
                {profiles[currentProfile].role}
              </div>

              <p className="text-lg text-white/60 font-light">
                {profiles[currentProfile].email}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Progress Indicators */}
          <div className="flex gap-2 mt-12">
            {profiles.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === currentProfile
                    ? "w-8 bg-[#EFFC76]"
                    : "w-2 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
