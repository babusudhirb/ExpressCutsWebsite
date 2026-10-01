import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { FacialHero } from "@/components/facial/FacialHero";
import { FacialOffers } from "@/components/facial/FacialOffers";
import { FacialConcerns } from "@/components/facial/FacialConcerns";
import { FacialEditorial } from "@/components/facial/FacialEditorial";
import { FacialGuide, FacialVisitFaq } from "@/components/facial/FacialInfo";
import { FacialReviews } from "@/components/facial/FacialReviews";
import { FacialCTA } from "@/components/facial/FacialCTA";
import { breadcrumbs, serviceSchema } from "@/lib/schema";

const TITLE = "Men’s Facial in KR Puram | Express Cuts Men’s Salon";
const DESCRIPTION =
  "Explore men’s facial treatments at Express Cuts Men’s Salon in KR Puram, Bengaluru, including Type 1, Type 2, Type 3, Type 4 and Hydra Facial options.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/facial" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/facial",
    type: "website",
    images: [
      {
        url: "/images/services/facial-treatment.png",
        width: 1536,
        height: 1024,
        alt: "Therapist brushing a facial mask onto a client at Express Cuts",
      },
    ],
  },
};

/* This page's service, tied to the salon described once in the root layout */
const SCHEMA = [
  serviceSchema({
    name: "Men's Facial",
    serviceType: "Facials and skin treatments for men",
    description:
      "Men's facials at Express Cuts Men's Salon in Ayyappa Nagar, KR Puram, Bengaluru, including Type 1 to Type 4 facials and the Hydra Facial.",
    path: "/facial",
  }),
  breadcrumbs([{ name: "Men's Facial", path: "/facial" }]),
];

export default function FacialPage() {
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
        <FacialHero />
        {/* StickyCTA hooks: #services ends the phone bar's window; the zone hides the desktop pair while pinned */}
        <div id="services" data-offers-zone>
          <FacialOffers />
        </div>
        <FacialEditorial />
        <FacialConcerns />
        <FacialGuide />
        <FacialReviews />
        <FacialVisitFaq />
        <FacialCTA />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
