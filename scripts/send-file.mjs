import { createReadStream, statSync } from "node:fs";

export function sendFile(request, response, file, type) {
  const size = statSync(file).size;
  const header = {
    "Content-Type": type || "application/octet-stream",
    "Accept-Ranges": "bytes",
  };
  const range = request.headers.range;
  const match = typeof range === "string" ? /bytes=(\d*)-(\d*)/.exec(range) : null;
  if (!match) {
    response.writeHead(200, { ...header, "Content-Length": size });
    createReadStream(file).pipe(response);
    return;
  }
  const start = match[1] ? Number(match[1]) : 0;
  const end = match[2] ? Number(match[2]) : size - 1;
  if (start > end || end >= size) {
    response.writeHead(416, { ...header, "Content-Range": `bytes */${size}` });
    response.end();
    return;
  }
  response.writeHead(206, {
    ...header,
    "Content-Range": `bytes ${start}-${end}/${size}`,
    "Content-Length": end - start + 1,
  });
  createReadStream(file, { start, end }).pipe(response);
}
