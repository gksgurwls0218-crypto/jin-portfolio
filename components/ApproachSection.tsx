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
    <section className="px-6 md:px-9 py-24 md:py-28" style={{ background: "var(--light-bg)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-14">
          <div>
            <p className="mono text-xs tracking-[0.18em] mb-3" style={{ color: "var(--accent)" }}>
              01 / APPROACH
            </p>
            <h2 className="font-medium" style={{ color: "var(--light-text)", fontSize: "clamp(24px, 3vw, 32px)", lineHeight: 1.25 }}>
              A football built to be<br />
              <span style={{ color: "var(--accent)" }}>unpredictable by design</span>
            </h2>
          </div>
          <Link
            href="/approach"
            className="mono text-xs tracking-wider shrink-0"
            style={{ color: "var(--accent)", borderBottom: "0.5px solid var(--accent-soft-border)", paddingBottom: "2px" }}
          >
            Read the full essay →
          </Link>
        </div>

        <div
          className="rounded-2xl p-6 md:p-7 mb-8"
          style={{
            background: "var(--accent-soft-bg)",
            border: "0.5px solid var(--light-border)",
            borderLeft: "3px solid var(--accent)",
          }}
        >
          <blockquote className="leading-relaxed" style={{ color: "var(--light-text)", fontSize: "15px", fontStyle: "italic" }}>
            &ldquo;A moment of variation — a variable or a mutation — induces a few seconds of buffering in the opponent&rsquo;s system.
            Those few seconds change the game. When the system cannot respond to the buffering, the system collapses.&rdquo;
          </blockquote>
          <p className="mono text-xs mt-4" style={{ color: "var(--light-text-muted)" }}>— Variation theory · Jin</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {concepts.map((c) => (
            <Link
              href="/approach"
              key={c.title}
              className="rounded-2xl p-6 flex flex-col gap-4 transition-all duration-200"
              style={{
                background: "var(--light-card-bg)",
                border: "0.5px solid var(--light-border)",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--accent-soft-border)";
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = "0 12px 28px rgba(20,50,20,0.08)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--light-border)";
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="mono tracking-wider"
                  style={{ fontSize: "9px", color: "var(--light-text-muted)" }}
                >
                  {c.tag}
                </span>
                <span
                  className="mono px-2.5 py-1 rounded-md"
                  style={{
                    fontSize: "9px",
                    background: "var(--accent-tag-bg)",
                    color: "var(--accent-tag-text)",
                    border: "0.5px solid var(--accent-soft-border)",
                  }}
                >
                  {c.metric}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-medium" style={{ fontSize: "15px", color: "var(--light-text)" }}>{c.title}</h3>
                <p style={{ fontSize: "13px", lineHeight: "1.7", color: "var(--light-text-secondary)" }}>{c.desc}</p>
              </div>
              <span className="mono mt-auto pt-1" style={{ fontSize: "10px", color: "var(--accent)" }}>→ full theory</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
