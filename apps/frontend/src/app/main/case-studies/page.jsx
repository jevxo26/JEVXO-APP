import PortfolioCard from "@/components/case-studies/PortfolioCard";
import React from "react";
import CosmicBackground from "@/components/Home/CosmicBackground";

const Portfoliopage = () => {
  return (
    <div className="min-h-screen relative overflow-x-hidden pb-36 pt-10 select-none">
      {/* Cosmic Particle Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CosmicBackground />
      </div>

      <div className="relative z-10">
        <section>
          <PortfolioCard />
        </section>
      </div>
    </div>
  );
};

export default Portfoliopage;
