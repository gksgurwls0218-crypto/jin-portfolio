import type { ReactNode } from "react";

type Props = {
  id: string;
  kicker: string;
  heading: string;
  children: ReactNode;
};

export default function MatchSectionShell({ id, kicker, heading, children }: Props) {
  return (
    <section id={id} className="scroll-mt-16 mt-10 first:mt-0">
      <span className="mono block mb-1.5" style={{ fontSize: 10, color: "var(--amber-dim, rgba(255,155,70,.88))", letterSpacing: ".18em" }}>{kicker}</span>
      <h2 className="mb-3" style={{ fontSize: 18, color: "rgba(238,234,228,.97)" }}>{heading}</h2>
      {children}
    </section>
  );
}
