"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";

export default function CTAFinal() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="cta-final"
      ref={ref}
      className="section-padding relative overflow-hidden"
      aria-labelledby="cta-title"
    >
      {/* Top divider */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(107,43,255,0.4), rgba(46,139,255,0.4), transparent)",
        }}
        aria-hidden="true"
      />

      {/* Layered background */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 120% 100% at 50% 50%, rgba(107,43,255,0.2) 0%, rgba(46,139,255,0.1) 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 grid-bg opacity-40" aria-hidden="true" />

      {/* Animated orbs */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-20 animate-float"
        style={{ background: "radial-gradient(circle, #6B2BFF 0%, transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-56 h-56 rounded-full blur-3xl opacity-15 animate-float-delayed"
        style={{ background: "radial-gradient(circle, #2E8BFF 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* Particle dots */}
      {[
        { top: "20%", left: "10%" },
        { top: "80%", left: "15%" },
        { top: "30%", right: "10%" },
        { top: "70%", right: "20%" },
        { top: "50%", left: "5%" },
        { top: "40%", right: "5%" },
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/40 animate-pulse-slow"
          style={{ ...pos, animationDelay: `${i * 0.5}s` }}
          aria-hidden="true"
        />
      ))}

      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-8"
          >
            {/* Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }
              }
              transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
              className="flex justify-center"
            >
              <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center relative"
                style={{
                  background: "linear-gradient(135deg, #6B2BFF, #2E8BFF)",
                  boxShadow: "0 0 60px rgba(107,43,255,0.5), 0 0 120px rgba(107,43,255,0.2)",
                }}
                aria-hidden="true"
              >
                <MessageCircle className="w-10 h-10 text-white" />
                <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-white" />
                </div>
              </div>
            </motion.div>

            {/* Headline */}
            <div className="flex flex-col gap-4">
              <motion.h2
                id="cta-title"
                initial={{ opacity: 0, y: 16 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
                }
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
              >
                Deixe a ClaudIA{" "}
                <span className="gradient-text">monitorar</span> seu negócio.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
                }
                transition={{ duration: 0.6, delay: 0.35 }}
                className="text-text-secondary text-lg lg:text-xl max-w-xl mx-auto leading-relaxed"
              >
                Enquanto você foca no que importa, a ClaudIA cuida dos seus
                dados. Alertas inteligentes. Insights em tempo real. Zero
                dashboards.
              </motion.p>
            </div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={
                isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }
              }
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#planos"
                className="btn-primary text-base px-8 py-4 group"
                aria-label="Começar a usar o Matheus AI agora"
              >
                Começar agora
                <ArrowRight
                  className="w-5 h-5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#como-funciona"
                className="text-sm font-medium text-text-secondary hover:text-white transition-colors flex items-center gap-2"
                aria-label="Saber mais sobre como funciona"
              >
                Saber mais
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </motion.a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-6 pt-4"
            >
              {[
                "Sem cartão de crédito",
                "Setup em minutos",
                "Cancele quando quiser",
              ].map((text) => (
                <div key={text} className="flex items-center gap-1.5">
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                  <span className="text-xs text-text-secondary">{text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient to footer */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, #0B0B12)",
        }}
        aria-hidden="true"
      />
    </section>
  );
}
