"use client";
import { UI } from "@/lib/i18n";
import { useLocale } from "@/lib/useLocale";

// Presentational "Enter →" tag. Place inside a parent Link that has the
// `group` class; hovering the card underlines the word and slides the arrow.
export default function EnterTag({ color = "var(--green-bright)", label }: { color?: string; label?: string }) {
  const locale = useLocale();
  return (
    <span className="mono inline-flex items-center gap-2" style={{ fontSize: 13, color }}>
      <span className="border-b border-transparent group-hover:border-current pb-0.5 transition-colors duration-300">{label ?? UI.common.enter[locale]}</span>
      <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
    </span>
  );
}
