"use client";
import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "s1", label: "§1 THE STANDARDISED GAME" },
  { id: "s2", label: "§2 VARIABLE & MUTATION" },
  { id: "s3", label: "§3 LURE & SHOCK" },
  { id: "s4", label: "§4 TWO ENGINES" },
  { id: "s5", label: "§5 STRUCTURE" },
  { id: "s6", label: "§6 MEASUREMENT" },
  { id: "s7", label: "§7 FOR A CLUB" },
];

export default function EssayNav() {
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
      style={{ background: "rgba(7,7,15,.92)", backdropFilter: "blur(16px)", borderBottom: "0.5px solid rgba(255,255,255,.07)" }}
    >
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="mono whitespace-nowrap px-2.5 py-2.5 rounded-md transition-colors duration-150"
          style={{
            fontSize: 9.5,
            color: active === s.id ? "rgba(185,205,255,.96)" : "rgba(255,255,255,.42)",
            background: active === s.id ? "rgba(80,115,255,.18)" : "transparent",
          }}
        >
          {s.label}
        </a>
      ))}
      <div className="absolute bottom-0 left-0 h-[2px]" style={{ width: `${progress * 100}%`, background: "rgba(120,155,255,.8)", transition: "width 80ms linear" }} />
    </nav>
  );
}
