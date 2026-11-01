import { BLOG_POSTS } from "@/data/blog-posts";
import { HOURS, SERVICE_NAV, SITE } from "@/lib/site";

export const dynamic = "force-static";

const base = (SITE.url ?? "").replace(/\/$/, "");

/**
 * An optional plain-text summary for AI tools that read one. It is not a search
 * ranking signal, and it is deliberately left out of the XML sitemap. Every line is
 * read from the same data as the site, so the two cannot disagree.
 */
export function GET() {
  const body = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.description}`,
    "",
    "## Contact",
    `- Website: ${base}/`,
    `- Address: ${SITE.addressLines.join(" ").replace(/,$/, "")}`,
    `- Location: ${SITE.neighbourhood}, ${SITE.landmark}`,
    `- Phone: ${SITE.phoneDisplay}`,
    `- WhatsApp: ${SITE.whatsappUrl}`,
    `- Google Maps: ${SITE.mapsUrl}`,
    "",
    "## Opening hours",
    ...HOURS.map((row) => `- ${row.label}: ${row.display}`),
    "",
    "## Services",
    ...SERVICE_NAV.map((s) => `- [${s.label}](${base}${s.href}/)`),
    `- [Offers and grooming packages](${base}/offers/)`,
    "",
    "## About",
    `- [Our Story](${base}/our-story/)`,
    `- [Gallery](${base}/gallery/)`,
    `- [FAQs](${base}/faq/)`,
    "",
    "## Blog",
    `- [All articles](${base}/blog/)`,
    ...BLOG_POSTS.map((post) => `- [${post.title}](${base}/blog/${post.slug}/)`),
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
