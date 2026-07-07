"use client";
import { useState } from "react";

type Level = "high" | "low" | "mixed";

const COLUMNS = ["Variation team (target)", "Spain 2014", "Sarri's Juventus"];

const ROWS: { metric: string; cells: { level: Level; note: string }[] }[] = [
  {
    metric: "Pass-network dispersion",
    cells: [
      { level: "high", note: "Betweenness spread across the build-up core — no single erasable node." },
      { level: "low", note: "Route to goal predictable; the plan did not need to be dispersed to work — until it stopped working." },
      { level: "low", note: "Progression concentrated through Pjanić — one node carried the entire build-up." },
    ],
  },
  {
    metric: "Timing variance of high-value actions",
    cells: [
      { level: "high", note: "Threat spikes arrive at irregular, unlearnable moments." },
      { level: "low", note: "Flank, then centre, always in that order — a rhythm Van Gaal's 5-3-2 solved before kick-off." },
      { level: "low", note: "A settled tempo any opponent could set a clock to." },
    ],
  },
  {
    metric: "Line-break conversion",
    cells: [
      { level: "high", note: "Defensive-line breaks become final-third receptions, not isolated events." },
      { level: "low", note: "Breaks rarely converted once the pattern was known." },
      { level: "mixed", note: "Fine while Pjanić was live; erasable by design." },
    ],
  },
  {
    metric: "Channel & recipient entropy",
    cells: [
      { level: "high", note: "Opponent cannot predict where, or through whom, the threat arrives." },
      { level: "low", note: "Same channel, same runners, every time." },
      { level: "low", note: "Same channel through the same pivot, every time." },
    ],
  },
  {
    metric: "Reverse-PPDA (opponent's press on us)",
    cells: [
      { level: "high", note: "Opponent pressing intensity drops as the match progresses — conditioning visible in their behaviour." },
      { level: "low", note: "Opponents kept pressing at full intensity — the script never stopped being worth defending against." },
      { level: "low", note: "Opponents pressed the single node, not the system — cheap to press, cheap to solve." },
    ],
  },
];

const LEVEL_STYLE: Record<Level, { bg: string; border: string; color: string; label: string }> = {
  high: { bg: "rgba(127,255,106,.1)", border: "rgba(127,255,106,.4)", color: "rgba(160,230,150,.95)", label: "HIGH" },
  low: { bg: "rgba(232,83,106,.08)", border: "rgba(232,83,106,.3)", color: "rgba(230,150,155,.9)", label: "LOW" },
  mixed: { bg: "rgba(255,155,70,.08)", border: "rgba(255,155,70,.3)", color: "rgba(230,190,150,.9)", label: "MIXED" },
};

export default function KpiFingerprint() {
  const [col, setCol] = useState<number | null>(null);

  return (
    <div className="rounded-lg overflow-x-auto" style={{ background: "rgba(255,255,255,.02)", border: "0.5px solid rgba(120,150,255,.2)" }}>
      <table className="w-full" style={{ borderCollapse: "collapse", fontSize: 11, minWidth: 560 }}>
        <thead>
          <tr>
            <th className="text-left" style={{ padding: "10px 12px", fontSize: 9, letterSpacing: ".1em", color: "rgba(255,255,255,.45)", borderBottom: "0.5px solid rgba(255,255,255,.14)" }}>METRIC</th>
            {COLUMNS.map((c, i) => (
              <th
                key={c}
                onMouseEnter={() => setCol(i)}
                onMouseLeave={() => setCol(null)}
                className="text-left cursor-default"
                style={{
                  padding: "10px 12px", fontSize: 9, letterSpacing: ".08em",
                  color: col === i ? "rgba(200,215,255,.98)" : "rgba(255,255,255,.5)",
                  borderBottom: "0.5px solid rgba(255,255,255,.14)",
                  background: col === i ? "rgba(80,115,255,.08)" : "transparent",
                }}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.metric}>
              <td style={{ padding: "10px 12px", color: "rgba(222,224,230,.85)", borderBottom: "0.5px solid rgba(255,255,255,.06)" }}>{row.metric}</td>
              {row.cells.map((cell, i) => {
                const s = LEVEL_STYLE[cell.level];
                return (
                  <td
                    key={i}
                    title={cell.note}
                    onMouseEnter={() => setCol(i)}
                    onMouseLeave={() => setCol(null)}
                    style={{ padding: "10px 12px", borderBottom: "0.5px solid rgba(255,255,255,.06)", background: col === i ? "rgba(80,115,255,.05)" : "transparent" }}
                  >
                    <span className="mono px-2 py-0.5 rounded" style={{ fontSize: 9, background: s.bg, border: `0.5px solid ${s.border}`, color: s.color }}>
                      {s.label}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mono px-3 py-2.5" style={{ fontSize: 9, color: "rgba(150,175,255,.6)" }}>hover a column or cell for the reading · sourced qualitatively from public match record, not raw event data</p>
    </div>
  );
}
