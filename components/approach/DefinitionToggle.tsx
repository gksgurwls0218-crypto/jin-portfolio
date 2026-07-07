"use client";
import { useState } from "react";

const W = 300;
const H = 190;
const HOME = { x: 150, y: 95 };
const MUTATED = { x: 220, y: 55 };
const OPTIONS = [
  { x: 90, y: 55, lbl: "a" },
  { x: 150, y: 35, lbl: "b" },
  { x: 210, y: 60, lbl: "c" },
];
const DEFENDER = { x: 150, y: 150 };
const DEFENDER2 = { x: 255, y: 110 };

export default function DefinitionToggle() {
  const [mode, setMode] = useState<"variable" | "mutation">("variable");
  const isVar = mode === "variable";
  const node = isVar ? HOME : MUTATED;

  return (
    <div className="rounded-lg overflow-hidden" style={{ background: "#0a1207", border: "0.5px solid rgba(72,132,58,.35)" }}>
      <div className="flex gap-1 p-2.5" style={{ borderBottom: "0.5px solid rgba(72,132,58,.25)" }}>
        {(["variable", "mutation"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className="mono px-3 py-1.5 rounded-md transition-colors duration-150"
            style={{
              fontSize: 9.5,
              letterSpacing: ".12em",
              color: mode === m ? "rgba(185,205,255,.96)" : "rgba(255,255,255,.45)",
              background: mode === m ? "rgba(80,115,255,.2)" : "transparent",
              border: mode === m ? "0.5px solid rgba(120,155,255,.4)" : "0.5px solid transparent",
            }}
          >
            {m.toUpperCase()}
          </button>
        ))}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} style={{ display: "block", width: "100%" }}>
        <rect width={W} height={H} fill="#0a1207" />

        {/* defender(s) */}
        <circle cx={DEFENDER.x} cy={DEFENDER.y} r={8} fill="rgba(108,30,30,.9)" stroke="rgba(218,75,62,.8)" strokeWidth={1} />
        {!isVar && (
          <text x={DEFENDER.x + 11} y={DEFENDER.y - 8} fontFamily="'JetBrains Mono',monospace" fontSize={11} fontWeight={700} fill="rgba(127,255,106,.92)">?</text>
        )}
        {!isVar && (
          <>
            <circle cx={DEFENDER2.x} cy={DEFENDER2.y} r={8} fill="rgba(108,30,30,.9)" stroke="rgba(218,75,62,.8)" strokeWidth={1} />
            <text x={DEFENDER2.x + 11} y={DEFENDER2.y - 8} fontFamily="'JetBrains Mono',monospace" fontSize={11} fontWeight={700} fill="rgba(127,255,106,.92)">?</text>
          </>
        )}

        {/* dashed option arrows only in variable state */}
        {isVar && OPTIONS.map((o, i) => (
          <g key={i}>
            <line x1={HOME.x} y1={HOME.y} x2={o.x} y2={o.y} stroke="rgba(155,178,255,.75)" strokeWidth={1.2} strokeDasharray="4 4" />
            <text x={o.x} y={o.y - 6} textAnchor="middle" fontFamily="'JetBrains Mono',monospace" fontSize={10} fill="rgba(155,178,255,.85)">{o.lbl}</text>
          </g>
        ))}

        {/* ripple on mutation arrival */}
        {!isVar && (
          <circle cx={node.x} cy={node.y} r={8} fill="none" stroke="rgba(127,255,106,.6)" strokeWidth={1.5}>
            <animate attributeName="r" values="8;22" dur="0.9s" begin="0s" fill="freeze" />
            <animate attributeName="opacity" values="0.8;0" dur="0.9s" begin="0s" fill="freeze" />
          </circle>
        )}

        {/* the node itself — glides via CSS transition on cx/cy */}
        <circle
          cx={node.x} cy={node.y} r={9}
          fill="rgba(34,86,28,.86)" stroke="rgba(86,196,70,.9)" strokeWidth={1.3}
          style={{ transition: "cx 550ms cubic-bezier(.4,0,.2,1), cy 550ms cubic-bezier(.4,0,.2,1)" }}
        />
      </svg>

      <p className="mono px-3 py-2.5" style={{ fontSize: 10.5, color: "rgba(190,200,230,.8)" }}>
        {isVar ? "the choice is not yet made" : "the structure changed identity — who is supposed to be dealing with this at all?"}
      </p>
    </div>
  );
}
