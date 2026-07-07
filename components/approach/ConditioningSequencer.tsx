"use client";
import { useState } from "react";

type StepId = "CYCLE1" | "CYCLE2" | "CYCLE3" | "SHOCK" | "RECURSION";

const STEPS: { id: StepId; label: string; xt: number }[] = [
  { id: "CYCLE1", label: "CYCLE 1", xt: 0.11 },
  { id: "CYCLE2", label: "CYCLE 2", xt: 0.13 },
  { id: "CYCLE3", label: "CYCLE 3", xt: 0.09 },
  { id: "SHOCK", label: "SHOCK", xt: 0.86 },
  { id: "RECURSION", label: "RECURSION", xt: 0.62 },
];

const W = 620, H = 280;
// build-up shape: back 3 + double pivot + front 3, attacking left → right
const OUR: Record<string, { x: number; y: number }> = {
  gk: { x: 46, y: 140 },
  cb1: { x: 130, y: 80 }, cb2: { x: 130, y: 140 }, cb3: { x: 130, y: 200 },
  piv1: { x: 210, y: 110 }, piv2: { x: 210, y: 170 },
  wF: { x: 420, y: 60 },   // right flank forward — the repeated Plan A− route
  st: { x: 460, y: 140 },
  wL: { x: 300, y: 220 },  // left channel — the vacated space
};
const OPP: { x: number; y: number }[] = [
  { x: 470, y: 40 }, { x: 480, y: 100 }, { x: 480, y: 160 }, { x: 470, y: 220 },
  { x: 380, y: 90 }, { x: 380, y: 190 },
];

const RIGHT_HEAT = { cx: 430, cy: 90, rx: 90, ry: 55 };

export default function ConditioningSequencer() {
  const [idx, setIdx] = useState(0);
  const step = STEPS[idx];
  // buffering tag fades out ~1.5s after arrival via CSS animation (see style tag below);
  // key={step.id} below forces the animation to restart each time SHOCK is (re)selected
  const showBuffering = step.id === "SHOCK";

  const cycleDepth = step.id === "CYCLE1" ? 0.18 : step.id === "CYCLE2" ? 0.34 : step.id === "CYCLE3" ? 0.52 : step.id === "SHOCK" || step.id === "RECURSION" ? 0.6 : 0;
  const isShock = step.id === "SHOCK";
  const isRecursion = step.id === "RECURSION";

  return (
    <div className="rounded-lg overflow-hidden" style={{ background: "#0a1207", border: "0.5px solid rgba(72,132,58,.4)" }}>
      <div className="flex gap-1 p-2.5 flex-wrap" style={{ borderBottom: "0.5px solid rgba(72,132,58,.25)" }}>
        {STEPS.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setIdx(i)}
            className="mono px-2.5 py-1.5 rounded-md transition-colors duration-150"
            style={{
              fontSize: 9,
              letterSpacing: ".08em",
              color: idx === i ? "rgba(185,205,255,.96)" : "rgba(255,255,255,.45)",
              background: idx === i ? "rgba(80,115,255,.2)" : "transparent",
              border: idx === i ? "0.5px solid rgba(120,155,255,.4)" : "0.5px solid transparent",
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} style={{ display: "block", width: "100%" }}>
        <rect width={W} height={H} fill="#0a1207" />
        <rect x={20} y={12} width={W - 40} height={H - 24} fill="none" stroke="rgba(72,132,58,.5)" strokeWidth={1} />

        {/* opponent expectation heat — deepens each cycle, still visible (stale) through shock/recursion */}
        {cycleDepth > 0 && (
          <ellipse
            cx={RIGHT_HEAT.cx} cy={RIGHT_HEAT.cy} rx={RIGHT_HEAT.rx} ry={RIGHT_HEAT.ry}
            fill={`rgba(218,75,62,${cycleDepth * 0.35})`}
            stroke={`rgba(218,75,62,${cycleDepth * 0.6})`}
            strokeWidth={1}
            style={{ transition: "all 500ms ease" }}
          />
        )}
        {cycleDepth > 0.3 && (
          <text x={RIGHT_HEAT.cx} y={RIGHT_HEAT.cy - RIGHT_HEAT.ry - 8} textAnchor="middle" fontFamily="'JetBrains Mono',monospace" fontSize={8.5} fill="rgba(230,150,140,.8)">
            OPPONENT EXPECTATION
          </text>
        )}

        {/* vacated left channel glow — appears at SHOCK */}
        {(isShock || isRecursion) && (
          <ellipse cx={300} cy={220} rx={70} ry={40} fill="rgba(127,255,106,.1)" stroke="rgba(127,255,106,.4)" strokeWidth={1} strokeDasharray="3 4" />
        )}

        {OPP.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={7.5} fill="rgba(108,30,30,.9)" stroke="rgba(218,75,62,.8)" strokeWidth={1} />
            {showBuffering && (
              <text
                key={step.id}
                x={p.x + 10} y={p.y - 8} fontFamily="'JetBrains Mono',monospace" fontSize={9} fontWeight={700} fill="rgba(127,255,106,.92)"
                style={{ animation: "bufferFade 1.5s ease forwards" }}
              >
                ?
              </text>
            )}
          </g>
        ))}

        {Object.entries(OUR).map(([key, p]) => (
          <circle key={key} cx={p.x} cy={p.y} r={key === "gk" ? 7 : 8} fill="rgba(34,86,28,.86)" stroke="rgba(86,196,70,.85)" strokeWidth={1.2} />
        ))}

        {/* route: cycles 1-3 always attack the right flank */}
        {!isShock && (
          <path d={`M ${OUR.piv1.x} ${OUR.piv1.y} Q ${OUR.wF.x - 60} ${OUR.wF.y + 10} ${OUR.wF.x} ${OUR.wF.y} T ${OUR.st.x} ${OUR.st.y}`}
            fill="none" stroke="rgba(155,178,255,.8)" strokeWidth={1.6} strokeDasharray={isRecursion ? undefined : "5 4"} />
        )}

        {/* shock: ball breaks left, through the vacated space */}
        {isShock && (
          <>
            <path d={`M ${OUR.piv2.x} ${OUR.piv2.y} Q ${OUR.wL.x - 40} ${OUR.wL.y + 20} ${OUR.wL.x} ${OUR.wL.y}`}
              fill="none" stroke="rgba(127,255,106,.95)" strokeWidth={2.2} />
            <polygon points={`${OUR.wL.x},${OUR.wL.y} ${OUR.wL.x - 12},${OUR.wL.y - 6} ${OUR.wL.x - 4},${OUR.wL.y + 10}`} fill="rgba(127,255,106,.95)" />
            <text x={OUR.wL.x + 10} y={OUR.wL.y + 4} fontFamily="'JetBrains Mono',monospace" fontSize={9} fill="rgba(127,255,106,.95)">SHOCK</text>
          </>
        )}

        {/* recursion: shot-fake → key pass, small scale near the box */}
        {isRecursion && (
          <>
            <line x1={OUR.st.x - 20} y1={OUR.st.y} x2={OUR.st.x + 30} y2={OUR.st.y - 10} stroke="rgba(255,155,70,.8)" strokeWidth={1.4} strokeDasharray="3 3" />
            <text x={OUR.st.x + 32} y={OUR.st.y - 14} fontFamily="'JetBrains Mono',monospace" fontSize={8} fill="rgba(255,190,115,.9)">SHOT-FAKE</text>
            <path d={`M ${OUR.st.x} ${OUR.st.y} Q ${OUR.st.x + 40} ${OUR.st.y + 40} ${OUR.wL.x + 60} ${OUR.wL.y}`} fill="none" stroke="rgba(127,255,106,.9)" strokeWidth={1.8} />
            <text x={OUR.st.x + 10} y={OUR.st.y + 30} fontFamily="'JetBrains Mono',monospace" fontSize={8} fill="rgba(127,255,106,.9)">KEY PASS</text>
          </>
        )}
      </svg>

      <div className="px-3 py-2.5" style={{ borderTop: "0.5px solid rgba(72,132,58,.25)" }}>
        <p className="mono mb-1.5" style={{ fontSize: 9, color: "rgba(150,175,255,.6)", letterSpacing: ".1em" }}>ROLLING xT</p>
        <svg viewBox="0 0 300 40" style={{ display: "block", width: "100%", height: 40 }}>
          <polyline
            points={STEPS.map((s, i) => `${(i / (STEPS.length - 1)) * 290 + 5},${36 - s.xt * 34}`).join(" ")}
            fill="none" stroke="rgba(255,172,88,.85)" strokeWidth={1.6}
          />
          {STEPS.map((s, i) => (
            <circle
              key={s.id}
              cx={(i / (STEPS.length - 1)) * 290 + 5}
              cy={36 - s.xt * 34}
              r={idx === i ? 3.5 : 2}
              fill={idx === i ? "rgba(255,215,120,.98)" : "rgba(255,172,88,.6)"}
            />
          ))}
        </svg>
      </div>
      <style>{`@keyframes bufferFade{0%{opacity:1}70%{opacity:1}100%{opacity:0}}`}</style>
    </div>
  );
}
