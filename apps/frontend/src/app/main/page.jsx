import Image from "next/image";
import { Layers } from "lucide-react";
import BeamCircle from "@/components/lightswind/beam-circle";
import WhoWeAre from "@/components/Home/WhoWeAre";
import Banner from "@/components/Home/Banner";
import Comparison from "@/components/Home/Comparison";
import Faq from "@/components/Home/Faq";
import Innovation from "@/components/Home/Innovation";
import Integration from "@/components/Home/Integration";
import LaunchYourSite from "@/components/Home/LaunchYourSite";
import OurProcess from "@/components/Home/OurProcess";
import Pricing from "@/components/Home/Pricing";
import Testimonial from "@/components/Home/Testimonial";
import CosmicBackground from "@/components/Home/CosmicBackground";
import DevOpsWorkflow from "@/components/Home/DevOpsWorkflow";
import PortfolioCard from "@/components/case-studies/PortfolioCard";
import TechStack from "@/components/Home/TechStack";
import OurTeam from "@/components/Home/OurTeam";

const TestPages = () => {
  return (
    <div className="overflow-x-hidden">
      {/* Background Cosmic Particle Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CosmicBackground />
      </div>

      <div className="relative z-10 space-y-0">
        {/* 1. Hero Banner */}
        <section>
          <Banner />
        </section>

        {/* 2. Who We Are Section */}
        <section className="-mt-8 md:-mt-12">
          <WhoWeAre />
        </section>

        {/* 4. Connected Ecosystem Section (100% NeonCode Reference Layout) */}
        <section className="py-16 text-white relative">
          <div className="w-10/12 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            
            {/* Left Column: Concentric Orbits with Center Logo */}
            <div className="lg:col-span-7 flex items-center justify-center lg:justify-start">
              <BeamCircle size={540} />
            </div>

            {/* Right Column: Card (Branding & Identity style) */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[420px] rounded-[36px] overflow-hidden border border-white/10 shadow-2xl bg-[#09150a]/90 backdrop-blur-xl">
                
                {/* Top Badge Icon */}
                <div className="absolute top-5 left-5 z-20 w-12 h-12 rounded-2xl bg-[#EFFC76] text-black flex items-center justify-center shadow-lg font-bold">
                  <Layers size={22} className="text-black" />
                </div>

                {/* Card Background Image */}
                <div className="relative w-full h-[380px] sm:h-[420px]">
                  <Image
                    src="/branding-card.png"
                    alt="Branding & Identity"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060d06] via-[#060d06]/70 to-transparent" />
                </div>

                {/* Card Content at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <p className="text-gray-400 text-xl font-mono font-semibold mb-1">01</p>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                    Branding & Identity
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed">
                    We create memorable brand identities that resonate with your audience and stand out in the market.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* 5. Innovation & Feature Highlights */}
        <section className="-mt-10 md:-mt-14">
          <Innovation />
        </section>

        {/* 6. Modern Tech Stack & Tools */}
        <section className="-mt-10 md:-mt-14">
          <TechStack />
        </section>

        {/* 7. Selected Work / Case Studies */}
        <section className="-mt-10 md:-mt-14">
          <PortfolioCard />
        </section>

        {/* 8. Our Engineering & Development Process */}
        <section className="-mt-10 md:-mt-14">
          <OurProcess />
        </section>

        {/* 9. CI/CD & DevOps Infrastructure */}
        <section className="-mt-10 md:-mt-14">
          <DevOpsWorkflow />
        </section>

        {/* 10. Ecosystem Integrations */}
        <section className="-mt-10 md:-mt-14">
          <Integration />
        </section>



        {/* 12. Fast Launch Solutions */}
        <section className="-mt-10 md:-mt-14">
          <LaunchYourSite />
        </section>

        {/* 13. Transparent Pricing */}
        <section className="-mt-10 md:-mt-14">
          <Pricing />
        </section>

        {/* 14. Competitive Comparison */}
        <section className="-mt-10 md:-mt-14">
          <Comparison />
        </section>

        {/* 15. Leadership & Engineering Team */}
        <section className="-mt-10 md:-mt-14">
          <OurTeam />
        </section>

        {/* 16. Client Testimonials */}
        <section className="-mt-10 md:-mt-14">
          <Testimonial />
        </section>

        {/* 17. FAQ */}
        <section className="-mt-10 md:-mt-14">
          <Faq />
        </section>


      </div>
    </div>
  );
};

export default TestPages;
