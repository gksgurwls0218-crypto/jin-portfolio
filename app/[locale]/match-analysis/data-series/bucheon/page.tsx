import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "Once Caught, Never Ahead Again | Jin",
    description:
      "Bucheon FC 1995 took the lead in 14 of 29 matches and saw seven of those leads wiped out — and never went back in front afterwards: 0 wins, 5 draws, 2 defeats, 16 points gone. Expected goal difference −18.3 against an actual −7: the defence is mostly variance, and the attack is short of arrivals, not finishing. The centre was never closed — a short pass into it succeeds 78.0% of the time against 79.7% — Bucheon simply rarely use it.",
  },
  ko: {
    title: "한 번 따라잡히면 다시 앞서지 못했다 | Jin",
    description:
      "부천FC는 29경기 중 14경기에서 리드를 잡았고, 그중 7경기에서 리드가 지워졌다. 지워진 뒤 다시 앞선 경기는 없다 — 0승 5무 2패, 승점 16점. 기대 득실차 −18.3, 실제 −7. 수비 초과는 대부분 분산이고, 공격에 부족한 것은 마무리가 아니라 도착 횟수다. 중앙은 막혀 있지 않았다 — 숏패스로 넣으면 78.0%로 상대(79.7%)와 같지만 그 방법을 거의 쓰지 않는다.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// 「데이터가 말하는」 시리즈 13편(부천FC). 자체 완결형 HTML을 임베드한다.
// 한국어: /public/data-bucheon.ko.html · 영문: /public/data-bucheon.html
export default async function BucheonPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/data-bucheon.ko.html" : "/data-bucheon.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="Once Caught, Never Ahead Again"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
