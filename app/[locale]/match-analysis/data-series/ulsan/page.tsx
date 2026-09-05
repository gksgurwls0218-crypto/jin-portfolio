import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "What the data says about Ulsan HD | Jin",
    description:
      "Ulsan lead K League 1 for key passes and shots on target — and create 1.7× as much after the break as before it, whatever the half-time score. Yet they have never won from behind at half-time. They score at 0.95 of expected and concede at 1.09. The +4 goal difference is those two losses added together.",
  },
  ko: {
    title: "데이터가 말하는 울산 HD | Jin",
    description:
      "키패스·유효슈팅 리그 1위. 하프타임 스코어와 무관하게 후반 기회 생성이 전반의 1.7배다. 그런데 전반에 뒤진 7경기에서 한 번도 이기지 못했다. 골은 기대의 0.95배, 실점은 1.09배. 승점 2위 팀의 득실차 +4는 그 두 손해의 합이다.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// 「데이터가 말하는」 시리즈 3편. 자체 완결형 HTML 문서(인라인 SVG 그림 11종, 호버 툴팁)를
// /match-analysis/data-series/fcseoul 과 같은 방식으로 임베드한다.
// 한국어: /public/data-ulsan.ko.html · 영문: /public/data-ulsan.html
export default async function UlsanDataPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/data-ulsan.ko.html" : "/data-ulsan.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="What the data says about Ulsan HD"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
