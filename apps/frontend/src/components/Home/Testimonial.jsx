"use client";

import React from "react";
import { motion } from "framer-motion";

const topRowTestimonials = [
  {
    quote: '"The website they built for us increased our conversion rate by 200%. Highly recommended!"',
    name: "M-Martly",
    role: "Founder, StartUp X",
    rating: 5,
  },
  {
    quote: '"Their SEO strategies are top-notch. We ranked on the first page of Google within 3 months."',
    name: "Miah rasel bd",
    role: "Marketing Director",
    rating: 5,
  },
  {
    quote: '"Professional, creative, and timely delivery. The best agency I have worked with so far."',
    name: "Konok Shrabon",
    role: "Owner, FashionHub",
    rating: 5,
  },
  {
    quote: '"JEVXO transformed our legacy infrastructure into a scalable cloud system. Highly recommended!"',
    name: "Sarah Jenkins",
    role: "CTO, FinTech Lab",
    rating: 5,
  },
];

const bottomRowTestimonials = [
  {
    quote: '"Amazing UI/UX design skills. They understood our vision perfectly and delivered beyond expectations."',
    name: "Sk Lincoln",
    role: "Product Manager",
    rating: 5,
  },
  {
    quote: '"Professional, creative, and timely delivery. The best agency I have worked with so far."',
    name: "Konok Shrabon",
    role: "Owner, FashionHub",
    rating: 5,
  },
  {
    quote: '"Great code quality and performance. The Next.js implementation was flawless."',
    name: "Mavoza",
    role: "CTO, DataCorp",
    rating: 5,
  },
  {
    quote: '"The custom mobile app developed by JEVXO exceeded all our performance metrics!"',
    name: "Michael Chen",
    role: "Founder, AppScale",
    rating: 5,
  },
];

// Quadruple arrays for 100% gapless continuous infinite marquee
const infiniteTop = [...topRowTestimonials, ...topRowTestimonials, ...topRowTestimonials, ...topRowTestimonials];
const infiniteBottom = [...bottomRowTestimonials, ...bottomRowTestimonials, ...bottomRowTestimonials, ...bottomRowTestimonials];

const TestimonialCardItem = ({ item }) => (
  <div className="group relative flex-shrink-0 w-[300px] sm:w-[350px] rounded-2xl border border-[#EFFC76]/20 bg-[#071307] p-6 hover:border-[#EFFC76]/60 transition-colors duration-300 flex flex-col justify-between">
    <div>
      {/* 5 Stars Rating */}
      <div className="flex items-center gap-1 mb-4 text-[#EFFC76]">
        {[...Array(item.rating)].map((_, i) => (
          <span key={i} className="text-sm">★</span>
        ))}
      </div>

      {/* Quote Message */}
      <p className="text-gray-300 text-xs sm:text-sm font-light italic leading-relaxed mb-6 group-hover:text-white transition-colors">
        {item.quote}
      </p>
    </div>

    {/* Author & Role */}
    <div className="pt-2">
      <h4 className="text-white text-sm font-bold leading-tight group-hover:text-[#EFFC76] transition-colors">
        {item.name}
      </h4>
      <p className="text-[#EFFC76] text-[11px] font-mono font-medium mt-0.5">
        {item.role}
      </p>
    </div>
  </div>
);

const Testimonial = () => {
  return (
    <section className="py-20 relative overflow-hidden text-white select-none">
      {/* CSS Keyframes for GPU Hardware-Accelerated Continuous Non-Stop Marquee */}
      <style jsx global>{`
        @keyframes marqueeRightToLeft {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        @keyframes marqueeLeftToRight {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }
        .animate-marquee-rtl {
          animation: marqueeRightToLeft 48s linear infinite;
          will-change: transform;
        }
        .animate-marquee-ltr {
          animation: marqueeLeftToRight 48s linear infinite;
          will-change: transform;
        }
      `}</style>


      {/* Section Header */}
      <div className="w-10/12 mx-auto text-center mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#EFFC76]/30 bg-[#EFFC76]/10 text-[#EFFC76] text-xs font-mono font-bold uppercase tracking-[0.25em] mb-4 shadow-[0_0_15px_rgba(239,252,118,0.2)]"
        >
          <span className="w-2 h-2 rounded-full bg-[#EFFC76] animate-pulse" />
          TESTIMONIALS
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight"
        >
          What Our{" "}
          <span className="italic font-serif text-[#EFFC76] font-normal">
            Clients Say
          </span>
        </motion.h2>


        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-3 text-gray-400 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed"
        >
          Don't just take our word for it. Check out what our satisfied clients have to say about our work.
        </motion.p>
      </div>

      {/* Full Width Double Marquee Tracks */}
      <div className="w-full relative z-10 overflow-hidden space-y-6">
        
        {/* Left & Right Subtle Fade Overlays */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-36 bg-gradient-to-r from-[#050b05] via-[#050b05]/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-36 bg-gradient-to-l from-[#050b05] via-[#050b05]/80 to-transparent z-20 pointer-events-none" />

        {/* TOP ROW: Right to Left (Scrolling Left) */}
        <div className="flex overflow-hidden">
          <div className="flex items-center gap-6 w-max animate-marquee-rtl">
            {infiniteTop.map((item, idx) => (
              <TestimonialCardItem key={idx} item={item} />
            ))}
          </div>
        </div>

        {/* BOTTOM ROW: Left to Right (Scrolling Right) */}
        <div className="flex overflow-hidden">
          <div className="flex items-center gap-6 w-max animate-marquee-ltr">
            {infiniteBottom.map((item, idx) => (
              <TestimonialCardItem key={`bot-${idx}`} item={item} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonial;
