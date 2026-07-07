const QUADRANTS = [
  { when: "static", where: "straight", tag: "absorbed", desc: "No timing edge, no angle edge — the pass is defended before it arrives.", glow: false },
  { when: "static", where: "diagonal", tag: "chase", desc: "The angle asks two questions, but a set defender has time to answer both.", glow: false },
  { when: "in motion", where: "straight", tag: "duel", desc: "Momentum is committed, but a straight ball asks only one question — contestable.", glow: false },
  { when: "in motion", where: "diagonal", tag: "buffering", desc: "Momentum cannot reverse and the angle asks two questions at once. The engines multiply.", glow: true },
];

export default function WhenWhereMatrix() {
  return (
    <div className="rounded-lg p-4" style={{ background: "rgba(255,255,255,.025)", border: "0.5px solid rgba(120,150,255,.2)" }}>
      <div className="grid grid-cols-2 gap-2">
        {QUADRANTS.map((q, i) => (
          <div
            key={i}
            className="group rounded-md p-3.5 transition-all duration-200 cursor-default"
            style={{
              background: q.glow ? "rgba(127,255,106,.08)" : "rgba(255,255,255,.03)",
              border: q.glow ? "0.5px solid rgba(127,255,106,.4)" : "0.5px solid rgba(255,255,255,.08)",
            }}
          >
            <p className="mono mb-1" style={{ fontSize: 9, letterSpacing: ".1em", color: "rgba(150,175,255,.75)" }}>
              {q.when.toUpperCase()} × {q.where.toUpperCase()}
            </p>
            <p className="mono mb-1.5" style={{ fontSize: 12, color: q.glow ? "rgba(127,255,106,.95)" : "rgba(200,205,215,.55)" }}>
              [{q.tag}]
            </p>
            <p
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ fontSize: 11, lineHeight: 1.6, color: "rgba(210,215,228,.8)" }}
            >
              {q.desc}
            </p>
          </div>
        ))}
      </div>
      <p className="mono mt-3" style={{ fontSize: 9, color: "rgba(150,175,255,.6)" }}>WHEN (static ↔ in motion) × WHERE (straight ↔ diagonal)</p>
    </div>
  );
}
