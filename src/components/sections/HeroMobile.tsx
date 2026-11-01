import { ArrowRight, CalendarDays, PersonStanding, ShieldCheck } from "lucide-react";
import { SITE, TEL, waLink } from "@/lib/site";
import { GOOGLE_RATING, GOOGLE_REVIEWS_URL } from "@/data/reviews";
import { cn } from "@/lib/cn";
import { MediaImage } from "@/components/ui/MediaImage";
import { Stars } from "@/components/ui/Stars";
import { OpenStatus } from "./OpenStatus";
import { WaBtn2 } from "@/components/offer-card/actions";
import { WhatsAppMark } from "@/components/ui/WhatsAppMark";

const d = (ms: number) => ({ "--d": ms }) as React.CSSProperties;

const TRUST = [
  { icon: ShieldCheck, label: "Hygienic & Safe" },
  { icon: PersonStanding, label: "Walk-ins Welcome" },
  { icon: CalendarDays, label: `Since ${SITE.established}` },
];

/**
 * Phones and tablets (<1024px) — composed from `mobile view refrence hero.png`.
 * The salon photograph leads, whole and at its own 3:2, directly under the
 * navigation. Its lower edge is already a painted cream wave, so the copy's
 * ground is sampled from that cream and the copy starts on it: photograph and
 * copy read as one surface. The hero ends with the trust row.
 */
export function HeroMobile() {
  return (
    <div className="bg-hero-mobile lg:hidden">
      <div className="relative mt-[var(--nav-h)] aspect-[3/2] w-full">
        <MediaImage
          /* From 1024px the browser picks a blank source: desktop never fetches this photo */
          skip="(min-width: 1024px)"
          src="/images/hero/home-hero-mobile-salon.webp"
          alt="Inside Express Cuts Unisex Salon in KR Puram — styling chairs, product shelves and the reception desk"
          fill
          loading="eager"
          fetchPriority="high"
          quality={85}
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Starts on the photograph's own cream, as the reference does */}
      <div className="shell relative -mt-[8.5vw] pb-5">
        <div className="mx-auto max-w-[560px]">
          <p
            className="hero-rise eyebrow flex items-center gap-3 whitespace-nowrap text-[11px] text-ink-soft min-[390px]:text-[12px]"
            style={d(80)}
          >
            <span aria-hidden className="h-px w-8 shrink-0 bg-champagne" />
            Grooming beyond ordinary
          </p>

          <p
            aria-hidden
            className="mt-3 font-display text-[clamp(2.75rem,12vw,3.5rem)] font-semibold leading-[0.98] tracking-[-0.025em]"
          >
            <span className="hero-line">
              <span style={d(160)}>A Better</span>
            </span>
            <span className="hero-line">
              <span style={d(280)}>
                You <em className="font-medium text-champagne">Everyday.</em>
              </span>
            </span>
          </p>

          <p className="hero-rise mt-3 text-[16.5px] leading-[1.4] text-ink-soft" style={d(420)}>
            Men&rsquo;s haircuts, beard &amp; grooming
            <br />
            in KR Puram, Bengaluru.
          </p>

          <div className="hero-rise mt-5" style={d(520)}>
            <WaBtn2
              size="lg"
              className="w-full gap-2.5 text-[14.5px]"
              href={waLink("Hi, I'd like to book a slot at Express Cuts.")}
              icon={<WhatsAppMark className="size-[22px]" />}
              label={
                <>
                  Book on WhatsApp
                  <ArrowRight aria-hidden className="size-[18px]" strokeWidth={1.8} />
                </>
              }
            />
            <p className="mt-2.5 text-center text-[14.5px] text-ink-soft">
              or call{" "}
              <a
                href={TEL}
                className="font-semibold text-ink underline-offset-4 hover:underline"
              >
                {SITE.phoneDisplay}
              </a>
            </p>
          </div>

          <div className="hero-rise mt-4 flex flex-col items-center gap-1.5" style={d(620)}>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 text-[14px] text-ink-soft underline-offset-4 hover:underline"
            >
              <span className="font-display text-[24px] font-semibold leading-none tracking-[-0.02em] text-ink">
                {GOOGLE_RATING.value.toFixed(1)}
              </span>
              <Stars value={GOOGLE_RATING.value} />
              <span aria-hidden className="h-4 w-px bg-ink/25" />
              <span>
                <span className="tabular font-semibold text-ink">{GOOGLE_RATING.count}</span> Google reviews
              </span>
            </a>
            <OpenStatus variant="plain" />
          </div>

          <ul
            aria-label="Why clients choose Express Cuts"
            className="hero-rise mt-4 grid grid-cols-3 border-t border-line pt-3.5"
            style={d(720)}
          >
            {TRUST.map(({ icon: Icon, label }, i) => (
              <li
                key={label}
                className={cn(
                  "flex flex-col items-center gap-2 px-1 text-center text-[13px] font-medium leading-tight text-ink-soft",
                  i > 0 && "border-l border-line",
                )}
              >
                <Icon aria-hidden className="size-6 text-ink" strokeWidth={1.4} />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
