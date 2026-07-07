import type { Metadata } from "next";
import Link from "next/link";
import { getAllMatchesFrontmatter } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Match Analysis | Jin",
  description: "Variation theory applied to real matches — including the moments where it fails.",
};

export default function MatchAnalysisIndexPage() {
  const matches = getAllMatchesFrontmatter();

  return (
    <div className="px-6 md:px-12 py-16" style={{ background: "#0e0a06", minHeight: "60vh" }}>
      <p className="mono mb-3" style={{ fontSize: 10, letterSpacing: ".2em", color: "rgba(255,155,70,.88)" }}>
        02 / MATCH ANALYSIS
      </p>
      <h1 className="font-medium mb-4" style={{ fontSize: 26, color: "rgba(238,234,228,.97)" }}>
        Theory applied to matches analysed
      </h1>
      <p className="mb-10 max-w-[640px]" style={{ fontSize: 13.5, color: "rgba(220,210,195,.72)" }}>
        How to read these: each analysis states what the framework predicted before kick-off, then reports what actually happened — including at least one place where the theory strained or broke. The match is evidence, not a highlight reel.
      </p>

      <div className="flex flex-col gap-2.5">
        {matches.map((m) => (
          <Link
            key={m.slug}
            href={`/match-analysis/${m.slug}`}
            className="rounded-xl px-5 py-4 flex items-center justify-between gap-6 transition-all duration-200"
            style={{
              background: m.featured ? "rgba(255,130,40,0.08)" : "rgba(255,255,255,0.025)",
              border: m.featured ? "0.5px solid rgba(255,155,70,0.26)" : "0.5px solid rgba(255,145,60,0.14)",
              backdropFilter: "blur(6px)",
            }}
          >
            <div className="flex flex-col gap-1.5 min-w-0">
              <span className="mono" style={{ fontSize: 9, color: "rgba(210,205,200,0.72)" }}>
                {m.competition} · {m.date}
              </span>
              <div className="flex items-baseline gap-3">
                <span className="font-medium" style={{ fontSize: 15, color: "rgba(238,234,228,0.97)" }}>{m.home.name} {m.home.score}</span>
                <span className="mono" style={{ fontSize: 9, color: "rgba(200,200,195,0.55)" }}>—</span>
                <span className="font-medium" style={{ fontSize: 15, color: "rgba(238,234,228,0.97)" }}>{m.away.score} {m.away.name}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-0.5">
                {m.tags.map((t) => (
                  <span key={t} className="mono px-2.5 py-1 rounded-md" style={{ fontSize: 9, background: "rgba(255,135,45,0.15)", color: "rgba(255,190,115,0.94)", border: "0.5px solid rgba(255,145,55,0.28)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <span className="mono shrink-0" style={{ fontSize: 9, color: "rgba(255,158,72,0.65)" }}>→ view analysis</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
