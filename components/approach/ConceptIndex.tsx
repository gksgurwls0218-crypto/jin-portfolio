import Link from "next/link";
import { INDEXED_CONCEPTS } from "@/lib/concepts";

export default function ConceptIndex() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      {INDEXED_CONCEPTS.map((c) => (
        <div
          key={c.id}
          className="rounded-lg p-4"
          style={{ background: "var(--stage-2)", border: "0.5px solid var(--green-line)" }}
        >
          <Link
            href={`#${c.section}`}
            className="font-medium"
            style={{ fontSize: 13.5, color: "var(--ink)" }}
          >
            {c.label}
          </Link>
          <p className="mono mt-1 mb-2" style={{ fontSize: 9, color: "var(--green-mid)" }}>{c.sectionLabel}</p>
          {c.evidence.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {c.evidence.map((e) => (
                <Link
                  key={e.slug}
                  href={`/match-analysis/${e.slug}`}
                  className="mono px-2 py-1 rounded-md"
                  style={{ fontSize: 9, background: "rgba(51,51,47,.14)", color: "rgba(35,35,33,.94)", border: "0.5px solid rgba(51,51,47,.32)" }}
                >
                  {e.label} →
                </Link>
              ))}
            </div>
          ) : (
            <p className="mono" style={{ fontSize: 9, color: "var(--ink-4)" }}>no evidencing match yet</p>
          )}
        </div>
      ))}
    </div>
  );
}
