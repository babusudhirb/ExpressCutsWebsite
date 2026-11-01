export const dynamic = 'force-static';

import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { BLOG_POSTS, postModified } from "@/data/blog-posts";

/** Every page that exists. Absolute URLs need NEXT_PUBLIC_SITE_URL. */
const ROUTES = [
  { path: "/", priority: 1 },
  { path: "/offers", priority: 0.9 },
  { path: "/gallery", priority: 0.8 },
  { path: "/our-story", priority: 0.7 },
  { path: "/hair", priority: 0.8 },
  { path: "/beard", priority: 0.8 },
  { path: "/facial", priority: 0.8 },
  { path: "/hair-spa", priority: 0.7 },
  { path: "/hair-color", priority: 0.7 },
  { path: "/blog", priority: 0.7 },
  { path: "/faq", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url?.replace(/\/$/, "") ?? "";
  const lastModified = new Date();
  const pages = ROUTES.map(({ path, priority }) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority,
  }));
  /* Articles report their real last edit, not the build date */
  const articles = BLOG_POSTS.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(postModified(post)),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...pages, ...articles];
}
