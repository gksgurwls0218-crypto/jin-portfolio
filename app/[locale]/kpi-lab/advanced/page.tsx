import type { Metadata } from "next";
import AdvancedIndex, { type AdvItem } from "@/components/kpi/AdvancedIndex";
import { STANDARD } from "@/lib/kpiMetrics";
import { STANDARD_KO } from "@/lib/kpiContent.ko";
import { THUMB } from "@/lib/kpiGuideContent";
import { isLocale, type Locale } from "@/lib/i18n";

const HEAD: Record<Locale, {
  eyebrow: string; title: string; accent: string; intro: string; back: string; enter: string; preview: string;
  guide: { label: string; title: string; desc: string };
}> = {
  en: {
    eyebrow: "03 / Advanced Data & KPIs",
    title: "The metrics I read",
    accent: "matches with.",
    intro: "Established, advanced metrics — used not as decoration but to test whether Variation Theory actually shows up in the data. Each page covers how the metric is calculated, reference values from real World Cup data, what to read it with, and where it misleads.",
    back: "Advanced Data & KPI Lab",
    enter: "Open",
    preview: "Preview",
    guide: {
      label: "Start here · Guide",
      title: "How to read the data",
      desc: "A single number can't analyse, explain or judge anything. Seven checks for reading any metric in context — definition, scale, game state, outcome, stability, opposition and the eye test — with a matrix of what to pair each metric with.",
    },
  },
  ko: {
    eyebrow: "03 / Advanced Data & KPI",
    title: "내가 경기를 읽는",
    accent: "지표들",
    intro: "정립된 고급 지표들 — 장식이 아니라, 변이 이론이 실제로 데이터에 나타나는지 검증하기 위해 쓴다. 각 페이지에 계산 방법, 월드컵 실제 데이터로 낸 기준값, 함께 볼 데이터, 그리고 오해하기 쉬운 함정을 정리했다.",
    back: "Advanced Data & KPI 랩",
    enter: "열기",
    preview: "미리보기",
    guide: {
      label: "먼저 읽기 · 가이드",
      title: "데이터를 읽는 법",
      desc: "숫자 하나로는 분석도, 설명도, 평가도 할 수 없다. 정의·규모·경기 상황·결과·안정성·상대·영상 확인 — 어떤 지표든 맥락 안에서 읽는 일곱 가지 순서와, 지표마다 무엇을 함께 봐야 하는지 정리한 표.",
    },
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return locale === "ko"
    ? { title: "Advanced Data & KPI | KPI Lab", description: "xT, VAEP, PPDA 등 12개 고급 지표의 계산법, 기준값, 함께 볼 데이터와 함정." }
    : { title: "Advanced Data & KPIs | KPI Lab", description: "How 12 advanced metrics — xT, VAEP, PPDA and more — are calculated, what values mean, what to pair them with, and where they mislead." };
}

export default async function AdvancedIndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "en";
  const h = HEAD[locale];
  const items: AdvItem[] = STANDARD.map((m) => ({
    href: `/kpi-lab/advanced/${m.id}`,
    abbr: m.abbr,
    title: locale === "ko" ? STANDARD_KO[m.id]?.name ?? m.name : m.name,
    short: locale === "ko" ? STANDARD_KO[m.id]?.short ?? m.short : m.short,
    thumb: `/kpi/thumb/${THUMB[m.id]}.${locale}.svg`,
  }));
  return (
    <AdvancedIndex
      eyebrow={h.eyebrow} title={h.title} accent={h.accent} intro={h.intro}
      backHref="/kpi-lab" backLabel={h.back}
      guide={{ href: "/kpi-lab/advanced/how-to-read", ...h.guide, thumb: `/kpi/thumb/guide_hits.${locale}.svg` }}
      items={items} enterLabel={h.enter} previewLabel={h.preview}
    />
  );
}
