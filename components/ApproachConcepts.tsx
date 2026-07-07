"use client";
import Reveal from "@/components/Reveal";
import { CONCEPTS, type Category } from "@/lib/philosophyConcepts";

const CAT_LABEL: Record<Category, string> = {
  CORE: "Core theory",
  ORIGINAL: "Original concept",
  STRUCTURE: "Structure",
  PLAYER: "Player condition",
  DEFENCE: "Defence",
  MEASURE: "Measurement",
};

function enter(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  el.style.borderColor = "var(--green-line)";
  el.style.transform = "translateY(-6px)";
  el.style.boxShadow = "var(--lift), var(--glow)";
}
function leave(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  el.style.borderColor = "var(--edge)";
  el.style.transform = "translateY(0)";
  el.style.boxShadow = "none";
}

export default function ApproachConcepts() {
  return (
    <section className="relative px-6 md:px-10 pt-36 pb-40" style={{ background: "var(--stage)" }}>
      <div className="max-w-[1180px] mx-auto">
        {/* page header */}
        <Reveal>
          <p className="mono t-eyebrow kicker mb-7">01 / Approach</p>
          <h1 className="display t-section mb-8" style={{ color: "var(--ink)", maxWidth: 900 }}>
            A football built to be<br />
            <span style={{ color: "var(--green-bright)" }}>unpredictable by design.</span>
          </h1>
          <p className="mb-24" style={{ color: "var(--ink-2)", fontSize: "clamp(16px,1.6vw,19px)", lineHeight: 1.6, maxWidth: 640 }}>
            The complete vocabulary of the Variation framework — every concept I&rsquo;ve built up, from the core idea to the way it&rsquo;s measured.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
          {CONCEPTS.map((c, i) => (
            <Reveal key={c.id} delay={(i % 3) * 90}>
              <article
                className="group relative h-full rounded-2xl p-8 flex flex-col"
                style={{
                  background: "var(--stage-3)",
                  border: "0.5px solid var(--edge)",
                  transition: "transform .4s var(--ease-out), border-color .4s var(--ease-out), box-shadow .4s var(--ease-out)",
                  minHeight: 300,
                }}
                onMouseEnter={enter}
                onMouseLeave={leave}
              >
                <div className="flex items-center justify-between mb-7">
                  <span className="mono" style={{ fontSize: 10, letterSpacing: "0.2em", color: "var(--ink-4)" }}>
                    {CAT_LABEL[c.category]}
                  </span>
                  <span className="mono" style={{ fontSize: 11, color: "var(--edge-2)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h2 className="display" style={{ fontSize: "clamp(22px,2.2vw,27px)", lineHeight: 1.08, color: "var(--ink)", letterSpacing: "-0.02em" }}>
                  {c.label}
                </h2>
                <p className="mono mt-2 mb-5" style={{ fontSize: 12, color: "var(--green-mid)", letterSpacing: "0.02em" }}>
                  {c.ko}
                </p>

                <p className="mb-5" style={{ fontSize: 15, lineHeight: 1.5, color: "var(--ink)", fontWeight: 500 }}>
                  {c.summary}
                </p>
                <p style={{ fontSize: 14, lineHeight: 1.72, color: "var(--ink-2)" }}>
                  {c.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
