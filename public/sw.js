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
  "/media/poster.png",
  "/media/lesson-figure.svg",
  "/media/esl-placeholder.mp4",
  "/media/esl-placeholder.png",
  "/packs/demo/index.html",
  "/packs/demo/lesson-en.wav",
  "/packs/demo/lesson-am.wav",
  "/packs/demo/captions-en.vtt",
  "/packs/demo/captions-am.vtt",
  "/packs/demo/descriptions.vtt",
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

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(() => caches.match(request).then((cached) => cached || caches.match("/index.html"))),
  );
});
