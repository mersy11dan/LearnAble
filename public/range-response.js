/* Shared by the service worker (importScripts) and the range test. */
function buildRangeResponse(buffer, contentType, rangeHeader) {
  var bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  var size = bytes.byteLength;
  var type = contentType || "application/octet-stream";
  if (rangeHeader == null || String(rangeHeader).trim() === "") {
    return { kind: "full" };
  }
  var match = /^bytes=(\d*)-(\d*)$/.exec(String(rangeHeader).trim());
  if (!match || (match[1] === "" && match[2] === "")) {
    return {
      kind: "invalid",
      response: new Response(null, {
        status: 416,
        headers: { "Content-Range": "bytes */" + size },
      }),
    };
  }
  var start;
  var end;
  if (match[1] === "") {
    var suffix = Number(match[2]);
    if (!isFinite(suffix) || suffix <= 0) {
      return {
        kind: "invalid",
        response: new Response(null, {
          status: 416,
          headers: { "Content-Range": "bytes */" + size },
        }),
      };
    }
    start = Math.max(0, size - suffix);
    end = size - 1;
  } else {
    start = Number(match[1]);
    end = match[2] === "" ? size - 1 : Number(match[2]);
  }
  if (!isFinite(start) || !isFinite(end) || start < 0 || start > end || start >= size) {
    return {
      kind: "unsatisfiable",
      response: new Response(null, {
        status: 416,
        headers: { "Content-Range": "bytes */" + size },
      }),
    };
  }
  if (end >= size) end = size - 1;
  var slice = bytes.subarray(start, end + 1);
  var body = new Uint8Array(slice);
  return {
    kind: "partial",
    response: new Response(body, {
      status: 206,
      headers: {
        "Content-Type": type,
        "Content-Range": "bytes " + start + "-" + end + "/" + size,
        "Accept-Ranges": "bytes",
        "Content-Length": String(body.byteLength),
      },
    }),
  };
}

self.buildRangeResponse = buildRangeResponse;
