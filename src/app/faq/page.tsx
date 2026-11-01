import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { FaqExplorer } from "@/components/faq/FaqExplorer";
import { WaveHero } from "@/components/ui/WaveHero";
import { FAQ_CATEGORIES, FAQ_ITEMS, faqPlain } from "@/data/faq-page";
import { breadcrumbs, faqSchema } from "@/lib/schema";

const TITLE = "Express Cuts Salon FAQs | Haircuts, Hours & Location";
const DESCRIPTION =
  "Find answers about Express Cuts Unisex Salon in KR Puram, including haircuts, beard grooming, facials, hair spa, offers, opening hours and location.";

const HERO = {
  src: "/images/gallery/express-cuts-salon-interior-kr-puram.webp",
  width: 1448,
  height: 1086,
  alt: "Inside Express Cuts in KR Puram: styling chairs, reception desk and marble floor",
  position: "62% 48%",
};
const SALON = {
  src: "/images/gallery/express-cuts-salon-gallery-hero-kr-puram.webp",
  alt: "Reception desk and styling floor inside Express Cuts in KR Puram",
};

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/faq" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/faq",
    type: "website",
    images: [{ url: HERO.src, width: HERO.width, height: HERO.height, alt: HERO.alt }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [HERO.src] },
};

const categoryLabel = new Map(FAQ_CATEGORIES.map((c) => [c.id, c.label]));

/* Exactly the questions and answers on the page, in the same words */
const SCHEMA = [
  faqSchema(FAQ_ITEMS.map((item) => ({ q: item.q, a: faqPlain(item) }))),
  breadcrumbs([{ name: "FAQs", path: "/faq" }]),
];

const ENTRIES = FAQ_ITEMS.map((item) => ({
  ...item,
  haystack: `${item.q} ${faqPlain(item)} ${categoryLabel.get(item.category)}`.toLowerCase(),
}));

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="bg-hero-mobile pt-[var(--nav-h)]">
        {SCHEMA.map((block, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(block).replace(/</g, "<") }}
          />
        ))}
        <WaveHero
          eyebrow="FAQs"
          title={["Your Questions,", "Answered."]}
          copy="Everything you need to know about our services, bookings, offers and your visit to Express Cuts."
          image={HERO}
        />
        <FaqExplorer items={ENTRIES} categories={FAQ_CATEGORIES} salonImage={SALON} />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
