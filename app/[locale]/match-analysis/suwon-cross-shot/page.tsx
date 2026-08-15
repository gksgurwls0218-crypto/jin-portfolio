import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "From cross to shot — Suwon Samsung | Jin",
    description:
      "K League 2 2026, 20 matches set against 96 Big 5 clubs. Suwon Samsung's leak narrows to a single phase — crosses that never become shots. With the Cross Freedom model (Z×F×A) and the context T.",
  },
  ko: {
    title: "크로스에서 슈팅으로 — 수원 삼성 | Jin",
    description:
      "K리그2 2026, 20경기를 유럽 5대리그 96팀과 대조한다. 수원 삼성의 결손 구간은 「크로스 → 슈팅」 하나로 좁혀진다. 자유 크로스도(Z×F×A)와 맥락 T까지.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// Authored as a self-contained HTML document (six interactive SVG charts drawn by
// its own inline script, plus its own type/colour system), embedded the same way
// /match-analysis/korea-jordan is — so the figures render exactly as built instead
// of being re-implemented in MDX.
// Korean: /public/suwon-cross-shot.ko.html · English: /public/suwon-cross-shot.html
export default async function SuwonCrossShotPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/suwon-cross-shot.ko.html" : "/suwon-cross-shot.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="Suwon Samsung — from cross to shot"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
