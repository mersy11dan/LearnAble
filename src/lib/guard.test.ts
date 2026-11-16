import { afterEach, describe, expect, it, vi } from "vitest";
import { allowOrigin, escapeHtml, isAllowedRequest, ownData, resetAllowlist, safeFetch } from "./guard";

afterEach(() => {
  resetAllowlist();
  vi.unstubAllGlobals();
});

describe("LearnAble guards", () => {
  it("escapes text that would otherwise be markup", () => {
    expect(escapeHtml(`<img src=x onerror="alert(1)">`)).toBe("&lt;img src=x onerror=&quot;alert(1)&quot;&gt;");
  });

  it("drops prototype keys when reading stored settings", () => {
    const parsed = JSON.parse('{"lang":"en","__proto__":{"polluted":true},"constructor":{"x":1},"prototype":{"y":1}}');
    const clean = ownData(parsed);
    expect(clean.lang).toBe("en");
    expect("__proto__" in clean).toBe(false);
    expect("constructor" in clean).toBe(false);
    expect("prototype" in clean).toBe(false);
    expect(({} as { polluted?: boolean }).polluted).toBeUndefined();
  });

  it("allows this origin and the configured base, and blocks the rest", async () => {
    expect(isAllowedRequest("/media/lesson-en.mp4")).toBe(true);
    expect(isAllowedRequest("https://evil.example/learnable.js")).toBe(false);
    allowOrigin("https://cdn.example/learnable/");
    expect(isAllowedRequest("https://cdn.example/fonts/a.woff2")).toBe(true);
    const fetchMock = vi.fn(async () => new Response("ok"));
    vi.stubGlobal("fetch", fetchMock);
    await expect(safeFetch("https://evil.example/x")).rejects.toThrow(/Blocked/);
    expect(fetchMock).not.toHaveBeenCalled();
    await safeFetch("/api/health");
    expect(fetchMock).toHaveBeenCalledOnce();
  });
});
