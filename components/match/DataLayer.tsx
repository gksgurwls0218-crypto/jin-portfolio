import type { ReactNode } from "react";
import MatchSectionShell from "./MatchSectionShell";

export default function DataLayer({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <MatchSectionShell id="data" kicker="§4 / DATA" heading={heading}>
      <div className="flex flex-col gap-3.5">{children}</div>
    </MatchSectionShell>
  );
}
