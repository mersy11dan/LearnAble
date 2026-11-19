import { useState } from "react";
import { Link } from "react-router-dom";
import { demoBadge } from "../lib/badge";
import { dualDate } from "../lib/calendar";
import { issueCredential } from "../lib/credentials";

export function CertificateOffer({ courseId }: { courseId: string }) {
  const [name, setName] = useState("");
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("");
  const [link, setLink] = useState("");
  const [demo, setDemo] = useState(false);

  async function issue() {
    setBusy(true);
    setDemo(false);
    setLink("");
    setStatus("Asking the certificate service…");
    try {
      const issued = await issueCredential(courseId, name, consent);
      setLink(issued.verifyUrl);
      setStatus("Your certificate is ready.");
    } catch {
      setDemo(true);
      setLink("/verify");
      setStatus("Demo certificate. The issuing service is offline, so this is the sample badge, not one made for you.");
    } finally {
      setBusy(false);
    }
  }

  async function copy() {
    const absolute = link.startsWith("http") ? link : `${window.location.origin}${link}`;
    try {
      await navigator.clipboard.writeText(absolute);
      setStatus(demo ? "Demo certificate link copied." : "Certificate link copied.");
    } catch {
      setStatus("Select the link and copy it.");
    }
  }

  return (
    <section className="certificate" aria-labelledby="certificate-offer-title">
      <h2 id="certificate-offer-title">Get your certificate</h2>
      <p>Your name is optional. It is stored only if you tick the box.</p>
      <div className="stack">
        <label>
          <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} /> Put my name on the certificate
        </label>
        <label>
          Name
          <input value={name} onChange={(event) => setName(event.target.value)} disabled={!consent} autoComplete="name" />
        </label>
        <button type="button" onClick={() => void issue()} disabled={busy}>
          {busy ? "Issuing…" : "Get your certificate"}
        </button>
      </div>
      {status ? (
        <p id="certificate-status" role="status">
          {status}
        </p>
      ) : null}
      {demo ? (
        <article aria-describedby="certificate-status">
          <h3>Demo certificate</h3>
          <p>Open Badge for {demoBadge.credential.credentialSubject.name}</p>
          <p>Issued {dualDate(demoBadge.credential.validFrom.slice(0, 10))}.</p>
        </article>
      ) : null}
      {link ? (
        <p className="actions">
          <Link to={link}>{demo ? "Open the demo certificate" : "Open your certificate"}</Link>
          <button type="button" onClick={() => void copy()}>
            Copy link
          </button>
        </p>
      ) : null}
    </section>
  );
}
