"use client";
import Link from "next/link";
import Carousel3D, { type CarouselItem } from "@/components/Carousel3D";

// Card colours pull from the shared token system so the cards read
// consistently wherever they sit — including floating on the solid
// accent "signal" band below.
const C = {
  card: "var(--stage-3)",
  ink: "var(--ink)",
  ink2: "var(--ink-2)",
  muted: "var(--ink-4)",
  green: "var(--green-mid)",
  edge: "var(--edge)",
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
      onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--green-line)"; el.style.boxShadow = "0 50px 110px rgba(20,50,30,0.26)"; }}
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
          <span className="border-b border-transparent group-hover:border-current pb-0.5 transition-colors duration-300">Enter</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
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
      <Card n="02" label="Match Analysis & Essays" href="/match-analysis" title={<>Variation Theory<br />applied &amp; written.</>}>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: C.ink2 }}>
          Real match breakdowns — and original tactical essays — written through the lens of Variation Theory.
        </p>
      </Card>
    ),
  },
  {
    key: "kpi",
    content: (
      <Card n="03" label="Advanced Data & KPI Lab" href="/kpi-lab" title={<>Could be reckless,<br />or innovative.</>}>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: C.ink2 }}>
          A room for advanced data &amp; KPIs to prove Variation Theory. Additionally, a room to think of something new by stepping off the beaten track. Could be reckless — but innovative as well.
        </p>
      </Card>
    ),
  },
];

export default function HomeCarousel() {
  return (
    <section
      className="band-signal relative flex flex-col items-center justify-center px-6"
      style={{ minHeight: "155vh" }}
    >
      <div className="w-full max-w-[1240px] mx-auto">
        <p className="mono t-eyebrow kicker mb-10 justify-center md:justify-start" style={{ letterSpacing: "0.22em" }}>
          Three ways in
        </p>
        <Carousel3D items={items} cardWidth={520} cardHeight={520} angleStep={46} radius={500} dark autoDrift={false} />
      </div>
    </section>
  );
}
