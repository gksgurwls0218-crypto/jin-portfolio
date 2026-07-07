"use client";
import Link from "next/link";
import Reveal from "@/components/Reveal";

const concepts = [
  {
    n: "A",
    tag: "CORE THEORY",
    title: "Lure & Shock",
    desc: "Condition the opponent through repeated cycles. The moment their expectation locks in — the variation triggers system buffering.",
    metric: "xT spike",
  },
  {
    n: "B",
    tag: "ORIGINAL CONCEPT",
    title: "Pre-Half Space",
    desc: "The zone between the half-space and the final third — where the attacker receives before the defender can set their angle.",
    metric: "reception zone",
  },
  {
    n: "C",
    tag: "STRUCTURE",
    title: "Hybrid 3-2 / 3-1",
    desc: "A build-up core that shifts shape based on pressure — same players, different roles, different variables unlocked.",
    metric: "positional mutation",
  },
];

function tilt(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const px = (e.clientX - r.left) / r.width;
  const py = (e.clientY - r.top) / r.height;
  const rx = (0.5 - py) * 7;
  const ry = (px - 0.5) * 8;
  el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
  el.style.setProperty("--gx", `${px * 100}%`);
  el.style.setProperty("--gy", `${py * 100}%`);
}
function reset(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  el.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateY(0)";
  el.style.boxShadow = "none";
  el.style.borderColor = "var(--edge)";
}

export default function ApproachSection() {
  return (
    <section className="relative px-6 md:px-10 py-28 md:py-40" style={{ background: "var(--stage)" }}>
      <div className="max-w-[1180px] mx-auto">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <p className="mono t-eyebrow kicker mb-6">01 / Approach</p>
              <h2 className="display t-section" style={{ color: "var(--ink)" }}>
                A football built to be<br />
                <span style={{ color: "var(--green-bright)" }}>unpredictable by design.</span>
              </h2>
            </div>
            <Link
              href="/approach"
              className="mono group inline-flex items-center gap-2 shrink-0 transition-colors duration-300"
              style={{ fontSize: 13, color: "var(--ink-3)" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--green-bright)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--ink-3)")}
            >
              Read the full essay
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <blockquote
            className="relative mb-16 md:mb-20 pl-6 md:pl-8"
            style={{ borderLeft: "2px solid var(--green-line)" }}
          >
            <p
              className="display"
              style={{ color: "var(--ink)", fontSize: "clamp(20px,2.6vw,32px)", lineHeight: 1.32, fontWeight: 500, letterSpacing: "-0.02em" }}
            >
              &ldquo;A moment of variation induces a few seconds of buffering in the opponent&rsquo;s system.
              Those few seconds change the game. When the system cannot respond
              <span style={{ color: "var(--green-bright)" }}> — it collapses.</span>&rdquo;
            </p>
            <p className="mono mt-5" style={{ fontSize: 12, color: "var(--ink-4)", letterSpacing: "0.08em" }}>
              — Variation theory · Jin
            </p>
          </blockquote>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {concepts.map((c, i) => (
            <Reveal key={c.title} delay={140 + i * 90}>
              <Link
                href="/approach"
                className="approach-card group relative block h-full rounded-2xl p-8 overflow-hidden"
                style={{
                  background: "var(--stage-3)",
                  border: "0.5px solid var(--edge)",
                  transformStyle: "preserve-3d",
                  transition: "transform .4s var(--ease-out), border-color .4s var(--ease-out), box-shadow .4s var(--ease-out)",
                }}
                onMouseMove={tilt}
                onMouseLeave={reset}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "var(--green-line)";
                  el.style.boxShadow = "var(--lift), var(--glow)";
                }}
                onBlur={() => {}}
              >
                {/* cursor-follow glow */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "radial-gradient(320px circle at var(--gx,50%) var(--gy,50%), rgba(125,255,106,0.1), transparent 60%)" }}
                />
                <div className="relative flex items-start justify-between mb-8">
                  <span className="display" style={{ fontSize: 34, color: "var(--edge-2)", lineHeight: 1 }}>{c.n}</span>
                  <span
                    className="mono px-3 py-1.5 rounded-full"
                    style={{ fontSize: 10, background: "var(--green-soft)", color: "var(--green-bright)", border: "0.5px solid var(--green-line)" }}
                  >
                    {c.metric}
                  </span>
                </div>
                <div className="relative flex flex-col gap-3">
                  <span className="mono" style={{ fontSize: 10, letterSpacing: "0.22em", color: "var(--ink-4)" }}>{c.tag}</span>
                  <h3 className="display t-card" style={{ color: "var(--ink)" }}>{c.title}</h3>
                  <p style={{ fontSize: 14.5, lineHeight: 1.72, color: "var(--ink-2)" }}>{c.desc}</p>
                </div>
                <span
                  className="relative mono mt-8 inline-flex items-center gap-1.5 transition-colors duration-300"
                  style={{ fontSize: 12, color: "var(--ink-3)" }}
                >
                  Full theory
                  <span className="transition-transform duration-300 group-hover:translate-x-1" style={{ color: "var(--green-mid)" }}>→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
