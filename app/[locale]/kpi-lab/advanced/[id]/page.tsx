import type { Metadata } from "next";
import { notFound } from "next/navigation";
import KpiDetail from "@/components/kpi/KpiDetail";
import { STANDARD, findStandard } from "@/lib/kpiMetrics";
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

const LABELS: Record<Locale, { back: string; measures: string; question: string; framework: string }> = {
  en: { back: "Advanced Data & KPIs", measures: "What it measures", question: "The question it answers", framework: "In the Variation framework" },
  ko: { back: "고급 데이터 & KPI", measures: "무엇을 측정하는가", question: "답하는 질문", framework: "변이 프레임워크 안에서" },
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
      ]}
    />
  );
}
