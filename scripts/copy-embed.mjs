import { copyFileSync, mkdirSync } from "node:fs";

mkdirSync("dist/learnable", { recursive: true });
mkdirSync("public/learnable", { recursive: true });
copyFileSync("dist/learnable.js", "dist/learnable/learnable.js");
copyFileSync("dist/learnable.js", "public/learnable/learnable.js");
console.log("copied dist/learnable.js to /learnable/learnable.js");
