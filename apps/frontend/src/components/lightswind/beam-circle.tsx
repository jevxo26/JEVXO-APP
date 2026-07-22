"use client";
import React, { useMemo } from "react";
import { motion, Transition } from "framer-motion";
import Image from "next/image";
import {
  Code2,
  Cpu,
  Globe,
  Layers,
  ShieldCheck,
  Zap,
  Layout,
  Search,
  Palette,
  Smartphone,
} from "lucide-react";

type OrbitConfig = {
  id: number;
  radiusFactor: number;
  speed: number;
  icon: React.ReactNode;
  iconSize: number;
  orbitColor?: string;
  orbitThickness?: number;
  initialAngle?: number;
};

type BeamCircleProps = {
  size?: number;
  orbits?: OrbitConfig[];
  centerIcon?: React.ReactNode;
};

const defaultOrbits: OrbitConfig[] = [
  // Inner Orbit (Radius 0.38)
  {
    id: 1,
    radiusFactor: 0.38,
    speed: 20,
    icon: <Code2 className="text-[#EFFC76]" />,
    iconSize: 52,
    orbitColor: "rgba(239, 252, 118, 0.3)",
    orbitThickness: 1.5,
    initialAngle: 45,
  },
  {
    id: 2,
    radiusFactor: 0.38,
    speed: 20,
    icon: <Palette className="text-[#EFFC76]" />,
    iconSize: 52,
    orbitColor: "rgba(239, 252, 118, 0.3)",
    orbitThickness: 1.5,
    initialAngle: 225,
  },

  // Middle Orbit (Radius 0.68)
  {
    id: 3,
    radiusFactor: 0.68,
    speed: -30,
    icon: <Smartphone className="text-[#EFFC76]" />,
    iconSize: 52,
    orbitColor: "rgba(239, 252, 118, 0.22)",
    orbitThickness: 1.5,
    initialAngle: 90,
  },
  {
    id: 4,
    radiusFactor: 0.68,
    speed: -30,
    icon: <Search className="text-emerald-400" />,
    iconSize: 52,
    orbitColor: "rgba(239, 252, 118, 0.22)",
    orbitThickness: 1.5,
    initialAngle: 270,
  },

  // Outer Orbit (Radius 0.95)
  {
    id: 5,
    radiusFactor: 0.95,
    speed: 42,
    icon: <Cpu className="text-[#EFFC76]" />,
    iconSize: 56,
    orbitColor: "rgba(239, 252, 118, 0.15)",
    orbitThickness: 1.5,
    initialAngle: 0,
  },
  {
    id: 6,
    radiusFactor: 0.95,
    speed: 42,
    icon: <ShieldCheck className="text-emerald-400" />,
    iconSize: 56,
    orbitColor: "rgba(239, 252, 118, 0.15)",
    orbitThickness: 1.5,
    initialAngle: 120,
  },
  {
    id: 7,
    radiusFactor: 0.95,
    speed: 42,
    icon: <Globe className="text-[#EFFC76]" />,
    iconSize: 56,
    orbitColor: "rgba(239, 252, 118, 0.15)",
    orbitThickness: 1.5,
    initialAngle: 240,
  },
];

const BeamCircle: React.FC<BeamCircleProps> = ({
  size = 620,
  orbits: customOrbits,
  centerIcon,
}) => {
  const orbitsData = useMemo(() => customOrbits || defaultOrbits, [customOrbits]);
  const halfSize = size / 2;

  const linearEase = (t: number) => t;

  const rotationTransition = (duration: number): Transition => ({
    repeat: Infinity,
    duration: Math.abs(duration),
    ease: linearEase,
  });

  return (
    <div className="flex justify-center items-center p-4 bg-transparent">
      <div className="relative" style={{ width: size, height: size }}>
        
        {/* Deep ambient glow behind orbit system */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#EFFC76]/15 via-emerald-500/10 to-[#EFFC76]/15 rounded-full blur-[80px] pointer-events-none scale-110" />

        {/* Render Unique Orbit Lines */}
        {[0.38, 0.68, 0.95].map((factor, idx) => {
          const orbitDiameter = size * factor;
          const orbitRadius = orbitDiameter / 2;
          return (
            <div
              key={idx}
              className="absolute rounded-full border border-[#EFFC76]/25 shadow-[0_0_15px_rgba(239,252,118,0.1)]"
              style={{
                width: orbitDiameter,
                height: orbitDiameter,
                top: halfSize - orbitRadius,
                left: halfSize - orbitRadius,
                borderWidth: 1.5,
              }}
            />
          );
        })}

        {/* Render Rotating Orbits and Icons */}
        {orbitsData.map((orbit) => {
          const orbitDiameter = size * orbit.radiusFactor;
          const orbitRadius = orbitDiameter / 2;
          const angle = orbit.initialAngle || 0;

          return (
            <React.Fragment key={orbit.id}>
              {/* Rotating Container */}
              <motion.div
                className="absolute inset-0"
                style={{ width: size, height: size }}
                initial={{ rotate: angle }}
                animate={{ rotate: angle + (orbit.speed > 0 ? 360 : -360) }}
                transition={rotationTransition(orbit.speed)}
              >
                {/* Traveling Icon Card (Rounded Squircle with Glowing Neon Border) */}
                <div
                  className="absolute"
                  style={{
                    top: halfSize,
                    left: halfSize + orbitRadius,
                    transform: `translate(-50%, -50%)`,
                  }}
                >
                  <motion.div
                    className="rounded-[22px] border border-[#EFFC76]/40 bg-[#09150a]/95 backdrop-blur-xl p-3 shadow-[0_0_20px_rgba(239,252,118,0.3)] flex items-center justify-center group hover:scale-110 transition-transform duration-300"
                    style={{ width: orbit.iconSize, height: orbit.iconSize }}
                    animate={{ rotate: -(angle + (orbit.speed > 0 ? 360 : -360)) }}
                    transition={rotationTransition(orbit.speed)}
                  >
                    {React.isValidElement(orbit.icon) ? (
                      React.cloneElement(orbit.icon as any, {
                        size: orbit.iconSize * 0.52,
                      })
                    ) : (
                      orbit.icon
                    )}
                  </motion.div>
                </div>
              </motion.div>
            </React.Fragment>
          );
        })}

        {/* Central Premium Glowing JEVXO Logo Badge */}
        <div className="absolute inset-0 grid place-content-center z-20">
          <motion.div
            className="w-16 h-16 sm:w-18 sm:h-18 rounded-[20px] bg-gradient-to-b from-[#0e220f] to-[#060d06] border-2 border-[#EFFC76] shadow-[0_0_30px_rgba(239,252,118,0.4)] flex items-center justify-center p-2.5 relative"
            animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 25px rgba(239,252,118,0.4)", "0 0 40px rgba(239,252,118,0.6)", "0 0 25px rgba(239,252,118,0.4)"] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
          >
            <Image
              src="/jevxo.png"
              alt="JEVXO Center Logo"
              width={54}
              height={27}
              className="object-contain w-full h-full filter drop-shadow-[0_0_8px_rgba(239,252,118,0.5)]"
            />
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default BeamCircle;
