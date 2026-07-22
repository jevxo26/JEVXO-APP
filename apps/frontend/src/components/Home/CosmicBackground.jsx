"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";

const CosmicBackground = () => {
  const particles = useMemo(() => {
    const rand01 = (seed) => {
      let a = seed | 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };

    return [...Array(55)].map((_, i) => ({
      id: i,
      width: `${Number((1 + rand01(i * 5 + 1) * 2).toFixed(3))}px`,
      height: `${Number((1 + rand01(i * 5 + 2) * 2).toFixed(3))}px`,
      top: `${Number((rand01(i * 5 + 3) * 100).toFixed(3))}%`,
      left: `${Number((rand01(i * 5 + 4) * 100).toFixed(3))}%`,
      duration: Number((2.5 + rand01(i * 5 + 5) * 4).toFixed(3)),
      // alternate between yellow-white and green tint
      green: rand01(i * 5 + 6) > 0.6,
    }));
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#060d06] -z-10">

      {/* ── Deep forest-green radial base ── */}
      <div className="absolute inset-0 bg-radial-[at_50%_0%] from-[#0d2210]/80 via-[#060d06] to-[#060d06]" />

      {/* ── Primary top glow — yellow-green ── */}
      <motion.div
        animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.12, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[35%] left-1/2 -translate-x-1/2 w-[85%] aspect-square rounded-full pointer-events-none blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(239,252,118,0.18) 0%, rgba(20,80,20,0.12) 50%, transparent 80%)" }}
      />

      {/* ── Left ambient green blob ── */}
      <motion.div
        animate={{ opacity: [0.2, 0.38, 0.2], x: [-10, 10, -10] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full blur-[110px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(10,80,30,0.4) 0%, transparent 70%)" }}
      />

      {/* ── Right ambient green blob ── */}
      <motion.div
        animate={{ opacity: [0.15, 0.3, 0.15], x: [10, -10, 10] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[15%] -right-[5%] w-[45%] h-[45%] rounded-full blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(15,60,25,0.45) 0%, transparent 70%)" }}
      />

      {/* ── Slow rotating orbits ── */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] pointer-events-none opacity-20"
      >
        <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] rounded-full blur-[90px]"
          style={{ background: "rgba(239,252,118,0.06)" }} />
        <div className="absolute bottom-[15%] right-[15%] w-[35%] h-[35%] rounded-full blur-[80px]"
          style={{ background: "rgba(20,100,40,0.10)" }} />
      </motion.div>



      {/* ── Stars / particles ── */}
      <div className="absolute inset-0 opacity-50">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.width,
              height: p.height,
              top: p.top,
              left: p.left,
              backgroundColor: p.green ? "rgba(120,220,100,0.7)" : "rgba(255,255,255,0.55)",
            }}
            animate={{ opacity: [0.15, 1, 0.15], scale: [1, 1.3, 1] }}
            transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* ── Bottom fade ── */}
      <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-[#060d06] to-transparent pointer-events-none" />
    </div>
  );
};

export default CosmicBackground;
