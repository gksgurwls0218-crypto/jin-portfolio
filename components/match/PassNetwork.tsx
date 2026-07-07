export type PassNode = { label: string; x: number; y: number; centrality: number };
export type PassEdge = { from: number; to: number; count: number };

type Props = {
  title: string;
  nodes: PassNode[];
  edges: PassEdge[];
  caption: string;
  width?: number;
  height?: number;
};

export default function PassNetwork({ title, nodes, edges, caption, width = 320, height = 220 }: Props) {
  const maxCount = Math.max(...edges.map((e) => e.count), 1);
  return (
    <div className="rounded-lg p-3.5" style={{ background: "rgba(0,0,0,.25)", border: "0.5px solid rgba(255,145,60,.18)" }}>
      <p className="mono mb-2" style={{ fontSize: 9, letterSpacing: ".14em", color: "rgba(255,190,115,.75)" }}>{title}</p>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ display: "block", width: "100%" }}>
        <rect width={width} height={height} fill="#0a1207" rx={8} />
        {edges.map((e, i) => {
          const a = nodes[e.from], b = nodes[e.to];
          return (
            <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(255,172,88,.5)" strokeWidth={0.6 + (e.count / maxCount) * 3.5} />
          );
        })}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={5 + n.centrality * 14} fill="rgba(255,155,70,.22)" stroke="rgba(255,190,115,.85)" strokeWidth={1} />
            <text x={n.x} y={n.y + 3} textAnchor="middle" fontFamily="'JetBrains Mono',monospace" fontSize={8} fill="rgba(255,220,180,.95)">{n.label}</text>
          </g>
        ))}
      </svg>
      <p className="mt-2" style={{ fontSize: 11.5, color: "rgba(220,210,195,.7)" }}>{caption}</p>
    </div>
  );
}
