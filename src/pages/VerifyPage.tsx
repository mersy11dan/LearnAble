import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { certificates } from "../content/certificates";
import { demoBadge, verifyOpenBadge } from "../lib/badge";
import { dualDate } from "../lib/calendar";
import { certificateCode, type CertificateRecord } from "../lib/certificate";
import { checkCredential, fetchCredential, type CredentialCheck, type IssuedCredential } from "../lib/credentials";

type Checked = CertificateRecord & { code: string };
type ApiView =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "missing"; message: string }
  | { kind: "failed"; message: string }
  | { kind: "ready"; record: IssuedCredential; check: CredentialCheck };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function statusText(check: CredentialCheck): string {
  if (check.revoked) return "This certificate has been revoked.";
  if (!check.valid) return "This certificate is not valid.";
  return "This certificate is valid.";
}

export function VerifyPage() {
  const { code } = useParams();
  const [records, setRecords] = useState<Checked[] | null>(null);
  const [badgeOk, setBadgeOk] = useState<boolean | null>(null);
  const [api, setApi] = useState<ApiView>({ kind: "idle" });
  const issuedId = code && UUID.test(code) ? code : "";

  useEffect(() => {
    let cancelled = false;
    void Promise.all(certificates.map(async (record) => ({ ...record, code: await certificateCode(record) }))).then(
      (next) => {
        if (!cancelled) setRecords(next);
      },
    );
    void verifyOpenBadge().then((ok) => {
      if (!cancelled) setBadgeOk(ok);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!issuedId) {
      setApi({ kind: "idle" });
      return;
    }
    let cancelled = false;
    setApi({ kind: "loading" });
    void (async () => {
      try {
        const [record, check] = await Promise.all([fetchCredential(issuedId), checkCredential(issuedId)]);
        if (cancelled) return;
        if (record.status === 404 || check.status === 404) {
          setApi({ kind: "missing", message: "No certificate with that link was found." });
          return;
        }
        if (!record.body || !check.body) {
          setApi({ kind: "failed", message: "This certificate could not be loaded." });
          return;
        }
        setApi({ kind: "ready", record: record.body, check: check.body });
      } catch {
        if (!cancelled) setApi({ kind: "failed", message: "The certificate service is offline. Nothing was verified." });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [issuedId]);

  if (!records) {
    return (
      <div className="page">
        <Breadcrumbs items={[{ to: "/", label: "LearnAble" }, { to: "/verify", label: "Certificates" }]} />
        <h1>Checking the certificate</h1>
        <p role="status">Working out the check code.</p>
      </div>
    );
  }

  const match = code && !issuedId ? records.find((record) => record.code === code.toLowerCase()) : undefined;
  const achievement = api.kind === "ready" ? api.record.credential.credentialSubject?.achievement?.name || api.record.credential.name : "";
  const issuedOn = api.kind === "ready" && api.check.issuedAt ? dualDate(api.check.issuedAt.slice(0, 10)) : "";

  return (
    <div className="page">
      <Breadcrumbs
        items={[{ to: "/", label: "LearnAble" }, ...(code ? [{ to: "/verify", label: "Certificates" }] : []), { label: code ? "Check" : "Certificates" }]}
      />
      <h1>{code ? "Certificate check" : "Certificates"}</h1>
      {issuedId ? (
        <article className="certificate" aria-describedby="issued-status">
          {api.kind === "loading" ? <p id="issued-status" role="status">Loading the certificate…</p> : null}
          {api.kind === "missing" || api.kind === "failed" ? (
            <p id="issued-status" role="alert">
              {api.message}
            </p>
          ) : null}
          {api.kind === "ready" ? (
            <>
              <h2>{achievement || "Certificate"}</h2>
              <p>
                Issuer: <span className="wrap">{api.check.issuer || "Unknown issuer"}</span>
              </p>
              {api.record.credential.credentialSubject?.name ? <p>Learner: {api.record.credential.credentialSubject.name}</p> : <p>Learner name was not stored.</p>}
              <p>Issued {issuedOn}.</p>
              <p id="issued-status" role="status">
                {statusText(api.check)}
              </p>
            </>
          ) : null}
        </article>
      ) : null}
      {!issuedId ? (
        <article className="certificate">
          <h2>Open Badge for {demoBadge.credential.credentialSubject.name}</h2>
          <p>Demo certificate. Issued {dualDate(demoBadge.credential.validFrom.slice(0, 10))}.</p>
          <p role="status">{badgeOk === null ? "Checking the signature…" : badgeOk ? "The Ed25519 proof matches the published public key." : "The proof does not match."}</p>
          <p className="wrap">{demoBadge.jwt}</p>
        </article>
      ) : null}
      {!issuedId && code ? (
        match ? (
          <article className="certificate">
            <p role="status">This check code matches the demo record.</p>
            <h2>{match.learner}</h2>
            <p>{match.course}</p>
            <p>Issued {match.issued}</p>
            <p>{match.summary}</p>
            <p>
              Check code <code className="wrap">{match.code}</code>
            </p>
          </article>
        ) : (
          <p role="status">This check code does not match a LearnAble demo record.</p>
        )
      ) : null}
      {!code ? (
        <ul className="plain">
          {records.map((record) => (
            <li key={record.id}>
              <Link to={`/verify/${record.code}`}>
                {record.learner}, {record.course}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
      <p className="measure">
        Employers can open a certificate link with no login. A new badge is an Open Badges 3.0 credential signed as a VC-JWT with Ed25519. The private key stays on the server. The sample badge above is the published demo, labelled as such.
      </p>
    </div>
  );
}
