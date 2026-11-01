import fs from "node:fs";
import path from "node:path";

const root = path.resolve("out");
const origin = "https://expresscuts.co.in";

for (const name of ["robots.txt", "sitemap.xml", "llms.txt", ".htaccess", "404.html"]) {
  if (!fs.statSync(path.join(root, name)).size) throw new Error("Empty file: " + name);
}

/* Every page the sitemap promises must exist as a folder index, or the host answers 403 */
const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
if (!urls.length) throw new Error("Sitemap has no URLs");

for (const url of urls) {
  if (!url.startsWith(origin + "/") || !url.endsWith("/")) throw new Error("Bad sitemap URL: " + url);
  const file = path.join(root, url.slice(origin.length), "index.html");
  const html = fs.readFileSync(file, "utf8");
  if (!html.includes("</html>")) throw new Error("Incomplete page: " + url);
  if (html.includes("/_next/image?")) throw new Error("Server image optimizer used: " + url);
  if (!html.includes(`rel="canonical" href="${url}"`)) throw new Error("Canonical does not match: " + url);
  for (const match of html.matchAll(/(?:src|href)="(\/_next\/[^"?#]+)[^"]*"/g)) {
    if (!fs.existsSync(path.join(root, match[1]))) throw new Error("Missing asset: " + match[1]);
  }
  /* Next.js URL-encodes the paths it writes into the page */
  for (const match of html.matchAll(/\/_img\/[^"\s,&]+\.webp/g)) {
    if (!fs.existsSync(path.join(root, decodeURIComponent(match[0])))) throw new Error("Missing image: " + match[0]);
  }
}
console.log(`Verified ${urls.length} pages, Next assets, robots, sitemap, llms.txt and Hostinger rules.`);
