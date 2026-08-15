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
  // Language control + the bilingual-authorship claim. Korean readers should be
  // able to see, on the home page, that the English edition is written by Jin
  // himself rather than machine-translated — it is part of what the portfolio
  // is claiming about him.
  lang: {
    label: { en: "LANGUAGE / 언어", ko: "언어 / LANGUAGE" },
    note: {
      en: "Every analysis on this site is written by me in both English and Korean. Neither edition is a translation of the other.",
      ko: "이 사이트의 모든 분석은 제가 한국어와 영어로 직접 작성합니다. 어느 쪽도 번역본이 아닙니다.",
    },
    // Short form for the hero strip.
    heroNote: {
      en: "Written by me in English and Korean — neither version is a translation",
      ko: "한국어와 영어로 직접 작성합니다 — 영문판은 번역본이 아닙니다",
    },
    // Call to action that flips the locale.
    swapCta: { en: "한국어로 읽기", ko: "Read in English" },
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
