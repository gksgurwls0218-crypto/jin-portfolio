import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KpiDetail from "@/components/kpi/KpiDetail";
import { LAB, STATUS_BADGE, findLab } from "@/lib/kpiMetrics";
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

const LABELS: Record<Locale, { back: string; what: string; from: string; status: string }> = {
  en: { back: "Data & KPI Lab", what: "What it is", from: "Built from", status: "Development status" },
  ko: { back: "데이터 & KPI 랩", what: "무엇인가", from: "무엇으로 만들었나", status: "개발 상태" },
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
      ]}
    />
  );
}
