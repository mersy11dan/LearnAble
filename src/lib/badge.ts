import published from "../content/open-badge.json";

export type PublishedBadge = {
  publicKey: JsonWebKey;
  jwt: string;
  credential: {
    credentialSubject: { name: string; identifier: string; achievement: { name: string } };
    validFrom: string;
  };
};

export const demoBadge = published as PublishedBadge;

function bytes(value: string): Uint8Array<ArrayBuffer> {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/").replace(/=+$/, "");
  const out = new Uint8Array(Math.floor((normalized.length * 3) / 4));
  let buffer = 0;
  let bits = 0;
  let index = 0;
  for (const char of normalized) {
    const code = alphabet.indexOf(char);
    if (code < 0) return new Uint8Array();
    buffer = (buffer << 6) | code;
    bits += 6;
    if (bits >= 8) {
      bits -= 8;
      out[index] = (buffer >> bits) & 255;
      index += 1;
    }
  }
  return out.subarray(0, index);
}

export async function verifyOpenBadge(jwt = demoBadge.jwt, jwk: JsonWebKey = demoBadge.publicKey): Promise<boolean> {
  const [header, payload, signature] = jwt.split(".");
  if (!header || !payload || !signature) return false;
  const key = await crypto.subtle.importKey("jwk", jwk, { name: "Ed25519" }, false, ["verify"]);
  const data = new TextEncoder().encode(`${header}.${payload}`);
  return crypto.subtle.verify({ name: "Ed25519" }, key, bytes(signature), data);
}
