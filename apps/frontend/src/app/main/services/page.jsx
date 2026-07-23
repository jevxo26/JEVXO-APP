import Service from "@/components/Home/Service";
import OurServices from "@/components/Services/OurServices";
import React from "react";
import CosmicBackground from "@/components/Home/CosmicBackground";

const page = () => {
  return (
    <div className="min-h-screen relative overflow-x-hidden pb-36 pt-10 select-none">
      {/* Cosmic Particle Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CosmicBackground />
      </div>

      <div className="relative z-10 space-y-4">
        {/* Core Services Section */}
        <section>
          <Service />
        </section>

        {/* 3-Step Engineering Workflow Section */}
        <section>
          <OurServices />
        </section>
      </div>
    </div>
  );
};

export default page;
