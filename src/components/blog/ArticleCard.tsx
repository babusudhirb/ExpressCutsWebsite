import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import type { PostCard } from "@/data/blog-posts";
import { cn } from "@/lib/cn";
import { Arrow } from "@/components/ui/button";

const PILL = "inline-flex items-center rounded-full bg-[#f5e3c8] px-3 py-1 text-[12.5px] font-semibold text-ink";

function Meta({ post }: { post: PostCard }) {
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-ink-muted">
      <CalendarDays aria-hidden className="size-4 text-bronze" strokeWidth={1.6} />
      <time dateTime={post.published}>{post.date}</time>
      <span aria-hidden>·</span>
      <span>{post.minutes} min read</span>
    </p>
  );
}

function ReadMore({ post }: { post: PostCard }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group/btn inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-bronze"
    >
      Read More<span className="sr-only">: {post.title}</span> <Arrow />
    </Link>
  );
}

/** A grid card: photograph, category, title, excerpt, date. Also used under an article. */
export function ArticleCard({ post, className }: { post: PostCard; className?: string }) {
  return (
    <article className={cn("flex flex-col rounded-[18px] border border-line bg-white/50 p-2.5", className)}>
      <div className="relative">
        <Link href={`/blog/${post.slug}`} tabIndex={-1} aria-hidden className="relative block aspect-[3/2] overflow-hidden rounded-[13px]">
          <Image
            src={post.image.src}
            alt={post.image.alt}
            fill
            sizes="(min-width: 1280px) 280px, (min-width: 1024px) 26vw, (min-width: 640px) 46vw, 92vw"
            className="object-cover"
            style={{ objectPosition: post.image.position }}
          />
        </Link>
        <span className={cn(PILL, "absolute -bottom-3 left-3")}>{post.categoryLabel}</span>
      </div>
      <div className="flex flex-1 flex-col px-2.5 pb-1 pt-6">
        <h3 className="font-display text-[20px] font-semibold leading-[1.2] tracking-[-0.005em]">
          <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-bronze">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2.5 flex-1 text-[14.5px] leading-[1.5] text-ink-soft">{post.excerpt}</p>
        <div className="mt-3.5">
          <Meta post={post} />
        </div>
        <div className="mt-1">
          <ReadMore post={post} />
        </div>
      </div>
    </article>
  );
}

/** The lead article: photograph on one side, the copy on the other */
export function FeaturedArticle({ post }: { post: PostCard }) {
  return (
    <article className="grid overflow-hidden rounded-[18px] border border-line bg-white/50 sm:grid-cols-[47%_1fr]">
      <Link href={`/blog/${post.slug}`} tabIndex={-1} aria-hidden className="relative block aspect-[3/2] sm:aspect-auto sm:min-h-[280px]">
        <Image
          src={post.image.src}
          alt={post.image.alt}
          fill
          sizes="(min-width: 1024px) 34vw, (min-width: 640px) 47vw, 92vw"
          className="object-cover"
          style={{ objectPosition: post.image.position }}
        />
      </Link>
      <div className="flex flex-col items-start p-5 sm:p-6 xl:p-7">
        <span className={PILL}>{post.categoryLabel}</span>
        <h3 className="mt-3.5 font-display text-[clamp(1.5rem,2.3vw,1.8rem)] font-semibold leading-[1.15] tracking-[-0.01em]">
          <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-bronze">
            {post.title}
          </Link>
        </h3>
        <p className="mt-3 text-[15px] leading-[1.55] text-ink-soft">{post.excerpt}</p>
        <div className="mt-4">
          <Meta post={post} />
        </div>
        <div className="mt-1.5">
          <ReadMore post={post} />
        </div>
      </div>
    </article>
  );
}
