import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Brands } from "@/components/landing/brands";
import { FeatureSection } from "@/components/landing/feature-section";
import { ToolIntegrations } from "@/components/landing/tool-integrations";
import { FlickerGridSection } from "@/components/landing/flicker-grid-section";
import { TweetSection } from "@/components/landing/tweet-section";
import { PricingHero } from "@/components/landing/pricing-hero";
import { PricingSection } from "@/components/landing/pricing-section";
import { FAQSection } from "@/components/landing/faq-section";
import { CTASection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";
import { FadeIn } from "@/components/ui/fade-in";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col bg-white">
      <Header />

      {/* Global Vertical Lines 
          Fixed positioning ensures they span the viewport height.
          z-40 ensures they are above standard content (z-10, bg-white) 
          but below the sticky Header (z-50+). 
      */}
      <div className="fixed top-14 inset-x-0 bottom-0 pointer-events-none z-40 flex justify-center">
        <div className="w-full max-w-[1200px] border-x border-gray-200/60 h-full px-3 md:px-6">
          <div className="w-full h-full border-x border-gray-200/60" />
        </div>
      </div>

      <div className="relative z-10">
        <Hero />

        <FadeIn>
          <Brands />
        </FadeIn>

        {/* Dub Link Section */}
        <FadeIn>
          <FeatureSection />
        </FadeIn>

        {/* FEATURES Text Section */}
        <FadeIn>
          <FlickerGridSection title="FEATURES" />
        </FadeIn>

        {/* 6 Cards Section (Tool Integrations) */}
        <FadeIn>
          <ToolIntegrations />
        </FadeIn>

        {/* Performance Text Section */}
        <FadeIn>
          <FlickerGridSection />
        </FadeIn>

        {/* Twitter/Testimonials Section */}
        <FadeIn>
          <TweetSection />
        </FadeIn>

        {/* Pricing Text Section */}
        <FadeIn>
          <FlickerGridSection title="Pricing" />
        </FadeIn>

        {/* Pricing Cards */}
        <FadeIn>
          <PricingSection />
        </FadeIn>

        {/* FAQ Header */}
        <FadeIn>
          <FlickerGridSection title="Frequently asked questions" />
        </FadeIn>

        {/* FAQ Content */}
        <FadeIn>
          <FAQSection />
        </FadeIn>

        {/* CTA "Email Us" Section */}
        <FadeIn>
          <CTASection />
        </FadeIn>

        {/* Pricing Header (Black Box) - Moved here */}
        <FadeIn>
          <PricingHero />
        </FadeIn>

        {/* Footer */}
        <FadeIn>
          <Footer />
        </FadeIn>
      </div>
    </main>
  );
}
