import React from "react";
import CosmicBackground from "@/components/Home/CosmicBackground";

const page = () => {
  return (
    <div className="min-h-screen bg-[#050505] relative overflow-x-hidden pb-36 pt-28 select-none text-white">
      {/* Background Particles */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CosmicBackground />
      </div>

      <section className="w-10/12 mx-auto relative z-10 py-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFFC76]/10 border border-[#EFFC76]/30 text-xs font-mono font-bold text-[#EFFC76] mb-8">
          <span className="bg-[#EFFC76] text-black px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-extrabold">
            POLICY
          </span>
          <span>Refund & SLA Terms</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 tracking-tight uppercase">
          Refund <span className="font-serif italic font-normal text-[#EFFC76] lowercase">Policy</span>
        </h1>

        <div className="text-gray-400 font-mono text-xs mb-12">
          Last Updated: Jan 2026 | JEVXO Financial Compliance
        </div>

        <div className="space-y-8 max-w-4xl">
          <div className="bg-[#051105]/92 border border-[#EFFC76]/20 rounded-3xl p-7 sm:p-8 backdrop-blur-2xl">
            <h2 className="text-2xl font-black text-[#EFFC76] mb-3 tracking-tight">
              1. Service Refund Eligibility
            </h2>
            <p className="text-gray-300 text-sm font-light leading-relaxed">
              Refund eligibility for software development services and cloud deployments is governed by the specific terms signed in your Enterprise Master Services Agreement (MSA). Milestone deliverables and custom software modules are non-refundable once verified and accepted.
            </p>
          </div>

          <div className="bg-[#051105]/92 border border-[#EFFC76]/20 rounded-3xl p-7 sm:p-8 backdrop-blur-2xl">
            <h2 className="text-2xl font-black text-[#EFFC76] mb-3 tracking-tight">
              2. How to Submit a Refund Request
            </h2>
            <p className="text-gray-300 text-sm font-light leading-relaxed">
              To request a review or refund under SLA non-performance, please email <a href="mailto:support@jevxo.com" className="text-[#EFFC76] underline font-semibold">support@jevxo.com</a> with your order ID, project scope code, and detailed justification. Our finance team reviews all requests within 3 business days.
            </p>
          </div>

          <div className="bg-[#051105]/92 border border-[#EFFC76]/20 rounded-3xl p-7 sm:p-8 backdrop-blur-2xl">
            <h2 className="text-2xl font-black text-[#EFFC76] mb-3 tracking-tight">
              3. SLA Uptime Credit Processing
            </h2>
            <p className="text-gray-300 text-sm font-light leading-relaxed">
              If cloud instance availability falls below our guaranteed 99.99% SLA uptime in any billing month, enterprise accounts automatically receive prorated billing credits applied to the next billing cycle.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
