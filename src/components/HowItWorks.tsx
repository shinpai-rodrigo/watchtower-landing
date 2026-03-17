"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { Plug, MessageSquare, BellRing, ArrowRight } from "lucide-react";

interface Step {
  number: string;
  icon: ReactNode;
  title: string;
  description: string;
  tags: string[];
  color: string;
  glow: string;
}

const steps: Step[] = [
  {
    number: "01",
    icon: <Plug className="w-6 h-6" aria-hidden="true" />,
    title: "Conecte suas ferramentas",
    description:
      "Integre em minutos. Conecte RankMyApp, DataRank, Google Ads, SQL databases, APIs REST ou qualquer sistema via webhook.",
    tags: ["RankMyApp", "DataRank", "APIs", "SQL", "Webhooks"],
    color: "text-primary",
    glow: "rgba(107,43,255,0.3)",
  },
  {
    number: "02",
    icon: <MessageSquare className="w-6 h-6" aria-hidden="true" />,
    title: "Pergunte para a ClaudIA",
    description:
      'Fale em linguagem natural no WhatsApp. "Quantos installs ontem?", "Qual meu CPA hoje?", "Compare essa semana com a anterior."',
    tags: ["Linguagem natural", "WhatsApp", "Tempo real"],
    color: "text-secondary",
    glow: "rgba(46,139,255,0.3)",
  },
  {
    number: "03",
    icon: <BellRing className="w-6 h-6" aria-hidden="true" />,
    title: "Receba alertas e insights",
    description:
      "ClaudIA monitora 24/7 e te avisa quando algo importante acontece. Anomalias, metas atingidas ou ultrapassadas, padrões inesperados.",
    tags: ["Alertas inteligentes", "24/7", "Insights de IA"],
    color: "text-accent",
    glow: "rgba(143,92,255,0.3)",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
  },
};

const stepVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function StepCard({ step, index }: { step: Step; index: number }) {
  return (
    <motion.div
      variants={stepVariants}
      className="relative flex flex-col gap-5 p-6 lg:p-8 card-surface hover:border-white/10 transition-all duration-300 group"
    >
      {/* Glow overlay on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${step.glow} 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Step number badge */}
      <div className="flex items-start justify-between gap-4">
        <div
          className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center bg-white/5 group-hover:border-white/20 transition-colors duration-300"
          style={{ boxShadow: `0 0 20px ${step.glow}` }}
        >
          <span className={step.color}>{step.icon}</span>
        </div>
        <span className="text-5xl font-black text-white/5 group-hover:text-white/10 transition-colors duration-300 select-none">
          {step.number}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 relative z-10">
        <h3 className="text-xl font-bold text-white">{step.title}</h3>
        <p className="text-text-secondary leading-relaxed text-sm">
          {step.description}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 relative z-10">
        {step.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-xs font-medium text-text-secondary group-hover:border-white/10 transition-colors duration-300"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom index indicator */}
      {index < steps.length - 1 && (
        <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-20">
          <div className="w-8 h-8 rounded-full bg-surface border border-white/10 flex items-center justify-center">
            <ArrowRight className="w-4 h-4 text-text-secondary" aria-hidden="true" />
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="como-funciona"
      ref={ref}
      className="section-padding relative"
      aria-labelledby="how-it-works-title"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(107,43,255,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col gap-4 mb-16"
        >
          <span className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-xs font-medium text-secondary mx-auto">
            Como funciona
          </span>
          <h2
            id="how-it-works-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
          >
            Três passos para{" "}
            <span className="gradient-text">monitorar tudo.</span>
          </h2>
          <p className="text-text-secondary text-base lg:text-lg max-w-2xl mx-auto">
            Do setup à sua primeira resposta da ClaudIA em menos de 10 minutos.
          </p>
        </motion.div>

        {/* Steps grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-3 gap-6 lg:gap-8 relative"
        >
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </motion.div>

        {/* Bottom CTA hint */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-text-secondary text-sm">
            Pronto para começar?{" "}
            <a
              href="#planos"
              className="text-primary hover:text-accent transition-colors font-medium"
            >
              Ver planos disponíveis →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
