import { createReadStream, existsSync, mkdirSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join } from "node:path";
import { chromium } from "playwright-core";
import axe from "axe-core";

const root = process.cwd();
const port = Number(process.env.OPEN_WEB_PORT || 4185);
mkdirSync("/opt/cursor/artifacts", { recursive: true });
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
};

const dock = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Dock</title></head>
<body><main id="content"><h1>Dock test</h1><p>A short page for the toolbar.</p>
<button id="low" style="position:fixed;left:0.4rem;bottom:0.4rem">Low corner</button></main></body></html>`;

function fileFor(urlPath) {
  if (urlPath === "/learnable/learnable.js") return join(root, "dist/learnable.js");
  if (urlPath.startsWith("/fonts/") || urlPath.startsWith("/signs/")) return join(root, "public", urlPath);
  if (urlPath === "/dock.html") return null;
  const fixtures = {
    "/fixtures/wai.html": "test/fixtures/wai-bad-before.html",
    "/fixtures/wiki.html": "test/fixtures/wikipedia-ada.html",
    "/fixtures/gov.html": "test/fixtures/govuk-help.html",
  };
  if (fixtures[urlPath]) return join(root, fixtures[urlPath]);
  return null;
}

const server = createServer((request, response) => {
  const urlPath = decodeURIComponent(new URL(request.url || "/", "http://127.0.0.1").pathname);
  if (urlPath === "/dock.html") {
    response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    response.end(dock);
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

function stubSpeech() {
  const utterances = [];
  window.__utterances = utterances;
  const voices = [
    { lang: "en-US", name: "English", default: true, localService: true, voiceURI: "en" },
    { lang: "am-ET", name: "Amharic", default: false, localService: true, voiceURI: "am" },
  ];
  const install = () => {
    const synth = window.speechSynthesis;
    if (!synth || synth.__learnableStub) return;
    synth.getVoices = () => voices;
    synth.resume = () => undefined;
    synth.pause = () => undefined;
    synth.addEventListener = () => undefined;
    synth.speak = (utterance) => utterances.push({ type: "speak", text: utterance.text, lang: utterance.lang });
    synth.cancel = () => utterances.push({ type: "cancel" });
    synth.__learnableStub = true;
  };
  install();
  document.addEventListener("DOMContentLoaded", install);
}

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || "/usr/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage", "--mute-audio"],
});

async function audit(page) {
  await page.addScriptTag({ content: axe.source });
  return page.evaluate(async () => {
    const result = await window.axe.run(document, { resultTypes: ["violations"] });
    return result.violations
      .filter((item) => item.impact === "critical" || item.impact === "serious")
      .reduce((sum, item) => sum + item.nodes.length, 0);
  });
}

const pages = [
  ["/fixtures/wai.html", "wai"],
  ["/fixtures/wiki.html", "wiki"],
  ["/fixtures/gov.html", "gov"],
];
const sizes = [
  { width: 1280, height: 900, zoom: "100%" },
  { width: 1280, height: 900, zoom: "200%" },
  { width: 360, height: 800, zoom: "100%" },
];
const table = [];

for (const [path, name] of pages) {
  for (const size of sizes) {
    const plain = await browser.newContext();
    const beforePage = await plain.newPage({ viewport: { width: size.width, height: size.height } });
    await beforePage.goto(base + path, { waitUntil: "load", timeout: 60000 });
    await beforePage.evaluate((zoom) => { document.documentElement.style.zoom = zoom; }, size.zoom);
    const before = await audit(beforePage);
    await plain.close();

    const withScript = await browser.newContext();
    await withScript.addInitScript(stubSpeech);
    const afterPage = await withScript.newPage({ viewport: { width: size.width, height: size.height } });
    await afterPage.goto(base + path, { waitUntil: "load", timeout: 60000 });
    await afterPage.addScriptTag({ url: `${base}/learnable/learnable.js` });
    await afterPage.locator("learnable-toolbar").waitFor({ timeout: 15000 });
    await afterPage.evaluate((zoom) => { document.documentElement.style.zoom = zoom; }, size.zoom);
    const after = await audit(afterPage);
    if (size.width === 1280 && size.zoom === "100%") {
      const keep = afterPage.getByRole("button", { name: "Keep LearnAble voice" });
      if (await keep.count()) await keep.click();
      let skip = false;
      for (let step = 0; step < 8 && !skip; step += 1) {
        await afterPage.keyboard.press("Tab");
        skip = await afterPage.evaluate(() => {
          const el = document.activeElement;
          const href = el?.getAttribute?.("href") || "";
          return Boolean(el?.classList.contains("learnable-skip") || /#content|#main|#learnable-main/.test(href) || /skip/i.test(el?.textContent || ""));
        });
      }
      if (!skip) throw new Error(`${name} skip link was not reached`);
      await afterPage.keyboard.press("h");
      const heading = await afterPage.evaluate(() => /^H[1-6]$/.test(document.activeElement?.tagName || ""));
      if (!heading) throw new Error(`${name} H did not land on a heading`);
      const spoken = await afterPage.evaluate(() => (window.__utterances || []).some((item) => item.type === "speak" && /Heading|heading|ርዕስ/.test(item.text)));
      if (!spoken) throw new Error(`${name} focus was not spoken`);
      await afterPage.keyboard.press("l");
      await afterPage.keyboard.press("?");
      await afterPage.locator("#learnable-help").waitFor();
      await afterPage.keyboard.press("Escape");
      await afterPage.screenshot({ path: `/opt/cursor/artifacts/open-${name}.png` });
    }
    await withScript.close();
    table.push({ page: name, width: size.width, zoom: size.zoom, before, after });
    console.log(`${name} ${size.width} ${size.zoom}: before ${before}, after ${after}`);
  }
}

const dockContext = await browser.newContext();
const dockPage = await dockContext.newPage({ viewport: { width: 1280, height: 900 } });
await dockPage.goto(base + "/dock.html", { waitUntil: "domcontentloaded" });
await dockPage.addScriptTag({ url: `${base}/learnable/learnable.js` });
const dockBar = dockPage.locator("learnable-toolbar").locator(".bar");
await dockBar.waitFor();
const keepDock = dockPage.getByRole("button", { name: "Keep LearnAble voice" });
if (await keepDock.count()) await keepDock.click();
await dockBar.screenshot({ path: "/opt/cursor/artifacts/toolbar-expanded.png" });
await dockPage.locator("learnable-toolbar").locator("[data-act=collapse]").click();
await dockPage.locator("learnable-toolbar").locator("[data-act=launcher]").screenshot({ path: "/opt/cursor/artifacts/toolbar-collapsed.png" });
await dockPage.locator("learnable-toolbar").locator("[data-act=launcher]").click();
await dockPage.locator("learnable-toolbar").locator("[data-corner=tr]").click();
const corner = await dockPage.locator("learnable-toolbar").getAttribute("data-corner");
if (corner !== "tr") throw new Error(`corner ${corner}`);
await dockPage.screenshot({ path: "/opt/cursor/artifacts/toolbar-moved.png" });
await dockPage.locator("learnable-toolbar").locator("[data-corner=bl]").click();
await dockPage.locator("#low").focus();
const shifted = await dockPage.locator("learnable-toolbar").getAttribute("data-corner");
if (shifted === "bl") throw new Error("toolbar stayed on the focused corner");
await dockPage.screenshot({ path: "/opt/cursor/artifacts/toolbar-autoshift.png" });
await dockPage.setViewportSize({ width: 320, height: 700 });
const wide = await dockPage.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
if (wide) throw new Error("320px page is wider than the viewport");
await dockPage.screenshot({ path: "/opt/cursor/artifacts/toolbar-320.png" });
await dockContext.close();

console.log(JSON.stringify(table, null, 2));
console.log("open web passed");
await browser.close();
server.close();
