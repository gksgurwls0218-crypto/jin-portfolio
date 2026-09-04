"use client";
import Link from "@/components/LocaleLink";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import { UI, type Locale } from "@/lib/i18n";
import { useLocale } from "@/lib/useLocale";

/* ─────────────────────────────────────────────────────────────────────────
   「데이터가 말하는」 연재.
   한 팀·한 대회를 공개 데이터만으로 끝까지 읽는 시리즈. 최신 편이 위로 온다.

   새 편을 추가할 때:
   1. /public/data-[슬러그].ko.html 과 /public/data-[슬러그].html 을 넣는다
   2. app/[locale]/match-analysis/data-series/[슬러그]/page.tsx 를 만든다
      (hwaseong/page.tsx 를 그대로 복사해 src 경로와 META만 바꾸면 된다)
   3. 아래 EPISODES 배열 맨 앞에 한 항목을 추가한다
   ───────────────────────────────────────────────────────────────────────── */

type Episode = {
  slug: string;
  no: string;
  publishedAt: string;
  competition: Record<Locale, string>;
  title: Record<Locale, string>;
  sub: Record<Locale, string>;
  stats: Record<Locale, readonly (readonly [string, string])[]>;
};

const EPISODES: Episode[] = [
  {
    slug: "hwaseong",
    no: "01",
    publishedAt: "2026-09-04",
    competition: {
      en: "K League 2 2026 · Hwaseong FC · 23 matches, 33,522 events",
      ko: "하나은행 K리그2 2026 · 화성FC · 23경기 · 이벤트 33,522건",
    },
    title: {
      en: "Hwaseong are not a side that holds the ball",
      ko: "화성은 공을 갖는 팀이 아니라 공을 쓰는 팀이다",
    },
    sub: {
      en: "They attempt the second-fewest passes in the league and get more box shots out of each one than anybody. Their long-pass share is third-highest while their duel count is the lowest and their offside count the highest — the ball goes behind the line, not into a body. And the football only completes itself after the break: 86 shots in first halves become 154 in second halves, with possession unchanged at 45%. Nine figures, and the four matches that show it best.",
      ko: "리그에서 두 번째로 패스를 적게 하면서 패스 한 번당 박스 안 슈팅은 가장 많이 만든다. 긴 패스는 리그 3위인데 몸싸움은 리그에서 가장 적고 오프사이드는 가장 많다 — 사람에게 붙이지 않고 뒷공간으로 보낸다는 뜻이다. 그리고 이 축구는 후반에 완성된다. 점유율은 45%로 그대로인 채 전반 슈팅 86개가 후반 154개가 된다. 그림 9종과, 그것을 가장 잘 보여주는 4경기.",
    },
    stats: {
      en: [["16th / 1st", "passes / box shots per pass"], ["last / 1st", "duels / offsides"], ["86 → 154", "shots, 1st half → 2nd"], ["−0.05", "possession vs points"]],
      ko: [["16위 / 1위", "패스량 / 패스당 박스슛"], ["최하위 / 1위", "경합 / 오프사이드"], ["86 → 154", "전반 → 후반 슈팅"], ["−0.05", "점유율과 승점 상관"]],
    },
  },
];

const COPY = {
  eyebrow: { en: "02 / What the data says", ko: "02 / 데이터가 말하는" },
  title1: { en: "One club,", ko: "한 팀을" },
  title2: { en: "read all the way through.", ko: "끝까지 읽어본다" },
  intro: {
    en: "A series that takes one club or one competition and reads it to the end using nothing but public data. Every source, every definition of mine, and every question the data could not answer is written into each piece.",
    ko: "한 팀 또는 한 대회를 공개 데이터만으로 끝까지 읽어보는 연재. 모든 수치의 출처와 내가 만든 정의, 그리고 데이터가 답하지 못한 지점까지 매 편에 함께 적는다.",
  },
  next: {
    en: "Next episodes are being collected. Suggestions welcome.",
    ko: "다음 편은 수집 중입니다. 보고 싶은 팀이 있으면 알려주세요.",
  },
} as const;

function EpisodeRow({ ep }: { ep: Episode }) {
  const locale = useLocale();
  const [hover, setHover] = useState(false);
  return (
    <Link
      href={`/match-analysis/data-series/${ep.slug}`}
      className="relative flex flex-col lg:flex-row gap-8 rounded-[26px] p-8 md:p-10"
      style={{
        background: "var(--green-soft)",
        border: `0.5px solid ${hover ? "var(--green-bright)" : "var(--green-line)"}`,
        boxShadow: hover ? "var(--lift)" : "none",
        transition: "box-shadow .5s var(--ease-out), border-color .5s var(--ease-out)",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="mono px-2 py-0.5 rounded-full" style={{ fontSize: 9, letterSpacing: ".14em", border: "0.5px solid var(--green-line)", color: "var(--green-bright)" }}>
            {locale === "ko" ? `데이터가 말하는 · ${ep.no}` : `WHAT THE DATA SAYS · ${ep.no}`}
          </span>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.06em" }}>
            {ep.competition[locale]}
          </span>
        </div>
        <h2 className="display mb-4" style={{ fontSize: "clamp(26px,3.4vw,40px)", lineHeight: 1.1, letterSpacing: "-0.035em", color: "var(--ink)" }}>
          {ep.title[locale]}
        </h2>
        <p style={{ fontSize: 15.5, lineHeight: 1.68, color: "var(--ink-2)", maxWidth: 560 }}>
          {ep.sub[locale]}
        </p>
        <span className="mono inline-block mt-7" style={{ fontSize: 11.5, letterSpacing: ".14em", color: "var(--green-bright)", borderBottom: "1px solid var(--green-line)", paddingBottom: 3 }}>
          {UI.common.viewAnalysis[locale].toUpperCase()} →
        </span>
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-6 shrink-0 self-center" style={{ minWidth: 240 }}>
        {ep.stats[locale].map(([big, label]) => (
          <div key={label} className="pt-3" style={{ borderTop: "0.5px solid var(--green-line)" }}>
            <span className="display block" style={{ fontSize: 22, letterSpacing: "-0.03em", color: "var(--ink)" }}>{big}</span>
            <span className="mono block mt-1" style={{ fontSize: 9.5, letterSpacing: ".12em", color: "var(--ink-3)" }}>{label}</span>
          </div>
        ))}
      </div>
    </Link>
  );
}

export default function DataSeriesGallery() {
  const locale = useLocale();
  const episodes = [...EPISODES].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return (
    <section className="relative px-6 md:px-10 pt-36 pb-40" style={{ background: "var(--stage-2)" }}>
      <div className="max-w-[1180px] mx-auto">
        <Reveal>
          <p className="mono t-eyebrow kicker mb-7">{COPY.eyebrow[locale]}</p>
          <h1 className="display t-section mb-8" style={{ color: "var(--ink)", maxWidth: 900 }}>
            {COPY.title1[locale]}<br />
            <span style={{ color: "var(--green-bright)" }}>{COPY.title2[locale]}</span>
          </h1>
          <p className="mb-20" style={{ color: "var(--ink-2)", fontSize: "clamp(16px,1.6vw,19px)", lineHeight: 1.6, maxWidth: 640 }}>
            {COPY.intro[locale]}
          </p>
        </Reveal>

        <div className="flex flex-col gap-8">
          {episodes.map((ep, i) => (
            <Reveal key={ep.slug} delay={i * 80}>
              <EpisodeRow ep={ep} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <p className="mono mt-12" style={{ fontSize: 12, letterSpacing: ".08em", color: "var(--ink-4)" }}>
            {COPY.next[locale]}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
