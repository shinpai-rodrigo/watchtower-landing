"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import {
  Shield,
  Lock,
  Key,
  Eye,
  Users,
  FileText,
  ShieldCheck,
} from "lucide-react";

interface SecurityFeature {
  icon: ReactNode;
  title: string;
  description: string;
}

const securityFeatures: SecurityFeature[] = [
  {
    icon: <Lock className="w-5 h-5" aria-hidden="true" />,
    title: "Criptografia end-to-end",
    description:
      "Todos os dados em trânsito e em repouso são criptografados com AES-256 e TLS 1.3.",
  },
  {
    icon: <Key className="w-5 h-5" aria-hidden="true" />,
    title: "Tokens seguros",
    description:
      "Autenticação via OAuth 2.0 e JWT com rotação automática de tokens de acesso.",
  },
  {
    icon: <Eye className="w-5 h-5" aria-hidden="true" />,
    title: "Isolamento por cliente",
    description:
      "Cada workspace é completamente isolado. Seus dados nunca se misturam com de outros clientes.",
  },
  {
    icon: <FileText className="w-5 h-5" aria-hidden="true" />,
    title: "Logs auditáveis",
    description:
      "Histórico completo de acessos, consultas e alterações para auditoria e compliance.",
  },
  {
    icon: <Users className="w-5 h-5" aria-hidden="true" />,
    title: "Controle de acesso granular",
    description:
      "Defina permissões por usuário, por fonte de dados e por tipo de operação.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" aria-hidden="true" />,
    title: "Conformidade regulatória",
    description:
      "Infraestrutura preparada para LGPD, GDPR e SOC 2. Seus dados sob controle.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function SecurityFeatureItem({ feature }: { feature: SecurityFeature }) {
  return (
    <motion.div
      variants={itemVariants}
      className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/3 transition-colors duration-200 group"
    >
      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary/15 transition-colors duration-200">
        {feature.icon}
      </div>
      <div>
        <h3 className="text-sm font-semibold text-white mb-1">{feature.title}</h3>
        <p className="text-xs text-text-secondary leading-relaxed">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Security() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="seguranca"
      ref={ref}
      className="section-padding relative"
      aria-labelledby="security-title"
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(107,43,255,0.3), transparent)",
        }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(107,43,255,0.07) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — Shield visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Outer glow rings */}
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-full border border-primary/10 animate-pulse-slow"
                  style={{
                    margin: `${-i * 24}px`,
                    animationDelay: `${i * 0.4}s`,
                    opacity: 1 / i,
                  }}
                  aria-hidden="true"
                />
              ))}

              {/* Main shield container */}
              <div
                className="relative w-56 h-56 lg:w-72 lg:h-72 rounded-full flex items-center justify-center"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(107,43,255,0.2) 0%, rgba(107,43,255,0.05) 60%, transparent 80%)",
                  border: "1px solid rgba(107,43,255,0.2)",
                  boxShadow: "0 0 60px rgba(107,43,255,0.2)",
                }}
              >
                {/* Inner ring */}
                <div
                  className="absolute w-3/4 h-3/4 rounded-full"
                  style={{
                    border: "1px solid rgba(107,43,255,0.15)",
                    background: "rgba(107,43,255,0.05)",
                  }}
                  aria-hidden="true"
                />

                {/* Shield icon */}
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <div
                    className="w-20 h-20 lg:w-24 lg:h-24 rounded-3xl flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #6B2BFF, #2E8BFF)",
                      boxShadow: "0 0 40px rgba(107,43,255,0.5)",
                    }}
                  >
                    <Shield
                      className="w-10 h-10 lg:w-12 lg:h-12 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="text-xs font-semibold text-primary">
                    Enterprise Grade
                  </span>
                </div>
              </div>

              {/* Orbiting security icons */}
              {[Lock, Key, Eye, FileText].map((Icon, i) => {
                const angle = (i * 360) / 4;
                const radius = 130;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;
                return (
                  <div
                    key={i}
                    className="absolute w-9 h-9 rounded-xl bg-surface border border-white/10 flex items-center justify-center text-text-secondary"
                    style={{
                      left: `calc(50% + ${x}px - 18px)`,
                      top: `calc(50% + ${y}px - 18px)`,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                    }}
                    aria-hidden="true"
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right — Content */}
          <div className="flex flex-col gap-8">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={
                isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
              }
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-4"
            >
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary w-fit">
                <Shield className="w-3.5 h-3.5" aria-hidden="true" />
                Segurança
              </span>
              <h2
                id="security-title"
                className="text-3xl sm:text-4xl font-bold text-white"
              >
                Segurança nível{" "}
                <span className="gradient-text">enterprise.</span>
              </h2>
              <p className="text-text-secondary text-base leading-relaxed">
                Seus dados de negócio são preciosos. Construímos cada camada do
                WatchTower.AI com segurança como prioridade, não como afterthought.
              </p>
            </motion.div>

            {/* Features list */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="grid sm:grid-cols-2 gap-1"
            >
              {securityFeatures.map((feature) => (
                <SecurityFeatureItem key={feature.title} feature={feature} />
              ))}
            </motion.div>

            {/* Trust badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={
                isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
              }
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10"
            >
              <ShieldCheck
                className="w-5 h-5 text-primary shrink-0"
                aria-hidden="true"
              />
              <p className="text-sm text-text-secondary">
                <span className="text-white font-medium">
                  Seus dados ficam com você.
                </span>{" "}
                A ClaudIA apenas lê e processa o que você autoriza. Nada é
                armazenado sem consentimento.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
