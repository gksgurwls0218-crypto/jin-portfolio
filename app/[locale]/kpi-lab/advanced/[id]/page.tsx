import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KpiDetail from "@/components/kpi/KpiDetail";
import LocaleLink from "@/components/LocaleLink";
import { STANDARD, WC_BADGE, findStandard } from "@/lib/kpiMetrics";
import { STANDARD_KO } from "@/lib/kpiContent.ko";
import { isLocale, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return STANDARD.map((m) => ({ id: m.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string; locale: string }> }): Promise<Metadata> {
  const { id, locale } = await params;
  const m = findStandard(id);
  if (!m) return {};
  const ko = locale === "ko" ? STANDARD_KO[id] : undefined;
  return { title: `${ko?.name ?? m.name} (${m.abbr}) | KPI Lab`, description: ko?.measures ?? m.measures };
}

const LABELS: Record<Locale, { back: string; measures: string; question: string; framework: string; example: string; reportLink: string }> = {
  en: { back: "Advanced Data & KPIs", measures: "What it measures", question: "The question it answers", framework: "In the Variation framework", example: "2026 World Cup example", reportLink: "Read the full report →" },
  ko: { back: "Advanced Data & KPI", measures: "무엇을 측정하는가", question: "답하는 질문", framework: "변이 프레임워크 안에서", example: "2026 월드컵 예시", reportLink: "전체 리포트 보기 →" },
};

const WC_CONFIDENCE_LABEL: Record<Locale, Record<"measured" | "approx", string>> = {
  en: { measured: "Measured", approx: "Approximate" },
  ko: { measured: "직접 측정", approx: "근사치" },
};

export default async function AdvancedDetailPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const m = findStandard(id);
  if (!m) notFound();
  const ko = locale === "ko" ? STANDARD_KO[id] : undefined;
  const L = LABELS[locale];

  return (
    <KpiDetail
      backHref="/kpi-lab/advanced"
      backLabel={L.back}
      kicker={m.abbr}
      title={ko?.name ?? m.name}
      blocks={[
        { label: L.measures, text: ko?.measures ?? m.measures },
        { label: L.question, text: ko?.question ?? m.question },
        { label: L.framework, text: ko?.detail ?? m.detail },
        ...(m.wc2026
          ? [{
              label: L.example,
              text: (
                <>
                  <span
                    className="mono"
                    style={{
                      fontSize: 10.5, fontWeight: 600, letterSpacing: "0.04em",
                      color: WC_BADGE[m.wc2026.confidence].color,
                      background: WC_BADGE[m.wc2026.confidence].bg,
                      border: `0.5px solid ${WC_BADGE[m.wc2026.confidence].border}`,
                      padding: "3px 10px", borderRadius: 20, display: "inline-block", marginBottom: 10,
                    }}
                  >
                    {WC_CONFIDENCE_LABEL[locale][m.wc2026.confidence]}
                  </span>
                  <br />
                  {ko?.wc2026 ?? m.wc2026.text}{" "}
                  <LocaleLink
                    href="/match-analysis/wc2026-report"
                    className="mono transition-colors duration-300 hover:[color:var(--green-bright)]"
                    style={{ color: "var(--green-mid)", fontSize: 14, whiteSpace: "nowrap" }}
                  >
                    {L.reportLink}
                  </LocaleLink>
                </>
              ),
            }]
          : []),
      ]}
    />
  );
}
