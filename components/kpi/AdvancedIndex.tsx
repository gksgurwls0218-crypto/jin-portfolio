"use client";
import { useEffect, useRef } from "react";
import Link from "@/components/LocaleLink";

// Index for /kpi-lab/advanced (2026-10-24 redesign). Same structure as before —
// one card per metric linking to its detail page — plus a guide card on top.
// Each card carries a thumbnail of the metric's first chart: hidden at rest on
// pointer devices and revealed on hover/focus. Phones have no hover, so there
// the same reveal is driven by scrolling: the card crossing the middle band of
// the screen gets the "in" state (one card at a time, like a cursor moving down).
export type AdvItem = { href: string; abbr: string; title: string; short: string; thumb: string };

export default function AdvancedIndex({
  eyebrow, title, accent, intro, backHref, backLabel, guide, items, enterLabel, previewLabel,
}: {
  eyebrow: string; title: string; accent: string; intro: string; backHref: string; backLabel: string;
  guide: { href: string; label: string; title: string; desc: string; thumb: string };
  items: AdvItem[]; enterLabel: string; previewLabel: string;
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
        <Link href={backHref} className="adv-back">← {backLabel}</Link>
        <div className="adv-kicker">{eyebrow}</div>
        <h1 className="adv-h1">{title} <span>{accent}</span></h1>
        <p className="adv-intro">{intro}</p>

        <Link href={guide.href} className="adv-guide">
          <div className="txt">
            <div className="adv-label">{guide.label}</div>
            <h2>{guide.title}</h2>
            <p>{guide.desc}</p>
            <span className="adv-enter">{enterLabel} <i>→</i></span>
          </div>
          <div className="thumb">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={guide.thumb} alt="" loading="lazy" />
          </div>
        </Link>

        <div className="adv-grid" ref={grid}>
          {items.map((it, i) => (
            <Link key={it.href} href={it.href} className="adv-card">
              <div className="top">
                <span className="abbr">{it.abbr}</span>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3>{it.title}</h3>
              <p>{it.short}</p>
              <div className="pv" aria-hidden="true">
                <span className="ghost">{it.abbr}</span>
                <span className="hint">{previewLabel}</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={it.thumb} alt="" loading="lazy" />
              </div>
              <span className="adv-enter">{enterLabel} <i>→</i></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
