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

// Differentiated by weight, not hue: HIGH is the bold/bright accent read, LOW is
// pushed to a quiet neutral, MIXED sits in between — one accent colour, three weights.
const LEVEL_STYLE: Record<Level, { bg: string; border: string; color: string; label: string; weight: number }> = {
  high: { bg: "var(--green-soft)", border: "rgba(51,51,47,.45)", color: "var(--green)", label: "HIGH", weight: 700 },
  low: { bg: "transparent", border: "var(--edge-2)", color: "var(--ink-3)", label: "LOW", weight: 400 },
  mixed: { bg: "rgba(51,51,47,.05)", border: "var(--green-line)", color: "rgba(35,35,33,.75)", label: "MIXED", weight: 500 },
};

export default function KpiFingerprint() {
  const [col, setCol] = useState<number | null>(null);

  return (
    <div className="rounded-lg overflow-x-auto" style={{ background: "var(--stage-2)", border: "0.5px solid var(--green-line)" }}>
      <table className="w-full" style={{ borderCollapse: "collapse", fontSize: 11, minWidth: 560 }}>
        <thead>
          <tr>
            <th className="text-left" style={{ padding: "10px 12px", fontSize: 9, letterSpacing: ".1em", color: "var(--ink-3)", borderBottom: "0.5px solid var(--edge)" }}>METRIC</th>
            {COLUMNS.map((c, i) => (
              <th
                key={c}
                onMouseEnter={() => setCol(i)}
                onMouseLeave={() => setCol(null)}
                className="text-left cursor-default"
                style={{
                  padding: "10px 12px", fontSize: 9, letterSpacing: ".08em",
                  color: col === i ? "var(--green)" : "var(--ink-3)",
                  borderBottom: "0.5px solid var(--edge)",
                  background: col === i ? "var(--green-soft)" : "transparent",
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
              <td style={{ padding: "10px 12px", color: "var(--ink-2)", borderBottom: "0.5px solid var(--edge)" }}>{row.metric}</td>
              {row.cells.map((cell, i) => {
                const s = LEVEL_STYLE[cell.level];
                return (
                  <td
                    key={i}
                    title={cell.note}
                    onMouseEnter={() => setCol(i)}
                    onMouseLeave={() => setCol(null)}
                    style={{ padding: "10px 12px", borderBottom: "0.5px solid var(--edge)", background: col === i ? "var(--green-soft)" : "transparent" }}
                  >
                    <span className="mono px-2 py-0.5 rounded" style={{ fontSize: 9, fontWeight: s.weight, background: s.bg, border: `0.5px solid ${s.border}`, color: s.color }}>
                      {s.label}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mono px-3 py-2.5" style={{ fontSize: 9, color: "var(--green-mid)" }}>hover a column or cell for the reading · sourced qualitatively from public match record, not raw event data</p>
    </div>
  );
}
