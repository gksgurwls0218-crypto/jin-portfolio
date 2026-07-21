const COLS = 5;
const ROWS = 3;
const W = 320;
const H = 190;
const cellW = W / COLS;
const cellH = H / ROWS;

function cellCenter(col: number, row: number) {
  return { x: cellW * (col + 0.5), y: cellH * (row + 0.5) };
}

function Grid({ fracture }: { fracture?: { col: number; row: number }[] }) {
  const lines: React.ReactNode[] = [];
  for (let c = 1; c < COLS; c++) {
    const isFractured = fracture?.some((f) => f.col === c || f.col === c - 1);
    lines.push(
      <line
        key={`v${c}`}
        x1={c * cellW} y1={0} x2={c * cellW} y2={H}
        stroke={isFractured ? "rgba(18,161,80,.55)" : "rgba(18,161,80,.22)"}
        strokeWidth={1}
        strokeDasharray={isFractured ? "2 5" : undefined}
        className="transition-all duration-500"
      />
    );
  }
  for (let r = 1; r < ROWS; r++) {
    const isFractured = fracture?.some((f) => f.row === r || f.row === r - 1);
    lines.push(
      <line
        key={`h${r}`}
        x1={0} y1={r * cellH} x2={W} y2={r * cellH}
        stroke={isFractured ? "rgba(18,161,80,.55)" : "rgba(18,161,80,.22)"}
        strokeWidth={1}
        strokeDasharray={isFractured ? "2 5" : undefined}
        className="transition-all duration-500"
      />
    );
  }
  return <>{lines}</>;
}

export default function GridBufferDiagram() {
  // standard: every zone occupied, alternating our/opponent nodes
  const standardNodes = [
    { col: 1, row: 1, team: "opp" },
    { col: 3, row: 1, team: "opp" },
    { col: 1, row: 0, team: "us" },
    { col: 3, row: 2, team: "us" },
    { col: 2, row: 1, team: "us" },
  ] as const;

  const fracture = [{ col: 2, row: 1 }, { col: 3, row: 1 }];
  // mutated: our attacker sits between two zones (col 2/3 boundary), two nearest defenders buffer
  const attacker = { x: cellW * 2.5, y: cellH * 1.5 };
  const defenders = [cellCenter(1, 1), cellCenter(3, 1)];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="group rounded-lg overflow-hidden" style={{ background: "#0a1207", border: "0.5px solid rgba(72,132,58,.35)" }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ display: "block", width: "100%" }}>
          <rect width={W} height={H} fill="#0a1207" />
          <Grid />
          {standardNodes.map((n, i) => {
            const p = cellCenter(n.col, n.row);
            return (
              <circle
                key={i} cx={p.x} cy={p.y} r={7}
                fill={n.team === "us" ? "rgba(34,86,28,.86)" : "rgba(108,30,30,.9)"}
                stroke={n.team === "us" ? "rgba(86,196,70,.7)" : "rgba(218,75,62,.8)"}
                strokeWidth={1}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            );
          })}
        </svg>
        <p className="mono px-3 py-2" style={{ fontSize: 9, color: "rgba(51,51,47,.75)", letterSpacing: ".1em" }}>THE STANDARD — every zone occupied</p>
      </div>

      <div className="group rounded-lg overflow-hidden" style={{ background: "#0a1207", border: "0.5px solid rgba(72,132,58,.35)" }}>
        <svg viewBox={`0 0 ${W} ${H}`} style={{ display: "block", width: "100%" }}>
          <rect width={W} height={H} fill="#0a1207" />
          <Grid fracture={fracture} />
          {defenders.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={7} fill="rgba(108,30,30,.9)" stroke="rgba(218,75,62,.8)" strokeWidth={1} />
              <circle
                cx={p.x} cy={p.y} r={11} fill="none" stroke="rgba(127,255,106,0)"
                strokeWidth={1.2} className="transition-all duration-300 group-hover:stroke-[rgba(127,255,106,.65)]"
              />
              <text
                x={p.x + 12} y={p.y - 9} fontFamily="'JetBrains Mono',monospace" fontSize={11} fontWeight={700}
                fill="rgba(127,255,106,0)" className="transition-all duration-300 group-hover:fill-[rgba(127,255,106,.92)]"
              >
                ?
              </text>
            </g>
          ))}
          <circle cx={attacker.x} cy={attacker.y} r={8} fill="rgba(34,86,28,.86)" stroke="rgba(86,196,70,.9)" strokeWidth={1.3} />
        </svg>
        <p className="mono px-3 py-2" style={{ fontSize: 9, color: "rgba(51,51,47,.75)", letterSpacing: ".1em" }}>THE BUFFER — hover to see the fracture</p>
      </div>
    </div>
  );
}
