import type { ReactNode } from "react";
import MatchSectionShell from "./MatchSectionShell";

export default function Context({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <MatchSectionShell id="context" kicker="" heading={heading}>
      <div className="space-y-3 max-w-[720px]" style={{ fontSize: 16.5, lineHeight: 1.75, color: "var(--ink-2)" }}>
        {children}
      </div>
    </MatchSectionShell>
  );
}
