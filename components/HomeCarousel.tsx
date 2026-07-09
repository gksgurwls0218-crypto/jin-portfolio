"use client";
import Link from "next/link";
import Carousel3D, { type CarouselItem } from "@/components/Carousel3D";

// Hardcoded light-page colours (independent of CSS custom properties, so the
// card text is always dark and legible on the white carousel page).
const C = {
  card: "#ffffff",
  ink: "#16201a",
  ink2: "#46524a",
  muted: "#8a938b",
  green: "#1f7a3d",
  edge: "rgba(18,24,20,0.10)",
};

const QUESTIONS = [
  "How do you break down a set defensive block?",
  "Is the era of one fixed Plan A — for a match, for a season — over?",
  "How do you cope with football stretched to a 100-minute game?",
  "How do you draw out players' creativity and initiative?",
];

function Card({ n, label, title, href, children }: { n: string; label: string; title: React.ReactNode; href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group flex flex-col h-full w-full rounded-[28px] px-12 py-12 md:px-14 md:py-14"
      style={{
        background: C.card,
        border: `0.5px solid ${C.edge}`,
        boxShadow: "0 40px 90px rgba(30,50,40,0.18)",
        transition: "border-color .4s var(--ease-out), box-shadow .4s var(--ease-out)",
      }}
      onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(31,122,61,0.45)"; el.style.boxShadow = "0 50px 110px rgba(20,50,30,0.26)"; }}
      onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = C.edge; el.style.boxShadow = "0 40px 90px rgba(30,50,40,0.18)"; }}
    >
      <div className="flex items-center gap-3 mb-9">
        <span className="display" style={{ fontSize: 17, color: C.green, letterSpacing: "0.02em" }}>{n}</span>
        <span className="mono" style={{ fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", color: C.muted }}>{label}</span>
      </div>

      <h2 className="display mb-9" style={{ fontSize: "clamp(25px,2.7vw,33px)", lineHeight: 1.12, color: C.ink, letterSpacing: "-0.025em" }}>
        {title}
      </h2>

      <div>{children}</div>

      <div className="mt-auto pt-8" style={{ borderTop: `0.5px solid ${C.edge}` }}>
        <span className="mono inline-flex items-center gap-2" style={{ fontSize: 14, color: C.green }}>
          Enter <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
        </span>
      </div>
    </Link>
  );
}

const items: CarouselItem[] = [
  {
    key: "approach",
    content: (
      <Card n="01" label="Approach" href="/approach" title={<>It all started with<br />four questions.</>}>
        <ol className="flex flex-col gap-5">
          {QUESTIONS.map((q, i) => (
            <li key={i} className="flex gap-4" style={{ fontSize: 15.5, lineHeight: 1.5, color: C.ink2 }}>
              <span className="mono shrink-0" style={{ color: C.green, fontSize: 14, fontWeight: 500, paddingTop: 1 }}>{i + 1}</span>
              <span>{q}</span>
            </li>
          ))}
        </ol>
      </Card>
    ),
  },
  {
    key: "match",
    content: (
      <Card n="02" label="Match Analysis" href="/match-analysis" title={<>Variation Theory<br />applied &amp; analysed.</>}>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: C.ink2 }}>
          Real match analysis and articles, written through the lens of Variation Theory.
        </p>
      </Card>
    ),
  },
  {
    key: "kpi",
    content: (
      <Card n="03" label="Data & KPI Lab" href="/kpi-lab" title={<>Measured,<br />not romanticised.</>}>
        <p className="mb-5" style={{ fontSize: 17, lineHeight: 1.7, color: C.ink2 }}>
          The metrics I read matches with — and the original KPIs I&rsquo;m building to measure Variation directly.
        </p>
        <p style={{ fontSize: 14, lineHeight: 1.6, color: C.muted }}>
          xT · VAEP · field tilt · PPDA — plus a lab of metrics of my own.
        </p>
      </Card>
    ),
  },
];

export default function HomeCarousel() {
  return (
    <section
      className="relative flex flex-col items-center justify-center px-6"
      style={{
        minHeight: "155vh",
        background:
          "linear-gradient(to bottom, var(--stage) 0%, #aebecb 12%, #d7e2ea 26%, #eef3f7 40%, #f6f9fc 50%, #eef3f7 64%, #d7e2ea 78%, #aebecb 89%, var(--stage) 100%)",
      }}
    >
      <div className="w-full max-w-[1240px] mx-auto">
        <Carousel3D items={items} cardWidth={520} cardHeight={520} angleStep={46} radius={500} dark={false} autoDrift={false} />
      </div>
    </section>
  );
}
