"use client";
import { useEffect, useState } from "react";

// Mobile companion for the inline charts in /kpi-lab/advanced.
// The SVG charts are drawn for a ~720px column; on a phone they shrink to about
// half size and the labels get too small to read. Tapping a chart (or its
// "view larger" chip) opens it full screen. In portrait the chart is turned 90°
// so it uses the long side of the screen — about twice the inline size — and the
// reader turns the phone to read it, as with a printed landscape figure.
// Reads the SVG from the DOM, so the chart markup is not shipped twice.
export default function ChartZoomHost({ openLabel, closeLabel, rotateHint }: { openLabel: string; closeLabel: string; rotateHint: string }) {
  const [html, setHtml] = useState<string | null>(null);
  const [cap, setCap] = useState<string>("");

  useEffect(() => {
    // Phones and tablets only: narrow screens, or any touch-first device
    // (media queries alone miss some in-app browsers, so also check touch points).
    const touchy = window.matchMedia("(max-width: 760px), (hover: none) and (pointer: coarse)").matches || navigator.maxTouchPoints > 0;
    if (!touchy) return;
    const figs = Array.from(document.querySelectorAll<HTMLElement>(".adv-fig"));
    const cleanups: (() => void)[] = [];
    figs.forEach((fig) => {
      const svgBox = fig.querySelector<HTMLElement>(".svg");
      if (!svgBox) return;
      fig.classList.add("zoomable");
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "adv-zoom-chip";
      chip.textContent = `⤢ ${openLabel}`;
      svgBox.after(chip);
      const open = () => {
        setHtml(svgBox.innerHTML);
        setCap(fig.querySelector("figcaption")?.textContent ?? "");
      };
      const onBoxClick = open;
      chip.addEventListener("click", open);
      svgBox.addEventListener("click", onBoxClick);
      cleanups.push(() => { chip.removeEventListener("click", open); svgBox.removeEventListener("click", onBoxClick); chip.remove(); fig.classList.remove("zoomable"); });
    });
    return () => cleanups.forEach((f) => f());
  }, [openLabel]);

  useEffect(() => {
    if (!html) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setHtml(null); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [html]);

  if (!html) return null;
  return (
    <div className="adv-zoom" role="dialog" aria-modal="true" onClick={() => setHtml(null)}>
      <button type="button" className="adv-zoom-x" onClick={() => setHtml(null)}>✕ {closeLabel}</button>
      <div className="adv-zoom-stage" onClick={(e) => e.stopPropagation()}>
        <div className="adv-zoom-svg" dangerouslySetInnerHTML={{ __html: html }} />
        {cap ? <p className="adv-zoom-cap">{cap}</p> : null}
      </div>
      <p className="adv-zoom-hint">{rotateHint}</p>
    </div>
  );
}
