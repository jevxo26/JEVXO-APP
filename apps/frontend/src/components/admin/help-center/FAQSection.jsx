"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  Mail,
  Phone,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Users,
} from "lucide-react";

export default function FAQSection() {
  const faqs = [
    {
      question: "How do I configure Single Sign-On (SSO) for my team?",
      answer:
        "Navigate to Settings > Security > SSO Configuration. We support SAML 2.0 and OIDC providers like Okta, Azure AD, and Google Workspace. You'll need admin privileges to access these settings.",
    },
    {
      question: "What happens if I exceed my monthly API rate limit?",
      answer:
        "If you exceed your plan's API limit, requests will return a 429 Too Many Requests error. You can enable 'Overdraft Protection' in Billing settings to automatically scale your limit for a small fee, or upgrade your plan.",
    },
    {
      question: "Can I assign custom roles with specific permissions?",
      answer:
        "Yes, the Enterprise plan allows for Granular Access Control (RBAC). Go to Team > Roles > Create New Role to define custom permission sets for different resources and actions.",
    },
    {
      question: "How is data encryption handled at rest and in transit?",
      answer:
        "All data is encrypted using AES-256 at rest and TLS 1.3 in transit. We regularly undergo third-party security audits and are SOC 2 Type II compliant. You can download our security whitepaper from the Compliance section.",
    },
    {
      question: "Do you offer a dedicated account manager?",
      answer:
        "Dedicated account managers are available for Business and Enterprise plans. They provide quarterly business reviews, priority support escalation, and roadmap planning assistance.",
    },
    {
      question: "How do I export my data if I decide to cancel?",
      answer:
        "You retain full ownership of your data. You can use the 'Bulk Export' tool in Settings to download all your workspace data in JSON or CSV format before cancelling your subscription.",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-8 w-1 bg-[#EFFC76] rounded-full"></div>
          <h2 className="text-2xl font-bold text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-white/5 rounded-xl bg-[#1A1A1A] px-6 py-2 data-[state=open]:border-[#EFFC76]/30 data-[state=open]:bg-white/5 transition-all duration-300"
            >
              <AccordionTrigger className="text-white font-medium hover:text-[#EFFC76] text-left text-base py-4 [&[data-state=open]]:text-[#EFFC76]">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-white/60 text-base leading-relaxed pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="lg:col-span-4 space-y-6">
        {/* Support Card */}
        <div className="glass-card rounded-2xl p-6 border border-white/10 bg-gradient-to-b from-white/5 to-transparent relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#EFFC76]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#EFFC76]/20 transition-all duration-500"></div>

          <div className="w-12 h-12 bg-[#EFFC76] rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-[#EFFC76]/20">
            <MessageCircle className="w-6 h-6 text-black" />
          </div>

          <h3 className="text-xl font-bold text-white mb-2">
            Still need help?
          </h3>
          <p className="text-sm text-white/60 mb-8 leading-relaxed">
            Our expert support team is available 24/7 to assist you with
            technical issues, billing inquiries, or general questions.
          </p>

          <div className="space-y-3 mb-8">
            <Button className="w-full bg-[#EFFC76] hover:bg-[#dce865] text-black font-bold h-11">
              <MessageCircle className="w-4 h-4 mr-2" />
              Start Live Chat
            </Button>
            <Button
              variant="outline"
              className="w-full bg-white/5 border-white/20 text-white hover:bg-white/5 hover:text-white h-11"
            >
              <Mail className="w-4 h-4 mr-2" />
              Email Support
            </Button>
          </div>

          <div className="pt-6 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-white/10 border border-[#1A1A1A] flex items-center justify-center text-[10px] text-white"
                  >
                    <Users className="w-4 h-4" />
                  </div>
                ))}
              </div>
              <div className="text-xs text-white/50">
                <span className="text-[#EFFC76] font-bold">Wait time:</span> ~2
                mins
              </div>
            </div>
          </div>
        </div>

        {/* System Status Card */}
        <div className="rounded-2xl p-6 border border-white/10 bg-[#1A1A1A]">
          <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            System Status
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">API & Webhooks</span>
              <div className="flex items-center gap-1.5 text-xs text-[#EFFC76]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Operational
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">Dashboard</span>
              <div className="flex items-center gap-1.5 text-xs text-[#EFFC76]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Operational
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/70">Payment Gateway</span>
              <div className="flex items-center gap-1.5 text-xs text-[#EFFC76]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Operational
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-white/10 text-center">
            <a
              href="#"
              className="inline-flex items-center text-xs text-white/40 hover:text-white transition-colors"
            >
              View full status page <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
