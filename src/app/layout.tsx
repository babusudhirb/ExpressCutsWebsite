import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Inter, Mrs_Saint_Delafield } from "next/font/google";
import "./globals.css";
import { MotionPrefs } from "@/components/motion/MotionPrefs";
import { SITE } from "@/lib/site";
import { Analytics } from "@/components/analytics/Analytics";
import { siteSchema } from "@/lib/schema";

const display = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-bodoni",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin", "latin-ext"], // latin-ext carries the ₹ glyph
  variable: "--font-inter",
  display: "swap",
});

const signature = Mrs_Saint_Delafield({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-signature",
  display: "swap",
  preload: false, // footer only: it must not compete with the hero photograph
});

const title = "Men's Salon in KR Puram | Express Cuts Unisex Salon";
const description =
  "Men's haircuts and beard grooming at Express Cuts Unisex Salon in KR Puram, Bengaluru. Explore haircuts, facials, hair spa and grooming offers.";

export const metadata: Metadata = {
  ...(SITE.url ? { metadataBase: new URL(SITE.url) } : {}),
  title: {
    default: title,
    template: `%s · ${SITE.name}`,
  },
  description,
  openGraph: {
    title,
    url: "/",
    description,
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/images/hero/home-hero.webp",
        width: 1733,
        height: 908,
        alt: "Inside Express Cuts Unisex Salon in Ayyappa Nagar, KR Puram, Bengaluru",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#f7f3ee",
};

const DIRECTION_CONTRACT = `<!--
THESIS: A local KR Puram salon presented as a men's grooming house: editorial fashion layout with real prices in plain sight. Refuses the discount-banner salon template.
OWN-WORLD: Warm ivory and cream grounds, near-black ink, champagne italic accents, one red reserved for offer prices. Bodoni display, Inter UI, a single script signature. Brown Call and green WhatsApp pills, 18px photo frames, hairline dividers.
STORY: Who they are, then what they do, then nine combos at exact prices, then why trust them, then where they are. WhatsApp or call at every turn.
FIRST VIEWPORT: The salon interior filling the screen, its own cream field under the type; Bodoni "A Better / You Everyday" on the left third; WhatsApp + Call pills beneath; nav with Home active.
FORM: Brief-pinned to REFRENCE IMAGE.png (pinned direction beats the roll). Seed key: pinned-reference.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
-->`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      /* Anchor links scroll smoothly (globals.css); route changes still land at the top at once */
      data-scroll-behavior="smooth"
      className={`${display.variable} ${sans.variable} ${signature.variable}`}
    >
      <body>
        <div hidden dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }} />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema()) }}
        />
        <MotionPrefs>
          {children}
        </MotionPrefs>
        <Analytics />
      </body>
    </html>
  );
}
