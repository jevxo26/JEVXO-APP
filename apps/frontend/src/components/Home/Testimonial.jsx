"use client";
import React from "react";
import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import TestimonialCard from "./TestimonialCard";
import SmoothButton from "@/Share/SmoothButton";
import { useQuery } from "@/hooks/useApi";

const fallbackTestimonials = [
  {
    name: "Michael Chen",
    role: "CTO",
    company: "FinTech Innovations",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    text: "JEVXO transformed our legacy infrastructure into a scalable cloud-native system. Their expertise in AWS and DevOps is unmatched.",
    rating: 5,
  },
  {
    name: "Sarah Jenkins",
    role: "Founder",
    company: "EcoStyle E-commerce",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    text: "The custom Shopify solution they built increased our conversion rates by 40%. The UI/UX design is beautiful and highly functional.",
    rating: 5,
  },
  {
    name: "David Rodriguez",
    role: "Product Manager",
    company: "HealthPlus App",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    text: "We needed a complex mobile app for patient monitoring. JEVXO delivered a secure, HIPAA-compliant app ahead of schedule.",
    rating: 5,
  },
  {
    name: "Emma Wilson",
    role: "Marketing Director",
    company: "GrowthGuru",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    text: "Their digital marketing strategy was a game-changer. We saw a significant ROI within the first three months of engagement.",
    rating: 5,
  },
  {
    name: "James Thompson",
    role: "CEO",
    company: "LogisticsPro",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    text: "The custom ERP software JEVXO developed has streamlined our entire supply chain. Their understanding of business logic is impressive.",
    rating: 5,
  },
  {
    name: "Lisa Wong",
    role: "Creative Director",
    company: "Artistry Studios",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    text: "As a design agency, we have high standards. JEVXO's frontend development brought our designs to life with pixel-perfect precision.",
    rating: 5,
  },
];

const Testimonial = () => {
  const { data } = useQuery("/customer-review");
  const apiReviews = Array.isArray(data?.data)
    ? data.data
        .filter((item) => item.status === "approved")
        .map((item) => ({
          name: item.client?.name,
          role: item.client?.designation,
          company: item.caseStudy?.title,
          image: item.client?.photo,
          text: item.review_message,
          rating: item.rating ?? 5,
        }))
    : [];

  const testimonials = apiReviews.length ? apiReviews : fallbackTestimonials;

  return (
    <section className=" -mt-22 py-20 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] uppercase tracking-wider text-[#EFFC76] mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#EFFC76] animate-pulse" />
            Client Testimonials
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-medium text-white tracking-tight"
          >
            What Our Clients Say About{" "}
            <span className="font-serif italic text-[#EFFC76]">
              JEVXO's Excellence
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto font-light"
          >
            Real feedback from enterprise partners, CTOs, and founders scaling with JEVXO.
          </motion.p>

          <div className="mt-8">
            <SmoothButton>Book An Appointment </SmoothButton>
          </div>
        </div>

        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <TestimonialCard key={index} {...item} delay={0.2 + index * 0.1} />
          ))}
        </div>

        {/* Testimonials Slider for Mobile/Tablet */}
        <div className="lg:hidden">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
            }}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            className="pb-14 [&_.swiper-pagination-bullet]:bg-gray-500 [&_.swiper-pagination-bullet-active]:bg-[#EFFC76] [&_.swiper-pagination-bullet]:w-3 [&_.swiper-pagination-bullet]:h-3"
            onClick={(swiper) => {
              swiper.autoplay.stop();
            }}
            onTouchMove={(swiper) => {
              // Ensure it resumes after manual move (handled by disableOnInteraction: false, but explicit start helps if needed)
            }}
          >
            {testimonials.map((item, index) => (
              <SwiperSlide key={index} className="h-auto mb-8">
                <TestimonialCard {...item} delay={0} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Footer Logos Placeholder (as per design) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center gap-8 mt-20 opacity-30 grayscale"
        ></motion.div>
      </div>
    </section>
  );
};

export default Testimonial;
