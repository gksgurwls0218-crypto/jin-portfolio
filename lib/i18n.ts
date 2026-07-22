// ── i18n core ──────────────────────────────────────────────────────────────
// The site ships in two languages under /en and /ko path prefixes.
// Server components receive `locale` from the [locale] route param.
// Client components read it from the URL via the useLocale() hook below.

export const LOCALES = ["en", "ko"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(v: string | undefined | null): v is Locale {
  return v === "en" || v === "ko";
}

/** Pick one of a { en, ko } pair by locale. */
export function pick<T>(locale: Locale, pair: { en: T; ko: T }): T {
  return pair[locale];
}

// ── UI dictionary ────────────────────────────────────────────────────────────
// Short interface strings used across client components (nav, buttons, labels).
// Longer page copy lives with the page/lib data as { en, ko } pairs.
export const UI = {
  nav: {
    approach: { en: "Approach", ko: "변이 이론, Variation Theory" },
    match: { en: "Match Analysis", ko: "경기 분석" },
    kpi: { en: "KPI Lab", ko: "KPI 랩" },
    portfolio: { en: "JIN’S PORTFOLIO", ko: "JIN’S PORTFOLIO" },
  },
  common: {
    enter: { en: "Enter", ko: "들어가기" },
    viewAnalysis: { en: "View analysis", ko: "분석 보기" },
    threeWaysIn: { en: "Three ways in", ko: "세 가지 입구" },
    getInTouch: { en: "Get in touch", ko: "연락하기" },
    role: { en: "Jin · Tactical Analyst", ko: "Jin · 전술 분석관" },
    featured: { en: "FEATURED", ko: "주요 분석" },
  },
} as const;

/** Prefix an internal href with the active locale. Leaves hashes, mailto, http and
 *  already-prefixed paths untouched. */
export function withLocale(locale: Locale, href: string): string {
  if (!href || !href.startsWith("/")) return href; // #hash, mailto:, http(s)://, relative
  const seg = href.split("/")[1];
  if (isLocale(seg)) return href; // already prefixed
  return `/${locale}${href === "/" ? "" : href}`;
}
