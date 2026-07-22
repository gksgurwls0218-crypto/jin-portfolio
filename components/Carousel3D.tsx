"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

export type CarouselItem = { key: string; content: React.ReactNode };

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeReduce(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia(REDUCE_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getReduceSnapshot = () => typeof window !== "undefined" && window.matchMedia(REDUCE_QUERY).matches;
const getReduceServer = () => false;

// On phones the fixed-width 3-D carousel overflows the screen and its horizontal
// drag fights the page's vertical scroll. Below this width we fall back to a
// simple full-width vertical stack of the same cards instead.
const MOBILE_QUERY = "(max-width: 767px)";
function subscribeMobile(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia(MOBILE_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getMobileSnapshot = () => typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches;
const getMobileServer = () => false;

function rel(i: number, pos: number, n: number) {
  let d = i - pos;
  d = ((d % n) + n) % n;
  if (d > n / 2) d -= n;
  return d;
}

type Props = {
  items: CarouselItem[];
  cardWidth?: number;
  cardHeight?: number;
  angleStep?: number;
  radius?: number;
  dark?: boolean; // control button styling for dark vs light backgrounds
  autoDrift?: boolean; // slow idle auto-rotation
};

export default function Carousel3D({
  items,
  cardWidth = 460,
  cardHeight = 380,
  angleStep = 42,
  radius = 360,
  dark = false,
  autoDrift = true,
}: Props) {
  const N = items.length;
  const reduced = useSyncExternalStore(subscribeReduce, getReduceSnapshot, getReduceServer);
  const isMobile = useSyncExternalStore(subscribeMobile, getMobileSnapshot, getMobileServer);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pos = useRef(0);
  const vel = useRef(0);
  const target = useRef<number | null>(null);
  const dragging = useRef(false);
  const captured = useRef(false);
  const moved = useRef(0);
  const lastX = useRef(0);
  const idleT = useRef(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduced || isMobile) return;
    let raf = 0;

    const render = () => {
      const p = pos.current;
      for (let i = 0; i < N; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const r = rel(i, p, N);
        const ang = r * angleStep;
        const radn = (ang * Math.PI) / 180;
        const x = Math.sin(radn) * radius;
        const z = (Math.cos(radn) - 1) * radius;
        const a = Math.abs(r);
        const scale = Math.max(0.66, 1 - a * 0.13);
        const opacity = Math.max(0, 1 - a * 0.44);
        const blur = Math.min(5, a * 2.1);
        el.style.transform = `translate(-50%,-50%) translate3d(${x}px,0,${z}px) rotateY(${-ang}deg) scale(${scale})`;
        el.style.opacity = `${opacity}`;
        el.style.filter = `blur(${blur}px)`;
        el.style.zIndex = `${100 - Math.round(a * 10)}`;
        el.style.pointerEvents = a < 0.5 ? "auto" : "none";
      }
    };

    const loop = () => {
      if (!dragging.current) {
        if (target.current !== null) {
          const d = target.current - pos.current;
          pos.current += d * 0.12;
          if (Math.abs(d) < 0.001) { pos.current = target.current; target.current = null; }
        } else {
          pos.current += vel.current;
          vel.current *= 0.94;
          if (Math.abs(vel.current) < 0.0006) {
            vel.current = 0;
            idleT.current += 16;
            if (autoDrift && idleT.current > 3600) { target.current = Math.round(pos.current) + 1; idleT.current = 0; }
            else { target.current = Math.round(pos.current); }
          }
        }
      }
      const wrapped = ((Math.round(pos.current) % N) + N) % N;
      setActive((prev) => (prev === wrapped ? prev : wrapped));
      render();
      raf = requestAnimationFrame(loop);
    };
    render();
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced, isMobile, N, angleStep, radius, autoDrift]);

  const onDown = (e: React.PointerEvent) => {
    if (reduced) return;
    // NOTE: do NOT capture the pointer here — capturing on pointerdown makes a
    // plain tap's click fire on the stage instead of the card <Link>, so cards
    // never navigate. We only capture once an actual drag starts (in onMove).
    dragging.current = true; captured.current = false;
    target.current = null; vel.current = 0; moved.current = 0;
    lastX.current = e.clientX; idleT.current = 0;
  };
  const onMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastX.current;
    const dpos = -dx / 320;
    pos.current += dpos;
    vel.current = dpos;
    moved.current += Math.abs(dx);
    lastX.current = e.clientX;
    if (!captured.current && moved.current > 6) {
      try { (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); captured.current = true; } catch {}
    }
  };
  const onUp = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    dragging.current = false; idleT.current = 0;
    if (captured.current) { (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId); captured.current = false; }
    if (Math.abs(vel.current) < 0.004) target.current = Math.round(pos.current);
  };
  const step = (dir: 1 | -1) => { target.current = Math.round(pos.current) + dir; vel.current = 0; idleT.current = 0; };
  const goTo = (i: number) => { target.current = Math.round((pos.current - i) / N) * N + i; vel.current = 0; idleT.current = 0; };
  const onClickCapture = (e: React.MouseEvent) => { if (moved.current > 6) { e.preventDefault(); e.stopPropagation(); } };

  // "dark" here means the carousel sits on the solid accent ("signal") band,
  // so controls use the inverted paper-on-accent tokens instead of ink.
  const btn = dark
    ? { bg: "rgba(255,255,255,0.12)", border: "var(--signal-edge)", color: "var(--signal-ink)", activeBg: "var(--signal-ink)", activeColor: "var(--green)" }
    : { bg: "rgba(18,24,20,0.04)", border: "var(--edge-dark)", color: "var(--ink-dark-2)", activeBg: "var(--accent-green)", activeColor: "#ffffff" };
  const dotColor = dark ? "var(--signal-edge)" : "var(--edge-dark)";
  const dotActive = dark ? "var(--signal-ink)" : "var(--accent-green)";

  // ── fallback: simple stacked cards (mobile, or reduced-motion) ──
  // Mobile → full-width vertical stack. Desktop reduced-motion → centred row.
  if (reduced || isMobile) {
    return (
      <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch w-full">
        {items.map((it) => (
          <div key={it.key} className="mx-auto md:mx-0 w-full" style={{ maxWidth: cardWidth }}>{it.content}</div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div
        className="relative select-none mx-auto"
        style={{ height: cardHeight + 80, perspective: "1800px", touchAction: "pan-y", cursor: "grab", maxWidth: "100%" }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onClickCapture={onClickCapture}
      >
        <div className="absolute left-1/2 top-1/2" style={{ transformStyle: "preserve-3d" }}>
          {items.map((it, i) => (
            <div
              key={it.key}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="absolute left-0 top-0 will-change-transform"
              style={{ width: cardWidth, height: cardHeight, transform: "translate(-50%,-50%)" }}
            >
              {it.content}
            </div>
          ))}
        </div>
      </div>

      {/* controls */}
      <div className="flex items-center justify-center gap-7 mt-9">
        <button
          aria-label="previous" onClick={() => step(-1)}
          className="mono flex items-center justify-center rounded-full transition-all duration-200"
          style={{ width: 64, height: 64, background: btn.bg, border: `0.5px solid ${btn.border}`, color: btn.color, fontSize: 26, cursor: "pointer" }}
        >‹</button>
        <div className="flex items-center gap-2">
          {items.map((_, i) => (
            <button key={i} aria-label={`slide ${i + 1}`} onClick={() => goTo(i)}
              style={{ width: active === i ? 24 : 8, height: 8, borderRadius: 4, background: active === i ? dotActive : dotColor, transition: "all .4s var(--ease-out)", cursor: "pointer", border: "none", padding: 0 }}
            />
          ))}
        </div>
        <button
          aria-label="next" onClick={() => step(1)}
          className="mono flex items-center justify-center rounded-full transition-all duration-200"
          style={{ width: 64, height: 64, background: btn.activeBg, border: `0.5px solid ${btn.activeBg}`, color: btn.activeColor, fontSize: 26, cursor: "pointer" }}
        >›</button>
      </div>
    </div>
  );
}
