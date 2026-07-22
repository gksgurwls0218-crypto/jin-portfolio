"use client";
import Link from "@/components/LocaleLink";
import { CONCEPTS, conceptHref, type ConceptId } from "@/lib/concepts";
import MatchSectionShell from "./MatchSectionShell";
import { useLocale } from "@/lib/useLocale";

type Row = { predicted: string; observed: string; broke: string };

type Props = {
  heading: string;
  rows: Row[];
  openQuestions: string[];
  concepts?: ConceptId[];
  next?: { slug: string; label: string };
};

const V = {
  kicker: { en: "§5 / VERDICT", ko: "§5 / 총평" },
  predicted: { en: "FRAMEWORK PREDICTED", ko: "프레임워크 예측" },
  observed: { en: "OBSERVED", ko: "관찰" },
  broke: { en: "WHERE IT BROKE / STRAINED", ko: "깨지거나 삐걱인 곳" },
  openQ: { en: "Open questions", ko: "열린 질문" },
  concepts: { en: "Concepts:", ko: "개념:" },
  next: { en: "next", ko: "다음" },
} as const;

export default function Verdict({ heading, rows, openQuestions, concepts = [], next }: Props) {
  const locale = useLocale();
  return (
    <MatchSectionShell id="verdict" kicker={V.kicker[locale]} heading={heading}>
      <table className="w-full max-w-[760px]" style={{ borderCollapse: "collapse", fontSize: 12, margin: "12px 0" }}>
        <thead>
          <tr>
            <th className="text-left" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: ".12em", color: "var(--green-mid)", padding: "8px 10px", borderBottom: "0.5px solid var(--green-line)" }}>{V.predicted[locale]}</th>
            <th className="text-left" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: ".12em", color: "var(--green-mid)", padding: "8px 10px", borderBottom: "0.5px solid var(--green-line)" }}>{V.observed[locale]}</th>
            <th className="text-left" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, letterSpacing: ".12em", color: "var(--green-mid)", padding: "8px 10px", borderBottom: "0.5px solid var(--green-line)" }}>{V.broke[locale]}</th>
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
        <strong style={{ color: "var(--ink)", fontWeight: 600 }}>{V.openQ[locale]}</strong> — {openQuestions.join(" ")}
      </p>

      <div className="flex items-center flex-wrap gap-2 mt-4">
        {concepts.length > 0 && (
          <span className="mono" style={{ fontSize: 10, color: "var(--green-mid)" }}>{V.concepts[locale]}</span>
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
            → {V.next[locale]}: {next.label}
          </Link>
        )}
      </div>
    </MatchSectionShell>
  );
}
