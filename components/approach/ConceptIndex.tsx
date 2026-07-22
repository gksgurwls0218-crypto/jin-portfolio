import Link from "@/components/LocaleLink";
import { INDEXED_CONCEPTS } from "@/lib/concepts";
import type { Locale } from "@/lib/i18n";

const KO: Record<string, { label: string; sectionLabel: string }> = {
  buffering: { label: "버퍼링", sectionLabel: "§1 표준화된 게임" },
  variable: { label: "변수", sectionLabel: "§2 두 도구: 변수와 변이" },
  mutation: { label: "변이", sectionLabel: "§2 두 도구: 변수와 변이" },
  "lure-shock": { label: "루어 앤 쇼크", sectionLabel: "§3 루어 앤 쇼크: 무기로서의 컨디셔닝" },
  "plan-a-minus": { label: "Plan A−", sectionLabel: "§3 루어 앤 쇼크: 무기로서의 컨디셔닝" },
  "two-engines": { label: "두 개의 엔진", sectionLabel: "§4 버퍼링은 왜 일어나는가: 두 엔진" },
  "pre-half-space": { label: "프리 하프스페이스", sectionLabel: "§4 버퍼링은 왜 일어나는가: 두 엔진" },
  "hybrid-build": { label: "하이브리드 3-2/3-1", sectionLabel: "§5 그 대가를 치르는 구조" },
  "four-phase-cycle": { label: "4페이즈 순환", sectionLabel: "§5 그 대가를 치르는 구조" },
  "kpi-fingerprint": { label: "KPI 지문", sectionLabel: "§6 측정하기 — 그리고 깨뜨려 보기" },
  falsification: { label: "반증", sectionLabel: "§6 측정하기 — 그리고 깨뜨려 보기" },
};

const NO_EVIDENCE = { en: "no evidencing match yet", ko: "아직 뒷받침하는 경기 없음" };

export default function ConceptIndex({ locale = "en" }: { locale?: Locale }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      {INDEXED_CONCEPTS.map((c) => {
        const ko = locale === "ko" ? KO[c.id] : undefined;
        return (
          <div
            key={c.id}
            className="rounded-lg p-4"
            style={{ background: "var(--stage-2)", border: "0.5px solid var(--green-line)" }}
          >
            <Link href={`#${c.section}`} className="font-medium" style={{ fontSize: 13.5, color: "var(--ink)" }}>
              {ko?.label ?? c.label}
            </Link>
            <p className="mono mt-1 mb-2" style={{ fontSize: 9, color: "var(--green-mid)" }}>{ko?.sectionLabel ?? c.sectionLabel}</p>
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
              <p className="mono" style={{ fontSize: 9, color: "var(--ink-4)" }}>{locale === "ko" ? NO_EVIDENCE.ko : NO_EVIDENCE.en}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
