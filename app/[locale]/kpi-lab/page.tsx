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
      { href: "/kpi-lab/lab", n: "02", label: "Data & KPI Lab", title: "Stepping off the beaten path", desc: "Metrics and tools I develop myself, newest first — Win Contribution (JWC), the attempt at a football WAR; HOVI, an AI that trades evidence with the manager; and the glasses that would feed it. A lab to build new things and show them while they are still unfinished." },
    ],
  },
  ko: {
    eyebrow: "03 / Advanced Data & KPI 랩",
    title: "무모와 혁신",
    accent: "사이",
    intro: "변이 이론을 증명하기 위한 Advanced Data와 KPI를 다루는 공간, 그리고 정해진 길에서 벗어나 새로운 것을 고민하는 실험실.",
    doors: [
      { href: "/kpi-lab/advanced", n: "01", label: "변이 이론을 위한 Advanced Data & KPI", title: "측정법", desc: "변이 이론이 어떻게 작동하는지 측정하는 지표들." },
      { href: "/kpi-lab/lab", n: "02", label: "데이터 & KPI 랩", title: "혁신 센터", desc: "내가 직접 개발하는 지표와 도구를 최신순으로. 축구판 WAR를 만들려는 승리 기여도(JWC), 감독과 근거를 주고받는 AI인 HOVI, 그리고 그것을 먹여 살릴 글라스까지. 아직 끝나지 않은 채로 내놓는 곳이다." },
    ],
  },
};

export default async function KpiLabPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const c = CONTENT[isLocale(locale) ? locale : "en"];
  return <DoorLanding eyebrow={c.eyebrow} title={c.title} accent={c.accent} intro={c.intro} doors={c.doors} />;
}
