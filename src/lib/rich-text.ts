/**
 * Blog and FAQ copy is plain strings with two inline marks: `[label](href)` and
 * `**bold**`. The same string feeds the page and the JSON-LD, so a structured-data
 * answer can never drift from the words on screen.
 */

export type RichPart =
  | { kind: "text"; text: string }
  | { kind: "bold"; text: string }
  | { kind: "link"; text: string; href: string };

const MARK = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;

export function parseRich(source: string): RichPart[] {
  const parts: RichPart[] = [];
  let at = 0;
  for (const match of source.matchAll(MARK)) {
    if (match.index > at) parts.push({ kind: "text", text: source.slice(at, match.index) });
    if (match[1]) parts.push({ kind: "link", text: match[1], href: match[2] });
    else parts.push({ kind: "bold", text: match[3] });
    at = match.index + match[0].length;
  }
  if (at < source.length) parts.push({ kind: "text", text: source.slice(at) });
  return parts;
}

/** The same string as a reader would read it: labels kept, marks gone */
export const plainText = (source: string) =>
  parseRich(source)
    .map((part) => part.text)
    .join("");
