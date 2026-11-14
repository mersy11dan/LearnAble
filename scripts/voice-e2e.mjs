import { createReadStream, existsSync, mkdirSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { chromium } from "playwright-core";

const root = process.cwd();
const port = Number(process.env.VOICE_E2E_PORT || 4184);
mkdirSync("/opt/cursor/artifacts", { recursive: true });

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
  if (urlPath.startsWith("/media/") || urlPath.startsWith("/fonts/") || urlPath.startsWith("/signs/")) return join(root, "public", urlPath);
  if (urlPath.startsWith("/assets/")) return join(root, "public/reference/savanna", urlPath);
  const named = {
    "/pages/concept-with-learnable.html": "public/with-learnable/pages/concept-with-navigation.html",
    "/pages/homepage-v1-paced-learnable.html": "public/with-learnable/pages/homepage-v1-paced.html",
    "/pages/homepage-v1-self-paced-learnable.html": "public/with-learnable/pages/homepage-v1-self-paced.html",
    "/index-learnable.html": "public/with-learnable/index.html",
  };
  if (named[urlPath]) return join(root, named[urlPath]);
  const distFile = join(root, "dist", normalize(urlPath));
  if (existsSync(distFile) && statSync(distFile).isFile()) return distFile;
  return null;
}

const voiceOff = `<!doctype html><html lang="en"><head>
<script src="/learnable/learnable.js" defer data-learnable-voice="off"></script>
</head><body><main><h1>Voice off</h1><p lang="am">የንዑስ ጽሑፍ አጋር</p><button type="button">Sample</button></main></body></html>`;

const server = createServer((request, response) => {
  const urlPath = decodeURIComponent(new URL(request.url || "/", "http://127.0.0.1").pathname);
  if (urlPath === "/voice-off.html") {
    response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    response.end(voiceOff);
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
    synth.speak = (utterance) => {
      window.__lastUtterance = utterance;
      utterances.push({ type: "speak", text: utterance.text, lang: utterance.lang, rate: utterance.rate });
    };
    synth.cancel = () => {
      utterances.push({ type: "cancel" });
      const current = window.__lastUtterance;
      window.__lastUtterance = null;
      if (current && typeof current.onerror === "function") current.onerror();
    };
    synth.__learnableStub = true;
  };
  install();
  document.addEventListener("DOMContentLoaded", install);
  window.addEventListener("load", install);
}

async function spoken(page) {
  return page.evaluate(() => window.__utterances || []);
}

const pages = [
  "/index-learnable.html",
  "/pages/homepage-v1-paced-learnable.html",
  "/pages/homepage-v1-self-paced-learnable.html",
  "/pages/concept-with-learnable.html",
];

async function keyboardPass(page, path) {
  await page.goto(base + path, { waitUntil: "domcontentloaded" });
  await page.keyboard.press("Tab");
  const skip = await page.evaluate(() => document.activeElement?.className || "");
  if (!String(skip).includes("learnable-skip")) throw new Error(`${path} first tab was ${skip}`);
  await page.keyboard.press("Tab");
  await page.keyboard.press("Shift+Tab");
  const back = await page.evaluate(() => document.activeElement?.classList.contains("learnable-skip"));
  if (!back) throw new Error(`${path} Shift+Tab did not return to the skip link`);
  await page.keyboard.press("h");
  const heading = await page.evaluate(() => document.activeElement?.tagName || "");
  if (!/^H[1-6]$/.test(heading)) throw new Error(`${path} H landed on ${heading}`);
  await page.keyboard.press("Shift+H");
  await page.keyboard.press("l");
  const landmark = await page.evaluate(() => {
    const node = document.activeElement;
    return node ? `${node.tagName} ${node.getAttribute("role") || ""}` : "";
  });
  if (!/HEADER|NAV|MAIN|FOOTER|SECTION|FORM|ASIDE/.test(landmark)) throw new Error(`${path} L landed on ${landmark}`);
  await page.evaluate(() => {
    window.__helpFrom = document.activeElement;
  });
  await page.keyboard.press("?");
  const dialog = page.locator("#learnable-help");
  await dialog.waitFor();
  const labelled = await dialog.getAttribute("aria-labelledby");
  if (labelled !== "learnable-help-title") throw new Error("help dialog is not named");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Escape");
  if (await dialog.count()) throw new Error(`${path} help stayed open`);
  const returned = await page.evaluate(() => document.activeElement === window.__helpFrom);
  if (!returned) throw new Error(`${path} focus did not return from help`);
  const field = page.locator("learnable-toolbar").locator("[data-key=contrastMode]");
  await field.focus();
  await page.keyboard.press("h");
  const stayed = await page.evaluate(() => document.querySelector("learnable-toolbar")?.shadowRoot?.activeElement?.getAttribute("data-key"));
  if (stayed !== "contrastMode") throw new Error(`${path} H ran inside a select (${stayed})`);
}

const context = await browser.newContext();
await context.addInitScript(stubSpeech);
const page = await context.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto(base + "/pages/concept-with-learnable.html", { waitUntil: "domcontentloaded" });
const prompt = page.locator("#learnable-voice-prompt");
await prompt.waitFor();
const promptRole = await prompt.getAttribute("role");
if (promptRole !== "alertdialog") throw new Error(`prompt role ${promptRole}`);
const promptFocus = await page.evaluate(() => document.activeElement?.textContent || "");
if (!promptFocus.includes("Keep LearnAble voice")) throw new Error(`prompt focus ${promptFocus}`);
await prompt.screenshot({ path: "/opt/cursor/artifacts/voice-prompt.png" });
await page.keyboard.press("Enter");
await page.locator("learnable-toolbar").locator(".bar").screenshot({ path: "/opt/cursor/artifacts/voice-toggle.png" });
if ((await page.locator("learnable-toolbar").locator("[data-act=voice]").getAttribute("aria-pressed")) !== "true") {
  throw new Error("voice toggle was not pressed");
}

await page.reload({ waitUntil: "domcontentloaded" });
await page.keyboard.press("Tab");
await page.screenshot({ path: "/opt/cursor/artifacts/voice-focus.png" });
const skipFocused = await page.evaluate(() => document.activeElement?.classList.contains("learnable-skip"));
if (!skipFocused) throw new Error("tab after the prompt did not reach the skip link");

await page.keyboard.press("h");
const english = (await spoken(page)).filter((item) => item.type === "speak");
const headingSpeech = english.find((item) => item.text.includes("Heading"));
if (!headingSpeech || !headingSpeech.lang.toLowerCase().startsWith("en")) throw new Error(`heading speech ${JSON.stringify(headingSpeech)} utterances ${JSON.stringify(english)}`);

await page.evaluate(() => {
  const node = document.querySelector("[lang='am']");
  if (!node) throw new Error("missing Amharic");
  if (node.tabIndex < 0) node.tabIndex = -1;
  document.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab", bubbles: true, cancelable: true }));
  node.focus();
});
const amharic = (await spoken(page)).filter((item) => item.type === "speak").find((item) => item.lang.toLowerCase().startsWith("am"));
if (!amharic || !amharic.text.includes("የንዑስ")) throw new Error(`Amharic speech ${JSON.stringify(amharic)}`);

await page.evaluate(() => {
  const root = document.querySelector("learnable-toolbar")?.shadowRoot;
  const dock = root?.querySelector(".dock");
  const launcher = root?.querySelector("[data-act=launcher]");
  if (dock) dock.hidden = false;
  if (launcher) launcher.hidden = true;
  const button = root?.querySelector("[data-act=voice]");
  button?.getBoundingClientRect();
  document.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab", bubbles: true, cancelable: true }));
  button?.focus();
});
const voiceSpeech = (await spoken(page)).filter((item) => item.type === "speak").find((item) => item.text.includes("LearnAble voice") && item.text.includes("pressed"));
if (!voiceSpeech || !voiceSpeech.text.includes("Button")) throw new Error(`voice button speech ${JSON.stringify(voiceSpeech)}`);

const beforeInterrupt = (await spoken(page)).length;
await page.keyboard.press("Shift");
const afterInterrupt = await spoken(page);
const added = afterInterrupt.slice(beforeInterrupt);
if (!added.some((item) => item.type === "cancel")) throw new Error(`keypress did not cancel speech ${JSON.stringify(added)}`);
if (added.some((item) => item.type === "speak")) throw new Error(`keypress started a new line ${JSON.stringify(added)}`);

await page.keyboard.press("?");
await page.locator("#learnable-help").screenshot({ path: "/opt/cursor/artifacts/voice-help.png" });
await page.keyboard.press("Escape");

const video = page.locator("learnable-player > video");
await video.evaluate((node) => {
  node.muted = true;
});
const held = await video.evaluate((node) => {
  let paused = false;
  let time = 0;
  Object.defineProperty(node, "paused", { configurable: true, get: () => paused });
  Object.defineProperty(node, "currentTime", {
    configurable: true,
    get: () => time,
    set: (value) => {
      time = value;
    },
  });
  node.play = () => {
    paused = false;
    return Promise.resolve();
  };
  node.pause = () => {
    paused = true;
  };
  node.currentTime = 2.1;
  node.dispatchEvent(new Event("timeupdate"));
  return { time: node.currentTime, paused: node.paused };
});
if (!held.paused) throw new Error(`extended description did not pause the video ${JSON.stringify(held)}`);
const described = (await spoken(page)).some((item) => item.type === "speak" && item.text.includes("extended description"));
if (!described) throw new Error("extended description was not spoken");
await page.evaluate(() => window.__lastUtterance?.onend?.());
const resumed = await video.evaluate((node) => node.paused);
if (resumed) throw new Error("video stayed paused after the description");

await page.keyboard.press("Alt+Shift+S");
if ((await page.locator("learnable-toolbar").locator("[data-act=voice]").getAttribute("aria-pressed")) !== "false") {
  throw new Error("Alt+Shift+S did not turn voice off");
}
const live = await page.locator("#learnable-reader-live").innerText();
if (!live.includes("LearnAble voice off")) throw new Error(`live region ${live}`);
await page.reload({ waitUntil: "domcontentloaded" });
if (await page.locator("#learnable-voice-prompt").count()) throw new Error("prompt returned after a saved choice");
if ((await page.locator("learnable-toolbar").locator("[data-act=voice]").getAttribute("aria-pressed")) !== "false") {
  throw new Error("voice choice did not persist");
}
await context.close();

for (const path of pages) {
  const fresh = await browser.newContext();
  await fresh.addInitScript(() => localStorage.setItem("learnable-widget", JSON.stringify({ voice: true, voiceChosen: true, audioDescription: true, keyboard: true })));
  const tab = await fresh.newPage({ viewport: { width: 1280, height: 900 } });
  await keyboardPass(tab, path);
  await fresh.close();
  console.log("keyboard", path);
}

const offContext = await browser.newContext();
await offContext.addInitScript(stubSpeech);
const offPage = await offContext.newPage();
await offPage.goto(base + "/voice-off.html", { waitUntil: "domcontentloaded" });
const hostDefault = await offPage.evaluate(() => window.LearnAble.getSettings());
if (hostDefault.voice !== false || hostDefault.audioDescription !== false) throw new Error(`data-learnable-voice ignored ${JSON.stringify(hostDefault)}`);
await offPage.evaluate(() => {
  window.LearnAble.setSettings({ voice: true, voiceChosen: true });
  window.LearnAble.init({ voice: "off" });
});
const savedWins = await offPage.evaluate(() => window.LearnAble.getSettings().voice);
if (savedWins !== true) throw new Error("init({ voice: 'off' }) overrode the saved choice");
await offContext.close();

const initContext = await browser.newContext();
await initContext.addInitScript(stubSpeech);
const initPage = await initContext.newPage();
await initPage.goto(base + "/index-learnable.html", { waitUntil: "domcontentloaded" });
await initPage.evaluate(() => window.LearnAble.init({ voice: "off" }));
const inited = await initPage.evaluate(() => window.LearnAble.getSettings());
if (inited.voice !== false) throw new Error("init({ voice: 'off' }) was not honoured");
await initPage.evaluate(() => {
  document.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab", bubbles: true }));
  document.querySelector("h1")?.focus();
});
const leaked = (await spoken(initPage)).filter((item) => item.type === "speak" && item.text.includes("Heading"));
if (leaked.length) throw new Error("voice off still spoke a heading");
await initContext.close();

console.log("voice e2e passed");
await browser.close();
server.close();
