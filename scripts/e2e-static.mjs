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
    console.log(`${before} ${view.width} ${view.zoom}: before ${plain.count}, with ${enhanced.count}`);
    if (view.width === 1280 && view.zoom === "100%") {
      console.log("  without", plain.violations.map((item) => `${item.id} ${item.nodes}`).join("; ") || "none");
      console.log("  with", enhanced.violations.map((item) => `${item.id} ${item.nodes}`).join("; ") || "none");
    }
    if (enhanced.count !== 0) {
      throw new Error(`${before} at ${view.width}px ${view.zoom} still has ${enhanced.count} serious issues`);
    }
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
const keepVoice = page.getByRole("button", { name: "Keep LearnAble voice" });
if (await keepVoice.count()) await keepVoice.click();
const launcher = page.locator("learnable-toolbar").locator("[data-act=launcher]");
if (await launcher.isVisible()) await launcher.click();
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
const glossLabel = await player.locator(".sign h2").innerText();
if (glossLabel !== "ASL gloss (English → ASL), not Ethiopian Sign Language") throw new Error(glossLabel);
const correctedGloss = await player.locator("[data-gloss-corrected]").innerText();
if (!correctedGloss.includes("fs-ADDIS")) throw new Error(`corrected gloss missing: ${correctedGloss}`);
const modelGloss = await player.locator("[data-gloss-model]").innerText();
if (!modelGloss.includes("ADDUS ABRAHAM")) throw new Error(`model gloss missing: ${modelGloss}`);
const correctedLabel = await player.locator("[data-corrected-term]").innerText();
if (correctedLabel !== "Corrected by hand") throw new Error(correctedLabel);
await player.locator("[data-act=captions]").click();
const amharic = await player.locator(".caption").innerText();
if (!amharic.includes("ሃና")) throw new Error(`caption did not switch: ${amharic}`);
const note = await player.locator("[data-sign-note]").innerText();
if (!note.includes("Amharic captions are not turned into ASL gloss")) throw new Error(note);
if ((await player.locator("[data-gloss-corrected]").innerText()).trim()) throw new Error("Amharic captions showed a gloss");
await player.locator("[data-act=size]").evaluate((node) => {
  node.value = "2";
  node.dispatchEvent(new Event("input", { bubbles: true }));
});
const size = await player.locator(".caption").evaluate((node) => getComputedStyle(node).fontSize);
if (parseFloat(size) < 24) throw new Error(`caption size ${size}`);
await player.locator("[data-act=preset]").selectOption("yellow");
const color = await player.locator(".caption").evaluate((node) => getComputedStyle(node).color);
if (!color.includes("255, 238, 0") && color !== "rgb(255, 238, 0)") throw new Error(`caption color ${color}`);
await player.locator("[data-act=left]").click({ force: true });
const narrowed = await player.locator(".media-row").evaluate((node) => node.style.getPropertyValue("--sign-col"));
if (!narrowed.includes("14")) throw new Error(`keyboard resize ${narrowed}`);
await page.locator("learnable-toolbar").locator("[data-corner=tr]").click();
const grip = player.locator(".sign-grip");
const box = await grip.boundingBox();
if (!box) throw new Error("sign grip missing");
await grip.hover({ position: { x: Math.min(8, box.width / 2), y: Math.min(12, box.height / 2) }, force: true });
await page.mouse.down();
await page.mouse.move(box.x - 80, box.y + 12, { steps: 8 });
await page.mouse.up();
const dragged = await player.locator(".media-row").evaluate((node) => node.style.getPropertyValue("--sign-col"));
if (dragged === narrowed) throw new Error("pointer drag did not resize the sign panel");
if ((await player.locator("[data-act=ad]").getAttribute("aria-pressed")) !== "true") throw new Error("audio description should start on");
if ((await player.locator("track[kind=descriptions]").count()) < 1) throw new Error("description track missing");
await player.locator("[data-act=ad]").click();
if ((await player.locator("[data-act=ad]").getAttribute("aria-pressed")) !== "false") throw new Error("audio description did not toggle");
if ((await player.locator(".transcript li").count()) < 6) throw new Error("transcript missing");
await player.locator(".chat").waitFor();
if (!(await player.locator(".chat").innerText()).includes("Captions are on")) throw new Error("chat missing");
const pack = page.waitForEvent("download");
await player.locator("[data-act=pack]").evaluate((node) => node.click());
await pack;
const status = await player.locator(".status").innerText();
if (!status.includes("3G pack downloaded")) throw new Error(status);
const braille = page.waitForEvent("download");
await player.locator("[data-act=braille]").evaluate((node) => node.click());
await braille;
const pdf = page.waitForEvent("download");
await player.locator("[data-act=pdf]").evaluate((node) => node.click());
await pdf;
const html = page.waitForEvent("download");
await player.locator("[data-act=html]").evaluate((node) => node.click());
await html;
await page.screenshot({ path: "/opt/cursor/artifacts/sign-panel-desktop.png" });
await page.locator("learnable-toolbar").locator("[data-key=contrastMode]").selectOption("bw");
await page.locator("learnable-toolbar").locator("[data-key=contrastLevel]").fill("10");
await page.reload({ waitUntil: "domcontentloaded" });
const mode = await page.locator("learnable-toolbar").locator("[data-key=contrastMode]").inputValue();
if (mode !== "bw") throw new Error("high contrast did not persist");
const colors = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
if (!colors) throw new Error("contrast paint missing");
await page.locator("learnable-player").locator("[data-act=job]").evaluate((node) => node.click());
await page.locator("learnable-player").locator("[data-act=badge]").evaluate((node) => node.click());
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
