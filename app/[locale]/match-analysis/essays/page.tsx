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

const SERIES: Record<Locale, IndexItem[]> = {
  en: [
    {
      href: "/match-analysis/essays/signature-move-1",
      title: "What Comes Out Under Pressure",
      sub: "Signature Move series · Part 1",
      short:
        "Escaping a press is a time-budget problem. Count the time the attacker pays himself and the break-even point drops from 0.367 s to 0.20 s — which shows where standardised coaching has to stop.",
    },
    {
      href: "/match-analysis/essays/signature-move-2",
      title: "Several Kinds of Football in One Match",
      sub: "Signature Move series · Part 2",
      short:
        "The press moved back, one player works in two shapes, blocks are mixed within a match and their height moves 20 m+. Multiplied contexts cannot be filled with more techniques.",
    },
  ],
  ko: [
    {
      href: "/match-analysis/essays/signature-move-1",
      title: "급할 때 나오는 것",
      sub: "Signature Move 연재 · 1편",
      short:
        "압박을 벗기는 일은 시간 예산 문제다. 공격수 본인이 치르는 시간까지 세면 손익분기점이 0.367초에서 0.20초로 내려오고, 육성에서 획일화가 멈춰야 할 지점이 드러난다.",
    },
    {
      href: "/match-analysis/essays/signature-move-2",
      title: "한 경기 안의 여러 축구",
      sub: "Signature Move 연재 · 2편",
      short:
        "사람이 붙는 자리가 뒤로 왔고, 한 선수가 두 형태에서 일하고, 한 경기 안에 블록이 섞이고 그 높이가 20m 넘게 움직인다. 늘어난 맥락은 기술의 개수로 메울 수 없다.",
    },
  ],
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
  // Signature Move 연재(자체 완결형 HTML 리포트)를 "실행 비용" 용어 바로 뒤에 둔다.
  const at = items.findIndex((it) => it.href.endsWith("/execution-cost"));
  items.splice(at < 0 ? items.length : at + 1, 0, ...SERIES[locale]);
  return <KpiIndex eyebrow={h.eyebrow} title={h.title} accent={h.accent} intro={h.intro} items={items} backHref="/match-analysis" backLabel={h.backLabel} />;
}
