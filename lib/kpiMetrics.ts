/* Data & KPI Lab content.
   Two groups:
   1) STANDARD — established metrics jin applies (the toolbox).
   2) LAB — KPIs jin designed / re-applied to measure Variation directly.
      Status + type mirror wiki/synthesis/jin_kpi_lab.md. Edit freely. */

export type Standard = {
  abbr: string;
  name: string;
  measures: string;   // what it measures
  question: string;   // the tactical question it answers
};

export const STANDARD: Standard[] = [
  { abbr: "xT",   name: "Expected Threat",       measures: "How much an on-ball action raises scoring probability by moving the ball to a more dangerous zone.", question: "Where does progression actually create danger?" },
  { abbr: "VAEP", name: "Valuing Actions (VAEP)", measures: "Values every action by its effect on both scoring and conceding probability.", question: "What is each action really worth, at both ends?" },
  { abbr: "OBV",  name: "On-Ball Value",         measures: "The change in a team's expected goals produced by a single on-ball action.", question: "Which individual actions move the needle?" },
  { abbr: "EPV",  name: "Expected Possession Value", measures: "The value of the current possession state before the next action is taken.", question: "How valuable is this moment on the pitch?" },
  { abbr: "PSxG", name: "Post-Shot xG",          measures: "Shot quality after the strike, factoring in placement and contact.", question: "Finishing and shot-stopping over/under-performance." },
  { abbr: "FT",   name: "Field Tilt",            measures: "A team's share of final-third possession — territorial dominance.", question: "Who controls the dangerous third?" },
  { abbr: "PPDA", name: "Passes per Defensive Action", measures: "Opponent passes allowed per defensive action in their build-up zone.", question: "How aggressively does the team press?" },
  { abbr: "FTO",  name: "Forced Turnover",       measures: "Turnovers won through active defensive pressure.", question: "Does the defence create the springboard for transition?" },
  { abbr: "PP",   name: "Progressive Pass / Carry", measures: "Passes and carries that move the ball meaningfully toward goal.", question: "Who drives progression — and how?" },
  { abbr: "RFT",  name: "Receptions in Final Third", measures: "Receiving the ball inside the final third.", question: "Who gets the ball into dangerous receiving zones?" },
  { abbr: "DLB",  name: "Defensive Line Break",  measures: "Actions that break through the opponent's defensive line.", question: "Does build-up actually penetrate the block?" },
  { abbr: "PN",   name: "Pass Network",          measures: "The map of pass connections and average positions.", question: "What is the team's real shape, and who connects it?" },
];

export type LabType = "Combination" | "Re-application" | "Theory-derived";
export type LabStatus = "concept" | "draft" | "live";

export type LabKpi = {
  code: string;
  name: string;
  type: LabType;
  status: LabStatus;
  note: string;
};

export const LAB: LabKpi[] = [
  { code: "2-2", name: "DLB → RFT Conversion",        type: "Combination",    status: "draft",   note: "Share of line-breaks that reach a final-third reception — does Plan A carry through to the finish?" },
  { code: "2-3", name: "xT Spike-Timing Deviation",   type: "Re-application", status: "draft",   note: "The variance in *when* high-xT actions fire — variation means the opponent can't predict the moment." },
  { code: "3-2", name: "Reverse PPDA",                type: "Re-application", status: "draft",   note: "Pressing read from the attacking side — how the opponent's press is baited and then beaten." },
  { code: "E-2", name: "Attacking-Channel Entropy",   type: "Theory-derived", status: "draft",   note: "How unpredictably attacks are spread across channels, measured as information entropy." },
  { code: "E-4", name: "Final-Third Receiver Entropy", type: "Theory-derived", status: "draft",  note: "How unpredictable the final-third receiver is — the attack with no fixed reference point." },
  { code: "S-1", name: "Match xT Variance",           type: "Re-application", status: "concept", note: "Season-scale spread of match xT — the low-then-spike signature of Lure & Shock." },
  { code: "S-2", name: "Plan-A Completion Rate",      type: "Combination",    status: "concept", note: "Share of matches in which the full attacking cycle actually completes." },
  { code: "S-3", name: "Scoring-Pattern Entropy",     type: "Theory-derived", status: "concept", note: "How varied the goal-scoring patterns are across a season." },
  { code: "S-4", name: "Tactical-Response Diversity",  type: "Re-application", status: "concept", note: "Breadth of responses to different opponent setups (observation-supported)." },
  { code: "M-1", name: "xT Spike-Frequency Trend",    type: "Re-application", status: "concept", note: "Multi-season trend in how often high-xT spikes are generated." },
  { code: "M-2", name: "Pass-Network Dispersion Trend", type: "Re-application", status: "concept", note: "Multi-season trend in how distributed the passing network is." },
  { code: "M-3", name: "New-Signing Adaptation Window", type: "Combination",  status: "concept", note: "How quickly new players reach the system's variation output." },
];
