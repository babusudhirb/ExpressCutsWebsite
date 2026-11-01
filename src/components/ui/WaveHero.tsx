import Image from "next/image";
import { cn } from "@/lib/cn";

/** The curved edge the Blog and FAQ pages share; its colour comes through currentColor */
export function Wave({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 1440 90" preserveAspectRatio="none" className={cn("block w-full", className)}>
      <path fill="currentColor" d="M0 44C240 2 480 0 720 30s480 46 720 2v58H0z" />
    </svg>
  );
}

/**
 * The dark editorial hero of the Blog and FAQ pages. From 1024px the photograph
 * fills the right two thirds and dissolves into the night ground under the type;
 * below that it leads, full width, with the copy stacked beneath it.
 */
export function WaveHero({
  eyebrow,
  title,
  copy,
  image,
}: {
  eyebrow: string;
  /** One entry per line of the headline */
  title: string[];
  copy: string;
  image: { src: string; alt: string; position: string };
}) {
  return (
    <section
      id="hero"
      aria-labelledby="page-title"
      className="relative isolate overflow-hidden bg-night text-ivory lg:min-h-[400px] xl:min-h-[430px]"
    >
      <div className="relative aspect-[3/2] w-full sm:aspect-[2/1] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[68%]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          loading="eager"
          fetchPriority="high"
          quality={85}
          sizes="(min-width: 1024px) 68vw, 100vw"
          className="object-cover"
          style={{ objectPosition: image.position }}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-transparent lg:bg-gradient-to-r lg:via-night/35 lg:via-35%"
        />
      </div>

      <div className="shell relative z-10 pb-20 pt-3 sm:pb-24 lg:flex lg:min-h-[400px] lg:flex-col lg:justify-center lg:pb-24 lg:pt-10 xl:min-h-[430px]">
        <div className="lg:max-w-[560px]">
          <p className="eyebrow flex items-center gap-3 text-[13px] text-gold">
            <span aria-hidden className="h-px w-8 shrink-0 bg-gold" />
            {eyebrow}
          </p>
          <h1
            id="page-title"
            className="mt-4 font-display text-[clamp(2.05rem,8.7vw,3.6rem)] font-semibold leading-[1.08] tracking-[-0.015em] lg:text-[clamp(2.9rem,4.2vw,3.6rem)]"
          >
            {title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-4 max-w-[46ch] text-[16px] leading-[1.55] text-ivory-soft sm:text-[17px]">{copy}</p>
        </div>
      </div>

      <Wave className="absolute inset-x-0 -bottom-px z-10 h-[34px] text-hero-mobile sm:h-[52px]" />
    </section>
  );
}
