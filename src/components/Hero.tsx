"use client";

import { useEffect, useState, useRef, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

interface ChatMessage {
  id: number;
  type: "user" | "claudia" | "alert";
  text: string;
  icon?: ReactNode;
  delay: number;
}

const chatMessages: ChatMessage[] = [
  {
    id: 1,
    type: "user",
    text: "ClaudIA, quantos installs tivemos ontem?",
    delay: 800,
  },
  {
    id: 2,
    type: "claudia",
    text: "Você teve 4.392 installs ontem. 📈 Crescimento de 12% vs semana passada.",
    icon: <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />,
    delay: 2200,
  },
  {
    id: 3,
    type: "user",
    text: "E o meu CPA hoje?",
    delay: 4000,
  },
  {
    id: 4,
    type: "claudia",
    text: "R$ 18,40. Abaixo da meta de R$ 20. ✅ Tudo sob controle!",
    icon: <CheckCircle className="w-3.5 h-3.5" aria-hidden="true" />,
    delay: 5400,
  },
  {
    id: 5,
    type: "alert",
    text: "⚠️ Alerta: Seu CPA ultrapassou R$ 20! Agora em R$ 22,15. Atenção necessária.",
    delay: 7200,
  },
];

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3 bg-surface rounded-2xl rounded-tl-sm w-fit border border-white/5">
      <span className="text-xs text-text-secondary mr-1">ClaudIA está digitando</span>
      <span className="typing-dot w-1.5 h-1.5 bg-primary rounded-full block" />
      <span className="typing-dot w-1.5 h-1.5 bg-primary rounded-full block" />
      <span className="typing-dot w-1.5 h-1.5 bg-primary rounded-full block" />
    </div>
  );
}

function ChatBubble({ message }: { message: ChatMessage }) {
  if (message.type === "user") {
    return (
      <div className="flex justify-end message-appear">
        <div className="max-w-[78%] bg-brand-gradient px-4 py-2.5 rounded-2xl rounded-tr-sm">
          <p className="text-sm text-white leading-relaxed">{message.text}</p>
        </div>
      </div>
    );
  }

  if (message.type === "alert") {
    return (
      <div className="flex justify-start message-appear">
        <div className="max-w-[88%] bg-[#2A1A0F] border border-alert/30 px-4 py-2.5 rounded-2xl rounded-tl-sm">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-alert shrink-0 mt-0.5" aria-hidden="true" />
            <p className="text-sm text-orange-100 leading-relaxed">{message.text}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-end gap-2 justify-start message-appear">
      <div className="w-7 h-7 rounded-full bg-brand-gradient flex items-center justify-center shrink-0">
        <span className="text-[10px] font-bold text-white">C</span>
      </div>
      <div className="max-w-[78%] bg-surface border border-white/5 px-4 py-2.5 rounded-2xl rounded-tl-sm">
        <p className="text-sm text-white leading-relaxed">{message.text}</p>
      </div>
    </div>
  );
}

function WhatsAppMockup() {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [cycle, setCycle] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    chatMessages.forEach((msg) => {
      if (msg.type === "claudia" || msg.type === "alert") {
        const typingTimer = setTimeout(() => {
          setShowTyping(true);
        }, msg.delay - 800);
        timers.push(typingTimer);
      }

      const showTimer = setTimeout(() => {
        setShowTyping(false);
        setVisibleMessages((prev) => [...prev, msg.id]);
      }, msg.delay);
      timers.push(showTimer);
    });

    const restartTimer = setTimeout(() => {
      setVisibleMessages([]);
      setShowTyping(false);
      setCycle((c) => c + 1);
    }, 12000);
    timers.push(restartTimer);

    return () => timers.forEach((t) => clearTimeout(t));
  }, [cycle]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [visibleMessages, showTyping]);

  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Glow effects */}
      <div
        className="absolute -inset-8 rounded-3xl opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(ellipse at center, rgba(107,43,255,0.5) 0%, rgba(46,139,255,0.3) 50%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Phone mockup */}
      <div className="relative rounded-3xl border border-white/10 bg-[#111118] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.8)]">
        {/* WhatsApp header */}
        <div className="bg-[#0F1922] px-4 py-3 flex items-center gap-3 border-b border-white/5">
          <div className="w-9 h-9 rounded-full bg-brand-gradient flex items-center justify-center shrink-0">
            <span className="text-sm font-bold text-white">C</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white">ClaudIA</p>
            <p className="text-xs text-green-400">online agora</p>
          </div>
          <div className="flex gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
          </div>
        </div>

        {/* Chat messages area */}
        <div
          className="bg-[#0B0B0F] px-3 py-4 h-80 overflow-y-auto flex flex-col gap-2.5 scroll-smooth"
          role="log"
          aria-label="Conversa com ClaudIA"
          aria-live="polite"
        >
          {/* Date label */}
          <div className="text-center">
            <span className="text-[10px] text-text-secondary bg-white/5 px-2.5 py-1 rounded-full">
              Hoje
            </span>
          </div>

          {chatMessages.map((msg) =>
            visibleMessages.includes(msg.id) ? (
              <ChatBubble key={msg.id} message={msg} />
            ) : null
          )}

          {showTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* WhatsApp input bar */}
        <div className="bg-[#0F1922] px-3 py-2.5 flex items-center gap-2 border-t border-white/5">
          <div className="flex-1 bg-[#1A2530] rounded-full px-4 py-2">
            <p className="text-xs text-text-secondary">Digite uma mensagem</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-brand-gradient flex items-center justify-center shrink-0">
            <ArrowRight className="w-4 h-4 text-white" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      aria-label="Hero — WatchTower.AI"
    >
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden="true" />
      <div className="absolute inset-0 bg-hero-glow" aria-hidden="true" />

      {/* Floating orbs */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl animate-float"
        style={{ background: "radial-gradient(circle, #6B2BFF 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full opacity-15 blur-3xl animate-float-delayed"
        style={{ background: "radial-gradient(circle, #2E8BFF 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="section-container section-padding relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column — copy */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-accent">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"
                  aria-hidden="true"
                />
                Monitoramento inteligente via WhatsApp
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div variants={itemVariants} className="flex flex-col gap-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-balance">
                Your business metrics.{" "}
                <span className="gradient-text">Delivered on WhatsApp.</span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-base lg:text-lg text-text-secondary leading-relaxed max-w-xl"
            >
              Conecte suas ferramentas. Faça perguntas. Receba alertas. Ganhe
              insights. Tudo em uma conversa com{" "}
              <span className="text-white font-medium">ClaudIA</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 pt-2"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#planos"
                className="btn-primary group text-base px-7 py-3.5"
                aria-label="Falar com a ClaudIA"
              >
                Falar com a ClaudIA
                <ArrowRight
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#como-funciona"
                className="btn-secondary group text-base px-7 py-3.5"
                aria-label="Ver como funciona o WatchTower.AI"
              >
                <Play className="w-4 h-4" aria-hidden="true" />
                Ver como funciona
              </motion.a>
            </motion.div>

            {/* Social proof / Stats */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-6 pt-4 border-t border-white/5"
            >
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">24/7</span>
                <span className="text-xs text-text-secondary">Monitoramento ativo</span>
              </div>
              <div className="w-px h-10 bg-white/10" aria-hidden="true" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white">{"<"}1s</span>
                <span className="text-xs text-text-secondary">Tempo de resposta</span>
              </div>
              <div className="w-px h-10 bg-white/10" aria-hidden="true" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold gradient-text">∞</span>
                <span className="text-xs text-text-secondary">Integrações possíveis</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column — WhatsApp mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="flex justify-center lg:justify-end"
          >
            <WhatsAppMockup />
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #0B0B12)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
