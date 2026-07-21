import { layout, type Spot } from "@/lib/formation";
import type { GalleryMatch } from "@/lib/matchGallery";

function Team({ spots, color, textColor }: { spots: Spot[]; color: string; textColor: string }) {
  return (
    <>
      {spots.map((s, i) => (
        <div
          key={i}
          className="absolute flex flex-col items-center"
          style={{ left: `${s.x}%`, top: `${s.y}%`, transform: "translate(-50%,-50%)", width: 64 }}
        >
          <span
            style={{
              width: s.gk ? 15 : 17, height: s.gk ? 15 : 17, borderRadius: "50%",
              background: color, border: `1px solid ${textColor}`,
              boxShadow: "0 2px 6px rgba(0,0,0,0.5)",
            }}
          />
          <span
            className="mono"
            style={{ marginTop: 3, fontSize: 8.5, lineHeight: 1, color: "#f2f0ec", whiteSpace: "nowrap", textShadow: "0 1px 3px rgba(0,0,0,0.9)" }}
          >
            {s.name}
          </span>
        </div>
      ))}
    </>
  );
}

export default function MatchBoard({ match }: { match: GalleryMatch }) {
  const home = layout(match.lineups.home, "home");
  const away = layout(match.lineups.away, "away");

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl" style={{ background: "linear-gradient(135deg, #08130c 0%, #060d09 100%)" }}>
      {/* pitch markings */}
      <svg viewBox="0 0 100 56" preserveAspectRatio="none" className="absolute inset-0 w-full h-full" style={{ opacity: 0.4 }}>
        <rect x="1" y="1" width="98" height="54" fill="none" stroke="rgba(72,132,58,.55)" strokeWidth="0.3" />
        <line x1="50" y1="1" x2="50" y2="55" stroke="rgba(72,132,58,.55)" strokeWidth="0.3" />
        <circle cx="50" cy="28" r="7" fill="none" stroke="rgba(72,132,58,.55)" strokeWidth="0.3" />
        <rect x="1" y="17" width="12" height="22" fill="none" stroke="rgba(72,132,58,.55)" strokeWidth="0.3" />
        <rect x="87" y="17" width="12" height="22" fill="none" stroke="rgba(72,132,58,.55)" strokeWidth="0.3" />
      </svg>

      {/* formation labels */}
      <span className="mono absolute top-3 left-4" style={{ fontSize: 10, color: "#5fd67f", letterSpacing: "0.1em" }}>
        {match.home.name} · {match.lineups.home.formation}
      </span>
      <span className="mono absolute top-3 right-4 text-right" style={{ fontSize: 10, color: "rgba(255,150,140,0.9)", letterSpacing: "0.1em" }}>
        {match.away.name} · {match.lineups.away.formation}
      </span>

      <Team spots={home} color="#5fd67f" textColor="rgba(6,24,10,0.9)" />
      <Team spots={away} color="#ff6a5a" textColor="rgba(30,6,6,0.9)" />
    </div>
  );
}
