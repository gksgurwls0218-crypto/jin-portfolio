import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "The manager speaks during the match — Dual-View | Jin",
    description:
      "A tool that hears what a manager shouts from the touchline and cuts the moment that just passed, from two angles. The design notes, the one thing verified so far (8 ms sync error), and everything that is not.",
  },
  ko: {
    title: "감독은 경기 중에 말한다 — Dual-View 글라스 | Jin",
    description:
      "사이드라인에서 나온 한 마디를 듣고 방금 지나간 장면을 두 각도로 잘라내는 도구. 설계 과정과, 지금까지 증명한 것 하나(동기화 오차 8ms)와 아직 증명하지 못한 것들의 기록.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// Korean: /public/dualview.ko.html · English version not written yet — ko is served
// for both locales until it is, so the route never 404s.
export default async function DualViewPage() {
  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src="/dualview.ko.html"
        title="Dual-View — voice-triggered tactical clipping"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
