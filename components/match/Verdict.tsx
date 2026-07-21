import Link from "next/link";
import { CONCEPTS, conceptHref, type ConceptId } from "@/lib/concepts";
import MatchSectionShell from "./MatchSectionShell";

type Row = { predicted: string; observed: string; broke: string };

type Props = {
  heading: string;
  rows: Row[];
  openQuestions: string[];
  concepts?: ConceptId[];
  next?: { slug: string; label: string };
};

export default function Verdict({ heading, rows, openQuestions, concepts = [], next }: Props) {
  return (
    <MatchSectionShell id="verdict" kicker="§5 / VERDICT" heading={heading}>
      <table className="w-full max-w-[760px]" style={{ borderCollapse: "collapse", fontSize: 12, margin: "12px 0" }}>
        <thead>
          <tr>
            <th className="text-left" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: ".12em", color: "var(--green-mid)", padding: "8px 10px", borderBottom: "0.5px solid var(--green-line)" }}>FRAMEWORK PREDICTED</th>
            <th className="text-left" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: ".12em", color: "var(--green-mid)", padding: "8px 10px", borderBottom: "0.5px solid var(--green-line)" }}>OBSERVED</th>
            <th className="text-left" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: ".12em", color: "var(--green-mid)", padding: "8px 10px", borderBottom: "0.5px solid var(--green-line)" }}>WHERE IT BROKE / STRAINED</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td style={{ padding: 10, borderBottom: "0.5px solid var(--edge)", color: "var(--ink-2)", verticalAlign: "top" }}>{r.predicted}</td>
              <td style={{ padding: 10, borderBottom: "0.5px solid var(--edge)", color: "var(--ink-2)", verticalAlign: "top" }}>{r.observed}</td>
              <td style={{ padding: 10, borderBottom: "0.5px solid var(--edge)", color: "var(--ink-2)", verticalAlign: "top" }}>{r.broke || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{ fontSize: 13.5, lineHeight: 1.8, color: "var(--ink-2)" }}>
        <strong style={{ color: "var(--ink)", fontWeight: 600 }}>Open questions</strong> — {openQuestions.join(" ")}
      </p>

      <div className="flex items-center flex-wrap gap-2 mt-4">
        {concepts.length > 0 && (
          <span className="mono" style={{ fontSize: 10, color: "var(--green-mid)" }}>Concepts:</span>
        )}
        {concepts.map((id) => (
          <Link
            key={id}
            href={conceptHref(id)}
            className="mono inline-block px-2.5 py-1 rounded-md"
            style={{ fontSize: 9, color: "var(--green-mid)", border: "0.5px solid var(--green-line)", background: "var(--green-soft)" }}
          >
            {CONCEPTS[id].label}
          </Link>
        ))}
        {next && (
          <Link href={`/match-analysis/${next.slug}`} className="mono ml-auto" style={{ fontSize: 10, color: "var(--green-mid)" }}>
            → next: {next.label}
          </Link>
        )}
      </div>
    </MatchSectionShell>
  );
}
