import Image from "next/image";
import { SITE, TEL } from "@/lib/site";
import { cn } from "@/lib/cn";
import { WaBtn2 } from "@/components/offer-card/actions";
import { Arrow } from "@/components/ui/button";
import { WhatsAppMark } from "@/components/ui/WhatsAppMark";

/** The real salon, shown beside Blog and FAQ content, with the two ways to reach it */
export function SalonCard({
  title,
  copy,
  cta,
  href,
  image,
  className,
}: {
  title: React.ReactNode;
  copy: string;
  cta: string;
  href: string;
  image: { src: string; alt: string };
  className?: string;
}) {
  return (
    <aside className={cn("overflow-hidden rounded-[18px] border border-line bg-white/60", className)}>
      <div className="relative aspect-[3/2] w-full">
        <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 320px, 92vw" className="object-cover" />
      </div>
      <div className="p-5">
        <h2 className="font-display text-[23px] font-semibold leading-[1.15] tracking-[-0.01em]">{title}</h2>
        <p className="mt-2.5 text-[14.5px] leading-[1.5] text-ink-soft">{copy}</p>
        <WaBtn2
          size="lg"
          className="mt-4 w-full gap-2 px-4 text-[12.5px] tracking-[0.05em]"
          href={href}
          icon={<WhatsAppMark className="size-[19px]" />}
          label={
            <>
              {cta}
              <Arrow className="size-[15px]" />
            </>
          }
        />
        <p className="mt-3 text-center text-[14px] text-ink-soft">
          or call{" "}
          <a href={TEL} className="font-semibold text-ink underline-offset-4 hover:underline">
            {SITE.phoneDisplay}
          </a>
        </p>
      </div>
    </aside>
  );
}
