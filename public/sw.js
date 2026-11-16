importScripts("range-response.js");

const CACHE = "learnable-v1";

const PRECACHE = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/icon.svg",
  "/media/lesson-en.mp4",
  "/media/lesson-am.mp4",
  "/media/lesson-en.wav",
  "/media/lesson-am.wav",
  "/media/captions-en.vtt",
  "/media/captions-am.vtt",
  "/media/descriptions.vtt",
  "/media/descriptions-am.vtt",
  "/media/poster.png",
  "/media/lesson-figure.svg",
  "/media/esl-placeholder.mp4",
  "/media/esl-placeholder.png",
  "/packs/demo/index.html",
  "/packs/demo/lesson-en.opus",
  "/packs/demo/lesson-en.m4a",
  "/packs/demo/lesson-am.opus",
  "/packs/demo/lesson-am.m4a",
  "/packs/demo/captions-en.vtt",
  "/packs/demo/captions-am.vtt",
  "/packs/demo/descriptions.vtt",
  "/packs/demo/descriptions-am.vtt",
  "/packs/demo/lesson-figure.svg",
  "/fonts/NotoSansEthiopic-Regular.ttf",
  "/fonts/NotoSerifEthiopic-Regular.ttf",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

const MEDIA_FILE = /\.(mp4|webm|wav|mp3|m4a|opus|ogg|aac)$/i;

async function serveRange(request, range) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(new Request(request.url));
  if (!cached) {
    try {
      const response = await fetch(request);
      if (response.ok && response.status !== 206) {
        cache.put(new Request(request.url), response.clone());
      }
      return response;
    } catch {
      return caches.match("/index.html");
    }
  }
  const buffer = await cached.arrayBuffer();
  const built = self.buildRangeResponse(buffer, cached.headers.get("Content-Type") || "", range);
  if (!built || built.kind === "full") return cached;
  return built.response;
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return;

  const range = request.headers.get("Range");
  if (range && MEDIA_FILE.test(url.pathname)) {
    event.respondWith(serveRange(request, range));
    return;
  }

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok && response.status !== 206) {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(() => caches.match(request).then((cached) => cached || caches.match("/index.html"))),
  );
});
