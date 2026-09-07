import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "What the data says about Pohang Steelers | Jin",
    description:
      "Pohang reach the final third as often as anyone and score the 11th-most goals in K League 1. When Lee Ho-jae left in July, shots and entries held — only the shooting positions retreated, from 71% inside the box to 58%. One player had taken 24% of the team's box shots, and the second name was a centre-back. What the transfer exposed was not a missing striker but a position never turned into a structure.",
  },
  ko: {
    title: "데이터가 말하는 포항 스틸러스 | Jin",
    description:
      "final third까지는 리그 평균만큼 간다. 그런데 24득점은 리그 11위다. 7월 이호재가 떠난 뒤 슛도 진입도 줄지 않았고 슛의 위치만 밀렸다 — box 안 71%에서 58%로. 팀의 box 안 슛 24%를 한 명이 갖고 있었고, 두 번째 이름은 센터백이었다. 이적이 드러낸 건 공격수의 공백이 아니라 구조로 만들지 않은 자리였다.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// 「데이터가 말하는」 시리즈 5편. 자체 완결형 HTML 문서(인라인 SVG 그림 8종, 호버 툴팁)를
// /match-analysis/data-series/ulsan 과 같은 방식으로 임베드한다.
// 한국어: /public/data-pohang.ko.html · 영문: /public/data-pohang.html
export default async function PohangDataPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/data-pohang.ko.html" : "/data-pohang.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="What the data says about Pohang Steelers"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
