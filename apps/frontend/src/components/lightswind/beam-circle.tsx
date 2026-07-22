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
};

type BeamCircleProps = {
  size?: number;
  orbits?: OrbitConfig[];
  centerIcon?: React.ReactNode;
};

const defaultOrbits: OrbitConfig[] = [
  {
    id: 1,
    radiusFactor: 0.35,
    speed: 18,
    icon: <Palette className="text-[#EFFC76]" />,
    iconSize: 44,
    orbitColor: "rgba(239, 252, 118, 0.25)",
    orbitThickness: 1,
  },
  {
    id: 2,
    radiusFactor: 0.35,
    speed: -22,
    icon: <Code2 className="text-emerald-400" />,
    iconSize: 44,
    orbitColor: "rgba(239, 252, 118, 0.25)",
    orbitThickness: 1,
  },
  {
    id: 3,
    radiusFactor: 0.65,
    speed: 28,
    icon: <Search className="text-[#EFFC76]" />,
    iconSize: 44,
    orbitColor: "rgba(239, 252, 118, 0.18)",
    orbitThickness: 1,
  },
  {
    id: 4,
    radiusFactor: 0.65,
    speed: -32,
    icon: <Smartphone className="text-[#EFFC76]" />,
    iconSize: 44,
    orbitColor: "rgba(239, 252, 118, 0.18)",
    orbitThickness: 1,
  },
  {
    id: 5,
    radiusFactor: 0.92,
    speed: 40,
    icon: <Cpu className="text-[#EFFC76]" />,
    iconSize: 44,
    orbitColor: "rgba(239, 252, 118, 0.12)",
    orbitThickness: 1,
  },
  {
    id: 6,
    radiusFactor: 0.92,
    speed: -45,
    icon: <ShieldCheck className="text-emerald-400" />,
    iconSize: 44,
    orbitColor: "rgba(239, 252, 118, 0.12)",
    orbitThickness: 1,
  },
];

const BeamCircle: React.FC<BeamCircleProps> = ({
  size = 520,
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
    <div className="flex justify-center items-center p-2 bg-transparent">
      <div className="relative" style={{ width: size, height: size }}>
        
        {/* Glow behind center */}
        <div className="absolute inset-0 bg-[#EFFC76]/10 rounded-full blur-3xl pointer-events-none" />

        {orbitsData.map((orbit) => {
          const orbitDiameter = size * orbit.radiusFactor;
          const orbitRadius = orbitDiameter / 2;

          return (
            <React.Fragment key={orbit.id}>
              {/* Solid Thin Orbit Line */}
              <div
                className="absolute rounded-full border border-[#EFFC76]/25"
                style={{
                  width: orbitDiameter,
                  height: orbitDiameter,
                  top: halfSize - orbitRadius,
                  left: halfSize - orbitRadius,
                  borderColor: orbit.orbitColor || "rgba(239, 252, 118, 0.2)",
                  borderWidth: orbit.orbitThickness || 1,
                }}
              />

              {/* Rotating Container */}
              <motion.div
                className="absolute inset-0"
                style={{ width: size, height: size }}
                animate={{ rotate: orbit.speed > 0 ? 360 : -360 }}
                transition={rotationTransition(orbit.speed)}
              >
                {/* Traveling Icon Box (Square Dark Glass Card) */}
                <div
                  className="absolute"
                  style={{
                    top: halfSize,
                    left: halfSize + orbitRadius,
                    transform: `translate(-50%, -50%)`,
                  }}
                >
                  <motion.div
                    className="rounded-2xl border border-[#EFFC76]/30 bg-[#0d160d]/90 backdrop-blur-md p-2.5 shadow-[0_0_15px_rgba(239,252,118,0.2)] flex items-center justify-center"
                    style={{ width: orbit.iconSize, height: orbit.iconSize }}
                    animate={{ rotate: orbit.speed > 0 ? -360 : 360 }}
                    transition={rotationTransition(orbit.speed)}
                  >
                    {React.isValidElement(orbit.icon) ? (
                      React.cloneElement(orbit.icon as any, {
                        size: orbit.iconSize * 0.55,
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

        {/* Central Neon JEVXO Logo Badge */}
        <div className="absolute inset-0 grid place-content-center z-20">
          <motion.div
            className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-[#09150a] border-2 border-[#EFFC76] shadow-[0_0_35px_rgba(239,252,118,0.4)] flex items-center justify-center p-3 relative"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <Image
              src="/jevxo.png"
              alt="JEVXO Center Logo"
              width={70}
              height={35}
              className="object-contain w-full h-full"
            />
          </motion.div>
        </div>

      </div>
    </div>
  );
};

export default BeamCircle;
