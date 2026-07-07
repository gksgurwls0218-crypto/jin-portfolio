/* Team crest.
   ── Swap in real logos: drop a file at /public/logos/<key>.svg (or .png) and set
   `logo: "/logos/psg.svg"` on the matching entry below. When `logo` is set the
   image is used; otherwise a colour-coded monogram crest is drawn.  */

export type TeamKey = "PSG" | "Inter Milan" | "Bayern Munich" | "Korea" | "Paraguay";

type CrestMeta = {
  initials: string;
  ring: string;       // outer ring / accent
  fill: [string, string]; // gradient body
  text: string;
  logo?: string;      // optional real-logo path in /public
};

const CRESTS: Record<string, CrestMeta> = {
  PSG:             { initials: "PSG", ring: "#e30613", fill: ["#0a1a4a", "#04102e"], text: "#ffffff" },
  "Inter Milan":   { initials: "INT", ring: "#1a6fd6", fill: ["#0a1230", "#04091c"], text: "#ffffff" },
  "Bayern Munich": { initials: "FCB", ring: "#dc052d", fill: ["#c8102e", "#7a0a1e"], text: "#ffffff" },
  Korea:           { initials: "KOR", ring: "#c60c30", fill: ["#0a2a6b", "#061a45"], text: "#ffffff" },
  Paraguay:        { initials: "PAR", ring: "#d52b1e", fill: ["#0a3aa0", "#062561"], text: "#ffffff" },
};

function fallback(name: string): CrestMeta {
  const initials = name.split(" ").map((w) => w[0]).join("").slice(0, 3).toUpperCase();
  return { initials, ring: "var(--green-bright)", fill: ["#1f7a3d", "#0f3d1f"], text: "#ffffff" };
}

export default function Crest({ name, size = 60 }: { name: string; size?: number }) {
  const c = CRESTS[name] ?? fallback(name);
  const id = `cr-${name.replace(/\W/g, "")}`;

  if (c.logo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={c.logo} alt={name} width={size} height={size} style={{ objectFit: "contain", display: "block" }} />;
  }

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-label={name} role="img">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.fill[0]} />
          <stop offset="1" stopColor={c.fill[1]} />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="47" fill={`url(#${id})`} stroke={c.ring} strokeWidth="3.5" />
      <circle cx="50" cy="50" r="47" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="0.8" />
      {/* subtle highlight */}
      <ellipse cx="38" cy="32" rx="22" ry="14" fill="rgba(255,255,255,0.08)" />
      <text
        x="50" y="50" dominantBaseline="central" textAnchor="middle"
        fontFamily="var(--font-mono, monospace)" fontSize="27" fontWeight="700"
        fill={c.text} letterSpacing="-1"
      >
        {c.initials}
      </text>
    </svg>
  );
}
