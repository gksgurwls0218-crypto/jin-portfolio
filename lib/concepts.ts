// Single source of truth for concept chips. Both /approach (ConceptIndex, essay
// cross-links) and match pages (VariationPoint concept chips) resolve through
// this map so no anchor is ever hand-typed twice.

export type ConceptId =
  | "buffering"
  | "variable"
  | "mutation"
  | "lure-shock"
  | "plan-a-minus"
  | "two-engines"
  | "pre-half-space"
  | "hybrid-build"
  | "four-phase-cycle"
  | "kpi-fingerprint"
  | "falsification";

export type MatchEvidence = { slug: string; label: string };

export type ConceptMeta = {
  id: ConceptId;
  label: string;
  /** essay section anchor on /approach, e.g. "s2" */
  section: string;
  sectionLabel: string;
  /** shown in the /approach concept-index grid; false for link-only concepts */
  indexed: boolean;
  evidence: MatchEvidence[];
};

export const CONCEPTS: Record<ConceptId, ConceptMeta> = {
  buffering: {
    id: "buffering",
    label: "Buffering",
    section: "s1",
    sectionLabel: "§1 The standardised game",
    indexed: true,
    evidence: [{ slug: "psg-inter-ucl-2025", label: "PSG 5–0 Inter" }],
  },
  variable: {
    id: "variable",
    label: "Variable",
    section: "s2",
    sectionLabel: "§2 Two instruments: Variable and Mutation",
    indexed: true,
    evidence: [],
  },
  mutation: {
    id: "mutation",
    label: "Mutation",
    section: "s2",
    sectionLabel: "§2 Two instruments: Variable and Mutation",
    indexed: true,
    evidence: [{ slug: "psg-inter-ucl-2025", label: "PSG 5–0 Inter" }],
  },
  "lure-shock": {
    id: "lure-shock",
    label: "Lure & Shock",
    section: "s3",
    sectionLabel: "§3 Lure & Shock: conditioning as a weapon",
    indexed: true,
    evidence: [{ slug: "psg-inter-ucl-2025", label: "PSG 5–0 Inter" }],
  },
  "plan-a-minus": {
    id: "plan-a-minus",
    label: "Plan A−",
    section: "s3",
    sectionLabel: "§3 Lure & Shock: conditioning as a weapon",
    indexed: true,
    evidence: [],
  },
  "two-engines": {
    id: "two-engines",
    label: "Two Engines",
    section: "s4",
    sectionLabel: "§4 Why buffering happens: the two engines",
    indexed: true,
    evidence: [{ slug: "psg-inter-ucl-2025", label: "PSG 5–0 Inter" }],
  },
  "pre-half-space": {
    id: "pre-half-space",
    label: "Pre-Half Space",
    section: "s4",
    sectionLabel: "§4 Why buffering happens: the two engines",
    indexed: true,
    evidence: [{ slug: "psg-inter-ucl-2025", label: "PSG 5–0 Inter" }],
  },
  "hybrid-build": {
    id: "hybrid-build",
    label: "Hybrid 3-2/3-1",
    section: "s5",
    sectionLabel: "§5 The structure that pays for it",
    indexed: true,
    evidence: [],
  },
  "four-phase-cycle": {
    id: "four-phase-cycle",
    label: "Four-Phase Cycle",
    section: "s5",
    sectionLabel: "§5 The structure that pays for it",
    indexed: true,
    evidence: [{ slug: "psg-inter-ucl-2025", label: "PSG 5–0 Inter" }],
  },
  "kpi-fingerprint": {
    id: "kpi-fingerprint",
    label: "KPI Fingerprint",
    section: "s6",
    sectionLabel: "§6 Measuring it — and trying to break it",
    indexed: true,
    evidence: [],
  },
  falsification: {
    id: "falsification",
    label: "Falsification",
    section: "s6",
    sectionLabel: "§6 Measuring it — and trying to break it",
    indexed: false,
    evidence: [{ slug: "psg-inter-ucl-2025", label: "PSG 5–0 Inter" }],
  },
};

export function conceptHref(id: ConceptId): string {
  return `/approach#${CONCEPTS[id].section}`;
}

export const INDEXED_CONCEPTS: ConceptMeta[] = Object.values(CONCEPTS).filter(
  (c) => c.indexed
);
