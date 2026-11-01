import Link from "next/link";
import { ChevronDown } from "lucide-react";

type Heading = { id: string; text: string };

function Links({ headings }: { headings: Heading[] }) {
  return (
    <ol className="space-y-0.5">
      {headings.map((h) => (
        <li key={h.id}>
          {/* Through the router: a bare #link leaves a history entry that breaks Back */}
          <Link href={`#${h.id}`} className="block py-1.5 text-[14px] leading-snug text-ink-soft transition-colors hover:text-bronze">
            {h.text}
          </Link>
        </li>
      ))}
    </ol>
  );
}

/** Collapsible on phones (a native <details>, so it needs no script); sticky from 1024px */
export function ArticleTableOfContents({ headings }: { headings: Heading[] }) {
  return (
    <>
      <details className="group rounded-[14px] border border-line bg-white/50 lg:hidden">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between px-4 text-[15px] font-semibold [&::-webkit-details-marker]:hidden">
          In this article
          <ChevronDown aria-hidden className="size-5 transition-transform group-open:rotate-180" strokeWidth={1.7} />
        </summary>
        <nav aria-label="Article contents" className="border-t border-line px-4 py-2.5">
          <Links headings={headings} />
        </nav>
      </details>

      <nav
        aria-label="Article contents"
        className="sticky top-[calc(var(--nav-h)+24px)] hidden max-h-[calc(100svh-var(--nav-h)-48px)] overflow-y-auto lg:block"
      >
        <p className="eyebrow mb-3 text-ink-muted">In this article</p>
        <Links headings={headings} />
      </nav>
    </>
  );
}
