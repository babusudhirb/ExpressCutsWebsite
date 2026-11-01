import type { Block } from "@/data/blog-posts";
import { RichText } from "@/components/ui/RichText";

const ANCHOR = "scroll-mt-[calc(var(--nav-h)+20px)]";

/** One article block as semantic HTML, so the whole text is in the server response */
function Part({ block }: { block: Block }) {
  switch (block.t) {
    case "h2":
      return (
        <h2 id={block.id} className={`${ANCHOR} mt-10 font-display text-[clamp(1.55rem,4.6vw,1.9rem)] font-semibold leading-[1.18] tracking-[-0.01em]`}>
          {block.text}
        </h2>
      );
    case "h3":
      return <h3 className="mt-6 text-[18px] font-semibold leading-snug text-ink">{block.text}</h3>;
    case "p":
      return (
        <p className="mt-3.5">
          <RichText text={block.text} />
        </p>
      );
    case "ul":
    case "ol": {
      const List = block.t;
      return (
        <List className={`mt-3.5 space-y-2.5 pl-5 marker:text-bronze ${block.t === "ul" ? "list-disc" : "list-decimal"}`}>
          {block.items.map((item) => (
            <li key={item} className="pl-1">
              <RichText text={item} />
            </li>
          ))}
        </List>
      );
    }
    case "table":
      return (
        /* Wide tables scroll inside their own frame, never the page */
        <div tabIndex={0} role="region" aria-label={block.caption} className="mt-5 overflow-x-auto rounded-[14px] border border-line">
          <table className="w-full min-w-[560px] border-collapse text-left text-[14.5px] leading-[1.45]">
            <caption className="sr-only">{block.caption}</caption>
            <thead className="bg-cream/70 text-ink">
              <tr>
                {block.head.map((cell, i) => (
                  <th key={i} scope="col" className="px-3.5 py-3 font-semibold">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]} className="border-t border-line align-top">
                  {row.map((cell, i) =>
                    i === 0 ? (
                      <th key={i} scope="row" className="px-3.5 py-3 font-semibold text-ink">
                        {cell}
                      </th>
                    ) : (
                      <td key={i} className="px-3.5 py-3">
                        {cell}
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return blocks.map((block, i) => <Part key={i} block={block} />);
}
