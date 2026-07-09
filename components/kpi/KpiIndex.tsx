"use client";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import EnterTag from "@/components/EnterTag";

export type Badge = { label: string; color: string; bg: string; border: string };
export type IndexItem = { href: string; title: string; sub: string; short: string; badge?: Badge };

function enter(on: boolean) {
  return (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.style.borderColor = on ? "var(--green-line)" : "var(--edge)";
    el.style.transform = on ? "translateY(-5px)" : "translateY(0)";
    el.style.boxShadow = on ? "var(--lift), var(--glow)" : "none";
  };
}

export default function KpiIndex({
  eyebrow, title, accent, intro, items,
}: { eyebrow: string; title: string; accent: string; intro: string; items: IndexItem[] }) {
  return (
    <section className="relative px-6 md:px-10 pt-32 pb-40" style={{ background: "var(--stage)" }}>
      <div className="max-w-[1180px] mx-auto">
        <Reveal>
          <Link href="/kpi-lab" className="mono inline-flex items-center gap-2 mb-10 transition-colors duration-300" style={{ fontSize: 12, color: "var(--ink-3)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--green-bright)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--ink-3)")}>
            ← Data &amp; KPI Lab
          </Link>
          <p className="mono t-eyebrow kicker mb-6">{eyebrow}</p>
          <h1 className="display t-section mb-8" style={{ color: "var(--ink)", maxWidth: 900 }}>{title} <span style={{ color: "var(--green-bright)" }}>{accent}</span></h1>
          <p className="mb-20" style={{ color: "var(--ink-2)", fontSize: "clamp(15px,1.5vw,18px)", lineHeight: 1.6, maxWidth: 660 }}>{intro}</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {items.map((it, i) => (
            <Reveal key={it.href} delay={(i % 3) * 70}>
              <Link
                href={it.href}
                className="group flex flex-col h-full rounded-2xl p-7"
                style={{ background: "var(--stage-3)", border: "0.5px solid var(--edge)", minHeight: 210, transition: "transform .4s var(--ease-out), border-color .4s var(--ease-out), box-shadow .4s var(--ease-out)" }}
                onMouseEnter={enter(true)} onMouseLeave={enter(false)}
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="mono" style={{ fontSize: 10.5, color: "var(--ink-4)", letterSpacing: "0.06em" }}>{it.sub}</span>
                  {it.badge && (
                    <span className="mono" style={{ fontSize: 10, fontWeight: 500, color: it.badge.color, padding: "3px 9px", borderRadius: 20, background: it.badge.bg, border: `0.5px solid ${it.badge.border}` }}>{it.badge.label}</span>
                  )}
                </div>
                <h2 className="display mb-3" style={{ fontSize: 18, color: "var(--ink)", lineHeight: 1.14, letterSpacing: "-0.01em" }}>{it.title}</h2>
                <p className="mb-6" style={{ fontSize: 13.5, lineHeight: 1.6, color: "var(--ink-2)" }}>{it.short}</p>
                <div className="mt-auto pt-4" style={{ borderTop: "0.5px solid var(--edge)" }}>
                  <EnterTag />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
