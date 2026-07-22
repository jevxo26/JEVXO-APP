"use client";
import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, Settings, Layout, FileText } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Card Data
const processSteps = [
  {
    icon: <MessageSquare className="w-8 h-8 text-black" />,
    title: "Discover Insights",
    description:
      "We analyze your goals, challenges, and vision to craft a tailored digital .",
    color: "bg-[#EFFC76]",
  },
  {
    icon: <Settings className="w-8 h-8 text-black" />,
    title: "Develop Solutions",
    description:
      "Our experts design and build cutting-edge solutions that drive results.",
    color: "bg-[#EFFC76]",
  },
  {
    icon: <Layout className="w-8 h-8 text-black" />,
    title: "Deploy Success",
    description:
      "We implement, optimize, and scale your digital product for long-term impact.",
    color: "bg-[#EFFC76]",
  },
];

const ProcessCard = ({ step }) => (
  <div className="group relative p-8 rounded-3xl bg-neutral-900/50 border border-white/5 hover:border-[#EFFC76]/50 transition-all duration-300 hover:bg-neutral-900/80 h-full flex flex-col">
    {/* Hover Gradient Border Effect */}
    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#EFFC76]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

    <div className="relative z-10 flex flex-col items-center text-center flex-grow">
      <div
        className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-[#EFFC76]/20 group-hover:scale-110 transition-transform duration-300 ${step.color}`}
      >
        {step.icon}
      </div>

      <h3 className="text-2xl font-semibold text-white mb-4">
        {step.title}
      </h3>

      <p className="text-gray-400 leading-relaxed">
        {step.description}
      </p>
    </div>
  </div>
);

const OurProcess = () => {
  return (
    <section className="relative py-24 -mt-30 md:-mt-22 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-wider text-[#EFFC76] mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#EFFC76] animate-pulse" />
            Engineering Lifecycle
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-medium text-white tracking-tight"
          >
            Our Proven Process For{" "}
            <span className="font-serif italic text-[#EFFC76]">
              Digital Success
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto font-light"
          >
            From discovery to cloud deployment, we execute every phase with technical precision.
          </motion.p>
        </div>

        {/* Desktop Cards Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="h-full"
            >
              <ProcessCard step={step} />
            </motion.div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden mt-8">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            loop={true}
            className="pb-16" // Add padding for pagination dots
          >
            {processSteps.map((step, index) => (
              <SwiperSlide key={index} className="h-auto">
                <div className="h-full mb-8">
                  <ProcessCard step={step} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom Styles for Swiper Pagination */}
          <style jsx global>{`
            .swiper-pagination-bullet {
              background: rgba(255, 255, 255, 0.2) !important;
              opacity: 1 !important;
              width: 10px !important;
              height: 10px !important;
              transition: all 0.3s ease;
            }
            .swiper-pagination-bullet-active {
              background: #EFFC76 !important;
              width: 24px !important;
              border-radius: 5px !important;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};

export default OurProcess;
