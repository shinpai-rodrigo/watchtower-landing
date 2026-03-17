"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Radio } from "lucide-react";

const navLinks = [
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Funcionalidades", href: "#funcionalidades" },
  { label: "Integrações", href: "#integracoes" },
  { label: "Planos", href: "#planos" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-transparent"
      }`}
    >
      <nav
        className="section-container flex items-center justify-between h-16 lg:h-20"
        aria-label="Navegação principal"
      >
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2.5 group"
          aria-label="Matheus AI — página inicial"
        >
          <div className="relative w-9 h-9 flex items-center justify-center">
            <div className="absolute inset-0 rounded-xl bg-brand-gradient opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
            <div className="absolute inset-0 rounded-xl bg-brand-gradient opacity-10 blur-md group-hover:opacity-30 transition-opacity duration-300" />
            <Radio className="w-5 h-5 text-primary relative z-10" aria-hidden="true" />
          </div>
          <span className="font-bold text-lg tracking-tight">
            <span className="text-white">Matheus</span>
            <span className="gradient-text"> AI</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-8" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-medium text-text-secondary hover:text-white transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-brand-gradient group-hover:w-full transition-all duration-300" />
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleNavClick("#hero")}
            className="btn-primary text-sm px-5 py-2.5"
            aria-label="Falar com a ClaudIA"
          >
            <span className="relative z-10">Falar com a ClaudIA</span>
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-white hover:bg-white/5 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" aria-hidden="true" />
          ) : (
            <Menu className="w-5 h-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden bg-surface/95 backdrop-blur-xl border-b border-white/5 overflow-hidden"
          >
            <div className="section-container py-4 flex flex-col gap-1">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.06 }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left w-full px-4 py-3 rounded-xl text-sm font-medium text-text-secondary hover:text-white hover:bg-white/5 transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.06 }}
                className="pt-2"
              >
                <button
                  onClick={() => handleNavClick("#hero")}
                  className="btn-primary w-full justify-center text-sm"
                  aria-label="Falar com a ClaudIA"
                >
                  Falar com a ClaudIA
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
