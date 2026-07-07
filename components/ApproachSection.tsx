"use client";
import Link from "next/link";
import Reveal from "@/components/Reveal";

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
    <section className="px-6 md:px-12 py-24 md:py-32" style={{ background: "var(--light-bg)" }}>
      <div className="max-w-[1180px] mx-auto">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-14">
            <div>
              <p className="mono text-xs tracking-[0.18em] mb-4" style={{ color: "var(--accent)" }}>
                01 / APPROACH
              </p>
              <h2 className="font-semibold" style={{ color: "var(--light-text)", fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1.2, letterSpacing: "-0.01em" }}>
                A football built to be<br />
                <span style={{ color: "var(--accent)" }}>unpredictable by design</span>
              </h2>
            </div>
            <Link
              href="/approach"
              className="mono text-sm tracking-wider shrink-0"
              style={{ color: "var(--accent)", borderBottom: "0.5px solid var(--accent-soft-border)", paddingBottom: "2px" }}
            >
              Read the full essay →
            </Link>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div
            className="rounded-[20px] p-9 mb-10"
            style={{
              background: "var(--accent-soft-bg)",
              border: "0.5px solid var(--light-border)",
              borderLeft: "4px solid var(--accent)",
            }}
          >
            <blockquote className="leading-relaxed" style={{ color: "var(--light-text)", fontSize: "18px", fontStyle: "italic" }}>
              &ldquo;A moment of variation — a variable or a mutation — induces a few seconds of buffering in the opponent&rsquo;s system.
              Those few seconds change the game. When the system cannot respond to the buffering, the system collapses.&rdquo;
            </blockquote>
            <p className="mono text-xs mt-4" style={{ color: "var(--light-text-muted)" }}>— Variation theory · Jin</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
          {concepts.map((c, i) => (
            <Reveal key={c.title} delay={160 + i * 80}>
              <Link
                href="/approach"
                className="rounded-[20px] p-9 flex flex-col gap-5 transition-all duration-200 h-full"
                style={{
                  background: "var(--light-card-bg)",
                  border: "0.5px solid var(--light-border)",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--accent-soft-border)";
                  el.style.transform = "translateY(-4px)";
                  el.style.boxShadow = "0 20px 40px rgba(20,50,20,0.1)";
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
                    style={{ fontSize: "11px", color: "var(--light-text-muted)" }}
                  >
                    {c.tag}
                  </span>
                  <span
                    className="mono px-3 py-1.5 rounded-lg"
                    style={{
                      fontSize: "11px",
                      background: "var(--accent-tag-bg)",
                      color: "var(--accent-tag-text)",
                      border: "0.5px solid var(--accent-soft-border)",
                    }}
                  >
                    {c.metric}
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="font-semibold" style={{ fontSize: "20px", color: "var(--light-text)" }}>{c.title}</h3>
                  <p style={{ fontSize: "14.5px", lineHeight: "1.75", color: "var(--light-text-secondary)" }}>{c.desc}</p>
                </div>
                <span
                  className="mono mt-auto w-fit"
                  style={{
                    fontSize: "12px",
                    color: "var(--accent)",
                    background: "var(--accent-tag-bg)",
                    border: "0.5px solid var(--accent-soft-border)",
                    padding: "9px 16px",
                    borderRadius: "10px",
                  }}
                >
                  → full theory
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
