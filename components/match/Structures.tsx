"use client";
import type { ReactNode } from "react";
import MatchSectionShell from "./MatchSectionShell";
import { useLocale } from "@/lib/useLocale";

export default function Structures({ heading, children }: { heading: string; children: ReactNode }) {
  const kicker = useLocale() === "ko" ? "§2 / 구조" : "§2 / STRUCTURES";
  return (
    <MatchSectionShell id="structures" kicker={kicker} heading={heading}>
      <div className="space-y-3 max-w-[680px]" style={{ fontSize: 13.5, lineHeight: 1.8, color: "var(--ink-2)" }}>
        {children}
      </div>
    </MatchSectionShell>
  );
}
