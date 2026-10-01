import type { Variants } from "motion/react";

/**
 * The offer card's entrance, shared by every variant of it.
 *
 * Lives on its own so the card and its Classic variant can both use it without
 * importing each other. Nothing here changed when the variants were split out.
 */
const EASE = [0.22, 1, 0.36, 1] as const;

/* Same entrance order as Offer Page 1: card lands, photo settles, then name, price, list, CTAs */
export const card2Variants: Variants = {
  hidden: { opacity: 0.001, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, staggerChildren: 0.09, delayChildren: 0.06 } },
};

export const settle: Variants = { hidden: { scale: 1.1 }, show: { scale: 1, transition: { duration: 1.4, ease: EASE } } };

export const rise: Variants = {
  hidden: { opacity: 0.001, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};
