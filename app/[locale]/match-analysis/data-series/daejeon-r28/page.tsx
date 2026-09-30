import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "Less of the Ball, More Arrivals — Daejeon 3–2 Anyang | Jin",
    description:
      "K League 1 2026, Round 28. Daejeon Hana Citizen had 71% of the ball and no goals before the break, 55% and three goals after it. Twenty-one observations from watching the match were checked against 1,253 raw events; only what the data also pointed to explains the comeback — Anyang not pressing, the build-up moving left, Ludwigson drifting inside with Kang Ji-hoon following him, and the best counter-press after losses of Daejeon's season. Two squad questions follow: a second Seo Jin-su type for the left, and a second distributing No. 6 beside Kim Bong-soo.",
  },
  ko: {
    title: "공을 덜 가지고, 더 많이 도착했다 — 대전 3–2 안양 | Jin",
    description:
      "하나은행 K리그1 2026 28라운드. 대전하나시티즌은 전반 71% 점유에 0골, 후반 55% 점유에 3골로 역전했다. 경기를 보며 적은 관찰 21개를 원시 이벤트 1,253건과 맞춰, 데이터가 같은 방향을 가리킨 것만으로 설명한다 — 압박하지 않은 안양, 왼쪽으로 옮긴 빌드업, 안으로 들어간 루빅손과 따라 들어온 강지훈, 시즌 최저 수준의 상실 후 피슈팅. 그리고 두 가지 스쿼드 과제: 왼쪽 끝을 맡을 두 번째 서진수 유형, 김봉수 옆의 두 번째 배급형 6번.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// 「데이터가 말하는」 09편(대전하나시티즌 시즌 편)의 동반 경기 분석 — R28 대전 3–2 안양. 자체 완결형 HTML을 임베드한다.
// 한국어: /public/data-daejeon-r28.ko.html · 영문: /public/data-daejeon-r28.html · 영상: /public/videos/daejeon-r28/
export default async function DaejeonR28Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/data-daejeon-r28.ko.html" : "/data-daejeon-r28.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="Less of the Ball, More Arrivals"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
