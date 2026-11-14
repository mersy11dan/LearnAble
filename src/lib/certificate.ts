export type CertificateRecord = {
  id: string;
  learner: string;
  course: string;
  issued: string;
  summary: string;
};

export function canonicalCertificate(record: Pick<CertificateRecord, "id" | "learner" | "course" | "issued">): string {
  return `learnable:v1|${record.id}|${record.learner}|${record.course}|${record.issued}`;
}

export async function certificateCode(
  record: Pick<CertificateRecord, "id" | "learner" | "course" | "issued">,
): Promise<string> {
  const bytes = new TextEncoder().encode(canonicalCertificate(record));
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)]
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 12);
}
