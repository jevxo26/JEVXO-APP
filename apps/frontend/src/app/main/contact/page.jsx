import React from "react";
import EnterpriseContactSuite from "@/components/Contact/EnterpriseContactSuite";
import CosmicBackground from "@/components/Home/CosmicBackground";

const Contactpage = () => {
  return (
    <div className="min-h-screen relative overflow-x-hidden pb-10">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CosmicBackground />
      </div>
      <div className="relative z-10">
        <section>
          <EnterpriseContactSuite />
        </section>
      </div>
    </div>
  );
};

export default Contactpage;
