"use client";

import { useMemo, useState } from "react";
import { BookOpen, Brush, ChevronDown, Flower2, Palette, Scissors, ScanFace, Search, Star, Store } from "lucide-react";
import type { BlogCategoryId, PostCard } from "@/data/blog-posts";
import { waLink } from "@/lib/site";
import { cn } from "@/lib/cn";
import { SalonCard } from "@/components/ui/SalonCard";
import { ArticleCard, FeaturedArticle } from "./ArticleCard";

type Filter = BlogCategoryId | "all";

const ICONS: Record<Filter, typeof Scissors> = {
  all: BookOpen,
  haircut: Scissors,
  beard: Brush,
  facial: ScanFace,
  "hair-spa": Flower2,
  "hair-color": Palette,
  tips: Star,
  salon: Store,
};

/** Curly apostrophes come from phone keyboards; the articles use straight ones */
const words = (query: string) => query.toLowerCase().replace(/[’‘]/g, "'").split(/\s+/).filter(Boolean);

/**
 * Latest Articles with its working search and category filter. The server renders
 * every card into the HTML; only the narrowing happens in the browser. While a
 * filter is on, the lead layout steps aside so the results read as one list.
 */
export function BlogExplorer({
  posts,
  categories,
  salonImage,
}: {
  posts: PostCard[];
  categories: { id: BlogCategoryId; label: string }[];
  salonImage: { src: string; alt: string };
}) {
  const [category, setCategory] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const terms = words(query);
    return posts.filter(
      (post) => (category === "all" || post.category === category) && terms.every((term) => post.haystack.includes(term)),
    );
  }, [posts, category, query]);

  const filtering = category !== "all" || query.trim() !== "";
  const [lead, ...rest] = results;
  const options: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "All Articles", count: posts.length },
    ...categories.map((c) => ({ ...c, count: posts.filter((post) => post.category === c.id).length })),
  ];
  const reset = () => {
    setCategory("all");
    setQuery("");
  };

  const search = (id: string) => (
    <div className="relative">
      <Search aria-hidden className="absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-ink-muted" strokeWidth={1.7} />
      <label htmlFor={id} className="sr-only">
        Search blog articles
      </label>
      <input
        id={id}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search blog articles..."
        className="h-12 w-full rounded-full border border-line bg-white pl-11 pr-4 text-[16px] text-ink outline-none transition-colors placeholder:text-ink-muted focus:border-bronze lg:text-[14.5px]"
      />
    </div>
  );

  return (
    <div className="shell pb-16 pt-8 lg:pb-24 lg:pt-10">
      <div className="grid gap-x-7 lg:grid-cols-[minmax(0,1fr)_minmax(250px,27%)] xl:gap-x-8">
        <div className="min-w-0">
          <div className="flex items-center gap-4">
            <span aria-hidden className="h-px w-10 bg-champagne" />
            <h2 className="font-display text-[clamp(1.9rem,3vw,2.4rem)] font-semibold leading-tight tracking-[-0.01em]">
              Latest Articles
            </h2>
          </div>

          {/* Below 1024px the sidebar collapses to these two compact controls */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:hidden">
            {search("blog-search-compact")}
            <div className="relative">
              <label htmlFor="blog-category-compact" className="sr-only">
                Filter articles by category
              </label>
              <select
                id="blog-category-compact"
                value={category}
                onChange={(e) => setCategory(e.target.value as Filter)}
                className="h-12 w-full appearance-none rounded-full border border-line bg-white pl-5 pr-11 text-[16px] font-medium text-ink outline-none focus:border-bronze"
              >
                {options.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label} ({o.count})
                  </option>
                ))}
              </select>
              <ChevronDown aria-hidden className="pointer-events-none absolute right-4 top-1/2 size-[18px] -translate-y-1/2" strokeWidth={1.7} />
            </div>
          </div>

          <p role="status" className={cn("text-[14.5px] text-ink-soft", filtering ? "mt-5" : "sr-only")}>
            {results.length === 1 ? "1 article" : `${results.length} articles`} found
            {filtering && results.length > 0 && (
              <button type="button" onClick={reset} className="ml-3 font-semibold text-bronze underline underline-offset-4">
                Clear filters
              </button>
            )}
          </p>

          {results.length === 0 ? (
            <div className="mt-5 rounded-[18px] border border-line bg-white/50 px-6 py-10 text-center">
              <p className="font-display text-[22px] font-semibold">No articles match that search.</p>
              <p className="mt-2 text-[15px] text-ink-soft">Try a different word, or browse every article.</p>
              <button
                type="button"
                onClick={reset}
                className="mt-4 inline-flex min-h-11 items-center font-semibold text-bronze underline underline-offset-4"
              >
                Show all articles
              </button>
            </div>
          ) : filtering ? (
            <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((post) => (
                <ArticleCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <>
              <div className="mt-6">
                <FeaturedArticle post={lead} />
              </div>
              <div className="mt-5 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {rest.map((post) => (
                  <ArticleCard key={post.slug} post={post} />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="mt-10 space-y-6 lg:mt-1">
          <section aria-labelledby="blog-search-title" className="hidden rounded-[18px] border border-line bg-white/50 p-5 lg:block">
            <h2 id="blog-search-title" className="mb-3.5 font-display text-[21px] font-semibold">
              Search Articles
            </h2>
            {search("blog-search")}
          </section>

          <section aria-labelledby="blog-categories-title" className="hidden rounded-[18px] border border-line bg-white/50 p-5 lg:block">
            <h2 id="blog-categories-title" className="mb-2 font-display text-[21px] font-semibold">
              Categories
            </h2>
            <ul>
              {options.map(({ id, label, count }) => {
                const Icon = ICONS[id];
                return (
                  <li key={id} className="border-b border-line/70 last:border-0">
                    <button
                      type="button"
                      aria-pressed={category === id}
                      onClick={() => setCategory(id)}
                      className={cn(
                        "flex min-h-11 w-full items-center gap-3 rounded-lg py-1.5 text-left text-[14.5px] transition-colors hover:text-bronze",
                        category === id ? "font-semibold text-bronze" : "text-ink",
                      )}
                    >
                      <Icon aria-hidden className="size-[19px] shrink-0 text-bronze" strokeWidth={1.5} />
                      <span className="flex-1">{label}</span>
                      <span className="tabular text-[13px] text-ink-muted">({count})</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          <SalonCard
            title={
              <>
                Visit Express Cuts
                <br />
                in KR Puram
              </>
            }
            copy="Professional haircuts, beard and grooming for a better you."
            cta="Book on WhatsApp"
            href={waLink("Hi, I'd like to book a slot at Express Cuts.")}
            image={salonImage}
          />
        </div>
      </div>
    </div>
  );
}
