import { HOURS, SITE, TEL, formatMinutes, waLink } from "@/lib/site";
import { ALL_OFFERS_2, SECTIONS_2, inr2, priceLabel2 } from "@/data/offers-2";
import { plainText } from "@/lib/rich-text";

/**
 * The /faq page. Separate from data/faq.ts, which is the homepage's own list.
 * Business facts are read from site.ts and offers-2.ts, so an answer cannot
 * disagree with the page it describes. Where the project holds no fact (spa
 * duration, parking) the answer sends the reader to the salon instead of guessing.
 * Answers open with the direct reply; strings use the marks in lib/rich-text.ts.
 */

export type FaqCategoryId =
  | "general"
  | "booking"
  | "haircut"
  | "beard"
  | "facial"
  | "hair-spa"
  | "hair-color"
  | "offers"
  | "visit";

export const FAQ_CATEGORIES: { id: FaqCategoryId; label: string }[] = [
  { id: "general", label: "General" },
  { id: "booking", label: "Appointments & Booking" },
  { id: "haircut", label: "Haircut & Styling" },
  { id: "beard", label: "Beard Grooming" },
  { id: "facial", label: "Facial & Skincare" },
  { id: "hair-spa", label: "Hair Spa" },
  { id: "hair-color", label: "Hair Color" },
  { id: "offers", label: "Offers & Packages" },
  { id: "visit", label: "Visit & Location" },
];

export type FaqItem = {
  /** Also the anchor: /faq#<id> */
  id: string;
  category: FaqCategoryId;
  q: string;
  a: string[];
  related: string[];
};

const ADDRESS = SITE.addressLines.join(" ").replace(/,$/, "");
const hours = (i: number) => `${formatMinutes(HOURS[i].open)} to ${formatMinutes(HOURS[i].close)}`;
const WHATSAPP = `[WhatsApp](${waLink("Hi, I have a question for Express Cuts.")})`;
const CALL = `[${SITE.phoneDisplay}](${TEL})`;
const MAPS = `[Google Maps](${SITE.mapsUrl})`;

const offer = (id: string) => {
  const found = ALL_OFFERS_2.find((o) => o.id === id);
  if (!found) throw new Error(`Unknown offer: ${id}`);
  return found;
};
const list = (items: string[]) =>
  items.length > 1 ? `${items.slice(0, -1).join(", ")} and ${items.at(-1)}` : items[0];
const includes = (id: string) => list(offer(id).includes.map((item, i) => (i ? item.toLowerCase() : item)));
const priced = (id: string) => `${offer(id).name} (${priceLabel2(offer(id))})`;
const combos = SECTIONS_2.flatMap((s) => s.offers).filter((o) => /Combo|Ritual/.test(o.name));

export const FAQ_ITEMS: FaqItem[] = [
  /* ── General ── */
  {
    id: "unisex",
    category: "general",
    q: "Is Express Cuts a unisex salon?",
    a: [
      "Yes. Express Cuts is a unisex salon in KR Puram, Bengaluru.",
      `The services on this website focus on men's grooming. To ask about a specific service, message the salon on ${WHATSAPP} or call ${CALL}.`,
    ],
    related: ["located", "contact", "packages"],
  },
  {
    id: "located",
    category: "general",
    q: "Where is Express Cuts located?",
    a: [
      "Express Cuts is on Ayyappa Nagar Main Road in Priyadarshini Layout, Krishnarajapuram (KR Puram), Bengaluru.",
      `It is about 2 KM from Hoodi Circle. Open ${MAPS} for directions.`,
    ],
    related: ["exact-address", "hoodi", "directions"],
  },
  {
    id: "hours",
    category: "general",
    q: "What are the salon opening hours?",
    a: [
      `Express Cuts is open every day: ${hours(0)} from Monday to Friday, and ${hours(1)} on Saturday and Sunday.`,
    ],
    related: ["walk-in", "appointment", "located"],
  },

  /* ── Appointments & booking ── */
  {
    id: "walk-in",
    category: "booking",
    q: "Do you welcome walk-in customers?",
    a: [
      "Yes. Walk-ins are welcome during salon hours.",
      `To check a suitable time before you come, message on ${WHATSAPP} or call ${CALL}.`,
    ],
    related: ["appointment", "hours", "contact"],
  },
  {
    id: "appointment",
    category: "booking",
    q: "Do I need to book an appointment?",
    a: [
      "No, you do not need an appointment. Walk-in customers are welcome at Express Cuts.",
      `You can also contact the salon on ${WHATSAPP} or call ${CALL} before visiting to ask about a suitable time.`,
    ],
    related: ["walk-in", "whatsapp", "hours"],
  },
  {
    id: "contact",
    category: "booking",
    q: "How can I contact Express Cuts?",
    a: [
      `You can call ${CALL} or message the salon on ${WHATSAPP}.`,
      `You can also visit in person at ${ADDRESS}.`,
    ],
    related: ["whatsapp", "directions", "hours"],
  },

  /* ── Haircut & styling ── */
  {
    id: "haircut-styles",
    category: "haircut",
    q: "What haircut styles can I choose from?",
    a: [
      "You can choose from classic cuts, low, mid and high taper fades, buzz fades, textured cuts, messy quiffs, flow cuts, wolf cuts and disconnected side parts.",
      "See them with photographs on the [hair page](/hair), or read our guide to [choosing a men's haircut style](/blog/mens-haircut-styles-how-to-choose).",
    ],
    related: ["face-shape", "fades-tapers", "reference-photo"],
  },
  {
    id: "face-shape",
    category: "haircut",
    q: "How do I choose a haircut that suits my face shape?",
    a: [
      "Choose a cut that balances your proportions. A round face often suits some height on top with tighter sides, while a longer face usually looks better without extra height.",
      "Face shape is only one factor, though. Your hair type, daily routine and how often you will return matter just as much. Your barber can suggest what suits you, and the [hair page](/hair) has a simple guide.",
    ],
    related: ["haircut-styles", "tell-barber", "reference-photo"],
  },
  {
    id: "haircut-frequency",
    category: "haircut",
    q: "How often should men get a haircut?",
    a: [
      "It depends on your style, your hair growth and how sharp you like to look. Many men with short hair trim every three to five weeks, and longer styles can go six to ten weeks.",
      "These are only starting points. Our guide on [how often men should get a haircut](/blog/how-often-should-men-get-a-haircut) covers each style in more detail.",
    ],
    related: ["fade-maintenance", "between-visits", "fades-tapers"],
  },
  {
    id: "fade-maintenance",
    category: "haircut",
    q: "How often should I maintain a fade?",
    a: [
      "Most fades look their best for around two to three weeks. Because the sides are so short, even a little growth changes the look.",
      "A low taper usually lasts a little longer than a skin fade or high fade. If you prefer fewer visits, ask your barber for a softer blend.",
    ],
    related: ["between-visits", "haircut-frequency", "fades-tapers"],
  },
  {
    id: "between-visits",
    category: "haircut",
    q: "How do I maintain a haircut between appointments?",
    a: [
      "Wash according to how oily your hair gets, condition it, and style it the way it was cut.",
      "Ask your barber which product they used and how they styled your hair. Book your next visit before the shape has grown out, as this is easier than rescuing it afterwards.",
    ],
    related: ["fade-maintenance", "haircut-frequency", "tell-barber"],
  },
  {
    id: "reference-photo",
    category: "haircut",
    q: "Can I show a reference photo to my barber?",
    a: [
      "Yes, and it is one of the best ways to explain what you want.",
      "Two or three photos work better than one. Try to choose pictures of someone with hair similar to yours, and point out what you like about each one.",
    ],
    related: ["tell-barber", "haircut-styles", "face-shape"],
  },
  {
    id: "tell-barber",
    category: "haircut",
    q: "What should I tell my barber before a haircut?",
    a: [
      "Tell your barber the style you want, how short you want the sides, and how much time you spend on your hair each day.",
      "Also mention anything you have struggled with, such as a cowlick or a thinning crown. If you are not sure of the name of a style, a photo is enough.",
    ],
    related: ["reference-photo", "face-shape", "between-visits"],
  },
  {
    id: "fades-tapers",
    category: "haircut",
    q: "Do you offer fades, tapers and classic haircuts?",
    a: [
      "Yes. Express Cuts offers low, mid and high taper fades, buzz fades and classic cuts.",
      `See the full range on the [hair page](/hair). Current haircut prices are on the [offers page](/offers), where a men's haircut is listed at ${inr2(offer("haircut").price)}.`,
    ],
    related: ["haircut-styles", "fade-maintenance", "offers-where"],
  },

  /* ── Beard ── */
  {
    id: "beard-trim",
    category: "beard",
    q: "Do you offer beard trimming and shaping?",
    a: [
      `Yes. Express Cuts offers beard trimming, shaping and line-ups. The Beard Trim & Line-Up is currently ${inr2(offer("beard").price)}.`,
      "Beard styling is also available. See the styles and services on the [beard page](/beard).",
    ],
    related: ["beard-frequency", "beard-lineup", "packages"],
  },
  {
    id: "beard-frequency",
    category: "beard",
    q: "How often should I trim my beard?",
    a: [
      "It depends on the length. Heavy stubble usually needs a trim every few days, while a medium beard may need a weekly tidy and a full shape every few weeks.",
      "Our [beard grooming guide](/blog/mens-beard-grooming-trimming-shaping-guide) covers trimming, shaping and maintenance step by step.",
    ],
    related: ["beard-trim", "beard-lineup", "haircut-frequency"],
  },
  {
    id: "beard-lineup",
    category: "beard",
    q: "Can I get a beard line-up or clean shave?",
    a: [
      "Yes. Both a beard shape and line-up and a clean shave are listed among the services on the [beard page](/beard).",
      `Current line-up pricing is on the [offers page](/offers). To ask about a clean shave, message on ${WHATSAPP} or call ${CALL}.`,
    ],
    related: ["beard-trim", "beard-frequency", "offers-where"],
  },

  /* ── Facial ── */
  {
    id: "facial-services",
    category: "facial",
    q: "What facial services are available?",
    a: [
      "Express Cuts offers Type 1, Type 2, Type 3 and Type 4 facials, along with the Hydra Facial.",
      `The salon's services also include Jennot, O3 and other facials, so call ${CALL} to ask about those. See the current options on the [facial page](/facial).`,
    ],
    related: ["facial-steps", "facial-choose", "hydra"],
  },
  {
    id: "facial-steps",
    category: "facial",
    q: "What happens during a men's facial?",
    a: [
      "A facial usually involves cleansing, exfoliating, a relaxing massage, a mask and a moisturising finish. The exact steps depend on the facial you choose.",
      "Tell the professional beforehand about any sensitivity or products you use. Our [men's facial guide](/blog/mens-facial-what-to-expect) explains what to expect.",
    ],
    related: ["facial-choose", "facial-services", "hydra"],
  },
  {
    id: "facial-choose",
    category: "facial",
    q: "How do I choose between the facial options?",
    a: [
      "Start with what you want from the visit, then compare what each option includes.",
      `Type 1 to Type 4 are offered as packages that combine a facial with grooming services, while the Hydra Facial focuses on the skin. If you are unsure, call ${CALL} and the team can help you choose.`,
    ],
    related: ["facial-services", "hydra", "packages"],
  },
  {
    id: "hydra",
    category: "facial",
    q: "What is a Hydra Facial?",
    a: [
      "A Hydra Facial is a machine-based facial that uses a wand to exfoliate and deep-clean the skin, then applies a serum.",
      `At Express Cuts, the [Hydra Facial for Men](/facial) is listed at ${inr2(offer("hydra").price)} on the [offers page](/offers). It is a grooming treatment rather than a medical one, so please mention any skin sensitivity before you start.`,
    ],
    related: ["facial-steps", "facial-choose", "offers-where"],
  },

  /* ── Hair spa ── */
  {
    id: "hair-spa-what",
    category: "hair-spa",
    q: "What is a hair spa?",
    a: [
      "A hair spa is a grooming treatment that combines hair and scalp cleansing, a massage and a conditioning hair treatment.",
      "It can be part of a routine for hair that feels dry, rough or dull. It is not a medical treatment. See how it works on the [hair spa page](/hair-spa).",
    ],
    related: ["hair-spa-vs-wash", "hair-spa-duration", "packages"],
  },
  {
    id: "hair-spa-vs-wash",
    category: "hair-spa",
    q: "How is a hair spa different from a regular hair wash?",
    a: [
      "A regular wash mainly cleans your hair, while a hair spa adds a massage and a conditioning treatment.",
      "For most days, a wash is all you need. Our guide to the [hair spa vs a regular hair wash](/blog/hair-spa-vs-regular-hair-wash) explains when each one makes sense.",
    ],
    related: ["hair-spa-what", "hair-spa-duration", "between-visits"],
  },
  {
    id: "hair-spa-duration",
    category: "hair-spa",
    q: "How long does a hair spa session take?",
    a: [
      "It depends on your hair and the treatment you choose, so there is no fixed time.",
      `Message the salon on ${WHATSAPP} or call ${CALL} and the team can tell you how long to allow.`,
    ],
    related: ["hair-spa-what", "hair-spa-vs-wash", "contact"],
  },

  /* ── Hair color ── */
  {
    id: "grey-coverage",
    category: "hair-color",
    q: "Do you offer grey hair coverage?",
    a: [
      "Yes. Grey coverage is one of the looks on the [hair color page](/hair-color).",
      "Hair color is priced as part of packages, shown on the [offers page](/offers). Let the team know if you have ever reacted to a hair dye. Our [hair color guide](/blog/mens-hair-color-grey-coverage-highlights-streaks) explains why this matters.",
    ],
    related: ["highlights", "color-options", "packages"],
  },
  {
    id: "highlights",
    category: "hair-color",
    q: "Do you offer highlights and streaks?",
    a: [
      "Yes. Hair streaks and highlights are both on the [hair color page](/hair-color).",
      `The ${priced("executive")} includes hair color streaks. Ask the team which package or option suits the look you want.`,
    ],
    related: ["grey-coverage", "color-options", "packages"],
  },
  {
    id: "color-options",
    category: "hair-color",
    q: "What hair colour options are available?",
    a: [
      "The options include natural hair color, grey coverage, hair streaks, highlights and fashion color.",
      "Color services are shown as part of the Deluxe, Executive and Platinum combos, and the Platinum Combo includes L'Oréal hair color. See the looks on the [hair color page](/hair-color).",
    ],
    related: ["grey-coverage", "highlights", "offers-where"],
  },

  /* ── Offers ── */
  {
    id: "packages",
    category: "offers",
    q: "What grooming packages are available?",
    a: [
      `Express Cuts offers ${list(combos.map((o) => `${o.name} (${priceLabel2(o)})`))}.`,
      "Each package combines several services at one price. See what each one includes on the [offers page](/offers).",
    ],
    related: ["classic-combo", "offers-where", "hydra"],
  },
  {
    id: "classic-combo",
    category: "offers",
    q: "What services are included in the Classic Combo?",
    a: [
      `The Classic Combo includes ${includes("classic").toLowerCase()}. It is currently ${inr2(offer("classic").price)}, reduced from ${inr2(offer("classic").wasPrice ?? 0)}.`,
      "Prices can change, so the [offers page](/offers) always has the latest.",
    ],
    related: ["packages", "offers-where", "haircut-styles"],
  },
  {
    id: "offers-where",
    category: "offers",
    q: "Where can I see the current salon offers?",
    a: [
      `All current offers are on the [offers page](/offers), including haircut, beard, facial and combo packages. You can also ask the team on ${WHATSAPP} or call ${CALL}.`,
    ],
    related: ["packages", "classic-combo", "walk-in"],
  },

  /* ── Visit ── */
  {
    id: "exact-address",
    category: "visit",
    q: "Where exactly is the salon?",
    a: [`The salon's address is ${ADDRESS}.`, `Open ${MAPS} for directions to the entrance.`],
    related: ["directions", "hoodi", "hours"],
  },
  {
    id: "hoodi",
    category: "visit",
    q: "Is Express Cuts near Hoodi Circle?",
    a: [
      "Yes. Express Cuts is about 2 KM from Hoodi Circle, on Ayyappa Nagar Main Road in KR Puram.",
    ],
    related: ["directions", "exact-address", "walk-in"],
  },
  {
    id: "directions",
    category: "visit",
    q: "How can I get directions to the salon?",
    a: [
      `The easiest way is to open the salon's ${MAPS} listing, which gives directions from where you are.`,
      `If you need help finding it, call ${CALL}. For parking information, please contact the salon before you visit.`,
    ],
    related: ["exact-address", "hoodi", "contact"],
  },
  {
    id: "whatsapp",
    category: "visit",
    q: "How can I contact the salon on WhatsApp?",
    a: [
      `Open a chat using this [WhatsApp link](${SITE.whatsappUrl}), or message ${SITE.phoneDisplay} from the WhatsApp app.`,
      "You can use it to ask a question or check a suitable time before you come.",
    ],
    related: ["contact", "appointment", "walk-in"],
  },
];

/** The answer as it reads on screen, for the JSON-LD and for search */
export const faqPlain = (item: FaqItem) => item.a.map(plainText).join(" ");
