import { ArrowRight, CalendarDays, PersonStanding, ShieldCheck } from "lucide-react";
import { SITE, TEL, waLink } from "@/lib/site";
import { GOOGLE_RATING, GOOGLE_REVIEWS_URL } from "@/data/reviews";
import { cn } from "@/lib/cn";
import { MediaImage } from "@/components/ui/MediaImage";
import { Stars } from "@/components/ui/Stars";
import { OpenStatus } from "./OpenStatus";
import { WaBtn2 } from "@/components/offer-card/actions";

const d = (ms: number) => ({ "--d": ms }) as React.CSSProperties;

const TRUST = [
  { icon: ShieldCheck, label: "Hygienic & Safe" },
  { icon: PersonStanding, label: "Walk-ins Welcome" },
  { icon: CalendarDays, label: `Since ${SITE.established}` },
];

function WhatsAppMark({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

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
          alt="Inside Express Cuts Men's Salon in KR Puram — styling chairs, product shelves and the reception desk"
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
