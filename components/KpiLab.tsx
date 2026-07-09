"use client";
import Reveal from "@/components/Reveal";
import { STANDARD, LAB, type LabStatus } from "@/lib/kpiMetrics";

const STATUS: Record<LabStatus, { label: string; color: string; bg: string; border: string }> = {
  concept: { label: "Concept", color: "#c9a24a", bg: "rgba(201,162,74,0.12)", border: "rgba(201,162,74,0.3)" },
  draft:   { label: "Draft",   color: "#4aa64a", bg: "rgba(74,166,74,0.14)",  border: "rgba(74,166,74,0.34)" },
  live:    { label: "Live",    color: "#7dff6a", bg: "var(--green-soft)",     border: "var(--green-line)" },
};

function hover(on: boolean) {
  return (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.style.borderColor = on ? "var(--green-line)" : "var(--edge)";
    el.style.transform = on ? "translateY(-5px)" : "translateY(0)";
    el.style.boxShadow = on ? "var(--lift), var(--glow)" : "none";
  };
}

export default function KpiLab() {
  return (
    <section className="relative px-6 md:px-10 pt-36 pb-40" style={{ background: "var(--stage)" }}>
      <div className="max-w-[1180px] mx-auto">
        <Reveal>
          <p className="mono t-eyebrow kicker mb-7">03 / Data &amp; KPI Lab</p>
          <h1 className="display t-section mb-8" style={{ color: "var(--ink)", maxWidth: 900 }}>
            Measured — <span style={{ color: "var(--green-bright)" }}>not romanticised.</span>
          </h1>
          <p className="mb-6" style={{ color: "var(--ink-2)", fontSize: "clamp(16px,1.6vw,19px)", lineHeight: 1.6, maxWidth: 680 }}>
            The framework is only as good as its evidence. This is the toolbox I read matches with — and the original metrics I&rsquo;m building to measure Variation directly.
          </p>
        </Reveal>

        {/* ── Toolbox ── */}
        <Reveal>
          <h2 className="mono t-eyebrow mb-8 mt-20" style={{ color: "var(--ink-4)" }}>The toolbox · established metrics</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {STANDARD.map((m, i) => (
            <Reveal key={m.abbr} delay={(i % 3) * 70}>
              <article
                className="h-full rounded-2xl p-7 flex flex-col"
                style={{ background: "var(--stage-3)", border: "0.5px solid var(--edge)", transition: "transform .4s var(--ease-out), border-color .4s var(--ease-out), box-shadow .4s var(--ease-out)" }}
                onMouseEnter={hover(true)} onMouseLeave={hover(false)}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="mono" style={{ fontSize: 12, fontWeight: 500, color: "var(--green-bright)", padding: "3px 9px", borderRadius: 7, background: "var(--green-soft)", border: "0.5px solid var(--green-line)" }}>{m.abbr}</span>
                  <h3 className="display" style={{ fontSize: 16.5, color: "var(--ink)", lineHeight: 1.1 }}>{m.name}</h3>
                </div>
                <p className="mb-4" style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--ink-2)" }}>{m.measures}</p>
                <p className="mt-auto" style={{ fontSize: 12.5, lineHeight: 1.5, color: "var(--ink-3)", fontStyle: "italic" }}>{m.question}</p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* ── The Lab ── */}
        <Reveal>
          <h2 className="mono t-eyebrow mb-3 mt-24" style={{ color: "var(--ink-4)" }}>The lab · metrics I&rsquo;m designing</h2>
          <p className="mb-8" style={{ fontSize: 14, color: "var(--ink-3)", maxWidth: 620, lineHeight: 1.6 }}>
            Original KPIs built to measure what off-the-shelf metrics can&rsquo;t — the timing, sequencing and unpredictability that Variation lives on. Status is honest: most are still in development.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {LAB.map((k, i) => {
            const s = STATUS[k.status];
            return (
              <Reveal key={k.code} delay={(i % 3) * 70}>
                <article
                  className="h-full rounded-2xl p-7 flex flex-col"
                  style={{ background: "var(--stage-3)", border: "0.5px solid var(--edge)", transition: "transform .4s var(--ease-out), border-color .4s var(--ease-out), box-shadow .4s var(--ease-out)" }}
                  onMouseEnter={hover(true)} onMouseLeave={hover(false)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="mono" style={{ fontSize: 10.5, color: "var(--ink-4)", letterSpacing: "0.06em" }}>{k.code} · {k.type}</span>
                    <span className="mono" style={{ fontSize: 10, fontWeight: 500, color: s.color, padding: "3px 9px", borderRadius: 20, background: s.bg, border: `0.5px solid ${s.border}` }}>{s.label}</span>
                  </div>
                  <h3 className="display mb-3" style={{ fontSize: 17, color: "var(--ink)", lineHeight: 1.12, letterSpacing: "-0.01em" }}>{k.name}</h3>
                  <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--ink-2)" }}>{k.note}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
