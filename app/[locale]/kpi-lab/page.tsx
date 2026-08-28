import DoorLanding from "@/components/DoorLanding";
import { isLocale, type Locale } from "@/lib/i18n";

const CONTENT: Record<Locale, { eyebrow: string; title: string; accent: string; intro: string; doors: { href: string; n: string; label: string; title: string; desc: string }[] }> = {
  en: {
    eyebrow: "03 / Advanced Data & KPI Lab",
    title: "Could be reckless,",
    accent: "or innovative.",
    intro: "A room for advanced data & KPIs to prove Variation Theory — and a room to think of something new by stepping off the beaten track.",
    doors: [
      { href: "/kpi-lab/advanced", n: "01", label: "Advanced Data & KPIs for Variation Theory", title: "The evidence layer.", desc: "The metrics to measure how the Variation Theory works." },
      { href: "/kpi-lab/lab", n: "02", label: "Data & KPI Lab", title: "Stepping off the beaten path", desc: "Very new metrics to develop myself, newest first — including Win Contribution (JWC), the attempt at a football WAR. A lab to create new metrics and show it to the world." },
      { href: "/kpi-lab/hovi", n: "03", label: "Tools & systems in design", title: "Building the instrument", desc: "Ideas for tools I want on the touchline, researched before they are built — an AI that trades evidence with the manager, and the glasses that would feed it. What the rules allow, what the evidence supports, and what I folded away." },
    ],
  },
  ko: {
    eyebrow: "03 / Advanced Data & KPI 랩",
    title: "무모와 혁신",
    accent: "사이",
    intro: "변이 이론을 증명하기 위한 Advanced Data와 KPI를 다루는 공간, 그리고 정해진 길에서 벗어나 새로운 것을 고민하는 실험실.",
    doors: [
      { href: "/kpi-lab/advanced", n: "01", label: "변이 이론을 위한 Advanced Data & KPI", title: "측정법", desc: "변이 이론이 어떻게 작동하는지 측정하는 지표들." },
      { href: "/kpi-lab/lab", n: "02", label: "데이터 & KPI 랩", title: "혁신 센터", desc: "내가 직접 개발하는 아주 새로운 지표들을 최신순으로. 축구판 WAR를 만들려는 승리 기여도(JWC)도 여기 있다." },
      { href: "/kpi-lab/hovi", n: "03", label: "구상 중인 도구와 시스템", title: "도구를 만든다", desc: "현장에서 쓰고 싶은 도구를, 만들기 전에 먼저 조사한 기록. 감독과 근거를 주고받는 AI와, 그것을 먹여 살릴 글라스. 규정이 무엇을 허용하는지, 근거가 어디까지 뒷받침하는지, 그리고 내가 무엇을 접었는지." },
    ],
  },
};

export default async function KpiLabPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const c = CONTENT[isLocale(locale) ? locale : "en"];
  return <DoorLanding eyebrow={c.eyebrow} title={c.title} accent={c.accent} intro={c.intro} doors={c.doors} />;
}
