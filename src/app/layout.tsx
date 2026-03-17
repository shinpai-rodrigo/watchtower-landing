import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WatchTower.AI — Suas métricas de negócio. Entregues no WhatsApp.",
  description:
    "Conecte suas ferramentas. Faça perguntas. Receba alertas. Ganhe insights. Tudo em uma conversa com ClaudIA no WhatsApp. Monitore suas métricas de negócio em tempo real.",
  keywords: [
    "monitoramento de métricas",
    "business intelligence",
    "WhatsApp analytics",
    "alertas inteligentes",
    "SaaS métricas",
    "WatchTower.AI",
    "ClaudIA",
    "dashboard WhatsApp",
  ],
  authors: [{ name: "WatchTower.AI" }],
  creator: "WatchTower.AI",
  publisher: "WatchTower.AI",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://watchtower.ai",
    siteName: "WatchTower.AI",
    title: "WatchTower.AI — Suas métricas de negócio. Entregues no WhatsApp.",
    description:
      "Conecte suas ferramentas. Faça perguntas. Receba alertas. Ganhe insights. Tudo em uma conversa com ClaudIA no WhatsApp.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "WatchTower.AI — Monitoramento de métricas no WhatsApp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WatchTower.AI — Suas métricas de negócio. Entregues no WhatsApp.",
    description:
      "Conecte suas ferramentas. Faça perguntas. Receba alertas. Ganhe insights. Tudo em uma conversa com ClaudIA.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0B12",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className="bg-background text-text-primary font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
