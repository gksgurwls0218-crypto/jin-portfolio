import type { MatchFrontmatter } from "@/lib/mdx";
import { MATCHES } from "@/lib/matchGallery";
import GoalsSummary from "@/components/match/GoalsSummary";

function Chip({ label, color }: { label: string; color: string }) {
  return (
    <span className="mono ml-1.5 px-1.5 py-0.5 rounded" style={{ fontSize: 10, color, border: `0.5px solid ${color}55` }}>
      {label}
    </span>
  );
}

function Stat({ label, value, extra }: { label: string; value: string; extra?: React.ReactNode }) {
  return (
    <div className="rounded-xl px-4 py-3" style={{ background: "var(--stage-3)", border: "0.5px solid var(--edge)", minWidth: 118 }}>
      <div className="mono mb-1" style={{ fontSize: 11, letterSpacing: ".1em", color: "var(--ink-3)" }}>{label}{extra}</div>
      <div className="mono" style={{ fontSize: 17, fontWeight: 500, color: "var(--green-bright)" }}>{value}</div>
    </div>
  );
}

export default function MatchHeader({ frontmatter }: { frontmatter: MatchFrontmatter }) {
  const { competition, date, venue, home, away, stats, tags } = frontmatter;
  return (
    <div className="px-6 md:px-10 pt-28 pb-10" style={{ background: "var(--stage)", borderBottom: "0.5px solid var(--edge)" }}>
      <div className="max-w-[1000px] mx-auto">
        <p className="mono t-eyebrow kicker mb-6" style={{ color: "var(--green-mid)" }}>
          02 / Match Analysis · {competition}
        </p>
        <div className="flex items-center gap-5 md:gap-7 flex-wrap mb-4">
          <span className="display" style={{ fontSize: "clamp(26px,4vw,44px)", color: "var(--ink)", letterSpacing: "-0.02em" }}>{home.name}</span>
          <span className="display" style={{ fontSize: "clamp(30px,5vw,52px)", color: "var(--green-bright)", letterSpacing: "-0.03em" }}>{home.score}&nbsp;–&nbsp;{away.score}</span>
          <span className="display" style={{ fontSize: "clamp(26px,4vw,44px)", color: "var(--ink)", letterSpacing: "-0.02em" }}>{away.name}</span>
        </div>
        <p className="mono mb-6" style={{ fontSize: 13, color: "var(--ink-3)" }}>
          {date} · {venue}
        </p>

        {(() => {
          const gm = MATCHES.find((m) => m.slug === frontmatter.slug);
          return gm && gm.goals.length > 0 ? (
            <div className="mb-7 pb-6 max-w-[560px]" style={{ borderBottom: "0.5px solid var(--edge)" }}>
              <GoalsSummary match={gm} />
            </div>
          ) : null;
        })()}

        <div className="flex gap-3 flex-wrap mb-5">
          <Stat label="Possession" value={`${stats.possession[0]} / ${stats.possession[1]}`} />
          <Stat label="xG" value={`${stats.xg.value[0]} / ${stats.xg.value[1]}`} extra={stats.xg.verify ? <Chip label="verify" color="#e8536a" /> : null} />
          <Stat label="Field Tilt" value={`${stats.fieldTilt.value}%`} extra={stats.fieldTilt.est ? <Chip label="est" color="#c9a24a" /> : null} />
          <Stat label="PPDA" value={`${stats.ppda.value[0]} / ${stats.ppda.value[1]}`} extra={stats.ppda.est ? <Chip label="est" color="#c9a24a" /> : null} />
        </div>

        <div className="flex gap-2 flex-wrap">
          {tags.map((t) => (
            <span key={t} className="mono px-3 py-1.5 rounded-full" style={{ fontSize: 12, background: "var(--green-soft)", color: "var(--green-bright)", border: "0.5px solid var(--green-line)" }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
