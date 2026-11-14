import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const script = `    <script src="/learnable/learnable.js" defer data-learnable-enhance="true"></script>\n`;
const video = `
            <figure class="mb-4">
              <video
                controls
                playsinline
                preload="metadata"
                poster="/media/poster.png"
                src="/media/lesson-en.mp4"
                data-learnable-captions-en="/media/captions-en.vtt"
                data-learnable-captions-am="/media/captions-am.vtt"
                data-learnable-sign="/media/esl-placeholder.mp4"
                data-learnable-describe="/media/descriptions.vtt"
                data-learnable-audio-en="/media/lesson-en.wav"
                data-learnable-audio-am="/media/lesson-am.wav"
                data-learnable-offline
                data-learnable-braille
                data-learnable-docs
                style="width: 100%; max-width: 40rem; background: #111"
              >
                <track kind="captions" src="/media/captions-en.vtt" srclang="en" label="English" default />
                <track kind="captions" src="/media/captions-am.vtt" srclang="am" label="Amharic" />
              </video>
              <figcaption>A short lesson on captions, a sign window, and a slow connection.</figcaption>
            </figure>
`;

const pages = [
  ["public/reference/savanna/index.html", "public/with-learnable/index.html", false],
  ["public/reference/savanna/pages/homepage-v1-paced.html", "public/with-learnable/pages/homepage-v1-paced.html", false],
  ["public/reference/savanna/pages/homepage-v1-self-paced.html", "public/with-learnable/pages/homepage-v1-self-paced.html", false],
  ["public/reference/savanna/pages/concept-with-navigation.html", "public/with-learnable/pages/concept-with-navigation.html", true],
];

for (const [from, to, withVideo] of pages) {
  let html = readFileSync(resolve(root, from), "utf8");
  if (!html.includes("/learnable/learnable.js")) {
    html = html.replace("<head>", `<head>\n${script}`);
  }
  if (withVideo && !html.includes("data-learnable-captions-en")) {
    const marker = `            <h1 class="d-flex flex-column gap-2">
              <span>The Future of the VA Industry</span>
            </h1>`;
    if (!html.includes(marker)) throw new Error("lesson title marker missing");
    html = html.replace(marker, `${marker}\n${video}`);
  }
  mkdirSync(dirname(resolve(root, to)), { recursive: true });
  writeFileSync(resolve(root, to), html);
  console.log("wrote", to);
}
