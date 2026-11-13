const DB = "learnable";
const STORE = "packs";

function openDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function savePack(id, data) {
  const db = await openDb();
  await new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(data, id);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
  const ids = JSON.parse(localStorage.getItem("la-downloads") || "[]");
  if (!ids.includes(id)) ids.push(id);
  localStorage.setItem("la-downloads", JSON.stringify(ids));
}

export async function getPack(id) {
  try {
    const db = await openDb();
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, "readonly");
      const q = tx.objectStore(STORE).get(id);
      q.onsuccess = () => resolve(q.result);
      q.onerror = () => reject(q.error);
    });
  } catch {
    return null;
  }
}

export function downloadedIds() {
  return JSON.parse(localStorage.getItem("la-downloads") || "[]");
}

export function queueEvent(ev) {
  const q = JSON.parse(localStorage.getItem("la-sync") || "[]");
  q.push({ ...ev, at: new Date().toISOString() });
  localStorage.setItem("la-sync", JSON.stringify(q));
}

export async function flushSync() {
  const q = JSON.parse(localStorage.getItem("la-sync") || "[]");
  if (!q.length) return { accepted: 0 };
  try {
    const res = await fetch("/api/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ learner_id: "hirut-01", events: q }),
    });
    if (!res.ok) throw new Error("sync");
    localStorage.setItem("la-sync", "[]");
    return res.json();
  } catch {
    return { accepted: 0, queued: q.length };
  }
}

export function speak(text, lang = "en") {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang === "am" ? "am-ET" : "en-GB";
  u.rate = 0.92;
  window.speechSynthesis.speak(u);
}
