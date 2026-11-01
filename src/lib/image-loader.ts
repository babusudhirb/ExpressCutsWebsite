/**
 * Static hosting has no image server, so scripts/optimize-images.mjs writes every
 * picture to /_img at the widths below, and next/image picks the right one from
 * `sizes`. In development those files do not exist, so the original is served.
 * Keep WIDTHS here, in next.config.ts and in the script identical.
 */
export default function imageLoader({ src, width }: { src: string; width: number }) {
  if (!src.startsWith("/images/")) return src;
  if (process.env.NODE_ENV !== "production") return `${src}?w=${width}`;
  return `/_img${src.slice("/images".length).replace(/\.[^.]+$/, "")}-${width}.webp`;
}
