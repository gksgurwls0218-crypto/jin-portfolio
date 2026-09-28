import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "They Get In and Shoot — and So Does Everyone Else | Jin",
    description:
      "Daegu FC shoot more than anyone in K League 2 (14.3 shots, 1.84 xG per match) yet sit fourth, because the shots come back at the same size. Their final-third entries end in a shot 29.4% of the time (2nd); opponents who get into Daegu's third reach a shot 29.6% of the time (highest). They are the only club in the top two on both. Hottest when ahead, a team of the last half hour (25 goals after the 60th minute, 16 by substitutes — Edgar 8 from 3.2 xG), built on Jaewon Hwang → Serafim and the league's heaviest reliance on foreign players.",
  },
  ko: {
    title: "들어가면 쏘고, 들어오면 맞는다 | Jin",
    description:
      "대구FC는 K리그2에서 가장 많이 쏘는데(경기당 슛 14.3 · xG 1.84, 모두 1위) 4위다 — 같은 크기로 슛이 돌아오기 때문이다. 대구가 파이널서드에 들어가면 29.4%가 슛으로 끝나고(2위), 상대가 들어와도 29.6%가 슛으로 끝난다(리그 최고). 두 비율이 모두 상위 2위 안인 팀은 대구뿐이다. 앞서 있을 때 가장 뜨겁고, 61분 이후 25골·교체 16골로 리그 1위(에드가 xG 3.2에서 8골), 황재원 → 세라핌 축과 리그 최고의 외국인 의존도 위에 서 있다.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// 「데이터가 말하는」 시리즈 17편(대구FC · K리그2 세 번째 편). 자체 완결형 HTML을 임베드한다.
// 한국어: /public/data-daegu.ko.html · 영문: /public/data-daegu.html
export default async function DaeguPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/data-daegu.ko.html" : "/data-daegu.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="They Get In and Shoot — and So Does Everyone Else"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
