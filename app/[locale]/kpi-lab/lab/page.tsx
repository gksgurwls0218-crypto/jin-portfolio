import KpiIndex, { type IndexItem } from "@/components/kpi/KpiIndex";
import { LAB, STATUS_BADGE } from "@/lib/kpiMetrics";
import { LAB_KO, LAB_TYPE_KO, STATUS_LABEL_KO } from "@/lib/kpiContent.ko";
import { isLocale, type Locale } from "@/lib/i18n";

const HEAD: Record<Locale, { eyebrow: string; title: string; accent: string; intro: string; backLabel: string }> = {
  en: {
    eyebrow: "03 / Data & KPI Lab",
    title: "A Lab where new metrics",
    accent: "born",
    intro: "These are not certified KPIs. These are born to measure Variation Theory and sometimes off the beaten path. Revolutionary thoughts are sometimes originated from unusual creativity. Creativities are still on the way to establish a new thing.",
    backLabel: "Advanced Data & KPI Lab",
  },
  ko: {
    eyebrow: "03 / 데이터 & KPI 랩",
    title: "새로운 지표가 태어나는",
    accent: "실험실",
    intro: "이것들은 공인된 KPI가 아니라, 변이 이론을 측정하기 위해 때로는 정해진 길에서 벗어나 태어난 지표들이다. 남다른 창의성에서 나온 혁명적인 생각들이며, 아직 새로운 것을 정립해가는 길 위에 있다.",
    backLabel: "Advanced Data & KPI 랩",
  },
};

export default async function LabIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const h = HEAD[locale];
  const items: IndexItem[] = LAB.map((k) => {
    const badge = STATUS_BADGE[k.status];
    return {
      href: `/kpi-lab/lab/${k.id}`,
      title: locale === "ko" ? LAB_KO[k.id]?.name ?? k.name : k.name,
      sub: locale === "ko" ? `${k.code} · ${LAB_TYPE_KO[k.type] ?? k.type}` : `${k.code} · ${k.type}`,
      short: locale === "ko" ? LAB_KO[k.id]?.short ?? k.short : k.short,
      badge: locale === "ko" ? { ...badge, label: STATUS_LABEL_KO[k.status] ?? badge.label } : badge,
      tags: k.basedOn,
    };
  });
  return <KpiIndex eyebrow={h.eyebrow} title={h.title} accent={h.accent} intro={h.intro} items={items} backHref="/kpi-lab" backLabel={h.backLabel} />;
}
