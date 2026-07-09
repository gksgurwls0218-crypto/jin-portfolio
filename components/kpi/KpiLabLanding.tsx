"use client";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import EnterTag from "@/components/EnterTag";

const sections = [
  {
    href: "/kpi-lab/advanced",
    n: "01",
    label: "Advanced Data & KPIs for Variation Theory",
    title: "The evidence layer.",
    desc: "The advanced metrics I read matches with — expected threat, VAEP, field tilt and more — used to put Variation Theory under data.",
  },
  {
    href: "/kpi-lab/lab",
    n: "02",
    label: "Data & KPI Lab",
    title: "Stepping off the track.",
    desc: "Original metrics I'm developing to measure what off-the-shelf data can't: the timing, sequencing and unpredictability that variation lives on.",
  },
];

export default function KpiLabLanding() {
  return (
    <section className="relative px-6 md:px-10 pt-36 pb-40" style={{ background: "var(--stage)" }}>
      <div className="max-w-[1120px] mx-auto">
        <Reveal>
          <p className="mono t-eyebrow kicker mb-7">03 / Advanced Data & KPI Lab</p>
          <h1 className="display t-section mb-8" style={{ color: "var(--ink)", maxWidth: 900 }}>
            Could be reckless, <span style={{ color: "var(--green-bright)" }}>or innovative.</span>
          </h1>
          <p className="mb-20" style={{ color: "var(--ink-2)", fontSize: "clamp(16px,1.6vw,19px)", lineHeight: 1.6, maxWidth: 660 }}>
            A room for advanced data &amp; KPIs to prove Variation Theory — and a room to think of something new by stepping off the beaten track.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
          {sections.map((s, i) => (
            <Reveal key={s.href} delay={i * 110}>
              <Link
                href={s.href}
                className="group flex flex-col justify-between rounded-[24px] p-10 md:p-12 h-full"
                style={{
                  background: "var(--stage-3)",
                  border: "0.5px solid var(--edge)",
                  minHeight: 300,
                  transition: "transform .45s var(--ease-out), border-color .45s var(--ease-out), box-shadow .45s var(--ease-out)",
                }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-6px)"; el.style.borderColor = "var(--green-line)"; el.style.boxShadow = "var(--lift), var(--glow)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.borderColor = "var(--edge)"; el.style.boxShadow = "none"; }}
              >
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <span className="display" style={{ fontSize: 15, color: "var(--green-bright)" }}>{s.n}</span>
                    <span className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink-4)" }}>{s.label}</span>
                  </div>
                  <h2 className="display mb-4" style={{ fontSize: "clamp(24px,2.6vw,32px)", lineHeight: 1.08, color: "var(--ink)", letterSpacing: "-0.02em" }}>{s.title}</h2>
                  <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--ink-2)", maxWidth: 420 }}>{s.desc}</p>
                </div>
                <div className="mt-10 pt-6" style={{ borderTop: "0.5px solid var(--edge)" }}>
                  <EnterTag />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
