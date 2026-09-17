import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "A Football Club That Is Also an Army Unit | Jin",
    description:
      "Gimcheon Sangmu is a unit of the South Korean armed forces playing in the top division. A military board picks the squad and no club can refuse. Contracts are suspended, not paid out. Players earn $545 a month in a league whose domestic average is thirteen times higher, and the club is required to change host city every decade. Part 1 of two: the institution, and why it changes which questions about this team are fair to ask.",
  },
  ko: {
    title: "축구 구단이면서 군부대인 팀 | Jin",
    description:
      "김천상무는 K리그1에서 뛰는 국군체육부대다. 선발은 군이 하고 어떤 구단도 거부할 수 없다. 프로 계약은 정산되지 않고 정지된다. 리그 국내 평균의 13분의 1을 받고, 연고지는 10년마다 바뀐다. 2편 중 1편 — 제도, 그리고 그것이 이 팀에 물어도 되는 질문을 어떻게 바꾸는가.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// 「데이터가 말하는」 시리즈 10편(김천 1/2). 자체 완결형 HTML을 임베드한다.
// 한국어: /public/data-gimcheon-club.ko.html · 영문: /public/data-gimcheon-club.html
export default async function GimcheonClubPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/data-gimcheon-club.ko.html" : "/data-gimcheon-club.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="A Football Club That Is Also an Army Unit"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
