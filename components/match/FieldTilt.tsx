type Props = {
  value: number; // home share, 0-100
  homeLabel: string;
  awayLabel: string;
  est?: boolean;
};

export default function FieldTilt({ value, homeLabel, awayLabel, est }: Props) {
  return (
    <div className="rounded-lg p-3.5" style={{ background: "rgba(20,24,26,0.94)", border: "0.5px solid rgba(51,51,47,0.35)" }}>
      <p className="mono mb-2" style={{ fontSize: 9, letterSpacing: ".14em", color: "var(--green-bright)" }}>
        FIELD TILT · FINAL-THIRD TOUCH SHARE{est && " est."}
      </p>
      <div className="flex" style={{ height: 14, borderRadius: 7, overflow: "hidden", border: "0.5px solid rgba(255,255,255,.15)" }}>
        <div style={{ width: `${value}%`, background: "rgba(51,51,47,.75)" }} />
        <div style={{ width: `${100 - value}%`, background: "rgba(120,120,120,.4)" }} />
      </div>
      <div className="flex justify-between mono mt-1.5" style={{ fontSize: 9, color: "rgba(230,220,205,.7)" }}>
        <span>{homeLabel} {value}%</span>
        <span>{awayLabel} {100 - value}%</span>
      </div>
    </div>
  );
}
