"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { POSTER_CTA_X, inr2, priceLabel2, waFor2 } from "@/data/offers-2";
import { TEL } from "@/lib/site";
import { card2Variants } from "./motion";
import type { OfferCardItem } from "./OfferCard2";

/**
 * An offer whose card is finished artwork.
 *
 * The design is the supplied 2:3 poster, shown exactly as drawn — nothing here
 * restates it in markup, and the frame carries no background, border, padding or
 * shadow of its own that could show around it. The card keeps the entrance and
 * the `aria-labelledby` the built cards use, so the tracks around it behave the
 * same.
 *
 * Two things sit on top of the picture:
 *
 * - the offer's name, price and inclusions as screen-reader text, because the
 *   artwork's own words are pixels and would otherwise leave the page entirely;
 * - a transparent hit area over each painted button. Their position comes from
 *   the data (measured from each file, since the button row is not at the same
 *   height in every design), and both carry `data-local-cta` so the floating
 *   bottom bar still steps aside for them.
 */

/**
 * The pressable part of a poster card.
 *
 * The buttons are painted into the artwork, so a transparent overlay alone has
 * nothing to animate. Each hit area therefore carries a pixel-aligned copy of
 * its own button, clipped to the pill, and it is the whole hit area that scales:
 * the copy is then larger than the original beneath it, which is what keeps the
 * painted button from showing around the edge. Scale only, no lift — a lift of
 * even a couple of pixels would expose the original along the bottom.
 */
const CTA =
  "group absolute overflow-hidden rounded-full outline-offset-4 " +
  "transition-[transform,box-shadow] duration-200 ease-out will-change-transform " +
  "hover:scale-[1.03] hover:shadow-[0_8px_20px_-8px_rgb(26_22_18/0.55)] " +
  "focus-visible:scale-[1.03] focus-visible:shadow-[0_8px_20px_-8px_rgb(26_22_18/0.55)] " +
  "active:scale-[1.01] motion-reduce:transition-none motion-reduce:hover:scale-100 " +
  "motion-reduce:focus-visible:scale-100 motion-reduce:active:scale-100";

/**
 * That button, cut out of the card artwork. Same `src` and same `sizes` as the
 * card itself, so Next resolves it to the file the card has already loaded and
 * the browser serves it from cache rather than fetching a second picture.
 */
function ButtonFace({
  art,
  sizes,
  left,
  right,
  top,
  bottom,
}: {
  art: string;
  sizes: string;
  left: number;
  right: number;
  top: number;
  bottom: number;
}) {
  const w = right - left;
  const h = bottom - top;
  return (
    <span aria-hidden className="absolute inset-0 overflow-hidden">
      {/* blown up to the whole card, then slid so only this button is in view */}
      <span
        className="absolute"
        style={{
          width: `${(100 / w).toFixed(3)}%`,
          height: `${(100 / h).toFixed(3)}%`,
          left: `${((-left / w) * 100).toFixed(3)}%`,
          top: `${((-top / h) * 100).toFixed(3)}%`,
        }}
      >
        <Image src={art} alt="" fill sizes={sizes} className="object-cover" />
      </span>
    </span>
  );
}

export function PosterCard2({
  offer,
  sizes = "(min-width: 1024px) 460px, 88vw",
}: {
  offer: OfferCardItem;
  sizes?: string;
}) {
  const art = offer.poster;
  if (!art) return null;

  const { callLeft, callRight, waLeft, waRight } = POSTER_CTA_X;
  const pct = (n: number) => `${(n * 100).toFixed(3)}%`;
  /* The painted button, as a box over the picture */
  const hit = (left: number, right: number) => ({
    left: pct(left),
    width: pct(right - left),
    top: pct(art.ctaTop),
    height: pct(art.ctaBottom - art.ctaTop),
  });

  return (
    <motion.article
      variants={card2Variants}
      aria-labelledby={`o2-${offer.id}`}
      /* Width-driven, so the 2:3 of the artwork is what sets the height. The cap
         is the tallest a card may be before a pinned band would have to clip it;
         it only ever binds on the one full-width band, and capping the width
         (rather than the height) is what keeps the picture from being squashed. */
      className="relative mx-auto aspect-[2/3] h-auto w-full max-w-[min(100%,calc((100svh-var(--nav-h)-58px)/1.5))] overflow-hidden rounded-[12px]"
    >
      <Image
        src={art.src}
        alt=""
        fill
        loading="lazy"
        sizes={sizes}
        className="object-cover"
        /* The frame and the artwork are both 2:3, so nothing is cropped or stretched */
      />

      <span id={`o2-${offer.id}`} className="sr-only">
        {offer.name} — {priceLabel2(offer)}
        {offer.wasPrice ? `, regular price ${inr2(offer.wasPrice)}` : ""}
        {offer.includes?.length ? `. Includes ${offer.includes.join(", ")}.` : "."}
      </span>

      <a
        href={TEL}
        data-local-cta
        aria-label={`Call Express Cuts about the ${offer.name}`}
        className={CTA}
        style={hit(callLeft, callRight)}
      >
        <ButtonFace art={art.src} sizes={sizes} left={callLeft} right={callRight} top={art.ctaTop} bottom={art.ctaBottom} />
      </a>
      <a
        href={waFor2(offer)}
        data-local-cta
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Message Express Cuts on WhatsApp about the ${offer.name}`}
        className={CTA}
        style={hit(waLeft, waRight)}
      >
        <ButtonFace art={art.src} sizes={sizes} left={waLeft} right={waRight} top={art.ctaTop} bottom={art.ctaBottom} />
      </a>
    </motion.article>
  );
}
