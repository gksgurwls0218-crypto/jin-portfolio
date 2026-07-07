"use client";
import Link from "next/link";

const concepts = [
  {
    tag: "CORE THEORY",
    title: "Lure & Shock",
    desc: "Condition the opponent through repeated cycles. The moment their expectation locks in — the variation triggers system buffering.",
    metric: "xT spike",
  },
  {
    tag: "ORIGINAL CONCEPT",
    title: "Pre-Half Space",
    desc: "The zone between the half-space and the final third — where the attacker receives before the defender can set their angle.",
    metric: "reception zone",
  },
  {
    tag: "STRUCTURE",
    title: "Hybrid 3-2 / 3-1",
    desc: "A build-up core that shifts shape based on pressure — same players, different roles, different variables unlocked.",
    metric: "positional mutation",
  },
];

export default function ApproachSection() {
  return (
    <section className="px-9 py-16" style={{ background: "#07070f", borderTop: "0.5px solid rgba(255,255,255,0.06)" }}>
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="mono text-xs tracking-widest mb-3" style={{ color: "rgba(120,155,255,0.88)" }}>
            01 / APPROACH
          </p>
          <h2 className="text-2xl font-medium" style={{ color: "rgba(238,234,228,0.97)" }}>
            A football built to be<br />
            <span style={{ color: "rgba(165,178,255,0.95)" }}>unpredictable by design</span>
          </h2>
        </div>
        <Link
          href="/approach"
          className="mono text-xs tracking-wider"
          style={{ color: "rgba(140,175,255,0.88)", borderBottom: "0.5px solid rgba(140,175,255,0.35)", paddingBottom: "1px" }}
        >
          Read the full essay →
        </Link>
      </div>

      <div
        className="rounded-xl p-5 mb-7"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "0.5px solid rgba(255,255,255,0.08)",
          borderLeft: "2px solid rgba(90,130,255,0.55)",
          backdropFilter: "blur(8px)",
        }}
      >
        <blockquote className="text-sm leading-relaxed" style={{ color: "rgba(225,222,215,0.92)", fontStyle: "italic" }}>
          &ldquo;A moment of variation — a variable or a mutation — induces a few seconds of buffering in the opponent&rsquo;s system.
          Those few seconds change the game. When the system cannot respond to the buffering, the system collapses.&rdquo;
        </blockquote>
        <p className="mono text-xs mt-3" style={{ color: "rgba(255,255,255,0.38)" }}>— Variation theory · Jin</p>
      </div>

      <div className="grid grid-cols-1 gap-2.5 md:grid-cols-3">
        {concepts.map((c) => (
          <Link
            href="/approach"
            key={c.title}
            className="rounded-xl p-5 flex flex-col gap-3 transition-all duration-200"
            style={{
              background: "rgba(255,255,255,0.032)",
              border: "0.5px solid rgba(100,130,255,0.15)",
              backdropFilter: "blur(6px)",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(120,140,255,0.08)";
              el.style.borderColor = "rgba(140,165,255,0.38)";
              el.style.transform = "translateY(-2px)";
              el.style.boxShadow = "0 8px 28px rgba(80,100,255,0.1)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "rgba(255,255,255,0.032)";
              el.style.borderColor = "rgba(100,130,255,0.15)";
              el.style.transform = "translateY(0)";
              el.style.boxShadow = "none";
            }}
          >
            <div className="flex items-center justify-between">
              <span
                className="mono tracking-wider"
                style={{ fontSize: "9px", color: "rgba(140,172,255,0.82)" }}
              >
                {c.tag}
              </span>
              <span
                className="mono px-2.5 py-1 rounded-md"
                style={{
                  fontSize: "9px",
                  background: "rgba(80,115,255,0.25)",
                  color: "rgba(185,205,255,0.96)",
                  border: "0.5px solid rgba(120,155,255,0.32)",
                }}
              >
                {c.metric}
              </span>
            </div>
            <h3 className="font-medium" style={{ fontSize: "14px", color: "rgba(238,234,228,0.97)" }}>{c.title}</h3>
            <p style={{ fontSize: "12px", lineHeight: "1.7", color: "rgba(210,215,228,0.88)" }}>{c.desc}</p>
            <span className="mono mt-auto" style={{ fontSize: "10px", color: "rgba(140,172,255,0.72)" }}>→ full theory</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
