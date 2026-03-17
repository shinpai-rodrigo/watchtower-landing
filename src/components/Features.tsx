"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import {
  MessageCircle,
  Bell,
  Brain,
  Link2,
  Clock,
  Layers,
} from "lucide-react";

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
  badge?: string;
  gradient: string;
  glowColor: string;
}

const features: Feature[] = [
  {
    icon: <MessageCircle className="w-6 h-6" aria-hidden="true" />,
    title: "Pergunte seus dados",
    description:
      "Faça perguntas em linguagem natural no WhatsApp. A ClaudIA entende contexto, histórico e responde com dados precisos da sua empresa.",
    gradient: "from-primary to-accent",
    glowColor: "rgba(107,43,255,0.25)",
  },
  {
    icon: <Bell className="w-6 h-6" aria-hidden="true" />,
    title: "Alertas inteligentes",
    description:
      'Configure regras como "Se CPA > R$ 20 me avise" ou "Notifique quando installs caírem 10%". ClaudIA monitora e alerta em tempo real.',
    gradient: "from-alert to-orange-400",
    glowColor: "rgba(255,106,61,0.2)",
  },
  {
    icon: <Brain className="w-6 h-6" aria-hidden="true" />,
    title: "Insights de IA",
    description:
      "Detecção automática de padrões, anomalias e oportunidades nos seus dados. ClaudIA age proativamente, não apenas reage às perguntas.",
    badge: "IA Avançada",
    gradient: "from-accent to-secondary",
    glowColor: "rgba(143,92,255,0.25)",
  },
  {
    icon: <Link2 className="w-6 h-6" aria-hidden="true" />,
    title: "Integrações universais",
    description:
      "Conecte qualquer sistema via API REST, webhook, SQL ou integração nativa. Se tem dados, a ClaudIA consegue monitorar.",
    gradient: "from-secondary to-cyan-400",
    glowColor: "rgba(46,139,255,0.25)",
  },
  {
    icon: <Clock className="w-6 h-6" aria-hidden="true" />,
    title: "Monitoramento 24/7",
    description:
      "Seus dados nunca dormem, e a ClaudIA também não. Monitoramento contínuo mesmo quando você não está olhando para o dashboard.",
    gradient: "from-green-400 to-secondary",
    glowColor: "rgba(74,222,128,0.2)",
  },
  {
    icon: <Layers className="w-6 h-6" aria-hidden="true" />,
    title: "Multi-plataforma",
    description:
      "WhatsApp, Telegram ou qualquer canal de mensagens. Funciona onde você e seu time já estão, sem precisar aprender uma nova ferramenta.",
    gradient: "from-primary to-secondary",
    glowColor: "rgba(107,43,255,0.2)",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative flex flex-col gap-4 p-6 card-surface hover:border-white/10 transition-all duration-300 group cursor-default overflow-hidden"
    >
      {/* Background glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${feature.glowColor} 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Shimmer effect */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shimmer"
        aria-hidden="true"
      />

      {/* Icon */}
      <div className="relative z-10">
        <div
          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110`}
          style={{
            boxShadow: `0 8px 24px ${feature.glowColor}`,
          }}
        >
          {feature.icon}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 relative z-10">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-white group-hover:text-white transition-colors">
            {feature.title}
          </h3>
          {feature.badge && (
            <span className="px-2 py-0.5 rounded-md bg-accent/15 border border-accent/20 text-[10px] font-semibold text-accent">
              {feature.badge}
            </span>
          )}
        </div>
        <p className="text-sm text-text-secondary leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Features() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="funcionalidades"
      ref={ref}
      className="section-padding relative"
      aria-labelledby="features-title"
    >
      {/* Top gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(107,43,255,0.3), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(107,43,255,0.06) 0%, transparent 70%)",
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
          <span className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs font-medium text-accent mx-auto">
            Funcionalidades
          </span>
          <h2
            id="features-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
          >
            Tudo que você precisa{" "}
            <span className="gradient-text">em uma conversa.</span>
          </h2>
          <p className="text-text-secondary text-base lg:text-lg max-w-2xl mx-auto">
            ClaudIA transforma dados complexos em conversas simples. Sem
            dashboards para abrir, sem relatórios para gerar.
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
