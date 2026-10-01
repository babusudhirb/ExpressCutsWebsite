import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { PopularServices } from "@/components/sections/PopularServices";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { OffersSection } from "@/components/offers/OffersSection";
import { CutsGallery } from "@/components/sections/CutsGallery";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ClientReviews } from "@/components/sections/ClientReviews";
import { FaqLocation } from "@/components/sections/FaqLocation";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { FAQS } from "@/data/faq";
import { faqPlainText } from "@/data/beard";
import { faqSchema } from "@/lib/schema";

/** Title, description and Open Graph come from the root layout; this pins the canonical.
    The layout's `openGraph` is inherited whole — declaring one here would drop its image. */
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/* The questions the page already answers in FaqLocation, marked up as they read */
const SCHEMA = faqSchema(FAQS.map((faq) => ({ q: faq.q, a: faqPlainText(faq) })));

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA).replace(/</g, "\u003c") }}
        />
        <Hero />
        <TrustStrip />
        <PopularServices />
        <ServicesSection />
        {/* Stable hook for StickyCTA: the offers layout swaps after hydration */}
        <div data-offers-zone>
          <OffersSection />
        </div>
        <CutsGallery />
        <ExperienceSection />
        <ClientReviews />
        <FaqLocation />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
