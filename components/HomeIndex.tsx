"use client";
import Link from "@/components/LocaleLink";
import { UI } from "@/lib/i18n";
import { useLocale } from "@/lib/useLocale";

// "Three ways in" — index rows (2026-10-24). Copy is unchanged from the
// former HomeCarousel; only the presentation moved from a 3-D carousel of
// floating cards to hairline-separated rows.
const COPY = {
  questions: {
    en: [
      "How do you break down a set defensive block?",
      "Is the era of one fixed Plan A — for a match, for a season — over?",
      "How do you cope with football stretched to a 100-minute game?",
      "How do you draw out players' creativity and initiative?",
    ],
    ko: [
      "짜여진 수비 블록을 어떻게 무너뜨리는가?",
      "한 경기, 한 시즌 내내 고정된 하나의 Plan A 시대는 끝났는가?",
      "100분 경기로 늘어난 축구에 어떻게 대응하는가?",
      "선수들의 창의성과 주도성을 어떻게 끌어내는가?",
    ],
  },
  rows: [
    {
      n: "01", href: "/approach",
      label: { en: "Approach", ko: "변이 이론, Variation Theory" },
      title: { en: <>It all started with<br />four questions.</>, ko: <>모든 것은 네 개의<br />질문에서 시작됐다.</> },
      body: null,
    },
    {
      n: "02", href: "/match-analysis",
      label: { en: "Match Analysis & Essays", ko: "경기 분석 & 새로운 개념" },
      title: { en: <>Variation Theory<br />applied &amp; written.</>, ko: <>변이 이론의 시각으로<br />바라본 분석 결과물</> },
      body: {
        en: "Real match breakdowns — and original tactical essays — written through the lens of Variation Theory.",
        ko: "변이 이론의 렌즈로 풀어낸 실제 경기 분석 — 그리고 그것을 설명하기 위해 직접 만든 새로운 전술 개념.",
      },
    },
    {
      n: "03", href: "/kpi-lab",
      label: { en: "Advanced Data & KPI Lab", ko: "Advanced Data & KPI 랩" },
      title: { en: <>Could be reckless,<br />or innovative.</>, ko: <>무모와 혁신<br />사이</> },
      body: {
        en: "A room for advanced data & KPIs to prove Variation Theory. Additionally, a room to think of something new by stepping off the beaten track. Could be reckless — but innovative as well.",
        ko: "변이 이론을 증명하기 위한 Advanced Data와 KPI의 공간, 그리고 정해진 길에서 벗어나 새로운 것을 고민하는 공간이다. 무모할 수도 있지만, 그만큼 혁신적일 수도.",
      },
    },
  ],
} as const;

export default function HomeIndex() {
  const locale = useLocale();
  return (
    <section className="hc-ways">
      <div className="hc-in">
        <div className="hc-ways-hd">
          <div className="hc-kicker">{UI.common.threeWaysIn[locale]}</div>
          <span className="count">03 SECTIONS</span>
        </div>
        {COPY.rows.map((r) => (
          <Link key={r.n} href={r.href} className="hc-row">
            <span className="num">{r.n}</span>
            <div>
              <div className="lab">{r.label[locale]}</div>
              <h3>{r.title[locale]}</h3>
            </div>
            <div className="body">
              {r.body ? (
                <p>{r.body[locale]}</p>
              ) : (
                <ol>
                  {COPY.questions[locale].map((q, i) => (
                    <li key={i}><b>{i + 1}</b><span>{q}</span></li>
                  ))}
                </ol>
              )}
            </div>
            <span className="enter">{UI.common.enter[locale]} <i>→</i></span>
          </Link>
        ))}
      </div>
    </section>
  );
}
