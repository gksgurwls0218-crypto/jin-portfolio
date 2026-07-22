import KpiIndex, { type IndexItem } from "@/components/kpi/KpiIndex";
import { STANDARD } from "@/lib/kpiMetrics";
import { STANDARD_KO } from "@/lib/kpiContent.ko";
import { isLocale, type Locale } from "@/lib/i18n";

const HEAD: Record<Locale, { eyebrow: string; title: string; accent: string; intro: string }> = {
  en: {
    eyebrow: "03 / Advanced Data & KPIs",
    title: "The metrics I read",
    accent: "matches with.",
    intro: "Established, advanced metrics — used not as decoration but to test whether Variation Theory actually shows up in the data.",
  },
  ko: {
    eyebrow: "03 / 고급 데이터 & KPI",
    title: "내가 경기를 읽는",
    accent: "지표들.",
    intro: "정립된 고급 지표들 — 장식이 아니라, 변이 이론이 실제로 데이터에 나타나는지 검증하기 위해 쓴다.",
  },
};

export default async function AdvancedIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const h = HEAD[locale];
  const items: IndexItem[] = STANDARD.map((m) => ({
    href: `/kpi-lab/advanced/${m.id}`,
    title: locale === "ko" ? STANDARD_KO[m.id]?.name ?? m.name : m.name,
    sub: m.abbr,
    short: locale === "ko" ? STANDARD_KO[m.id]?.short ?? m.short : m.short,
  }));
  const backLabel = locale === "ko" ? "고급 데이터 & KPI 랩" : "Advanced Data & KPI Lab";
  return <KpiIndex eyebrow={h.eyebrow} title={h.title} accent={h.accent} intro={h.intro} items={items} backHref="/kpi-lab" backLabel={backLabel} />;
}
