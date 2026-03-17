"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import {
  BarChart2,
  Database,
  Globe,
  Webhook,
  Workflow,
  BarChartBig,
  Smartphone,
  ShoppingCart,
  Cloud,
  GitBranch,
} from "lucide-react";

interface Integration {
  name: string;
  icon: ReactNode;
  color: string;
  soon?: boolean;
}

const integrations: Integration[] = [
  {
    name: "RankMyApp",
    icon: <Smartphone className="w-5 h-5" aria-hidden="true" />,
    color: "text-purple-400",
  },
  {
    name: "DataRank",
    icon: <BarChartBig className="w-5 h-5" aria-hidden="true" />,
    color: "text-blue-400",
  },
  {
    name: "APIs REST",
    icon: <Globe className="w-5 h-5" aria-hidden="true" />,
    color: "text-green-400",
  },
  {
    name: "SQL / Database",
    icon: <Database className="w-5 h-5" aria-hidden="true" />,
    color: "text-yellow-400",
  },
  {
    name: "Webhooks",
    icon: <Webhook className="w-5 h-5" aria-hidden="true" />,
    color: "text-accent",
  },
  {
    name: "n8n",
    icon: <Workflow className="w-5 h-5" aria-hidden="true" />,
    color: "text-orange-400",
    soon: true,
  },
  {
    name: "Google Ads",
    icon: <BarChart2 className="w-5 h-5" aria-hidden="true" />,
    color: "text-secondary",
    soon: true,
  },
  {
    name: "Google Analytics",
    icon: <BarChart2 className="w-5 h-5" aria-hidden="true" />,
    color: "text-red-400",
    soon: true,
  },
  {
    name: "App Store",
    icon: <ShoppingCart className="w-5 h-5" aria-hidden="true" />,
    color: "text-blue-300",
    soon: true,
  },
  {
    name: "Cloud Storage",
    icon: <Cloud className="w-5 h-5" aria-hidden="true" />,
    color: "text-cyan-400",
    soon: true,
  },
  {
    name: "GitHub",
    icon: <GitBranch className="w-5 h-5" aria-hidden="true" />,
    color: "text-white",
    soon: true,
  },
];

function RadarAnimation() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Radar rings */}
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="absolute rounded-full border border-primary/10 radar-ring"
          style={{
            width: `${i * 200}px`,
            height: `${i * 200}px`,
            animationDelay: `${(i - 1) * 0.8}s`,
          }}
        />
      ))}

      {/* Static rings for background */}
      {[80, 160, 240, 320].map((size) => (
        <div
          key={size}
          className="absolute rounded-full border border-white/[0.03]"
          style={{ width: `${size}px`, height: `${size}px` }}
        />
      ))}

      {/* Radar sweep line */}
      <div className="absolute w-48 h-48 animate-spin-slow origin-center">
        <div
          className="absolute top-0 left-1/2 -translate-x-px w-0.5 h-24 origin-bottom"
          style={{
            background: "linear-gradient(to top, rgba(107,43,255,0.6), transparent)",
            transformOrigin: "bottom center",
          }}
        />
      </div>

      {/* Center dot */}
      <div className="absolute w-2.5 h-2.5 rounded-full bg-primary shadow-glow-sm" />
    </div>
  );
}

function IntegrationCard({ integration }: { integration: Integration }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className="relative flex flex-col items-center gap-2.5 p-4 card-surface hover:border-white/10 transition-all duration-300 group cursor-default"
    >
      <div
        className={`w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center ${integration.color} group-hover:border-white/10 transition-all duration-300 group-hover:scale-110`}
      >
        {integration.icon}
      </div>
      <div className="text-center">
        <p className="text-xs font-medium text-white leading-tight">
          {integration.name}
        </p>
        {integration.soon && (
          <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-accent/15 text-accent border border-accent/20">
            Em breve
          </span>
        )}
      </div>
    </motion.div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export default function Integrations() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="integracoes"
      ref={ref}
      className="section-padding relative overflow-hidden"
      aria-labelledby="integrations-title"
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(107,43,255,0.4), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Dark surface background */}
      <div className="absolute inset-0 bg-surface/30" aria-hidden="true" />

      {/* Radar background - centered behind grid */}
      <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <div className="relative w-[500px] h-[500px] opacity-30">
          <RadarAnimation />
        </div>
      </div>

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col gap-4 mb-16"
        >
          <span className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mx-auto">
            Integrações
          </span>
          <h2
            id="integrations-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
          >
            Conecte{" "}
            <span className="gradient-text">qualquer ferramenta.</span>
          </h2>
          <p className="text-text-secondary text-base lg:text-lg max-w-2xl mx-auto">
            Plug-and-play com as principais ferramentas do mercado. APIs abertas
            para integrar qualquer sistema proprietário.
          </p>
        </motion.div>

        {/* Integrations grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3"
        >
          {integrations.map((integration) => (
            <motion.div key={integration.name} variants={cardVariants}>
              <IntegrationCard integration={integration} />
            </motion.div>
          ))}

          {/* "E muito mais" card */}
          <motion.div
            variants={cardVariants}
            className="flex flex-col items-center gap-2.5 p-4 rounded-2xl border border-dashed border-white/10 hover:border-primary/30 transition-colors duration-300 cursor-default"
          >
            <div className="w-10 h-10 rounded-xl border border-dashed border-white/15 flex items-center justify-center">
              <span className="text-xl text-text-secondary">+</span>
            </div>
            <p className="text-xs font-medium text-text-secondary text-center leading-tight">
              E muito mais
            </p>
          </motion.div>
        </motion.div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-text-secondary text-sm max-w-lg mx-auto">
            Não encontrou sua ferramenta?{" "}
            <span className="text-white font-medium">
              Se tem API, a ClaudIA integra.
            </span>{" "}
            Fale com nosso time para uma integração personalizada.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
