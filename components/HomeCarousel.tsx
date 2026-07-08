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

function TopLabel({ n, label }: { n: string; label: string }) {
  return (
    <div className="flex items-center gap-3 mb-9">
      <span className="display" style={{ fontSize: 17, color: C.green, letterSpacing: "0.02em" }}>{n}</span>
      <span className="mono" style={{ fontSize: 12, letterSpacing: "0.24em", textTransform: "uppercase", color: C.muted }}>{label}</span>
    </div>
  );
}

function cardShell(children: React.ReactNode, href: string) {
  return (
    <Link
      href={href}
      className="group flex flex-col h-full w-full rounded-[28px] p-11 md:p-12"
      style={{
        background: C.card,
        border: `0.5px solid ${C.edge}`,
        boxShadow: "0 40px 90px rgba(30,50,40,0.18)",
        transition: "border-color .4s var(--ease-out), box-shadow .4s var(--ease-out)",
      }}
      onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(31,122,61,0.45)"; el.style.boxShadow = "0 50px 110px rgba(20,50,30,0.26)"; }}
      onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = C.edge; el.style.boxShadow = "0 40px 90px rgba(30,50,40,0.18)"; }}
    >
      {children}
    </Link>
  );
}

const items: CarouselItem[] = [
  {
    key: "approach",
    content: cardShell(
      <>
        <TopLabel n="01" label="Approach" />
        <h2 className="display mb-7" style={{ fontSize: "clamp(28px,3vw,38px)", lineHeight: 1.06, color: C.ink, letterSpacing: "-0.028em" }}>
          It all started with<br />four questions.
        </h2>
        <ol className="flex flex-col gap-3.5 mb-auto">
          {QUESTIONS.map((q, i) => (
            <li key={i} className="flex gap-3" style={{ fontSize: 15, lineHeight: 1.4, color: C.ink2 }}>
              <span className="mono shrink-0" style={{ color: C.green, fontSize: 14, fontWeight: 500 }}>{i + 1}</span>
              <span>{q}</span>
            </li>
          ))}
        </ol>
        <span className="mono inline-flex items-center gap-2 mt-9" style={{ fontSize: 14, color: C.green }}>
          Enter <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
        </span>
      </>,
      "/approach",
    ),
  },
  {
    key: "match",
    content: cardShell(
      <>
        <TopLabel n="02" label="Match Analysis" />
        <h2 className="display mb-7" style={{ fontSize: "clamp(28px,3vw,38px)", lineHeight: 1.06, color: C.ink, letterSpacing: "-0.028em" }}>
          Variation Theory<br />applied &amp; analysed.
        </h2>
        <p className="mb-auto" style={{ fontSize: 17, lineHeight: 1.6, color: C.ink2 }}>
          Real match analysis and articles, written through the lens of Variation Theory.
        </p>
        <span className="mono inline-flex items-center gap-2 mt-9" style={{ fontSize: 14, color: C.green }}>
          Enter <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
        </span>
      </>,
      "/match-analysis",
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
        <Carousel3D items={items} cardWidth={500} cardHeight={462} angleStep={48} radius={480} dark={false} autoDrift={false} />
      </div>
    </section>
  );
}
