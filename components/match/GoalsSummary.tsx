import type { GalleryMatch, Side } from "@/lib/matchGallery";

function fmt(min: number, plus?: number, pen?: boolean) {
  return `${min}${plus ? `+${plus}` : ""}'${pen ? " (p)" : ""}`;
}

// group a team's goals by scorer (preserving order), joining minutes
function group(match: GalleryMatch, team: Side) {
  const gs = match.goals.filter((g) => g.team === team);
  const order: string[] = [];
  const map: Record<string, string[]> = {};
  gs.forEach((g) => {
    if (!map[g.scorer]) { map[g.scorer] = []; order.push(g.scorer); }
    map[g.scorer].push(fmt(g.minute, g.plus, g.pen));
  });
  return order.map((s) => ({ scorer: s, mins: map[s].join(", ") }));
}

function Col({ rows, align }: { rows: { scorer: string; mins: string }[]; align: "right" | "left" }) {
  return (
    <div className={`flex flex-col gap-1.5 ${align === "right" ? "text-right items-end" : "text-left items-start"}`}>
      {rows.map((r) => (
        <div key={r.scorer + r.mins} className="flex flex-wrap gap-x-1.5" style={{ justifyContent: align === "right" ? "flex-end" : "flex-start" }}>
          <span style={{ fontSize: 14, color: "var(--ink)", fontWeight: 500 }}>{r.scorer}</span>
          <span className="mono" style={{ fontSize: 13, color: "var(--ink-3)" }}>{r.mins}</span>
        </div>
      ))}
    </div>
  );
}

export default function GoalsSummary({ match }: { match: GalleryMatch }) {
  const home = group(match, "home");
  const away = group(match, "away");
  if (home.length === 0 && away.length === 0) {
    const goalless = match.home.score === 0 && match.away.score === 0;
    return <p className="mono" style={{ fontSize: 12.5, color: "var(--ink-4)" }}>{goalless ? "Goalless draw" : "Scorers to be added"}</p>;
  }
  return (
    <div className="flex items-start justify-center gap-4 md:gap-6">
      <div className="flex-1 min-w-0"><Col rows={home} align="right" /></div>
      <span aria-hidden style={{ marginTop: 2, color: "var(--green-mid)", fontSize: 15, flexShrink: 0 }}>⚽</span>
      <div className="flex-1 min-w-0"><Col rows={away} align="left" /></div>
    </div>
  );
}
