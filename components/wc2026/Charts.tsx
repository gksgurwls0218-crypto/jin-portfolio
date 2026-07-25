"use client";

/* SVG chart primitives for the 2026 World Cup tournament report.
   No charting dependency — the site ships none, and these stay on the
   site's monochrome palette (var(--ink*) on var(--stage*)). Every chart
   is driven from lib/wc2026.ts, which is parsed straight out of the
   104 official FIFA post-match reports. */

import { useState } from "react";
import type { Scatter, ScatterPoint, TrajectoryTeam } from "@/lib/wc2026";

const INK = "var(--ink)";
const INK3 = "var(--ink-3)";
const EDGE = "var(--edge-2)";

/* ── four-box axis / reading-key explainer, reused above scatter + dumbbell charts ── */

export function AxisExplain({ items }: { items: { label: string; body: string }[] }) {
  return (
    <div className="grid gap-2.5 mb-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
      {items.map((it) => (
        <div key={it.label} className="rounded-lg p-3" style={{ background: "var(--stage-3)", border: `0.5px solid ${EDGE}` }}>
          <span className="mono block mb-1" style={{ fontSize: 10, letterSpacing: ".1em", color: "var(--green-bright)" }}>
            {it.label}
          </span>
          <span style={{ fontSize: 12, lineHeight: 1.55, color: INK3 }}>{it.body}</span>
        </div>
      ))}
    </div>
  );
}

export function Figure({
  n,
  title,
  note,
  children,
}: {
  n: string;
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="my-9 rounded-2xl p-5 md:p-7" style={{ background: "var(--stage-2)", border: `0.5px solid ${EDGE}` }}>
      <figcaption className="mb-5">
        <span className="mono block mb-1.5" style={{ fontSize: 10.5, letterSpacing: ".16em", color: "var(--green-bright)" }}>
          {n}
        </span>
        <span className="display block" style={{ fontSize: "clamp(16px,2vw,19px)", lineHeight: 1.25, color: INK }}>
          {title}
        </span>
      </figcaption>
      {children}
      {note && (
        <p className="mt-4" style={{ fontSize: 12.5, lineHeight: 1.6, color: INK3 }}>
          {note}
        </p>
      )}
    </figure>
  );
}

/* ── horizontal bars: predictor accuracy ───────────────────────────── */

export function BarList({
  rows,
  suffix = "%",
  highlight = [],
  max,
}: {
  rows: [string, number, ...(number | string)[]][];
  suffix?: string;
  highlight?: string[];
  max?: number;
}) {
  const top = max ?? Math.max(...rows.map((r) => r[1])) * 1.05;
  return (
    <div className="flex flex-col gap-2.5">
      {rows.map(([label, v, hit, n]) => {
        const on = highlight.includes(label);
        return (
          <div key={label} className="flex items-center gap-3">
            <span className="shrink-0 text-right" style={{ width: 168, fontSize: 12.5, color: on ? INK : INK3, fontWeight: on ? 600 : 400 }}>
              {label}
            </span>
            <div className="flex-1 relative" style={{ height: 22 }}>
              <div
                style={{
                  width: `${(v / top) * 100}%`,
                  height: "100%",
                  borderRadius: 4,
                  background: on ? "var(--green)" : "rgba(20,24,26,0.16)",
                  transition: "width .8s var(--ease-out)",
                }}
              />
            </div>
            <span className="mono shrink-0" style={{ width: 96, fontSize: 12, color: on ? INK : INK3 }}>
              {v}
              {suffix}
              {typeof hit === "number" && typeof n === "number" && (
                <span style={{ color: "var(--ink-4)" }}>
                  {" "}
                  {hit}/{n}
                </span>
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ── possession × xG scatter ───────────────────────────────────────── */

export function PossXgScatter({ data, labels }: { data: Scatter[]; labels: { x: string; y: string; won: string; drew: string; lost: string; hint: string } }) {
  const [hover, setHover] = useState<Scatter | null>(null);
  const W = 720, H = 430, P = { l: 46, r: 16, t: 14, b: 40 };
  const xmin = 20, xmax = 75, ymax = 4.4;
  const px = (p: number) => P.l + ((p - xmin) / (xmax - xmin)) * (W - P.l - P.r);
  const py = (v: number) => H - P.b - (v / ymax) * (H - P.t - P.b);
  const fill = (r: string) => (r === "W" ? "var(--green)" : r === "D" ? "rgba(20,24,26,0.30)" : "rgba(20,24,26,0.13)");

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }} role="img">
        {[0, 1, 2, 3, 4].map((v) => (
          <g key={v}>
            <line x1={P.l} x2={W - P.r} y1={py(v)} y2={py(v)} stroke={EDGE} strokeWidth={0.5} />
            <text x={P.l - 8} y={py(v) + 4} textAnchor="end" fontSize={10} fill="var(--ink-4)" className="mono">
              {v.toFixed(1)}
            </text>
          </g>
        ))}
        {[30, 40, 50, 60, 70].map((p) => (
          <text key={p} x={px(p)} y={H - P.b + 16} textAnchor="middle" fontSize={10} fill="var(--ink-4)" className="mono">
            {p}%
          </text>
        ))}
        {/* the 1.0 xG line — the real dividing line */}
        <line x1={P.l} x2={W - P.r} y1={py(1)} y2={py(1)} stroke={INK} strokeWidth={1} strokeDasharray="5 4" opacity={0.5} />
        <text x={W - P.r - 4} y={py(1) - 6} textAnchor="end" fontSize={10} fill={INK3} className="mono">
          1.0 xG
        </text>
        {/* 50% possession line */}
        <line x1={px(50)} x2={px(50)} y1={P.t} y2={H - P.b} stroke={EDGE} strokeWidth={1} strokeDasharray="3 4" />

        {data.map((d, i) => (
          <circle
            key={i}
            cx={px(d[2])}
            cy={py(Math.min(d[3], ymax))}
            r={hover === d ? 7 : 4.6}
            fill={fill(d[4])}
            stroke={hover === d ? INK : "rgba(255,255,255,0.7)"}
            strokeWidth={hover === d ? 1.4 : 0.6}
            onMouseEnter={() => setHover(d)}
            onMouseLeave={() => setHover(null)}
            style={{ cursor: "pointer", transition: "r .2s" }}
          />
        ))}
        <text x={W / 2} y={H - 4} textAnchor="middle" fontSize={11} fill={INK3}>
          {labels.x}
        </text>
        <text x={14} y={H / 2} textAnchor="middle" fontSize={11} fill={INK3} transform={`rotate(-90 14 ${H / 2})`}>
          {labels.y}
        </text>
      </svg>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-2">
        {[
          [labels.won, "var(--green)"],
          [labels.drew, "rgba(20,24,26,0.30)"],
          [labels.lost, "rgba(20,24,26,0.13)"],
        ].map(([t, c]) => (
          <span key={t} className="flex items-center gap-1.5" style={{ fontSize: 11.5, color: INK3 }}>
            <span style={{ width: 9, height: 9, borderRadius: 9, background: c, display: "inline-block", border: "0.5px solid rgba(20,24,26,.2)" }} />
            {t}
          </span>
        ))}
        <span className="mono ml-auto" style={{ fontSize: 11, color: hover ? INK : "var(--ink-4)" }}>
          {hover ? `${hover[0]} v ${hover[8]} · ${hover[1]} · ${hover[2]}% · ${hover[3]} xG · ${hover[6]}-${hover[7]}` : labels.hint}
        </span>
      </div>
    </div>
  );
}

/* ── possession × xG scatter, with a full hover card following the cursor ── */

export function PossXgScatterFull({
  data,
  labels,
}: {
  data: ScatterPoint[];
  labels: { x: string; y: string; won: string; drew: string; lost: string; hint: string; poss: string; xg: string; block: string };
}) {
  const [hover, setHover] = useState<{ d: ScatterPoint; x: number; y: number } | null>(null);
  const W = 720, H = 430, P = { l: 46, r: 16, t: 14, b: 40 };
  const xmin = 20, xmax = 75, ymax = 4.4;
  const px = (p: number) => P.l + ((p - xmin) / (xmax - xmin)) * (W - P.l - P.r);
  const py = (v: number) => H - P.b - (v / ymax) * (H - P.t - P.b);
  const fill = (r: string) => (r === "W" ? "var(--green)" : r === "D" ? "rgba(20,24,26,0.30)" : "rgba(20,24,26,0.13)");

  return (
    <div style={{ position: "relative" }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: "100%", height: "auto", display: "block" }}
        role="img"
        onMouseLeave={() => setHover(null)}
      >
        {[0, 1, 2, 3, 4].map((v) => (
          <g key={v}>
            <line x1={P.l} x2={W - P.r} y1={py(v)} y2={py(v)} stroke={EDGE} strokeWidth={0.5} />
            <text x={P.l - 8} y={py(v) + 4} textAnchor="end" fontSize={10} fill="var(--ink-4)" className="mono">
              {v.toFixed(1)}
            </text>
          </g>
        ))}
        {[30, 40, 50, 60, 70].map((p) => (
          <text key={p} x={px(p)} y={H - P.b + 16} textAnchor="middle" fontSize={10} fill="var(--ink-4)" className="mono">
            {p}%
          </text>
        ))}
        <line x1={P.l} x2={W - P.r} y1={py(1)} y2={py(1)} stroke={INK} strokeWidth={1} strokeDasharray="5 4" opacity={0.5} />
        <text x={W - P.r - 4} y={py(1) - 6} textAnchor="end" fontSize={10} fill={INK3} className="mono">
          1.0 xG
        </text>
        <line x1={px(50)} x2={px(50)} y1={P.t} y2={H - P.b} stroke={EDGE} strokeWidth={1} strokeDasharray="3 4" />

        {data.map((d, i) => {
          const isHover = hover?.d === d;
          return (
            <circle
              key={i}
              cx={px(d[5])}
              cy={py(Math.min(d[6], ymax))}
              r={isHover ? 7.5 : 4.6}
              fill={fill(d[7])}
              stroke={isHover ? INK : "rgba(255,255,255,0.7)"}
              strokeWidth={isHover ? 1.6 : 0.6}
              onMouseEnter={(e) => {
                const rect = (e.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect();
                const scale = rect.width / W;
                setHover({ d, x: px(d[5]) * scale, y: py(Math.min(d[6], ymax)) * scale });
              }}
              style={{ cursor: "pointer", transition: "r .15s" }}
            />
          );
        })}
        <text x={W / 2} y={H - 4} textAnchor="middle" fontSize={11} fill={INK3}>
          {labels.x}
        </text>
        <text x={14} y={H / 2} textAnchor="middle" fontSize={11} fill={INK3} transform={`rotate(-90 14 ${H / 2})`}>
          {labels.y}
        </text>
      </svg>

      {hover && (
        <div
          className="rounded-xl px-3.5 py-3"
          style={{
            position: "absolute",
            left: Math.min(Math.max(hover.x, 90), W - 90),
            top: Math.max(hover.y - 14, 0),
            transform: "translate(-50%, -100%)",
            background: "var(--green)",
            color: "var(--signal-ink)",
            minWidth: 168,
            boxShadow: "0 8px 24px rgba(0,0,0,.25)",
            pointerEvents: "none",
            zIndex: 5,
          }}
        >
          <div className="flex items-center justify-between gap-3 mb-1.5">
            <span className="display" style={{ fontSize: 13.5 }}>{hover.d[0]} {hover.d[1]}</span>
            <span className="mono" style={{ fontSize: 10, color: "var(--signal-ink-3)" }}>{hover.d[4]}</span>
          </div>
          <div className="mono" style={{ fontSize: 11, color: "var(--signal-ink-2)", marginBottom: 6 }}>
            v {hover.d[2]} {hover.d[3]} · {hover.d[8]}–{hover.d[9]}
          </div>
          <div className="grid grid-cols-3 gap-2 mono" style={{ fontSize: 10.5 }}>
            <div><div style={{ color: "var(--signal-ink-3)", fontSize: 9 }}>{labels.poss}</div>{hover.d[5]}%</div>
            <div><div style={{ color: "var(--signal-ink-3)", fontSize: 9 }}>{labels.xg}</div>{hover.d[6]}</div>
            <div><div style={{ color: "var(--signal-ink-3)", fontSize: 9 }}>{labels.block}</div>{hover.d[10]}%</div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-2">
        {[
          [labels.won, "var(--green)"],
          [labels.drew, "rgba(20,24,26,0.30)"],
          [labels.lost, "rgba(20,24,26,0.13)"],
        ].map(([t, c]) => (
          <span key={t} className="flex items-center gap-1.5" style={{ fontSize: 11.5, color: INK3 }}>
            <span style={{ width: 9, height: 9, borderRadius: 9, background: c, display: "inline-block", border: "0.5px solid rgba(20,24,26,.2)" }} />
            {t}
          </span>
        ))}
        <span className="mono ml-auto" style={{ fontSize: 11, color: "var(--ink-4)" }}>{labels.hint}</span>
      </div>
    </div>
  );
}

/* ── quartile staircase ────────────────────────────────────────────── */

export function Staircase({
  rows,
  quartileLabels,
  valueLabel,
  winLabel,
  xgLabel,
  unit = "",
}: {
  rows: [string, number, number, number, number, number][];
  quartileLabels: string[];
  valueLabel: string;
  winLabel: string;
  xgLabel: string;
  unit?: string;
}) {
  const maxWin = Math.max(...rows.map((r) => r[3]));
  return (
    <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${rows.length}, minmax(0,1fr))` }}>
      {rows.map((r, i) => (
        <div key={r[0]} className="rounded-xl p-3.5 flex flex-col" style={{ background: "var(--stage-3)", border: `0.5px solid ${EDGE}` }}>
          <span className="mono" style={{ fontSize: 10, letterSpacing: ".1em", color: "var(--ink-4)" }}>
            {quartileLabels[i]}
          </span>
          <span className="display mt-1" style={{ fontSize: 13, color: INK3 }}>
            {valueLabel} {r[2]}
            {unit}
          </span>
          <div className="mt-3" style={{ height: 86, display: "flex", alignItems: "flex-end" }}>
            <div
              style={{
                width: "100%",
                height: `${(r[3] / maxWin) * 100}%`,
                background: i === 0 ? "var(--green)" : `rgba(20,24,26,${0.34 - i * 0.07})`,
                borderRadius: 4,
                transition: "height .8s var(--ease-out)",
              }}
            />
          </div>
          <span className="display mt-2.5" style={{ fontSize: 24, color: INK, letterSpacing: "-0.02em" }}>
            {r[3]}%
          </span>
          <span className="mono" style={{ fontSize: 10.5, color: "var(--ink-4)" }}>
            {winLabel} · n={r[1]}
          </span>
          <span className="mono mt-1" style={{ fontSize: 10.5, color: INK3 }}>
            {xgLabel} {r[4]}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── game-model record bars ────────────────────────────────────────── */

export function ModelBars({ rows, labels }: { rows: [string, number, number, number, number, number, number, number, number][]; labels: { w: string; d: string; l: string; xg: string; xga: string; poss: string } }) {
  return (
    <div className="flex flex-col gap-4">
      {rows.map((r) => {
        const [name, n, w, d, l, pct, xg, xga, poss] = r;
        return (
          <div key={name} className="rounded-xl p-4" style={{ background: "var(--stage-3)", border: `0.5px solid ${EDGE}` }}>
            <div className="flex items-baseline justify-between mb-2.5">
              <span className="display" style={{ fontSize: 16, color: INK }}>
                {name}
                <span className="mono ml-2" style={{ fontSize: 11, color: "var(--ink-4)" }}>n={n}</span>
              </span>
              <span className="display" style={{ fontSize: 22, color: INK, letterSpacing: "-0.02em" }}>{pct}%</span>
            </div>
            <div className="flex" style={{ height: 12, borderRadius: 6, overflow: "hidden", border: `0.5px solid ${EDGE}` }}>
              <div style={{ width: `${(w / n) * 100}%`, background: "var(--green)" }} />
              <div style={{ width: `${(d / n) * 100}%`, background: "rgba(20,24,26,0.28)" }} />
              <div style={{ width: `${(l / n) * 100}%`, background: "rgba(20,24,26,0.10)" }} />
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 mono" style={{ fontSize: 11, color: INK3 }}>
              <span>{labels.w} {w}</span>
              <span>{labels.d} {d}</span>
              <span>{labels.l} {l}</span>
              <span>{labels.xg} {xg}</span>
              <span>{labels.xga} {xga}</span>
              <span>{labels.poss} {poss}%</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── formation timeline ────────────────────────────────────────────── */

export function FormationRuns({
  runs,
  stageLabels,
  caption,
}: {
  runs: [string, string[], number, number, number][];
  stageLabels: string[];
  caption: string;
}) {
  return (
    <div>
      <div className="flex gap-1.5 mb-2 pl-[128px]">
        {stageLabels.map((s) => (
          <span key={s} className="mono text-center" style={{ flex: 1, fontSize: 9.5, color: "var(--ink-4)", letterSpacing: ".08em" }}>
            {s}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-1.5">
        {runs.map(([team, forms, w, d, l]) => {
          const uniq = new Set(forms).size;
          return (
            <div key={team} className="flex items-center gap-2">
              <span className="shrink-0 text-right" style={{ width: 120, fontSize: 12.5, color: INK }}>
                {team}
                <span className="mono ml-1.5" style={{ fontSize: 10, color: "var(--ink-4)" }}>
                  {w}-{d}-{l}
                </span>
              </span>
              {/* always render one slot per stage so every row lines up with the header,
                  leaving trailing blanks for sides that went out early */}
              <div className="flex gap-1.5 flex-1">
                {stageLabels.map((_, i) => {
                  const f = forms[i];
                  if (!f) return <span key={i} style={{ flex: 1 }} />;
                  const changed = i > 0 && forms[i - 1] !== f;
                  return (
                    <span
                      key={i}
                      className="mono text-center py-1.5 rounded"
                      style={{
                        flex: 1,
                        fontSize: 10.5,
                        color: changed ? "var(--signal-ink)" : INK3,
                        background: changed ? "var(--green)" : "var(--stage-3)",
                        border: `0.5px solid ${changed ? "transparent" : EDGE}`,
                      }}
                    >
                      {f}
                    </span>
                  );
                })}
              </div>
              <span className="mono shrink-0 text-right" style={{ width: 30, fontSize: 11, color: uniq >= 3 ? INK : "var(--ink-4)" }}>
                {uniq}
              </span>
            </div>
          );
        })}
      </div>
      <p className="mt-3" style={{ fontSize: 12, color: INK3 }}>{caption}</p>
    </div>
  );
}

/* ── block geometry ────────────────────────────────────────────────── */

export function BlockShapes({ rows, labels }: { rows: [string, number, number, number][]; labels: { height: string; length: string; width: string } }) {
  const PITCH_L = 105, PITCH_W = 68, S = 2.05;
  return (
    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${rows.length}, minmax(0,1fr))` }}>
      {rows.map(([name, height, length, width]) => {
        const h = PITCH_L * S, w = PITCH_W * S;
        const boxH = length * S, boxW = width * S;
        // line height = distance of the deepest defensive line from own goal-line (pitch drawn goal at bottom)
        const boxBottom = h - height * S;
        return (
          <div key={name} className="rounded-xl p-3" style={{ background: "var(--stage-3)", border: `0.5px solid ${EDGE}` }}>
            <span className="display block mb-2 text-center" style={{ fontSize: 12.5, color: INK }}>{name}</span>
            <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: "auto" }}>
              <rect x={0} y={0} width={w} height={h} fill="var(--stage-2)" stroke={EDGE} strokeWidth={0.8} />
              <line x1={0} x2={w} y1={h / 2} y2={h / 2} stroke={EDGE} strokeWidth={0.8} />
              <circle cx={w / 2} cy={h / 2} r={9.15 * S} fill="none" stroke={EDGE} strokeWidth={0.8} />
              <rect x={(w - 40.3 * S) / 2} y={h - 16.5 * S} width={40.3 * S} height={16.5 * S} fill="none" stroke={EDGE} strokeWidth={0.8} />
              <rect x={(w - 40.3 * S) / 2} y={0} width={40.3 * S} height={16.5 * S} fill="none" stroke={EDGE} strokeWidth={0.8} />
              <rect
                x={(w - boxW) / 2}
                y={boxBottom - boxH}
                width={boxW}
                height={boxH}
                fill="rgba(20,24,26,0.13)"
                stroke="var(--green)"
                strokeWidth={1}
              />
            </svg>
            <div className="mono mt-2 flex flex-col gap-0.5" style={{ fontSize: 10.5, color: INK3 }}>
              <span>{labels.height} {height} m</span>
              <span>{labels.length} {length} m</span>
              <span>{labels.width} {width} m</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── generic compact table ─────────────────────────────────────────── */

export function MiniTable({ head, rows, highlightCol }: { head: string[]; rows: (string | number)[][]; highlightCol?: number }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
        <thead>
          <tr>
            {head.map((h, i) => (
              <th
                key={h}
                className="mono"
                style={{
                  textAlign: i === 0 ? "left" : "right",
                  padding: "7px 9px",
                  fontSize: 10,
                  letterSpacing: ".1em",
                  color: "var(--ink-4)",
                  borderBottom: `0.5px solid ${EDGE}`,
                  whiteSpace: "nowrap",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <tr key={ri}>
              {r.map((c, ci) => (
                <td
                  key={ci}
                  className={ci === 0 ? "" : "mono"}
                  style={{
                    textAlign: ci === 0 ? "left" : "right",
                    padding: "7px 9px",
                    color: ci === highlightCol ? INK : INK3,
                    fontWeight: ci === highlightCol ? 600 : 400,
                    borderBottom: `0.5px solid var(--edge)`,
                    whiteSpace: "nowrap",
                  }}
                >
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── the two traps: 2×2 quadrant ───────────────────────────────────── */

export function TrapMatrix({
  cells,
  axes,
}: {
  cells: { key: string; label: string; n: number; w: number; d: number; l: number; win: number; xg: number; xga: number; trap: boolean }[];
  axes: { x: string; y: string; xLow: string; xHigh: string; yLow: string; yHigh: string };
}) {
  const order = ["barren-possession", "productive-possession", "barren-reactive", "productive-reactive"];
  const grid = order.map((k) => cells.find((c) => c.key === k)).filter(Boolean) as typeof cells;
  return (
    <div>
      <div className="flex gap-3">
        <div className="flex items-center shrink-0" style={{ width: 22 }}>
          <span className="mono" style={{ fontSize: 10, letterSpacing: ".12em", color: "var(--ink-4)", transform: "rotate(-90deg)", whiteSpace: "nowrap" }}>
            {axes.y}
          </span>
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-2 gap-3">
            {grid.map((c) => (
              <div
                key={c.key}
                className="rounded-xl p-4"
                style={{
                  background: c.trap ? "var(--green)" : "var(--stage-3)",
                  color: c.trap ? "var(--signal-ink)" : "var(--ink)",
                  border: `0.5px solid ${c.trap ? "transparent" : EDGE}`,
                }}
              >
                <span className="display block mb-1" style={{ fontSize: 14.5 }}>{c.label}</span>
                <span className="mono block mb-3" style={{ fontSize: 10, letterSpacing: ".1em", color: c.trap ? "var(--signal-ink-3)" : "var(--ink-4)" }}>
                  n = {c.n}
                </span>
                <span className="display block" style={{ fontSize: 34, letterSpacing: "-0.03em", lineHeight: 1 }}>{c.win}%</span>
                <div className="flex mt-3" style={{ height: 8, borderRadius: 4, overflow: "hidden", border: `0.5px solid ${c.trap ? "var(--signal-edge)" : EDGE}` }}>
                  <div style={{ width: `${(c.w / c.n) * 100}%`, background: c.trap ? "var(--signal-ink-3)" : "var(--green)" }} />
                  <div style={{ width: `${(c.d / c.n) * 100}%`, background: c.trap ? "rgba(255,255,255,.28)" : "rgba(20,24,26,0.28)" }} />
                  <div style={{ width: `${(c.l / c.n) * 100}%`, background: c.trap ? "rgba(255,255,255,.10)" : "rgba(20,24,26,0.10)" }} />
                </div>
                <span className="mono block mt-2" style={{ fontSize: 11, color: c.trap ? "var(--signal-ink-2)" : INK3 }}>
                  {c.w}W {c.d}D {c.l}L · xG {c.xg} / {c.xga}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 mono" style={{ fontSize: 10, letterSpacing: ".1em", color: "var(--ink-4)" }}>
            <span>{axes.xLow}</span>
            <span>{axes.x}</span>
            <span>{axes.xHigh}</span>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-1 mono pl-[34px]" style={{ fontSize: 10, letterSpacing: ".1em", color: "var(--ink-4)" }}>
        <span>{axes.yHigh} ↑ / {axes.yLow} ↓</span>
      </div>
    </div>
  );
}

/* ── xG bands inside one posture ───────────────────────────────────── */

export function BandLadder({
  rows,
  bandLabel,
  winLabel,
  ppgLabel,
  accentLast = true,
}: {
  rows: [string, number, number, number, number, number, number][];
  bandLabel: string;
  winLabel: string;
  ppgLabel: string;
  accentLast?: boolean;
}) {
  const max = Math.max(...rows.map((r) => r[5]), 1);
  return (
    <div className="flex flex-col gap-2.5">
      {rows.map((r, i) => {
        const on = accentLast ? i === rows.length - 1 : i === 0;
        return (
          <div key={r[0]} className="flex items-center gap-3">
            <span className="mono shrink-0 text-right" style={{ width: 92, fontSize: 12, color: on ? INK : INK3, fontWeight: on ? 600 : 400 }}>
              {bandLabel} {r[0]}
            </span>
            <span className="mono shrink-0" style={{ width: 34, fontSize: 10.5, color: "var(--ink-4)" }}>n={r[1]}</span>
            <div className="flex-1" style={{ height: 24 }}>
              <div
                style={{
                  width: `${Math.max((r[5] / max) * 100, 1.5)}%`,
                  height: "100%",
                  borderRadius: 4,
                  background: on ? "var(--green)" : "rgba(20,24,26,0.16)",
                  transition: "width .8s var(--ease-out)",
                }}
              />
            </div>
            <span className="mono shrink-0 text-right" style={{ width: 168, fontSize: 11.5, color: on ? INK : INK3 }}>
              {winLabel} {r[5]}% · {r[2]}-{r[3]}-{r[4]} · {ppgLabel} {r[6]}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ── one team's tournament, coloured by quadrant ───────────────────── */

const QUAD_STYLE: Record<string, { bg: string; fg: string }> = {
  "productive-possession": { bg: "var(--green)", fg: "var(--signal-ink)" },
  "productive-reactive": { bg: "rgba(20,24,26,0.55)", fg: "#fff" },
  other: { bg: "rgba(20,24,26,0.13)", fg: "var(--ink)" },
  "barren-possession": { bg: "rgba(20,24,26,0.06)", fg: "var(--ink-3)" },
  "barren-reactive": { bg: "#fff", fg: "var(--ink)" },
};

export function QuadRun({
  rows,
  labels,
  quadNames,
}: {
  rows: [string, string, number, number, number, number, number, number, string, string, string][];
  labels: { poss: string; block: string; xg: string };
  quadNames: Record<string, string>;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {rows.map((r, i) => {
        const [stage, opp, gf, ga, poss, lb, xg, xga, quad, , result] = r;
        const st = QUAD_STYLE[quad] ?? QUAD_STYLE.other;
        const barren = quad.startsWith("barren");
        return (
          <div
            key={i}
            className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-lg px-3.5 py-2.5"
            style={{
              background: st.bg,
              color: st.fg,
              border: barren ? "1px dashed var(--green-line)" : "0.5px solid transparent",
            }}
          >
            <span className="mono shrink-0" style={{ width: 34, fontSize: 10.5, opacity: 0.7 }}>{stage}</span>
            <span className="display shrink-0" style={{ width: 46, fontSize: 13 }}>{opp}</span>
            <span className="display shrink-0" style={{ width: 44, fontSize: 14 }}>
              {gf}–{ga}
              <span style={{ fontSize: 10, opacity: 0.65 }}> {result}</span>
            </span>
            <span className="mono shrink-0" style={{ width: 78, fontSize: 11, opacity: 0.85 }}>{labels.poss} {poss}%</span>
            <span className="mono shrink-0" style={{ width: 76, fontSize: 11, opacity: 0.85 }}>{labels.block} {lb}%</span>
            <span className="mono shrink-0" style={{ width: 96, fontSize: 11, opacity: 0.85 }}>{labels.xg} {xg}–{xga}</span>
            <span className="mono" style={{ fontSize: 10.5, letterSpacing: ".06em", opacity: 0.9 }}>{quadNames[quad] ?? quad}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ── within-team dumbbell ──────────────────────────────────────────── */

export function WithinTeam({
  rows,
  ko,
  labels,
}: {
  rows: [string, string, number, number, number, number][];
  ko: boolean;
  labels: { barren: string; productive: string; axis: string };
}) {
  const L = 108, R = 604, x = (v: number) => L + (v / 3) * (R - L);
  return (
    <div>
      <div className="flex flex-wrap gap-x-5 gap-y-2 mb-3" style={{ fontSize: 12, color: INK3 }}>
        <span className="flex items-center gap-1.5">
          <span style={{ width: 10, height: 10, borderRadius: 10, background: "rgba(20,24,26,0.30)", display: "inline-block" }} />
          {labels.barren}
        </span>
        <span className="flex items-center gap-1.5">
          <span style={{ width: 10, height: 10, borderRadius: 10, background: "var(--green)", display: "inline-block" }} />
          {labels.productive}
        </span>
      </div>
      <svg viewBox={`0 0 660 ${34 + rows.length * 19 + 30}`} style={{ width: "100%", height: "auto" }} role="img" aria-label="Within-team comparison of points per game">
        {[0, 1, 2, 3].map((v) => (
          <g key={v}>
            <line x1={x(v)} y1={18} x2={x(v)} y2={30 + rows.length * 19} stroke={EDGE} strokeWidth={0.5} />
            <text x={x(v)} y={30 + rows.length * 19 + 14} fontSize={11} fill="var(--ink-4)" textAnchor="middle">{v}</text>
          </g>
        ))}
        <text x={(L + R) / 2} y={30 + rows.length * 19 + 28} fontSize={11} fill="var(--ink-4)" textAnchor="middle">{labels.axis}</text>
        {rows.map((r, i) => {
          const y = 30 + i * 19;
          const up = r[3] >= r[2];
          return (
            <g key={r[0]}>
              <text x={L - 8} y={y + 4} fontSize={11.5} fill={up ? INK : "var(--ink-3)"} textAnchor="end">{ko ? r[1] : r[0]}</text>
              <line x1={x(r[2])} y1={y} x2={x(r[3])} y2={y} stroke={up ? "rgba(20,24,26,0.22)" : "rgba(20,24,26,0.10)"} strokeWidth={3.5} strokeLinecap="round" />
              <circle cx={x(r[2])} cy={y} r={4} fill="rgba(20,24,26,0.30)" />
              <circle cx={x(r[3])} cy={y} r={4} fill={up ? "var(--green)" : "rgba(20,24,26,0.16)"} />
              <text x={R + 8} y={y + 4} fontSize={10.5} fill="var(--ink-4)">{r[4]}/{r[5]}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ── trajectory small multiples ────────────────────────────────────── */

export function Trajectories({
  rows,
  ko,
  labels,
}: {
  rows: [string, string, [number, number, string, string][]][];
  ko: boolean;
  labels: { barren: string; productive: string; won: string; drew: string; lost: string; x: string; y: string };
}) {
  const W = 300, H = 210, PL = 30, PR = 8, PT = 8, PB = 24;
  const xs = (p: number) => PL + ((p - 15) / 60) * (W - PL - PR);
  const ys = (v: number) => H - PB - (Math.min(v, 4) / 4) * (H - PT - PB);
  const col = (r: string) => (r === "W" ? "var(--green)" : r === "D" ? "rgba(20,24,26,0.34)" : "rgba(20,24,26,0.13)");
  return (
    <div>
      <div className="flex flex-wrap gap-x-5 gap-y-2 mb-3" style={{ fontSize: 12, color: INK3 }}>
        {[[labels.won, "var(--green)"], [labels.drew, "rgba(20,24,26,0.34)"], [labels.lost, "rgba(20,24,26,0.13)"]].map(([t, c]) => (
          <span key={t} className="flex items-center gap-1.5">
            <span style={{ width: 10, height: 10, borderRadius: 10, background: c, display: "inline-block", border: "0.5px solid rgba(20,24,26,.22)" }} />
            {t}
          </span>
        ))}
      </div>
      <div className="grid gap-2.5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
        {rows.map(([team, kname, pts]) => (
          <div key={team} className="rounded-xl p-2.5" style={{ background: "var(--stage-3)", border: `0.5px solid ${EDGE}` }}>
            <p className="display mb-1.5" style={{ fontSize: 12.5, color: INK }}>{ko ? kname : team}</p>
            <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }} role="img" aria-label={`${team} trajectory`}>
              <rect x={PL} y={ys(1)} width={xs(50) - PL} height={H - PB - ys(1)} fill="rgba(20,24,26,0.055)" />
              <rect x={xs(50)} y={PT} width={W - PR - xs(50)} height={ys(1) - PT} fill="rgba(20,24,26,0.04)" />
              <line x1={xs(50)} y1={PT} x2={xs(50)} y2={H - PB} stroke={EDGE} strokeWidth={0.5} />
              <line x1={PL} y1={ys(1)} x2={W - PR} y2={ys(1)} stroke="var(--ink-4)" strokeWidth={0.8} strokeDasharray="4 3" />
              <text x={PL + 3} y={H - PB - 4} fontSize={10} fill="var(--ink-4)">{labels.barren}</text>
              <text x={W - PR - 3} y={PT + 10} fontSize={10} fill="var(--ink-4)" textAnchor="end">{labels.productive}</text>
              {pts.slice(0, -1).map((p, i) => (
                <line key={i} x1={xs(p[0])} y1={ys(p[1])} x2={xs(pts[i + 1][0])} y2={ys(pts[i + 1][1])} stroke="var(--ink-4)" strokeWidth={1.1} opacity={0.45} />
              ))}
              {pts.map((p, i) => (
                <g key={i}>
                  <circle cx={xs(p[0])} cy={ys(p[1])} r={i === pts.length - 1 ? 8 : 6.5} fill={col(p[2])} stroke="var(--stage-3)" strokeWidth={1.2} />
                  <text x={xs(p[0])} y={ys(p[1]) + 3.5} fontSize={9.5} fill={p[2] === "L" ? INK : "var(--signal-ink)"} textAnchor="middle">{p[3]}</text>
                </g>
              ))}
              {[20, 35, 50, 65].map((v) => (
                <text key={v} x={xs(v)} y={H - 7} fontSize={10} fill="var(--ink-4)" textAnchor="middle">{v}</text>
              ))}
              {[0, 1, 2, 3, 4].map((v) => (
                <text key={v} x={PL - 4} y={ys(v) + 3.5} fontSize={10} fill="var(--ink-4)" textAnchor="end">{v}</text>
              ))}
            </svg>
          </div>
        ))}
      </div>
      <p className="mono mt-2.5" style={{ fontSize: 11, color: "var(--ink-4)" }}>{labels.x} / {labels.y}</p>
    </div>
  );
}

/* ── trajectory small multiples, full version: bigger points, placement
   badges, opponent + score per match, and all four quadrants labelled ── */

const PLACEMENT_STYLE: Record<string, { bg: string; fg: string }> = {
  "우승": { bg: "var(--green)", fg: "var(--signal-ink)" },
  winner: { bg: "var(--green)", fg: "var(--signal-ink)" },
  "준우승": { bg: "rgba(20,24,26,0.62)", fg: "#fff" },
  runnerup: { bg: "rgba(20,24,26,0.62)", fg: "#fff" },
  "3위": { bg: "rgba(20,24,26,0.30)", fg: "var(--ink)" },
  "3rd": { bg: "rgba(20,24,26,0.30)", fg: "var(--ink)" },
  "4위": { bg: "rgba(20,24,26,0.16)", fg: "var(--ink)" },
  "4th": { bg: "rgba(20,24,26,0.16)", fg: "var(--ink)" },
};

export function TrajectoriesFull({
  rows,
  ko,
  labels,
}: {
  rows: TrajectoryTeam[];
  ko: boolean;
  labels: {
    barren: string; productive: string; won: string; drew: string; lost: string; x: string; y: string;
    q1: string; q2: string; q3: string; q4: string; matches: string;
  };
}) {
  const W = 320, H = 232, PL = 32, PR = 10, PT = 10, PB = 26;
  const xs = (p: number) => PL + ((p - 15) / 60) * (W - PL - PR);
  const ys = (v: number) => H - PB - (Math.min(v, 4) / 4) * (H - PT - PB);
  const col = (r: string) => (r === "W" ? "var(--green)" : r === "D" ? "rgba(20,24,26,0.34)" : "rgba(20,24,26,0.14)");
  return (
    <div>
      <div className="flex flex-wrap gap-x-5 gap-y-2 mb-3" style={{ fontSize: 12, color: INK3 }}>
        {[[labels.won, "var(--green)"], [labels.drew, "rgba(20,24,26,0.34)"], [labels.lost, "rgba(20,24,26,0.14)"]].map(([t, c]) => (
          <span key={t} className="flex items-center gap-1.5">
            <span style={{ width: 10, height: 10, borderRadius: 10, background: c, display: "inline-block", border: "0.5px solid rgba(20,24,26,.22)" }} />
            {t}
          </span>
        ))}
      </div>
      <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(272px, 1fr))" }}>
        {rows.map(([team, kname, flag, placement, elimIdx, pts]) => {
          const st = PLACEMENT_STYLE[placement] ?? { bg: "rgba(20,24,26,0.10)", fg: INK3 };
          return (
            <div key={team} className="rounded-xl p-3" style={{ background: "var(--stage-3)", border: `0.5px solid ${EDGE}` }}>
              <div className="flex items-center justify-between mb-2">
                <p className="display" style={{ fontSize: 13.5, color: INK }}>{flag} {ko ? kname : team}</p>
                <span className="mono px-2 py-0.5 rounded-full" style={{ fontSize: 10, letterSpacing: ".04em", background: st.bg, color: st.fg }}>
                  {placement}
                </span>
              </div>
              <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }} role="img" aria-label={`${team} trajectory`}>
                <rect x={PL} y={ys(1)} width={xs(50) - PL} height={H - PB - ys(1)} fill="rgba(20,24,26,0.06)" />
                <rect x={xs(50)} y={ys(1)} width={W - PR - xs(50)} height={H - PB - ys(1)} fill="rgba(20,24,26,0.10)" />
                <rect x={PL} y={PT} width={xs(50) - PL} height={ys(1) - PT} fill="rgba(20,24,26,0.03)" />
                <rect x={xs(50)} y={PT} width={W - PR - xs(50)} height={ys(1) - PT} fill="var(--green-soft)" />
                <line x1={xs(50)} y1={PT} x2={xs(50)} y2={H - PB} stroke={EDGE} strokeWidth={0.5} />
                <line x1={PL} y1={ys(1)} x2={W - PR} y2={ys(1)} stroke="var(--ink-4)" strokeWidth={0.8} strokeDasharray="4 3" />
                {pts.slice(0, -1).map((p, i) => (
                  <line key={i} x1={xs(p[0])} y1={ys(p[1])} x2={xs(pts[i + 1][0])} y2={ys(pts[i + 1][1])} stroke="var(--ink-4)" strokeWidth={1.2} opacity={0.5} />
                ))}
                {pts.map((p, i) => {
                  const isLast = i === pts.length - 1;
                  const isElim = elimIdx !== null && i === elimIdx;
                  const r = isLast || isElim ? 10.5 : 8.5;
                  return (
                    <g key={i}>
                      <circle
                        cx={xs(p[0])} cy={ys(p[1])} r={r}
                        fill={col(p[2])}
                        stroke={isElim ? INK : "var(--stage-3)"}
                        strokeWidth={isElim ? 2 : 1.4}
                      />
                      <text
                        x={xs(p[0])} y={ys(p[1]) + 3.2} fontSize={9} fontWeight={600}
                        fill={p[2] === "L" ? INK : "var(--signal-ink)"} textAnchor="middle"
                      >
                        {p[3]}
                      </text>
                    </g>
                  );
                })}
                {[20, 35, 50, 65].map((v) => (
                  <text key={v} x={xs(v)} y={H - 8} fontSize={9.5} fill="var(--ink-4)" textAnchor="middle">{v}</text>
                ))}
                {[0, 1, 2, 3, 4].map((v) => (
                  <text key={v} x={PL - 4} y={ys(v) + 3.2} fontSize={9.5} fill="var(--ink-4)" textAnchor="end">{v}</text>
                ))}
              </svg>
              <p className="mono mt-1.5" style={{ fontSize: 9.5, color: "var(--ink-4)" }}>
                {labels.matches}
              </p>
              <div className="mt-1 flex flex-col gap-0.5">
                {pts.map((p, i) => (
                  <div
                    key={i}
                    className="mono flex items-center justify-between"
                    style={{
                      fontSize: 10,
                      color: elimIdx !== null && i === elimIdx ? INK : INK3,
                      fontWeight: elimIdx !== null && i === elimIdx ? 600 : 400,
                    }}
                  >
                    <span>{p[3]} v {p[6]} {p[4]}</span>
                    <span>{p[5]} ({p[2]})</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="grid gap-2 mt-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        {[
          { bg: "var(--green-soft)", label: labels.q1 },
          { bg: "rgba(20,24,26,0.03)", label: labels.q2 },
          { bg: "rgba(20,24,26,0.10)", label: labels.q3 },
          { bg: "rgba(20,24,26,0.06)", label: labels.q4 },
        ].map((q, i) => (
          <div key={i} className="rounded-lg px-2.5 py-2 flex items-center gap-2" style={{ background: "var(--stage-3)", border: `0.5px solid ${EDGE}` }}>
            <span style={{ width: 12, height: 12, borderRadius: 3, background: q.bg, border: `0.5px solid ${EDGE}`, flexShrink: 0 }} />
            <span style={{ fontSize: 10.5, color: INK3, lineHeight: 1.4 }}>{q.label}</span>
          </div>
        ))}
      </div>
      <p className="mono mt-3" style={{ fontSize: 11, color: "var(--ink-4)" }}>{labels.x} / {labels.y}</p>
    </div>
  );
}

/* ── low-block overlay + winners vs losers geometry ────────────────── */

export function BlockOverlay({
  overlay,
  geometry,
  labels,
}: {
  overlay: [string, string, number, number, number, number][];
  geometry: [string, number, number][];
  labels: { height: string; length: string; width: string; xg: string; winners: string; losers: string; goal: string };
}) {
  const S = 2.5, h = 105 * S * 0.42, w = 68 * S;
  const ko = labels.goal.length > 8;
  return (
    <div className="flex flex-wrap gap-5">
      <div style={{ flex: "0 0 190px" }}>
        <svg viewBox={`0 0 ${w} ${h + 18}`} style={{ width: "100%", height: "auto" }} role="img" aria-label="Two low blocks overlaid at the same scale">
          <rect x={0} y={0} width={w} height={h} fill="var(--stage-2)" stroke={EDGE} strokeWidth={0.8} />
          <rect x={(w - 40.3 * S) / 2} y={h - 16.5 * S} width={40.3 * S} height={16.5 * S} fill="none" stroke={EDGE} strokeWidth={0.8} />
          <rect x={(w - 18.3 * S) / 2} y={h - 5.5 * S} width={18.3 * S} height={5.5 * S} fill="none" stroke={EDGE} strokeWidth={0.8} />
          {overlay.map((o, i) => {
            const bw = o[4] * S, bh = o[3] * S, bottom = h - o[2] * S;
            return (
              <rect
                key={o[0]}
                x={(w - bw) / 2}
                y={bottom - bh}
                width={bw}
                height={bh}
                fill="none"
                stroke={i === 0 ? "var(--green)" : "var(--ink-3)"}
                strokeWidth={i === 0 ? 2 : 1.8}
                strokeDasharray={i === 0 ? undefined : "5 3"}
              />
            );
          })}
          <text x={w / 2} y={h + 13} fontSize={10.5} fill="var(--ink-4)" textAnchor="middle">{labels.goal}</text>
        </svg>
      </div>
      <div style={{ flex: "1 1 260px" }}>
        {overlay.map((o, i) => (
          <div key={o[0]} className="flex items-center gap-2 mb-1.5" style={{ fontSize: 12, color: INK3 }}>
            <span style={{ width: 16, height: 0, borderTop: `2px ${i === 0 ? "solid var(--green)" : "dashed var(--ink-3)"}`, display: "inline-block" }} />
            <span style={{ color: INK }}>{ko ? o[1] : o[0]}</span>
            <span className="mono">{o[2]} · {o[3]} · {o[4]} m</span>
            <span className="mono" style={{ color: "var(--ink-4)" }}>{labels.xg} {o[5]}</span>
          </div>
        ))}
        <div className="mt-4">
          <MiniTable
            head={[ko ? "깊은 블록 62경기" : "62 deep-block matches", labels.winners, labels.losers]}
            rows={geometry.map((g) => {
              const names: Record<string, [string, string]> = {
                lb_height: ["Line height (m)", "라인 높이 (m)"],
                lb_length: ["Team length (m)", "팀 길이 (m)"],
                lb_width: ["Team width (m)", "팀 폭 (m)"],
                xg: ["xG created", "생성 xG"],
              };
              return [ko ? names[g[0]][1] : names[g[0]][0], g[1], g[2]];
            })}
            highlightCol={1}
          />
        </div>
      </div>
    </div>
  );
}

/* ── one team's matches as cards ───────────────────────────────────── */

export function MatchCards({
  rows,
  ko,
  labels,
}: {
  rows: [string, string, string, string, number, number, number, string, string][];
  ko: boolean;
  labels: { poss: string; block: string; xg: string };
}) {
  return (
    <div className="grid gap-2.5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(148px, 1fr))" }}>
      {rows.map((m, i) => {
        const barren = m[6] < 1.0;
        return (
          <div
            key={i}
            className="rounded-xl p-3"
            style={{
              background: barren ? "var(--green)" : "var(--stage-3)",
              color: barren ? "var(--signal-ink)" : INK,
              border: `0.5px solid ${barren ? "transparent" : EDGE}`,
            }}
          >
            <div className="flex justify-between items-baseline mb-0.5">
              <span className="mono" style={{ fontSize: 10, letterSpacing: ".08em", opacity: 0.62 }}>{m[0]}</span>
              <span className="mono" style={{ fontSize: 10.5, opacity: 0.8 }}>{m[7]}</span>
            </div>
            <p className="display" style={{ fontSize: 13, margin: 0 }}>{ko ? m[2] : m[1]}</p>
            <p className="mono" style={{ fontSize: 10.5, opacity: 0.7, margin: "1px 0 9px" }}>{m[3]} · {m[8]}</p>

            {([[labels.poss, m[4], true], [labels.block, m[5], false]] as [string, number, boolean][]).map(([lab, v, main]) => (
              <div key={lab} className="mb-2">
                <div className="flex justify-between mono" style={{ fontSize: 10.5, opacity: 0.75, marginBottom: 2 }}>
                  <span>{lab}</span><span>{v}%</span>
                </div>
                <div style={{ height: 5, borderRadius: 3, background: barren ? "rgba(255,255,255,.18)" : "rgba(20,24,26,0.10)" }}>
                  <div style={{ width: `${v}%`, height: "100%", borderRadius: 3, background: barren ? "var(--signal-ink-2)" : main ? "var(--green)" : "rgba(20,24,26,0.34)" }} />
                </div>
              </div>
            ))}

            <div className="flex justify-between items-baseline pt-1.5" style={{ borderTop: `0.5px solid ${barren ? "var(--signal-edge)" : EDGE}` }}>
              <span className="mono" style={{ fontSize: 10.5, opacity: 0.75 }}>{labels.xg}</span>
              <span className="display" style={{ fontSize: 17 }}>{m[6].toFixed(2)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── concept scorecard ─────────────────────────────────────────────── */

export function ConceptCards({
  items,
}: {
  items: { name: string; verdict: string; score: string; quant: string; qual: string }[];
}) {
  return (
    <div className="grid gap-3.5 md:grid-cols-2">
      {items.map((it) => (
        <div key={it.name} className="rounded-xl p-5" style={{ background: "var(--stage-3)", border: `0.5px solid ${EDGE}` }}>
          <div className="flex items-baseline justify-between mb-2">
            <span className="display" style={{ fontSize: 15.5, color: INK }}>{it.name}</span>
            <span
              className="mono px-2 py-0.5 rounded-full"
              style={{ fontSize: 9.5, letterSpacing: ".08em", background: "var(--green-soft)", color: "var(--green-bright)", border: "0.5px solid var(--green-line)" }}
            >
              {it.score}
            </span>
          </div>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, color: INK, marginBottom: 9 }}>{it.verdict}</p>
          <p className="mono" style={{ fontSize: 11.5, lineHeight: 1.65, color: INK3, marginBottom: 5 }}>{it.quant}</p>
          <p className="mono" style={{ fontSize: 11.5, lineHeight: 1.65, color: INK3 }}>{it.qual}</p>
        </div>
      ))}
    </div>
  );
}

/* ── trap panel: big win%, W-D-L bar, named table, flags ──────────────
   Used for 그림 3 — the two traps' actual line-ups, now with flags and
   an explicit win-rate header so the contrast reads immediately. */

export function TrapPanel({
  label,
  winPct,
  record,
  head,
  rows,
  highlightCol,
  note,
}: {
  label: string;
  winPct: number;
  record: [number, number, number];
  head: string[];
  rows: (string | number)[][];
  highlightCol?: number;
  note: string;
}) {
  const [w, dr, l] = record;
  const n = w + dr + l;
  return (
    <div className="rounded-xl p-4" style={{ background: "var(--stage-3)", border: `0.5px solid ${EDGE}` }}>
      <span className="mono block mb-2" style={{ fontSize: 10.5, letterSpacing: ".1em", color: "var(--green-bright)" }}>
        {label}
      </span>
      <div className="flex items-baseline gap-3 mb-2">
        <span className="display" style={{ fontSize: 34, letterSpacing: "-0.03em", color: INK, lineHeight: 1 }}>{winPct}%</span>
        <span className="mono" style={{ fontSize: 11, color: INK3 }}>{w}W {dr}D {l}L · n={n}</span>
      </div>
      <div className="flex mb-4" style={{ height: 8, borderRadius: 4, overflow: "hidden", border: `0.5px solid ${EDGE}` }}>
        <div style={{ width: `${(w / n) * 100}%`, background: "var(--green)" }} />
        <div style={{ width: `${(dr / n) * 100}%`, background: "rgba(20,24,26,0.28)" }} />
        <div style={{ width: `${(l / n) * 100}%`, background: "rgba(20,24,26,0.10)" }} />
      </div>
      <MiniTable head={head} rows={rows} highlightCol={highlightCol} />
      <p className="mt-3" style={{ fontSize: 12, lineHeight: 1.6, color: INK3 }}>{note}</p>
    </div>
  );
}

/* ── recovered pass-network proxy: connection-strength distribution ───
   그림 16 (main, option C) — every player-pair connection in the final,
   ranked strongest to weakest per team and overlaid on one axis. The
   gap between the two curves IS the finding: Spain's is uniformly
   higher, not just spikier. */

const NET_RED = "#B23A2E";
const NET_BLUE = "#3E6B96";

export function ConnectionStrip({
  teams,
  threshold = 10,
  labels,
}: {
  teams: [string, string, number[]][];
  threshold?: number;
  labels: { threshold: string; rank: string; passes: string; total: string; above: string };
}) {
  const W = 680, H = 230, L = 44, R = 664, TOP = 18, BASE = 190;
  const maxLen = Math.max(...teams.map((t) => t[2].length));
  const maxV = Math.max(...teams.map((t) => Math.max(...t[2])));
  const step = (R - L) / (maxLen - 1);
  const x = (i: number) => L + i * step;
  const y = (v: number) => BASE - (v / maxV) * (BASE - TOP);
  const colors = [NET_RED, NET_BLUE];
  const yTicks = [0, 10, 20, 40, 60].filter((t) => t <= maxV + 5);

  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }} role="img">
        {yTicks.map((t) => (
          <g key={t}>
            <line x1={L} x2={R} y1={y(t)} y2={y(t)} stroke={EDGE} strokeWidth={0.5} />
            <text x={L - 7} y={y(t) + 3.5} fontSize={10.5} fill="var(--ink-4)" textAnchor="end" className="mono">{t}</text>
          </g>
        ))}
        <line x1={L} x2={R} y1={y(threshold)} y2={y(threshold)} stroke={INK} strokeWidth={1.5} strokeDasharray="5 4" />
        <text x={R} y={y(threshold) - 7} fontSize={10.5} fill={INK} textAnchor="end">{labels.threshold}</text>
        {teams.map((t, ti) => (
          <g key={t[0]}>
            {t[2].map((v, i) => (
              <line
                key={i}
                x1={x(i)} x2={x(i)} y1={BASE} y2={y(v)}
                stroke={colors[ti % colors.length]}
                strokeWidth={2.4}
                opacity={ti === 0 ? 0.95 : 0.8}
              >
                <title>{t[1]} {labels.rank} {i + 1} · {v}{labels.passes}</title>
              </line>
            ))}
          </g>
        ))}
        <text x={(L + R) / 2} y={H - 14} fontSize={10.5} fill="var(--ink-3)" textAnchor="middle">{labels.rank}</text>
        <text x={14} y={(TOP + BASE) / 2} fontSize={10.5} fill="var(--ink-3)" textAnchor="middle" transform={`rotate(-90 14 ${(TOP + BASE) / 2})`}>{labels.passes}</text>
      </svg>
      <div className="flex flex-wrap gap-x-5 gap-y-2 mt-2" style={{ fontSize: 12.5, color: INK3 }}>
        {teams.map((t, i) => (
          <span key={t[0]} className="flex items-center gap-1.5">
            <span style={{ width: 13, height: 13, background: colors[i % colors.length], display: "inline-block" }} />
            {t[0]} <b style={{ color: INK }}>{t[1]}</b>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── 그림 17 (supporting, option A) — same match, named top-10 pairs ──── */

export function ConnectionLadder({
  teams,
  threshold = 10,
  labels,
}: {
  teams: [string, string, [string, number][]][];
  threshold?: number;
  labels: { top10: string };
}) {
  const maxV = Math.max(...teams.flatMap((t) => t[2].map((p) => p[1])));
  return (
    <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
      {teams.map((t) => (
        <div key={t[0]}>
          <p className="mb-0.5" style={{ fontSize: 12.5, fontWeight: 600, color: INK }}>{t[0]} {t[1]}</p>
          <p className="mono mb-2.5" style={{ fontSize: 11, color: INK3 }}>{labels.top10}</p>
          <div className="flex flex-col gap-1.5">
            {t[2].map(([pair, v]) => (
              <div key={pair} className="flex items-center gap-2">
                <span
                  className="text-right"
                  style={{ width: 118, fontSize: 11, color: INK3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                >
                  {pair}
                </span>
                <span className="flex-1" style={{ height: 15 }}>
                  <span
                    className="block"
                    style={{ width: `${(v / maxV) * 100}%`, height: "100%", borderRadius: 3, background: v >= threshold ? INK : "rgba(20,24,26,0.22)" }}
                  />
                </span>
                <span className="mono" style={{ width: 22, fontSize: 11, color: INK }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
