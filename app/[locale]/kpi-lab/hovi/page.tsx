import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "The AI sitting next to the manager — HOVI | Jin",
    description:
      "I wanted the Iron Man scene. Researching it, the rules turned out to be already open — and most of the judgements I wanted to hand the AI were not the AI's to make. What is left is sharper: not an AI that decides, but one that trades evidence.",
  },
  ko: {
    title: "감독 옆에 앉은 AI — HOVI 구상과 조사 | Jin",
    description:
      "아이언맨의 그 장면을 원했다. 조사해보니 규정은 이미 열려 있었고, 내가 AI에게 시키려던 판단은 대부분 AI가 할 일이 아니었다. 그걸 덜어내고 남은 것 — 판단하는 AI가 아니라 근거를 주고받는 AI.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// Self-contained HTML document with its own inline SVG figures, embedded the same
// way /match-analysis/suwon-cross-shot is.
// Korean: /public/hovi.ko.html · English: /public/hovi.html
export default async function HoviPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const src = locale === "ko" ? "/hovi.ko.html" : "/hovi.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="HOVI — the AI sitting next to the manager"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
