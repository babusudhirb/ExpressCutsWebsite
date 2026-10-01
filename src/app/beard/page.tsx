import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { BeardHero } from "@/components/beard/BeardHero";
import { BeardOffer } from "@/components/beard/BeardOffer";
import { BeardStyles } from "@/components/beard/BeardStyles";
import { BeardTransformation } from "@/components/beard/BeardTransformation";
import { BeardCare } from "@/components/beard/BeardCare";
import { BeardFit } from "@/components/beard/BeardFit";
import { BeardServices } from "@/components/beard/BeardServices";
import { BeardProcess } from "@/components/beard/BeardProcess";
import { BeardFaq } from "@/components/beard/BeardFaq";
import { BeardCTA } from "@/components/beard/BeardCTA";
import { breadcrumbs, serviceSchema } from "@/lib/schema";

const TITLE = "Men’s Beard Grooming in KR Puram, Bengaluru | Express Cuts";
const DESCRIPTION =
  "Men's beard grooming at Express Cuts, Ayyappa Nagar, KR Puram — beard trim, shaping, line-up and shaving. Walk-ins welcome, open 7 days.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/beard" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/beard",
    type: "website",
    images: [{ url: "/images/beard/mens-beard-trim-scissors.png", width: 501, height: 750, alt: "Barber trimming a client's beard" }],
  },
};

/* This page's service, tied to the salon described once in the root layout */
const SCHEMA = [
  serviceSchema({
    name: "Men's Beard Grooming",
    serviceType: "Beard trim, shaping, line-up and shaving for men",
    description:
      "Men's beard grooming at Express Cuts Men's Salon in Ayyappa Nagar, KR Puram, Bengaluru: beard trim, shaping, line-up and shaving.",
    path: "/beard",
  }),
  breadcrumbs([{ name: "Men's Beard Grooming", path: "/beard" }]),
];

export default function BeardPage() {
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
        <BeardHero />
        <BeardOffer />
        {/* StickyCTA hooks: #services ends the phone bar's window; the zone hides the desktop pair while pinned */}
        <div id="services" data-offers-zone>
          <BeardStyles />
        </div>
        <BeardTransformation />
        <BeardCare />
        <BeardFit />
        <BeardServices />
        <BeardProcess />
        <BeardFaq />
        <BeardCTA />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
