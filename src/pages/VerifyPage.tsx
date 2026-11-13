import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { certificates } from "../content/certificates";
import { certificateCode, type CertificateRecord } from "../lib/certificate";

type Checked = CertificateRecord & { code: string };

export function VerifyPage() {
  const { code } = useParams();
  const [records, setRecords] = useState<Checked[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    void Promise.all(certificates.map(async (record) => ({ ...record, code: await certificateCode(record) }))).then(
      (next) => {
        if (!cancelled) setRecords(next);
      },
    );
    return () => {
      cancelled = true;
    };
  }, []);

  if (!records) {
    return (
      <div className="page">
        <Breadcrumbs items={[{ to: "/", label: "LearnAble" }, { to: "/verify", label: "Certificates" }]} />
        <h1>Checking the certificate</h1>
        <p role="status">Working out the check code.</p>
      </div>
    );
  }

  const match = code ? records.find((record) => record.code === code.toLowerCase()) : undefined;

  return (
    <div className="page">
      <Breadcrumbs
        items={[{ to: "/", label: "LearnAble" }, ...(code ? [{ to: "/verify", label: "Certificates" }] : []), { label: code ? "Check" : "Certificates" }]}
      />
      <h1>{code ? "Certificate check" : "Certificates"}</h1>
      {code ? (
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
      ) : (
        <ul className="plain">
          {records.map((record) => (
            <li key={record.id}>
              <Link to={`/verify/${record.code}`}>
                {record.learner}, {record.course}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <p className="measure">
        The code is the first 12 characters of a SHA-256 hash of the learner, the course, and the date. Change any of
        those and the link stops matching. This is a demo an employer can open. It is not a signed credential.
      </p>
    </div>
  );
}
