import type { ReactNode } from "react";
import MatchSectionShell from "./MatchSectionShell";

export default function Structures({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <MatchSectionShell id="structures" kicker="§2 / STRUCTURES" heading={heading}>
      <div className="space-y-3 max-w-[680px]" style={{ fontSize: 13.5, lineHeight: 1.8, color: "rgba(222,216,206,.88)" }}>
        {children}
      </div>
    </MatchSectionShell>
  );
}
