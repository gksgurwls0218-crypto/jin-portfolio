import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KpiDetail from "@/components/kpi/KpiDetail";
import LocaleLink from "@/components/LocaleLink";
import { LAB, STATUS_BADGE, WC_BADGE, findLab } from "@/lib/kpiMetrics";
import { LAB_KO, LAB_TYPE_KO, STATUS_LABEL_KO } from "@/lib/kpiContent.ko";
import { isLocale, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return LAB.map((k) => ({ id: k.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string; locale: string }> }): Promise<Metadata> {
  const { id, locale } = await params;
  const k = findLab(id);
  if (!k) return {};
  const ko = locale === "ko" ? LAB_KO[id] : undefined;
  return { title: `${ko?.name ?? k.name} | KPI Lab`, description: ko?.short ?? k.short };
}

const LABELS: Record<Locale, { back: string; what: string; from: string; status: string; example: string; reportLink: string }> = {
  en: { back: "Data & KPI Lab", what: "What it is", from: "Built from", status: "Development status", example: "2026 World Cup example", reportLink: "Read the full report →" },
  ko: { back: "데이터 & KPI 랩", what: "무엇인가", from: "무엇으로 만들었나", status: "개발 상태", example: "2026 월드컵 예시", reportLink: "전체 리포트 보기 →" },
};

const WC_CONFIDENCE_LABEL: Record<Locale, Record<"measured" | "approx", string>> = {
  en: { measured: "Measured", approx: "Approximate" },
  ko: { measured: "직접 측정", approx: "근사치" },
};

function statusText(locale: Locale, status: string, badgeLabel: string): string {
  if (locale === "ko") {
    const tail = status === "draft"
      ? "측정 방법은 정의됨. 벤치마크와 검증은 아직 남음."
      : status === "live"
      ? "실제 경기 데이터로 검증됨, 현장에서 사용 가능."
      : "측정 방법이 아직 정립되지 않은 아이디어 단계.";
    return `${badgeLabel} — ${tail}`;
  }
  const tail = status === "draft"
    ? "measurement method defined; benchmark and validation still to come."
    : status === "live"
    ? "validated on real match data and usable in the field."
    : "an idea with the measurement method still to be established.";
  return `${badgeLabel} — ${tail}`;
}

export default async function LabDetailPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { id, locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const k = findLab(id);
  if (!k) notFound();
  const ko = locale === "ko" ? LAB_KO[id] : undefined;
  const L = LABELS[locale];
  const badge = STATUS_BADGE[k.status];
  const badgeLabel = locale === "ko" ? STATUS_LABEL_KO[k.status] ?? badge.label : badge.label;
  const localBadge = { ...badge, label: badgeLabel };
  const typeLabel = locale === "ko" ? LAB_TYPE_KO[k.type] ?? k.type : k.type;
  const builtFrom = locale === "ko"
    ? `기존 KPI/데이터에 기반: ${k.basedOn.join(", ")}.`
    : `Grounded in existing KPIs/data: ${k.basedOn.join(", ")}.`;

  return (
    <KpiDetail
      backHref="/kpi-lab/lab"
      backLabel={L.back}
      kicker={`${k.code} · ${typeLabel}`}
      title={ko?.name ?? k.name}
      badge={localBadge}
      blocks={[
        { label: L.what, text: ko?.detail ?? k.detail },
        { label: L.from, text: builtFrom },
        { label: L.status, text: statusText(locale, k.status, badgeLabel) },
        ...(k.wc2026
          ? [{
              label: L.example,
              text: (
                <>
                  <span
                    className="mono"
                    style={{
                      fontSize: 10.5, fontWeight: 600, letterSpacing: "0.04em",
                      color: WC_BADGE[k.wc2026.confidence].color,
                      background: WC_BADGE[k.wc2026.confidence].bg,
                      border: `0.5px solid ${WC_BADGE[k.wc2026.confidence].border}`,
                      padding: "3px 10px", borderRadius: 20, display: "inline-block", marginBottom: 10,
                    }}
                  >
                    {WC_CONFIDENCE_LABEL[locale][k.wc2026.confidence]}
                  </span>
                  <br />
                  {ko?.wc2026 ?? k.wc2026.text}{" "}
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
