import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { chromium } from "playwright-core";

const base = process.env.AXE_BASE || "http://127.0.0.1:4173";

function resolveChrome() {
  const fromEnv = process.env.CHROME_PATH;
  if (fromEnv && existsSync(fromEnv)) return fromEnv;
  for (const candidate of ["/usr/bin/google-chrome", "/usr/bin/google-chrome-stable"]) {
    if (existsSync(candidate)) return candidate;
  }
  const which = spawnSync("bash", ["-lc", "command -v google-chrome || command -v google-chrome-stable"], { encoding: "utf8" });
  const found = which.stdout.trim();
  if (found) return found;
  throw new Error("Chrome was not found. Set CHROME_PATH.");
}

const chrome = resolveChrome();
const routes = [
  "/",
  "/lesson/slow-connection",
  "/lesson/slow-connection/read",
  "/offline",
  "/sessions/studio",
  "/careers",
  "/verify",
  "/pipeline",
  "/savanna",
  "/demo",
  "/integrate",
  "/tracks",
  "/accessibility",
];

const browser = await chromium.launch({
  executablePath: chrome,
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const failures = [];

async function audit(page, label) {
  await page.addScriptTag({ path: "node_modules/axe-core/axe.min.js" });
  const violations = await page.evaluate(async () => {
    const result = await window.axe.run(document, {
      iframes: false,
      resultTypes: ["violations"],
    });
    return result.violations
      .filter((item) => item.impact === "critical" || item.impact === "serious")
      .map((item) => ({ id: item.id, impact: item.impact, nodes: item.nodes.length }));
  });
  if (violations.length) failures.push({ label, violations });
  else console.log("ok", label);
}

for (const route of routes) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(base + route, { waitUntil: "networkidle" });
  await audit(page, route);
  await page.close();
}

const narrow = await browser.newPage({ viewport: { width: 320, height: 640 } });
await narrow.goto(base + "/lesson/slow-connection", { waitUntil: "networkidle" });
const overflow = await narrow.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
if (overflow) failures.push({ label: "320px lesson", violations: [{ id: "reflow", impact: "serious", nodes: 1 }] });
else console.log("ok 320px lesson");
const contrast = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await contrast.goto(base + "/with-learnable/pages/concept-with-navigation.html", { waitUntil: "domcontentloaded" });
await contrast.locator("learnable-toolbar").getByRole("button", { name: "High contrast" }).click();
await contrast.addScriptTag({ path: "node_modules/axe-core/axe.min.js" });
const widgetViolations = await contrast.evaluate(async () => {
  const nodes = [...document.querySelectorAll("learnable-player, learnable-toolbar")];
  const result = await window.axe.run(nodes, { iframes: false, resultTypes: ["violations"] });
  return result.violations
    .filter((item) => item.impact === "critical" || item.impact === "serious")
    .map((item) => ({ id: item.id, impact: item.impact, nodes: item.nodes.length }));
});
if (widgetViolations.length) failures.push({ label: "high contrast widget", violations: widgetViolations });
else console.log("ok high contrast widget");
await contrast.close();

for (const route of ["/", "/integrate", "/demo", "/careers"]) {
  const phone = await browser.newPage({ viewport: { width: 320, height: 640 } });
  await phone.goto(base + route, { waitUntil: "networkidle" });
  const tooWide = await phone.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
  if (tooWide) failures.push({ label: `320px ${route}`, violations: [{ id: "reflow", impact: "serious", nodes: 1 }] });
  else console.log("ok 320px", route);
  await phone.close();
}
await narrow.close();

await browser.close();
if (failures.length) {
  console.error(JSON.stringify(failures, null, 2));
  process.exit(1);
}
console.log("axe clean");
