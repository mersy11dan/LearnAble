import { allowOrigin } from "./guard";

const base = import.meta.env.VITE_API_BASE ?? "";
if (base) allowOrigin(base);

export type IssuedCredential = {
  id: string;
  verifyUrl: string;
  jwt: string;
  credential: {
    name?: string;
    validFrom?: string;
    issuer?: { id?: string; name?: string };
    credentialSubject?: { name?: string; achievement?: { name?: string; description?: string } };
  };
};

export type CredentialCheck = {
  valid: boolean;
  issuedAt: string | null;
  issuer: string | null;
  revoked: boolean;
  error?: string;
};

async function readJson<T>(path: string, init?: RequestInit): Promise<{ ok: boolean; status: number; body: T | null }> {
  const { safeFetch } = await import("./guard");
  const response = await safeFetch(`${base}${path}`, { ...init, signal: AbortSignal.timeout(8000) });
  const body = (await response.json().catch(() => null)) as T | null;
  return { ok: response.ok, status: response.status, body };
}

export async function issueCredential(courseId: string, displayName: string, consent: boolean): Promise<IssuedCredential> {
  const result = await readJson<IssuedCredential>("/api/credentials", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ courseId, displayName: consent ? displayName : undefined, consent }),
  });
  if (!result.ok || !result.body?.id) throw new Error("The certificate service did not issue a badge.");
  return result.body;
}

export async function fetchCredential(id: string): Promise<{ status: number; body: IssuedCredential | null }> {
  const result = await readJson<IssuedCredential>(`/api/credentials/${id}`);
  return { status: result.status, body: result.body };
}

export async function checkCredential(id: string): Promise<{ status: number; body: CredentialCheck | null }> {
  const result = await readJson<CredentialCheck>(`/api/credentials/${id}/verify`);
  return { status: result.status, body: result.body };
}
