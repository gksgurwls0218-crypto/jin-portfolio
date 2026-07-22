"use client";
import Link from "@/components/LocaleLink";
import Reveal from "@/components/Reveal";
import EnterTag from "@/components/EnterTag";

export type Door = { href: string; n: string; label: string; title: string; desc?: string };

export default function DoorLanding({
  eyebrow, title, accent, intro, doors,
}: { eyebrow: string; title: string; accent: string; intro: string; doors: Door[] }) {
  return (
    <section className="relative px-6 md:px-10 pt-44 pb-40" style={{ background: "var(--stage)" }}>
      <div className="max-w-[1120px] mx-auto">
        <Reveal>
          <p className="mono t-eyebrow kicker mb-7">{eyebrow}</p>
          <h1 className="display t-section mb-8" style={{ color: "var(--ink)", maxWidth: 940 }}>
            {title}<br />
            <span style={{ color: "var(--green-bright)" }}>{accent}</span>
          </h1>
          <p className="mb-20" style={{ color: "var(--ink-2)", fontSize: "clamp(16px,1.6vw,19px)", lineHeight: 1.6, maxWidth: 660 }}>{intro}</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
          {doors.map((d, i) => (
            <Reveal key={d.href} delay={i * 110}>
              <Link
                href={d.href}
                className="group flex flex-col justify-between rounded-[24px] p-10 md:p-12 h-full"
                style={{ background: "var(--stage-3)", border: "0.5px solid var(--edge)", minHeight: 300, transition: "transform .45s var(--ease-out), border-color .45s var(--ease-out), box-shadow .45s var(--ease-out)" }}
                onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-6px)"; el.style.borderColor = "var(--green-line)"; el.style.boxShadow = "var(--lift), var(--glow)"; }}
                onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.borderColor = "var(--edge)"; el.style.boxShadow = "none"; }}
              >
                <div>
                  <div className="flex items-baseline gap-2.5 mb-8">
                    <span className="display" style={{ fontSize: 17, color: "var(--green-bright)" }}>{d.n}</span>
                    <span className="mono" style={{ fontSize: 12.5, fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--green-mid)" }}>{d.label}</span>
                  </div>
                  <h2 className="display mb-4" style={{ fontSize: "clamp(24px,2.6vw,32px)", lineHeight: 1.08, color: "var(--ink)", letterSpacing: "-0.02em" }}>{d.title}</h2>
                  {d.desc && <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--ink-2)", maxWidth: 420 }}>{d.desc}</p>}
                </div>
                <div className="mt-10 pt-6" style={{ borderTop: "0.5px solid var(--edge)" }}>
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
