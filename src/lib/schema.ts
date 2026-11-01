import { HOURS, SITE } from "./site";

/**
 * One business, described once.
 *
 * Every page used to publish its own HairSalon node with slightly different
 * facts; now the salon is defined here, keyed by `BUSINESS_ID`, and a page that
 * needs to point at it references that id instead of repeating itself.
 * Everything is derived from src/lib/site.ts, so the facts have a single home.
 */

/* The static export serves every page from a folder, so its address ends in a slash */
const slashed = (path: string) => (/[#?]|\.[a-z0-9]+$|\/$/i.test(path) ? path : `${path}/`);

/** Absolute URL for schema (JSON-LD needs real URLs, metadataBase does not apply) */
export const abs = (path: string) => (SITE.url ? new URL(slashed(path), SITE.url).toString() : slashed(path));

/** The salon's stable node id, referenced from every page */
export const BUSINESS_ID = abs("/#business");

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const hhmm = (minutes: number) => `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;

/** The salon itself — emitted once, from the root layout */
export const businessSchema = () => ({
  "@type": "HairSalon",
  "@id": BUSINESS_ID,
  name: SITE.name,
  /* The name the Google listing behind SITE.mapsUrl shows. Publishing it as an alias
     lets Google reconcile the listing with the site; the brand stays `name`. */
  alternateName: SITE.listingName,
  description: SITE.description,
  url: abs("/"),
  image: abs("/images/gallery/express-cuts-salon-exterior-kr-puram.webp"),
  telephone: `+91-${SITE.phone}`,
  priceRange: SITE.priceRange,
  foundingDate: String(SITE.established),
  currenciesAccepted: "INR",
  areaServed: ["KR Puram", "Ayyappa Nagar", "Krishnarajapuram", "Hoodi", "Bengaluru"],
  hasMap: SITE.mapsUrl,
  sameAs: SITE.sameAs,
  address: {
    "@type": "PostalAddress",
    streetAddress: "25/2, Ayyappa Nagar Main Rd, Priyadarshini Layout",
    addressLocality: "Krishnarajapuram, Bengaluru",
    addressRegion: "Karnataka",
    postalCode: "560037",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", ...SITE.geo },
  openingHoursSpecification: HOURS.map((row) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: row.days.map((d) => DAYS[d]),
    opens: hhmm(row.open),
    closes: hhmm(row.close),
  })),
});

/** How other blocks point at the salon without describing it again */
export const businessRef = { "@id": BUSINESS_ID };

/** Home → … breadcrumbs */
export const breadcrumbs = (trail: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" }, ...trail].map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.name,
    item: abs(item.path),
  })),
});

/** A service the salon provides, tied to the salon entity */
export const serviceSchema = ({
  name,
  serviceType,
  description,
  path,
}: {
  name: string;
  serviceType: string;
  description: string;
  path: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  serviceType,
  description,
  url: abs(path),
  provider: businessRef,
  areaServed: { "@type": "Place", name: "KR Puram, Bengaluru" },
});

/** Questions and answers exactly as the page shows them */
export const faqSchema = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

/** One blog article. Author and publisher are the salon itself, never a second entity. */
export const articleSchema = ({
  title,
  description,
  path,
  image,
  published,
  modified,
  keywords,
  section,
}: {
  title: string;
  description: string;
  path: string;
  image: string;
  published: string;
  modified: string;
  keywords: string[];
  section: string;
}) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: title,
  description,
  image: [abs(image)],
  datePublished: published,
  dateModified: modified,
  author: { "@type": "Organization", name: "The Express Cuts Team", url: abs("/our-story"), parentOrganization: businessRef },
  publisher: businessRef,
  mainEntityOfPage: { "@type": "WebPage", "@id": abs(path) },
  articleSection: section,
  keywords: keywords.join(", "),
  inLanguage: "en-IN",
  isPartOf: { "@type": "Blog", "@id": abs("/blog/#blog") },
});

/** The single <script> the root layout renders */
export const siteSchema = () => ({
  "@context": "https://schema.org",
  "@graph": [
    businessSchema(),
    {
      "@type": "WebSite",
      "@id": abs("/#website"),
      url: abs("/"),
      name: SITE.name,
      publisher: businessRef,
      inLanguage: "en-IN",
    },
  ],
});
