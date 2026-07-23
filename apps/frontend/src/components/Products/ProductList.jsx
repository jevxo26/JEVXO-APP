"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  ArrowUpRight, 
  ShoppingCart, 
  Layers,
  Bot,
  ShieldCheck,
  Zap,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";

const products = [
  {
    id: "01",
    title: "SquadCart",
    tagline: "Headless E-Commerce Engine",
    description: "A high-frequency e-commerce engine designed to streamline online storefront operations with real-time telemetry analytics, edge caching, and sub-second checkout.",
    icon: ShoppingCart,
    badge: "FLAGSHIP",
    link: "/products/squadcart",
    features: ["Sub-second Storefront", "Multi-channel Inventory", "Edge Caching API", "Automated Checkout"],
    metrics: "45% Higher Conversion",
  },
  {
    id: "02",
    title: "CleverERP",
    tagline: "Enterprise Operations Suite",
    description: "An all-in-one ERP platform to manage global financial operations, supply chains, inventory, and multi-tenant workforce workflows with absolute control.",
    icon: Layers,
    badge: "ENTERPRISE",
    link: "/main/products",
    features: ["Financial Automation", "Supply Chain Control", "Real-Time Reporting", "Multi-Currency"],
    metrics: "99.99% Operational SLA",
  },
  {
    id: "03",
    title: "ViperAI",
    tagline: "Autonomous Agent & RAG Pipeline",
    description: "Empower enterprise workflows with custom LLM agents, RAG vector document search, automated customer support, and predictive intelligence models.",
    icon: Bot,
    badge: "AI POWERED",
    link: "/main/products",
    features: ["RAG Vector Pipeline", "24/7 Agent Automation", "Custom LLM Fine-Tuning", "SOC2 Compliant"],
    metrics: "10x Operational Speed",
  },
  {
    id: "04",
    title: "OmniShield",
    tagline: "Zero-Trust Security Suite",
    description: "Enterprise-grade security monitoring platform featuring zero-trust authorization logs, automated vulnerability auditing, and real-time threat prevention.",
    icon: ShieldCheck,
    badge: "ZERO TRUST",
    link: "/main/products",
    features: ["Zero-Trust Protocols", "Continuous Threat Audits", "SOC2 & ISO Certified", "Automated Logs"],
    metrics: "Zero Security Incidents",
  },
];

const ProductList = () => {
  return (
    <section className="bg-transparent py-16 relative overflow-hidden select-none">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[600px] bg-[#EFFC76]/5 rounded-full blur-[180px] pointer-events-none" />

      {/* 10/12 Container Width */}
      <div className="w-10/12 mx-auto relative z-10">

        {/* Section Header Bar */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#EFFC76]/30 bg-[#EFFC76]/10 text-[#EFFC76] text-xs font-mono font-bold uppercase tracking-[0.2em] mb-3"
            >
              <Sparkles size={14} className="text-[#EFFC76]" />
              <span>EXPLORE OUR PRODUCT SUITE</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight"
            >
              Built For <span className="italic font-serif text-[#EFFC76] font-normal">Scale & Speed</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 bg-[#081808]/80 border border-[#EFFC76]/30 px-4 py-2 rounded-2xl backdrop-blur-md self-start md:self-auto"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#EFFC76] shadow-[0_0_10px_#EFFC76]" />
            <span className="text-xs font-mono text-gray-300">
              AVAILABLE PRODUCTS: <span className="text-[#EFFC76] font-bold">{products.length} PLATFORMS</span>
            </span>
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {products.map((product, index) => {
            const IconComponent = product.icon;

            return (
              <Link href={product.link} key={product.id} className="block group">
                <motion.div
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6 }}
                  className="relative h-full"
                >
                  {/* Ultra-Glassmorphic Product Card Container */}
                  <div className="relative h-full bg-[#051105]/92 backdrop-blur-2xl border border-[#EFFC76]/30 rounded-[36px] p-7 sm:p-10 overflow-hidden transition-all duration-500 group-hover:border-[#EFFC76] shadow-[0_20px_50px_rgba(0,0,0,0.9)] group-hover:shadow-[0_0_45px_rgba(239,252,118,0.35)] flex flex-col justify-between">
                    
                    {/* Top Neon Border Gradient Line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#EFFC76] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div>
                      {/* Card Header: Icon, Badge & ID */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-[#0b1d0b] border border-[#EFFC76]/40 flex items-center justify-center text-[#EFFC76] group-hover:scale-110 group-hover:bg-[#EFFC76] group-hover:text-black transition-all duration-500 shadow-[0_0_20px_rgba(239,252,118,0.2)]">
                            <IconComponent size={26} className="stroke-[2.2]" />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono font-extrabold text-[#EFFC76] uppercase tracking-widest block mb-0.5">
                              {product.tagline}
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#EFFC76] transition-colors duration-300 tracking-tight">
                              {product.title}
                            </h3>
                          </div>
                        </div>

                        {/* Top Right Badge */}
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#EFFC76]/15 text-[#EFFC76] border border-[#EFFC76]/40 shadow-sm">
                            {product.badge}
                          </span>
                          <span className="text-xs font-mono font-bold text-gray-500 hidden sm:inline">
                            {product.id}
                          </span>
                        </div>
                      </div>

                      {/* Product Description */}
                      <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed mb-6">
                        {product.description}
                      </p>

                      {/* Key Features List */}
                      <div className="grid grid-cols-2 gap-2.5 mb-8">
                        {product.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-2 bg-[#EFFC76]/10 border border-[#EFFC76]/25 rounded-xl px-3 py-2 text-xs font-mono text-[#EFFC76]">
                            <CheckCircle2 size={14} className="shrink-0 text-[#EFFC76]" />
                            <span className="truncate">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="pt-5 border-t border-[#EFFC76]/20 flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2">
                        <Zap size={14} className="text-[#EFFC76]" />
                        <span className="text-xs font-mono text-gray-300 font-semibold">
                          Metric: <span className="text-[#EFFC76] font-bold">{product.metrics}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-black font-extrabold text-xs sm:text-sm px-5 py-2.5 rounded-full bg-[#EFFC76] group-hover:bg-[#f3ff8c] transition-all duration-300 shadow-[0_0_20px_rgba(239,252,118,0.4)]">
                        <span>Explore Product</span>
                        <ArrowUpRight size={16} className="stroke-[3] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </div>

                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ProductList;
