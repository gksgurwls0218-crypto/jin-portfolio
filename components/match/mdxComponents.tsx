import Context from "./Context";
import Structures from "./Structures";
import VariationPoints from "./VariationPoints";
import VariationPoint from "./VariationPoint";
import DataLayer from "./DataLayer";
import Verdict from "./Verdict";
import PitchDiagram from "./PitchDiagram";
import XTTimeline from "./XTTimeline";
import FieldTilt from "./FieldTilt";
import PassNetwork from "./PassNetwork";
import ShapeMorph from "@/components/approach/ShapeMorph";

export const mdxComponents = {
  Context,
  Structures,
  VariationPoints,
  VariationPoint,
  DataLayer,
  Verdict,
  PitchDiagram,
  XTTimeline,
  FieldTilt,
  PassNetwork,
  ShapeMorph,
  p: (props: React.ComponentProps<"p">) => (
    <p style={{ fontSize: 16.5, lineHeight: 1.75, color: "var(--ink-2)", marginBottom: 14 }} {...props} />
  ),
  strong: (props: React.ComponentProps<"strong">) => (
    <strong style={{ color: "var(--ink)", fontWeight: 600 }} {...props} />
  ),
  em: (props: React.ComponentProps<"em">) => (
    <em style={{ color: "var(--green-bright)", fontStyle: "normal", fontWeight: 500 }} {...props} />
  ),
};
