"use client";
import Link from "next/link";
import Reveal from "@/components/Reveal";

const doors = [
  {
    index: "01",
    href: "/approach",
    label: "Approach",
    title: "The football I want to build.",
    desc: "The complete Variation vocabulary — variable and mutation, Lure & Shock, hybrid shapes, and how it is measured.",
  },
  {
    index: "02",
    href: "/match-analysis",
    label: "Match Analysis",
    title: "That thinking, applied to real matches.",
    desc: "Interactive breakdowns where the framework is tested against the game — including the moments it strains or breaks.",
  },
];

export default function HomeDoors() {
  return (
    <section className="relative px-6 md:px-10 py-32 md:py-44" style={{ background: "var(--stage)" }}>
      <div className="max-w-[1180px] mx-auto">
        <Reveal>
          <p className="mono t-eyebrow kicker mb-16" style={{ color: "var(--ink-3)" }}>Two things · each proves the other</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {doors.map((d, i) => (
            <Reveal key={d.href} delay={i * 120}>
              <Link
                href={d.href}
                className="group relative flex flex-col justify-between rounded-[26px] p-10 md:p-12 overflow-hidden h-full"
                style={{
                  background: "var(--stage-3)",
                  border: "0.5px solid var(--edge)",
                  minHeight: 340,
                  transition: "transform .45s var(--ease-out), border-color .45s var(--ease-out), box-shadow .45s var(--ease-out)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-8px)";
                  el.style.borderColor = "var(--green-line)";
                  el.style.boxShadow = "var(--lift), var(--glow)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(0)";
                  el.style.borderColor = "var(--edge)";
                  el.style.boxShadow = "none";
                }}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "radial-gradient(500px circle at 80% 0%, rgba(125,255,106,0.08), transparent 60%)" }}
                />
                <div className="relative flex items-center justify-between">
                  <span className="display" style={{ fontSize: 15, color: "var(--green-bright)", letterSpacing: "0.05em" }}>{d.index}</span>
                  <span className="mono t-eyebrow" style={{ color: "var(--ink-4)" }}>{d.label}</span>
                </div>
                <div className="relative">
                  <h2 className="display mb-4" style={{ fontSize: "clamp(26px,3.2vw,38px)", lineHeight: 1.05, color: "var(--ink)", letterSpacing: "-0.025em" }}>
                    {d.title}
                  </h2>
                  <p className="mb-8" style={{ fontSize: 15, lineHeight: 1.62, color: "var(--ink-2)", maxWidth: 420 }}>{d.desc}</p>
                  <span className="mono inline-flex items-center gap-2" style={{ fontSize: 13, color: "var(--green-bright)" }}>
                    Enter
                    <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
