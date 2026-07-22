import WhoWeAre from "@/components/Home/WhoWeAre";
import Banner from "@/components/Home/Banner";
import Comparison from "@/components/Home/Comparison";
import Faq from "@/components/Home/Faq";
import Innovation from "@/components/Home/Innovation";
import Integration from "@/components/Home/Integration";
import LaunchYourSite from "@/components/Home/LaunchYourSite";
import OurProcess from "@/components/Home/OurProcess";
import Pricing from "@/components/Home/Pricing";
import Service from "@/components/Home/Service";
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

        {/* 4. Core Software & Engineering Services */}
        <section className="-mt-10 md:-mt-14">
          <Service />
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
