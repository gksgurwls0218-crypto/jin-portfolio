import KpiIndex, { type IndexItem } from "@/components/kpi/KpiIndex";
import { ESSAYS } from "@/lib/essays";
import { ESSAYS_KO } from "@/lib/essaysContent.ko";
import { isLocale, type Locale } from "@/lib/i18n";

const HEAD: Record<Locale, { eyebrow: string; title: string; accent: string; intro: string; backLabel: string }> = {
  en: {
    eyebrow: "02 / New concepts",
    title: "Tactical terms",
    accent: "I made",
    intro: "New concepts to prove Variation Theory is applicable and reliable. A lab to make new things, theories, name the spaces, and evolve football.",
    backLabel: "Match Analysis & Essays",
  },
  ko: {
    eyebrow: "02 / 새로운 개념",
    title: "내가 만든",
    accent: "전술 용어",
    intro: "변이 이론이 작동하기 위해, 축구의 진화를 위해 직접 만든 개념들과 시각",
    backLabel: "경기 분석 & 새로운 개념",
  },
};

export default async function EssaysIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const h = HEAD[locale];
  const items: IndexItem[] = ESSAYS.map((e) => ({
    href: `/match-analysis/essays/${e.id}`,
    title: locale === "ko" ? e.ko : e.title,
    sub: locale === "ko" ? ESSAYS_KO[e.id]?.category ?? e.category : e.category,
    short: locale === "ko" ? ESSAYS_KO[e.id]?.blurb ?? e.blurb : e.blurb,
  }));
  return <KpiIndex eyebrow={h.eyebrow} title={h.title} accent={h.accent} intro={h.intro} items={items} backHref="/match-analysis" backLabel={h.backLabel} />;
}
