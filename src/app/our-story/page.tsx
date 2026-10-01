import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { StoryHero } from "@/components/our-story/StoryHero";
import { ProofStrip, StoryStart } from "@/components/our-story/StoryStart";
import { StoryServices, VisitSteps } from "@/components/our-story/StoryServices";
import { HygieneProducts, SalonGallery } from "@/components/our-story/HygieneProducts";
import { OffersStrip, StoryCTA, StoryFaq, StoryLocation, StoryReviews } from "@/components/our-story/StoryClose";
import { STORY_FAQS, STORY_HERO } from "@/data/our-story";
import { faqPlainText } from "@/data/beard";
import { abs, breadcrumbs, businessRef, faqSchema } from "@/lib/schema";

const TITLE = "About Express Cuts | Men's Salon in KR Puram Since 2021";
const DESCRIPTION =
  "Express Cuts is a men's salon in Ayyappa Nagar, KR Puram, Bengaluru, open since 2021 — haircuts, beard grooming, facials, hair spa and colour.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/our-story" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/our-story",
    type: "website",
    images: [{ url: STORY_HERO.src, width: STORY_HERO.width, height: STORY_HERO.height, alt: STORY_HERO.alt }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [STORY_HERO.src] },
};

/* AboutPage + the four visible questions, pointing at the salon described once
   in the root layout. No review or aggregateRating markup. */
const SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: TITLE,
    description: DESCRIPTION,
    url: abs("/our-story"),
    about: businessRef,
    primaryImageOfPage: abs(STORY_HERO.src),
  },
  faqSchema(STORY_FAQS.map((faq) => ({ q: faq.q, a: faqPlainText(faq) }))),
  breadcrumbs([{ name: "Our Story", path: "/our-story" }]),
];

export default function OurStoryPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        {SCHEMA.map((block, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(block).replace(/</g, "\u003c") }}
          />
        ))}
        <StoryHero />
        <StoryStart />
        <ProofStrip />
        {/* StoryServices carries id="services", the hook StickyCTA uses to end the phone bar's window */}
        <StoryServices />
        <VisitSteps />
        <HygieneProducts />
        <SalonGallery />
        <StoryReviews />
        <OffersStrip />
        <StoryFaq />
        <StoryLocation />
        <StoryCTA />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
