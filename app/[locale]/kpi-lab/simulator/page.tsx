import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "A tool that evaluates the plan — AI tactical simulator | Jin",
    description:
      "Four preliminary measurements on K League event data, and the design decisions that follow: what a tactical simulator can and cannot do today, and why the buildable scope is plan evaluation rather than prediction.",
  },
  ko: {
    title: "계획을 평가하는 도구 — AI 전술 시뮬레이터 | Jin",
    description:
      "K리그 이벤트 데이터로 수행한 예비 측정 4종과 그로부터 도출한 설계 결정. 전술 시뮬레이터가 지금 무엇을 할 수 있고 무엇을 할 수 없는지, 그리고 구현 가능한 범위가 왜 예측이 아니라 계획 평가인지.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// Self-contained HTML document with its own inline SVG figures, embedded the same
// way /kpi-lab/hovi is.
// Korean: /public/simulator.ko.html · English: /public/simulator.html
export default async function SimulatorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/simulator.ko.html" : "/simulator.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="A tool that evaluates the plan — AI tactical simulator"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
