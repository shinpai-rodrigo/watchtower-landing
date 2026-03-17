import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import ConversationExamples from "@/components/ConversationExamples";
import Integrations from "@/components/Integrations";
import Security from "@/components/Security";
import Pricing from "@/components/Pricing";
import CTAFinal from "@/components/CTAFinal";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <ConversationExamples />
      <Integrations />
      <Security />
      <Pricing />
      <CTAFinal />
      <Footer />
    </main>
  );
}
