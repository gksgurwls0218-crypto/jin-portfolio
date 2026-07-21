"use client";
import { useState, useEffect } from "react";

export type ShapeNode = { x: number; y: number; label?: string };
export type ShapeLane = { from: number; to: number };
export type Shape = { label: string; nodes: ShapeNode[]; lanes?: ShapeLane[]; caption?: string };

type Props = {
  shapes: Shape[];
  opponentNodes?: ShapeNode[];
  width?: number;
  height?: number;
};

export default function ShapeMorph({ shapes, opponentNodes, width = 620, height = 300 }: Props) {
  const [idx, setIdx] = useState(0);
  // lanes reveal ~650ms after the morph tween starts; tracking which idx has
  // "arrived" (rather than a plain boolean) avoids a synchronous setState-on-mount
  const [revealedIdx, setRevealedIdx] = useState<number | null>(null);
  const shape = shapes[idx];
  const showLanes = revealedIdx === idx;

  useEffect(() => {
    const t = setTimeout(() => setRevealedIdx(idx), 650);
    return () => clearTimeout(t);
  }, [idx]);

  return (
    <div className="rounded-lg overflow-hidden" style={{ background: "#0a1207", border: "0.5px solid rgba(72,132,58,.4)" }}>
      <div className="flex gap-1 p-2.5 flex-wrap" style={{ borderBottom: "0.5px solid rgba(72,132,58,.25)" }}>
        {shapes.map((s, i) => (
          <button
            key={s.label}
            onClick={() => setIdx(i)}
            className="mono px-3 py-1.5 rounded-md transition-colors duration-150"
            style={{
              fontSize: 9.5,
              letterSpacing: ".1em",
              color: idx === i ? "rgba(255,255,255,.96)" : "rgba(255,255,255,.45)",
              background: idx === i ? "rgba(51,51,47,.22)" : "transparent",
              border: idx === i ? "0.5px solid rgba(51,51,47,.45)" : "0.5px solid transparent",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} style={{ display: "block", width: "100%" }}>
        <rect width={width} height={height} fill="#0a1207" />
        <rect x={20} y={12} width={width - 40} height={height - 24} fill="none" stroke="rgba(72,132,58,.5)" strokeWidth={1} />

        {opponentNodes?.map((n, i) => (
          <circle key={`opp${i}`} cx={n.x} cy={n.y} r={7.5} fill="rgba(108,30,30,.9)" stroke="rgba(218,75,62,.8)" strokeWidth={1} />
        ))}

        {showLanes && shape.lanes?.map((l, i) => {
          const a = shape.nodes[l.from], b = shape.nodes[l.to];
          if (!a || !b) return null;
          return (
            <line
              key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke="rgba(127,255,106,.55)" strokeWidth={1} strokeDasharray="4 4"
              style={{ transition: "opacity 400ms ease" }}
            />
          );
        })}

        {shape.nodes.map((n, i) => (
          <circle
            key={i} cx={n.x} cy={n.y} r={8}
            fill="rgba(34,86,28,.86)" stroke="rgba(86,196,70,.85)" strokeWidth={1.2}
            style={{ transition: "cx 600ms cubic-bezier(.4,0,.2,1), cy 600ms cubic-bezier(.4,0,.2,1)" }}
          />
        ))}
      </svg>

      {shape.caption && (
        <p className="mono px-3 py-2.5" style={{ fontSize: 10.5, color: "rgba(190,200,230,.8)" }}>{shape.caption}</p>
      )}
    </div>
  );
}
