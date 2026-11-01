import Link from "next/link";
import { parseRich } from "@/lib/rich-text";

const LINK =
  "font-medium text-bronze underline decoration-bronze/40 underline-offset-[3px] transition-colors hover:decoration-bronze";

/** Renders the inline marks described in lib/rich-text.ts */
export function RichText({ text }: { text: string }) {
  return parseRich(text).map((part, i) => {
    if (part.kind === "bold") {
      return (
        <strong key={i} className="font-semibold text-ink">
          {part.text}
        </strong>
      );
    }
    if (part.kind === "text") return part.text;
    if (part.href.startsWith("/")) {
      return (
        <Link key={i} href={part.href} className={LINK}>
          {part.text}
        </Link>
      );
    }
    const external = part.href.startsWith("http");
    return (
      <a key={i} href={part.href} className={LINK} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {part.text}
      </a>
    );
  });
}
