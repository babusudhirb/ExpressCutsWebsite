import fs from "node:fs";
import path from "node:path";

/**
 * Runs after `next build`. The export writes route data as hair/__next.hair/__PAGE__.txt
 * but the client asks for hair/__next.hair.__PAGE__.txt, so on static hosting every
 * link prefetch answers 404. This adds the flat name beside the nested file.
 */
const root = path.resolve("out");
let copied = 0;

function flatten(dir, name, into) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const flat = `${name}.${entry.name}`;
    if (entry.isDirectory()) flatten(full, flat, into);
    else {
      fs.copyFileSync(full, path.join(into, flat));
      copied += 1;
    }
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    if (entry.name.startsWith("__next.")) flatten(full, entry.name, dir);
    else if (entry.name !== "_next" && entry.name !== "_img" && entry.name !== "images") walk(full);
  }
}

walk(root);
console.log(`Added ${copied} flat route-data files.`);
