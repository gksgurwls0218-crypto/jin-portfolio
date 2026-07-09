import Link from "next/link";

export type Badge = { label: string; color: string; bg: string; border: string };
export type Block = { label: string; text: string };

export default function KpiDetail({
  backHref, backLabel, kicker, title, badge, blocks,
}: { backHref: string; backLabel: string; kicker: string; title: string; badge?: Badge; blocks: Block[] }) {
  return (
    <section className="relative px-6 md:px-10 pt-32 pb-40" style={{ background: "var(--stage)" }}>
      <div className="max-w-[760px] mx-auto">
        <Link
          href={backHref}
          className="mono inline-flex items-center gap-2 mb-14 transition-colors duration-300 hover:[color:var(--green-bright)]"
          style={{ fontSize: 12, color: "var(--ink-3)" }}
        >
          ← {backLabel}
        </Link>

        <div className="flex items-center gap-3 mb-5">
          <span className="mono" style={{ fontSize: 12, letterSpacing: "0.1em", color: "var(--green-mid)" }}>{kicker}</span>
          {badge && (
            <span className="mono" style={{ fontSize: 10, fontWeight: 500, color: badge.color, padding: "3px 9px", borderRadius: 20, background: badge.bg, border: `0.5px solid ${badge.border}` }}>{badge.label}</span>
          )}
        </div>

        <h1 className="display mb-14" style={{ fontSize: "clamp(32px,5vw,52px)", lineHeight: 1.04, letterSpacing: "-0.03em", color: "var(--ink)" }}>{title}</h1>

        <div className="flex flex-col gap-10">
          {blocks.map((b) => (
            <div key={b.label}>
              <p className="mono mb-4" style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--green-bright)" }}>{b.label}</p>
              <p style={{ fontSize: 17.5, lineHeight: 1.75, color: "var(--ink)" }}>{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
