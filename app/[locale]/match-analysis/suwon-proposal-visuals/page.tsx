import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "You do not need more crosses — Suwon Samsung | Jin",
    description:
      "The club that crosses more than anyone in K League 2 ranks 6th for goals. 21 matches set against 96 Big 5 clubs narrow the leak to one phase — what needs changing is not the volume but the conditions in front of it. Twelve figures for an eight-act proposal.",
  },
  ko: {
    title: "크로스를 더 올릴 필요는 없다 — 수원 삼성 | Jin",
    description:
      "리그에서 크로스를 가장 많이 올리는 팀이 득점 6위다. 2026 K리그2 21경기를 유럽 5대리그 96팀과 대조해 결손 구간을 한 곳으로 좁혔다 — 바꿀 것은 양이 아니라 그 앞의 조건이다. 8막 제안서 시각자료 12종.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// Authored as a self-contained HTML document (twelve interactive SVG figures drawn
// by its own inline script, plus its own type/colour system), embedded the same way
// /match-analysis/suwon-cross-shot is.
// Korean: /public/suwon-proposal-visuals.ko.html · English: /public/suwon-proposal-visuals.html
export default async function SuwonProposalVisualsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/suwon-proposal-visuals.ko.html" : "/suwon-proposal-visuals.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="Suwon Samsung — visual design brief"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
