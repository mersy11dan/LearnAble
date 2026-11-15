import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright-core";
import { sendFile } from "./send-file.mjs";

const root = process.cwd();
const port = Number(process.env.A11Y_PORT || 4188);
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".mp4": "video/mp4", ".vtt": "text/vtt", ".svg": "image/svg+xml", ".png": "image/png", ".woff2": "font/woff2" };

function fileFor(urlPath) {
  if (urlPath === "/learnable/learnable.js") return join(root, "dist/learnable.js");
  if (urlPath.startsWith("/media/") || urlPath.startsWith("/fonts/") || urlPath.startsWith("/signs/")) return join(root, "public", urlPath);
  if (urlPath.startsWith("/assets/")) return join(root, "public/reference/savanna", urlPath);
  const named = { "/pages/concept-with-learnable.html": "public/with-learnable/pages/concept-with-navigation.html" };
  if (named[urlPath]) return join(root, named[urlPath]);
  const distFile = join(root, "dist", normalize(urlPath));
  if (existsSync(distFile) && statSync(distFile).isFile()) return distFile;
  return null;
}

const server = createServer((request, response) => {
  const urlPath = decodeURIComponent(new URL(request.url || "/", "http://127.0.0.1").pathname);
  if (urlPath === "/plain.html") {
    response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    response.end(`<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Plain lesson</title></head><body><main><h1>Plain lesson</h1><p>Hana opens her lesson on a phone in Addis Ababa.</p></main><script src="/learnable/learnable.js" defer></script></body></html>`);
    return;
  }
  const file = fileFor(urlPath);
  if (!file || !existsSync(file)) {
    response.writeHead(404);
    response.end("missing");
    return;
  }
  sendFile(request, response, file, types[extname(file)] || "application/octet-stream");
});
await new Promise((resolve) => server.listen(port, "127.0.0.1", resolve));
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome", headless: true, args: ["--no-sandbox", "--disable-dev-shm-usage"] });

async function unnamed(page) {
  return page.evaluate(() => {
    const nodes = [...document.querySelectorAll("button, a[href], input, select, textarea")];
    document.querySelectorAll("learnable-toolbar, learnable-player").forEach((host) => {
      host.shadowRoot?.querySelectorAll("button, a[href], input, select, textarea").forEach((node) => nodes.push(node));
    });
    return nodes
      .filter((node) => !node.closest("[hidden]") && getComputedStyle(node).display !== "none")
      .filter((node) => {
        const name = node.getAttribute("aria-label") || node.getAttribute("aria-labelledby") || node.labels?.[0]?.textContent || node.textContent || "";
        return !String(name).trim();
      })
      .map((node) => node.tagName)
      .slice(0, 8);
  });
}

const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto(`http://127.0.0.1:${port}/pages/concept-with-learnable.html`, { waitUntil: "domcontentloaded" });
const keep = page.getByRole("button", { name: "Keep LearnAble voice" });
if (await keep.count()) await keep.click();
await page.keyboard.press("Alt+Shift+L");
const first = await page.evaluate(() => document.querySelector("learnable-toolbar")?.shadowRoot?.activeElement?.getAttribute("data-act") || "");
if (first !== "move") throw new Error(`shortcut focus ${first}`);
await page.keyboard.press("Escape");
const dockHidden = await page.locator("learnable-toolbar").locator(".dock").evaluate((node) => node.hidden);
if (!dockHidden) throw new Error("escape did not collapse the toolbar");
await page.keyboard.press("Alt+Shift+L");
const missing = await unnamed(page);
if (missing.length) throw new Error(`unnamed controls ${missing.join(",")}`);
for (let step = 0; step < 20; step += 1) {
  await page.keyboard.press("Tab");
  const nameless = await page.evaluate(() => {
    const host = document.activeElement;
    const node = host?.shadowRoot?.activeElement || host;
    if (!node || node === document.body) return "";
    if (!/^(BUTTON|A|INPUT|SELECT|TEXTAREA)$/.test(node.tagName)) return "";
    const name = node.getAttribute("aria-label") || node.getAttribute("aria-labelledby") || node.labels?.[0]?.textContent || node.textContent || "";
    return String(name).trim() ? "" : node.tagName;
  });
  if (nameless) throw new Error(`tab ${step} landed on an unnamed ${nameless}`);
}
console.log("savanna names and shortcut ok");
const plain = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await plain.goto(`http://127.0.0.1:${port}/plain.html`, { waitUntil: "domcontentloaded" });
const keepPlain = plain.getByRole("button", { name: "Keep LearnAble voice" });
if (await keepPlain.count()) await keepPlain.click();
await plain.keyboard.press("Alt+Shift+L");
const signSelection = plain.locator("learnable-toolbar").locator("[data-act=sign-selection]");
await signSelection.evaluate((node) => {
  const details = node.closest("details");
  if (details) details.open = true;
  node.scrollIntoView({ block: "center", inline: "nearest" });
});
await signSelection.click();
await plain.locator("#learnable-text-sign .signer-label").waitFor();
const textLabel = await plain.locator("#learnable-text-sign .signer-label").innerText();
if (!textLabel.includes("Computer-generated signing")) throw new Error(textLabel);
console.log("plain text lesson signed");
await browser.close();
server.close();
