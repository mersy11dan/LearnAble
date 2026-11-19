import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";

type Built = {
  kind: string;
  response?: Response;
};

function loadBuilder(): (buffer: Uint8Array, type: string, range: string | null) => Built {
  const sandbox: { self: { buildRangeResponse?: (buffer: Uint8Array, type: string, range: string | null) => Built }; Uint8Array: typeof Uint8Array; Response: typeof Response; isFinite: typeof isFinite } = {
    self: {},
    Uint8Array,
    Response,
    isFinite,
  };
  const code = readFileSync(resolve(process.cwd(), "public/range-response.js"), "utf8");
  runInNewContext(code, sandbox);
  const build = sandbox.self.buildRangeResponse;
  if (!build) throw new Error("range helper did not register");
  return build;
}

describe("cached media ranges", () => {
  const build = loadBuilder();
  const cached = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);

  it("serves a 206 from the cached file with a content range", async () => {
    const built = build(cached, "audio/ogg", "bytes=0-3");
    expect(built.kind).toBe("partial");
    expect(built.response?.status).toBe(206);
    expect(built.response?.headers.get("Content-Range")).toBe("bytes 0-3/10");
    expect(built.response?.headers.get("Accept-Ranges")).toBe("bytes");
    expect(built.response?.headers.get("Content-Length")).toBe("4");
    expect(new Uint8Array(await built.response!.arrayBuffer())).toEqual(new Uint8Array([0, 1, 2, 3]));
  });

  it("serves a suffix range and rejects a missing or broken range", async () => {
    const suffix = build(cached, "video/mp4", "bytes=-4");
    expect(suffix.response?.headers.get("Content-Range")).toBe("bytes 6-9/10");
    expect(new Uint8Array(await suffix.response!.arrayBuffer())).toEqual(new Uint8Array([6, 7, 8, 9]));
    expect(build(cached, "video/mp4", null).kind).toBe("full");
    expect(build(cached, "video/mp4", "").kind).toBe("full");
    expect(build(cached, "video/mp4", "bytes=").response?.status).toBe(416);
    expect(build(cached, "video/mp4", "bytes=20-30").response?.status).toBe(416);
    expect(build(cached, "video/mp4", "not-a-range").response?.status).toBe(416);
  });
});
