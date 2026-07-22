"use client";
import Link from "@/components/LocaleLink";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import TeamBadge from "@/components/match/TeamBadge";
import Reveal from "@/components/Reveal";

type Match = {
  slug: string;
  competition: string;
  date: string;
  home: string;
  away: string;
  tags: string[];
  metrics: string[];
  highlight?: boolean;
};

const matches: Match[] = [
  {
    slug: "psg-inter-ucl-2025",
    competition: "UEFA Champions League · Final",
    date: "2025.05.31",
    home: "PSG",
    away: "Inter Milan",
    tags: ["Mutation", "Pre-Half Space", "season-scale Lure & Shock"],
    metrics: ["xT", "field tilt", "pass network"],
    highlight: true,
  },
  {
    slug: "psg-bayern-ucl-2026",
    competition: "UEFA Champions League · Semi Final",
    date: "2026.04–05",
    home: "PSG",
    away: "Bayern Munich",
    tags: ["variation trigger", "hybrid formation", "PPDA"],
    metrics: ["PPDA", "VAEP", "defensive line"],
  },
  {
    slug: "korea-paraguay-2026",
    competition: "International Friendly",
    date: "2026.04.20",
    home: "Korea",
    away: "Paraguay",
    tags: ["overload to isolation", "Plan A−", "left flank"],
    metrics: ["xT", "field tilt", "progressive passes"],
  },
];

const N = matches.length;
const CARD_W = 340;
const CARD_H = 452;

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeReduce(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia(REDUCE_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getReduceSnapshot = () => typeof window !== "undefined" && window.matchMedia(REDUCE_QUERY).matches;
const getReduceServer = () => false;

/* shortest signed distance from card i to continuous position, wrapped on the ring */
function rel(i: number, pos: number) {
  let d = i - pos;
  d = ((d % N) + N) % N;
  if (d > N / 2) d -= N;
  return d;
}

function MatchCardInner({ m, focal }: { m: Match; focal: boolean }) {
  return (
    <>
      <div className="flex items-center justify-between gap-3 mb-7">
        <span className="mono" style={{ fontSize: 10, color: "var(--ink-4)", letterSpacing: "0.04em" }}>
          {m.competition}
        </span>
        {m.highlight && (
          <span
            className="mono px-2.5 py-1 rounded-full shrink-0"
            style={{ fontSize: 9, background: "var(--green-soft)", color: "var(--green-bright)", border: "0.5px solid var(--green-line)" }}
          >
            FEATURED
          </span>
        )}
      </div>

      <div className="flex items-center justify-between gap-2 mb-7">
        <div className="flex flex-col items-center gap-3 min-w-0" style={{ width: 120 }}>
          <TeamBadge name={m.home} size={62} />
          <span className="display text-center" style={{ fontSize: 15, color: "var(--ink)" }}>{m.home}</span>
        </div>
        <span className="mono shrink-0" style={{ fontSize: 11, color: "var(--ink-4)" }}>vs</span>
        <div className="flex flex-col items-center gap-3 min-w-0" style={{ width: 120 }}>
          <TeamBadge name={m.away} size={62} />
          <span className="display text-center" style={{ fontSize: 15, color: "var(--ink)" }}>{m.away}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-7">
        {m.tags.map((t) => (
          <span
            key={t}
            className="mono px-2.5 py-1 rounded-full"
            style={{ fontSize: 10, background: "var(--stage-2)", color: "var(--ink-2)", border: "0.5px solid var(--edge)" }}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between pt-5" style={{ borderTop: "0.5px solid var(--edge)" }}>
        <span className="mono" style={{ fontSize: 10, color: "var(--ink-4)" }}>{m.date}</span>
        <span
          className="mono inline-flex items-center gap-1.5 px-4 py-2 rounded-full transition-all duration-300"
          style={{
            fontSize: 11,
            color: focal ? "var(--ink)" : "var(--green-bright)",
            background: focal ? "var(--green-bright)" : "var(--green-soft)",
            border: "0.5px solid var(--green-line)",
          }}
        >
          View →
        </span>
      </div>
    </>
  );
}

export default function MatchSection() {
  const reduced = useSyncExternalStore(subscribeReduce, getReduceSnapshot, getReduceServer);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // motion state (kept in refs — the rAF loop mutates the DOM directly)
  const pos = useRef(0);
  const vel = useRef(0);
  const target = useRef<number | null>(null);
  const dragging = useRef(false);
  const moved = useRef(0);
  const lastX = useRef(0);
  const lastT = useRef(0);
  const idleT = useRef(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const radius = 300;

    const render = () => {
      const p = pos.current;
      for (let i = 0; i < N; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const r = rel(i, p);
        const ang = r * 34; // deg around the cylinder
        const rad = (ang * Math.PI) / 180;
        const x = Math.sin(rad) * radius;
        const z = (Math.cos(rad) - 1) * radius; // 0 at front, negative behind
        const a = Math.abs(r);
        const scale = Math.max(0.62, 1 - a * 0.14);
        const opacity = Math.max(0, 1 - a * 0.42);
        const blur = Math.min(6, a * 2.4);
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
          // snap toward target index
          const d = target.current - pos.current;
          pos.current += d * 0.12;
          if (Math.abs(d) < 0.001) { pos.current = target.current; target.current = null; }
        } else {
          // momentum
          pos.current += vel.current;
          vel.current *= 0.94;
          if (Math.abs(vel.current) < 0.0006) {
            vel.current = 0;
            idleT.current += 16;
            // idle auto-drift after ~2.4s of stillness
            if (idleT.current > 2400) { target.current = Math.round(pos.current) + 1; idleT.current = 0; }
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
  }, [reduced]);

  // ── pointer drag ──
  const onDown = (e: React.PointerEvent) => {
    if (reduced) return;
    dragging.current = true;
    target.current = null;
    vel.current = 0;
    moved.current = 0;
    lastX.current = e.clientX;
    lastT.current = performance.now();
    idleT.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastX.current;
    const now = performance.now();
    const dt = Math.max(1, now - lastT.current);
    const dpos = -dx / 320; // drag sensitivity
    pos.current += dpos;
    vel.current = dpos * (16 / dt); // normalise to per-frame
    moved.current += Math.abs(dx);
    lastX.current = e.clientX;
    lastT.current = now;
  };
  const onUp = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    dragging.current = false;
    idleT.current = 0;
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
    // if barely moved, let momentum settle; else keep flick momentum then snap
    if (Math.abs(vel.current) < 0.004) target.current = Math.round(pos.current);
  };

  const step = (dir: 1 | -1) => {
    target.current = Math.round(pos.current) + dir;
    vel.current = 0;
    idleT.current = 0;
  };

  const goTo = (i: number) => {
    // choose the copy of index i (i + k*N) closest to current position
    const base = Math.round((pos.current - i) / N) * N + i;
    target.current = base;
    vel.current = 0;
    idleT.current = 0;
  };

  const onWheel = (e: React.WheelEvent) => {
    if (reduced) return;
    // only react to horizontal intent (trackpad swipe) — never hijack vertical page scroll
    if (Math.abs(e.deltaX) < 6 || Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
    idleT.current = 0;
    target.current = null;
    vel.current += (e.deltaX > 0 ? 1 : -1) * 0.012;
  };

  const guardClick = (e: React.MouseEvent) => {
    if (moved.current > 6) { e.preventDefault(); }
  };

  const Header = (
    <Reveal>
      <div className="flex flex-wrap items-end justify-between gap-6 mb-4">
        <div className="max-w-2xl">
          <p className="mono t-eyebrow kicker mb-6">02 / Match Analysis</p>
          <h2 className="display t-section" style={{ color: "var(--ink)" }}>
            Theory applied to<br />
            <span style={{ color: "var(--green-bright)" }}>matches analysed.</span>
          </h2>
        </div>
        <Link
          href="/match-analysis"
          className="mono group inline-flex items-center gap-2 shrink-0 transition-colors duration-300"
          style={{ fontSize: 13, color: "var(--ink-3)" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--green-bright)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--ink-3)")}
        >
          All analyses
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </Reveal>
  );

  // ── reduced-motion fallback: plain horizontal scroll ──
  if (reduced) {
    return (
      <section className="relative px-6 md:px-10 py-28 md:py-36" style={{ background: "var(--stage-2)" }}>
        <div className="max-w-[1180px] mx-auto">
          {Header}
          <div className="flex gap-6 overflow-x-auto hide-scrollbar pb-2 mt-12" style={{ scrollSnapType: "x mandatory" }}>
            {matches.map((m) => (
              <Link
                key={m.slug}
                href={`/match-analysis/${m.slug}`}
                className="flex flex-col shrink-0 rounded-2xl p-7"
                style={{ width: CARD_W, scrollSnapAlign: "center", background: "var(--stage-3)", border: "0.5px solid var(--edge)", minHeight: CARD_H }}
              >
                <MatchCardInner m={m} focal={!!m.highlight} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative px-6 md:px-10 py-28 md:py-36 overflow-hidden" style={{ background: "var(--stage-2)" }}>
      {/* focal glow behind the ring */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{ top: "44%", left: "50%", width: 620, height: 620, transform: "translate(-50%,-50%)", background: "radial-gradient(circle, rgba(125,255,106,0.08) 0%, transparent 62%)" }}
      />
      <div className="relative max-w-[1180px] mx-auto">
        {Header}

        {/* 3D stage */}
        <div
          ref={stageRef}
          className="relative mt-10 select-none"
          style={{ height: CARD_H + 120, perspective: "1700px", touchAction: "pan-y", cursor: "grab" }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onWheel={onWheel}
        >
          <div className="absolute left-1/2 top-1/2" style={{ transformStyle: "preserve-3d" }}>
            {matches.map((m, i) => (
              <Link
                key={m.slug}
                ref={(el) => { cardRefs.current[i] = el; }}
                href={`/match-analysis/${m.slug}`}
                onClick={guardClick}
                data-card
                className="group absolute left-0 top-0 flex flex-col rounded-[22px] p-7 will-change-transform"
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  transform: "translate(-50%,-50%)",
                  transformStyle: "preserve-3d",
                  background: "linear-gradient(180deg, rgba(16,22,19,0.92) 0%, rgba(10,15,13,0.92) 100%)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: `0.5px solid ${active === i ? "var(--green-line)" : "var(--edge-2)"}`,
                  boxShadow: active === i ? "var(--lift), var(--glow)" : "0 20px 50px rgba(0,0,0,0.5)",
                  transition: "border-color .4s var(--ease-out), box-shadow .4s var(--ease-out)",
                }}
              >
                <MatchCardInner m={m} focal={active === i} />
              </Link>
            ))}
          </div>
        </div>

        {/* controls */}
        <div className="flex items-center justify-between mt-6">
          <span className="mono" style={{ fontSize: 11, color: "var(--ink-4)", letterSpacing: "0.08em" }}>
            Drag · swipe · to explore
          </span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {matches.map((_, i) => (
                <button
                  key={i}
                  aria-label={`match ${i + 1}`}
                  onClick={() => goTo(i)}
                  style={{
                    width: active === i ? 22 : 7, height: 7, borderRadius: 4,
                    background: active === i ? "var(--green-bright)" : "var(--edge-2)",
                    transition: "all .4s var(--ease-out)", cursor: "pointer", border: "none", padding: 0,
                  }}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                aria-label="previous"
                onClick={() => step(-1)}
                className="mono flex items-center justify-center rounded-full transition-all duration-200"
                style={{ width: 44, height: 44, background: "rgba(255,255,255,0.04)", border: "0.5px solid var(--edge-2)", color: "var(--ink-2)", fontSize: 16, cursor: "pointer" }}
              >‹</button>
              <button
                aria-label="next"
                onClick={() => step(1)}
                className="mono flex items-center justify-center rounded-full transition-all duration-200"
                style={{ width: 44, height: 44, background: "var(--green-bright)", border: "0.5px solid var(--green-bright)", color: "var(--ink)", fontSize: 16, cursor: "pointer" }}
              >›</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
