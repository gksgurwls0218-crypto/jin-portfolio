import type { ReactNode } from "react";
import MatchSectionShell from "./MatchSectionShell";

export default function Context({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <MatchSectionShell id="context" kicker="" heading={heading}>
      <div className="mh-prose">
        {children}
      </div>
    </MatchSectionShell>
  );
}
