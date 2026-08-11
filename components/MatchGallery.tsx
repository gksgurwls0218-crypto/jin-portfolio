"use client";
import Link from "@/components/LocaleLink";
import { useState } from "react";
import Crest from "@/components/Crest";
import MatchBoard from "@/components/match/MatchBoard";
import GoalsSummary from "@/components/match/GoalsSummary";
import Reveal from "@/components/Reveal";
import { MATCHES, type GalleryMatch } from "@/lib/matchGallery";
import { UI } from "@/lib/i18n";
import { useLocale } from "@/lib/useLocale";

const GALLERY_COPY = {
  eyebrow: { en: "02 / Match Analysis", ko: "02 / 경기 분석" },
  title1: { en: "Theory applied to", ko: "이론을 경기에" },
  title2: { en: "matches analysed.", ko: "적용해 분석하다" },
  intro: {
    en: "Each analysis states what the framework predicted, then reports what actually happened. Hover a match to see both line-ups — then step inside.",
    ko: "각 분석은 프레임워크가 무엇을 예측했는지 밝힌 뒤, 실제로 무슨 일이 일어났는지 보고한다. 경기 위에 마우스를 올리면 양 팀 라인업이 보인다 — 그런 뒤 안으로 들어가 보라.",
  },
} as const;

// match.date is a display string like "28 Apr 2026" or "14 Oct 2025" — not lexicographically
// sortable (day comes first), so parse it into a real timestamp for ordering.
const MONTHS: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};
function parseMatchDate(dateStr: string): number {
  const m = dateStr.match(/(\d{1,2})\s+([A-Za-z]{3,})\s+(\d{4})/);
  if (!m) return 0;
  const [, day, mon, year] = m;
  const month = MONTHS[mon.slice(0, 3).toLowerCase()] ?? 0;
  return new Date(Number(year), month, Number(day)).getTime();
}
const MATCHES_BY_RECENT = [...MATCHES].sort((a, b) => parseMatchDate(b.date) - parseMatchDate(a.date));

function Row({ match }: { match: GalleryMatch }) {
  const [hover, setHover] = useState(false);
  const locale = useLocale();

  return (
    <Link
      href={`/match-analysis/${match.slug}`}
      className="relative flex flex-col lg:flex-row gap-6 rounded-[26px] p-8 md:p-10"
      style={{
        background: "var(--stage-3)",
        border: `0.5px solid ${hover ? "var(--green-line)" : "var(--edge)"}`,
        boxShadow: hover ? "var(--lift)" : "0 20px 50px rgba(0,0,0,0.35)",
        transition: "border-color .5s var(--ease-out), box-shadow .5s var(--ease-out)",
        minHeight: 300,
        cursor: "pointer",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* ── info card ── */}
      <div
        className="flex flex-col justify-between shrink-0"
        style={{
          flexBasis: hover ? "42%" : "100%",
          transition: "flex-basis .55s var(--ease-out)",
        }}
      >
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-6">
          <span className="mono" style={{ fontSize: 11, color: "var(--green-mid)", letterSpacing: "0.06em" }}>{match.competition}</span>
          {match.featured && (
            <span className="mono px-2 py-0.5 rounded-full" style={{ fontSize: 9, background: "var(--green-soft)", color: "var(--green-bright)", border: "0.5px solid var(--green-line)" }}>{UI.common.featured[locale]}</span>
          )}
        </div>

        {/* BIG SCORE — the dominant element */}
        <div className="flex items-center gap-5 md:gap-7 mb-6">
          <div className="flex flex-col items-center gap-2.5" style={{ width: 78 }}>
            <Crest name={match.home.name} size={54} />
            <span className="display text-center" style={{ fontSize: 14, color: "var(--ink)", lineHeight: 1.05 }}>{match.home.name}</span>
          </div>
          <div className="display flex items-center gap-3" style={{ color: "var(--ink)", letterSpacing: "-0.04em" }}>
            <span style={{ fontSize: "clamp(52px,8vw,88px)", lineHeight: 1 }}>{match.home.score}</span>
            <span style={{ fontSize: "clamp(30px,4vw,44px)", color: "var(--ink-4)", fontWeight: 400 }}>–</span>
            <span style={{ fontSize: "clamp(52px,8vw,88px)", lineHeight: 1 }}>{match.away.score}</span>
          </div>
          <div className="flex flex-col items-center gap-2.5" style={{ width: 78 }}>
            <Crest name={match.away.name} size={54} />
            <span className="display text-center" style={{ fontSize: 14, color: "var(--ink)", lineHeight: 1.05 }}>{match.away.name}</span>
          </div>
        </div>

        {/* meta + goals */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>{match.date}</span>
            <span className="mono" style={{ fontSize: 11, color: "var(--ink-4)" }}>{match.venue}</span>
          </div>
          <GoalsSummary match={match} />
          <span
            className="mono inline-flex items-center gap-1.5 w-fit mt-1"
            style={{ fontSize: 12.5, color: "var(--green-mid)" }}
          >
            {UI.common.viewAnalysis[locale]}
            <span style={{ transform: hover ? "translateX(4px)" : "none", transition: "transform .3s var(--ease-out)" }}>→</span>
          </span>
        </div>
      </div>

      {/* ── tactical board (slides out on hover) ── */}
      <div
        className="hidden lg:block overflow-hidden"
        style={{
          flexBasis: hover ? "58%" : "0%",
          opacity: hover ? 1 : 0,
          transform: hover ? "translateX(0)" : "translateX(24px)",
          transition: "flex-basis .55s var(--ease-out), opacity .45s var(--ease-out), transform .55s var(--ease-out)",
          minHeight: 236,
        }}
        aria-hidden={!hover}
      >
        <div style={{ height: "100%", minHeight: 236 }}>
          <MatchBoard match={match} />
        </div>
      </div>
    </Link>
  );
}

/* Tournament-scale report — a whole competition rather than a single fixture, so it
   gets its own card shape instead of the home-vs-away scoreline used above. */
const TOURNAMENT_COPY = {
  tag: { en: "TACTICAL TRENDS REPORT", ko: "전술 트렌드 리포트" },
  competition: { en: "FIFA World Cup 2026 · all 104 matches", ko: "2026 FIFA 월드컵 · 104경기 전수" },
  title: { en: "The underdog does not lose.", ko: "약팀이 지는 게 아니다." },
  sub: {
    en: "The barren game model loses. Every official FIFA post-match report of the tournament, parsed in full — 208 team-matches — and read back against variation theory. Including the three measures of mine that failed.",
    ko: "무력한 게임 모델이 진다. 대회 FIFA 공식 경기 리포트 전수 파싱 — 208 팀-경기 — 을 변이 이론에 되비춰 읽었다. 실패한 내 지표 세 개까지 그대로.",
  },
  stats: {
    en: [["0 / 15", "barren reactive, knockouts"], ["88.9%", "productive reactive"], ["86.2%", "xG picks the winner"], ["104", "matches parsed"]],
    ko: [["15전 0승", "무력한 반응형 (녹아웃)"], ["88.9%", "생산적 반응형 승률"], ["86.2%", "xG의 승자 적중률"], ["104", "전 경기 파싱"]],
  },
} as const;

function TournamentRow() {
  const locale = useLocale();
  const [hover, setHover] = useState(false);
  return (
    <Link
      href="/match-analysis/wc2026-report"
      className="relative flex flex-col lg:flex-row gap-8 rounded-[26px] p-8 md:p-10"
      style={{
        background: "var(--green)",
        color: "var(--signal-ink)",
        border: `0.5px solid ${hover ? "var(--signal-edge)" : "transparent"}`,
        boxShadow: hover ? "var(--lift)" : "0 20px 50px rgba(0,0,0,0.35)",
        transition: "box-shadow .5s var(--ease-out), border-color .5s var(--ease-out)",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <span className="mono px-2 py-0.5 rounded-full" style={{ fontSize: 9, letterSpacing: ".14em", border: "0.5px solid var(--signal-edge)", color: "var(--signal-ink-2)" }}>
            {TOURNAMENT_COPY.tag[locale]}
          </span>
          <span className="mono" style={{ fontSize: 11, color: "var(--signal-ink-3)", letterSpacing: "0.06em" }}>
            {TOURNAMENT_COPY.competition[locale]}
          </span>
        </div>
        <h2 className="display mb-4" style={{ fontSize: "clamp(28px,4vw,46px)", lineHeight: 1.08, letterSpacing: "-0.035em" }}>
          {TOURNAMENT_COPY.title[locale]}
        </h2>
        <p style={{ fontSize: 15.5, lineHeight: 1.68, color: "var(--signal-ink-2)", maxWidth: 560 }}>
          {TOURNAMENT_COPY.sub[locale]}
        </p>
        <span className="mono inline-block mt-7" style={{ fontSize: 11.5, letterSpacing: ".14em", color: "var(--signal-ink)", borderBottom: "1px solid var(--signal-edge)", paddingBottom: 3 }}>
          {UI.common.viewAnalysis[locale].toUpperCase()} →
        </span>
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-6 shrink-0 self-center" style={{ minWidth: 240 }}>
        {TOURNAMENT_COPY.stats[locale].map(([big, label]) => (
          <div key={label} className="pt-3" style={{ borderTop: "0.5px solid var(--signal-edge)" }}>
            <span className="display block" style={{ fontSize: 26, letterSpacing: "-0.03em" }}>{big}</span>
            <span className="mono block mt-1" style={{ fontSize: 9.5, letterSpacing: ".12em", color: "var(--signal-ink-3)" }}>{label}</span>
          </div>
        ))}
      </div>
    </Link>
  );
}

/* Standalone long-form match report — authored as a self-contained HTML document
   and embedded at /match-analysis/korea-jordan, so it gets a report-shaped card
   rather than the home-vs-away scoreline used above. */
const REPORT_COPY = {
  tag: { en: "MATCH REPORT", ko: "경기 분석 리포트" },
  competition: { en: "AFC Asian Cup Qatar 2023 · Korea Republic 2-2 Jordan", ko: "AFC 아시안컵 카타르 2023 · 대한민국 2-2 요르단" },
  title: { en: "Was it the penetration, or the pressing?", ko: "침투가 원인이었나, 압박이 원인이었나" },
  sub: {
    en: "Two claims tested in order. Penetration halved — and shots went up. What changed was not the runs in front but the pressing behind them. Every figure marked for what is measured and what is assumed.",
    ko: "두 개의 가설을 순서대로 검증했다. 침투는 반토막 났는데 슈팅은 늘었다. 바뀐 것은 앞선의 침투가 아니라 상대의 압박이었다. 확정된 수치와 가정을 그림마다 구분해 표시했다.",
  },
  stats: {
    en: [["164 → 81", "runs in behind"], ["14 → 22", "shots"], ["42 → 25", "CB circulation"], ["14 / 6 / 16", "A–B–A shots"]],
    ko: [["164 → 81", "뒷공간 침투"], ["14 → 22", "슈팅"], ["42 → 25", "센터백 순환"], ["14 / 6 / 16", "A–B–A 슈팅"]],
  },
} as const;

function ReportRow() {
  const locale = useLocale();
  const [hover, setHover] = useState(false);
  return (
    <Link
      href="/match-analysis/korea-jordan"
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
            {REPORT_COPY.tag[locale]}
          </span>
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)", letterSpacing: "0.06em" }}>
            {REPORT_COPY.competition[locale]}
          </span>
        </div>
        <h2 className="display mb-4" style={{ fontSize: "clamp(26px,3.4vw,40px)", lineHeight: 1.1, letterSpacing: "-0.035em", color: "var(--ink)" }}>
          {REPORT_COPY.title[locale]}
        </h2>
        <p style={{ fontSize: 15.5, lineHeight: 1.68, color: "var(--ink-2)", maxWidth: 560 }}>
          {REPORT_COPY.sub[locale]}
        </p>
        <span className="mono inline-block mt-7" style={{ fontSize: 11.5, letterSpacing: ".14em", color: "var(--green-bright)", borderBottom: "1px solid var(--green-line)", paddingBottom: 3 }}>
          {UI.common.viewAnalysis[locale].toUpperCase()} →
        </span>
      </div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-6 shrink-0 self-center" style={{ minWidth: 240 }}>
        {REPORT_COPY.stats[locale].map(([big, label]) => (
          <div key={label} className="pt-3" style={{ borderTop: "0.5px solid var(--green-line)" }}>
            <span className="display block" style={{ fontSize: 22, letterSpacing: "-0.03em", color: "var(--ink)" }}>{big}</span>
            <span className="mono block mt-1" style={{ fontSize: 9.5, letterSpacing: ".12em", color: "var(--ink-3)" }}>{label}</span>
          </div>
        ))}
      </div>
    </Link>
  );
}

export default function MatchGallery() {
  const locale = useLocale();
  return (
    <section className="relative px-6 md:px-10 pt-36 pb-40" style={{ background: "var(--stage-2)" }}>
      <div className="max-w-[1180px] mx-auto">
        <Reveal>
          <p className="mono t-eyebrow kicker mb-7">{GALLERY_COPY.eyebrow[locale]}</p>
          <h1 className="display t-section mb-8" style={{ color: "var(--ink)", maxWidth: 900 }}>
            {GALLERY_COPY.title1[locale]}<br />
            <span style={{ color: "var(--green-bright)" }}>{GALLERY_COPY.title2[locale]}</span>
          </h1>
          <p className="mb-20" style={{ color: "var(--ink-2)", fontSize: "clamp(16px,1.6vw,19px)", lineHeight: 1.6, maxWidth: 640 }}>
            {GALLERY_COPY.intro[locale]}
          </p>
        </Reveal>

        <div className="flex flex-col gap-8">
          <Reveal>
            <TournamentRow />
          </Reveal>
          <Reveal delay={70}>
            <ReportRow />
          </Reveal>
          {MATCHES_BY_RECENT.map((m, i) => (
            <Reveal key={m.slug} delay={(i + 1) * 90}>
              <Row match={m} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
