import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { HairHero } from "@/components/hair/HairHero";
import { HaircutStrip } from "@/components/hair/HaircutStrip";
import { HairTypeGuide } from "@/components/hair/HairTypeGuide";
import { CutsTrack } from "@/components/hair/CutsTrack";
import { StyleHelp } from "@/components/hair/StyleHelp";
import { HairProcess } from "@/components/hair/HairProcess";
import { HairCTA } from "@/components/hair/HairCTA";
import { breadcrumbs, serviceSchema } from "@/lib/schema";

const TITLE = "Men's Haircut in KR Puram, Bengaluru | Express Cuts";
const DESCRIPTION =
  "Men's haircuts and styling at Express Cuts, Ayyappa Nagar, KR Puram — classic cuts, fades, tapers and textured crops from ₹99. Walk-ins welcome.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/hair" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/hair",
    type: "website",
    images: [
      {
        url: "/images/hair/mens-haircut-styling-session.png",
        width: 1774,
        height: 887,
        alt: "Men's haircut at Express Cuts Men's Salon in KR Puram, Bengaluru",
      },
    ],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

const SCHEMA = [
  serviceSchema({
    name: "Men's Haircut",
    serviceType: "Men's haircut and styling",
    description:
      "Men's haircuts and styling at Express Cuts Men's Salon in Ayyappa Nagar, KR Puram, Bengaluru — classic cuts, fades, tapers and textured crops.",
    path: "/hair",
  }),
  breadcrumbs([{ name: "Men's Haircut", path: "/hair" }]),
];

export default function HairPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        {SCHEMA.map((block) => (
          <script
            key={block["@type"]}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(block).replace(/</g, "\u003c") }}
          />
        ))}
        <HairHero />
        <HaircutStrip />
        <HairTypeGuide />
        {/* Stable hook for StickyCTA: it steps aside while the pinned track is on screen */}
        <div data-offers-zone>
          <CutsTrack />
        </div>
        <StyleHelp />
        <HairProcess />
        <HairCTA />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
