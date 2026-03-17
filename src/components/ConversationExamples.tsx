"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { TrendingUp, AlertTriangle, DollarSign, CheckCircle } from "lucide-react";

interface ConversationMessage {
  type: "user" | "claudia" | "alert";
  text: string;
  time: string;
}

interface Conversation {
  id: string;
  title: string;
  subtitle: string;
  messages: ConversationMessage[];
  accentColor: string;
  glowColor: string;
  icon: ReactNode;
}

const conversations: Conversation[] = [
  {
    id: "installs",
    title: "Análise de Installs",
    subtitle: "Performance de aquisição",
    icon: <TrendingUp className="w-5 h-5" aria-hidden="true" />,
    accentColor: "text-green-400",
    glowColor: "rgba(74,222,128,0.15)",
    messages: [
      {
        type: "user",
        text: "ClaudIA quantos installs tivemos ontem?",
        time: "09:14",
      },
      {
        type: "claudia",
        text: "Você teve **4.392 installs** ontem. 📈 Crescimento de **+12%** vs semana passada. Melhor dia do mês até agora!",
        time: "09:14",
      },
    ],
  },
  {
    id: "cpa",
    title: "CPA em Tempo Real",
    subtitle: "Eficiência de campanhas",
    icon: <CheckCircle className="w-5 h-5" aria-hidden="true" />,
    accentColor: "text-secondary",
    glowColor: "rgba(46,139,255,0.15)",
    messages: [
      {
        type: "user",
        text: "ClaudIA meu CPA hoje?",
        time: "11:32",
      },
      {
        type: "claudia",
        text: "R$ 18,40. Abaixo da meta de R$ 20. ✅ Tudo sob controle! Google Ads R$17,20 | Meta R$19,80",
        time: "11:32",
      },
    ],
  },
  {
    id: "alerta",
    title: "Alerta Automático",
    subtitle: "Monitoramento proativo",
    icon: <AlertTriangle className="w-5 h-5" aria-hidden="true" />,
    accentColor: "text-alert",
    glowColor: "rgba(255,106,61,0.15)",
    messages: [
      {
        type: "alert",
        text: "⚠️ Alerta: Seu CPA ultrapassou R$ 20! Agora em R$ 22,15. Campanhas Google Ads com desvio de +10,7%. Atenção necessária.",
        time: "14:07",
      },
    ],
  },
  {
    id: "ads",
    title: "Gasto com Anúncios",
    subtitle: "Controle de budget",
    icon: <DollarSign className="w-5 h-5" aria-hidden="true" />,
    accentColor: "text-accent",
    glowColor: "rgba(143,92,255,0.15)",
    messages: [
      {
        type: "user",
        text: "ClaudIA quanto gastamos em ads hoje?",
        time: "16:45",
      },
      {
        type: "claudia",
        text: "R$ 3.241 em ads hoje. 📊 Google Ads: R$1.890 | Meta Ads: R$1.351. Você está 78% do budget diário. Ritmo saudável.",
        time: "16:45",
      },
    ],
  },
];

function MessageBubble({ message }: { message: ConversationMessage }) {
  const isUser = message.type === "user";
  const isAlert = message.type === "alert";

  if (isAlert) {
    return (
      <div className="flex gap-2.5 items-start">
        <div className="w-7 h-7 rounded-full bg-alert/20 border border-alert/30 flex items-center justify-center shrink-0">
          <AlertTriangle className="w-3.5 h-3.5 text-alert" aria-hidden="true" />
        </div>
        <div className="flex-1 bg-[#1E1208] border border-alert/20 rounded-2xl rounded-tl-sm px-3.5 py-2.5">
          <p className="text-xs text-orange-100 leading-relaxed">
            {message.text}
          </p>
          <p className="text-[10px] text-alert/50 mt-1">{message.time}</p>
        </div>
      </div>
    );
  }

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%]">
          <div className="bg-brand-gradient px-3.5 py-2.5 rounded-2xl rounded-tr-sm">
            <p className="text-xs text-white leading-relaxed">{message.text}</p>
          </div>
          <p className="text-[10px] text-text-secondary mt-1 text-right pr-1">
            {message.time}
          </p>
        </div>
      </div>
    );
  }

  // Parse bold text for ClaudIA messages
  const renderText = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, index) =>
      index % 2 === 1 ? (
        <strong key={index} className="text-white font-semibold">
          {part}
        </strong>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  return (
    <div className="flex gap-2.5 items-end">
      <div className="w-7 h-7 rounded-full bg-brand-gradient flex items-center justify-center shrink-0">
        <span className="text-[10px] font-bold text-white">C</span>
      </div>
      <div className="flex-1 max-w-[85%]">
        <div className="bg-surface border border-white/5 px-3.5 py-2.5 rounded-2xl rounded-tl-sm">
          <p className="text-xs text-text-secondary leading-relaxed">
            {renderText(message.text)}
          </p>
        </div>
        <p className="text-[10px] text-text-secondary mt-1 pl-1">
          {message.time} ✓✓
        </p>
      </div>
    </div>
  );
}

function ConversationCard({ conv }: { conv: Conversation }) {
  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="relative flex flex-col card-surface hover:border-white/10 transition-all duration-300 group overflow-hidden"
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${conv.glowColor} 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Card header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
        {/* WhatsApp status dots */}
        <div className="flex gap-1.5" aria-hidden="true">
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        </div>
        <div className="flex-1 flex items-center gap-2">
          <span className={conv.accentColor}>{conv.icon}</span>
          <div>
            <p className="text-xs font-semibold text-white">{conv.title}</p>
            <p className="text-[10px] text-text-secondary">{conv.subtitle}</p>
          </div>
        </div>
        {/* Online indicator */}
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" aria-hidden="true" />
          <span className="text-[10px] text-green-400">online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex flex-col gap-3 p-4 bg-[#0B0B0F] min-h-[140px]" role="log" aria-label={`Conversa: ${conv.title}`}>
        {conv.messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} />
        ))}
      </div>
    </motion.div>
  );
}

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

export default function ConversationExamples() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="exemplos"
      ref={ref}
      className="section-padding relative"
      aria-labelledby="conversations-title"
    >
      {/* Divider top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(46,139,255,0.3), transparent)",
        }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(46,139,255,0.05) 0%, transparent 70%)",
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
          <span className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-xs font-medium text-secondary mx-auto">
            Conversas reais
          </span>
          <h2
            id="conversations-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white"
          >
            Veja ClaudIA em{" "}
            <span className="gradient-text">ação.</span>
          </h2>
          <p className="text-text-secondary text-base lg:text-lg max-w-2xl mx-auto">
            Perguntas em linguagem natural, respostas instantâneas com dados
            reais do seu negócio.
          </p>
        </motion.div>

        {/* Conversations grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 gap-5"
        >
          {conversations.map((conv) => (
            <motion.div key={conv.id} variants={cardVariants}>
              <ConversationCard conv={conv} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center text-xs text-text-secondary mt-8"
        >
          * Dados ilustrativos. Respostas reais dependem dos dados conectados ao
          seu workspace.
        </motion.p>
      </div>
    </section>
  );
}
