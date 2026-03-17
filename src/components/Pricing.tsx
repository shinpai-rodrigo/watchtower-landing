"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { Check, Sparkles, Star, Building2, Zap } from "lucide-react";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  tagline: string;
  icon: ReactNode;
  price: string | null;
  priceNote: string;
  ctaLabel: string;
  ctaVariant: "primary" | "secondary" | "featured" | "outline";
  status: "soon" | "available" | "contact";
  featured?: boolean;
  features: PlanFeature[];
  badge?: string;
}

const plans: Plan[] = [
  {
    id: "base",
    name: "Base",
    tagline: "Para começar a monitorar",
    icon: <Zap className="w-5 h-5" aria-hidden="true" />,
    price: null,
    priceNote: "Em breve",
    ctaLabel: "Entrar na lista de espera",
    ctaVariant: "secondary",
    status: "soon",
    features: [
      { text: "1 workspace", included: true },
      { text: "Até 3 integrações", included: true },
      { text: "Consultas via WhatsApp", included: true },
      { text: "Histórico de 7 dias", included: true },
      { text: "Alertas básicos", included: true },
      { text: "Insights de IA", included: false },
      { text: "Usuários ilimitados", included: false },
      { text: "Suporte prioritário", included: false },
    ],
  },
  {
    id: "smart",
    name: "Smart Alerts",
    tagline: "Monitoramento proativo",
    icon: <Star className="w-5 h-5" aria-hidden="true" />,
    price: null,
    priceNote: "Em breve",
    ctaLabel: "Entrar na lista de espera",
    ctaVariant: "secondary",
    status: "soon",
    features: [
      { text: "3 workspaces", included: true },
      { text: "Integrações ilimitadas", included: true },
      { text: "Consultas via WhatsApp", included: true },
      { text: "Histórico de 30 dias", included: true },
      { text: "Alertas inteligentes avançados", included: true },
      { text: "Insights de IA", included: false },
      { text: "Até 5 usuários", included: true },
      { text: "Suporte prioritário", included: false },
    ],
  },
  {
    id: "ai",
    name: "AI Insights",
    tagline: "Inteligência completa",
    icon: <Sparkles className="w-5 h-5" aria-hidden="true" />,
    price: null,
    priceNote: "Em breve",
    ctaLabel: "Entrar na lista de espera",
    ctaVariant: "featured",
    status: "soon",
    featured: true,
    badge: "Mais popular",
    features: [
      { text: "Workspaces ilimitados", included: true },
      { text: "Integrações ilimitadas", included: true },
      { text: "Consultas via WhatsApp", included: true },
      { text: "Histórico de 90 dias", included: true },
      { text: "Alertas inteligentes avançados", included: true },
      { text: "Insights de IA completos", included: true },
      { text: "Usuários ilimitados", included: true },
      { text: "Suporte prioritário", included: true },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Para grandes operações",
    icon: <Building2 className="w-5 h-5" aria-hidden="true" />,
    price: null,
    priceNote: "Personalizado",
    ctaLabel: "Fale conosco",
    ctaVariant: "outline",
    status: "contact",
    features: [
      { text: "Tudo do AI Insights", included: true },
      { text: "SLA garantido 99.9%", included: true },
      { text: "Integração customizada", included: true },
      { text: "Histórico ilimitado", included: true },
      { text: "Treinamento dedicado", included: true },
      { text: "Account manager", included: true },
      { text: "SSO / SAML", included: true },
      { text: "Contrato anual flexível", included: true },
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

function PlanCard({ plan }: { plan: Plan }) {
  const isFeatured = plan.featured;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`relative flex flex-col gap-6 p-6 rounded-2xl transition-all duration-300 ${
        isFeatured
          ? "bg-surface border-2 border-primary/50 shadow-glow-primary"
          : "bg-surface border border-white/5 hover:border-white/10"
      }`}
    >
      {/* Featured glow */}
      {isFeatured && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(107,43,255,0.15) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
      )}

      {/* Badge */}
      {plan.badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gradient text-white text-xs font-bold shadow-glow-sm whitespace-nowrap">
            <Sparkles className="w-3 h-3" aria-hidden="true" />
            {plan.badge}
          </span>
        </div>
      )}

      {/* Plan header */}
      <div className="flex flex-col gap-3 relative z-10">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center ${
              isFeatured
                ? "bg-brand-gradient text-white"
                : "bg-white/5 border border-white/10 text-text-secondary"
            }`}
          >
            {plan.icon}
          </div>
          <div>
            <p className="text-base font-bold text-white">{plan.name}</p>
            <p className="text-xs text-text-secondary">{plan.tagline}</p>
          </div>
        </div>

        {/* Price area */}
        <div className="flex items-baseline gap-2 pt-1">
          {plan.price ? (
            <>
              <span className="text-4xl font-black text-white">{plan.price}</span>
              <span className="text-text-secondary text-sm">/mês</span>
            </>
          ) : (
            <span
              className={`text-2xl font-bold ${
                isFeatured ? "gradient-text" : "text-text-secondary"
              }`}
            >
              {plan.priceNote}
            </span>
          )}
        </div>
      </div>

      {/* CTA button */}
      <div className="relative z-10">
        {plan.ctaVariant === "featured" ? (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary w-full justify-center py-3"
            aria-label={`${plan.ctaLabel} — Plano ${plan.name}`}
          >
            {plan.ctaLabel}
          </motion.button>
        ) : plan.ctaVariant === "outline" ? (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 rounded-xl border border-primary/30 text-primary font-semibold text-sm hover:bg-primary/5 hover:border-primary/50 transition-all duration-200"
            aria-label={`${plan.ctaLabel} — Plano ${plan.name}`}
          >
            {plan.ctaLabel}
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn-secondary w-full justify-center py-3"
            aria-label={`${plan.ctaLabel} — Plano ${plan.name}`}
          >
            {plan.ctaLabel}
          </motion.button>
        )}
      </div>

      {/* Divider */}
      <div className="h-px bg-white/5" aria-hidden="true" />

      {/* Features list */}
      <ul className="flex flex-col gap-2.5 relative z-10" role="list">
        {plan.features.map((feature) => (
          <li key={feature.text} className="flex items-center gap-2.5">
            <div
              className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                feature.included
                  ? isFeatured
                    ? "bg-primary/20 text-primary"
                    : "bg-white/10 text-text-secondary"
                  : "bg-transparent"
              }`}
              aria-hidden="true"
            >
              {feature.included ? (
                <Check className="w-2.5 h-2.5" />
              ) : (
                <span className="w-1 h-0.5 bg-white/15 rounded-full block" />
              )}
            </div>
            <span
              className={`text-xs ${
                feature.included ? "text-white" : "text-text-secondary/50 line-through"
              }`}
            >
              {feature.text}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Pricing() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="planos"
      ref={ref}
      className="section-padding relative"
      aria-labelledby="pricing-title"
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(46,139,255,0.3), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Background */}
      <div className="absolute inset-0 bg-surface/20" aria-hidden="true" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(107,43,255,0.07) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col gap-4 mb-16"
        >
          <span className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mx-auto">
            Planos
          </span>
          <h2
            id="pricing-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
          >
            Simples,{" "}
            <span className="gradient-text">sem surpresas.</span>
          </h2>
          <p className="text-text-secondary text-base lg:text-lg max-w-2xl mx-auto">
            Planos em breve. Entre na lista de espera e seja um dos primeiros a
            usar o Matheus AI.
          </p>
        </motion.div>

        {/* Plans grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6"
        >
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="text-center text-xs text-text-secondary mt-10"
        >
          Todos os planos incluem período de teste gratuito. Sem necessidade de
          cartão de crédito para começar.
        </motion.p>
      </div>
    </section>
  );
}
