"use client";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";

const SECTIONS_BY_LOCALE: Record<Locale, { id: string; label: string }[]> = {
  en: [
    { id: "s1", label: "§1 THE STANDARDISED GAME" },
    { id: "s2", label: "§2 VARIABLE & MUTATION" },
    { id: "s3", label: "§3 LURE & SHOCK" },
    { id: "s4", label: "§4 TWO ENGINES" },
    { id: "s5", label: "§5 STRUCTURE" },
    { id: "s6", label: "§6 MEASUREMENT" },
    { id: "s7", label: "§7 FOR A CLUB" },
  ],
  ko: [
    { id: "s1", label: "§1 표준화된 게임" },
    { id: "s2", label: "§2 변수 & 변이" },
    { id: "s3", label: "§3 루어 앤 쇼크" },
    { id: "s4", label: "§4 두 개의 엔진" },
    { id: "s5", label: "§5 구조" },
    { id: "s6", label: "§6 측정" },
    { id: "s7", label: "§7 구단을 위해" },
  ],
};

export default function EssayNav({ locale = "en" }: { locale?: Locale }) {
  const SECTIONS = SECTIONS_BY_LOCALE[locale];
  const [active, setActive] = useState("s1");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const topMost = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b));
          setActive(topMost.target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px" }
    );
    els.forEach((el) => observer.observe(el));

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      setProgress(height > 0 ? Math.min(1, scrollTop / height) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <nav
      className="sticky top-0 z-10 flex gap-0.5 px-6 md:px-12 overflow-x-auto"
      style={{ background: "var(--stage-glass)", backdropFilter: "blur(16px)", borderBottom: "0.5px solid var(--edge-2)" }}
    >
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="mono whitespace-nowrap px-2.5 py-2.5 rounded-md transition-colors duration-150"
          style={{
            fontSize: 9.5,
            fontWeight: active === s.id ? 600 : 400,
            color: active === s.id ? "var(--green-bright)" : "var(--ink-3)",
            background: active === s.id ? "var(--green-soft)" : "transparent",
          }}
        >
          {s.label}
        </a>
      ))}
      <div className="absolute bottom-0 left-0 h-[2px]" style={{ width: `${progress * 100}%`, background: "var(--green-bright)", transition: "width 80ms linear" }} />
    </nav>
  );
}
