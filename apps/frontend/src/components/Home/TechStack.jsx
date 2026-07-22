"use client";
import React from "react";
import { motion } from "framer-motion";
import { Cpu, Code2, Server, Database, Layers, ShieldCheck } from "lucide-react";

const techCategories = [
  {
    category: "Frontend",
    icon: Code2,
    techs: ["React", "Next.js 14", "TypeScript", "Tailwind CSS", "Vue.js", "Redux Toolkit"],
  },
  {
    category: "Backend & APIs",
    icon: Server,
    techs: ["Node.js", "NestJS", "Python", "Go", "GraphQL", "REST APIs"],
  },
  {
    category: "Database & Storage",
    icon: Database,
    techs: ["PostgreSQL", "MongoDB", "Redis", "Supabase", "Prisma", "Pinecone Vector DB"],
  },
  {
    category: "Cloud & DevOps",
    icon: Layers,
    techs: ["AWS", "Docker", "Kubernetes", "Google Cloud", "CI/CD Pipelines", "Vercel"],
  },
  {
    category: "Mobile Development",
    icon: Cpu,
    techs: ["React Native", "Flutter", "iOS (Swift)", "Android (Kotlin)", "PWA"],
  },
  {
    category: "AI & Security",
    icon: ShieldCheck,
    techs: ["OpenAI API", "LangChain", "OAuth 2.0", "SSL/TLS", "SOC2 Standards", "Jest/Cypress"],
  },
];

const TechStack = () => {
  return (
    <section className="py-24 px-4 md:px-8 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300 font-medium mb-6"
          >
            <Cpu size={14} className="text-[#EFFC76]" />
            <span>Modern Tech Ecosystem</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Built With Modern & Scalable <br />
            <span className="text-gray-400">Technologies</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg font-light"
          >
            We leverage industry-standard frameworks, cloud infrastructure, and modern tooling to build high-performance software applications.
          </motion.p>
        </div>

        {/* Tech Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techCategories.map((cat, idx) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#0c0c0e]/80 border border-white/10 rounded-2xl p-6 hover:border-[#EFFC76]/40 transition-all duration-300 backdrop-blur-md group hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-[#EFFC76] group-hover:bg-[#EFFC76] group-hover:text-black transition-colors">
                  <cat.icon size={22} />
                </div>
                <h3 className="text-xl font-semibold text-white tracking-wide">
                  {cat.category}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.techs.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white/5 text-gray-300 border border-white/5 hover:border-white/20 hover:text-white transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TechStack;
