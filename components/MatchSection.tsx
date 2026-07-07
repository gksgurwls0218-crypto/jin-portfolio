"use client";
import Link from "next/link";

const matches = [
  {
    slug: "psg-inter-ucl-2025",
    competition: "UEFA Champions League · Final",
    date: "2025.05.31",
    home: "PSG",
    away: "Inter Milan",
    tags: ["Mutation", "Pre-Half Space", "season-scale Lure & Shock"],
    metrics: ["xT", "field tilt", "pass network"],
    highlight: true,
  },
  {
    slug: "psg-bayern-ucl-2026",
    competition: "UEFA Champions League · Semi Final",
    date: "2026.04–05",
    home: "PSG",
    away: "Bayern Munich",
    tags: ["variation trigger", "hybrid formation", "PPDA"],
    metrics: ["PPDA", "VAEP", "defensive line"],
    highlight: false,
  },
  {
    slug: "korea-paraguay-2026",
    competition: "International Friendly",
    date: "2026.04.20",
    home: "Korea",
    away: "Paraguay",
    tags: ["overload to isolation", "Plan A−", "left flank"],
    metrics: ["xT", "field tilt", "progressive passes"],
    highlight: false,
  },
];

export default function MatchSection() {
  return (
    <section className="px-9 py-16" style={{ background: "#0e0a06", borderTop: "0.5px solid rgba(255,255,255,0.06)" }}>
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="mono text-xs tracking-widest mb-3" style={{ color: "rgba(255,155,70,0.88)" }}>
            02 / MATCH ANALYSIS
          </p>
          <h2 className="text-2xl font-medium" style={{ color: "rgba(238,234,228,0.97)" }}>
            Theory applied to<br />
            <span style={{ color: "rgba(255,215,120,0.96)" }}>matches analysed</span>
          </h2>
        </div>
        <Link
          href="/match-analysis"
          className="mono text-xs tracking-wider"
          style={{ color: "rgba(255,165,85,0.88)", borderBottom: "0.5px solid rgba(255,165,85,0.35)", paddingBottom: "1px" }}
        >
          All analyses →
        </Link>
      </div>

      <div className="flex flex-col gap-2.5">
        {matches.map((m) => (
          <Link
            key={m.slug}
            href={`/match-analysis/${m.slug}`}
            className="rounded-xl px-5 py-4 flex items-center justify-between gap-6 transition-all duration-200"
            style={{
              background: m.highlight ? "rgba(255,130,40,0.08)" : "rgba(255,255,255,0.025)",
              border: m.highlight ? "0.5px solid rgba(255,155,70,0.26)" : "0.5px solid rgba(255,145,60,0.14)",
              backdropFilter: "blur(6px)",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = m.highlight ? "rgba(255,140,45,0.14)" : "rgba(255,130,40,0.07)";
              el.style.borderColor = "rgba(255,165,75,0.42)";
              el.style.transform = "translateY(-2px)";
              el.style.boxShadow = "0 8px 28px rgba(200,100,30,0.1)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = m.highlight ? "rgba(255,130,40,0.08)" : "rgba(255,255,255,0.025)";
              el.style.borderColor = m.highlight ? "rgba(255,155,70,0.26)" : "rgba(255,145,60,0.14)";
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "none";
            }}
          >
            <div className="flex flex-col gap-1.5 min-w-0">
              <span className="mono" style={{ fontSize: "9px", color: "rgba(210,205,200,0.72)" }}>
                {m.competition} · {m.date}
              </span>
              <div className="flex items-baseline gap-3">
                <span className="font-medium" style={{ fontSize: "15px", color: "rgba(238,234,228,0.97)" }}>{m.home}</span>
                <span className="mono" style={{ fontSize: "9px", color: "rgba(200,200,195,0.55)" }}>vs</span>
                <span className="font-medium" style={{ fontSize: "15px", color: "rgba(238,234,228,0.97)" }}>{m.away}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-0.5">
                {m.tags.map((t) => (
                  <span
                    key={t}
                    className="mono px-2.5 py-1 rounded-md"
                    style={{
                      fontSize: "9px",
                      background: "rgba(255,135,45,0.15)",
                      color: "rgba(255,190,115,0.94)",
                      border: "0.5px solid rgba(255,145,55,0.28)",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1 text-right shrink-0">
              <span className="mono" style={{ fontSize: "9px", color: "rgba(200,198,195,0.62)" }}>metrics</span>
              {m.metrics.map((metric) => (
                <span key={metric} className="mono" style={{ fontSize: "10px", color: "rgba(255,172,88,0.90)" }}>
                  {metric}
                </span>
              ))}
              <span className="mono mt-1.5" style={{ fontSize: "9px", color: "rgba(255,158,72,0.65)" }}>
                → view analysis
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
