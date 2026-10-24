import Link from "@/components/LocaleLink";
import type { ReactNode } from "react";
import ChartZoomHost from "@/components/kpi/ChartZoomHost";

// Detail page for one metric in /kpi-lab/advanced (2026-10-24 redesign).
// Server component: the inline SVG charts are rendered into the HTML and never
// shipped to the client bundle.
/** The chart title lives in the SVG aria-label; reuse it as the visible caption
    unless the chart already prints it as text. */
export const chartTitle = (svg: string) => {
  const raw = svg.match(/aria-label="([^"]*)"/)?.[1];
  if (!raw || svg.includes(`>${raw}</text>`)) return undefined;
  return raw.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'");
};

export type AdvFigure = { svg: string; caption?: string };
export const ZOOM_LABELS = {
  ko: { openLabel: "크게 보기", closeLabel: "닫기", rotateHint: "휴대폰을 가로로 돌리면 더 크게 보입니다 · 두 손가락으로 확대" },
  en: { openLabel: "View larger", closeLabel: "Close", rotateHint: "Turn your phone sideways for a larger view · pinch to zoom" },
} as const;

export type AdvBlock = { label: string; body: ReactNode; figures?: AdvFigure[]; isNew?: boolean };

export default function AdvancedDetail({
  backHref, backLabel, kicker, title, blocks, prev, next, guideHref, guideLabel, zoom,
}: {
  backHref: string; backLabel: string; kicker: string; title: string; blocks: AdvBlock[];
  prev?: { href: string; label: string }; next?: { href: string; label: string };
  guideHref: string; guideLabel: string;
  zoom: { openLabel: string; closeLabel: string; rotateHint: string };
}) {
  return (
    <section className="adv-wrap">
      <div className="adv-in adv-narrow">
        <Link href={backHref} className="adv-back">← {backLabel}</Link>
        <div className="adv-kicker">{kicker}</div>
        <h1 className="adv-h1 adv-h1-detail">{title}</h1>

        {blocks.map((b) => (
          <div key={b.label} className="adv-blk">
            <p className="adv-blk-label">{b.label}</p>
            <div className="adv-blk-body">{b.body}</div>
            {b.figures?.map((f, i) => (
              <figure key={i} className="adv-fig">
                <div className="svg" dangerouslySetInnerHTML={{ __html: f.svg }} />
                {f.caption ? <figcaption>{f.caption}</figcaption> : null}
              </figure>
            ))}
          </div>
        ))}

        <Link href={guideHref} className="adv-guide-link">{guideLabel} <i>→</i></Link>

        <nav className="adv-pn">
          {prev ? <Link href={prev.href}>← {prev.label}</Link> : <span />}
          {next ? <Link href={next.href} className="r">{next.label} →</Link> : <span />}
        </nav>
      </div>
      <ChartZoomHost {...zoom} />
    </section>
  );
}
