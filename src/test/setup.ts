import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { toHaveNoViolations } from "jest-axe";
import { afterEach, expect } from "vitest";

expect.extend(toHaveNoViolations);

function memoryStorage(): Storage {
  const store = new Map<string, string>();
  return {
    get length() {
      return store.size;
    },
    clear() {
      store.clear();
    },
    getItem(key) {
      return store.has(key) ? store.get(key)! : null;
    },
    key(index) {
      return [...store.keys()][index] ?? null;
    },
    removeItem(key) {
      store.delete(key);
    },
    setItem(key, value) {
      store.set(String(key), String(value));
    },
  };
}

if (typeof localStorage === "undefined" || typeof localStorage.clear !== "function") {
  Object.defineProperty(globalThis, "localStorage", { value: memoryStorage(), configurable: true });
}
if (typeof sessionStorage === "undefined" || typeof sessionStorage.clear !== "function") {
  Object.defineProperty(globalThis, "sessionStorage", { value: memoryStorage(), configurable: true });
}

afterEach(() => {
  cleanup();
  localStorage.clear();
  sessionStorage.clear();
  document.documentElement.lang = "en";
});

HTMLMediaElement.prototype.play = () => Promise.resolve();
HTMLMediaElement.prototype.pause = () => undefined;
