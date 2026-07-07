"use client";
import { useRef, useState } from "react";

export type XtPoint = { min: number; home: number; away: number };
export type VMarker = { min: number; v: number };

type Props = {
  data: XtPoint[];
  homeLabel: string;
  awayLabel: string;
  goals?: number[];
  vMarkers?: VMarker[];
  est?: boolean;
};

const W = 680;
const H = 150;
const PAD_L = 30;
const PAD_R = 20;
const BASE_Y = 120;
const TOP_Y = 16;

export default function XTTimeline({ data, homeLabel, awayLabel, goals = [], vMarkers = [], est }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [scrubMin, setScrubMin] = useState<number | null>(null);
  const maxMin = Math.max(...data.map((d) => d.min), 90);
  const maxVal = Math.max(...data.map((d) => Math.max(d.home, d.away)), 0.01);

  const xFor = (min: number) => PAD_L + (min / maxMin) * (W - PAD_L - PAD_R);
  const yFor = (v: number) => BASE_Y - (v / maxVal) * (BASE_Y - TOP_Y);

  const linePoints = (key: "home" | "away") => data.map((d) => `${xFor(d.min)},${yFor(d[key])}`).join(" ");

  function handlePointer(e: React.PointerEvent<SVGSVGElement>) {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * W;
    const min = Math.max(0, Math.min(maxMin, ((relX - PAD_L) / (W - PAD_L - PAD_R)) * maxMin));
    setScrubMin(Math.round(min));
  }

  const nearest = scrubMin != null
    ? data.reduce((a, b) => (Math.abs(a.min - scrubMin) < Math.abs(b.min - scrubMin) ? a : b))
    : null;

  return (
    <div className="rounded-lg p-3.5" style={{ background: "rgba(0,0,0,.25)", border: "0.5px solid rgba(255,145,60,.18)" }}>
      <p className="mono mb-2" style={{ fontSize: 9, letterSpacing: ".14em", color: "rgba(255,190,115,.75)" }}>
        XT TIMELINE · ROLLING THREAT BY MINUTE{est && " · est. (hand-tagged from broadcast)"}
      </p>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        style={{ display: "block", width: "100%", cursor: "crosshair" }}
        onPointerMove={handlePointer}
        onPointerLeave={() => setScrubMin(null)}
      >
        <line x1={PAD_L} y1={BASE_Y} x2={W - PAD_R} y2={BASE_Y} stroke="rgba(255,255,255,.18)" strokeWidth={1} />

        <text x={PAD_L} y={16} fontFamily="'JetBrains Mono',monospace" fontSize={8.5} fill="rgba(255,190,115,.8)">{homeLabel}</text>
        <text x={PAD_L} y={28} fontFamily="'JetBrains Mono',monospace" fontSize={8.5} fill="rgba(200,200,200,.5)">{awayLabel}</text>

        <polyline points={linePoints("away")} fill="none" stroke="rgba(200,200,200,.3)" strokeWidth={1.4} />
        <polyline points={linePoints("home")} fill="none" stroke="rgba(255,172,88,.95)" strokeWidth={1.8} />

        {goals.map((g) => (
          <text key={g} x={xFor(g)} y={137} textAnchor="middle" fontFamily="'JetBrains Mono',monospace" fontSize={8} fill="rgba(255,215,120,.95)">
            {g}&apos; ⚽
          </text>
        ))}

        {vMarkers.map((m, i) => (
          <a key={i} href={`#v${m.v}`} style={{ cursor: "pointer" }}>
            <text x={xFor(m.min)} y={TOP_Y + 4} textAnchor="middle" fontFamily="'JetBrains Mono',monospace" fontSize={8} fill="rgba(165,178,255,.95)">
              V{m.v}
            </text>
          </a>
        ))}

        {nearest && (
          <g>
            <line x1={xFor(nearest.min)} y1={TOP_Y} x2={xFor(nearest.min)} y2={BASE_Y} stroke="rgba(255,255,255,.4)" strokeWidth={1} strokeDasharray="2 3" />
            <circle cx={xFor(nearest.min)} cy={yFor(nearest.home)} r={3} fill="rgba(255,215,120,.98)" />
            <circle cx={xFor(nearest.min)} cy={yFor(nearest.away)} r={3} fill="rgba(220,220,220,.9)" />
          </g>
        )}
      </svg>
      <p className="mono mt-2" style={{ fontSize: 9.5, color: "rgba(220,210,195,.7)" }}>
        {nearest ? `${nearest.min}' — ${homeLabel} ${nearest.home.toFixed(2)} · ${awayLabel} ${nearest.away.toFixed(2)}` : "drag to scrub · click a V-marker to jump to that card"}
      </p>
    </div>
  );
}
