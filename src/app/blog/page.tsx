import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { BlogExplorer } from "@/components/blog/BlogExplorer";
import { WaveHero } from "@/components/ui/WaveHero";
import { BLOG_CATEGORIES, BLOG_POSTS, postModified, toCard } from "@/data/blog-posts";
import { abs, breadcrumbs, businessRef } from "@/lib/schema";

const TITLE = "Men's Grooming Blog | Haircut, Beard & Hair Care Tips | Express Cuts";
const DESCRIPTION =
  "Explore practical men's haircut, beard grooming, facial, hair spa and hair colour guides from Express Cuts Unisex Salon in KR Puram, Bengaluru.";

const HERO = {
  src: "/images/offers-2/mens-hair-styling-barber.webp",
  width: 1400,
  height: 1531,
  alt: "Barber styling a client's hair by hand as the client reclines in the chair",
  position: "50% 74%",
};
const SALON = {
  src: "/images/gallery/express-cuts-salon-gallery-hero-kr-puram.webp",
  alt: "Reception desk and styling floor inside Express Cuts in KR Puram",
};

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/blog",
    type: "website",
    images: [{ url: HERO.src, width: HERO.width, height: HERO.height, alt: HERO.alt }],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: [HERO.src] },
};

const SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: TITLE,
    description: DESCRIPTION,
    url: abs("/blog"),
    about: businessRef,
    mainEntity: {
      "@type": "Blog",
      "@id": abs("/blog#blog"),
      name: "Express Cuts Blog",
      url: abs("/blog"),
      publisher: businessRef,
      inLanguage: "en-IN",
      blogPost: BLOG_POSTS.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        url: abs(`/blog/${post.slug}`),
        datePublished: post.published,
        dateModified: postModified(post),
      })),
    },
  },
  breadcrumbs([{ name: "Blog", path: "/blog" }]),
];

export default function BlogPage() {
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
          eyebrow="Express Cuts Blog"
          title={["Grooming Tips,", "Styles & Care Guides"]}
          copy="Expert advice on haircuts, beard grooming, skincare and men's grooming, curated by the Express Cuts team."
          image={HERO}
        />
        <BlogExplorer posts={BLOG_POSTS.map(toCard)} categories={BLOG_CATEGORIES} salonImage={SALON} />
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
