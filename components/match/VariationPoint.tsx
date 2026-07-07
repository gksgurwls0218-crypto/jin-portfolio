import type { ReactNode } from "react";
import Link from "next/link";
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
        background: "rgba(255,255,255,.025)",
        border: isCheck ? "0.5px solid rgba(232,83,106,.4)" : "0.5px solid rgba(255,145,60,.22)",
      }}
    >
      <div
        className="flex items-center gap-3 px-4.5 py-3.5"
        style={{
          borderBottom: isCheck ? "0.5px solid rgba(232,83,106,.25)" : "0.5px solid rgba(255,145,60,.15)",
          background: isCheck ? "rgba(232,83,106,.06)" : "rgba(255,130,40,.05)",
        }}
      >
        <span className="mono font-medium" style={{ fontSize: 12, color: isCheck ? "#e8536a" : "var(--amber,#ffb356)" }}>
          V{n}
        </span>
        <span className="font-medium" style={{ fontSize: 13.5, color: "rgba(238,234,228,.96)" }}>{title}</span>
        <span
          className="mono ml-auto px-2.5 py-1 rounded-md"
          style={{ fontSize: 9, color: "rgba(255,190,115,.8)", border: "0.5px solid rgba(255,145,55,.3)" }}
        >
          {time}
        </span>
      </div>
      <div className="px-4.5 py-4">
        <div className="space-y-2.5" style={{ fontSize: 12.5, lineHeight: 1.75, color: "rgba(222,216,206,.88)" }}>
          {children}
        </div>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {concepts.map((id) => (
            <Link
              key={id}
              href={conceptHref(id)}
              className="mono inline-block px-2.5 py-1 rounded-md"
              style={{ fontSize: 9, color: "rgba(165,178,255,.9)", border: "0.5px solid rgba(120,150,255,.3)", background: "rgba(90,120,255,.08)" }}
            >
              → §{CONCEPTS[id].section.slice(1)} {CONCEPTS[id].label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
