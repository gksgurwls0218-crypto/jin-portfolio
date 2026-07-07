import Link from "next/link";
import { INDEXED_CONCEPTS } from "@/lib/concepts";

export default function ConceptIndex() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      {INDEXED_CONCEPTS.map((c) => (
        <div
          key={c.id}
          className="rounded-lg p-4"
          style={{ background: "rgba(255,255,255,.03)", border: "0.5px solid rgba(120,150,255,.2)" }}
        >
          <Link
            href={`#${c.section}`}
            className="font-medium"
            style={{ fontSize: 13.5, color: "rgba(238,234,228,.97)" }}
          >
            {c.label}
          </Link>
          <p className="mono mt-1 mb-2" style={{ fontSize: 9, color: "rgba(150,175,255,.6)" }}>{c.sectionLabel}</p>
          {c.evidence.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {c.evidence.map((e) => (
                <Link
                  key={e.slug}
                  href={`/match-analysis/${e.slug}`}
                  className="mono px-2 py-1 rounded-md"
                  style={{ fontSize: 9, background: "rgba(255,135,45,.14)", color: "rgba(255,190,115,.94)", border: "0.5px solid rgba(255,145,55,.28)" }}
                >
                  {e.label} →
                </Link>
              ))}
            </div>
          ) : (
            <p className="mono" style={{ fontSize: 9, color: "rgba(255,255,255,.3)" }}>no evidencing match yet</p>
          )}
        </div>
      ))}
    </div>
  );
}
