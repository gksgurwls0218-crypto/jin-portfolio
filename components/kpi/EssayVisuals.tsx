/* Sketch visuals for the "New concepts" essays. All data-driven sketches
   here are redesigned for the site's own visual language — none are lifted
   directly from jin's blog images. Sources are cited in each component or
   in the essay block's visualCaption. Estimates/illustrative (non-empirical)
   diagrams are labelled as such inline, per project rules. */

import type { ReactNode, ComponentType } from "react";

// ---------- shared bits ----------

function Tag({ children }: { children: ReactNode }) {
  return (
    <span
      className="mono"
      style={{
        fontSize: 10.5,
        padding: "3px 8px",
        borderRadius: 20,
        border: "0.5px solid var(--edge-2)",
        color: "var(--ink-3)",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

function BarRow({
  label,
  value,
  max,
  display,
  color = "var(--green-bright)",
  sub,
}: {
  label: string;
  value: number;
  max: number;
  display: string;
  color?: string;
  sub?: string;
}) {
  const pct = Math.max(2, Math.min(100, (value / max) * 100));
  return (
    <div className="flex items-center gap-3">
      <div style={{ width: 118, flexShrink: 0 }}>
        <p className="mono" style={{ fontSize: 12, color: "var(--ink-2)" }}>{label}</p>
        {sub ? <p className="mono" style={{ fontSize: 10, color: "var(--ink-4)" }}>{sub}</p> : null}
      </div>
      <div style={{ flex: 1, height: 20, background: "var(--stage-2)", borderRadius: 6, overflow: "hidden", border: "0.5px solid var(--edge)" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 6 }} />
      </div>
      <p className="mono" style={{ width: 68, textAlign: "right", fontSize: 12.5, color: "var(--ink)", flexShrink: 0 }}>{display}</p>
    </div>
  );
}

function TimelineTrack({
  steps,
  note,
}: {
  steps: { era: string; label: string; detail: string; active?: boolean }[];
  note?: string;
}) {
  return (
    <div>
      <div className="flex items-stretch" style={{ gap: 0 }}>
        {steps.map((s, i) => (
          <div key={s.label} style={{ flex: 1, position: "relative", paddingRight: i < steps.length - 1 ? 14 : 0 }}>
            {i < steps.length - 1 && (
              <div style={{ position: "absolute", top: 5, right: 0, width: 14, height: 1, background: "var(--edge-2)" }} />
            )}
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: s.active ? "var(--green-bright)" : "var(--ink-4)",
                marginBottom: 10,
              }}
            />
            <p className="mono" style={{ fontSize: 10, color: "var(--ink-4)", marginBottom: 3 }}>{s.era}</p>
            <p className="mono" style={{ fontSize: 13, color: s.active ? "var(--green-bright)" : "var(--ink)", marginBottom: 4, fontWeight: 500 }}>{s.label}</p>
            <p style={{ fontSize: 12, lineHeight: 1.5, color: "var(--ink-3)" }}>{s.detail}</p>
          </div>
        ))}
      </div>
      {note ? <p className="mono mt-5" style={{ fontSize: 10.5, color: "var(--ink-4)" }}>{note}</p> : null}
    </div>
  );
}

function StatPair({
  a,
  b,
  note,
}: {
  a: { label: string; value: string; detail: string };
  b: { label: string; value: string; detail: string };
  note?: string;
}) {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {[a, b].map((s) => (
          <div key={s.label} style={{ padding: "16px 18px", borderRadius: 14, background: "var(--stage-2)", border: "0.5px solid var(--edge)" }}>
            <p className="mono" style={{ fontSize: 11, color: "var(--ink-4)", marginBottom: 6 }}>{s.label}</p>
            <p className="mono" style={{ fontSize: 30, color: "var(--green-bright)", fontWeight: 500, marginBottom: 6, lineHeight: 1 }}>{s.value}</p>
            <p style={{ fontSize: 12, color: "var(--ink-3)", lineHeight: 1.5 }}>{s.detail}</p>
          </div>
        ))}
      </div>
      {note ? <p className="mono mt-4" style={{ fontSize: 10.5, color: "var(--ink-4)" }}>{note}</p> : null}
    </div>
  );
}

// ---------- 1. Pre-Half Space ----------

export function PlayerFitGrid() {
  const players = [
    { name: "Lee Kang-in", note: "receives, releases, then runs the arc" },
    { name: "Bruno Fernandes", note: "last pass before the half-space" },
    { name: "Bernardo Silva", note: "pivot + secondary run in one body" },
    { name: "Paulo Dybala", note: "drops to the strip, turns upfield" },
    { name: "Martin Ødegaard", note: "distributes, then arrives late" },
  ];
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {players.map((p) => (
          <div key={p.name} style={{ padding: "14px 12px", borderRadius: 12, background: "var(--stage-2)", border: "0.5px solid var(--edge)" }}>
            <p className="mono" style={{ fontSize: 12.5, color: "var(--ink)", marginBottom: 6, fontWeight: 500 }}>{p.name}</p>
            <p style={{ fontSize: 11.5, color: "var(--ink-4)", lineHeight: 1.4 }}>{p.note}</p>
          </div>
        ))}
      </div>
      <p className="mono mt-4" style={{ fontSize: 10.5, color: "var(--ink-4)" }}>
        Illustrative — jin's read of players who habitually occupy and release from the pre-half space, not a ranked or sourced list.
      </p>
    </div>
  );
}

export function PHSStatCard() {
  return (
    <StatPair
      a={{ label: "Ball progressions", value: "8", detail: "Team-leading — Lee Kang-in, Korea v Czech Republic" }}
      b={{ label: "In-between movements", value: "12", detail: "Between-the-lines receptions — same match" }}
      note="Source: Korea v Czech Republic match analysis (this site, /match-analysis). One match, one player — read as a case example of the pre-half-space passer role, not a league-wide norm."
    />
  );
}

export function PHSZoneDiagram() {
  // Full pitch, landscape, drawn to scale-ish proportions (field: x 20–620, y 20–380).
  const GREEN = "var(--green-bright)";
  const EDGE = "rgba(20,24,26,.40)";
  const EDGE_SOFT = "rgba(20,24,26,.28)";
  const INK4 = "rgba(20,24,26,.62)";
  return (
    <div>
      <svg viewBox="0 0 640 410" width="100%" style={{ display: "block" }}>
        {/* pitch surface */}
        <rect x="20" y="20" width="600" height="360" rx="6" fill="var(--stage-2)" stroke={EDGE} strokeWidth="1.5" />

        {/* band rows: wide / half-space / centre / half-space / wide */}
        <line x1="20" y1="80" x2="620" y2="80" stroke={EDGE_SOFT} strokeWidth="1" strokeDasharray="2 4" />
        <line x1="20" y1="157" x2="620" y2="157" stroke={EDGE_SOFT} strokeWidth="1" strokeDasharray="2 4" />
        <line x1="20" y1="243" x2="620" y2="243" stroke={EDGE_SOFT} strokeWidth="1" strokeDasharray="2 4" />
        <line x1="20" y1="320" x2="620" y2="320" stroke={EDGE_SOFT} strokeWidth="1" strokeDasharray="2 4" />
        <text x="270" y="54" textAnchor="middle" className="mono" fontSize="10.5" fontWeight={500} fill={INK4}>WIDE</text>
        <text x="270" y="122" textAnchor="middle" className="mono" fontSize="10.5" fontWeight={500} fill={INK4}>HALF-SPACE</text>
        <text x="270" y="204" textAnchor="middle" className="mono" fontSize="10.5" fontWeight={500} fill={INK4}>CENTRE</text>
        <text x="270" y="285" textAnchor="middle" className="mono" fontSize="10.5" fontWeight={500} fill={INK4}>HALF-SPACE</text>
        <text x="270" y="354" textAnchor="middle" className="mono" fontSize="10.5" fontWeight={500} fill={INK4}>WIDE</text>

        {/* thirds (defensive | middle | final) */}
        <line x1="220" y1="20" x2="220" y2="380" stroke={EDGE_SOFT} strokeWidth="1.25" strokeDasharray="4 4" />
        <line x1="420" y1="20" x2="420" y2="380" stroke={EDGE_SOFT} strokeWidth="1.25" strokeDasharray="4 4" />
        <text x="120" y="14" textAnchor="middle" className="mono" fontSize="9.5" fontWeight={500} fill={INK4}>DEFENSIVE THIRD</text>
        <text x="320" y="14" textAnchor="middle" className="mono" fontSize="9.5" fontWeight={500} fill={INK4}>MIDDLE THIRD</text>
        <text x="520" y="14" textAnchor="middle" className="mono" fontSize="9.5" fontWeight={500} fill={INK4}>FINAL THIRD</text>

        {/* halfway line + centre circle */}
        <line x1="320" y1="20" x2="320" y2="380" stroke={EDGE} strokeWidth="1.25" />
        <circle cx="320" cy="200" r="43" fill="none" stroke={EDGE} strokeWidth="1.25" />
        <circle cx="320" cy="200" r="2.5" fill={INK4} />

        {/* penalty boxes, six-yard boxes, spots, arcs — both ends */}
        {[0, 1].map((side) => {
          const flip = side === 1;
          const x0 = flip ? 620 : 20;
          const dir = flip ? -1 : 1;
          const boxX = flip ? 620 - 102 : 20;
          const sixX = flip ? 620 - 42.8 : 20;
          const spotX = x0 + dir * 73.4;
          const arcStartY = 161.45, arcEndY = 238.55;
          const boxEdgeX = flip ? 620 - 102 : 20 + 102;
          const sweep = flip ? 1 : 0;
          return (
            <g key={side}>
              {/* goal frame */}
              <rect x={flip ? 616 : 12} y="172" width="8" height="56" fill="none" stroke={INK4} strokeWidth="1.5" />
              {/* penalty box */}
              <rect x={boxX} y={200 - 79.2} width="102" height="158.4" fill="none" stroke={EDGE} strokeWidth="1.25" />
              {/* six-yard box */}
              <rect x={sixX} y={200 - 36} width="42.8" height="72" fill="none" stroke={EDGE} strokeWidth="1.25" />
              {/* penalty spot */}
              <circle cx={spotX} cy="200" r="2" fill={INK4} />
              {/* penalty arc */}
              <path
                d={`M ${boxEdgeX} ${arcStartY} A 48 48 0 0 ${sweep} ${boxEdgeX} ${arcEndY}`}
                fill="none"
                stroke={EDGE}
                strokeWidth="1.25"
              />
            </g>
          );
        })}

        {/* corner arcs */}
        <path d="M 20 32 A 12 12 0 0 1 32 20" fill="none" stroke={EDGE} strokeWidth="1" />
        <path d="M 608 20 A 12 12 0 0 1 620 32" fill="none" stroke={EDGE} strokeWidth="1" />
        <path d="M 620 368 A 12 12 0 0 1 608 380" fill="none" stroke={EDGE} strokeWidth="1" />
        <path d="M 32 380 A 12 12 0 0 1 20 368" fill="none" stroke={EDGE} strokeWidth="1" />

        {/* Pre-Half Space — narrow strip, wide band only, nearest the final third */}
        <rect x="340" y="20" width="80" height="60" fill="rgba(125,255,106,0.20)" stroke={GREEN} strokeWidth="1.5" rx="3" />
        <rect x="340" y="320" width="80" height="60" fill="rgba(125,255,106,0.20)" stroke={GREEN} strokeWidth="1.5" rx="3" />
        <text x="380" y="45" textAnchor="middle" className="mono" fontSize="10.5" fontWeight={600} fill={GREEN}>PHS</text>
        <text x="380" y="355" textAnchor="middle" className="mono" fontSize="10.5" fontWeight={600} fill={GREEN}>PHS</text>
      </svg>
      <p className="mono mt-3" style={{ fontSize: 10.5, color: "var(--ink-4)" }}>
        Schematic, not a heat map — the pre-half space as jin defines it: the touchline-adjacent strip of the middle third, narrowed to the portion nearest the final third, on both flanks. Estimated xT range for this zone: 0.08–0.20, jin's working estimate, not a sourced measurement.
      </p>
    </div>
  );
}

// ---------- 2. Chained Post-Play ----------

export function PassQualityBar() {
  return (
    <div>
      <div className="flex flex-col gap-3">
        <BarRow label="Accurate pass to feet" value={100} max={150} display="100" color="var(--ink-4)" />
        <BarRow label="One-touch, on the move" value={135} max={150} display="120–150" color="var(--green-bright)" />
      </div>
      <p className="mono mt-4" style={{ fontSize: 10.5, color: "var(--ink-4)" }}>
        jin's own conceptual scale for weighing pass quality in chained post-play — not a measured statistic. Illustrates why a one-touch lateral into a moving receiver is worth more than an accurate pass to a stationary one.
      </p>
    </div>
  );
}

export function GwangjuRoleDiagram() {
  const rows = [
    { primary: "Lee Hee-gyun", covers: ["Eom Ji-sung", "Lee Gun-hee"] },
    { primary: "Jung Ho-yeon", covers: ["Lee Hee-gyun", "Choi Kyung-rok", "Eom Ji-sung"] },
  ];
  return (
    <div>
      <div className="flex flex-col gap-4">
        {rows.map((r) => (
          <div key={r.primary} className="flex items-center gap-3 flex-wrap">
            <div style={{ padding: "8px 14px", borderRadius: 10, background: "var(--green-soft)", border: "0.5px solid var(--green-line)" }}>
              <p className="mono" style={{ fontSize: 12.5, color: "var(--green-bright)" }}>{r.primary}</p>
            </div>
            <span className="mono" style={{ fontSize: 11, color: "var(--ink-4)" }}>role covered by →</span>
            <div className="flex gap-2 flex-wrap">
              {r.covers.map((c) => <Tag key={c}>{c}</Tag>)}
            </div>
          </div>
        ))}
      </div>
      <p className="mono mt-4" style={{ fontSize: 10.5, color: "var(--ink-4)" }}>
        Gwangju FC (Lee Jung-hyo), jin's blog notes on role substitution — every player can deputise for the pivot pattern, which is what keeps the chained structure running through fixture congestion and injuries.
      </p>
    </div>
  );
}

export function LeverkusenFlow() {
  const branches = [
    { label: "Boniface", note: "first pivot — back to goal, post-up" },
    { label: "Grimaldo / Wirtz", note: "second pivot — activated at the same time" },
    { label: "Final third", note: "3–5 one-touch pattern passes slice the block" },
  ];
  return (
    <div>
      <div className="flex flex-col items-center gap-2">
        <div style={{ padding: "10px 16px", borderRadius: 10, background: "var(--stage-2)", border: "0.5px solid var(--edge-2)" }}>
          <p className="mono" style={{ fontSize: 13, color: "var(--ink)", fontWeight: 500 }}>Xhaka — reads the whole pitch</p>
        </div>
        <div style={{ width: 1, height: 18, background: "var(--edge-2)" }} />
        <div className="flex gap-3 flex-wrap justify-center">
          {branches.map((b) => (
            <div key={b.label} style={{ width: 168, padding: "12px 14px", borderRadius: 12, background: "var(--stage-2)", border: "0.5px solid var(--edge)" }}>
              <p className="mono" style={{ fontSize: 12, color: "var(--green-bright)", marginBottom: 4 }}>{b.label}</p>
              <p style={{ fontSize: 11.5, color: "var(--ink-4)", lineHeight: 1.4 }}>{b.note}</p>
            </div>
          ))}
        </div>
      </div>
      <p className="mono mt-4" style={{ fontSize: 10.5, color: "var(--ink-4)" }}>
        Leverkusen under Xabi Alonso, jin's blog reading of the double-pivot activation pattern — illustrative sequence, not a play-by-play from a single dataset.
      </p>
    </div>
  );
}

// ---------- 3. Sustainable Mid-Block ----------

export function BlockEvolutionTimeline() {
  return (
    <TimelineTrack
      steps={[
        { era: "1970s–2000s", label: "Total Football", detail: "Positional fluidity, high technical demand on every player." },
        { era: "2000s–2010s", label: "Low Block", detail: "Compact, deep, wins the ball far from goal — long way to a shot." },
        { era: "2010s–early 2020s", label: "High Block", detail: "Full-team sprints, gegenpressing — devastating but unsustainable." },
        { era: "2022–", label: "Mid-Block", detail: "Zonal snare, ace exempted from pressing — energy managed, not maximised.", active: true },
      ]}
      note="Illustrative periodization, jin's own framing of the trend — not a sourced academic timeline. Eras overlap heavily in practice."
    />
  );
}

export function QatarDistanceChart() {
  const early = [
    { label: "USA", v: 122.0 },
    { label: "Iran", v: 119.6 },
    { label: "Canada", v: 116.5 },
    { label: "Germany", v: 117.1 },
    { label: "Belgium", v: 114.7 },
  ];
  const deep = [
    { label: "Argentina", v: 118.2 },
    { label: "France", v: 114.7 },
    { label: "Croatia", v: 122.3 },
    { label: "Morocco", v: 116.2 },
  ];
  return (
    <div>
      <p className="mono mb-2" style={{ fontSize: 10.5, color: "var(--ink-4)" }}>Out by the Round of 16</p>
      <div className="flex flex-col gap-2 mb-5">
        {early.map((t) => <BarRow key={t.label} label={t.label} value={t.v} max={125} display={`${t.v.toFixed(1)} km`} color="var(--ink-4)" />)}
      </div>
      <p className="mono mb-2" style={{ fontSize: 10.5, color: "var(--ink-4)" }}>Semi-finalists / finalists</p>
      <div className="flex flex-col gap-2">
        {deep.map((t) => <BarRow key={t.label} label={t.label} value={t.v} max={125} display={`${t.v.toFixed(1)} km`} color="var(--green-bright)" />)}
      </div>
      <p className="mono mt-4" style={{ fontSize: 10.5, color: "var(--ink-4)", lineHeight: 1.6 }}>
        Average Total Distance Covered per match, hand-aggregated from all 64 FIFA official post-match summary reports, Qatar 2022. Three of four deep-running teams (Argentina, France, Morocco) averaged less than every early-exit team. Croatia is the exception in this sample — two of its wins went to extra time, which mechanically adds ~30 minutes of distance and pulls its average up; the other three deep-running teams didn't have that many extra-time matches. Correlation, not causation — a small, single-tournament sample.
      </p>
    </div>
  );
}

export function FsqcaConsistencyChart() {
  const rows = [
    { label: "1 · Possession style", v: 89.7, sub: "Possession, DLB, RFT" },
    { label: "2 · Direct play", v: 92.5, sub: "Target, Crosses, FT, DLB, RFT" },
    { label: "3 · All-round", v: 92.6, sub: "Target, Crosses, DP, DLB, RFT, FT" },
    { label: "4 · Direct (defensive)", v: 89.9, sub: "Target, DLB, FT, DP" },
  ];
  return (
    <div>
      <div className="flex flex-col gap-3">
        {rows.map((r) => <BarRow key={r.label} label={r.label} sub={r.sub} value={r.v} max={100} display={`${r.v}%`} />)}
      </div>
      <p className="mono mt-4" style={{ fontSize: 10.5, color: "var(--ink-4)", lineHeight: 1.6 }}>
        Consistency of the 4 winning configurations found by fsQCA on Qatar 2022 (49 decisive matches, 98 teams). No single KPI was a necessary condition for winning — different combinations of the same 7 KPIs all cleared ~90% consistency. Source: Yan et al. (2024), "How to win in FIFA World Cup Qatar 2022?", Frontiers in Psychology 14:1307346.
      </p>
    </div>
  );
}

// ---------- 4. Overload to Isolation / Lateral Pass ----------

export function DMRoleTimeline() {
  return (
    <TimelineTrack
      steps={[
        { era: "Classic", label: "Destroyer", detail: "Wins the ball, gives it up simply. Little distribution demand." },
        { era: "Guardiola era", label: "Regista", detail: "Busquets-type — single pivot, dictates tempo from deep." },
        { era: "Mid-block era", label: "Double pivot", detail: "No Busquets? Split the job — one screens, one distributes." },
        { era: "Now", label: "Hybrid stopper-CB", detail: "Left-footed CB steps into the build to substitute for the pivot.", active: true },
      ]}
      note="Illustrative framework built from jin's blog reading of the position's evolution — not a sourced academic periodization."
    />
  );
}

export function RecoveryTimeStat() {
  return (
    <StatPair
      a={{ label: "Ball recovery time", value: "12.78s", detail: "Korea — proactive mid-block, stoppers step up early" }}
      b={{ label: "Ball recovery time", value: "18.42s", detail: "Czech Republic — 301 pressures, slower to actually win it back" }}
      note="Source: Korea v Czech Republic match analysis (this site). Defensive Line Breaks the same match: Korea 10, Czech Republic 5 — read together, a proactive block that won the ball back fast and broke lines going forward, not just a possession result."
    />
  );
}

export function CBTempoDiagram() {
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <div style={{ padding: "14px 16px", borderRadius: 12, background: "var(--stage-2)", border: "0.5px solid var(--green-line)" }}>
          <p className="mono" style={{ fontSize: 12, color: "var(--green-bright)", marginBottom: 8 }}>Left-footed CB</p>
          <div className="flex items-center gap-1.5 mb-2">
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--green-bright)" }} />
            <p style={{ fontSize: 11.5, color: "var(--ink-3)" }}>one touch — raked pass down the line</p>
          </div>
          <p style={{ fontSize: 11.5, color: "var(--ink-4)" }}>Inverted winger receives already facing forward.</p>
        </div>
        <div style={{ padding: "14px 16px", borderRadius: 12, background: "var(--stage-2)", border: "0.5px solid var(--edge)" }}>
          <p className="mono" style={{ fontSize: 12, color: "var(--ink-3)", marginBottom: 8 }}>Right-footed CB</p>
          <div className="flex items-center gap-1.5 mb-1">
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--ink-4)" }} />
            <p style={{ fontSize: 11.5, color: "var(--ink-3)" }}>touch 1 — settle</p>
          </div>
          <div className="flex items-center gap-1.5 mb-1">
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--ink-4)" }} />
            <p style={{ fontSize: 11.5, color: "var(--ink-3)" }}>touch 2 — turn</p>
          </div>
          <div className="flex items-center gap-1.5">
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--ink-4)" }} />
            <p style={{ fontSize: 11.5, color: "var(--ink-3)" }}>touch 3 — pass</p>
          </div>
        </div>
      </div>
      <p className="mono mt-4" style={{ fontSize: 10.5, color: "var(--ink-4)" }}>
        "Two tempos saved" is jin's own framing of the touch-count gap, not a measured average — illustrates why the line-CB's strong foot changes how fast an overload can flip to isolation.
      </p>
    </div>
  );
}

export function DMTimelineAndRecovery() {
  return (
    <div className="flex flex-col gap-6">
      <DMRoleTimeline />
      <div style={{ height: 1, background: "var(--edge)" }} />
      <RecoveryTimeStat />
    </div>
  );
}

// ---------- 5. Fast + Tall 9 ----------

export function StrikerTimeline() {
  return (
    <TimelineTrack
      steps={[
        { era: "Pre-2010s", label: "Classic 9", detail: "Costa, Crouch, Kim Shin-wook — target man, aerial focal point." },
        { era: "Pep era", label: "False 9", detail: "Firmino, Fàbregas — drops deep, drags a centre-back out of position." },
        { era: "Now", label: "Fast + Tall 9", detail: "Haaland, Vlahović, Morata, Lukaku — both roles in one body.", active: true },
      ]}
      note="Illustrative — jin's reading of the striker role's evolution as argued in the essay, not a sourced academic periodization."
    />
  );
}

// Note: the Fast + Tall 9 essay's three visuals are step-through canvas
// boards, not React components — see /public/anim/phase1-classic-9.html,
// phase2-false-9-counter.html and phase3-fast-tall-9.html, embedded via
// visualSrc on the striker-evolution essay's Thesis / How we got here /
// In the Variation framework blocks.

// ---------- registry ----------

export const ESSAY_VISUALS: Record<string, ComponentType> = {
  "phs-player-fit": PlayerFitGrid,
  "phs-stat-card": PHSStatCard,
  "phs-zone-diagram": PHSZoneDiagram,
  "post-pass-quality": PassQualityBar,
  "post-gwangju-roles": GwangjuRoleDiagram,
  "post-leverkusen-flow": LeverkusenFlow,
  "midblock-evolution": BlockEvolutionTimeline,
  "midblock-qatar-distance": QatarDistanceChart,
  "midblock-fsqca": FsqcaConsistencyChart,
  "overload-dm-timeline": DMRoleTimeline,
  "overload-recovery-stat": RecoveryTimeStat,
  "overload-dm-recovery-combo": DMTimelineAndRecovery,
  "overload-cb-tempo": CBTempoDiagram,
  "striker-timeline": StrikerTimeline,
};
