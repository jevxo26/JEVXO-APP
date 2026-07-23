"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Wallet, BookOpen, Wrench, Users, ShieldCheck, Terminal, Webhook, Zap } from "lucide-react";

export default function HelpCategories() {
  const categories = [
    {
      icon: Rocket,
      title: "Getting Started",
      description: "Onboarding guides, platform overview, and initial setup checklist.",
    },
    {
      icon: Users,
      title: "Team Management",
      description: "Managing members, roles, permissions, and access controls.",
    },
    {
      icon: Wallet,
      title: "Billing & Plans",
      description: "Subscription details, invoices, payment methods, and upgrades.",
    },
    {
      icon: ShieldCheck,
      title: "Security & Compliance",
      description: "SSO configuration, audit logs, 2FA, and data privacy policies.",
    },
    {
      icon: Terminal,
      title: "Developer API",
      description: "API reference, authentication, rate limits, and SDKs.",
    },
    {
      icon: Webhook,
      title: "Integrations",
      description: "Connecting with Slack, Jira, GitHub, and other third-party tools.",
    },
    {
      icon: Wrench,
      title: "Troubleshooting",
      description: "Common error codes, system status, and debugging guides.",
    },
    {
      icon: Zap,
      title: "Best Practices",
      description: "Tips and tricks to maximize your productivity on the platform.",
    },
    {
      icon: BookOpen,
      title: "Glossary",
      description: "Definitions of key terms and concepts used in the console.",
    },
  ];

  return (
    <div className="mb-20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white">Browse by Category</h2>
        <button className="text-sm text-[#EFFC76] hover:underline">View all categories</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, index) => (
          <Card
            key={index}
            className="bg-[#1A1A1A] border border-white/5 hover:border-[#EFFC76]/50 transition-all duration-300 cursor-pointer group hover:-translate-y-1 hover:shadow-xl hover:shadow-[#EFFC76]/5"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#EFFC76] group-hover:text-black transition-colors duration-300 text-white/70">
                  <cat.icon className="w-6 h-6" />
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[#EFFC76]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#EFFC76] transition-colors">
                {cat.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">
                {cat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
