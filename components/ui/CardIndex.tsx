"use client";
import { useEffect, useRef, type ReactNode } from "react";
import Link from "@/components/LocaleLink";

/* Site-wide index layout (2026-10-25), same design as /kpi-lab/advanced:
   mono kicker, large title, hairline card grid. Every card carries a preview
   box — a figure that explains the piece — hidden behind the card's code at
   rest and revealed on hover/focus. Touch screens have no hover, so there the
   card crossing the middle band of the screen while scrolling gets the same
   "in" state (one at a time, like a cursor moving down the list).
   Styles: .adv-* and .ci-* in app/globals.css. */

export type CardBadge = { label: string; tone?: "draft" | "concept" | "live" | "plain" };
export type CardItem = {
  href: string;
  /** Small mono label top-left: metric code, report type, episode no. */
  code: string;
  /** Right-aligned mono note on the top row (number, date…). */
  num?: string;
  badge?: CardBadge;
  /** Second mono line under the top row (competition, sample). */
  context?: string;
  title: ReactNode;
  short?: ReactNode;
  /** Up to two key figures, shown as a compact strip. */
  stats?: readonly (readonly [string, string])[];
  tags?: readonly string[];
  /** Footer note, right side (date added, language edition…). */
  meta?: string;
  /** Preview image path (SVG/WebP under /public). Ghost text only if missing. */
  thumb?: string;
  /** Big faint text in the preview box at rest. Defaults to code. */
  ghost?: string;
};

/** Ghost text is decorative; shrink long labels so they stay inside the box. */
function ghostSize(t: string) {
  let w = 0;
  for (const ch of t) w += /[\u1100-\uffff]/.test(ch) ? 1.9 : 1;
  return w <= 4 ? 64 : w <= 6 ? 52 : w <= 9 ? 40 : 30;
}

export type CardFeature = { href: string; label: string; title: string; desc: string; thumb?: string };

export default function CardIndex({
  back, eyebrow, title, accent, intro, feature, items, enterLabel, previewLabel, note, cols = 3, children,
}: {
  back?: { href: string; label: string };
  eyebrow: string; title: ReactNode; accent?: ReactNode; intro?: ReactNode;
  feature?: CardFeature;
  items: CardItem[];
  enterLabel: string; previewLabel: string;
  note?: ReactNode;
  cols?: 2 | 3;
  children?: ReactNode;
}) {
  const grid = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = grid.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const touch = window.matchMedia("(hover: none), (pointer: coarse), (max-width: 760px)");
    let io: IntersectionObserver | null = null;
    const setup = () => {
      io?.disconnect();
      el.querySelectorAll(".adv-card.in").forEach((c) => c.classList.remove("in"));
      if (!touch.matches && !(navigator.maxTouchPoints > 0)) return;
      io = new IntersectionObserver(
        (entries) => entries.forEach((e) => e.target.classList.toggle("in", e.isIntersecting)),
        { rootMargin: "-38% 0px -38% 0px" },
      );
      el.querySelectorAll(".adv-card").forEach((c) => io!.observe(c));
    };
    setup();
    touch.addEventListener("change", setup);
    return () => { io?.disconnect(); touch.removeEventListener("change", setup); };
  }, []);

  return (
    <section className="adv-wrap">
      <div className="adv-in">
        {back ? <Link href={back.href} className="adv-back">← {back.label}</Link> : null}
        <div className="adv-kicker">{eyebrow}</div>
        <h1 className="adv-h1">{title}{accent ? <> <span>{accent}</span></> : null}</h1>
        {intro ? <p className="adv-intro">{intro}</p> : null}

        {feature ? (
          <Link href={feature.href} className="adv-guide">
            <div className="txt">
              <div className="adv-label">{feature.label}</div>
              <h2>{feature.title}</h2>
              <p>{feature.desc}</p>
              <span className="adv-enter">{enterLabel} <i>→</i></span>
            </div>
            <div className="thumb">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {feature.thumb ? <img src={feature.thumb} alt="" loading="lazy" /> : null}
            </div>
          </Link>
        ) : <div className="ci-gap" />}

        {children}

        <div className={`adv-grid${cols === 2 ? " ci-2" : ""}`} ref={grid}>
          {items.map((it) => (
            <Link key={it.href} href={it.href} className="adv-card">
              <div className="top">
                <span className="abbr">{it.code}</span>
                {it.badge ? <span className={`ci-badge ${it.badge.tone ?? "plain"}`}>{it.badge.label}</span>
                  : it.num ? <span className="num">{it.num}</span> : null}
              </div>
              {it.context ? <div className="ci-ctx">{it.context}</div> : null}
              <h3>{it.title}</h3>
              {it.short ? <p>{it.short}</p> : null}
              {it.stats && it.stats.length ? (
                <dl className="ci-stats">
                  {it.stats.slice(0, 2).map(([big, label]) => (
                    <div key={label}><dt>{big}</dt><dd>{label}</dd></div>
                  ))}
                </dl>
              ) : null}
              {it.tags && it.tags.length ? (
                <div className="ci-tags">{it.tags.map((t) => <span key={t}>{t}</span>)}</div>
              ) : null}
              <div className="pv" aria-hidden="true">
                <span className="ghost" style={{ fontSize: ghostSize(it.ghost ?? it.code) }}>{it.ghost ?? it.code}</span>
                {it.thumb ? <span className="hint">{previewLabel}</span> : null}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {it.thumb ? <img src={it.thumb} alt="" loading="lazy" /> : null}
              </div>
              <div className="ci-foot">
                <span className="adv-enter">{enterLabel} <i>→</i></span>
                {it.meta ? <span className="ci-meta">{it.meta}</span> : null}
              </div>
            </Link>
          ))}
        </div>
        {note ? <p className="ci-note">{note}</p> : null}
      </div>
    </section>
  );
}
