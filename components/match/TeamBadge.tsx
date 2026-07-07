// Placeholder team/country identity mark.
// Swap-ready: once real crest/flag image assets are added under /public,
// replace the gradient-monogram <div> below with a Next <Image> using the
// same `size` prop and this file is the only thing that needs to change.

type Visual = { initials: string; colors: [string, string]; shape: "crest" | "flag" };

const TEAM_VISUALS: Record<string, Visual> = {
  PSG: { initials: "PSG", colors: ["#0a1a4a", "#e0264c"], shape: "crest" },
  "Inter Milan": { initials: "INT", colors: ["#0a1638", "#1a3a8f"], shape: "crest" },
  "Bayern Munich": { initials: "FCB", colors: ["#c8102e", "#0a1638"], shape: "crest" },
  Korea: { initials: "KOR", colors: ["#c60c30", "#003478"], shape: "flag" },
  Paraguay: { initials: "PAR", colors: ["#d52b1e", "#0038a8"], shape: "flag" },
};

function fallbackVisual(name: string): Visual {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
  return { initials, colors: ["#1f7a3d", "#14532a"], shape: "crest" };
}

export default function TeamBadge({ name, size = 40 }: { name: string; size?: number }) {
  const v = TEAM_VISUALS[name] ?? fallbackVisual(name);
  const isFlag = v.shape === "flag";

  return (
    <div
      title={name}
      style={{
        width: size,
        height: size,
        borderRadius: isFlag ? 6 : "50%",
        background: `linear-gradient(135deg, ${v.colors[0]} 0%, ${v.colors[1]} 100%)`,
        border: "0.5px solid rgba(20,30,20,0.1)",
        boxShadow: "0 2px 8px rgba(20,40,20,0.12)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <span
        className="mono"
        style={{
          fontSize: size * 0.26,
          fontWeight: 700,
          color: "rgba(255,255,255,0.92)",
          letterSpacing: "-0.02em",
        }}
      >
        {v.initials}
      </span>
    </div>
  );
}
