"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { UI, isLocale, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

/**
 * A one-line statement that both editions of the site are written by Jin, plus a
 * link that flips the locale on the current page.
 *
 * Why it exists: the portfolio's claim is not only "I analyse football" but "I
 * analyse it in English as well as Korean". A bare EN/KO toggle in the nav does
 * not say that — it reads as a translation button. This strip says it in words,
 * on the home page, where a Korean visitor lands.
 */
export default function BilingualNote({ tone = "light" }: { tone?: "light" | "muted" }) {
  const pathname = usePathname() || "/";
  const seg = pathname.split("/")[1];
  const locale: Locale = isLocale(seg) ? seg : DEFAULT_LOCALE;
  const other: Locale = locale === "ko" ? "en" : "ko";
  const rest = isLocale(seg)
    ? pathname.slice(("/" + seg).length) || ""
    : pathname === "/" ? "" : pathname;

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <span
        className="mono inline-flex items-center rounded-full"
        style={{
          fontSize: 10,
          letterSpacing: "0.16em",
          padding: "4px 9px",
          color: "var(--signal-ink)",
          background: "var(--green-bright)",
          whiteSpace: "nowrap",
        }}
      >
        KO / EN
      </span>

      <span
        style={{
          fontSize: "clamp(13px, 1.4vw, 15px)",
          lineHeight: 1.5,
          color: tone === "muted" ? "var(--ink-3)" : "var(--ink-2)",
        }}
      >
        {UI.lang.heroNote[locale]}
      </span>

      <Link
        href={`/${other}${rest}`}
        hrefLang={other}
        className="mono inline-flex items-center gap-1.5 rounded-full transition-colors duration-200"
        style={{
          fontSize: 12,
          padding: "6px 13px",
          border: "1px solid var(--green-line)",
          color: "var(--green-bright)",
          background: "transparent",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.background = "var(--green-bright)";
          el.style.color = "var(--signal-ink)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          el.style.background = "transparent";
          el.style.color = "var(--green-bright)";
        }}
      >
        {UI.lang.swapCta[locale]}
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
