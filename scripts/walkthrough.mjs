import { mkdir } from "node:fs/promises";
import { chromium } from "playwright-core";

const base = "http://127.0.0.1:4173";
const out = "/opt/cursor/artifacts";
await mkdir(out, { recursive: true });

const browser = await chromium.launch({
  executablePath: "/usr/bin/google-chrome",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

const context = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  recordVideo: { dir: out, size: { width: 1280, height: 800 } },
});
const page = await context.newPage();
await page.addScriptTag({ path: "node_modules/axe-core/axe.min.js" }).catch(() => undefined);

async function axe(label) {
  await page.addScriptTag({ path: "node_modules/axe-core/axe.min.js" });
  const violations = await page.evaluate(async () => {
    const result = await window.axe.run(document, { resultTypes: ["violations"] });
    return result.violations.map((item) => ({
      id: item.id,
      impact: item.impact,
      help: item.help,
      nodes: item.nodes.length,
    }));
  });
  console.log(label, JSON.stringify(violations));
  return violations;
}

await page.goto(base, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await page.screenshot({ path: `${out}/home.png`, fullPage: true });
const homeAxe = await axe("home");

await page.getByRole("link", { name: "Open the lesson" }).click();
await page.waitForURL("**/lesson/slow-connection");
await page.waitForTimeout(1000);
await page.screenshot({ path: `${out}/lesson.png`, fullPage: false });

const stage = page.getByRole("region", { name: /Lesson picture/ });
await stage.focus();
await page.keyboard.press("Space");
await page.waitForTimeout(1500);
const status = await page.locator(".status").innerText();
console.log("after space:", status);
await page.keyboard.press("c");
await page.waitForTimeout(200);
console.log("after c:", await page.locator(".status").innerText());
await page.keyboard.press("?");
await page.getByRole("heading", { name: "Keyboard shortcuts" }).waitFor();
await page.keyboard.press("Escape");
await page.screenshot({ path: `${out}/lesson-playing.png` });

await page.getByRole("button", { name: "High contrast" }).click();
await page.screenshot({ path: `${out}/lesson-contrast.png` });
await page.getByRole("button", { name: "Larger text" }).click();
await page.screenshot({ path: `${out}/lesson-large.png`, fullPage: false });

await page.setViewportSize({ width: 640, height: 900 });
await page.goto(`${base}/careers`, { waitUntil: "networkidle" });
await page.screenshot({ path: `${out}/jobs-narrow.png`, fullPage: true });
const narrowOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 2);
console.log("jobs horizontal overflow", narrowOverflow);

await page.setViewportSize({ width: 1280, height: 800 });
await page.goto(`${base}/lesson/slow-connection/read`, { waitUntil: "networkidle" });
const readAxe = await axe("read");
await page.screenshot({ path: `${out}/read.png`, fullPage: false });

const serious = [...homeAxe, ...readAxe].filter((item) => item.impact === "serious" || item.impact === "critical");
if (serious.length || !/playing/i.test(status) || narrowOverflow) {
  console.log("walkthrough issues", { serious, status, narrowOverflow });
  process.exitCode = 1;
}

const video = page.video();
await context.close();
await browser.close();
if (video) console.log("video", await video.path());
console.log("artifacts written");
