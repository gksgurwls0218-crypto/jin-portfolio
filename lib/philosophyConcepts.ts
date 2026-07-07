/* jin's accumulated tactical concepts (from wiki/philosophy + key synthesis).
   Shown as the /approach card grid. English-first; Korean term kept as subtitle.
   Edit / prune freely — this array is the single source for the grid. */

export type Category = "CORE" | "ORIGINAL" | "STRUCTURE" | "PLAYER" | "DEFENCE" | "MEASURE";

export type Concept = {
  id: string;
  label: string;      // English name
  ko: string;         // Korean term
  category: Category;
  summary: string;    // one-line essence
  body: string;       // 2–3 sentence description
};

export const CONCEPTS: Concept[] = [
  {
    id: "variation",
    label: "Variation",
    ko: "변수 · 변이",
    category: "CORE",
    summary: "The one word behind the whole philosophy.",
    body: "Two faces of the same idea: a Variable holds live options (a, b, c); a Mutation makes the player himself the variable. It is recursive — even after reaching a high-danger situation, you keep stacking new variables inside it.",
  },
  {
    id: "lure-shock",
    label: "Lure & Shock",
    ko: "루어 앤 쇼크",
    category: "CORE",
    summary: "Condition the opponent, then strike the locked reaction.",
    body: "Repeat complete attacking cycles (Plan A−) until the opponent is conditioned to expect them, then unleash the real attack (Plan A) the moment their reaction fixes. Like deep learning, the effect compounds across a whole season of film.",
  },
  {
    id: "team-variable",
    label: "Team Variable",
    ko: "팀 단위 변수",
    category: "CORE",
    summary: "Make them learn your pattern — then weaponise it.",
    body: "Plan A− is not possession; it is a full build-up-to-shot cycle run again and again so the opponent 'learns' it as your identity. That learned, conditioned response is exactly what the real Plan A punishes.",
  },
  {
    id: "individual-variable",
    label: "Individual Variable",
    ko: "개인 단위 변수",
    category: "PLAYER",
    summary: "Meaningless repetitions for one decisive moment.",
    body: "The same deep-learning mechanism at a single-player scale. Repeat one move four or five times so the marker leans that way, then punish the learned lean in the opposite direction. The early repetitions must actually succeed for the teaching to take.",
  },
  {
    id: "hybrid-formation",
    label: "Hybrid Formation",
    ko: "변이 — 하이브리드 포메이션",
    category: "STRUCTURE",
    summary: "Formation fluidity as permission to mutate.",
    body: "A build-up core that shifts 3-2 ↔ 3-1 (inverted full-backs, La Volpiana) gives players structural permission to leave position. Receiving outside your position opens passing angles the defence never set — and defies its preconception of you. Role over position.",
  },
  {
    id: "multi-positional",
    label: "Multi-Positional",
    ko: "멀티성",
    category: "PLAYER",
    summary: "The player condition that makes mutation possible.",
    body: "Can a player express his strengths at a completely different height and density? Hybrid shapes only work if players can absorb multiple roles — so adaptability becomes the core competitive trait of the modern squad.",
  },
  {
    id: "signature-move",
    label: "Signature Move",
    ko: "시그니처 무브",
    category: "PLAYER",
    summary: "A player's on-ball habit fingerprint.",
    body: "Not every player can be a crack, but each should own one deeply-ingrained on-ball habit. In an era of man-marking pressure it is the individual answer that both escapes the press and creates — unique and, like a fingerprint, impossible to fully copy.",
  },
  {
    id: "pre-half-space",
    label: "Pre-Half Space",
    ko: "프리 하프스페이스",
    category: "ORIGINAL",
    summary: "jin's own named zone.",
    body: "The zone between the half-space and the final third, where an attacker receives before the defender can set his angle. Reception here forces a defensive decision a beat too early — the seam where variation becomes a goal.",
  },
  {
    id: "four-phase-cycle",
    label: "Four-Phase Cycle",
    ko: "4페이즈 순환",
    category: "STRUCTURE",
    summary: "The repeating cycle that conditions the opponent.",
    body: "Setup → advance → mutation/variable → penetrate, then reset. Each loop looks like a complete, 'real' attack, which is exactly why the opponent learns it — and why the variation inside the loop eventually breaks them.",
  },
  {
    id: "overload-isolation",
    label: "Overload to Isolation",
    ko: "오버로드 투 아이솔레이션",
    category: "STRUCTURE",
    summary: "Pull the block one way, isolate a 1v1 the other.",
    body: "Load bodies onto one side to drag the opponent's block across, opening a repeatable one-versus-one on the far flank. Used here as a Plan A− lure — a mechanism, not the end in itself.",
  },
  {
    id: "defensive-base",
    label: "Defensive Base",
    ko: "수비 2페이즈 구조",
    category: "DEFENCE",
    summary: "Remove options by structure, not psychology.",
    body: "Two phases split at the moment of loss: Phase 1 is a 7-second gegenpress window; Phase 2 is a structured mid-block. Where attack designs and violates expectation, defence simply closes the spaces and herds the opponent where you want them.",
  },
  {
    id: "kpi-lab",
    label: "Variation KPI Lab",
    ko: "변이 KPI 랩",
    category: "MEASURE",
    summary: "Measuring the un-measurable — and trying to break it.",
    body: "Custom metrics designed to test whether variation actually works: buffering windows, xT spikes, field tilt and PPDA read as evidence. The goal is not to decorate the theory with numbers but to try to falsify it.",
  },
];
