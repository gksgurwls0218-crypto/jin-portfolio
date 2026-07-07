import type { MatchFrontmatter } from "@/lib/mdx";

function EstChip() {
  return (
    <span className="mono ml-1.5 px-1.5 py-0.5 rounded" style={{ fontSize: 8, color: "rgba(255,190,115,.85)", border: "0.5px solid rgba(255,155,70,.4)" }}>
      est.
    </span>
  );
}
function VerifyChip() {
  return (
    <span className="mono ml-1.5 px-1.5 py-0.5 rounded" style={{ fontSize: 8, color: "#e8536a", border: "0.5px solid rgba(232,83,106,.4)" }}>
      [verify]
    </span>
  );
}

export default function MatchHeader({ frontmatter }: { frontmatter: MatchFrontmatter }) {
  const { competition, date, venue, home, away, stats, tags } = frontmatter;
  return (
    <div className="px-6 md:px-12 pt-14 pb-8" style={{ borderBottom: "0.5px solid rgba(255,255,255,.06)" }}>
      <p className="mono mb-4" style={{ fontSize: 10, letterSpacing: ".2em", color: "rgba(255,155,70,.88)" }}>
        02 / MATCH ANALYSIS · {competition.toUpperCase()}
      </p>
      <div className="flex items-baseline gap-5 flex-wrap mb-3.5">
        <span className="font-medium" style={{ fontSize: 30, color: "rgba(238,234,228,.97)" }}>{home.name}</span>
        <span className="mono" style={{ fontSize: 30, color: "var(--amber, #ffb356)" }}>{home.score} — {away.score}</span>
        <span className="font-medium" style={{ fontSize: 30, color: "rgba(238,234,228,.97)" }}>{away.name}</span>
      </div>
      <p className="mono mb-4.5" style={{ fontSize: 10.5, color: "rgba(215,205,195,.6)" }}>
        {date} · {venue} · Referee-agnostic tactical read
      </p>

      <div className="flex gap-2.5 flex-wrap mb-4">
        <div className="rounded-lg px-3.5 py-2" style={{ background: "rgba(255,255,255,.035)", border: "0.5px solid rgba(255,145,60,.18)", minWidth: 110 }}>
          <div className="mono" style={{ fontSize: 8.5, letterSpacing: ".1em", color: "rgba(215,205,195,.55)" }}>POSSESSION</div>
          <div className="mono" style={{ fontSize: 14, color: "rgba(255,205,140,.95)" }}>{stats.possession[0]} / {stats.possession[1]}</div>
        </div>
        <div className="rounded-lg px-3.5 py-2" style={{ background: "rgba(255,255,255,.035)", border: "0.5px solid rgba(255,145,60,.18)", minWidth: 110 }}>
          <div className="mono" style={{ fontSize: 8.5, letterSpacing: ".1em", color: "rgba(215,205,195,.55)" }}>
            xG {stats.xg.verify && <VerifyChip />}
          </div>
          <div className="mono" style={{ fontSize: 14, color: "rgba(255,205,140,.95)" }}>{stats.xg.value[0]} / {stats.xg.value[1]}</div>
        </div>
        <div className="rounded-lg px-3.5 py-2" style={{ background: "rgba(255,255,255,.035)", border: "0.5px solid rgba(255,145,60,.18)", minWidth: 110 }}>
          <div className="mono" style={{ fontSize: 8.5, letterSpacing: ".1em", color: "rgba(215,205,195,.55)" }}>
            FIELD TILT {stats.fieldTilt.est && <EstChip />}
          </div>
          <div className="mono" style={{ fontSize: 14, color: "rgba(255,205,140,.95)" }}>{stats.fieldTilt.value}%</div>
        </div>
        <div className="rounded-lg px-3.5 py-2" style={{ background: "rgba(255,255,255,.035)", border: "0.5px solid rgba(255,145,60,.18)", minWidth: 110 }}>
          <div className="mono" style={{ fontSize: 8.5, letterSpacing: ".1em", color: "rgba(215,205,195,.55)" }}>
            PPDA {stats.ppda.est && <EstChip />}
          </div>
          <div className="mono" style={{ fontSize: 14, color: "rgba(255,205,140,.95)" }}>{stats.ppda.value[0]} / {stats.ppda.value[1]}</div>
        </div>
      </div>

      <div className="flex gap-1.5 flex-wrap">
        {tags.map((t) => (
          <span key={t} className="mono px-2.5 py-1 rounded-md" style={{ fontSize: 9, background: "rgba(255,135,45,.14)", color: "rgba(255,190,115,.94)", border: "0.5px solid rgba(255,145,55,.28)" }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
