import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright-core";
import axe from "axe-core";

const root = process.cwd();
const port = Number(process.env.E2E_PORT || 4183);

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".mp4": "video/mp4",
  ".wav": "audio/wav",
  ".vtt": "text/vtt",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".pdf": "application/pdf",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".json": "application/json",
};

function fileFor(urlPath) {
  if (urlPath === "/learnable/learnable.js") return join(root, "dist/learnable.js");
  if (urlPath.startsWith("/media/") || urlPath.startsWith("/fonts/")) return join(root, "public", urlPath);
  if (urlPath.startsWith("/assets/")) return join(root, "public/reference/savanna", urlPath);
  const named = {
    "/pages/concept-with-learnable.html": "public/with-learnable/pages/concept-with-navigation.html",
    "/pages/homepage-v1-paced-learnable.html": "public/with-learnable/pages/homepage-v1-paced.html",
    "/pages/homepage-v1-self-paced-learnable.html": "public/with-learnable/pages/homepage-v1-self-paced.html",
    "/index-learnable.html": "public/with-learnable/index.html",
  };
  if (named[urlPath]) return join(root, named[urlPath]);
  if (urlPath.startsWith("/pages/") || urlPath === "/index.html") return join(root, "public/reference/savanna", urlPath === "/index.html" ? "index.html" : urlPath);
  const distFile = join(root, "dist", normalize(urlPath));
  if (existsSync(distFile) && statSync(distFile).isFile()) return distFile;
  return null;
}

const server = createServer((request, response) => {
  const urlPath = decodeURIComponent(new URL(request.url || "/", "http://127.0.0.1").pathname);
  if (urlPath.startsWith("/api/")) {
    response.writeHead(404, { "content-type": "text/plain" });
    response.end("no api");
    return;
  }
  const file = fileFor(urlPath);
  if (!file || !existsSync(file) || !statSync(file).isFile()) {
    response.writeHead(404);
    response.end("missing");
    return;
  }
  response.writeHead(200, { "content-type": types[extname(file)] || "application/octet-stream" });
  createReadStream(file).pipe(response);
});

await new Promise((resolve) => server.listen(port, "127.0.0.1", resolve));
const base = `http://127.0.0.1:${port}`;

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--mute-audio"],
});
const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, acceptDownloads: true });

async function scan(path, viewport, zoom) {
  await page.setViewportSize(viewport);
  await page.goto(base + path, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.evaluate((scale) => {
    document.documentElement.style.zoom = scale;
  }, zoom);
  await page.addScriptTag({ content: axe.source });
  const violations = await page.evaluate(async () => {
    const result = await window.axe.run(document, { resultTypes: ["violations"] });
    return result.violations
      .filter((item) => item.impact === "critical" || item.impact === "serious")
      .map((item) => ({ id: item.id, impact: item.impact, nodes: item.nodes.length }));
  });
  const count = violations.reduce((sum, item) => sum + item.nodes, 0);
  return { path, viewport: viewport.width, zoom, count, violations };
}

const pairs = [
  ["/index.html", "/index-learnable.html"],
  ["/pages/homepage-v1-paced.html", "/pages/homepage-v1-paced-learnable.html"],
  ["/pages/homepage-v1-self-paced.html", "/pages/homepage-v1-self-paced-learnable.html"],
  ["/pages/concept-with-navigation.html", "/pages/concept-with-learnable.html"],
];
const viewports = [
  { width: 1280, height: 900, zoom: "100%" },
  { width: 1280, height: 900, zoom: "200%" },
  { width: 360, height: 800, zoom: "100%" },
];

const table = [];
for (const [before, after] of pairs) {
  for (const view of viewports) {
    const plain = await scan(before, view, view.zoom);
    const enhanced = await scan(after, view, view.zoom);
    const beforeIds = new Set(plain.violations.map((item) => item.id));
    const added = enhanced.violations.filter((item) => !beforeIds.has(item.id) || item.nodes > (plain.violations.find((hit) => hit.id === item.id)?.nodes || 0));
    table.push({ page: before, width: view.width, zoom: view.zoom, before: plain.count, after: enhanced.count, added: added.map((item) => `${item.id}:${item.nodes}`) });
    console.log(`${before} ${view.width} ${view.zoom}: before ${plain.count}, with ${enhanced.count}${added.length ? ` added ${added.map((item) => item.id).join(",")}` : ""}`);
  }
}

await page.setViewportSize({ width: 1280, height: 900 });
await page.evaluate(() => {
  document.documentElement.style.zoom = "100%";
});
const pluginErrors = [];
page.on("pageerror", (error) => pluginErrors.push(error.message));
const missed = [];
page.on("response", (response) => {
  const url = response.url();
  if (response.status() >= 400 && (url.includes("/media/") || url.includes("/learnable/") || url.includes("/packs/"))) {
    missed.push(`${response.status()} ${url}`);
  }
});
await page.goto(base + "/pages/concept-with-learnable.html", { waitUntil: "domcontentloaded" });
await page.evaluate(() => {
  document.documentElement.style.zoom = "100%";
});
const player = page.locator("learnable-player");
await player.waitFor();
const video = player.locator("video").first();
await video.evaluate((node) => {
  node.muted = true;
});
await player.locator(".stage").focus();
await page.keyboard.press("Space");
await page.waitForTimeout(400);
const playing = await player.locator(".status").innerText();
if (!playing.startsWith("Playing")) throw new Error(`play failed: ${playing}`);
await player.locator("[data-act=captions]").click();
const amharic = await player.locator(".caption").innerText();
if (!amharic.includes("ሃና")) throw new Error(`caption did not switch: ${amharic}`);
await player.locator("[data-act=size]").evaluate((node) => {
  node.value = "2";
  node.dispatchEvent(new Event("input", { bubbles: true }));
});
const size = await player.locator(".caption").evaluate((node) => getComputedStyle(node).fontSize);
if (parseFloat(size) < 24) throw new Error(`caption size ${size}`);
await player.locator("[data-act=preset]").selectOption("yellow");
const color = await player.locator(".caption").evaluate((node) => getComputedStyle(node).color);
if (!color.includes("255, 238, 0") && color !== "rgb(255, 238, 0)") throw new Error(`caption color ${color}`);
await player.locator("[data-act=left]").click();
const moved = await player.locator("[data-sign]").evaluate((node) => node.style.transform);
if (!moved.includes("-24")) throw new Error(`keyboard move ${moved}`);
const handle = player.locator(".sign h2");
const box = await handle.boundingBox();
if (!box) throw new Error("sign handle missing");
await page.mouse.move(box.x + 20, box.y + 10);
await page.mouse.down();
await page.mouse.move(box.x + 80, box.y + 40);
await page.mouse.up();
const dragged = await player.locator("[data-sign]").evaluate((node) => node.style.transform);
if (dragged === moved) throw new Error("pointer drag did not move the sign window");
await player.locator("[data-act=ad]").click();
if ((await player.locator("[data-act=ad]").getAttribute("aria-pressed")) !== "true") throw new Error("audio description did not toggle");
if ((await player.locator(".transcript li").count()) < 6) throw new Error("transcript missing");
await player.locator(".chat").waitFor();
if (!(await player.locator(".chat").innerText()).includes("Captions are on")) throw new Error("chat missing");
const pack = page.waitForEvent("download");
await player.locator("[data-act=pack]").click();
await pack;
const status = await player.locator(".status").innerText();
if (!status.includes("3G pack downloaded")) throw new Error(status);
const braille = page.waitForEvent("download");
await player.locator("[data-act=braille]").click();
await braille;
const pdf = page.waitForEvent("download");
await player.locator("[data-act=pdf]").click();
await pdf;
const html = page.waitForEvent("download");
await player.locator("[data-act=html]").click();
await html;
await page.locator("learnable-toolbar").locator("button", { hasText: "High contrast" }).click();
await page.reload({ waitUntil: "domcontentloaded" });
const pressed = await page.locator("learnable-toolbar").locator("button", { hasText: "High contrast" }).getAttribute("aria-pressed");
if (pressed !== "true") throw new Error("high contrast did not persist");
await page.locator("learnable-player").locator("[data-act=job]").click();
await page.locator("learnable-player").locator("[data-act=badge]").click();
const badge = await page.locator("learnable-player .status").innerText();
if (!badge.includes("proof matches")) throw new Error(badge);
const outline = await page.locator("learnable-player [data-act=play]").evaluate((node) => {
  node.focus({ focusVisible: true });
  return getComputedStyle(node).outlineStyle;
});
if (outline === "none") throw new Error("play button has no visible focus");
if (missed.length) throw new Error(`missing media ${missed.join(", ")}`);
if (pluginErrors.length) throw new Error(pluginErrors.join("\n"));

await page.screenshot({ path: "/opt/cursor/artifacts/e2e-enhanced-lesson.png" });
await page.evaluate(() => {
  document.documentElement.style.zoom = "200%";
});
await page.screenshot({ path: "/opt/cursor/artifacts/e2e-lesson-200.png" });
await page.setViewportSize({ width: 360, height: 800 });
await page.evaluate(() => {
  document.documentElement.style.zoom = "100%";
});
await page.screenshot({ path: "/opt/cursor/artifacts/e2e-lesson-360.png" });
console.log("plugin flow passed");
console.log(JSON.stringify(table, null, 2));
await browser.close();
server.close();
