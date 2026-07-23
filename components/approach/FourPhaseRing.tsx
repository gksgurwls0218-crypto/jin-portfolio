"use client";
import { useState } from "react";

type PhaseId = "a" | "b" | "c" | "d";

const PHASES: { id: PhaseId; name: string; sub: string; pos: string }[] = [
  { id: "a", name: "PLAN A−", sub: "conditioning", pos: "top-2 left-1/2 -translate-x-1/2" },
  { id: "b", name: "PLAN A", sub: "conversion", pos: "top-1/2 right-2 -translate-y-1/2" },
  { id: "c", name: "REST-DEFENCE", sub: "already defending", pos: "bottom-2 left-1/2 -translate-x-1/2" },
  { id: "d", name: "REST-ATTACK", sub: "already positioned", pos: "top-1/2 left-2 -translate-y-1/2" },
];

// ring connections a→b→c→d→a, drawn as quadratic arcs inside a 320×320 box
const ARCS: { path: string; from: PhaseId; to: PhaseId }[] = [
  { path: "M 160 40 A 120 120 0 0 1 280 160", from: "a", to: "b" },
  { path: "M 280 160 A 120 120 0 0 1 160 280", from: "b", to: "c" },
  { path: "M 160 280 A 120 120 0 0 1 40 160", from: "c", to: "d" },
  { path: "M 40 160 A 120 120 0 0 1 160 40", from: "d", to: "a" },
];

export default function FourPhaseRing() {
  const [hovered, setHovered] = useState<PhaseId | null>(null);

  return (
    <div className="relative mx-auto" style={{ width: "min(320px, 86vw)", height: "min(320px, 86vw)" }}>
      {PHASES.map((p) => (
        <div
          key={p.id}
          onMouseEnter={() => setHovered(p.id)}
          onMouseLeave={() => setHovered(null)}
          className={`absolute ${p.pos} rounded-md px-3 py-2 text-center cursor-default z-10 transition-colors duration-150`}
          style={{
            background: hovered === p.id ? "rgba(51,51,47,.16)" : "var(--stage-2)",
            border: hovered === p.id ? "0.5px solid rgba(51,51,47,.55)" : "0.5px solid rgba(51,51,47,.28)",
            minWidth: 108,
          }}
        >
          <p className="mono" style={{ fontSize: 10, color: "var(--green)", letterSpacing: ".08em" }}>{p.name}</p>
          <p className="mono mt-0.5" style={{ fontSize: 8.5, color: "rgba(51,51,47,.65)" }}>{p.sub}</p>
        </div>
      ))}

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full px-4 py-3 text-center"
        style={{ background: "rgba(51,51,47,.12)", border: "0.5px solid rgba(51,51,47,.3)" }}>
        <p className="mono" style={{ fontSize: 9, color: "var(--green)" }}>3-2 / 3-1</p>
        <p className="mono" style={{ fontSize: 7.5, color: "rgba(51,51,47,.6)" }}>core</p>
      </div>

      <svg viewBox="0 0 320 320" className="absolute inset-0 pointer-events-none" style={{ width: "100%", height: "100%" }}>
        {ARCS.map((arc, i) => {
          const active = hovered === arc.from || hovered === arc.to;
          return (
            <path
              key={i}
              d={arc.path}
              fill="none"
              stroke="rgba(35,35,33,.85)"
              strokeWidth={1.4}
              style={{ opacity: active ? 1 : 0.25, transition: "opacity 200ms ease" }}
            />
          );
        })}
      </svg>
    </div>
  );
}
