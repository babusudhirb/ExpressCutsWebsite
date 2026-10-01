import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { HairColorHero } from "@/components/hair-color/HairColorHero";
import { HairColorFind } from "@/components/hair-color/HairColorFind";
import { HairColorLooks } from "@/components/hair-color/HairColorLooks";
import { HairColorProcess } from "@/components/hair-color/HairColorProcess";
import { HairColorPackages } from "@/components/hair-color/HairColorPackages";
import { HAIR_COLOR_HERO } from "@/data/hair-color";
import { breadcrumbs, serviceSchema } from "@/lib/schema";

const TITLE = "Men's Hair Color in KR Puram, Bengaluru | Express Cuts";
const DESCRIPTION =
  "Professional men's hair color, highlights, streaks and grey coverage at Express Cuts Men's Salon in KR Puram, Bengaluru.";
const OG_IMAGE = {
  url: HAIR_COLOR_HERO.src,
  width: HAIR_COLOR_HERO.width,
  height: HAIR_COLOR_HERO.height,
  alt: HAIR_COLOR_HERO.alt,
};

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  /* Resolves against metadataBase once NEXT_PUBLIC_SITE_URL is set for the live domain */
  alternates: { canonical: "/hair-color" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "/hair-color", type: "website", images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [OG_IMAGE.url] },
};


/* The salon is described once, site-wide; these point at it */
const SCHEMA = [
  serviceSchema({
    name: "Men's Hair Color",
    serviceType: "Men's hair colour, highlights, streaks and grey coverage",
    description:
      "Men's hair colour, grey coverage, streaks and highlights at Express Cuts Men's Salon in Ayyappa Nagar, KR Puram, Bengaluru.",
    path: "/hair-color",
  }),
  breadcrumbs([{ name: "Men's Hair Color", path: "/hair-color" }]),
];

export default function HairColorPage() {
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
        <HairColorHero />
        <HairColorFind />
        <HairColorLooks />
        <HairColorProcess />
        <HairColorPackages />
      </main>
      <Footer />
      <StickyCTA callOnly />
    </>
  );
}
