import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { redirect } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n";

const META: Record<Locale, Metadata> = {
  en: {
    title: "Approach — Variation Theory | Jin",
    description: "The full Variation Theory philosophy — answering the four questions it started from, with live animated diagrams.",
  },
  ko: {
    title: "접근법 — 변이 이론 | Jin",
    description: "변이 이론 철학의 전문 — 출발점이 된 네 개의 질문에 답하며, 살아 움직이는 애니메이션 다이어그램과 함께.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return META[isLocale(locale) ? locale : "en"];
}

// The philosophy is authored as a self-contained animated HTML document
// (13 canvas animations), embedded so every animation runs exactly as built.
// Korean version: /public/variation-philosophy.ko.html — falls back to the
// English document if the Korean file is not present.
export default async function ApproachPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const koExists = fs.existsSync(path.join(process.cwd(), "public", "variation-philosophy.ko.html"));

  // Korean: the standalone animated HTML doc is English-only for now. Until a
  // Korean variation-philosophy.ko.html is added, send Korean visitors to the
  // fully-translated essay (same animations, rendered as native React) so the
  // philosophy is never shown in English on the Korean site.
  if (locale === "ko" && !koExists) {
    redirect("/ko/approach/essay");
  }

  const src = locale === "ko" && koExists ? "/variation-philosophy.ko.html" : "/variation-philosophy.html";

  return (
    <div style={{ background: "var(--stage)", paddingTop: 62, minHeight: "100vh" }}>
      <iframe
        src={src}
        title="Variation Theory — the full philosophy"
        style={{ width: "100%", height: "calc(100vh - 62px)", border: "none", display: "block" }}
      />
    </div>
  );
}
