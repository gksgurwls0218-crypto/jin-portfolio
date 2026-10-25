import Link from "@/components/LocaleLink";
import type { ReactNode } from "react";
import { ESSAY_VISUALS } from "./EssayVisuals";
import ChartZoomHost from "./ChartZoomHost";
import { ZOOM_LABELS } from "./AdvancedDetail";

/* Detail layout for the essays (new concepts), the Lab KPIs and JWC.
   Since 2026-10-25 it uses the same design as /kpi-lab/advanced/[id]
   (.adv-* classes): mono kicker, hairline title rule, labelled blocks,
   light figure frames that open full screen on phones. */

export type Badge = { label: string; color: string; bg: string; border: string };
export type Block = {
  label: string;
  text: ReactNode;
  /** Optional embedded animation — path under /public, e.g. "/anim/pre-half-space.html" */
  visualSrc?: string;
  /** Optional key into the ESSAY_VISUALS registry — a redesigned, site-native sketch */
  visualComponent?: string;
  /** Optional inline SVG figure (e.g. a Lab concept diagram). */
  svg?: string;
  /** Small caption shown under the embed, e.g. source/credit note */
  visualCaption?: string;
  /** Embed height in px. Defaults to 420. Ignored by visualComponent. */
  visualHeight?: number;
};

function VisualEmbed({ src, caption, height = 420 }: { src: string; caption?: string; height?: number }) {
  return (
    <figure className="kd-embed">
      <div className="embed-frame overflow-hidden" style={{ background: "var(--stage)", ["--embed-h" as string]: `${height}px` }}>
        <iframe
          src={src}
          title={caption || "Variation Theory diagram"}
          className="embed-frame-iframe"
          style={{ width: "100%", border: "none", display: "block" }}
          loading="lazy"
        />
      </div>
      {caption ? <figcaption className="kd-cap">{caption}</figcaption> : null}
    </figure>
  );
}

export default function KpiDetail({
  backHref, backLabel, kicker, title, badge, status, blocks, prev, next, locale = "en",
}: {
  backHref: string; backLabel: string; kicker: string; title: string; badge?: Badge;
  /** draft / concept / live — badge style */
  status?: "draft" | "concept" | "live";
  blocks: Block[];
  prev?: { href: string; label: string }; next?: { href: string; label: string };
  locale?: "en" | "ko";
}) {
  return (
    <section className="adv-wrap">
      <div className="adv-in adv-narrow">
        <Link href={backHref} className="adv-back">← {backLabel}</Link>
        <div className="adv-kicker">{kicker}</div>
        <h1 className="adv-h1 adv-h1-detail">
          {title}
          {badge ? <span className="kd-meta"><span className={`ci-badge ${status ?? "plain"}`}>{badge.label}</span></span> : null}
        </h1>

        {blocks.map((b, i) => {
          const Sketch = b.visualComponent ? ESSAY_VISUALS[b.visualComponent] : undefined;
          return (
            <div key={`${b.label}-${i}`} className="adv-blk">
              <p className="adv-blk-label">{b.label}</p>
              <div className="adv-blk-body"><p>{b.text}</p></div>
              {b.svg ? (
                <figure className="adv-fig">
                  <div className="svg" dangerouslySetInnerHTML={{ __html: b.svg }} />
                  {b.visualCaption ? <figcaption>{b.visualCaption}</figcaption> : null}
                </figure>
              ) : null}
              {b.visualSrc ? <VisualEmbed src={b.visualSrc} caption={b.visualCaption} height={b.visualHeight} /> : null}
              {Sketch ? (
                <figure className="adv-fig kd-sketch">
                  <div className="svg"><Sketch /></div>
                  {b.visualCaption ? <figcaption>{b.visualCaption}</figcaption> : null}
                </figure>
              ) : null}
            </div>
          );
        })}

        {prev || next ? (
          <nav className="adv-pn">
            {prev ? <Link href={prev.href}>← {prev.label}</Link> : <span />}
            {next ? <Link href={next.href} className="r">{next.label} →</Link> : <span />}
          </nav>
        ) : null}
      </div>
      <ChartZoomHost {...ZOOM_LABELS[locale]} />
    </section>
  );
}
