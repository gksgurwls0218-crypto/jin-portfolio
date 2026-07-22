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
    intro: "변이 이론이 적용 가능하고 신뢰할 수 있음을 증명하기 위한 새로운 개념들. 새로운 것과 이론을 만들고, 공간에 이름을 붙이고, 축구를 진화시키는 실험실.",
    backLabel: "경기 분석 & 에세이",
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
