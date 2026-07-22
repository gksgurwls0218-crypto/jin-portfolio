import type { ReactNode } from "react";
import Link from "@/components/LocaleLink";
import { CONCEPTS, conceptHref, type ConceptId } from "@/lib/concepts";

type Props = {
  n: number;
  title: string;
  time: string;
  kind?: "framework-check";
  concepts: ConceptId[];
  children: ReactNode;
};

export default function VariationPoint({ n, title, time, kind, concepts, children }: Props) {
  const isCheck = kind === "framework-check";
  return (
    <div
      id={`v${n}`}
      className="scroll-mt-16 rounded-2xl overflow-hidden my-5 max-w-[760px]"
      style={{
        background: "var(--stage-3)",
        border: isCheck ? "0.5px solid var(--edge-2)" : "0.5px solid var(--green-line)",
      }}
    >
      <div
        className="flex items-center gap-3 px-4.5 py-3.5"
        style={{
          borderBottom: isCheck ? "0.5px solid var(--edge-2)" : "0.5px solid var(--green-line)",
          background: isCheck ? "var(--stage-2)" : "var(--green-soft)",
        }}
      >
        <span className="mono font-medium" style={{ fontSize: 12, color: isCheck ? "var(--ink)" : "var(--green-mid)" }}>
          V{n}
        </span>
        <span className="font-medium" style={{ fontSize: 13.5, color: "var(--ink)" }}>{title}</span>
        <span
          className="mono ml-auto px-2.5 py-1 rounded-md"
          style={{ fontSize: 9, color: "var(--green-mid)", border: "0.5px solid var(--green-line)" }}
        >
          {time}
        </span>
      </div>
      <div className="px-4.5 py-4">
        <div className="space-y-2.5" style={{ fontSize: 12.5, lineHeight: 1.75, color: "var(--ink-2)" }}>
          {children}
        </div>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {concepts.map((id) => (
            <Link
              key={id}
              href={conceptHref(id)}
              className="mono inline-block px-2.5 py-1 rounded-md"
              style={{ fontSize: 9, color: "var(--green-mid)", border: "0.5px solid var(--green-line)", background: "var(--green-soft)" }}
            >
              → §{CONCEPTS[id].section.slice(1)} {CONCEPTS[id].label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
