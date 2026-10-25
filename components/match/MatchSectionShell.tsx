import type { ReactNode } from "react";

type Props = {
  id: string;
  kicker: string;
  heading: string;
  children: ReactNode;
};

export default function MatchSectionShell({ id, kicker, heading, children }: Props) {
  return (
    <section id={id} className="mh-sec">
      {kicker ? <p className="adv-blk-label">{kicker}</p> : null}
      <h2>{heading}</h2>
      {children}
    </section>
  );
}
