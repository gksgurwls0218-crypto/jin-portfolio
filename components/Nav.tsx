"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/approach", label: "Approach", index: "01" },
  { href: "/match-analysis", label: "Match Analysis", index: "02" },
  { href: "/kpi-lab", label: "KPI Lab", index: "03" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

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
        background: scrolled ? "#06090b" : "transparent",
        backdropFilter: scrolled ? "blur(18px) saturate(150%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(18px) saturate(150%)" : "none",
        boxShadow: scrolled ? "0 1px 0 var(--edge-2)" : "none",
        borderBottom: `0.5px solid ${scrolled ? "var(--edge-2)" : "transparent"}`,
        transition: "background .4s var(--ease-out), border-color .4s var(--ease-out), backdrop-filter .4s var(--ease-out)",
      }}
    >
      <div className="flex items-center gap-2 md:gap-4">
        <Link
          href="/"
          className="mono flex items-center gap-2.5 group shrink-0"
          style={{ fontSize: 11, letterSpacing: "0.16em", color: "var(--ink-2)" }}
        >
          <span
            className="pulse-dot"
            style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green-bright)", display: "inline-block" }}
          />
          <span className="transition-colors duration-300 group-hover:text-[color:var(--ink)]">JIN&rsquo;S PORTFOLIO</span>
        </Link>

        <span className="hidden sm:block" style={{ width: 1, height: 14, background: "var(--edge-2)" }} />

        <div className="flex items-center gap-1">
          {links.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className="mono relative flex items-center gap-1.5 px-2.5 md:px-3.5 py-2 rounded-full transition-all duration-300"
                style={{
                  fontSize: 12,
                  color: active ? "var(--green-bright)" : "var(--ink-3)",
                  background: active ? "var(--green-soft)" : "transparent",
                  border: `0.5px solid ${active ? "var(--green-line)" : "transparent"}`,
                }}
                onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.color = "var(--ink)"; }}
                onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.color = "var(--ink-3)"; }}
              >
                <span style={{ fontSize: 9, opacity: 0.6 }}>{l.index}</span>
                {l.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
