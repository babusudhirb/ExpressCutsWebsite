"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import {
  Brush,
  CalendarDays,
  ChevronDown,
  Flower2,
  House,
  LayoutGrid,
  MapPin,
  Palette,
  ScanFace,
  Scissors,
  Search,
  Tag,
  Undo2,
} from "lucide-react";
import type { FaqCategoryId, FaqItem } from "@/data/faq-page";
import { waLink } from "@/lib/site";
import { cn } from "@/lib/cn";
import { WaBtn2 } from "@/components/offer-card/actions";
import { RichText } from "@/components/ui/RichText";
import { SalonCard } from "@/components/ui/SalonCard";
import { WhatsAppMark } from "@/components/ui/WhatsAppMark";

type Filter = FaqCategoryId | "all";
/** An item plus the lower-cased text search runs against */
export type FaqEntry = FaqItem & { haystack: string };

const ICONS: Record<Filter, typeof House> = {
  all: LayoutGrid,
  general: House,
  booking: CalendarDays,
  haircut: Scissors,
  beard: Brush,
  facial: ScanFace,
  "hair-spa": Flower2,
  "hair-color": Palette,
  offers: Tag,
  visit: MapPin,
};

const words = (query: string) => query.toLowerCase().replace(/[’‘]/g, "'").split(/\s+/).filter(Boolean);
const ANCHOR = "scroll-mt-[calc(var(--nav-h)+16px)]";

/**
 * Search, category filter and accordion. Every question and answer is in the server
 * HTML inside a native <details>, so all of it opens with a keyboard or with no
 * script at all. Filtering only sets `hidden`; nothing unmounts, so an answer the
 * reader opened stays open. Several answers may be open at once, which is what lets
 * a related question open without the one being read collapsing under the reader.
 */
export function FaqExplorer({
  items,
  categories,
  salonImage,
}: {
  items: FaqEntry[];
  categories: { id: FaqCategoryId; label: string }[];
  salonImage: { src: string; alt: string };
}) {
  const [category, setCategory] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  /* Set after following a related question: where the reader came from */
  const [trail, setTrail] = useState<{ to: string; from: string } | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const matches = useMemo(() => {
    const terms = words(query);
    return new Set(
      items
        .filter((item) => (category === "all" || item.category === category) && terms.every((term) => item.haystack.includes(term)))
        .map((item) => item.id),
    );
  }, [items, category, query]);

  const options: { id: Filter; label: string }[] = [{ id: "all", label: "All Questions" }, ...categories];
  const byId = new Map(items.map((item) => [item.id, item]));
  const searching = query.trim() !== "";

  const reveal = (id: string) => {
    const el = document.getElementById(id);
    if (!(el instanceof HTMLDetailsElement)) return;
    el.open = true;
    el.scrollIntoView({ block: "start" });
  };

  /* A link from an article, or the browser's back button, lands on the answer open */
  useEffect(() => {
    const openFromHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (id) reveal(id);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  const follow = (to: string, from: string) => {
    /* The target may be filtered out: show everything before moving to it */
    flushSync(() => {
      setCategory("all");
      setQuery("");
      setTrail({ to, from });
    });
    reveal(to);
  };

  const choose = (next: Filter) => {
    setCategory(next);
    setTrail(null);
    /* Only pull the list back up when the reader has scrolled past its start */
    const list = listRef.current;
    if (list && list.getBoundingClientRect().top < 0) list.scrollIntoView({ block: "start" });
  };

  return (
    <div className="shell pb-16 pt-8 lg:pb-24 lg:pt-10">
      <div className="grid gap-x-10 lg:grid-cols-[minmax(250px,29%)_minmax(0,1fr)] xl:gap-x-12">
        <div className="order-2 mt-10 space-y-7 lg:order-1 lg:mt-1">
          <nav aria-labelledby="faq-browse" className="hidden lg:block">
            <h2 id="faq-browse" className="mb-3 px-3 font-display text-[24px] font-semibold">
              Browse FAQs
            </h2>
            <ul className="rounded-[16px] border border-line bg-white/50 p-1.5">
              {options.map(({ id, label }) => {
                const Icon = ICONS[id];
                const on = category === id;
                return (
                  <li key={id}>
                    <a
                      /* A real anchor: with no script it still jumps to the group */
                      href={id === "all" ? "#faq-list" : `#group-${id}`}
                      aria-current={on ? "true" : undefined}
                      onClick={(e) => {
                        e.preventDefault();
                        choose(id);
                      }}
                      className={cn(
                        "flex min-h-11 items-center gap-3 rounded-[10px] px-3 py-2 text-[15px] font-medium transition-colors",
                        on ? "bg-[#f5e3c8] text-ink" : "text-ink-soft hover:bg-cream/60 hover:text-ink",
                      )}
                    >
                      <Icon aria-hidden className="size-[19px] shrink-0 text-bronze" strokeWidth={1.5} />
                      {label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <SalonCard
            title="Still have a question?"
            copy="We're here to help. Get in touch with our team directly."
            cta="Chat on WhatsApp"
            href={waLink("Hi, I have a question for Express Cuts.")}
            image={salonImage}
          />
        </div>

        <div className="order-1 min-w-0 lg:order-2">
          <div className="flex items-start gap-4">
            <span aria-hidden className="mt-[1.1em] hidden h-px w-12 shrink-0 bg-champagne sm:block" />
            <div>
              <h2 className="font-display text-[clamp(1.9rem,3.4vw,2.6rem)] font-semibold leading-[1.12] tracking-[-0.01em]">
                Frequently Asked Questions
              </h2>
              <p className="mt-2 text-[16px] text-ink-soft">Find quick answers to common questions about Express Cuts.</p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="relative">
              <Search aria-hidden className="absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-ink-muted" strokeWidth={1.7} />
              <label htmlFor="faq-search" className="sr-only">
                Search the FAQs
              </label>
              <input
                id="faq-search"
                type="search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setTrail(null);
                }}
                placeholder="Search questions..."
                className="h-12 w-full rounded-full border border-line bg-white pl-11 pr-4 text-[16px] text-ink outline-none transition-colors placeholder:text-ink-muted focus:border-bronze"
              />
            </div>
            <div className="relative lg:hidden">
              <label htmlFor="faq-category" className="sr-only">
                Filter questions by category
              </label>
              <select
                id="faq-category"
                value={category}
                onChange={(e) => choose(e.target.value as Filter)}
                className="h-12 w-full appearance-none rounded-full border border-line bg-white pl-5 pr-11 text-[16px] font-medium text-ink outline-none focus:border-bronze"
              >
                {options.map(({ id, label }) => (
                  <option key={id} value={id}>
                    {label}
                  </option>
                ))}
              </select>
              <ChevronDown aria-hidden className="pointer-events-none absolute right-4 top-1/2 size-[18px] -translate-y-1/2" strokeWidth={1.7} />
            </div>
          </div>

          <p role="status" className={cn("text-[14.5px] text-ink-soft", searching ? "mt-4" : "sr-only")}>
            {matches.size === 1 ? "1 matching question" : `${matches.size} matching questions`}
          </p>

          {matches.size === 0 && (
            <div className="mt-5 rounded-[18px] border border-line bg-white/50 px-6 py-9 text-center">
              <p className="font-display text-[22px] font-semibold">No matching questions found</p>
              <p className="mt-2 text-[15px] text-ink-soft">Try another word, or ask the team directly on WhatsApp.</p>
              <WaBtn2
                size="md"
                className="mt-4"
                href={waLink(`Hi, I have a question for Express Cuts${searching ? `: ${query.trim()}` : "."}`)}
                icon={<WhatsAppMark className="size-[18px]" />}
                label="Ask on WhatsApp"
              />
            </div>
          )}

          <div ref={listRef} id="faq-list" className={ANCHOR}>
            {categories.map((group) => {
              const entries = items.filter((item) => item.category === group.id);
              const shown = entries.some((item) => matches.has(item.id));
              return (
                <section key={group.id} id={`group-${group.id}`} aria-labelledby={`title-${group.id}`} hidden={!shown} className={cn(ANCHOR, "mt-7")}>
                  <h3 id={`title-${group.id}`} className="eyebrow mb-3 text-bronze">
                    {group.label}
                  </h3>
                  <div className="space-y-2.5">
                    {entries.map((item, i) => (
                      <details
                        key={item.id}
                        id={item.id}
                        hidden={!matches.has(item.id)}
                        /* The first answer starts open, as in the reference */
                        open={group.id === categories[0].id && i === 0 ? true : undefined}
                        className={cn(ANCHOR, "group rounded-[14px] border border-line bg-white/50 open:bg-white/70")}
                      >
                        <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-[14px] px-4 py-3 font-display text-[18.5px] font-semibold leading-[1.25] transition-colors group-open:bg-cream/50 sm:px-5 sm:text-[20px] [&::-webkit-details-marker]:hidden">
                          {item.q}
                          <ChevronDown aria-hidden className="size-5 shrink-0 text-bronze transition-transform group-open:rotate-180" strokeWidth={1.8} />
                        </summary>

                        <div className="space-y-2.5 px-4 pb-5 pt-3.5 text-[16px] leading-[1.6] text-ink-soft sm:px-5">
                          {item.a.map((paragraph) => (
                            <p key={paragraph}>
                              <RichText text={paragraph} />
                            </p>
                          ))}

                          {trail?.to === item.id && (
                            <button
                              type="button"
                              onClick={() => {
                                const from = trail.from;
                                setTrail(null);
                                reveal(from);
                              }}
                              className="inline-flex min-h-11 items-center gap-2 text-[14.5px] font-semibold text-bronze"
                            >
                              <Undo2 aria-hidden className="size-4" strokeWidth={1.8} />
                              Back to the question you were reading
                            </button>
                          )}

                          <div className="mt-3.5 border-t border-line pt-3">
                            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink-muted">Related questions</p>
                            <ul className="mt-1">
                              {item.related.map((id) => (
                                <li key={id}>
                                  <a
                                    href={`#${id}`}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      follow(id, item.id);
                                    }}
                                    className="inline-flex min-h-10 items-center py-1 text-[15px] font-medium text-bronze underline decoration-bronze/40 underline-offset-[3px] hover:decoration-bronze"
                                  >
                                    {byId.get(id)?.q}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
