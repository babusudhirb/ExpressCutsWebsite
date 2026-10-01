import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Hero2 } from "@/components/offers-2/Hero2";
import { TabBar2 } from "@/components/offers-2/TabBar2";
import { Band2 } from "@/components/offers-2/Band2";
import { Closing2 } from "@/components/offers-2/Closing2";
import { MobileBar2 } from "@/components/offers-2/MobileBar2";
import { CtaZones2 } from "@/components/offers-2/CtaZones2";
import { ALL_OFFERS_2, HERO_2, SECTIONS_2 } from "@/data/offers-2";
import { abs, breadcrumbs, businessRef } from "@/lib/schema";
import { offerSans as sans, offerScript as script, offerSerif as serif } from "@/components/offer-card/fonts";

/* This page's type, loaded with the offer card it shares with the homepage, so the
   shared layout and every other page are untouched */

const TITLE = "Men's Salon Offers in KR Puram | Haircut ₹99 | Express Cuts";
const DESCRIPTION =
  "Men's haircut ₹99, beard trim ₹70, grooming combos from ₹249 and Hydra Facial ₹1,999 at Express Cuts, Ayyappa Nagar, KR Puram. Walk-ins welcome.";

/** The site's only Offers page: the approved design, on its canonical route. */
export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/offers" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/offers",
    type: "website",
    images: [{ url: HERO_2.src, width: HERO_2.width, height: HERO_2.height, alt: HERO_2.alt }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [HERO_2.src] },
};

/* The offer catalogue, tied to the salon described once in the root layout.
   No aggregateRating here: a business rating published by the business itself
   is not eligible for rich results. The visible 4.7 / 990 stays on the page. */
const SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Men's grooming offers in KR Puram",
    url: abs("/offers"),
    provider: businessRef,
    itemListElement: ALL_OFFERS_2.map((o) => ({
      "@type": "Offer",
      name: o.name,
      price: o.price,
      priceCurrency: "INR",
      url: abs("/offers"),
      itemOffered: { "@type": "Service", name: o.name, serviceType: o.includes.join(", ") },
    })),
  },
  breadcrumbs([{ name: "Offers", path: "/offers" }]),
];

export default function OffersPage() {
  return (
    <div className={`${serif.variable} ${sans.variable} ${script.variable} bg-[#f6f1e9] text-[#1a1612]`}>
      <CtaZones2>
      {/* One navigation for the whole site; the page's own header is gone */}
      <Navbar />
      <main
        id="main"
        className="pb-[74px] pt-[var(--nav-h)] font-[family-name:var(--font-o2-sans)] sm:pb-0"
      >
        {SCHEMA.map((block, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(block).replace(/</g, "\u003c") }}
          />
        ))}
        <Hero2 />
        <TabBar2 />
        {SECTIONS_2.map((section) => (
          <Band2 key={section.id} section={section} />
        ))}
        <Closing2 />
      </main>
      <MobileBar2 />
      </CtaZones2>
    </div>
  );
}
