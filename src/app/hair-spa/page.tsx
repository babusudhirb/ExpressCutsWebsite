import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { HairSpaHero } from "@/components/hair-spa/HairSpaHero";
import { HairSpaIntro } from "@/components/hair-spa/HairSpaIntro";
import { HairSpaProcess } from "@/components/hair-spa/HairSpaProcess";
import { HairSpaNeeds } from "@/components/hair-spa/HairSpaNeeds";
import { HairSpaWhy } from "@/components/hair-spa/HairSpaWhy";
import { HairSpaFaq } from "@/components/hair-spa/HairSpaFaq";
import { HairSpaVisit } from "@/components/hair-spa/HairSpaVisit";
import { HairSpaCTA } from "@/components/hair-spa/HairSpaCTA";
import { HAIR_SPA_HERO } from "@/data/hair-spa";
import { breadcrumbs, serviceSchema } from "@/lib/schema";

const TITLE = "Men's Hair Spa in KR Puram | Express Cuts Unisex Salon";
const DESCRIPTION =
  "Professional men's hair spa and hair treatment in KR Puram, Bengaluru. Hair nourishment, scalp care and grooming at Express Cuts Unisex Salon.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/hair-spa" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/hair-spa",
    type: "website",
    images: [{ url: HAIR_SPA_HERO.src, width: HAIR_SPA_HERO.width, height: HAIR_SPA_HERO.height, alt: HAIR_SPA_HERO.alt }],
  },
};

/* The salon is described once, site-wide; these point at it */
const SCHEMA = [
  serviceSchema({
    name: "Men's Hair Spa",
    serviceType: "Hair spa and hair treatment for men",
    description:
      "Hair spa and scalp treatments for men at Express Cuts Unisex Salon in Ayyappa Nagar, KR Puram, Bengaluru.",
    path: "/hair-spa",
  }),
  breadcrumbs([{ name: "Men's Hair Spa", path: "/hair-spa" }]),
];

export default function HairSpaPage() {
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
        <HairSpaHero />
        <HairSpaIntro />
        <HairSpaProcess />
        <HairSpaNeeds />
        <HairSpaWhy />
        <HairSpaFaq />
        <HairSpaVisit />
        <HairSpaCTA />
      </main>
      <Footer />
      <StickyCTA callOnly />
    </>
  );
}
