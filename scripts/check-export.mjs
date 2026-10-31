import fs from "node:fs";
import path from "node:path";
const root = path.resolve("out");
const pages = ["index", "offers", "gallery", "our-story", "hair", "beard", "facial", "hair-spa", "hair-color", "404"];
for (const page of pages) {
  const html = fs.readFileSync(path.join(root, page + ".html"), "utf8");
  if (!html.includes("</html>")) throw new Error("Incomplete page: " + page);
  if (html.includes("/_next/image?")) throw new Error("Server image optimizer used: " + page);
  for (const match of html.matchAll(/(?:src|href)="(\/_next\/[^"?#]+)[^"]*"/g)) {
    if (!fs.existsSync(path.join(root, match[1]))) throw new Error("Missing asset: " + match[1]);
  }
}
for (const name of ["robots.txt", "sitemap.xml", ".htaccess"]) {
  if (!fs.statSync(path.join(root, name)).size) throw new Error("Empty file: " + name);
}
if (!fs.readFileSync(path.join(root, "sitemap.xml"), "utf8").includes("https://expresscuts.co.in"))
  throw new Error("Missing production sitemap origin");
console.log("Verified 10 HTML pages, Next assets, robots, sitemap and Hostinger rules.");

