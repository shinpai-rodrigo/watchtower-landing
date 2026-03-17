"use client";

import { motion } from "framer-motion";
import { Radio, Twitter, Linkedin, Github, Instagram, Mail } from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const footerSections: FooterSection[] = [
  {
    title: "Produto",
    links: [
      { label: "Como funciona", href: "#como-funciona" },
      { label: "Funcionalidades", href: "#funcionalidades" },
      { label: "Integrações", href: "#integracoes" },
      { label: "Planos", href: "#planos" },
      { label: "Segurança", href: "#seguranca" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Sobre nós", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Casos de uso", href: "#" },
      { label: "Parceiros", href: "#" },
    ],
  },
  {
    title: "Suporte",
    links: [
      { label: "Documentação", href: "#" },
      { label: "Central de ajuda", href: "#" },
      { label: "Status do sistema", href: "#" },
      { label: "Contato", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Termos de uso", href: "#" },
      { label: "Privacidade", href: "#" },
      { label: "Cookies", href: "#" },
      { label: "LGPD", href: "#" },
    ],
  },
];

const socialLinks = [
  { icon: <Twitter className="w-4 h-4" aria-hidden="true" />, href: "#", label: "Twitter" },
  { icon: <Linkedin className="w-4 h-4" aria-hidden="true" />, href: "#", label: "LinkedIn" },
  { icon: <Instagram className="w-4 h-4" aria-hidden="true" />, href: "#", label: "Instagram" },
  { icon: <Github className="w-4 h-4" aria-hidden="true" />, href: "#", label: "GitHub" },
  { icon: <Mail className="w-4 h-4" aria-hidden="true" />, href: "mailto:contato@matheus-ai.ai", label: "E-mail" },
];

export default function Footer() {
  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer
      className="relative border-t border-white/5"
      role="contentinfo"
      aria-label="Rodapé do site"
    >
      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(107,43,255,0.3), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="section-container py-16">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 mb-12">
          {/* Brand column */}
          <div className="col-span-2 flex flex-col gap-5">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-2.5 group w-fit"
              aria-label="Matheus AI — voltar ao topo"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <div className="relative w-9 h-9 flex items-center justify-center">
                <div className="absolute inset-0 rounded-xl bg-brand-gradient opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                <Radio
                  className="w-5 h-5 text-primary relative z-10"
                  aria-hidden="true"
                />
              </div>
              <span className="font-bold text-lg tracking-tight">
                <span className="text-white">Matheus</span>
                <span className="gradient-text"> AI</span>
              </span>
            </a>

            {/* Tagline */}
            <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
              Suas métricas de negócio. Entregues no WhatsApp. Monitoramento
              inteligente com ClaudIA.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2" role="list" aria-label="Redes sociais">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-text-secondary hover:text-white hover:bg-white/10 hover:border-white/10 transition-all duration-200"
                  aria-label={social.label}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Email badge */}
            <a
              href="mailto:contato@matheus-ai.ai"
              className="inline-flex items-center gap-2 text-xs text-text-secondary hover:text-white transition-colors w-fit"
              aria-label="Enviar e-mail para contato@matheus-ai.ai"
            >
              <Mail className="w-3.5 h-3.5" aria-hidden="true" />
              contato@matheus-ai.ai
            </a>
          </div>

          {/* Footer sections */}
          {footerSections.map((section) => (
            <nav
              key={section.title}
              aria-labelledby={`footer-${section.title.toLowerCase().replace(/\s/g, "-")}`}
            >
              <p
                id={`footer-${section.title.toLowerCase().replace(/\s/g, "-")}`}
                className="text-xs font-semibold text-white uppercase tracking-wider mb-4"
              >
                {section.title}
              </p>
              <ul className="flex flex-col gap-2.5" role="list">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("#") ? (
                      <button
                        onClick={() => handleNavClick(link.href)}
                        className="text-sm text-text-secondary hover:text-white transition-colors text-left"
                      >
                        {link.label}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-text-secondary hover:text-white transition-colors"
                        target={
                          link.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          link.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-xs text-text-secondary text-center sm:text-left">
            © {new Date().getFullYear()} Matheus AI. Todos os direitos
            reservados.
          </p>

          {/* Status indicator */}
          <div className="flex items-center gap-2">
            <div
              className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"
              aria-hidden="true"
            />
            <span className="text-xs text-text-secondary">
              Todos os sistemas operacionais
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
