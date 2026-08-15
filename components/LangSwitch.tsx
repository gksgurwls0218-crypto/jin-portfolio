"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, isLocale, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

/** Label shown on each segment. Native name first — a Korean reader should be able
 *  to recognise their own language without translating the control itself. */
const LABEL: Record<Locale, { short: string; full: string; aria: string }> = {
  ko: { short: "한국어", full: "한국어", aria: "한국어로 보기" },
  en: { short: "ENG", full: "English", aria: "View in English" },
};

/**
 * Language switcher.
 *
 * Restored and rebuilt 2026-08-11: the previous version rendered two 11px
 * "EN"/"KO" glyphs inside a 0.5px hairline pill. After the charcoal monotone
 * redesign turned --green-bright from a bright accent into #33332f, the active
 * segment lost its only visual anchor and the whole control read as blank space
 * on the white hero. It was present in the DOM but invisible in practice.
 *
 * This version keeps the same routing behaviour (swap the locale segment, keep
 * the rest of the path) and fixes the legibility:
 *   - solid 1px border + white surface, so the control has an edge on any band
 *   - active segment is a filled charcoal chip with paper-coloured text
 *   - native language names instead of two-letter codes
 *   - a globe mark, so it reads as a language control before it is read at all
 */
export default function LangSwitch({ size = "bar" }: { size?: "bar" | "large" }) {
  const pathname = usePathname() || "/";
  const seg = pathname.split("/")[1];
  const locale: Locale = isLocale(seg) ? seg : DEFAULT_LOCALE;
  const rest = isLocale(seg)
    ? pathname.slice(("/" + seg).length) || ""
    : pathname === "/" ? "" : pathname;

  const large = size === "large";
  const fs = large ? 14 : 12;
  const px = large ? 16 : 11;
  const py = large ? 8 : 5;

  return (
    <div
      className="inline-flex items-center rounded-full"
      style={{
        gap: 2,
        padding: 3,
        border: "1px solid var(--edge-2)",
        background: "#ffffff",
        boxShadow: "var(--lift-light)",
      }}
    >
      <span
        aria-hidden
        className="inline-flex items-center justify-center"
        style={{ width: large ? 22 : 18, marginLeft: large ? 6 : 4, color: "var(--ink-3)" }}
      >
        <svg width={large ? 15 : 13} height={large ? 15 : 13} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
          <circle cx="8" cy="8" r="6.4" />
          <ellipse cx="8" cy="8" rx="2.7" ry="6.4" />
          <path d="M1.7 6h12.6M1.7 10h12.6" />
        </svg>
      </span>

      {LOCALES.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={`/${l}${rest}`}
            hrefLang={l}
            aria-label={LABEL[l].aria}
            aria-current={active ? "true" : undefined}
            title={LABEL[l].aria}
            className="mono rounded-full transition-colors duration-200"
            style={{
              fontSize: fs,
              lineHeight: 1,
              padding: `${py}px ${px}px`,
              letterSpacing: l === "en" ? "0.10em" : "0.02em",
              fontWeight: active ? 600 : 500,
              color: active ? "var(--signal-ink)" : "var(--ink-2)",
              background: active ? "var(--green-bright)" : "transparent",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = "var(--green-soft)"; }}
            onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
          >
            {large ? LABEL[l].full : LABEL[l].short}
          </Link>
        );
      })}
    </div>
  );
}
