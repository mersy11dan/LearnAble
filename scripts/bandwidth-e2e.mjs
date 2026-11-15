import { existsSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join } from "node:path";
import { chromium } from "playwright-core";
import { sendFile } from "./send-file.mjs";

const root = process.cwd();
const port = Number(process.env.BANDWIDTH_PORT || 4190);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".mp4": "video/mp4",
  ".vtt": "text/vtt",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".json": "application/json",
};

function fileFor(urlPath) {
  if (urlPath === "/learnable/learnable.js") return join(root, "dist/learnable.js");
  if (urlPath.startsWith("/media/") || urlPath.startsWith("/fonts/") || urlPath.startsWith("/signs/")) return join(root, "public", urlPath);
  if (urlPath.startsWith("/assets/")) return join(root, "public/reference/savanna", urlPath);
  if (urlPath.includes("concept")) return join(root, "public/with-learnable/pages/concept-with-navigation.html");
  return null;
}

const server = createServer((request, response) => {
  const urlPath = decodeURIComponent(new URL(request.url || "/", "http://127.0.0.1").pathname);
  const file = fileFor(urlPath);
  if (!file || !existsSync(file)) {
    response.writeHead(404);
    response.end("missing");
    return;
  }
  sendFile(request, response, file, types[extname(file)] || "application/octet-stream");
});
await new Promise((resolve) => server.listen(port, "127.0.0.1", resolve));

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
const client = await page.context().newCDPSession(page);
await client.send("Network.enable");
await client.send("Network.emulateNetworkConditions", {
  offline: false,
  latency: 150,
  downloadThroughput: (1.6 * 1024 * 1024) / 8,
  uploadThroughput: (750 * 1024) / 8,
});
await page.goto(`http://127.0.0.1:${port}/pages/concept-with-navigation.html`, { waitUntil: "domcontentloaded", timeout: 90000 });
const keep = page.getByRole("button", { name: "Keep LearnAble voice" });
if (await keep.count()) await keep.click();
await page.locator("#learnable-sign-window [data-hand]").waitFor({ timeout: 15000 });
const letter = await page.locator("#learnable-sign-window [data-signer-now]").innerText();
if (!letter.trim()) throw new Error("slow network did not show a letter");
await client.send("Network.emulateNetworkConditions", {
  offline: true,
  latency: 0,
  downloadThroughput: 0,
  uploadThroughput: 0,
});
await page.locator("#learnable-sign-window [data-act=replay]").click();
const still = await page.locator("#learnable-sign-window .signer-label").innerText();
if (!still.includes("not Ethiopian Sign Language")) throw new Error(still);
const launcher = page.locator("learnable-toolbar").locator("[data-act=launcher]");
if (await launcher.isVisible()) await launcher.click();
await page.locator("learnable-toolbar").locator("[data-key=largeText]").waitFor();
console.log("3G sign and offline replay ok");
await browser.close();
server.close();
