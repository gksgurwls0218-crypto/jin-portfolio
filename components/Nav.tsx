"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { UI, isLocale, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";
import LangSwitch from "@/components/LangSwitch";

const links = [
  { href: "/approach", key: "approach", index: "01" },
  { href: "/match-analysis", key: "match", index: "02" },
  { href: "/kpi-lab", key: "kpi", index: "03" },
] as const;

export default function Nav() {
  const pathname = usePathname() || "/";
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const seg = pathname.split("/")[1];
  const locale: Locale = isLocale(seg) ? seg : DEFAULT_LOCALE;
  const lp = (href: string) => `/${locale}${href}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes (a link was tapped).
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Lock background scroll while the full-screen mobile menu is open.
  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [menuOpen]);

  // The bar goes solid once scrolled OR while the menu overlay is open, so the
  // hamburger/close control always has a legible backdrop.
  const solid = scrolled || menuOpen;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-6 md:px-10"
      style={{
        height: 62,
        background: solid ? "rgba(255,255,255,0.86)" : "transparent",
        backdropFilter: solid ? "blur(18px) saturate(150%)" : "none",
        WebkitBackdropFilter: solid ? "blur(18px) saturate(150%)" : "none",
        boxShadow: solid ? "0 1px 0 var(--edge-2)" : "none",
        borderBottom: `0.5px solid ${solid ? "var(--edge-2)" : "transparent"}`,
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

        <span className="hidden md:block" style={{ width: 1, height: 14, background: "var(--edge-2)" }} />

        {/* ── desktop inline links (hidden on mobile) ── */}
        <div className="hidden md:flex items-center gap-1">
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
                  whiteSpace: "nowrap",
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

      <div className="flex items-center gap-2.5">
        {/* ── language switcher (always visible, desktop + mobile) ── */}
        <LangSwitch />

        {/* ── hamburger / close toggle (mobile only) ── */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden flex items-center justify-center rounded-full"
          style={{ width: 40, height: 40, border: "0.5px solid var(--edge-2)", background: "rgba(255,255,255,0.5)", color: "var(--ink)" }}
        >
          <span className="relative block" style={{ width: 16, height: 12 }}>
            <span style={{ position: "absolute", left: 0, right: 0, height: 1.5, borderRadius: 2, background: "currentColor", top: menuOpen ? 5 : 0, transform: menuOpen ? "rotate(45deg)" : "none", transition: "top .3s var(--ease-out), transform .3s var(--ease-out), opacity .3s" }} />
            <span style={{ position: "absolute", left: 0, right: 0, height: 1.5, borderRadius: 2, background: "currentColor", top: 5, opacity: menuOpen ? 0 : 1, transition: "opacity .2s" }} />
            <span style={{ position: "absolute", left: 0, right: 0, height: 1.5, borderRadius: 2, background: "currentColor", top: menuOpen ? 5 : 10, transform: menuOpen ? "rotate(-45deg)" : "none", transition: "top .3s var(--ease-out), transform .3s var(--ease-out)" }} />
          </span>
        </button>
      </div>

      {/* ── full-screen mobile menu overlay ── */}
      <div
        className="md:hidden fixed inset-0"
        style={{
          top: 62,
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(20px) saturate(150%)",
          WebkitBackdropFilter: "blur(20px) saturate(150%)",
          zIndex: 40,
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transform: menuOpen ? "translateY(0)" : "translateY(-8px)",
          transition: "opacity .3s var(--ease-out), transform .3s var(--ease-out)",
        }}
      >
        <div className="flex flex-col px-6 pt-6">
          {links.map((l, i) => {
            const active = pathname.startsWith(lp(l.href));
            return (
              <Link
                key={l.href}
                href={lp(l.href)}
                className="flex items-baseline gap-4 py-5"
                style={{
                  borderBottom: i < links.length - 1 ? "0.5px solid var(--edge)" : "none",
                  color: active ? "var(--green-bright)" : "var(--ink)",
                }}
              >
                <span className="mono" style={{ fontSize: 13, color: "var(--green-mid)", opacity: 0.8 }}>{l.index}</span>
                <span className="display" style={{ fontSize: "clamp(28px, 8vw, 40px)", letterSpacing: "-0.02em", lineHeight: 1 }}>
                  {UI.nav[l.key][locale]}
                </span>
              </Link>
            );
          })}

          {/* language control repeated at the bottom of the mobile menu, in its
              larger form — the top-bar pill is small on a phone and the menu is
              where a reader goes looking for site-level options. */}
          <div className="flex flex-col gap-3 pt-8">
            <span className="mono t-eyebrow" style={{ color: "var(--green-mid)", fontSize: 11, letterSpacing: "0.18em" }}>
              {UI.lang.label[locale]}
            </span>
            <LangSwitch size="large" />
            <p style={{ fontSize: 13, lineHeight: 1.55, color: "var(--ink-3)" }}>{UI.lang.note[locale]}</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
