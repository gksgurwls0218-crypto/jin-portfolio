"use client";
import Link from "next/link";
import Carousel3D, { type CarouselItem } from "@/components/Carousel3D";

const QUESTIONS = [
  "How do you break down a set defensive block?",
  "Is the era of one fixed Plan A — for a match, for a season — over?",
  "How do you cope with football stretched to a 100-minute game?",
  "How do you draw out players' creativity and initiative?",
];

function cardShell(children: React.ReactNode, href: string) {
  return (
    <Link
      href={href}
      className="group flex flex-col h-full w-full rounded-[26px] p-10 md:p-11"
      style={{
        background: "var(--paper-card)",
        border: "0.5px solid var(--edge-dark)",
        boxShadow: "var(--lift-light)",
        transition: "border-color .4s var(--ease-out), box-shadow .4s var(--ease-out)",
      }}
      onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "rgba(31,122,61,0.4)"; el.style.boxShadow = "0 40px 90px rgba(20,40,25,0.22)"; }}
      onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.borderColor = "var(--edge-dark)"; el.style.boxShadow = "var(--lift-light)"; }}
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
        <div className="flex items-center justify-between mb-8">
          <span className="display" style={{ fontSize: 15, color: "var(--accent-green)", letterSpacing: "0.05em" }}>01</span>
          <span className="mono t-eyebrow" style={{ color: "var(--ink-dark-3)" }}>Approach</span>
        </div>
        <h2 className="display mb-6" style={{ fontSize: "clamp(24px,2.6vw,32px)", lineHeight: 1.08, color: "var(--ink-dark)", letterSpacing: "-0.025em" }}>
          It all started with<br />four questions.
        </h2>
        <ol className="flex flex-col gap-2.5 mb-auto">
          {QUESTIONS.map((q, i) => (
            <li key={i} className="flex gap-2.5" style={{ fontSize: 13, lineHeight: 1.4, color: "var(--ink-dark-2)" }}>
              <span className="mono shrink-0" style={{ color: "var(--accent-green)", fontSize: 12 }}>{i + 1}</span>
              <span>{q}</span>
            </li>
          ))}
        </ol>
        <span className="mono inline-flex items-center gap-2 mt-7" style={{ fontSize: 13, color: "var(--accent-green)" }}>
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
        <div className="flex items-center justify-between mb-8">
          <span className="display" style={{ fontSize: 15, color: "var(--accent-green)", letterSpacing: "0.05em" }}>02</span>
          <span className="mono t-eyebrow" style={{ color: "var(--ink-dark-3)" }}>Match Analysis</span>
        </div>
        <h2 className="display mb-6" style={{ fontSize: "clamp(24px,2.6vw,32px)", lineHeight: 1.08, color: "var(--ink-dark)", letterSpacing: "-0.025em" }}>
          Variation Theory<br />applied &amp; analysed.
        </h2>
        <p className="mb-auto" style={{ fontSize: 15, lineHeight: 1.6, color: "var(--ink-dark-2)" }}>
          Real match analysis and articles, written through the lens of Variation Theory.
        </p>
        <span className="mono inline-flex items-center gap-2 mt-7" style={{ fontSize: 13, color: "var(--accent-green)" }}>
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
        minHeight: "175vh",
        background: "linear-gradient(to bottom, var(--stage) 0%, var(--paper) 22%, var(--paper) 78%, var(--stage) 100%)",
      }}
    >
      <div className="w-full max-w-[1180px] mx-auto">
        <Carousel3D items={items} cardWidth={440} cardHeight={400} angleStep={44} radius={380} dark={false} />
      </div>
    </section>
  );
}
