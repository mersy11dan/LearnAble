import { existsSync, statSync } from "node:fs";
import { sendFile } from "./send-file.mjs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright-core";

const root = process.cwd();
const port = Number(process.env.REGRESSION_PORT || 4186);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".mp4": "video/mp4",
  ".vtt": "text/vtt",
  ".json": "application/json",
  ".svg": "image/svg+xml",
};

function fileFor(urlPath) {
  if (urlPath === "/learnable/learnable.js") return join(root, "dist/learnable.js");
  if (urlPath.startsWith("/fonts/") || urlPath.startsWith("/media/") || urlPath.startsWith("/signs/")) return join(root, "public", urlPath);
  if (urlPath.startsWith("/assets/")) return join(root, "public/reference/savanna", urlPath);
  const named = {
    "/index-learnable.html": "public/with-learnable/index.html",
    "/pages/concept-with-learnable.html": "public/with-learnable/pages/concept-with-navigation.html",
  };
  if (named[urlPath]) return join(root, named[urlPath]);
  if (urlPath === "/fixtures/gov.html") return join(root, "test/fixtures/govuk-help.html");
  const distFile = join(root, "dist", normalize(urlPath));
  if (existsSync(distFile) && statSync(distFile).isFile()) return distFile;
  return null;
}

const server = createServer((request, response) => {
  const urlPath = decodeURIComponent(new URL(request.url || "/", "http://127.0.0.1").pathname);
  if (urlPath === "/fixtures/base.html") {
    response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    response.end(`<!doctype html><html lang="en"><head>
<base href="https://en.wikipedia.org/wiki/Ada_Lovelace">
<script src="http://127.0.0.1:${port}/learnable/learnable.js" defer></script>
</head><body><main><h1>Foreign base</h1><p>A paragraph with a <a href="/wiki/Test">link</a>.</p></main></body></html>`);
    return;
  }
  const file = fileFor(urlPath);
  if (!file || !existsSync(file) || !statSync(file).isFile()) {
    response.writeHead(404);
    response.end("missing");
    return;
  }
  sendFile(request, response, file, types[extname(file)] || "application/octet-stream");
});

await new Promise((resolve) => server.listen(port, "127.0.0.1", resolve));
const base = `http://127.0.0.1:${port}`;
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--mute-audio"],
});

async function dismissVoice(page) {
  const keep = page.getByRole("button", { name: "Keep LearnAble voice" });
  if (await keep.count()) await keep.click();
}

async function assertCollapsed(page) {
  const toolbar = page.locator("learnable-toolbar");
  const dock = toolbar.locator(".dock");
  const launcher = toolbar.locator("[data-act=launcher]");
  const state = await dock.evaluate((node) => {
    const rect = node.getBoundingClientRect();
    return { width: rect.width, height: rect.height, display: getComputedStyle(node).display, hidden: node.hidden };
  });
  if (!state.hidden || state.display !== "none" || state.width !== 0 || state.height !== 0) {
    throw new Error(`dock still painted ${JSON.stringify(state)}`);
  }
  const launch = await launcher.boundingBox();
  if (!launch || launch.height < 20 || launch.height > 88 || launch.width > 240) {
    throw new Error(`launcher box ${JSON.stringify(launch)}`);
  }
  const host = await toolbar.boundingBox();
  if (!host || host.height > 110) throw new Error(`toolbar still tall ${JSON.stringify(host)}`);
  if ((await launcher.getAttribute("aria-expanded")) !== "false") throw new Error("launcher aria-expanded was not false");
}

async function dockBox(page) {
  return page.locator("learnable-toolbar").locator(".dock").evaluate((node) => {
    const rect = node.getBoundingClientRect();
    return { width: rect.width, height: rect.height, hidden: node.hidden, display: getComputedStyle(node).display };
  });
}

async function collapseFlow(page, label) {
  const toolbar = page.locator("learnable-toolbar");
  await toolbar.waitFor();
  await dismissVoice(page);
  await page.reload({ waitUntil: "domcontentloaded" });
  await toolbar.waitFor();
  await dismissVoice(page);
  await assertCollapsed(page);
  const launcher = toolbar.locator("[data-act=launcher]");
  await launcher.click();
  const open = await dockBox(page);
  if (open.hidden || open.display === "none" || open.height < 80) throw new Error(`${label} dock did not return ${JSON.stringify(open)}`);
  await toolbar.locator("[data-act=collapse]").click();
  await assertCollapsed(page);
  await launcher.click();
  const again = await dockBox(page);
  if (again.hidden || again.display === "none" || again.height < 80) throw new Error(`${label} dock did not expand again ${JSON.stringify(again)}`);
  console.log("collapsed", label);
}

const savannaContext = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const savanna = await savannaContext.newPage();
await savanna.goto(base + "/index-learnable.html", { waitUntil: "domcontentloaded" });
await collapseFlow(savanna, "savanna");
await savannaContext.close();

const govContext = await browser.newContext({ viewport: { width: 1280, height: 900 } });
await govContext.addInitScript((src) => {
  const add = () => {
    if (document.querySelector("script[data-learnable-test]")) return;
    const script = document.createElement("script");
    script.src = src;
    script.dataset.learnableTest = "1";
    (document.head || document.documentElement).append(script);
  };
  if (document.head || document.readyState !== "loading") add();
  else document.addEventListener("DOMContentLoaded", add);
}, `http://127.0.0.1:${port}/learnable/learnable.js`);
const gov = await govContext.newPage();
await gov.goto(base + "/fixtures/gov.html", { waitUntil: "domcontentloaded" });
await collapseFlow(gov, "govuk");
await govContext.close();

const narrow = await browser.newPage({ viewport: { width: 360, height: 800 } });
await narrow.goto(base + "/pages/concept-with-learnable.html", { waitUntil: "domcontentloaded" });
await dismissVoice(narrow);
await narrow.locator("[data-gloss-corrected]").filter({ hasText: "fs-ADDIS" }).waitFor({ timeout: 8000 });
const narrowOverflow = await narrow.evaluate(() => {
  const sign = document.querySelector("learnable-player")?.shadowRoot?.querySelector(".sign");
  if (!sign) return null;
  return sign.scrollWidth - sign.clientWidth;
});
if (narrowOverflow === null) throw new Error("sign panel missing at 360px");
if (narrowOverflow > 1) throw new Error(`sign panel overflow at 360px: ${narrowOverflow}`);
await narrow.close();

const zoomed = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await zoomed.goto(base + "/pages/concept-with-learnable.html", { waitUntil: "domcontentloaded" });
await dismissVoice(zoomed);
await zoomed.locator("[data-gloss-corrected]").filter({ hasText: "fs-ADDIS" }).waitFor({ timeout: 8000 });
await zoomed.evaluate(() => {
  document.documentElement.style.zoom = "200%";
});
const zoomOverflow = await zoomed.evaluate(() => {
  const sign = document.querySelector("learnable-player")?.shadowRoot?.querySelector(".sign");
  if (!sign) return null;
  return sign.scrollWidth - sign.clientWidth;
});
if (zoomOverflow === null) throw new Error("sign panel missing at 200%");
if (zoomOverflow > 1) throw new Error(`sign panel overflow at 200%: ${zoomOverflow}`);
await zoomed.close();
console.log("sign panel fits at 360px and 200%");

const requests = [];
const based = await browser.newPage({ viewport: { width: 1280, height: 900 } });
based.on("request", (request) => requests.push(request.url()));
await based.goto(base + "/fixtures/base.html", { waitUntil: "networkidle" });
const css = await based.locator("#learnable-host-adjust").textContent();
if (!css || css.includes("wikipedia.org")) throw new Error("font CSS followed the foreign base");
if (!css.includes(`http://127.0.0.1:${port}/fonts/`)) throw new Error("font CSS is not on the script origin");
const fonts = requests.filter((url) => url.includes("/fonts/"));
if (!fonts.length) throw new Error("no font request");
for (const url of fonts) {
  const host = new URL(url).host;
  if (host.includes("wikipedia")) throw new Error(url);
  if (host !== `127.0.0.1:${port}`) throw new Error(url);
}
console.log("assets stayed on the script origin", fonts.length);

const range = await fetch(`${base}/media/lesson-en.mp4`, { headers: { Range: "bytes=0-1" } });
if (range.status !== 206) throw new Error(`video range status ${range.status}`);
if (!range.headers.get("content-type")?.includes("video/mp4")) throw new Error("video content-type");
if (!String(range.headers.get("accept-ranges")).includes("bytes")) throw new Error("missing accept-ranges");
console.log("video range 206");

const layoutContext = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const layout = await layoutContext.newPage();
await layout.goto(`${base}/pages/concept-with-learnable.html`, { waitUntil: "domcontentloaded" });
await dismissVoice(layout);
await layout.locator("[data-hands] img").first().waitFor({ timeout: 8000 });
const placed = await layout.evaluate(() => {
  const player = document.querySelector("learnable-player");
  const sign = player?.shadowRoot?.querySelector(".sign");
  const hero = document.querySelector("#curriculum_navigation_content img");
  const signBox = sign?.getBoundingClientRect();
  const heroBox = hero?.getBoundingClientRect();
  const overlaps = Boolean(
    signBox && heroBox && signBox.width > 0 && heroBox.width > 0 &&
    signBox.left < heroBox.right && signBox.right > heroBox.left && signBox.top < heroBox.bottom && signBox.bottom > heroBox.top
  );
  return {
    position: player ? getComputedStyle(player).position : "",
    signWidth: signBox?.width || 0,
    rem: parseFloat(getComputedStyle(document.documentElement).fontSize) || 16,
    overlaps,
  };
});
if (placed.position === "fixed" || placed.position === "absolute") throw new Error(`player position ${placed.position}`);
if (placed.overlaps) throw new Error("sign panel overlaps a host image");
if (placed.signWidth < placed.rem * 16 - 1) throw new Error(`sign width ${placed.signWidth} rem ${placed.rem}`);
await layout.locator("learnable-player").locator(".sign").screenshot({ path: "/opt/cursor/artifacts/sign-panel-desktop.png" });
const launcher = layout.locator("learnable-toolbar").locator("[data-act=launcher]");
if (await launcher.isVisible()) await launcher.click();
await layout.locator("learnable-toolbar").locator("[data-key=contrastMode]").selectOption("bw");
const contrastPlaced = await layout.evaluate(() => {
  const sign = document.querySelector("learnable-player")?.shadowRoot?.querySelector(".sign");
  const hero = document.querySelector("#curriculum_navigation_content img");
  const signBox = sign?.getBoundingClientRect();
  const heroBox = hero?.getBoundingClientRect();
  return {
    signWidth: signBox?.width || 0,
    rem: parseFloat(getComputedStyle(document.documentElement).fontSize) || 16,
    overlaps: Boolean(signBox && heroBox && signBox.left < heroBox.right && signBox.right > heroBox.left && signBox.top < heroBox.bottom && signBox.bottom > heroBox.top),
  };
});
if (contrastPlaced.overlaps) throw new Error("high contrast sign panel overlaps a host image");
if (contrastPlaced.signWidth < contrastPlaced.rem * 16 - 1) throw new Error(`high contrast sign width ${contrastPlaced.signWidth}`);
await layout.locator("learnable-player").locator(".sign").screenshot({ path: "/opt/cursor/artifacts/sign-panel-contrast.png" });
const video = layout.locator("learnable-player > video");
const started = await video.evaluate((node) => node.currentTime);
await layout.locator("learnable-player").locator("[data-act=play]").click();
await layout.waitForTimeout(1500);
const played = await video.evaluate((node) => ({ time: node.currentTime, paused: node.paused, error: node.error ? node.error.code : 0 }));
if (!(played.time > started + 0.2) || played.error) throw new Error(`playback ${JSON.stringify(played)}`);
await layout.locator("learnable-player").locator(".stage").screenshot({ path: "/opt/cursor/artifacts/video-playing.png" });
console.log("sign panel beside the video, playback", played.time);
await layoutContext.close();
await based.close();

await browser.close();
server.close();
console.log("regressions passed");
