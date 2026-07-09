"use client";
import Link from "next/link";
import { useState } from "react";
import Crest from "@/components/Crest";
import MatchBoard from "@/components/match/MatchBoard";
import Reveal from "@/components/Reveal";
import { MATCHES, type GalleryMatch, type Goal } from "@/lib/matchGallery";

function GoalsList({ match }: { match: GalleryMatch }) {
  if (match.goals.length === 0) {
    const goalless = match.home.score === 0 && match.away.score === 0;
    return (
      <p className="mono" style={{ fontSize: 11, color: "var(--ink-4)" }}>
        {goalless ? "Goalless draw" : "Scorers to be added"}
      </p>
    );
  }
  const line = (g: Goal, i: number) => (
    <div key={i} className="flex items-baseline gap-2.5">
      <span className="mono" style={{ fontSize: 11, color: "var(--ink-4)", width: 26 }}>{g.minute}&rsquo;</span>
      <span
        style={{ width: 6, height: 6, borderRadius: "50%", background: g.team === "home" ? "var(--green-bright)" : "#ff6a5a", transform: "translateY(-1px)" }}
      />
      <span style={{ fontSize: 13, color: "var(--ink)", fontWeight: 500 }}>{g.scorer}</span>
      {g.assist && <span className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>· assist {g.assist}</span>}
    </div>
  );
  return <div className="flex flex-col gap-1.5">{match.goals.map(line)}</div>;
}

function Row({ match }: { match: GalleryMatch }) {
  const [hover, setHover] = useState(false);

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
            <span className="mono px-2 py-0.5 rounded-full" style={{ fontSize: 9, background: "var(--green-soft)", color: "var(--green-bright)", border: "0.5px solid var(--green-line)" }}>FEATURED</span>
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
          <GoalsList match={match} />
          <span
            className="mono inline-flex items-center gap-1.5 w-fit mt-1"
            style={{ fontSize: 12.5, color: "var(--green-mid)" }}
          >
            View analysis
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

export default function MatchGallery() {
  return (
    <section className="relative px-6 md:px-10 pt-36 pb-40" style={{ background: "var(--stage-2)" }}>
      <div className="max-w-[1180px] mx-auto">
        <Reveal>
          <p className="mono t-eyebrow kicker mb-7">02 / Match Analysis</p>
          <h1 className="display t-section mb-8" style={{ color: "var(--ink)", maxWidth: 900 }}>
            Theory applied to<br />
            <span style={{ color: "var(--green-bright)" }}>matches analysed.</span>
          </h1>
          <p className="mb-20" style={{ color: "var(--ink-2)", fontSize: "clamp(16px,1.6vw,19px)", lineHeight: 1.6, maxWidth: 640 }}>
            Each analysis states what the framework predicted, then reports what actually happened. Hover a match to see both line-ups — then step inside.
          </p>
        </Reveal>

        <div className="flex flex-col gap-8">
          {MATCHES.map((m, i) => (
            <Reveal key={m.slug} delay={i * 90}>
              <Row match={m} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
