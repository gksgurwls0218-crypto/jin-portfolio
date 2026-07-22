"use client";
import type { ReactNode } from "react";
import MatchSectionShell from "./MatchSectionShell";
import { useLocale } from "@/lib/useLocale";

export default function DataLayer({ heading, children }: { heading: string; children: ReactNode }) {
  const kicker = useLocale() === "ko" ? "§4 / 데이터" : "§4 / DATA";
  return (
    <MatchSectionShell id="data" kicker={kicker} heading={heading}>
      <div className="flex flex-col gap-3.5">{children}</div>
    </MatchSectionShell>
  );
}
