import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, ChevronRight, Clock, PenLine } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { ArticleCard } from "@/components/blog/ArticleCard";
import { ArticleTableOfContents } from "@/components/blog/ArticleTableOfContents";
import { CallBtn2, WaBtn2 } from "@/components/offer-card/actions";
import { Arrow, btn } from "@/components/ui/button";
import { RichText } from "@/components/ui/RichText";
import { BLOG_POSTS, categoryOf, formatDate, getPost, postModified, readingMinutes, toCard } from "@/data/blog-posts";
import { articleSchema, breadcrumbs } from "@/lib/schema";
import { plainText } from "@/lib/rich-text";
import { waLink } from "@/lib/site";

/* Only the articles below exist; any other slug is a real 404 */
export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const path = `/blog/${post.slug}`;
  const image = { url: post.image.src, width: post.image.width, height: post.image.height, alt: post.image.alt };
  return {
    title: { absolute: post.metaTitle },
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: path },
    openGraph: {
      title: post.metaTitle,
      description: post.description,
      url: path,
      type: "article",
      publishedTime: post.published,
      modifiedTime: postModified(post),
      section: categoryOf(post).label,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: post.metaTitle, description: post.description, images: [post.image.src] },
  };
}

export default async function ArticlePage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const path = `/blog/${post.slug}`;
  const category = categoryOf(post);
  const headings = post.body.flatMap((block) => (block.t === "h2" ? [{ id: block.id, text: block.text }] : []));
  const related = post.related.map(getPost).filter((p) => p !== undefined);
  const schema = [
    articleSchema({
      title: post.title,
      description: post.description,
      path,
      image: post.image.src,
      published: post.published,
      modified: postModified(post),
      keywords: post.keywords,
      section: category.label,
    }),
    breadcrumbs([
      { name: "Blog", path: "/blog" },
      { name: post.title, path },
    ]),
  ];

  return (
    <>
      <Navbar />
      <main id="main" className="bg-hero-mobile pt-[var(--nav-h)]">
        {schema.map((block, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(block).replace(/</g, "<") }}
          />
        ))}

        <article>
          <header className="shell pt-6 lg:pt-9">
            <div className="mx-auto max-w-[1040px]">
              <nav aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[13.5px] text-ink-muted">
                  <li>
                    <Link href="/" className="inline-flex min-h-8 items-center hover:text-ink">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden>
                    <ChevronRight className="size-3.5" />
                  </li>
                  <li>
                    <Link href="/blog" className="inline-flex min-h-8 items-center hover:text-ink">
                      Blog
                    </Link>
                  </li>
                  <li aria-hidden>
                    <ChevronRight className="size-3.5" />
                  </li>
                  <li aria-current="page" className="text-ink-soft">
                    {post.title}
                  </li>
                </ol>
              </nav>

              <p className="eyebrow mt-6 text-bronze">{category.label}</p>
              <h1 className="mt-3 max-w-[22ch] font-display text-[clamp(2.1rem,6.4vw,3.4rem)] font-semibold leading-[1.1] tracking-[-0.015em]">
                {post.title}
              </h1>
              <p className="mt-4 max-w-[62ch] text-[17.5px] leading-[1.55] text-ink-soft">{post.excerpt}</p>

              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[14px] text-ink-muted">
                <li className="inline-flex items-center gap-2">
                  <PenLine aria-hidden className="size-4 text-bronze" strokeWidth={1.6} />
                  <span>
                    By{" "}
                    <Link href="/our-story" className="font-medium text-ink underline-offset-4 hover:underline">
                      the Express Cuts team
                    </Link>
                  </span>
                </li>
                <li className="inline-flex items-center gap-2">
                  <CalendarDays aria-hidden className="size-4 text-bronze" strokeWidth={1.6} />
                  <span>
                    Published <time dateTime={post.published}>{formatDate(post.published)}</time>
                  </span>
                </li>
                {post.updated && (
                  <li className="inline-flex items-center gap-2">
                    <span>
                      Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                    </span>
                  </li>
                )}
                <li className="inline-flex items-center gap-2">
                  <Clock aria-hidden className="size-4 text-bronze" strokeWidth={1.6} />
                  {readingMinutes(post)} min read
                </li>
              </ul>

              <div className="relative mt-7 aspect-[3/2] overflow-hidden rounded-[18px] sm:aspect-[2/1]">
                <Image
                  src={post.image.src}
                  alt={post.image.alt}
                  fill
                  loading="eager"
                  fetchPriority="high"
                  quality={85}
                  sizes="(min-width: 1120px) 1040px, 92vw"
                  className="object-cover"
                  style={{ objectPosition: post.image.position }}
                />
              </div>
            </div>
          </header>

          <div className="shell pb-12 pt-7 lg:pb-16 lg:pt-10">
            <div className="mx-auto grid max-w-[1040px] gap-x-12 lg:grid-cols-[230px_minmax(0,1fr)]">
              <div className="mb-6 lg:mb-0">
                <ArticleTableOfContents headings={headings} />
              </div>

              <div className="min-w-0 max-w-[68ch] text-[17px] leading-[1.7] text-ink-soft">
                <section aria-label="The short answer" className="rounded-[14px] border-l-[3px] border-champagne bg-cream/50 px-5 py-4">
                  <p className="eyebrow text-bronze">The short answer</p>
                  <p className="mt-2 text-ink">{plainText(post.answer)}</p>
                </section>

                <ArticleBody blocks={post.body} />

                <section aria-labelledby="in-short" className="mt-10 rounded-[14px] border border-line bg-white/50 p-5">
                  <h2 id="in-short" className="font-display text-[22px] font-semibold leading-tight">
                    In short
                  </h2>
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 marker:text-bronze">
                    {post.summary.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </section>

                <section aria-labelledby="related-questions" className="mt-10">
                  <h2 id="related-questions" className="font-display text-[clamp(1.55rem,4.6vw,1.9rem)] font-semibold leading-[1.18]">
                    Related questions
                  </h2>
                  {post.questions.map((item) => (
                    <div key={item.q} className="mt-5">
                      <h3 className="text-[18px] font-semibold leading-snug text-ink">{item.q}</h3>
                      <p className="mt-1.5">
                        <RichText text={item.a} />
                      </p>
                    </div>
                  ))}
                  <p className="mt-5">
                    <RichText text="More answers are on our [FAQ page](/faq)." />
                  </p>
                </section>

                {post.sources && (
                  <section aria-labelledby="sources" className="mt-10 border-t border-line pt-6 text-[14.5px] leading-[1.55]">
                    <h2 id="sources" className="font-semibold text-ink">
                      Sources
                    </h2>
                    <ul className="mt-2 space-y-1.5">
                      {post.sources.map((source) => (
                        <li key={source.href}>
                          <RichText text={`[${source.label}](${source.href})`} />
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-ink-muted">
                      This article is general grooming information, not medical advice. Services vary by salon; see our service pages for what Express Cuts offers.
                    </p>
                  </section>
                )}

                <section aria-labelledby="article-cta" className="mt-10 rounded-[18px] bg-night p-6 text-ivory sm:p-7">
                  <h2 id="article-cta" className="font-display text-[26px] font-semibold leading-tight">
                    {post.cta.title}
                  </h2>
                  <p className="mt-2 text-[15.5px] leading-[1.55] text-ivory-soft">{post.cta.copy}</p>
                  <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <Link href={post.cta.href} className={btn("ivory", "md", "w-full sm:w-auto")}>
                      {post.cta.label} <Arrow />
                    </Link>
                    <WaBtn2 size="md" className="w-full sm:w-auto" href={waLink(post.cta.message)} />
                    <CallBtn2 size="md" className="w-full sm:w-auto" />
                  </div>
                </section>
              </div>
            </div>
          </div>
        </article>

        <section aria-labelledby="related-articles" className="border-t border-line pb-16 pt-10 lg:pb-20">
          <div className="shell">
            <div className="mx-auto max-w-[1040px]">
              <h2 id="related-articles" className="font-display text-[clamp(1.7rem,3vw,2.1rem)] font-semibold leading-tight">
                Related articles
              </h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <ArticleCard key={item.slug} post={toCard(item)} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
