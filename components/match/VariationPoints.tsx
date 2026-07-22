"use client";
import type { ReactNode } from "react";
import MatchSectionShell from "./MatchSectionShell";
import { useLocale } from "@/lib/useLocale";

export default function VariationPoints({ heading, children }: { heading: string; children: ReactNode }) {
  const kicker = useLocale() === "ko" ? "§3 / 변이 포인트" : "§3 / VARIATION POINTS";
  return (
    <MatchSectionShell id="variation-points" kicker={kicker} heading={heading}>
      {children}
    </MatchSectionShell>
  );
}
