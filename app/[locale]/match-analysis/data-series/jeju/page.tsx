import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "What the data says about Jeju SK | Jin",
    description:
      "Jeju SK concede from opponents' slow build at 0.44× the expected rate — the best in K League 1. What beats them is the counter, 42% of goals conceded. But those counters do not start with the goalkeeper's long ball: of the 11 conceded on the break he originated none. They start with a short forward pass in the defensive third, the one cell where Jeju are 12 points worse than their opponents.",
  },
  ko: {
    title: "데이터가 말하는 제주SK | Jin",
    description:
      "제주는 상대의 지공을 기대의 0.44배로 막는다 — 리그 최상급이다. 뚫리는 건 역습뿐이고 실점의 42%가 거기서 나온다. 그런데 그 역습은 골키퍼의 롱볼에서 시작되지 않는다. 실점 역습 11개 중 골키퍼가 기점인 건 0개다. 기점은 디펜시브 서드에서 앞으로 붙이는 짧은 패스 — 상대보다 12포인트 나쁜 단 한 칸이다.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// 「데이터가 말하는」 시리즈 6편. 자체 완결형 HTML 문서(인라인 SVG 그림 14종, 호버 툴팁,
// 실제 규격 105×68m 피치 도식, 선수 O/E 신뢰구간)를 다른 편과 같은 방식으로 임베드한다.
// 한국어: /public/data-jeju.ko.html · 영문: /public/data-jeju.html
export default async function JejuDataPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/data-jeju.ko.html" : "/data-jeju.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="What the data says about Jeju SK"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
