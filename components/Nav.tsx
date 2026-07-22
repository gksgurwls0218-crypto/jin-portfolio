"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { UI, LOCALES, isLocale, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

const links = [
  { href: "/approach", key: "approach", index: "01" },
  { href: "/match-analysis", key: "match", index: "02" },
  { href: "/kpi-lab", key: "kpi", index: "03" },
] as const;

export default function Nav() {
  const pathname = usePathname() || "/";
  const [scrolled, setScrolled] = useState(false);

  const seg = pathname.split("/")[1];
  const locale: Locale = isLocale(seg) ? seg : DEFAULT_LOCALE;
  // path without the locale prefix (e.g. "/approach" or "" for home)
  const rest = isLocale(seg) ? pathname.slice(("/" + seg).length) || "" : pathname === "/" ? "" : pathname;
  const swapHref = (l: Locale) => `/${l}${rest}`;
  const lp = (href: string) => `/${locale}${href}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10"
      style={{
        height: 62,
        background: scrolled ? "rgba(255,255,255,0.86)" : "transparent",
        backdropFilter: scrolled ? "blur(18px) saturate(150%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(18px) saturate(150%)" : "none",
        boxShadow: scrolled ? "0 1px 0 var(--edge-2)" : "none",
        borderBottom: `0.5px solid ${scrolled ? "var(--edge-2)" : "transparent"}`,
        transition: "background .4s var(--ease-out), border-color .4s var(--ease-out), backdrop-filter .4s var(--ease-out)",
      }}
    >
      <div className="flex items-center gap-2 md:gap-4">
        <Link
          href={`/${locale}`}
          className="mono flex items-center gap-2.5 group shrink-0"
          style={{ fontSize: 12, letterSpacing: "0.14em", color: "var(--ink)" }}
        >
          <span
            className="pulse-dot"
            style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green-bright)", display: "inline-block" }}
          />
          <span className="transition-colors duration-300 group-hover:text-[color:var(--ink)]">{UI.nav.portfolio[locale]}</span>
        </Link>

        <span className="hidden sm:block" style={{ width: 1, height: 14, background: "var(--edge-2)" }} />

        <div className="flex items-center gap-1">
          {links.map((l) => {
            const active = pathname.startsWith(lp(l.href));
            return (
              <Link
                key={l.href}
                href={lp(l.href)}
                className="mono relative flex items-center gap-1.5 px-3 md:px-4 py-2.5 rounded-full transition-all duration-300"
                style={{
                  fontSize: 13,
                  color: active ? "var(--green-bright)" : "var(--ink-2)",
                  background: active ? "var(--green-soft)" : "transparent",
                  border: `0.5px solid ${active ? "var(--green-line)" : "transparent"}`,
                }}
                onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.color = "var(--ink)"; }}
                onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.color = "var(--ink-2)"; }}
              >
                <span style={{ fontSize: 9.5, opacity: 0.7 }}>{l.index}</span>
                {UI.nav[l.key][locale]}
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── language switcher ── */}
      <div className="flex items-center gap-0.5 rounded-full p-0.5" style={{ border: "0.5px solid var(--edge-2)", background: "rgba(255,255,255,0.5)" }}>
        {LOCALES.map((l) => {
          const active = l === locale;
          return (
            <Link
              key={l}
              href={swapHref(l)}
              hrefLang={l}
              aria-label={l === "ko" ? "한국어" : "English"}
              className="mono rounded-full px-2.5 py-1 transition-colors duration-200"
              style={{
                fontSize: 11,
                letterSpacing: "0.08em",
                fontWeight: active ? 600 : 400,
                color: active ? "var(--green-bright)" : "var(--ink-3)",
                background: active ? "var(--green-soft)" : "transparent",
              }}
            >
              {l.toUpperCase()}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
