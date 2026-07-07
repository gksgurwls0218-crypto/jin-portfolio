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
    <p style={{ fontSize: 13.5, lineHeight: 1.8, color: "rgba(222,216,206,.88)", marginBottom: 12 }} {...props} />
  ),
  strong: (props: React.ComponentProps<"strong">) => (
    <strong style={{ color: "rgba(238,234,228,.97)", fontWeight: 600 }} {...props} />
  ),
  em: (props: React.ComponentProps<"em">) => (
    <em style={{ color: "rgba(230,225,255,.9)" }} {...props} />
  ),
};
