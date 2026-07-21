const W = 680;
const H = 300;

export default function PreHalfSpaceMap() {
  return (
    <div className="group rounded-lg overflow-hidden" style={{ background: "#0a1207", border: "0.5px solid rgba(72,132,58,.4)" }}>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ display: "block", width: "100%" }}>
        <rect width={W} height={H} fill="#0a1207" />
        <rect x={40} y={14} width={600} height={272} fill="none" stroke="rgba(72,132,58,.55)" strokeWidth={1} />
        <line x1={340} y1={14} x2={340} y2={286} stroke="rgba(72,132,58,.55)" strokeWidth={1} />
        <rect x={524} y={86} width={116} height={128} fill="none" stroke="rgba(72,132,58,.55)" strokeWidth={1} />

        {/* pre-half space corridors, both flanks */}
        <rect x={360} y={40} width={110} height={60} rx={8} fill="rgba(120,150,255,.13)" stroke="rgba(140,165,255,.55)" strokeWidth={1} strokeDasharray="3 4" />
        <rect x={360} y={196} width={110} height={60} rx={8} fill="rgba(120,150,255,.13)" stroke="rgba(140,165,255,.55)" strokeWidth={1} strokeDasharray="3 4" />
        <text x={368} y={248} fontFamily="'JetBrains Mono',monospace" fontSize={8.5} fill="rgba(165,178,255,.9)">PRE-HALF SPACE</text>

        {/* defenders mid-slide */}
        <circle cx={500} cy={160} r={8} fill="rgba(108,30,30,.9)" stroke="rgba(218,75,62,.8)" strokeWidth={1} />
        <circle cx={512} cy={215} r={8} fill="rgba(108,30,30,.9)" stroke="rgba(218,75,62,.8)" strokeWidth={1} />
        <line
          x1={505} y1={168} x2={497} y2={184} stroke="rgba(218,75,62,.7)" strokeWidth={1.2}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ transitionDelay: "150ms" }}
        />

        {/* player */}
        <circle cx={415} cy={225} r={9} fill="rgba(34,86,28,.86)" stroke="rgba(127,255,106,.9)" strokeWidth={1.3} />

        {/* 1: pass into half-space (dashed, draws on hover) */}
        <line
          x1={424} y1={220} x2={492} y2={188} stroke="rgba(155,178,255,.85)" strokeWidth={1.3} strokeDasharray="5 4"
          pathLength={1}
          style={{ strokeDasharray: "1", strokeDashoffset: 1, transition: "stroke-dashoffset 400ms ease" }}
          className="group-hover:[stroke-dashoffset:0]"
        />
        <text x={452} y={196} fontFamily="'JetBrains Mono',monospace" fontSize={8.5} fill="rgba(155,178,255,.9)">1 KEY PASS</text>

        {/* 2: second movement run to arc — delayed, solid */}
        <path
          d="M424 218 Q470 190 528 152" fill="none" stroke="rgba(127,255,106,.95)" strokeWidth={2}
          pathLength={1}
          style={{ strokeDasharray: "1", strokeDashoffset: 1, transition: "stroke-dashoffset 450ms ease 350ms" }}
          className="group-hover:[stroke-dashoffset:0]"
        />
        <polygon
          points="528,152 517,153 522,162" fill="rgba(127,255,106,.95)"
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ transitionDelay: "750ms" }}
        />
        <text x={472} y={166} fontFamily="'JetBrains Mono',monospace" fontSize={8.5} fill="rgba(127,255,106,.95)">2 SECOND MOVEMENT</text>
      </svg>
      <p className="mono px-3 py-2" style={{ fontSize: 9, color: "rgba(51,51,47,.75)", letterSpacing: ".1em" }}>
        hover to play the second-movement sequence
      </p>
    </div>
  );
}
