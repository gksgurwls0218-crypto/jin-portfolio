/* JWC — Jin's Win Contribution. The four figures used on the KPI Lab's
   win-contribution page.

   These render inside KpiDetail's SketchFrame, whose card background is the
   dark var(--ink) token, so everything here is drawn in the same on-dark
   monochrome language as EssayVisuals: emphasis is carried by weight and
   opacity, never by a new hue.

   Every number below is measured, not illustrative. Sources: StatsBomb open
   data — men 1,946 matches / 5,127 goals, women 1,310 matches (independent
   reproduction), team-match n = 3,881, player-match n = 9,758. Method, the
   corrections that changed two of these signs, and the open limitations are
   written up in wiki/synthesis/jwc_architecture.md and
   wiki/theory/measurement_counterpress_final.md. */

import type { ComponentType, ReactNode } from "react";

// ---------- on-dark palette (mirrors EssayVisuals' D_* constants) ----------
const T1 = "rgba(255,255,255,.94)";
const T2 = "rgba(255,255,255,.72)";
const T3 = "rgba(255,255,255,.58)";
const T4 = "rgba(255,255,255,.40)";
const E1 = "rgba(255,255,255,.14)";
const E2 = "rgba(255,255,255,.24)";
const DIM = "rgba(255,255,255,.26)";
const DIM2 = "rgba(255,255,255,.44)";
const CARD = "rgba(255,255,255,.045)";
const PITCH_LINE = "rgba(13,18,20,.5)";
const PITCH_GRID = "rgba(13,18,20,.55)";

const W = 700;

function Frame({ h, label, children }: { h: number; label: string; children: ReactNode }) {
  return (
    <svg viewBox={`0 0 ${W} ${h}`} style={{ display: "block", width: "100%", height: "auto" }} role="img" aria-label={label}>
      {children}
    </svg>
  );
}

/* ══════════ 1 · set-piece rank flip ══════════ */

type SlopeLabels = {
  aria: string; left: string; right: string; unit: string;
  pos: string[];               // in the fixed order below
  rank: (n: number) => string;
  callout: string;
};

// order: FW, W, AM, WM, CM, DM, FB, CB — the eight starting-position buckets
const SLOPE_OPEN = [313.2, 189.0, 180.0, 135.5, 75.9, 31.5, 24.3, 13.6];
const SLOPE_SET = [32.1, 20.1, 25.3, 14.6, 14.2, 14.9, 7.2, 26.8];
const CB_INDEX = 7;

function Slope({ L: LB }: { L: SlopeLabels }) {
  const idx = SLOPE_OPEN.map((_, i) => i);
  const ro = [...idx].sort((a, b) => SLOPE_OPEN[b] - SLOPE_OPEN[a]);
  const rs = [...idx].sort((a, b) => SLOPE_SET[b] - SLOPE_SET[a]);
  const L = 150, R = 150, T = 62, H = 424, B = 26, ih = H - T - B, step = ih / 7;
  const yA = T + ro.indexOf(CB_INDEX) * step;
  const yB = T + rs.indexOf(CB_INDEX) * step;
  const my = (yA + yB) / 2;
  return (
    <Frame h={H} label={LB.aria}>
      <text x={L - 12} y={T - 40} fontSize="12.5" fill={T1} fontWeight="700" textAnchor="end">{LB.left}</text>
      <text x={W - R + 12} y={T - 40} fontSize="12.5" fill={T1} fontWeight="700">{LB.right}</text>
      <text x={L - 12} y={T - 23} fontSize="10" fill={T4} textAnchor="end">{LB.unit}</text>
      <text x={W - R + 12} y={T - 23} fontSize="10" fill={T4}>{LB.unit}</text>
      <line x1={L} y1={T - 10} x2={L} y2={T + ih + 10} stroke={E1} strokeWidth="1" />
      <line x1={W - R} y1={T - 10} x2={W - R} y2={T + ih + 10} stroke={E1} strokeWidth="1" />
      {idx.map((k) => {
        const i = ro.indexOf(k), j = rs.indexOf(k);
        const y1 = T + i * step, y2 = T + j * step, hi = k === CB_INDEX;
        const col = hi ? T1 : DIM;
        return (
          <g key={k}>
            <path d={`M${L} ${y1} C${L + 96} ${y1}, ${W - R - 96} ${y2}, ${W - R} ${y2}`} fill="none" stroke={col} strokeWidth={hi ? 3 : 1.6} strokeLinecap="round" />
            <circle cx={L} cy={y1} r={hi ? 5 : 3.6} fill={col} />
            <circle cx={W - R} cy={y2} r={hi ? 5 : 3.6} fill={col} />
            <text x={L - 12} y={y1 + 4} fontSize="11.5" fill={hi ? T1 : T3} fontWeight={hi ? 700 : 400} textAnchor="end">{LB.rank(i + 1)}  {LB.pos[k]}</text>
            <text x={W - R + 12} y={y2 + 4} fontSize="11.5" fill={hi ? T1 : T3} fontWeight={hi ? 700 : 400}>{LB.rank(j + 1)}  {LB.pos[k]}</text>
            <text x={L + 20} y={y1 + 4} fontSize="11.5" fill={hi ? T1 : T4} fontWeight="600">{SLOPE_OPEN[k].toFixed(1)}</text>
            <text x={W - R - 20} y={y2 + 4} fontSize="11.5" fill={hi ? T1 : T4} fontWeight="600" textAnchor="end">{SLOPE_SET[k].toFixed(1)}</text>
          </g>
        );
      })}
      <rect x={L + 100} y={my - 44} width={150} height={26} rx="7" fill="rgba(255,255,255,.10)" />
      <text x={L + 175} y={my - 26} fontSize="11.5" fill={T1} fontWeight="700" textAnchor="middle">{LB.callout}</text>
    </Frame>
  );
}

/* ══════════ 2 · positional adjustment ══════════ */

type AdjLabels = {
  aria: string;
  bbTitle: string; bbUnit: string; bbPos: string[];
  fbTitle: string; fbUnit: string; fbPos: string[];
};

const BB_VAL = [12.5, 7.5, 2.5, -7.5, -12.5, -17.5];
const FB_VAL = [65.8, 28.9, 14.0, -22.3, -40.6, -51.7, -64.1, -65.2];
const FB_SE = [23.9, 23.7, 22.6, 22.6, 22.0, 20.7, 22.5, 0];

const ADJ_X0 = 46, ADJ_W = 608, ADJ_ZERO = ADJ_X0 + ADJ_W / 2, ADJ_HW = ADJ_W / 2;
const BAND = 25, BH = 15;

function adjPanel(y0: number, vals: number[], ses: number[], names: string[], max: number, ticks: number[], unit: string, title: string, keyPrefix: string) {
  const ih = BAND * vals.length;
  const nodes: ReactNode[] = [
    <text key={`${keyPrefix}t`} x={ADJ_X0} y={y0 - 26} fontSize="12.5" fill={T1} fontWeight="700">{title}</text>,
    <text key={`${keyPrefix}u`} x={ADJ_X0 + ADJ_W} y={y0 - 26} fontSize="10" fill={T4} textAnchor="end">{unit}</text>,
  ];
  ticks.forEach((v) => {
    const x = ADJ_ZERO + (ADJ_HW * v) / max;
    nodes.push(<line key={`${keyPrefix}g${v}`} x1={x} y1={y0 - 8} x2={x} y2={y0 + ih + 4} stroke={v === 0 ? E2 : E1} strokeWidth="1" />);
    nodes.push(<text key={`${keyPrefix}k${v}`} x={x} y={y0 + ih + 18} fontSize="9.5" fill={T4} textAnchor="middle">{v > 0 ? `+${v}` : `${v}`}</text>);
  });
  vals.forEach((v, i) => {
    const y = y0 + i * BAND + (BAND - BH) / 2;
    const bw = (ADJ_HW * v) / max;
    const e = (ADJ_HW * ses[i]) / max;
    const hi = i === 0;
    const rr = Math.min(3, Math.abs(bw));
    const d = bw >= 0
      ? `M${ADJ_ZERO} ${y} H${ADJ_ZERO + bw - rr} a${rr} ${rr} 0 0 1 ${rr} ${rr} V${y + BH - rr} a${rr} ${rr} 0 0 1 ${-rr} ${rr} H${ADJ_ZERO} Z`
      : `M${ADJ_ZERO} ${y} H${ADJ_ZERO + bw + rr} a${rr} ${rr} 0 0 0 ${-rr} ${rr} V${y + BH - rr} a${rr} ${rr} 0 0 0 ${rr} ${rr} H${ADJ_ZERO} Z`;
    nodes.push(<path key={`${keyPrefix}b${i}`} d={d} fill={hi ? T1 : DIM2} />);
    if (e > 0) {
      const cy = y + BH / 2;
      nodes.push(<line key={`${keyPrefix}e${i}`} x1={ADJ_ZERO + bw - e} y1={cy} x2={ADJ_ZERO + bw + e} y2={cy} stroke={E2} strokeWidth="1.2" />);
      nodes.push(<line key={`${keyPrefix}el${i}`} x1={ADJ_ZERO + bw - e} y1={cy - 3} x2={ADJ_ZERO + bw - e} y2={cy + 3} stroke={E2} strokeWidth="1.2" />);
      nodes.push(<line key={`${keyPrefix}er${i}`} x1={ADJ_ZERO + bw + e} y1={cy - 3} x2={ADJ_ZERO + bw + e} y2={cy + 3} stroke={E2} strokeWidth="1.2" />);
    }
    const pos = bw >= 0;
    const vx = pos ? ADJ_ZERO + bw + e + 8 : ADJ_ZERO + bw - e - 8;
    const cx = pos ? Math.min(ADJ_ZERO, ADJ_ZERO + bw - e) - 8 : Math.max(ADJ_ZERO, ADJ_ZERO + bw + e) + 8;
    nodes.push(<text key={`${keyPrefix}v${i}`} x={vx} y={y + BH / 2 + 4} fontSize="11" fill={hi ? T1 : T2} fontWeight="600" textAnchor={pos ? "start" : "end"}>{v > 0 ? "+" : ""}{v.toFixed(1)}</text>);
    nodes.push(<text key={`${keyPrefix}n${i}`} x={cx} y={y + BH / 2 + 4} fontSize="11.5" fill={hi ? T1 : T3} fontWeight={hi ? 700 : 400} textAnchor={pos ? "end" : "start"}>{names[i]}</text>);
  });
  return { nodes, next: y0 + ih + 24 };
}

function Adjustment({ L: LB }: { L: AdjLabels }) {
  const p1 = adjPanel(40, BB_VAL, BB_VAL.map(() => 0), LB.bbPos, 20, [-20, -10, 0, 10, 20], LB.bbUnit, LB.bbTitle, "a");
  const p2 = adjPanel(p1.next + 48, FB_VAL, FB_SE, LB.fbPos, 110, [-100, -50, 0, 50, 100], LB.fbUnit, LB.fbTitle, "b");
  return <Frame h={p2.next + 8} label={LB.aria}>{p1.nodes}{p2.nodes}</Frame>;
}

/* ══════════ 3 · sign reversal ══════════ */

type ReversalCard = {
  title: string; unit: string; min: number; max: number;
  before: number; after: number;
  beforeLabel: string; beforeNote: string;
  afterLabel: string; afterNote: string;
  foot: string;
};
type ReversalLabels = { aria: string; cards: [ReversalCard, ReversalCard] };

const CARD_H = 170;

function reversalCard(y0: number, c: ReversalCard, kp: string) {
  const pl = 150, pw = 400, ay = y0 + 82;
  const X = (v: number) => pl + (pw * (v - c.min)) / (c.max - c.min);
  const z = X(0), a = X(c.before), b = X(c.after), dir = b > a ? 1 : -1;
  return (
    <g key={kp}>
      <rect x={0} y={y0} width={W} height={CARD_H} rx="10" fill={CARD} />
      <text x={20} y={y0 + 24} fontSize="12" fill={T1} fontWeight="700">{c.title}</text>
      <text x={W - 20} y={y0 + 24} fontSize="10" fill={T4} textAnchor="end">{c.unit}</text>
      <line x1={pl} y1={ay} x2={pl + pw} y2={ay} stroke={E1} strokeWidth="1.5" />
      <line x1={z} y1={ay - 16} x2={z} y2={ay + 16} stroke={E2} strokeWidth="1.2" />
      <text x={z} y={ay - 21} fontSize="9.5" fill={T4} textAnchor="middle">0</text>
      <line x1={a + dir * 7} y1={ay} x2={b - dir * 20} y2={ay} stroke={T4} strokeWidth="1.4" strokeDasharray="4 3" />
      <path d={`M${b - dir * 9} ${ay} l${-dir * 9} -5 l0 10 Z`} fill={T4} />
      <circle cx={a} cy={ay} r="5.5" fill="none" stroke={DIM2} strokeWidth="2" />
      <circle cx={b} cy={ay} r="6" fill={T1} />
      <text x={a} y={ay - 38} fontSize="11" fill={T3} textAnchor="middle">{c.beforeLabel}</text>
      <text x={a} y={ay - 24} fontSize="10" fill={T4} textAnchor="middle">{c.beforeNote}</text>
      <text x={b} y={ay + 22} fontSize="11.5" fill={T1} fontWeight="700" textAnchor="middle">{c.afterLabel}</text>
      <text x={b} y={ay + 36} fontSize="10" fill={T4} textAnchor="middle">{c.afterNote}</text>
      <line x1={20} y1={y0 + CARD_H - 30} x2={W - 20} y2={y0 + CARD_H - 30} stroke={E1} strokeWidth="1" />
      <text x={W / 2} y={y0 + CARD_H - 12} fontSize="10.5" fill={T3} textAnchor="middle">{c.foot}</text>
    </g>
  );
}

function Reversal({ L: LB }: { L: ReversalLabels }) {
  return (
    <Frame h={CARD_H * 2 + 18} label={LB.aria}>
      {reversalCard(0, LB.cards[0], "c1")}
      {reversalCard(CARD_H + 18, LB.cards[1], "c2")}
    </Frame>
  );
}

/* ══════════ 4 · effective role — Marcelo ══════════ */

// Measured 12x8 activity grids (x = 12 bands goal-to-goal, y = 8 bands
// touchline-to-touchline). Real Madrid, 2015/16 La Liga, 30 matches.
const ATT_GRID = [
  [0.00627, 0.00639, 0.00406, 0.00154, 0.00125, 0.00125, 0.00125, 0.00125],
  [0.01387, 0.01163, 0.00616, 0.0024, 0.00189, 0.00125, 0.00125, 0.00125],
  [0.02172, 0.01635, 0.0116, 0.00234, 0.00229, 0.00125, 0.00125, 0.00125],
  [0.03453, 0.0228, 0.00699, 0.00275, 0.00166, 0.00125, 0.00125, 0.00125],
  [0.06087, 0.03388, 0.00799, 0.00362, 0.00135, 0.00165, 0.00125, 0.00192],
  [0.0655, 0.03745, 0.01046, 0.0043, 0.00162, 0.00125, 0.00135, 0.00183],
  [0.06908, 0.02825, 0.01362, 0.00398, 0.00166, 0.00125, 0.00125, 0.00125],
  [0.07475, 0.03157, 0.01382, 0.0037, 0.00294, 0.00147, 0.00125, 0.00125],
  [0.05533, 0.03481, 0.01579, 0.00384, 0.00175, 0.00125, 0.00138, 0.00188],
  [0.03823, 0.03118, 0.02283, 0.0043, 0.00239, 0.00147, 0.00188, 0.00125],
  [0.01966, 0.01957, 0.01315, 0.00376, 0.00155, 0.00125, 0.00125, 0.00125],
  [0.00976, 0.01141, 0.00958, 0.00223, 0.00137, 0.00125, 0.00125, 0.00125],
];

const DEF_GRID = [
  [0.02916, 0.02547, 0.01566, 0.01519, 0.0085, 0.00564, 0.00564, 0.00564],
  [0.02833, 0.02999, 0.01981, 0.01427, 0.00564, 0.00564, 0.00564, 0.00564],
  [0.028, 0.02564, 0.01626, 0.00827, 0.0062, 0.00628, 0.00564, 0.00649],
  [0.03285, 0.01643, 0.01831, 0.00762, 0.00564, 0.00628, 0.00647, 0.00616],
  [0.02685, 0.02671, 0.01343, 0.0077, 0.00767, 0.00647, 0.00564, 0.00564],
  [0.03106, 0.02082, 0.00964, 0.00695, 0.00564, 0.00564, 0.00564, 0.00564],
  [0.03048, 0.02383, 0.01132, 0.00635, 0.00564, 0.00564, 0.00564, 0.00564],
  [0.01557, 0.01182, 0.00971, 0.00692, 0.00635, 0.00564, 0.00564, 0.00564],
  [0.01314, 0.01441, 0.00779, 0.00564, 0.00564, 0.00564, 0.00564, 0.00564],
  [0.0081, 0.00972, 0.00756, 0.00649, 0.00564, 0.00564, 0.00564, 0.00564],
  [0.00834, 0.0075, 0.00765, 0.00622, 0.00564, 0.00564, 0.00564, 0.00564],
  [0.00564, 0.00692, 0.00748, 0.00564, 0.00564, 0.00564, 0.00564, 0.00564],
];

const PW = 318, PH = 212, PY = 46, NX = 12, NY = 8;

type RoleLabels = {
  aria: string;
  attack: string; attackSub: string; attackRole: string;
  defence: string; defenceSub: string; defenceRole: string;
  centre: (m: number) => string;
  gap: string;
};

/** Cell opacity is normalised to the 95th percentile — one hot cell must not
    wash the rest of the grid out — then gamma-corrected for legibility. */
function pitchCells(grid: number[][], x0: number, kp: string) {
  const flat = grid.flat().slice().sort((a, b) => a - b);
  const mx = flat[Math.floor(flat.length * 0.95)] || flat[flat.length - 1] || 1;
  const cw = PW / NX, ch = PH / NY;
  const out: ReactNode[] = [];
  for (let i = 0; i < NX; i++) {
    for (let j = 0; j < NY; j++) {
      const v = Math.min(1, grid[i][j] / mx);
      const o = Math.round((0.035 + 0.93 * Math.pow(v, 0.8)) * 100) / 100;
      out.push(<rect key={`${kp}${i}-${j}`} x={x0 + i * cw} y={PY + j * ch} width={cw + 0.5} height={ch + 0.5} fill={`rgba(255,255,255,${o})`} />);
    }
  }
  return out;
}

function Pitch({ x0, grid, title, sub, centre, centreLabel, kp }: { x0: number; grid: number[][]; title: string; sub: string; centre: number; centreLabel: string; kp: string }) {
  const cw = PW / NX, ch = PH / NY;
  const px = x0 + PW * (centre / 120);
  return (
    <g>
      <text x={x0} y={PY - 26} fontSize="12.5" fill={T1} fontWeight="700">{title}</text>
      <text x={x0} y={PY - 11} fontSize="10" fill={T4}>{sub}</text>
      {pitchCells(grid, x0, kp)}
      {Array.from({ length: NX - 1 }, (_, i) => (
        <line key={`${kp}vx${i}`} x1={x0 + (i + 1) * cw} y1={PY} x2={x0 + (i + 1) * cw} y2={PY + PH} stroke={PITCH_GRID} strokeWidth="0.7" />
      ))}
      {Array.from({ length: NY - 1 }, (_, j) => (
        <line key={`${kp}hz${j}`} x1={x0} y1={PY + (j + 1) * ch} x2={x0 + PW} y2={PY + (j + 1) * ch} stroke={PITCH_GRID} strokeWidth="0.7" />
      ))}
      <rect x={x0} y={PY} width={PW} height={PH} fill="none" stroke={E2} strokeWidth="1" />
      <line x1={x0 + PW / 2} y1={PY} x2={x0 + PW / 2} y2={PY + PH} stroke={PITCH_LINE} strokeWidth="1" />
      <circle cx={x0 + PW / 2} cy={PY + PH / 2} r={PH * 0.14} fill="none" stroke={PITCH_LINE} strokeWidth="1" />
      <rect x={x0} y={PY + PH * 0.21} width={PW * 0.135} height={PH * 0.58} fill="none" stroke={PITCH_LINE} strokeWidth="1" />
      <rect x={x0 + PW * 0.865} y={PY + PH * 0.21} width={PW * 0.135} height={PH * 0.58} fill="none" stroke={PITCH_LINE} strokeWidth="1" />
      <line x1={px} y1={PY - 5} x2={px} y2={PY + PH + 6} stroke={T1} strokeWidth="1.8" strokeDasharray="4 3" />
      <text x={px} y={PY + PH + 21} fontSize="11" fill={T1} fontWeight="700" textAnchor="middle">{centreLabel}</text>
    </g>
  );
}

function EffectiveRole({ L: LB }: { L: RoleLabels }) {
  const fy = PY + PH + 44;
  return (
    <Frame h={352} label={LB.aria}>
      <Pitch x0={0} grid={ATT_GRID} title={LB.attack} sub={LB.attackSub} centre={65.4} centreLabel={LB.centre(65.4)} kp="a" />
      <Pitch x0={382} grid={DEF_GRID} title={LB.defence} sub={LB.defenceSub} centre={39.6} centreLabel={LB.centre(39.6)} kp="d" />
      <text x={0} y={fy} fontSize="10.5" fill={T3}>{LB.attackRole}</text>
      <text x={382} y={fy} fontSize="10.5" fill={T3}>{LB.defenceRole}</text>
      <rect x={200} y={fy + 14} width={300} height={28} rx="8" fill="rgba(255,255,255,.10)" />
      <text x={350} y={fy + 32} fontSize="11.5" fill={T1} fontWeight="700" textAnchor="middle">{LB.gap}</text>
    </Frame>
  );
}

/* ══════════ labels ══════════ */

const KO = {
  slope: {
    aria: "오픈플레이와 세트피스의 포지션별 득점률 순위 — 센터백이 8위에서 2위로 올라선다",
    left: "오픈플레이", right: "세트피스", unit: "선발 1,000회당 득점",
    pos: ["최전방", "윙", "공격형 MF", "측면 MF", "중앙 MF", "수비형 MF", "풀백·윙백", "센터백"],
    rank: (n: number) => `${n}위`,
    callout: "센터백 8위 → 2위",
  } as SlopeLabels,
  adj: {
    aria: "야구 WAR의 포지션 보정과, 본 연구에서 실측한 축구 포지션 보정의 비교",
    bbTitle: "야구 WAR — 이미 있는 것", bbUnit: "런 / 162경기",
    bbPos: ["C 포수", "SS 유격수", "2B·3B·CF", "LF·RF", "1B 1루수", "DH 지명타자"],
    fbTitle: "축구 — 본 연구 실측 (오차막대 = 표준오차)", fbUnit: "골-등가 / 1,000선발 (합=0)",
    fbPos: ["센터백", "풀백·윙백", "수비형 MF", "중앙 MF", "측면 MF", "윙", "공격형 MF", "최전방"],
  } as AdjLabels,
  rev: {
    aria: "모형을 바로잡자 계수의 부호가 뒤집힌 두 수비 지표",
    cards: [
      {
        title: "① xT 차단 지표 — 노출 보정 전후", unit: "실점 위협(피xG) 계수",
        min: -0.13, max: 0.2, before: 0.152, after: -0.078,
        beforeLabel: "보정 전  +0.152", beforeNote: '"개입할수록 실점 위협 증가" (역인과)',
        afterLabel: "보정 후  −0.078", afterNote: '"개입할수록 실점 위협 감소"',
        foot: "개인 노출을 빼주자 부호가 뒤집혔다 · p = 1.3 × 10⁻⁸",
      },
      {
        title: "② 카운터프레스 지표 — 결함 수정 전후", unit: "골득실 계수",
        min: -1.9, max: 1.15, before: -1.345, after: 0.645,
        beforeLabel: "수정 전  −1.345", beforeNote: '"많이 할수록 골득실 악화"',
        afterLabel: "수정 후  +0.645", afterNote: "골득실과는 무관 (p = 0.54)",
        foot: "대신 실점 위협(피xG) 계수가 −2.80으로 유의해졌다 · p = 2.9 × 10⁻⁸",
      },
    ],
  } as ReversalLabels,
  role: {
    aria: "마르셀루의 공격 국면과 수비 국면 활동 분포 실측",
    attack: "공격 국면", attackSub: "공격 방향 →  ·  우리 골문은 왼쪽", attackRole: "실효 역할: 풀백 90% · 측면 MF 10%",
    defence: "수비 국면", defenceSub: "공격 방향 →  ·  우리 골문은 왼쪽", defenceRole: "실효 역할: 풀백 57% · 측면 MF 30%",
    centre: (m: number) => `활동 중심 ${m.toFixed(1)}m`,
    gap: "공격 ↔ 수비 활동 중심 차이  25.8m",
  } as RoleLabels,
};

const EN = {
  slope: {
    aria: "Open play versus set piece scoring rank by position — centre-backs rise from 8th to 2nd",
    left: "Open play", right: "Set piece", unit: "goals per 1,000 starts",
    pos: ["Forward", "Winger", "Attacking mid", "Wide mid", "Central mid", "Defensive mid", "Full-back", "Centre-back"],
    rank: (n: number) => `#${n}`,
    callout: "Centre-back  8th → 2nd",
  } as SlopeLabels,
  adj: {
    aria: "The positional adjustment in baseball WAR beside the football values measured in this study",
    bbTitle: "Baseball WAR — the existing one", bbUnit: "runs / 162 games",
    bbPos: ["C", "SS", "2B · 3B · CF", "LF · RF", "1B", "DH"],
    fbTitle: "Football — measured here (bars = standard error)", fbUnit: "goal-equivalents / 1,000 starts (centred)",
    fbPos: ["Centre-back", "Full-back", "Defensive mid", "Central mid", "Wide mid", "Winger", "Attacking mid", "Forward"],
  } as AdjLabels,
  rev: {
    aria: "Two defensive metrics whose coefficient changed sign once the model was corrected",
    cards: [
      {
        title: "① xT denial — before and after exposure normalisation", unit: "coefficient on threat conceded (xGA)",
        min: -0.13, max: 0.2, before: 0.152, after: -0.078,
        beforeLabel: "before  +0.152", beforeNote: '"more involvement, more danger" — reverse causality',
        afterLabel: "after  −0.078", afterNote: '"more involvement, less danger"',
        foot: "Subtracting each player's own exposure flipped the sign · p = 1.3 × 10⁻⁸",
      },
      {
        title: "② Counterpress — before and after the fix", unit: "coefficient on goal difference",
        min: -1.9, max: 1.15, before: -1.345, after: 0.645,
        beforeLabel: "before  −1.345", beforeNote: '"the more you counterpress, the worse the result"',
        afterLabel: "after  +0.645", afterNote: "no relation to goal difference (p = 0.54)",
        foot: "Instead the coefficient on threat conceded became −2.80 · p = 2.9 × 10⁻⁸",
      },
    ],
  } as ReversalLabels,
  role: {
    aria: "Marcelo's measured activity distribution in the attacking and defending phase",
    attack: "In attack", attackSub: "attacking left → right  ·  own goal on the left", attackRole: "Effective role: full-back 90% · wide mid 10%",
    defence: "In defence", defenceSub: "attacking left → right  ·  own goal on the left", defenceRole: "Effective role: full-back 57% · wide mid 30%",
    centre: (m: number) => `centre of activity ${m.toFixed(1)}m`,
    gap: "Attack ↔ defence gap in centre of activity:  25.8m",
  } as RoleLabels,
};

/* ══════════ exported components + registry ══════════ */

export const JwcSetPieceSlopeKo = () => <Slope L={KO.slope} />;
export const JwcSetPieceSlopeEn = () => <Slope L={EN.slope} />;
export const JwcPositionalAdjustmentKo = () => <Adjustment L={KO.adj} />;
export const JwcPositionalAdjustmentEn = () => <Adjustment L={EN.adj} />;
export const JwcSignReversalKo = () => <Reversal L={KO.rev} />;
export const JwcSignReversalEn = () => <Reversal L={EN.rev} />;
export const JwcEffectiveRoleKo = () => <EffectiveRole L={KO.role} />;
export const JwcEffectiveRoleEn = () => <EffectiveRole L={EN.role} />;

export const JWC_VISUALS: Record<string, ComponentType> = {
  "jwc-setpiece-slope-ko": JwcSetPieceSlopeKo,
  "jwc-setpiece-slope-en": JwcSetPieceSlopeEn,
  "jwc-positional-adjustment-ko": JwcPositionalAdjustmentKo,
  "jwc-positional-adjustment-en": JwcPositionalAdjustmentEn,
  "jwc-sign-reversal-ko": JwcSignReversalKo,
  "jwc-sign-reversal-en": JwcSignReversalEn,
  "jwc-effective-role-ko": JwcEffectiveRoleKo,
  "jwc-effective-role-en": JwcEffectiveRoleEn,
};
