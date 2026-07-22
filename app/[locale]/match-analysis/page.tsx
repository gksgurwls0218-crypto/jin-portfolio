import DoorLanding from "@/components/DoorLanding";
import { isLocale, type Locale } from "@/lib/i18n";

const CONTENT: Record<Locale, { eyebrow: string; title: string; accent: string; intro: string; doors: { href: string; n: string; label: string; title: string }[] }> = {
  en: {
    eyebrow: "02 / Match Analysis & Essays",
    title: "Theory applied,",
    accent: "and written down.",
    intro: "Two ways in - the match analysis under Variation Theory, new tactical terms defined myself to explain Variation Theory",
    doors: [
      { href: "/match-analysis/matches", n: "01", label: "Match Analysis", title: "Match analysis reports." },
      { href: "/match-analysis/essays", n: "02", label: "New concepts", title: "Tactical terms I made" },
    ],
  },
  ko: {
    eyebrow: "02 / 경기 분석 & 새로운 개념",
    title: "변이 이론의 시각으로",
    accent: "바라본 분석 결과물",
    intro: "변이 이론으로 분석한 결과물과 변이 이론을 설명하기 위해 직접 만든 새로운 개념들",
    doors: [
      { href: "/match-analysis/matches", n: "01", label: "경기 분석", title: "경기 분석 리포트" },
      { href: "/match-analysis/essays", n: "02", label: "새로운 개념", title: "내가 만든 전술 용어" },
    ],
  },
};

export default async function MatchAnalysisPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const c = CONTENT[isLocale(locale) ? locale : "en"];
  return <DoorLanding eyebrow={c.eyebrow} title={c.title} accent={c.accent} intro={c.intro} doors={c.doors} />;
}
