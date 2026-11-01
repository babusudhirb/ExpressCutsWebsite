import { HOURS, SITE, TEL, waLink } from "@/lib/site";
import { ALL_OFFERS_2, inr2 } from "@/data/offers-2";
import { plainText } from "@/lib/rich-text";

/**
 * The blog. Articles are data so the page, the metadata, the JSON-LD and the
 * sitemap all read one record. Body strings use the marks in lib/rich-text.ts.
 *
 * `published` is the day the article really went live; add `updated` only after
 * a substantive edit. Never back-date either one.
 *
 * Photographs of models carry subject-only alt text: only the salon interior
 * pictures may be described as Express Cuts.
 */

export type BlogCategoryId = "haircut" | "beard" | "facial" | "hair-spa" | "hair-color" | "tips" | "salon";

export const BLOG_CATEGORIES: { id: BlogCategoryId; label: string; short: string }[] = [
  { id: "haircut", label: "Haircut & Styling", short: "Haircut" },
  { id: "beard", label: "Beard Grooming", short: "Beard" },
  { id: "facial", label: "Facial & Skincare", short: "Facial" },
  { id: "hair-spa", label: "Hair Spa", short: "Hair Spa" },
  { id: "hair-color", label: "Hair Color", short: "Hair Color" },
  { id: "tips", label: "Men's Grooming Tips", short: "Grooming" },
  { id: "salon", label: "Salon & Local Information", short: "Salon" },
];

export type Block =
  | { t: "h2"; text: string; id: string }
  | { t: "h3"; text: string }
  | { t: "p"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "table"; caption: string; head: string[]; rows: string[][] };

export type BlogPost = {
  slug: string;
  title: string;
  /** Under 60 characters, for the search result */
  metaTitle: string;
  description: string;
  excerpt: string;
  category: BlogCategoryId;
  keywords: string[];
  published: string;
  updated?: string;
  image: { src: string; width: number; height: number; alt: string; position: string };
  /** The direct answer, shown first */
  answer: string;
  body: Block[];
  summary: string[];
  questions: { q: string; a: string }[];
  sources?: { label: string; href: string }[];
  cta: { title: string; copy: string; label: string; href: string; message: string };
  related: string[];
};

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const h2 = (text: string): Block => ({ t: "h2", text, id: slugify(text) });
const h3 = (text: string): Block => ({ t: "h3", text });
const p = (text: string): Block => ({ t: "p", text });
const ul = (...items: string[]): Block => ({ t: "ul", items });
const ol = (...items: string[]): Block => ({ t: "ol", items });

const LAUNCH = "2026-11-01";

const AAD_HAIR = { label: "American Academy of Dermatology: Tips for healthy hair", href: "https://www.aad.org/public/everyday-care/hair-scalp-care/hair/healthy-hair-tips" };
const AAD_BEARD = { label: "American Academy of Dermatology: A dermatologist's top tips for a healthy beard", href: "https://www.aad.org/public/everyday-care/skin-care-secrets/face/healthy-beard" };
const AAD_FACIAL_HAIR = { label: "American Academy of Dermatology: How to care for facial hair", href: "https://www.aad.org/news/how-to-care-for-facial-hair" };
const AAD_FACE = { label: "American Academy of Dermatology: Face washing 101", href: "https://www.aad.org/public/everyday-care/skin-care-basics/care/face-washing-101" };
const CLEVELAND_HAIR = { label: "Cleveland Clinic: Terminal hair", href: "https://my.clevelandclinic.org/health/body/23140-terminal-hair" };
const CLEVELAND_INFUSION = { label: "Cleveland Clinic: Dermalinfusion, including how it compares with a HydraFacial", href: "https://my.clevelandclinic.org/health/treatments/23915-dermalinfusion" };
const NHS_DYE = { label: "NHS: Hair dye reactions", href: "https://www.nhs.uk/conditions/hair-dye-reactions/" };
const NHS_WALES_DYE = { label: "NHS 111 Wales: Hair dye reactions", href: "https://111.wales.nhs.uk/hairdyereactions/" };

const offer = (id: string) => {
  const found = ALL_OFFERS_2.find((o) => o.id === id);
  if (!found) throw new Error(`Unknown offer: ${id}`);
  return found;
};

const HAIR_CUT = {
  src: "/images/our-story/mens-haircut-in-progress.webp",
  width: 900,
  height: 801,
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "mens-haircut-styles-how-to-choose",
    title: "Men's Haircut Styles: How to Choose a Style That Suits You",
    metaTitle: "Men's Haircut Styles: How to Choose One That Suits You",
    description:
      "How to choose between men's haircut styles such as the classic side part, taper fade, buzz fade and textured cut, based on your hair, face and routine.",
    excerpt:
      "Your hair type, face shape, daily routine and upkeep matter more than the trend. Here is how to weigh them and pick a cut you can live with.",
    category: "haircut",
    keywords: ["men's haircut styles", "classic side part", "taper fade", "buzz fade", "textured haircut", "messy quiff"],
    published: LAUNCH,
    image: {
      ...HAIR_CUT,
      alt: "Barber using clippers to finish a fade on a man with thick, wavy hair",
      position: "50% 68%",
    },
    answer:
      "Choose a men's haircut by working through four things in order: your hair type, your face shape, how much styling you will really do each morning, and how often you are willing to return for upkeep. A style that fits all four will look good on an ordinary Tuesday, not just when you leave the chair.",
    body: [
      h2("What should you look at first when choosing a haircut?"),
      p("Most people start with a photo. It is better to start with your own hair, because the photo was taken with someone else's. The four questions below take a couple of minutes and rule out most of the styles that would disappoint you."),
      h3("Your hair type"),
      p("Hair type decides what a cut can physically do. Straight hair shows every line, so sharp fades and side parts look clean but also show growth quickly. Wavy hair has natural movement and suits textured cuts and longer tops. Curly hair needs length to settle and tends to look best when the sides are tapered rather than cut very tight against a bulky top. Fine or thin hair usually looks fuller when it is kept shorter and textured, because long, flat lengths reveal the scalp."),
      h3("Your face shape"),
      p("Think of face shape as a way to balance proportions, not as a rulebook. A round face often benefits from some height on top and tighter sides, which adds length. A square face already has a strong jaw, so it can carry both clean, classic cuts and softer texture. A long face usually looks better without extra height, so a fuller side or a fringe can help. An oval face is the most forgiving. The [hair page](/hair) has a simple guide to cuts by hair type and face shape if you want to compare them side by side."),
      h3("Your daily routine"),
      p("Be honest here. A messy quiff takes product and a few minutes in front of the mirror. A buzz fade takes a towel. If you wash your hair and leave the house, choose a cut that falls into place without help."),
      h3("Your upkeep budget"),
      p("Tight fades look their best for a short window, so they need frequent visits. Longer scissor cuts grow out slowly and forgive a late appointment. If you will only come in every couple of months, avoid styles that depend on very short sides. Our guide on [how often men should get a haircut](/blog/how-often-should-men-get-a-haircut) goes through typical intervals style by style."),

      h2("Which men's haircut styles are worth knowing?"),
      p("These are some of the best-known styles. Knowing the names makes the conversation with your barber much easier."),
      {
        t: "table",
        caption: "Common men's haircut styles compared",
        head: ["Style", "What it is", "Works well with", "Upkeep"],
        rows: [
          ["Classic side part", "Tapered sides with a defined part and a neat top", "Straight or slightly wavy hair; office dress codes", "Moderate; needs a little product"],
          ["Taper fade", "Hair gradually shortens down the sides and back; can sit low, mid or high", "Almost every hair type", "Moderate to high; the line softens quickly"],
          ["Buzz fade", "A very short clipper cut on top with faded sides", "Thick hair, warm weather, no-fuss routines", "Low daily effort; frequent trims to hold the shape"],
          ["Textured cut", "Choppy layers on top that add movement and volume", "Wavy, thick or fine hair that needs body", "Low to moderate; a small amount of product helps"],
          ["Messy quiff", "A longer front lifted up and back with a loose finish", "Thick or wavy hair with some length", "Moderate; takes daily styling"],
          ["Flow cut or wolf cut", "Longer lengths with layers for shape", "Wavy or curly hair; men growing their hair out", "Low on trims; needs regular washing and care"],
        ],
      },

      h2("What is the difference between a taper and a fade?"),
      p("A taper gradually shortens the hair towards the neckline and around the ears, and it usually leaves some length at the very bottom. A fade does the same job but goes shorter, often blending down to skin. In practice, many barbers use the words together. **Low**, **mid** and **high** tell the barber where the shortening begins: a low taper starts just above the ears and stays subtle, while a high taper starts near the temples and looks far bolder."),
      p("If you are unsure, start with a low taper. It is the easiest to wear and the easiest to grow out, and you can always go higher on the next visit."),

      h2("How do you explain the style you want to a barber?"),
      ol(
        "Bring two or three photos of the style, ideally on someone with hair like yours.",
        "Point out what you like in each picture: the length on top, the sides, or the shape around the ears.",
        "Say how you wear your hair on a normal day and how long you will spend styling it.",
        "Mention anything you have had trouble with, such as a cowlick, a thinning crown or a stubborn fringe.",
        "Agree the shortest length on the sides before the clippers start. Hair can always come off later, but it cannot go back on.",
      ),

      h2("What mistakes should you avoid?"),
      ul(
        "**Copying a photo without checking the hair type.** A wavy quiff will not behave the same way on very straight hair.",
        "**Going far shorter than you have ever worn it.** Step down gradually unless you are happy to live with the result for a few weeks.",
        "**Choosing a style your routine cannot support.** A cut that needs ten minutes of styling looks wrong on days you give it none.",
        "**Waiting too long between trims on a fade.** Once the line has grown out, the cut looks like a different style.",
      ),

      h2("How do you keep a new haircut looking right?"),
      p("Ask your barber how to style the cut before you leave, and which product they used. Wash according to your scalp rather than a fixed habit: the American Academy of Dermatology suggests [basing how often you shampoo on how oily your hair gets](https://www.aad.org/public/everyday-care/hair-scalp-care/hair/healthy-hair-tips), and applying shampoo to the scalp rather than the full length. Book your next trim before the shape has gone, not after."),
    ],
    summary: [
      "Start with your hair type, then consider face shape, routine and upkeep.",
      "Learn the names of a few styles so you can explain what you want.",
      "A low taper is the safest starting point if you are unsure.",
      "Choose a style your daily routine and visit schedule can support.",
    ],
    questions: [
      { q: "What is the easiest men's haircut to maintain day to day?", a: "Short cuts such as a buzz fade take the least daily effort, although they need regular trims to hold their shape. If you want fewer visits, a slightly longer textured cut is usually more forgiving." },
      { q: "Which haircut suits most face shapes?", a: "A low taper with some texture on top suits most face shapes because it keeps proportions balanced without adding extreme height or width." },
      { q: "Should I bring a photo to my haircut?", a: "Yes. Two or three photos show length and shape far better than words, especially if they feature someone with a similar hair type. See our [FAQ on reference photos](/faq#reference-photo)." },
    ],
    sources: [AAD_HAIR],
    cta: {
      title: "Ready for a cut that suits you?",
      copy: "See the cuts we offer and talk through the options with your barber at Express Cuts.",
      label: "Explore haircuts",
      href: "/hair",
      message: "Hi, I'd like some advice on a new haircut at Express Cuts.",
    },
    related: ["how-often-should-men-get-a-haircut", "mens-beard-grooming-trimming-shaping-guide", "mens-hair-color-grey-coverage-highlights-streaks"],
  },

  {
    slug: "how-often-should-men-get-a-haircut",
    title: "How Often Should Men Get a Haircut?",
    metaTitle: "How Often Should Men Get a Haircut? A Style-by-Style Guide",
    description:
      "How often men should get a haircut depends on the style, hair growth and how sharp you like it. Typical intervals for fades, short cuts and longer hair.",
    excerpt:
      "There is no single schedule. Here is how your style, your hair and your standards change the answer, with typical intervals to start from.",
    category: "tips",
    keywords: ["how often should men get a haircut", "fade maintenance", "taper maintenance", "haircut frequency"],
    published: LAUNCH,
    image: {
      src: "/images/services/hair-cut.png",
      width: 1347,
      height: 1168,
      alt: "Barber trimming a man's hair with scissors and a comb",
      position: "50% 62%",
    },
    answer:
      "Most men with short hair need a haircut every three to five weeks, fades and tight tapers closer to every two to three weeks, and longer styles every six to ten weeks. These are starting points, not rules. The right interval depends on the style, how quickly your hair grows and how sharp you like to look.",
    body: [
      h2("Why is there no single answer?"),
      p("Hair on the scalp grows at about [one centimetre a month](https://my.clevelandclinic.org/health/body/23140-terminal-hair), and that is an average. What matters is how much of that growth your particular style can absorb before it loses its shape."),
      p("One centimetre barely shows on a 15 cm flow cut. On a fade where the sides were cut to one or two millimetres, the same growth means the sides are several times longer than when you left the chair. That is why two men with identical hair growth can need very different schedules."),

      h2("How often should you get a haircut for each style?"),
      {
        t: "table",
        caption: "Typical haircut intervals by style. These are starting points; adjust them to your own hair.",
        head: ["Style", "Typical interval", "What gives it away first"],
        rows: [
          ["Skin fade or high fade", "2 to 3 weeks", "The blend softens and the skin line disappears"],
          ["Low or mid taper", "3 to 4 weeks", "The neckline and the hair around the ears"],
          ["Buzz cut or buzz fade", "2 to 4 weeks", "The outline and the sides"],
          ["Classic side part or short scissor cut", "4 to 5 weeks", "The sides start pushing outwards"],
          ["Textured cut or quiff", "4 to 6 weeks", "The top loses shape and gets heavy"],
          ["Flow cut, wolf cut or longer hair", "6 to 10 weeks", "Ends look tired and layers lose definition"],
        ],
      },

      h2("What affects how often you need a trim?"),
      h3("Growth rate"),
      p("Growth varies from person to person. If your hair always seems to look long within a fortnight, sit at the shorter end of the ranges above."),
      h3("Hair texture"),
      p("Curly and wavy hair hides growth better than straight hair, because the length coils rather than hangs. Straight hair shows every extra millimetre around the ears and neck."),
      h3("Your job and your calendar"),
      p("If you face clients, or you have a wedding or an interview coming up, you may want a tighter schedule. Book a trim two or three days before an event rather than the morning of it, so the sharpest edge has settled."),
      h3("Season and comfort"),
      p("Many men go shorter in hot weather and let their hair grow when it cools down. That is a personal preference, not a grooming rule."),

      h2("What are the signs that a trim is due?"),
      ul(
        "Hair has started to touch the tops of your ears.",
        "Your neckline has lost its edge and looks fuzzy.",
        "The sides are pushing outwards instead of lying flat.",
        "You need more product, or more time, to get the same result.",
        "The style that took two minutes last month now takes ten.",
      ),

      h2("How do you stretch the time between haircuts?"),
      ol(
        "Ask for a slightly longer finish on the sides, or a lower fade. A soft taper grows out more gracefully than a skin fade.",
        "Book a neck and line tidy between full cuts, if your barber offers one. Ask at the salon what is available.",
        "Wash and style according to your hair. The American Academy of Dermatology advises [using conditioner after each shampoo](https://www.aad.org/public/everyday-care/hair-scalp-care/hair/healthy-hair-tips) and matching how often you wash to how oily your hair gets.",
        "Dry your hair the way it is cut. Pushing it into place while it is damp keeps a growing style under control for longer.",
      ),

      h2("Does cutting your hair make it grow faster?"),
      p("Cutting happens at the ends, while growth comes from the follicle in the scalp, so a trim does not change how fast hair grows. It does keep the shape neat and removes tired ends, which can make hair look healthier and thicker while it grows."),

      h2("What mistakes do people make with haircut timing?"),
      ul(
        "**Waiting until it looks bad.** By then you have spent a week or two unhappy with it. Trim at the first signs instead.",
        "**Keeping a tight fade on a long schedule.** If you will only visit every two months, a softer cut will serve you better.",
        "**Cutting just before an important day for the first time.** Try a new style a few weeks ahead, so there is time to adjust it.",
      ),

      h2("How do you find your own schedule?"),
      p("Take a photo the day you get a haircut and again each week. Note when the cut stops looking right to you, and book your next visit just before that point. After two or three cycles you will know your interval, and you can read more about [which style suits that routine](/blog/mens-haircut-styles-how-to-choose)."),
    ],
    summary: [
      "Fades: roughly every two to three weeks. Short cuts: three to five. Longer styles: six to ten.",
      "Hair grows around one centimetre a month, but style decides how visible that is.",
      "Softer tapers stretch the time between visits.",
      "Note when your cut stops looking right and book just before that point.",
    ],
    questions: [
      { q: "How often should I maintain a fade?", a: "Most fades look their best for around two to three weeks. A low taper can usually go a little longer. Read our [fade maintenance answer](/faq#fade-maintenance) for more." },
      { q: "Is it bad to go a long time without a haircut?", a: "No. Your hair will not be harmed, but short styles lose their shape and ends can start to look tired. It is mostly a question of appearance." },
      { q: "How long before an event should I get a haircut?", a: "Two or three days beforehand is a good target. It gives the sharpest line time to soften and leaves room for a small adjustment if you need one." },
    ],
    sources: [CLEVELAND_HAIR, AAD_HAIR],
    cta: {
      title: "Due for a trim?",
      copy: "Walk in or send us a message. See the cuts available at Express Cuts on the hair page.",
      label: "View haircuts",
      href: "/hair",
      message: "Hi, I'd like to come in for a haircut at Express Cuts.",
    },
    related: ["mens-haircut-styles-how-to-choose", "mens-beard-grooming-trimming-shaping-guide", "express-cuts-kr-puram-first-visit-guide"],
  },

  {
    slug: "mens-beard-grooming-trimming-shaping-guide",
    title: "Men's Beard Grooming: Trimming, Shaping and Maintenance",
    metaTitle: "Men's Beard Grooming Tips: Trimming, Shaping & Care",
    description:
      "A practical guide to men's beard grooming: how to trim and shape a beard, choose a style such as heavy stubble or a boxed beard, and care for the skin beneath.",
    excerpt:
      "How to wash, trim and shape a beard, which styles are easiest to keep, and why the skin underneath matters as much as the hair.",
    category: "beard",
    keywords: ["men's beard grooming", "beard trimming", "beard shaping", "beard line-up", "heavy stubble", "boxed beard", "Italian beard"],
    published: LAUNCH,
    image: {
      src: "/images/services/beard-grooming.png",
      width: 1254,
      height: 1254,
      alt: "Barber shaping a man's full beard with a trimmer",
      position: "50% 66%",
    },
    answer:
      "Good beard grooming comes down to three habits: wash the beard and the skin under it, trim while the hair is clean and dry enough to judge the length, and keep a clear line on the cheeks and neck. Most beards look their best with a light tidy every few days and a proper shape every few weeks.",
    body: [
      h2("What does a basic beard routine look like?"),
      p("A beard needs less work than it appears to, as long as the work is regular. The American Academy of Dermatology recommends [washing your face and beard daily with a gentle cleanser](https://www.aad.org/public/everyday-care/skin-care-secrets/face/healthy-beard), then patting dry and moisturising, because the skin beneath a beard can become dry, flaky and itchy."),
      ol(
        "Wash your face and beard with a gentle cleanser, using your fingertips to reach the skin.",
        "Pat dry with a clean towel. Rubbing frizzes the hair.",
        "Moisturise the skin underneath. A beard oil or balm can help soften the hair if you like the feel of one.",
        "Comb the beard in the direction it grows, which trains stray hairs and shows you what needs trimming.",
      ),

      h2("How should you trim a beard at home?"),
      p("Trim on clean hair, and work in stages. A warm shower softens the hair first; towel it mostly dry before you judge the length. It is far easier to take off a little more than to wait for a mistake to grow back."),
      ol(
        "Comb everything downward so you can see the true length. Curly beards can look shorter than they are.",
        "Set your trimmer guard longer than you think you need, and work down the sides first.",
        "Blend the neck area slightly shorter than the jaw, so the beard does not look heavy underneath.",
        "Check both sides in the mirror from the front, not just at an angle.",
        "Trim the moustache last, keeping it clear of your lip.",
      ),
      p("To reduce irritation, the AAD suggests [applying a shaving oil, cream or gel and cutting in the direction your hair grows](https://www.aad.org/public/everyday-care/skin-care-secrets/face/healthy-beard), since going against the grain can cause ingrown hairs in some people."),

      h2("What is beard shaping, and what is a line-up?"),
      p("**Trimming** controls length. **Shaping** decides the outline: where the beard stops on the cheek, how it curves into the sideburn, and how it finishes at the neck. A **line-up** is the sharp edge along those lines, usually done with a trimmer or a razor."),
      p("The neckline is where most home shaping goes wrong. A helpful guide is to imagine a curve running from behind each ear to a point about two fingers above your Adam's apple. Hair below that line goes. Cutting higher than that is the most common mistake, and it makes the beard look as if it starts in the wrong place."),

      h2("Which beard style should you choose?"),
      p("Your growth pattern matters as much as your face shape. If your cheeks are patchy, a shorter style will hide it better than a long one. These are some of the best-known styles, and you can see photographs of them on the [beard page](/beard)."),
      {
        t: "table",
        caption: "Popular beard styles compared",
        head: ["Style", "What it looks like", "Good for", "Upkeep"],
        rows: [
          ["Heavy stubble", "A short, even growth with a tidy neck", "Beginners and warm weather", "Trim every few days"],
          ["Boxed beard", "A full beard with a defined, squared outline", "Softening a round face; offices", "Regular shaping"],
          ["Italian beard", "A short beard that joins a fuller moustache", "Adding definition around the mouth", "Moderate; the moustache needs care"],
          ["Modern beard fade", "Sides that blend from the haircut into the beard", "Pairing with a fade or taper", "High; the blend needs frequent touch-ups"],
          ["Long full beard", "Length through the chin with a shaped body", "Dense, even growth", "Daily washing and combing"],
        ],
      },

      h2("How often should you trim your beard?"),
      p("It depends on the length. Heavy stubble needs a trim every few days to keep it even. A medium boxed beard usually needs a tidy each week and a full shape every three to four weeks. Longer beards can go further between trims, although the neck and cheek lines still need regular attention."),

      h2("What can go wrong with the skin under a beard?"),
      h3("Itching and flakes"),
      p("New growth often itches, and dryness makes it worse. Regular washing and a moisturiser usually help. The AAD also notes that a moisturiser with SPF 30 or higher is useful in the stubble phase, when the skin is still exposed to the sun."),
      h3("Ingrown hairs and bumps"),
      p("Curly hair is more prone to growing back into the skin. Softening the hair first helps: the AAD advises [trimming at the end of a shower or right after it](https://www.aad.org/news/how-to-care-for-facial-hair)."),
      p("This article is general grooming advice. If a rash, soreness or a skin problem under your beard does not settle, speak to a doctor or dermatologist."),

      h2("What mistakes should you avoid?"),
      ul(
        "**Cutting length while the beard is dripping wet.** Wet hair looks longer, so towel it mostly dry first or you can take off more than you intended.",
        "**Setting the neckline too high.** Your beard will look smaller and your jaw less defined.",
        "**Skipping the skin.** A soft beard over dry skin will still itch.",
        "**Blunt blades.** Dull trimmers and razors pull at the hair. Keep them clean and replace blades regularly.",
      ),
    ],
    summary: [
      "Wash and moisturise the skin under your beard, not just the hair.",
      "Trim in stages with a longer guard than you think you need.",
      "Keep the neckline about two fingers above the Adam's apple.",
      "Choose a style your natural growth can support.",
    ],
    questions: [
      { q: "How do I make a patchy beard look better?", a: "Keep it shorter. Heavy stubble or a short boxed shape hides thin areas, and a barber can blend the outline so patches stand out less." },
      { q: "Should I trim my beard wet or dry?", a: "Soften it in a warm shower, then trim once it is towelled mostly dry. Wet hair looks longer than it is, so it is easy to cut too much." },
      { q: "What is the difference between a trim and a line-up?", a: "A trim shortens the length of the beard. A line-up sharpens its edges on the cheeks and neck. See our [beard grooming FAQs](/faq#beard-trim) for what Express Cuts offers." },
    ],
    sources: [AAD_BEARD, AAD_FACIAL_HAIR],
    cta: {
      title: "Let a barber set the shape",
      copy: "A professional line-up gives you a clear outline to maintain at home. See the beard services at Express Cuts.",
      label: "Explore beard grooming",
      href: "/beard",
      message: "Hi, I'd like to book a beard trim and line-up at Express Cuts.",
    },
    related: ["mens-haircut-styles-how-to-choose", "how-often-should-men-get-a-haircut", "mens-facial-what-to-expect"],
  },

  {
    slug: "mens-facial-what-to-expect",
    title: "Men's Facial: What to Expect and How to Choose",
    metaTitle: "Men's Facial Guide: What to Expect and How to Choose",
    description:
      "What happens during a men's facial, how to discuss your skin with the professional, how to choose a facial service, and simple aftercare to follow.",
    excerpt:
      "A first facial is simpler than most men expect. Here is what usually happens, what to tell your therapist, and how to look after your skin afterwards.",
    category: "facial",
    keywords: ["men's facial guide", "facial for men", "men's skin care", "hydra facial"],
    published: LAUNCH,
    image: {
      src: "/images/services/facial-treatment.png",
      width: 1536,
      height: 1024,
      alt: "Therapist brushing a cream facial mask onto a relaxed man's face",
      position: "50% 40%",
    },
    answer:
      "A men's facial is a professional skin-care session that usually involves cleansing, exfoliating, massage, a mask and a moisturising finish. Expect to lie back and relax while a professional works through those steps. Tell them about any sensitivity or products you use, and choose the service based on your skin and what you want from it.",
    body: [
      h2("What happens during a men's facial?"),
      p("Every salon and every facial is a little different, but most follow a similar order. Knowing it in advance takes away most of the nerves of a first visit."),
      ol(
        "**A short chat.** The professional asks about your skin, what you use on it and what you would like to improve.",
        "**Cleansing.** Your face is cleansed to remove oil, sweat and dirt.",
        "**Exfoliating.** A product is used to lift dead skin from the surface.",
        "**Massage.** Often the part people enjoy most, this relaxes the face and neck.",
        "**Mask.** A mask is applied and left on for a while, and you simply rest.",
        "**Finish.** The mask is removed and a moisturiser is applied.",
      ),

      h2("Why do men get facials?"),
      p("Usually for simple reasons: to feel fresher, to look after their skin, to prepare for an event, or as a relaxing break. Regular shaving and beard growth, sun and pollution are all part of daily life for many men, and a facial gives the skin some time and attention that it does not get at home."),
      p("Keep your expectations realistic. A facial is a grooming treatment. It can leave your skin feeling clean and refreshed, but it is not a medical treatment and should not be expected to cure a skin condition."),

      h2("What should you tell the professional before a facial?"),
      p("This is the most useful thing you can do, and it takes less than a minute. Mention:"),
      ul(
        "Whether your skin is sensitive, or reacts easily to fragrance or new products.",
        "Any allergies you know about.",
        "Any active skin condition, irritation, cuts or recent treatments.",
        "Prescription creams or medicines you use on your skin.",
        "Whether you shaved that day, since freshly shaved skin can feel more sensitive.",
      ),
      p("If you have a diagnosed skin condition, or a rash that has not settled, check with your doctor or dermatologist before booking."),

      h2("How do you choose between facial options?"),
      p("Start with what you want from the visit, then compare what each service includes. The [facial page](/facial) lists the options at Express Cuts, including Type 1 to Type 4 facials and the Hydra Facial."),
      h3("If this is your first facial"),
      p("Pick a straightforward option. It will show you how your skin responds, and you can move up from there."),
      h3("If you also need a haircut and beard trim"),
      p("Package offers combine a facial with other grooming services. The [offers page](/offers) shows what is included in each one, so you can compare them directly."),
      h3("What is a Hydra Facial?"),
      p("A HydraFacial is a machine-based treatment. Cleveland Clinic describes it as [using a wand that exfoliates, deep-cleans pores and infuses a serum](https://my.clevelandclinic.org/health/treatments/23915-dermalinfusion) into the skin. If you are comparing it with a traditional facial, ask the professional how each suits your skin."),
      h3("If you are still unsure"),
      p("Ask. Describe your skin and your budget, and let the professional suggest what fits. A good suggestion should make sense to you, and it is fine to take the simpler option."),

      h2("What should you do after a facial?"),
      ul(
        "Keep your skin clean and avoid touching your face for the rest of the day.",
        "Use a mild moisturiser, and wear sunscreen if you are going outdoors.",
        "Leave strong actives and scrubs for a few days unless you have been told otherwise.",
        "Avoid shaving straight after a facial, if your skin feels sensitive.",
        "If you notice lasting redness, stinging or irritation, contact the salon and speak to a doctor if it does not settle.",
      ),

      h2("How do you look after your skin between facials?"),
      p("A facial works best on top of a simple routine, not instead of one. The American Academy of Dermatology recommends [using a gentle cleanser with your fingertips and lukewarm water](https://www.aad.org/public/everyday-care/skin-care-basics/care/face-washing-101), avoiding scrubbing, and limiting washing to twice a day and after sweating. Add a moisturiser if your skin feels dry or itchy."),

      h2("What mistakes should you avoid?"),
      ul(
        "**Not mentioning sensitivity.** The professional can only adjust for what they know about.",
        "**Booking a first facial right before a big event.** Try it a week or more ahead, so you know how your skin responds.",
        "**Expecting one visit to change your skin.** Think of it as care, not a cure.",
      ),
    ],
    summary: [
      "Most facials follow the same steps: cleanse, exfoliate, massage, mask, moisturise.",
      "Tell the professional about sensitivity, allergies and products you use.",
      "Choose by what you want from the visit, and ask if you are unsure.",
      "Be gentle on your skin afterwards, and keep up a simple routine.",
    ],
    questions: [
      { q: "Are facials suitable for men with beards?", a: "Generally, yes. Mention your beard at the start so the professional can work around it and choose suitable products." },
      { q: "How often should a man get a facial?", a: "It depends on your skin and lifestyle, so there is no fixed number. Ask the professional at your visit what would suit your skin." },
      { q: "Should I shave before a facial?", a: "Freshly shaved skin can feel more sensitive, so tell the professional if you have just shaved. If your skin is sensitive, it may be more comfortable to leave shaving for another time." },
    ],
    sources: [AAD_FACE, CLEVELAND_INFUSION],
    cta: {
      title: "Compare the facial options",
      copy: "See the facials available at Express Cuts and what each one includes.",
      label: "Explore facials",
      href: "/facial",
      message: "Hi, I'd like some advice on choosing a facial at Express Cuts.",
    },
    related: ["hair-spa-vs-regular-hair-wash", "mens-beard-grooming-trimming-shaping-guide", "express-cuts-kr-puram-first-visit-guide"],
  },

  {
    slug: "hair-spa-vs-regular-hair-wash",
    title: "Hair Spa vs Regular Hair Wash: What's the Difference?",
    metaTitle: "Hair Spa vs Hair Wash: What's the Difference?",
    description:
      "Hair spa vs regular hair wash explained: what each one does, what a typical hair spa session involves, when a wash is enough, and what to ask first.",
    excerpt:
      "A wash cleans your hair. A hair spa adds massage and a conditioning treatment. Here is how to tell which one you actually need.",
    category: "hair-spa",
    keywords: ["hair spa vs hair wash", "men's hair spa", "hair spa benefits", "scalp massage"],
    published: LAUNCH,
    image: {
      src: "/images/hair-spa/mens-hair-spa-treatment.png",
      width: 1536,
      height: 1024,
      alt: "Man reclining at a wash basin while lather is massaged through his hair",
      position: "50% 40%",
    },
    answer:
      "A regular hair wash cleans your hair and scalp. A hair spa is a longer grooming treatment that adds a scalp massage and a conditioning treatment to the cleanse. If your hair simply needs cleaning, a wash is enough. If it feels dry or rough, or you want a relaxing treatment, a hair spa may suit you better.",
    body: [
      h2("How are a hair spa and a regular wash different?"),
      p("They have different jobs. A wash is routine hygiene, and a hair spa is a treatment you choose occasionally."),
      {
        t: "table",
        caption: "Hair spa compared with a regular hair wash",
        head: ["", "Regular hair wash", "Hair spa"],
        rows: [
          ["Main purpose", "Removes oil, sweat, dirt and product", "Cleans, conditions and relaxes"],
          ["What is used", "Shampoo, and usually conditioner", "Shampoo plus a treatment product chosen for your hair"],
          ["Massage", "Brief, if any", "A central part of the session"],
          ["How often", "Depends on your hair and scalp", "Occasionally; ask what suits your hair"],
          ["Where", "At home, or before a haircut", "At a salon"],
        ],
      },

      h2("What happens in a typical hair spa session?"),
      p("Salons vary, but most sessions follow these steps. The [hair spa page](/hair-spa) shows the process at Express Cuts."),
      ol(
        "**Consultation.** The professional looks at your hair and scalp and asks what you want from the session.",
        "**Cleanse.** Your hair is washed to clear away oil and product.",
        "**Massage.** The scalp is massaged, often with a nourishing product, which is the relaxing part.",
        "**Treatment.** A conditioning treatment is applied through the hair and left for a while to work.",
        "**Finish.** The treatment is rinsed out and your hair is dried and styled.",
      ),

      h2("What can a hair spa do, and what can it not do?"),
      p("A hair spa can leave hair feeling softer, smoother and easier to manage, and many people find the massage relaxing. Think of it as deep conditioning with a massage."),
      p("It is not a medical treatment. It should not be expected to stop hair loss, cure dandruff or a scalp condition, or permanently repair damaged hair. If you have significant hair loss, a sore scalp or persistent flaking, speak to a doctor or dermatologist rather than booking a treatment."),

      h2("When is a regular wash enough?"),
      p("For most people on most days, it is all you need. A regular wash is enough when your hair feels healthy and manageable, your scalp is comfortable, and you have no particular goal beyond being clean."),
      p("How often to wash depends on your hair. The American Academy of Dermatology says to [base it on how oily your hair gets](https://www.aad.org/public/everyday-care/hair-scalp-care/hair/healthy-hair-tips): straight hair with an oily scalp may need shampooing daily, while dry, curly or textured hair may need it much less. It also suggests applying shampoo to the scalp rather than the full length, and using conditioner after each wash."),

      h2("When might a hair spa be worth it?"),
      ul(
        "Your hair feels dry or rough, and home conditioner is not doing much.",
        "Your hair looks dull or is hard to manage.",
        "You colour your hair or heat-style it often and want some extra conditioning.",
        "You want a relaxing grooming session, or a treat before an event.",
      ),

      h2("What should you ask before booking a hair spa?"),
      ol(
        "What does the session include, and what product will be used on my hair?",
        "Is it suitable for my hair type, and for coloured hair if I have had it done?",
        "How long will it take? This varies, so ask when you book.",
        "How much does it cost, or is it included in a package? Ask the salon, as hair spa may be part of a [package offer](/offers).",
        "Is there anything I should tell you about my scalp first?",
      ),

      h2("What mistakes should you avoid?"),
      ul(
        "**Treating it as a cure.** It is conditioning care, and it will not fix a medical problem.",
        "**Skipping the conversation.** Tell the professional about colouring, sensitivities or scalp issues.",
        "**Washing with very hot water.** Lukewarm water is more comfortable on the scalp.",
        "**Scrubbing with your nails.** Use your fingertips, at home and in any massage you do yourself.",
      ),

      h2("Can you have a haircut and a hair spa together?"),
      p("Yes. A hair spa can be combined with a haircut, and at Express Cuts, The King's Ritual package brings a haircut, beard trim, hair spa and other services together. See the [offers page](/offers) for what is currently included."),
    ],
    summary: [
      "A wash cleans. A hair spa cleans, conditions and relaxes.",
      "Most days, a regular wash is all your hair needs.",
      "Consider a hair spa if your hair feels dry, rough or dull, or you want the massage.",
      "It is grooming care, not a medical treatment for hair or scalp problems.",
    ],
    questions: [
      { q: "How often should men get a hair spa?", a: "It depends on your hair, scalp and the treatment, so there is no fixed schedule. Ask the professional at the salon for advice." },
      { q: "Does a hair spa stop hair fall?", a: "No one should promise that. A hair spa is a conditioning treatment, not a medical one. If you are worried about hair loss, speak to a doctor or dermatologist." },
      { q: "How long does a hair spa take?", a: "It varies by treatment. Contact the salon and the team can tell you how much time to allow. See [our hair spa FAQ](/faq#hair-spa-duration)." },
    ],
    sources: [AAD_HAIR],
    cta: {
      title: "Curious about a hair spa?",
      copy: "See what a hair spa at Express Cuts involves, or ask the team whether it suits your hair.",
      label: "Explore hair spa",
      href: "/hair-spa",
      message: "Hi, I'd like to ask about a hair spa at Express Cuts.",
    },
    related: ["mens-facial-what-to-expect", "mens-hair-color-grey-coverage-highlights-streaks", "how-often-should-men-get-a-haircut"],
  },

  {
    slug: "mens-hair-color-grey-coverage-highlights-streaks",
    title: "Men's Hair Color: Grey Coverage, Highlights and Streaks",
    metaTitle: "Men's Hair Color Styles: Grey Coverage, Highlights, Streaks",
    description:
      "Men's hair color styles explained: natural colour, grey coverage, highlights and streaks, how to choose between them, and the safety checks to know about.",
    excerpt:
      "Natural colour, grey coverage, highlights or streaks? What each one looks like, how much upkeep it takes, and what to check before any dye touches your hair.",
    category: "hair-color",
    keywords: ["men's hair color styles", "grey hair coverage for men", "hair highlights for men", "hair streaks", "natural hair colour"],
    published: LAUNCH,
    image: {
      src: "/images/hair-color/grey-coverage.jpg",
      width: 736,
      height: 1104,
      alt: "Man with neatly styled silver-grey hair and a dark beard",
      position: "50% 31%",
    },
    answer:
      "The main hair colour options for men are natural colour, grey coverage, highlights, streaks and bolder fashion shades. Grey coverage and natural colour are the most subtle. Highlights and streaks add visible contrast. The best choice depends on how noticeable you want the change to be and how often you will return to maintain it.",
    body: [
      h2("What are the main hair colour options for men?"),
      h3("Natural colour"),
      p("A shade close to your own hair. It freshens up the colour without looking dyed, and it is the safest place to start."),
      h3("Grey coverage"),
      p("Colour applied to hide grey hair, either completely or in a softer way that leaves a little natural variation. Full coverage looks clean but shows at the roots as hair grows. Softer coverage tends to look more natural and is more forgiving."),
      h3("Highlights"),
      p("Fine sections of hair are made lighter than your base colour. Highlights add depth and movement, and they often work well on textured cuts and longer tops."),
      h3("Streaks"),
      p("Streaks are bolder and more defined than highlights, and they stand out on purpose. They suit people who want a noticeable style change."),
      h3("Fashion colour"),
      p("Silver, ash and other strong shades make a statement. They usually mean lightening the hair first and need more care to keep the colour looking fresh."),

      h2("How do you choose the right hair colour?"),
      {
        t: "table",
        caption: "Men's hair colour options compared",
        head: ["Option", "How visible", "Upkeep", "Good if you want"],
        rows: [
          ["Natural colour", "Subtle", "Moderate; roots show over time", "A fresh, believable colour"],
          ["Grey coverage", "Subtle to clear", "Regular touch-ups", "To reduce or hide grey"],
          ["Highlights", "Moderate", "Moderate; grows out softly", "Depth and texture"],
          ["Streaks", "Clear", "Moderate to high", "A noticeable style change"],
          ["Fashion colour", "Bold", "High", "A statement look"],
        ],
      },
      p("A few simple questions help narrow it down. Do you want people to notice, or just to say you look well? Will you return for touch-ups? Does your workplace have expectations? Do you want to cover grey, or do you not mind some of it showing? Your barber can also judge how a shade will sit with your skin tone and base colour."),

      h2("What should you do before colouring your hair?"),
      p("This part matters most. Hair dye can cause allergic reactions, and some of them are serious. The NHS advises [testing the dye at least 48 hours before you use it](https://www.nhs.uk/conditions/hair-dye-reactions/), following the instructions in the pack, and says symptoms can take up to 72 hours to appear. NHS 111 Wales says to [patch test before every use of a permanent or semi-permanent dye](https://111.wales.nhs.uk/hairdyereactions/), even with a brand you have used before."),
      p("Before your colour appointment:"),
      ul(
        "Tell the professional if you have ever reacted to a hair dye, or to a black henna tattoo.",
        "Mention any scalp irritation, cuts or skin conditions.",
        "Ask about a patch test in advance, and leave time for it before your appointment.",
        "Do not use hair dye if you have had a previous reaction. Seek medical advice instead.",
      ),
      p("If you notice swelling, a rash or burning after colouring, wash the dye off and get medical advice. Treat swelling of the face or any difficulty breathing as an emergency."),

      h2("What happens during a hair colour session?"),
      p("At Express Cuts, the [hair colour process](/hair-color) has five stages: consultation, colour selection, application, treatment and finish. Timing depends on your hair and on the colour you choose, so ask how long to allow when you contact the salon."),

      h2("How do you look after coloured hair?"),
      ul(
        "Use a mild shampoo, and apply it to the scalp rather than scrubbing through the length.",
        "Condition after each wash. Colouring can leave hair feeling drier.",
        "Protect your hair from strong sun and limit very hot styling tools.",
        "Plan touch-ups before the regrowth line becomes obvious.",
      ),

      h2("What mistakes should you avoid?"),
      ul(
        "**Skipping the patch test.** A previous good experience does not rule out a reaction.",
        "**Going very dark to hide grey.** Flat, very dark colour can look unnatural. A softer shade is often kinder.",
        "**Colouring your hair but not your beard.** If your beard is grey, ask whether the two should match.",
        "**Using box dye for a major change.** Going much lighter is harder to do evenly at home.",
      ),

      h2("How is hair colour priced at Express Cuts?"),
      p("Hair colour at Express Cuts is currently shown as part of grooming packages rather than as a separate price. The Deluxe, Executive and Platinum combos each include a colour service, along with a haircut, beard trim, head massage and a facial. The [offers page](/offers) shows the latest packages and prices. For anything else, ask the team on the [hair colour page](/hair-color)."),
    ],
    summary: [
      "Natural colour and grey coverage are subtle; highlights and streaks are more visible.",
      "Choose by how noticeable you want it to be and how much upkeep you will do.",
      "Always follow patch-test advice. Reactions to hair dye can be serious.",
      "Look after coloured hair with mild shampoo and conditioner.",
    ],
    questions: [
      { q: "Can men cover only some of their grey?", a: "Yes, softer coverage is possible and often looks more natural than full colour. Ask your barber what suits your hair." },
      { q: "How long does hair colour last on men?", a: "It depends on the type of colour and how fast your hair grows. Permanent colour remains in the hair, but the roots will show as new hair grows out." },
      { q: "Do you offer grey coverage at Express Cuts?", a: "Yes. Grey coverage is one of the looks on our [hair colour page](/hair-color), and our [hair colour FAQs](/faq#grey-coverage) have more detail." },
    ],
    sources: [NHS_DYE, NHS_WALES_DYE],
    cta: {
      title: "Thinking about colour?",
      copy: "See the looks and packages at Express Cuts, then talk through the options with the team.",
      label: "Explore hair color",
      href: "/hair-color",
      message: "Hi, I'd like to ask about hair colour at Express Cuts.",
    },
    related: ["mens-haircut-styles-how-to-choose", "hair-spa-vs-regular-hair-wash", "mens-facial-what-to-expect"],
  },

  {
    slug: "express-cuts-kr-puram-first-visit-guide",
    title: "Visiting Express Cuts in KR Puram: A First-Visit Guide",
    metaTitle: "Visiting Express Cuts in KR Puram: First-Visit Guide",
    description:
      "Planning a first visit to Express Cuts in KR Puram? Find the location, opening hours, walk-in details, services and the easiest ways to reach the salon.",
    excerpt:
      "Where to find us, when we are open, whether to walk in or message first, and how to get the most from your first appointment.",
    category: "salon",
    keywords: ["Express Cuts KR Puram", "salon in Ayyappa Nagar", "unisex salon KR Puram", "salon near Hoodi Circle"],
    published: LAUNCH,
    image: {
      src: "/images/gallery/express-cuts-salon-interior-kr-puram.webp",
      width: 1448,
      height: 1086,
      alt: "Inside Express Cuts in KR Puram: reception desk, styling chairs and marble floor",
      position: "50% 50%",
    },
    answer:
      `Express Cuts is a unisex salon at ${SITE.addressLines.join(" ").replace(/,$/, "")}, about 2 KM from Hoodi Circle. It opens every day, and walk-ins are welcome. You can also call ${SITE.phoneDisplay} or message on WhatsApp before you come.`,
    body: [
      h2("Where is Express Cuts?"),
      p(`The salon is on Ayyappa Nagar Main Road in Priyadarshini Layout, Krishnarajapuram, Bengaluru, roughly 2 KM from Hoodi Circle. The full address is ${SITE.addressLines.join(" ").replace(/,$/, "")}. The quickest way to find it is to [open the Google Maps listing](${SITE.mapsUrl}).`),

      h2("What are the opening hours?"),
      ul(...HOURS.map((row) => `**${row.label}:** ${row.display}`)),

      h2("Do you need an appointment?"),
      p(`No. Walk-ins are welcome. If you would rather plan ahead, [message the salon on WhatsApp](${waLink("Hi, I'd like to visit Express Cuts.")}) or [call ${SITE.phoneDisplay}](${TEL}) to check a suitable time.`),

      h2("What services can you get?"),
      p("Express Cuts covers everyday grooming and longer treatments. Each service has its own page, with more detail on what is available:"),
      ul(
        "[Haircuts and styling](/hair), from classic cuts to fades and tapers",
        "[Beard grooming](/beard), including trims, line-ups and clean shaves",
        "[Facials](/facial), including Type 1 to Type 4 facials and the Hydra Facial",
        "[Hair spa](/hair-spa), with cleansing, massage and treatment",
        "[Hair colour](/hair-color), including grey coverage, highlights and streaks",
      ),

      h2("What do offers and packages cost?"),
      p(`Prices are published on the [offers page](/offers), which always has the current list. At the time of writing, a men's haircut is ${inr2(offer("haircut").price)}, and the Classic Combo of a haircut, beard trim and head massage is ${inr2(offer("classic").price)}.`),

      h2("How do you get the most from a first visit?"),
      ol(
        "Bring a photo or two of the look you want.",
        "Allow enough time, particularly if you are planning a facial, hair spa or hair colour. Ask how long to set aside when you message.",
        "Tell the team about any skin sensitivity or previous reactions to hair dye.",
        "Ask how to maintain the style at home before you leave.",
      ),

      h2("What is the salon like?"),
      p(`You can see the reception, styling floor and wash area in the [salon gallery](/gallery), and read how Express Cuts began in [our story](/our-story). The salon has been running in KR Puram since ${SITE.established}.`),
    ],
    summary: [
      "Express Cuts is on Ayyappa Nagar Main Road, about 2 KM from Hoodi Circle.",
      "The salon opens every day, and walk-ins are welcome.",
      "Call or WhatsApp if you would like to check a time first.",
      "Current prices are always on the offers page.",
    ],
    questions: [
      { q: "Is Express Cuts a unisex salon?", a: "Yes. Express Cuts is a unisex salon. This website focuses on men's grooming, so please contact the salon to ask about any other service you are looking for." },
      { q: "Is the salon open on weekends?", a: "Yes. It opens from 7:00 AM to 10:00 PM on Saturdays and Sundays." },
      { q: "Is there parking at the salon?", a: "Please contact the salon for current parking information before you visit." },
    ],
    cta: {
      title: "Come and see us",
      copy: "Read how Express Cuts started and what we care about, or send a message to plan your visit.",
      label: "Read our story",
      href: "/our-story",
      message: "Hi, I'd like to visit Express Cuts. What time works today?",
    },
    related: ["how-often-should-men-get-a-haircut", "mens-haircut-styles-how-to-choose", "mens-facial-what-to-expect"],
  },
];

/* ───────────────────────── Lookups ───────────────────────── */

export const getPost = (slug: string) => BLOG_POSTS.find((post) => post.slug === slug);

export const postModified = (post: BlogPost) => post.updated ?? post.published;

export const categoryOf = (post: Pick<BlogPost, "category">) =>
  BLOG_CATEGORIES.find((c) => c.id === post.category)!;

const blockText = (block: Block): string => {
  if (block.t === "ul" || block.t === "ol") return block.items.join(" ");
  if (block.t === "table") return [...block.head, ...block.rows.flat()].join(" ");
  return block.text;
};

/** At the usual 200 words a minute, from the words the reader will actually see */
export function readingMinutes(post: BlogPost) {
  const words = [post.answer, ...post.body.map(blockText), ...post.summary, ...post.questions.flatMap((q) => [q.q, q.a])]
    .map(plainText)
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

const DATE = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata" });
export const formatDate = (iso: string) => DATE.format(new Date(`${iso}T00:00:00+05:30`));

/** What a listing needs of an article; the bodies stay out of the client bundle */
export type PostCard = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategoryId;
  categoryLabel: string;
  published: string;
  date: string;
  minutes: number;
  image: BlogPost["image"];
  /** Lower-cased title, excerpt, category, keywords and section headings */
  haystack: string;
};

export const toCard = (post: BlogPost): PostCard => ({
  slug: post.slug,
  title: post.title,
  excerpt: post.excerpt,
  category: post.category,
  categoryLabel: categoryOf(post).short,
  published: post.published,
  date: formatDate(post.published),
  minutes: readingMinutes(post),
  image: post.image,
  haystack: [
    post.title,
    post.excerpt,
    categoryOf(post).label,
    ...post.keywords,
    ...post.body.filter((b) => b.t === "h2" || b.t === "h3").map(blockText),
  ]
    .join(" ")
    .toLowerCase(),
});
