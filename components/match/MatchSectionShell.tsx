import type { ReactNode } from "react";

type Props = {
  id: string;
  kicker: string;
  heading: string;
  children: ReactNode;
};

export default function MatchSectionShell({ id, kicker, heading, children }: Props) {
  return (
    <section id={id} className="scroll-mt-16 mt-12 first:mt-0">
      {kicker && (
        <span className="mono block mb-2" style={{ fontSize: 12, fontWeight: 500, color: "var(--green-mid)", letterSpacing: ".16em" }}>{kicker}</span>
      )}
      <h2 className="display mb-4" style={{ fontSize: "clamp(20px,2.4vw,26px)", lineHeight: 1.15, letterSpacing: "-0.02em", color: "var(--ink)" }}>{heading}</h2>
      {children}
    </section>
  );
}
