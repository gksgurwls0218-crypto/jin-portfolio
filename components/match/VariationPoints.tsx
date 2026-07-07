import type { ReactNode } from "react";
import MatchSectionShell from "./MatchSectionShell";

export default function VariationPoints({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <MatchSectionShell id="variation-points" kicker="§3 / VARIATION POINTS" heading={heading}>
      {children}
    </MatchSectionShell>
  );
}
