"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Crown, MessageCircle, Phone, Scissors } from "lucide-react";
import { inr2, waFor2 } from "@/data/offers-2";
import { TEL } from "@/lib/site";
import { cn } from "@/lib/cn";
import { BROWN, GREEN } from "./actions";
import { card2Variants, rise, settle } from "./motion";
import type { OfferCardItem } from "./OfferCard2";

/**
 * The offers drawn as a full advertising panel — Classic Combo and Premium Combo.
 *
 * Every other offer keeps the standard card; this variant exists because these
 * two were art-directed separately (see the approved references). Both are
 * rendered from `OfferCard2`, so the homepage track and the offers page get the
 * same card from one place and can never drift, and the two panels share one
 * implementation so they cannot drift from each other either.
 *
 * What differs per offer lives in PANEL below: the pair of button labels and
 * which set of service glyphs to draw. Classic's glyphs are its own approved
 * set; Premium's are drawn from its own supplied icon reference.
 *
 * The outer frame — size, radius, padding, shadow, stretch — is deliberately
 * identical to the standard card. Only what sits inside it differs, and the
 * photograph is shorter here (a 1.55:1 crop rather than 4:3) by exactly as much
 * as the taller type below it needs, so the card's own height is unchanged and
 * the pinned band's photo cap still measures the same tallest card.
 *
 * Sizes are `cqw` — a share of the card's own width — so the reference's
 * proportions hold at every card size the track produces, with clamps at both
 * ends: the lower one for the narrowest cards, the upper one so a full-width
 * single-card band cannot grow the card past the height it has today.
 */

/* Reference proportions, as a share of the card's width */
const TITLE = "text-[clamp(27px,12.4cqw,36px)]";
const PRICE = "text-[clamp(31px,14cqw,40px)]";
const SMALL = "text-[clamp(12px,5.3cqw,16px)]";
const LABEL = "text-[clamp(10px,3.9cqw,13px)]";
const LABEL_4 = "text-[clamp(8.5px,3.1cqw,12px)]";
const BUBBLE = "size-[clamp(25px,10.1cqw,28px)]";
const BUTTON =
  "inline-flex min-w-0 select-none items-center justify-center gap-[1.8cqw] rounded-full text-center " +
  "h-[clamp(38px,15cqw,44px)] text-[clamp(11px,5cqw,15px)] font-semibold uppercase leading-[1.05] tracking-[0.06em] " +
  "transition-[filter,transform] duration-300 hover:brightness-[1.07] active:scale-[0.98]";

/**
 * The beard and the head massage have no glyph in the icon set, so they are
 * drawn here — the same way the offers page footer draws its brand marks.
 * The massage glyph reuses the set's own hand path, flipped so it presses down.
 */
function BeardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="size-[66%]"
    >
      {/* the beard: down the jaw on both sides to a rounded chin */}
      <path strokeWidth="2.7" d="M7.3 7.9c0 5.3 1.7 8.4 4.7 10.5 3-2.1 4.7-5.2 4.7-10.5" />
      {/* the moustache, its wings sweeping out and down */}
      <path strokeWidth="2.4" d="M12 4.9c-1.1-1.2-2.4-1.4-3.9-.7M12 4.9c1.1-1.2 2.4-1.4 3.9-.7" />
    </svg>
  );
}

function MassageIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-[68%]">
      {/* the head */}
      <circle cx="12" cy="17.4" r="5.5" fill="currentColor" />
      {/* a hand working over it — the icon set's own hand, flipped to press down */}
      <g
        transform="translate(3.7 13.6) scale(0.54 -0.54)"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
        <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
        <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
        <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
      </g>
    </svg>
  );
}

function ClassicServiceIcon({ label }: { label: string }) {
  const key = label.toLowerCase();
  if (key.includes("beard")) return <BeardIcon />;
  if (key.includes("massage")) return <MassageIcon />;
  return <Scissors aria-hidden className="size-[54%]" strokeWidth={2.1} />;
}

/* ── Premium's set, traced from its own icon reference ───────────────────── */

const STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** The head in profile, shared by the massage and de-tan glyphs */
const HEAD =
  "M12.4 3.2c3.5 0 6.3 2.8 6.3 6.2 0 1.6-.3 2.7-1 3.9-.4.7-.6 1.3-.6 2.1v1.2h-1.5v3.9H9.4v-2.8H7.7c-.7 0-1.1-.5-1.1-1.1v-2.2l-1.6-.5c-.5-.2-.7-.8-.4-1.2l1.6-2.1c.3-.4.5-.9.5-1.4C6.9 5.9 9.3 3.2 12.4 3.2Z";

function PremiumScissors() {
  return (
    <svg viewBox="0 0 24 24" {...STROKE} strokeWidth="1.9" aria-hidden className="size-[62%]">
      <path d="M7.4 3.3 16 15.9" />
      <path d="M16.6 3.3 8 15.9" />
      <circle cx="6.5" cy="18.6" r="2.5" />
      <circle cx="17.5" cy="18.6" r="2.5" />
    </svg>
  );
}

function PremiumBeard() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-[62%]">
      <path
        fill="currentColor"
        d="M6.5 3.5c-.9-.3-1.8.4-1.65 1.4.35 2.4.5 4.5.75 6.3.5 3.4 2 6.1 4.3 8.1 1.2 1.05 3 1.05 4.2 0 2.3-2 3.8-4.7 4.3-8.1.25-1.8.4-3.9.75-6.3.15-1-.75-1.7-1.65-1.4-1.3.5-2.2 1.7-2.7 3.6-.2.7-.35 1.5-.5 2.3-.6-.55-1.4-.85-2.3-.85s-1.7.3-2.3.85c-.15-.8-.3-1.6-.5-2.3-.5-1.9-1.4-3.1-2.7-3.6Z"
      />
      <rect x="9.7" y="11.4" width="4.6" height="1.8" rx=".9" fill="#f2e3c9" />
    </svg>
  );
}

function PremiumMassage() {
  return (
    <svg viewBox="0 0 24 24" {...STROKE} strokeWidth="1.7" aria-hidden className="size-[62%]">
      <path d={HEAD} />
      <path d="M11.6 9.6c-.7-1.3-.3-2.9 1.1-4 1.9-1.5 4.5-1.6 5.9-.2.9.9 1 2.3.3 3.4" />
      <path d="M13.6 5.2 12.4 8M16 4.5l-.7 3M18.2 5.4l-.9 2.6" />
    </svg>
  );
}

function PremiumDetan() {
  return (
    <svg viewBox="0 0 24 24" {...STROKE} strokeWidth="1.7" aria-hidden className="size-[62%]">
      <path d={HEAD} />
      <path d="M8.8 5.6c2.6.5 4.8 2 6.4 4.4" />
      <path
        fill="currentColor"
        stroke="none"
        d="M20.4 14.3c.25 1.35.9 2 2.25 2.25-1.35.25-2 .9-2.25 2.25-.25-1.35-.9-2-2.25-2.25 1.35-.25 2-.9 2.25-2.25Z"
      />
    </svg>
  );
}

function PremiumServiceIcon({ label }: { label: string }) {
  const key = label.toLowerCase();
  if (key.includes("beard")) return <PremiumBeard />;
  if (key.includes("massage")) return <PremiumMassage />;
  if (key.includes("tan")) return <PremiumDetan />;
  return <PremiumScissors />;
}

/** What each panelled offer draws differently */
const PANEL = {
  classic: { call: "Call", wa: "Book Now", Icon: ClassicServiceIcon },
  premium: { call: "Call Now", wa: "WhatsApp Now", Icon: PremiumServiceIcon },
} as const;

export type PanelOfferId = keyof typeof PANEL;
export const isPanelOffer = (id: string): id is PanelOfferId => id in PANEL;

/** "Classic Combo" → a dark first half and a gold last word, as the reference draws it */
function splitName(name: string) {
  const words = name.trim().split(/\s+/);
  if (words.length < 2) return [name, ""] as const;
  return [words.slice(0, -1).join(" "), words[words.length - 1]] as const;
}

export function PanelCard2({
  offer,
  sizes = "(min-width: 1024px) 460px, 88vw",
  mediaCap = "lg",
}: {
  offer: OfferCardItem;
  sizes?: string;
  mediaCap?: "lg" | "all";
}) {
  const { call, wa, Icon } = PANEL[offer.id as PanelOfferId];
  const [head, tail] = splitName(offer.name);
  const saving = offer.wasPrice ? offer.wasPrice - offer.price : 0;
  const services = offer.includes ?? [];
  /* Four columns leave each label a narrower box, so the type steps down to keep
     "Head massage" on one line at the card widths the track produces */
  const label = services.length > 3 ? LABEL_4 : LABEL;

  return (
    <motion.article
      variants={card2Variants}
      aria-labelledby={`o2-${offer.id}`}
      className="@container flex h-full flex-col rounded-[12px] bg-white p-3 font-[family-name:var(--font-o2-sans)] shadow-[0_18px_34px_-22px_rgb(0_0_0/0.6)]"
    >
      <div
        className={cn(
          "relative aspect-[1.55/1] w-full shrink-0 overflow-hidden rounded-[9px] bg-[#1a1612]",
          /* the one full-width single-card band: a touch wider, so the card
             keeps the exact height it has today even at that size */
          "@min-[600px]:aspect-[1.58/1]",
          mediaCap === "all"
            ? "max-h-[var(--offer2-img-max,none)]"
            : "max-lg:max-h-none lg:max-h-[var(--offer2-img-max,280px)]",
        )}
      >
        <motion.div variants={settle} className="absolute inset-0">
          <Image
            src={offer.image}
            alt={offer.alt}
            fill
            loading="lazy"
            sizes={sizes}
            className="object-cover"
            style={{
              objectPosition: offer.position,
              transform: offer.scale ? `scale(${offer.scale})` : undefined,
              transformOrigin: offer.origin,
            }}
          />
        </motion.div>

        {offer.number && (
          <span className="tabular absolute left-[2.6cqw] top-[2.6cqw] rounded-[6px] bg-[#1a1612]/90 px-[2.2cqw] py-[1.3cqw] text-[clamp(9px,2.7cqw,12px)] font-bold uppercase tracking-[0.06em] text-[#e6c79a] backdrop-blur-[2px]">
            {offer.number}
          </span>
        )}

        {offer.badge && (
          <span className="absolute right-[2.6cqw] top-[2.6cqw] inline-flex items-center gap-[1.4cqw] rounded-full border border-[#c9a15c] bg-[#1a1612]/92 px-[3cqw] py-[1.5cqw] text-[clamp(8px,2.8cqw,12px)] font-bold uppercase tracking-[0.1em] text-[#f0dcb8] backdrop-blur-[2px]">
            <Crown aria-hidden className="size-[clamp(10px,3.4cqw,15px)] text-[#e3bd7e]" fill="currentColor" strokeWidth={1.4} />
            {offer.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-[1cqw]">
        <motion.h3
          variants={rise}
          id={`o2-${offer.id}`}
          className={cn(
            TITLE,
            "mt-[3.6cqw] font-[family-name:var(--font-o2-serif)] font-bold leading-[0.92] tracking-[-0.015em] text-[#1a1612]",
          )}
        >
          {head} {tail && <span className="text-[#a9733a]">{tail}</span>}
        </motion.h3>

        <motion.span
          variants={rise}
          aria-hidden
          className="mt-[2.5cqw] h-[2px] w-[16cqw] rounded-full bg-[linear-gradient(90deg,#b98736,#e8cb9b)]"
        />

        <motion.p variants={rise} className="mt-[2.6cqw] flex flex-wrap items-center gap-x-[2.6cqw] gap-y-[1.6cqw]">
          <span className="sr-only">Offer price</span>
          <span aria-hidden className={cn(SMALL, "font-semibold uppercase tracking-[0.06em] text-[#6b4a28]")}>
            Only
          </span>
          <span className={cn(PRICE, "tabular font-extrabold leading-[0.78] tracking-[-0.035em] text-[#d91f1f]")}>
            {inr2(offer.price)}
          </span>
          {offer.wasPrice && (
            <>
              <span aria-hidden className="h-[7cqw] max-h-[30px] w-px bg-[#ddd2c4]" />
              <span className="sr-only">, regular price</span>
              <s className={cn(SMALL, "tabular font-medium text-[#8d847b] decoration-[#8d847b]")}>{inr2(offer.wasPrice)}</s>
              <span
                className={cn(
                  LABEL,
                  "tabular whitespace-nowrap rounded-full border border-[#e0bd79] bg-[linear-gradient(180deg,#f8e6c2,#efd39c)] px-[3.4cqw] py-[1.8cqw] font-bold uppercase tracking-[0.04em] text-[#6b4a28]",
                )}
              >
                Save {inr2(saving)}
              </span>
            </>
          )}
        </motion.p>

        {services.length > 0 && (
          <motion.ul
            variants={rise}
            className="mt-auto grid rounded-[2.6cqw] bg-[#faf3e8] px-[1.6cqw] py-[2.4cqw]"
            style={{ gridTemplateColumns: `repeat(${services.length}, minmax(0, 1fr))` }}
          >
            {services.map((item, i) => (
              <li
                key={item}
                className={cn(
                  "flex flex-col items-center gap-[1.5cqw] px-[0.8cqw] text-center",
                  i > 0 && "border-l border-[#ecdcc3]",
                )}
              >
                <span className={cn(BUBBLE, "grid shrink-0 place-items-center rounded-full bg-[#f2e3c9] text-[#8a5a24]")}>
                  <Icon label={item} />
                </span>
                <span className={cn(label, "font-semibold leading-tight text-[#3a3128]")}>{item}</span>
              </li>
            ))}
          </motion.ul>
        )}

        <motion.div variants={rise} className="mt-auto grid grid-cols-2 gap-[2.4cqw] pt-[2.4cqw]">
          <a
            href={TEL}
            data-local-cta
            aria-label={`Call Express Cuts about the ${offer.name}`}
            className={cn(BUTTON, BROWN)}
          >
            <Phone aria-hidden className="size-[clamp(13px,4.6cqw,19px)] shrink-0" strokeWidth={2} />
            {call}
          </a>
          <a
            href={waFor2(offer)}
            data-local-cta
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Message Express Cuts on WhatsApp about the ${offer.name}`}
            className={cn(BUTTON, GREEN)}
          >
            <MessageCircle aria-hidden className="size-[clamp(13px,4.6cqw,19px)] shrink-0" strokeWidth={2} />
            {wa}
          </a>
        </motion.div>
      </div>
    </motion.article>
  );
}
