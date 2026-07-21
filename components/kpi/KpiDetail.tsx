import Link from "next/link";
import type { ReactNode } from "react";
import { ESSAY_VISUALS } from "./EssayVisuals";

export type Badge = { label: string; color: string; bg: string; border: string };
export type Block = {
  label: string;
  text: string;
  /** Optional embedded animation — path under /public, e.g. "/anim/pre-half-space.html" */
  visualSrc?: string;
  /** Optional key into the ESSAY_VISUALS registry — a redesigned, site-native sketch */
  visualComponent?: string;
  /** Small caption shown under the embed, e.g. source/credit note */
  visualCaption?: string;
  /** Embed height in px. Defaults to 420. Ignored by visualComponent. */
  visualHeight?: number;
};

function SketchFrame({ caption, children }: { caption?: string; children: ReactNode }) {
  return (
    <div className="mt-5">
      <div
        className="rounded-2xl"
        style={{ border: "0.5px solid var(--edge)", background: "var(--ink)", padding: "20px 22px" }}
      >
        {children}
      </div>
      {caption ? (
        <p className="mono mt-2" style={{ fontSize: 11, color: "var(--ink-4)" }}>
          {caption}
        </p>
      ) : null}
    </div>
  );
}

function VisualEmbed({ src, caption, height = 420 }: { src: string; caption?: string; height?: number }) {
  return (
    <div className="mt-5">
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: "0.5px solid var(--edge)", background: "var(--ink)" }}
      >
        <iframe
          src={src}
          title={caption || "Variation Theory diagram"}
          style={{ width: "100%", height, border: "none", display: "block" }}
          loading="lazy"
        />
      </div>
      {caption ? (
        <p className="mono mt-2" style={{ fontSize: 11, color: "var(--ink-4)" }}>
          {caption}
        </p>
      ) : null}
    </div>
  );
}

export default function KpiDetail({
  backHref, backLabel, kicker, title, badge, blocks,
}: { backHref: string; backLabel: string; kicker: string; title: string; badge?: Badge; blocks: Block[] }) {
  return (
    <section className="relative px-6 md:px-10 pt-32 pb-40" style={{ background: "var(--stage)" }}>
      <div className="max-w-[760px] mx-auto">
        <Link
          href={backHref}
          className="mono inline-flex items-center gap-2 mb-14 transition-colors duration-300 hover:[color:var(--green-bright)]"
          style={{ fontSize: 12, color: "var(--ink-3)" }}
        >
          ← {backLabel}
        </Link>

        <div className="flex items-center gap-3 mb-5">
          <span className="mono" style={{ fontSize: 12, letterSpacing: "0.1em", color: "var(--green-mid)" }}>{kicker}</span>
          {badge && (
            <span className="mono" style={{ fontSize: 10, fontWeight: 500, color: badge.color, padding: "3px 9px", borderRadius: 20, background: badge.bg, border: `0.5px solid ${badge.border}` }}>{badge.label}</span>
          )}
        </div>

        <h1 className="display mb-14" style={{ fontSize: "clamp(32px,5vw,52px)", lineHeight: 1.04, letterSpacing: "-0.03em", color: "var(--ink)" }}>{title}</h1>

        <div className="flex flex-col gap-10">
          {blocks.map((b, i) => (
            <div key={b.label} style={{ paddingTop: i === 0 ? 0 : 28, borderTop: i === 0 ? "none" : "0.5px solid var(--edge)" }}>
              <p
                className="mono mb-5"
                style={{
                  fontSize: 14, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "var(--ink)", display: "inline-block", borderBottom: "2px solid var(--ink)", paddingBottom: 6,
                }}
              >
                {b.label}
              </p>
              <p style={{ fontSize: 17.5, lineHeight: 1.75, color: "var(--ink)" }}>{b.text}</p>
              {b.visualSrc ? <VisualEmbed src={b.visualSrc} caption={b.visualCaption} height={b.visualHeight} /> : null}
              {b.visualComponent && ESSAY_VISUALS[b.visualComponent]
                ? (() => {
                    const Sketch = ESSAY_VISUALS[b.visualComponent];
                    return (
                      <SketchFrame caption={b.visualCaption}>
                        <Sketch />
                      </SketchFrame>
                    );
                  })()
                : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
