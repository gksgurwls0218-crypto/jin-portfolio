"use client";
import Link from "@/components/LocaleLink";
import Carousel3D, { type CarouselItem } from "@/components/Carousel3D";
import { UI, type Locale } from "@/lib/i18n";
import { useLocale } from "@/lib/useLocale";

// Card colours pull from the shared token system so the cards read
// consistently wherever they sit — including floating on the solid
// accent "signal" band below.
const C = {
  card: "var(--stage-3)",
  ink: "var(--ink)",
  ink2: "var(--ink-2)",
  muted: "var(--ink-4)",
  green: "var(--green-mid)",
  edge: "var(--edge)",
};

const COPY = {
  threeWaysIn: UI.common.threeWaysIn,
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
  cards: {
    approach: {
      label: { en: "Approach", ko: "변이 이론, Variation Theory" },
      title: { en: <>It all started with<br />four questions.</>, ko: <>모든 것은 네 개의<br />질문에서 시작됐다.</> },
    },
    match: {
      label: { en: "Match Analysis & Essays", ko: "경기 분석 & 새로운 개념" },
      title: { en: <>Variation Theory<br />applied &amp; written.</>, ko: <>변이 이론의 시각으로<br />바라본 분석 결과물</> },
      body: {
        en: "Real match breakdowns — and original tactical essays — written through the lens of Variation Theory.",
        ko: "변이 이론의 렌즈로 풀어낸 실제 경기 분석 — 그리고 그것을 설명하기 위해 직접 만든 새로운 전술 개념.",
      },
    },
    kpi: {
      label: { en: "Advanced Data & KPI Lab", ko: "Advanced Data & KPI 랩" },
      title: { en: <>Could be reckless,<br />or innovative.</>, ko: <>무모와 혁신<br />사이</> },
      body: {
        en: "A room for advanced data & KPIs to prove Variation Theory. Additionally, a room to think of something new by stepping off the beaten track. Could be reckless — but innovative as well.",
        ko: "변이 이론을 증명하기 위한 Advanced Data와 KPI의 공간, 그리고 정해진 길에서 벗어나 새로운 것을 고민하는 공간이다. 무모할 수도 있지만, 그만큼 혁신적일 수도.",
      },
    },
  },
} as const;

function Card({ n, label, title, href, locale, children }: { n: string; label: string; title: React.ReactNode; href: string; locale: Locale; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group flex flex-col h-full w-full rounded-[28px] px-12 py-12 md:px-14 md:py-14"
      style={{
        background: C.card,
        border: `0.5px solid ${C.edge}`,
        boxShadow: "0 40px 90px rgba(30,50,40,0.18)",
        transition: "border-color .4s var(--ease-out), box-shadow .4s var(--ease-out)",
      }}
      onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--green-line)"; el.style.boxShadow = "0 50px 110px rgba(20,50,30,0.26)"; }}
      onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = C.edge; el.style.boxShadow = "0 40px 90px rgba(30,50,40,0.18)"; }}
    >
      <div className="flex items-center gap-3 mb-9">
        <span className="display" style={{ fontSize: 17, color: C.green, letterSpacing: "0.02em" }}>{n}</span>
        <span className="mono" style={{ fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", color: C.muted }}>{label}</span>
      </div>

      <h2 className="display mb-9" style={{ fontSize: "clamp(25px,2.7vw,33px)", lineHeight: 1.12, color: C.ink, letterSpacing: "-0.025em" }}>
        {title}
      </h2>

      <div>{children}</div>

      <div className="mt-auto pt-8" style={{ borderTop: `0.5px solid ${C.edge}` }}>
        <span className="mono inline-flex items-center gap-2" style={{ fontSize: 14, color: C.green }}>
          <span className="border-b border-transparent group-hover:border-current pb-0.5 transition-colors duration-300">{UI.common.enter[locale]}</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
        </span>
      </div>
    </Link>
  );
}

export default function HomeCarousel() {
  const locale = useLocale();

  const items: CarouselItem[] = [
    {
      key: "approach",
      content: (
        <Card n="01" label={COPY.cards.approach.label[locale]} href="/approach" title={COPY.cards.approach.title[locale]} locale={locale}>
          <ol className="flex flex-col gap-5">
            {COPY.questions[locale].map((q, i) => (
              <li key={i} className="flex gap-4" style={{ fontSize: 15.5, lineHeight: 1.5, color: C.ink2 }}>
                <span className="mono shrink-0" style={{ color: C.green, fontSize: 14, fontWeight: 500, paddingTop: 1 }}>{i + 1}</span>
                <span>{q}</span>
              </li>
            ))}
          </ol>
        </Card>
      ),
    },
    {
      key: "match",
      content: (
        <Card n="02" label={COPY.cards.match.label[locale]} href="/match-analysis" title={COPY.cards.match.title[locale]} locale={locale}>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: C.ink2 }}>{COPY.cards.match.body[locale]}</p>
        </Card>
      ),
    },
    {
      key: "kpi",
      content: (
        <Card n="03" label={COPY.cards.kpi.label[locale]} href="/kpi-lab" title={COPY.cards.kpi.title[locale]} locale={locale}>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: C.ink2 }}>{COPY.cards.kpi.body[locale]}</p>
        </Card>
      ),
    },
  ];

  return (
    <section
      className="band-signal relative flex flex-col items-center justify-center px-6"
      style={{ minHeight: "155vh" }}
    >
      <div className="w-full max-w-[1240px] mx-auto">
        <p className="mono t-eyebrow kicker mb-10 justify-center md:justify-start" style={{ letterSpacing: "0.22em" }}>
          {COPY.threeWaysIn[locale]}
        </p>
        <Carousel3D items={items} cardWidth={520} cardHeight={520} angleStep={46} radius={500} dark autoDrift={false} />
      </div>
    </section>
  );
}
