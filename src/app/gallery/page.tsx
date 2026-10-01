import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { GalleryHero } from "@/components/gallery/GalleryHero";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { GalleryOffer, GalleryVisit } from "@/components/gallery/GalleryClose";
import { GALLERY_HERO, GALLERY_PHOTOS } from "@/data/gallery";
import { abs, breadcrumbs, businessRef } from "@/lib/schema";

const TITLE = "Express Cuts Men's Salon Gallery | KR Puram, Bengaluru";
const DESCRIPTION =
  "Photographs of Express Cuts Men's Salon in Ayyappa Nagar, KR Puram — the storefront, reception, styling floor, wash area and finished haircuts.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/gallery",
    type: "website",
    images: [
      {
        url: GALLERY_PHOTOS[0].src,
        width: GALLERY_PHOTOS[0].width,
        height: GALLERY_PHOTOS[0].height,
        alt: GALLERY_PHOTOS[0].alt,
      },
    ],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [GALLERY_PHOTOS[0].src] },
};

const SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: TITLE,
    description: DESCRIPTION,
    url: abs("/gallery"),
    about: businessRef,
    mainEntity: {
      "@type": "ImageGallery",
      name: "Inside Express Cuts Men's Salon",
      image: [GALLERY_HERO, ...GALLERY_PHOTOS].map((photo) => ({
        "@type": "ImageObject",
        contentUrl: abs(photo.src),
        caption: photo.alt,
        width: photo.width,
        height: photo.height,
      })),
    },
  },
  breadcrumbs([{ name: "Gallery", path: "/gallery" }]),
];

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="pt-[var(--nav-h)]">
        {SCHEMA.map((block, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(block).replace(/</g, "\u003c") }}
          />
        ))}
        <GalleryHero />
        <GalleryGrid />
        <GalleryOffer />
        <GalleryVisit />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
