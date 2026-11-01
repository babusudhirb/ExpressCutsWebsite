import { OFFERS } from "./offers";
import { POPULAR_SERVICES } from "./popular";
import type { Faq } from "./faq";

/**
 * Our Story page content. Everything here is either supplied by the owner or read
 * from the existing site data — no invented founder, milestones, prices, hygiene
 * claims or parking information.
 */

const img = (name: string) => `/images/our-story/${name}.webp`;

export const STORY_HERO = {
  src: img("express-cuts-salon-interior-kr-puram"),
  width: 1448,
  height: 1086,
  alt: "Inside Express Cuts Unisex Salon in Ayyappa Nagar, KR Puram — styling chairs, mirrors and the reception desk",
};

export const STORY_BODY =
  "Express Cuts Unisex Salon was established in 2021 with a simple idea: men's grooming should be professional, approachable and easy to make part of everyday life. From a fresh haircut and beard trim to facial treatments, hair spa, hair color and complete grooming, Express Cuts brings multiple grooming services together under one roof in KR Puram, Bengaluru.";

export const STORY_IMAGE = {
  src: img("express-cuts-salon-styling-stations-kr-puram"),
  width: 900,
  height: 664,
  alt: "Styling stations and mirrors at Express Cuts Unisex Salon in Krishnarajapuram, Bengaluru",
};

/** Owner-supplied milestones only — nothing else is invented */
export const JOURNEY = [
  { year: "2021", lines: ["Established in Ayyappa Nagar, KR Puram"] },
  { year: "Today", lines: ["10,000+ Men Served", "990+ Google Reviews"] },
];

export const PROOF = [
  { value: "2021", label: "Established" },
  { value: "10,000+", label: "Men Served" },
  { value: "4.7", label: "Google Rating" },
  { value: "990+", label: "Google Reviews" },
  { value: "KR Puram · Bengaluru", label: "Our Home", wide: true },
];

/** Cards link to the dedicated service pages that already exist */
export const STORY_SERVICES = [
  {
    id: "hair",
    kicker: "Hair",
    title: "Men's Haircuts & Styling",
    href: "/hair",
    src: img("mens-haircut-side-part-styling"),
    alt: "Men's haircut and hair styling",
    position: "50% 30%",
  },
  {
    id: "beard",
    kicker: "Beard",
    title: "Men's Beard Grooming",
    href: "/beard",
    src: img("mens-beard-grooming-service"),
    alt: "Men's beard grooming with a trimmer",
    position: "50% 28%",
  },
  {
    id: "facial",
    kicker: "Facial",
    title: "Men's Facial & Skin Care",
    href: "/facial",
    src: img("mens-facial-treatment"),
    alt: "Men's facial treatment",
    position: "50% 42%",
  },
  {
    id: "hair-spa",
    kicker: "Hair Spa",
    title: "Men's Hair Spa & Hair Treatments",
    href: "/hair-spa",
    src: img("mens-hair-spa-wash"),
    alt: "Men's hair spa and hair treatment",
    position: "42% 45%",
  },
  {
    id: "hair-color",
    kicker: "Hair Color",
    title: "Men's Hair Color & Highlights",
    href: "/hair-color",
    src: img("mens-grey-hair-coverage"),
    alt: "Man with silver-grey coloured hair",
    position: "50% 22%",
  },
  {
    id: "offers",
    kicker: "Offers",
    title: "Men's Grooming Offers",
    href: "/offers",
    src: img("mens-haircut-in-progress"),
    alt: "Men's haircut in progress",
    position: "42% 40%",
  },
];

/** Prices come from the owner's offer data, never from this file */
const haircut = POPULAR_SERVICES.find((p) => p.id === "haircut");
const classic = OFFERS.find((o) => o.id === "classic");
export const OFFERS_LINE = `Haircut from ₹${haircut?.price.offer ?? 99} · Combos from ₹${classic?.offerPrice ?? 249}`;

export const VISIT_STEPS = [
  { n: "01", title: "Walk In or WhatsApp", note: "Drop in or message us to check availability." },
  { n: "02", title: "Tell Us Your Look", note: "Share what you want and let our service team guide you." },
  { n: "03", title: "Service at a Clean Station", note: "Enjoy your grooming experience in a clean, comfortable space." },
  { n: "04", title: "Finish & Style Check", note: "Leave feeling groomed, refreshed and ready." },
];

/** Only the hygiene statements the owner approved */
export const HYGIENE = [
  "Sanitised tools for every client",
  "Fresh towel every time",
  "Fresh blade for every shave",
  "Clean & hygienic stations",
];

/** Owner-confirmed product brands, set as wordmarks — no logo files are invented */
export const BRANDS = ["L'Oréal", "Schwarzkopf", "Streax", "VLCC", "Tenax"];

/** The five real photographs of the salon (the design reference file is never shipped) */
export const GALLERY = [
  {
    src: img("express-cuts-salon-exterior-kr-puram"),
    alt: "Express Cuts Unisex Salon storefront lit up at night on Ayyappa Nagar Main Rd, KR Puram",
    width: 900,
    height: 405,
  },
  {
    src: img("express-cuts-salon-reception-ayyappa-nagar"),
    alt: "Reception desk inside Express Cuts Unisex Salon in Krishnarajapuram, Bengaluru",
    width: 900,
    height: 1080,
  },
  {
    src: img("express-cuts-salon-styling-floor-kr-puram"),
    alt: "Styling chairs and product shelves on the salon floor at Express Cuts, KR Puram",
    width: 900,
    height: 675,
  },
  {
    src: img("express-cuts-salon-wash-area-kr-puram"),
    alt: "Hair wash station and grooming area at Express Cuts Unisex Salon near Hoodi",
    width: 900,
    height: 675,
  },
  {
    src: img("express-cuts-salon-styling-stations-kr-puram"),
    alt: "Row of mirrors and grooming stations at Express Cuts Unisex Salon, Bengaluru",
    width: 900,
    height: 664,
  },
];

/** The three reviewers the owner asked for; their text is read verbatim from reviews.ts */
export const STORY_REVIEWERS = ["Kiran Kumar", "Darshancn Darshan", "Vinay K"];

export const STORY_FAQS: Faq[] = [
  {
    q: "Is Express Cuts only for men?",
    a: ["Express Cuts is a unisex salon and provides men's grooming services."],
  },
  {
    q: "Do I need an appointment?",
    a: ["Walk-ins are welcome; customers can also contact the salon by phone or WhatsApp."],
  },
  {
    q: "Where exactly are you in KR Puram?",
    a: ["25/2, Ayyappa Nagar Main Rd, Priyadarshini Layout, Krishnarajapuram, Bengaluru, Karnataka 560037."],
  },
  {
    /* No parking information is confirmed for the business, so none is stated */
    q: "Is parking available?",
    a: ["Please contact the salon for current parking information."],
  },
];
