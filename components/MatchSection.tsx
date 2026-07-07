"use client";
import Link from "next/link";
import { useRef } from "react";
import TeamBadge from "@/components/match/TeamBadge";

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
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>("[data-card]");
    const amount = (card?.offsetWidth ?? 360) + 20;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="relative px-6 md:px-9 py-24 md:py-28 overflow-hidden" style={{ background: "var(--light-bg-alt)" }}>
      {/* soft decorative glass backdrop for the carousel's glassmorphism to read against */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: "-10%", right: "-6%", width: 420, height: 420, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(31,122,61,0.14) 0%, transparent 70%)",
          filter: "blur(10px)",
        }}
      />
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          bottom: "-14%", left: "-8%", width: 380, height: 380, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(31,122,61,0.10) 0%, transparent 70%)",
          filter: "blur(10px)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-14">
          <div>
            <p className="mono text-xs tracking-[0.18em] mb-3" style={{ color: "var(--accent)" }}>
              02 / MATCH ANALYSIS
            </p>
            <h2 className="font-medium" style={{ color: "var(--light-text)", fontSize: "clamp(24px, 3vw, 32px)", lineHeight: 1.25 }}>
              Theory applied to<br />
              <span style={{ color: "var(--accent)" }}>matches analysed</span>
            </h2>
          </div>
          <Link
            href="/match-analysis"
            className="mono text-xs tracking-wider shrink-0"
            style={{ color: "var(--accent)", borderBottom: "0.5px solid var(--accent-soft-border)", paddingBottom: "2px" }}
          >
            All analyses →
          </Link>
        </div>

        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto hide-scrollbar pb-2"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {matches.map((m) => (
            <Link
              key={m.slug}
              data-card
              href={`/match-analysis/${m.slug}`}
              className="flex flex-col gap-5 rounded-2xl p-6 transition-all duration-200 shrink-0"
              style={{
                width: 360,
                scrollSnapAlign: "start",
                background: "rgba(255,255,255,0.62)",
                backdropFilter: "blur(20px) saturate(160%)",
                WebkitBackdropFilter: "blur(20px) saturate(160%)",
                border: m.highlight ? "0.5px solid var(--accent-soft-border)" : "0.5px solid var(--light-border-strong)",
                boxShadow: "0 8px 30px rgba(20,40,20,0.08)",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-3px)";
                el.style.boxShadow = "0 16px 38px rgba(20,50,20,0.14)";
                el.style.borderColor = "var(--accent-soft-border)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "0 8px 30px rgba(20,40,20,0.08)";
                el.style.borderColor = m.highlight ? "var(--accent-soft-border)" : "var(--light-border-strong)";
              }}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="mono" style={{ fontSize: "9px", color: "var(--light-text-muted)" }}>
                  {m.competition} · {m.date}
                </span>
                {m.highlight && (
                  <span
                    className="mono px-2 py-0.5 rounded-md shrink-0"
                    style={{ fontSize: "8px", background: "var(--accent-tag-bg)", color: "var(--accent-tag-text)", border: "0.5px solid var(--accent-soft-border)" }}
                  >
                    FEATURED
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col items-center gap-2 min-w-0">
                  <TeamBadge name={m.home} />
                  <span className="font-medium text-center" style={{ fontSize: "13px", color: "var(--light-text)" }}>{m.home}</span>
                </div>
                <span className="mono shrink-0" style={{ fontSize: "10px", color: "var(--light-text-muted)" }}>vs</span>
                <div className="flex flex-col items-center gap-2 min-w-0">
                  <TeamBadge name={m.away} />
                  <span className="font-medium text-center" style={{ fontSize: "13px", color: "var(--light-text)" }}>{m.away}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {m.tags.map((t) => (
                  <span
                    key={t}
                    className="mono px-2.5 py-1 rounded-md"
                    style={{ fontSize: "9px", background: "var(--accent-tag-bg)", color: "var(--accent-tag-text)", border: "0.5px solid var(--accent-soft-border)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3" style={{ borderTop: "0.5px solid var(--light-border)" }}>
                <div className="flex gap-2">
                  {m.metrics.map((metric) => (
                    <span key={metric} className="mono" style={{ fontSize: "9px", color: "var(--light-text-muted)" }}>
                      {metric}
                    </span>
                  ))}
                </div>
                <span className="mono" style={{ fontSize: "10px", color: "var(--accent)" }}>→ view analysis</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            aria-label="previous match"
            onClick={() => scrollByCard(-1)}
            className="mono flex items-center justify-center rounded-full transition-all duration-150"
            style={{
              width: 38, height: 38,
              background: "rgba(255,255,255,0.7)",
              backdropFilter: "blur(12px)",
              border: "0.5px solid var(--light-border-strong)",
              color: "var(--light-text)",
              fontSize: "14px",
            }}
          >
            ‹
          </button>
          <button
            aria-label="next match"
            onClick={() => scrollByCard(1)}
            className="mono flex items-center justify-center rounded-full transition-all duration-150"
            style={{
              width: 38, height: 38,
              background: "var(--accent)",
              border: "0.5px solid var(--accent-strong)",
              color: "#fff",
              fontSize: "14px",
            }}
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
