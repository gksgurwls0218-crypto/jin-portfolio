"use client";
import { useState } from "react";

export type PitchNode = {
  x: number;
  y: number;
  team: "us" | "opp";
  label?: string;
  /** renders a pulsing "?" question tag above the node — the visual grammar for buffering */
  question?: boolean;
  r?: number;
};

export type PitchArrow = {
  from: { x: number; y: number };
  to: { x: number; y: number };
  /** dashed = option/not-yet-executed; solid = executed action */
  kind: "option" | "run" | "cover";
  label?: string;
};

export type PitchZone = {
  x: number;
  y: number;
  width: number;
  height: number;
  label?: string;
  rx?: number;
};

export type PitchFrame = {
  nodes: PitchNode[];
  arrows?: PitchArrow[];
  zones?: PitchZone[];
  caption?: string;
};

type Props = {
  nodes?: PitchNode[];
  arrows?: PitchArrow[];
  zones?: PitchZone[];
  /** when provided, renders prev/next controls that step through frames */
  steps?: PitchFrame[];
  stepLabels?: string[];
};

const W = 680;
const H = 415;

const TEAM_COLOR = {
  us: { fill: "rgba(34,86,28,.86)", stroke: "rgba(86,196,70,.7)" },
  opp: { fill: "rgba(108,30,30,.9)", stroke: "rgba(218,75,62,.8)" },
};

function Pitch() {
  return (
    <g>
      <rect width={W} height={H} fill="#0a1207" />
      <rect x={60} y={16} width={560} height={H - 32} fill="none" stroke="rgba(72,132,58,.55)" strokeWidth={1} />
      <line x1={340} y1={16} x2={340} y2={H - 16} stroke="rgba(72,132,58,.55)" strokeWidth={1} />
      <circle cx={340} cy={H / 2} r={50} fill="none" stroke="rgba(72,132,58,.55)" strokeWidth={1} />
      <circle cx={340} cy={H / 2} r={2.5} fill="rgba(72,132,58,.55)" />
      <rect x={60} y={108} width={116} height={H - 216} fill="none" stroke="rgba(72,132,58,.55)" strokeWidth={1} />
      <rect x={504} y={108} width={116} height={H - 216} fill="none" stroke="rgba(72,132,58,.55)" strokeWidth={1} />
      <rect x={60} y={155} width={46} height={H - 310} fill="none" stroke="rgba(72,132,58,.55)" strokeWidth={1} />
      <rect x={574} y={155} width={46} height={H - 310} fill="none" stroke="rgba(72,132,58,.55)" strokeWidth={1} />
    </g>
  );
}

function Zones({ zones }: { zones: PitchZone[] }) {
  return (
    <>
      {zones.map((z, i) => (
        <g key={i}>
          <rect
            x={z.x} y={z.y} width={z.width} height={z.height} rx={z.rx ?? 8}
            fill="rgba(120,150,255,.13)" stroke="rgba(140,165,255,.55)" strokeWidth={1} strokeDasharray="3 4"
          />
          {z.label && (
            <text x={z.x + 8} y={z.y + z.height - 8} fontFamily="'JetBrains Mono',monospace" fontSize={8.5} fill="rgba(165,178,255,.9)">
              {z.label}
            </text>
          )}
        </g>
      ))}
    </>
  );
}

function Arrows({ arrows }: { arrows: PitchArrow[] }) {
  return (
    <>
      {arrows.map((a, i) => {
        const dashed = a.kind === "option";
        const color = a.kind === "cover" ? "rgba(218,75,62,.75)" : a.kind === "run" ? "rgba(127,255,106,.95)" : "rgba(155,178,255,.85)";
        const ang = Math.atan2(a.to.y - a.from.y, a.to.x - a.from.x);
        const ah = dashed ? 8 : 11;
        const tipx1 = a.to.x - Math.cos(ang - 0.4) * ah, tipy1 = a.to.y - Math.sin(ang - 0.4) * ah;
        const tipx2 = a.to.x - Math.cos(ang + 0.4) * ah, tipy2 = a.to.y - Math.sin(ang + 0.4) * ah;
        return (
          <g key={i}>
            <line
              x1={a.from.x} y1={a.from.y} x2={a.to.x} y2={a.to.y}
              stroke={color} strokeWidth={dashed ? 1.3 : 2}
              strokeDasharray={dashed ? "5 4" : undefined}
            />
            <polygon points={`${a.to.x},${a.to.y} ${tipx1},${tipy1} ${tipx2},${tipy2}`} fill={color} />
            {a.label && (
              <text x={(a.from.x + a.to.x) / 2 + 6} y={(a.from.y + a.to.y) / 2} fontFamily="'JetBrains Mono',monospace" fontSize={8.5} fill={color}>
                {a.label}
              </text>
            )}
          </g>
        );
      })}
    </>
  );
}

function Nodes({ nodes }: { nodes: PitchNode[] }) {
  return (
    <>
      {nodes.map((n, i) => {
        const c = TEAM_COLOR[n.team];
        const r = n.r ?? 8;
        return (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={r} fill={c.fill} stroke={c.stroke} strokeWidth={1} />
            {n.question && (
              <text x={n.x + r + 2} y={n.y - r} fontFamily="'JetBrains Mono',monospace" fontSize={10} fontWeight={600} fill="rgba(127,255,106,.9)">
                ?
              </text>
            )}
            {n.label && (
              <text x={n.x} y={n.y + r + 12} textAnchor="middle" fontFamily="'JetBrains Mono',monospace" fontSize={9} fill={n.team === "us" ? "rgba(127,255,106,.9)" : "rgba(218,120,110,.85)"}>
                {n.label}
              </text>
            )}
          </g>
        );
      })}
    </>
  );
}

export default function PitchDiagram({ nodes, arrows, zones, steps, stepLabels }: Props) {
  const [step, setStep] = useState(0);
  const frames = steps && steps.length > 0 ? steps : [{ nodes: nodes ?? [], arrows, zones }];
  const frame = frames[Math.min(step, frames.length - 1)];

  return (
    <div
      className="rounded-lg overflow-hidden"
      style={{ background: "#0a1207", border: "0.5px solid rgba(72,132,58,.4)", padding: 10 }}
    >
      <svg viewBox={`0 0 ${W} ${H}`} style={{ display: "block", width: "100%", height: "auto" }} preserveAspectRatio="xMidYMid meet">
        <Pitch />
        {frame.zones && <Zones zones={frame.zones} />}
        {frame.arrows && <Arrows arrows={frame.arrows} />}
        <Nodes nodes={frame.nodes} />
      </svg>
      {frames.length > 1 && (
        <div className="flex items-center justify-between mt-2.5 px-0.5">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="mono px-3 py-1 rounded-md"
            style={{ fontSize: 9, color: "rgba(220,225,235,.8)", background: "rgba(255,255,255,.06)", border: "0.5px solid rgba(255,255,255,.12)", opacity: step === 0 ? 0.35 : 1 }}
          >
            ← prev
          </button>
          <span className="mono" style={{ fontSize: 9.5, color: "rgba(165,178,255,.9)", letterSpacing: ".1em" }}>
            {stepLabels?.[step] ?? frame.caption ?? `${step + 1} / ${frames.length}`}
          </span>
          <button
            onClick={() => setStep((s) => Math.min(frames.length - 1, s + 1))}
            disabled={step === frames.length - 1}
            className="mono px-3 py-1 rounded-md"
            style={{ fontSize: 9, color: "rgba(220,225,235,.8)", background: "rgba(255,255,255,.06)", border: "0.5px solid rgba(255,255,255,.12)", opacity: step === frames.length - 1 ? 0.35 : 1 }}
          >
            next →
          </button>
        </div>
      )}
    </div>
  );
}
