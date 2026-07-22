"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Copy, 
  Check, 
  Send,
  Zap,
  Globe,
  Building2
} from "lucide-react";
import SmoothButton from "@/Share/SmoothButton";
import { useMutation } from "@/hooks/useApi";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    designation: "",
    companyName: "",
    country: "",
    companyType: "",
    message: "",
    serviceType: "Custom Software",
    budgetRange: "$15k - $50k",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [trigger] = useMutation();

  const servicesList = [
    "Custom Software",
    "SaaS Platform",
    "AI & Automation",
    "Cloud & DevOps",
    "Mobile Ecosystem",
    "Enterprise Audit"
  ];

  const budgetOptions = [
    "< $10k",
    "$10k - $25k",
    "$25k - $50k",
    "$50k+"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("contact@jevxo.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      let clientId;
      
      const clientResponse = await trigger("/our-client", {
        method: "POST",
        body: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone || "",
          designation: formData.designation || "",
          companyName: formData.companyName || "",
        },
      });

      if (clientResponse.error && clientResponse.error.statusCode === 409) {
        try {
          const clientsResponse = await trigger("/our-client", {
            method: "GET",
          });

          if (!clientsResponse.error) {
            const clientsData = clientsResponse.data;
            const clients = clientsData?.data || clientsData || [];
            
            const existingClient = clients.find(
              (client) => client.email?.toLowerCase() === formData.email.toLowerCase()
            );

            if (existingClient) {
              clientId = existingClient.id;
            } else {
              throw new Error("Client with this email not found");
            }
          } else {
            throw new Error("Failed to fetch existing clients");
          }
        } catch (error) {
          throw new Error("Failed to find existing client: " + error.message);
        }
      } else if (clientResponse.error) {
        throw new Error(clientResponse.error.message || "Failed to create client");
      } else {
        clientId = clientResponse.data?.data?.id || clientResponse.data?.id;
        if (!clientId) {
          throw new Error("Client ID not received from API");
        }
      }

      const serviceRequestResponse = await trigger("/service-request", {
        method: "POST",
        body: {
          clientId: clientId,
          pricePackageId: null,
          details: `[Type: ${formData.companyType} | Country: ${formData.country} | Service: ${formData.serviceType} | Budget: ${formData.budgetRange}] - ${formData.message}`,
        },
      });

      if (serviceRequestResponse.error) {
        throw new Error(serviceRequestResponse.error.message || "Failed to submit request");
      }

      setSubmitSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        designation: "",
        companyName: "",
        country: "",
        companyType: "",
        message: "",
        serviceType: "Custom Software",
        budgetRange: "$15k - $50k",
      });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      setSubmitError(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-11/12 md:max-w-[1280px] mx-auto pt-28 pb-20 relative">
      
      {/* Header Section */}
      <div className="text-center mb-16 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-wider text-[#EFFC76] mb-6"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#EFFC76] animate-pulse"></div>
          24/7 Global Engineering Desk
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-medium text-white tracking-tight"
        >
          Accelerate Innovation With{" "}
          <span className="font-serif italic text-[#EFFC76]">
            JEVXO Software Experts
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-6 text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed"
        >
          Have a vision or technical challenge? Connect with our enterprise architects to build tailored digital solutions.
        </motion.p>

        {/* Ambient Top Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-[#EFFC76]/15 blur-[120px] pointer-events-none -z-10" />
      </div>

      {/* 3-Column Direct Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 relative z-10">
        {/* Card 1: Direct Email */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 rounded-2xl border border-white/10 bg-[#0c0c10]/80 backdrop-blur-xl relative overflow-hidden group hover:border-[#EFFC76]/40 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#EFFC76]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#EFFC76]">
              <Mail size={22} />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#EFFC76]/10 text-[#EFFC76] border border-[#EFFC76]/20">
              Avg &lt; 15 mins
            </span>
          </div>
          <h3 className="text-white text-base font-bold mb-1">Direct Engineering Mail</h3>
          <p className="text-gray-400 text-xs font-light mb-4">Send your RFPs or general inquiry directly to our lead desk.</p>
          
          <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5">
            <span className="text-white text-xs font-semibold select-all truncate">contact@jevxo.com</span>
            <button
              onClick={handleCopyEmail}
              className="text-gray-400 hover:text-[#EFFC76] transition-colors p-1"
              title="Copy Email"
            >
              {copiedEmail ? <Check size={16} className="text-[#EFFC76]" /> : <Copy size={16} />}
            </button>
          </div>
        </motion.div>

        {/* Card 2: Phone & WhatsApp */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl border border-white/10 bg-[#0c0c10]/80 backdrop-blur-xl relative overflow-hidden group hover:border-[#EFFC76]/40 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#EFFC76]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#EFFC76]">
              <Phone size={22} />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Hotline
            </span>
          </div>
          <h3 className="text-white text-base font-bold mb-1">Global Phone & WhatsApp</h3>
          <p className="text-gray-400 text-xs font-light mb-4">Speak directly with an enterprise software advisor today.</p>
          
          <a
            href="https://wa.me/8801886500056"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between bg-[#EFFC76]/10 border border-[#EFFC76]/30 hover:bg-[#EFFC76] hover:text-black transition-all rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#EFFC76] group/wa"
          >
            <span>+880 1886-500056</span>
            <ArrowRight size={15} className="group-hover/wa:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        {/* Card 3: Innovation HQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl border border-white/10 bg-[#0c0c10]/80 backdrop-blur-xl relative overflow-hidden group hover:border-[#EFFC76]/40 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#EFFC76]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#EFFC76]">
              <MapPin size={22} />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/10 text-gray-300 border border-white/10">
              Tech Hub
            </span>
          </div>
          <h3 className="text-white text-base font-bold mb-1">Global HQ & Operations</h3>
          <p className="text-gray-400 text-xs font-light mb-4">Dhaka, Bangladesh — Serving Global Clients Worldwide.</p>
          
          <div className="flex items-center gap-2 text-xs font-medium text-gray-300 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5">
            <Globe size={14} className="text-[#EFFC76]" />
            <span>Mon - Sat: 9:00 AM - 10:00 PM EST</span>
          </div>
        </motion.div>
      </div>

      {/* Main Interactive Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10"
      >
        {/* Glow halo */}
        <div className="absolute inset-0 bg-[#EFFC76]/10 blur-[80px] rounded-[2.5rem] pointer-events-none" />

        <div className="relative bg-[#07070a]/95 border border-white/15 rounded-[2rem] p-8 md:p-12 lg:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.9)] overflow-hidden">
          {/* Header Accent inside form */}
          <div className="flex items-center justify-between border-b border-white/10 pb-8 mb-8">
            <div>
              <h2 className="text-white text-2xl md:text-3xl font-bold tracking-tight">Project Discovery Form</h2>
              <p className="text-gray-400 text-sm font-light mt-1">Fill in details to receive a detailed technical proposal & estimate.</p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[#EFFC76] bg-[#EFFC76]/10 border border-[#EFFC76]/30 px-3.5 py-1.5 rounded-full">
              <Zap size={14} />
              <span>Free Consultation & NDA</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            
            {/* Service Selection Pills */}
            <div>
              <label className="block text-gray-300 text-xs font-bold uppercase tracking-wider mb-3">
                1. What service do you need?
              </label>
              <div className="flex flex-wrap gap-2.5">
                {servicesList.map((service) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, serviceType: service }))}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 border ${
                      formData.serviceType === service
                        ? "bg-[#EFFC76] text-black border-[#EFFC76] shadow-[0_0_15px_rgba(239,252,118,0.3)]"
                        : "bg-white/5 border-white/10 text-gray-300 hover:border-white/20 hover:bg-white/10"
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            {/* Estimated Budget Pills */}
            <div>
              <label className="block text-gray-300 text-xs font-bold uppercase tracking-wider mb-3">
                2. Estimated Project Budget
              </label>
              <div className="flex flex-wrap gap-2.5">
                {budgetOptions.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, budgetRange: b }))}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 border ${
                      formData.budgetRange === b
                        ? "bg-[#EFFC76] text-black border-[#EFFC76] shadow-[0_0_15px_rgba(239,252,118,0.3)]"
                        : "bg-white/5 border-white/10 text-gray-300 hover:border-white/20 hover:bg-white/10"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
              
              {/* First Name */}
              <div className="space-y-2">
                <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider ml-1">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="e.g. Alexander"
                  required
                  className="w-full bg-[#0d0d12] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#EFFC76] focus:ring-1 focus:ring-[#EFFC76]/50 transition-all text-sm"
                />
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider ml-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="e.g. Vance"
                  required
                  className="w-full bg-[#0d0d12] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#EFFC76] focus:ring-1 focus:ring-[#EFFC76]/50 transition-all text-sm"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider ml-1">
                  Work Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alexander@company.com"
                  required
                  className="w-full bg-[#0d0d12] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#EFFC76] focus:ring-1 focus:ring-[#EFFC76]/50 transition-all text-sm"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider ml-1">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  required
                  className="w-full bg-[#0d0d12] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#EFFC76] focus:ring-1 focus:ring-[#EFFC76]/50 transition-all text-sm"
                />
              </div>

              {/* Designation */}
              <div className="space-y-2">
                <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider ml-1">
                  Designation / Role *
                </label>
                <input
                  type="text"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  placeholder="e.g. CTO, VP of Product, Founder"
                  required
                  className="w-full bg-[#0d0d12] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#EFFC76] focus:ring-1 focus:ring-[#EFFC76]/50 transition-all text-sm"
                />
              </div>

              {/* Company Name */}
              <div className="space-y-2">
                <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider ml-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Acme Technologies Inc."
                  required
                  className="w-full bg-[#0d0d12] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#EFFC76] focus:ring-1 focus:ring-[#EFFC76]/50 transition-all text-sm"
                />
              </div>

              {/* Country */}
              <div className="space-y-2">
                <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider ml-1">
                  Country *
                </label>
                <div className="relative">
                  <select 
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0d0d12] border border-white/10 rounded-xl px-4 py-3.5 text-gray-300 focus:outline-none focus:border-[#EFFC76] focus:ring-1 focus:ring-[#EFFC76]/50 transition-all appearance-none cursor-pointer text-sm"
                  >
                    <option value="">Select Country...</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Other">Other Global</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    ▼
                  </div>
                </div>
              </div>

              {/* Industry / Company Type */}
              <div className="space-y-2">
                <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider ml-1">
                  Industry / Sector *
                </label>
                <div className="relative">
                  <select 
                    name="companyType"
                    value={formData.companyType}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#0d0d12] border border-white/10 rounded-xl px-4 py-3.5 text-gray-300 focus:outline-none focus:border-[#EFFC76] focus:ring-1 focus:ring-[#EFFC76]/50 transition-all appearance-none cursor-pointer text-sm"
                  >
                    <option value="">Select Industry...</option>
                    <option value="Fintech & Banking">Fintech & Banking</option>
                    <option value="Healthtech & Medical">Healthtech & Medical</option>
                    <option value="E-Commerce & Retail">E-Commerce & Retail</option>
                    <option value="Logistics & Supply Chain">Logistics & Supply Chain</option>
                    <option value="Enterprise SaaS">Enterprise SaaS</option>
                    <option value="AI & Robotics">AI & Robotics</option>
                    <option value="Other">Other Enterprise</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    ▼
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-gray-300 text-xs font-semibold uppercase tracking-wider ml-1">
                  Project Details & Key Requirements *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tell us about your project, target launch date, and key features needed..."
                  required
                  className="w-full bg-[#0d0d12] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#EFFC76] focus:ring-1 focus:ring-[#EFFC76]/50 transition-all resize-none text-sm"
                ></textarea>
              </div>

            </div>

            {/* Notifications */}
            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-6 py-4 rounded-xl flex items-center gap-3"
              >
                <CheckCircle2 size={20} className="shrink-0 text-emerald-400" />
                <span className="text-sm font-medium">Thank you! Your discovery request has been received. An enterprise lead architect will contact you shortly.</span>
              </motion.div>
            )}

            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/30 text-red-400 px-6 py-4 rounded-xl flex items-center gap-3"
              >
                <span className="text-sm font-medium">{submitError}</span>
              </motion.div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-[#EFFC76] hover:bg-[#dbe759] text-black font-extrabold text-base uppercase tracking-wider transition-all shadow-[0_0_30px_rgba(239,252,118,0.25)] flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                {isSubmitting ? (
                  <span>Submitting Request...</span>
                ) : (
                  <>
                    <span>Submit Proposal Request</span>
                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactForm;
