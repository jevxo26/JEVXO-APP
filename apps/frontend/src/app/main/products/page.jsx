import React from "react";
import CosmicBackground from "@/components/Home/CosmicBackground";
import ProductHeader from "@/components/Products/ProductHeader";
import ProductList from "@/components/Products/ProductList";

const page = () => {
  return (
    <div className="min-h-screen relative overflow-x-hidden pb-30 pt-20">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CosmicBackground />
      </div>
      <div className="relative z-10">
        <section>
          <ProductHeader />
        </section>
        <section>
          <ProductList />
        </section>
      </div>
    </div>
  );
};

export default page;
