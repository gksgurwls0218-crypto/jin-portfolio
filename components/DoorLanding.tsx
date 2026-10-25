"use client";
import CardIndex from "@/components/ui/CardIndex";
import { useLocale } from "@/lib/useLocale";

// Section landing ("doors"). Same card system as every index page; each door's
// preview is a montage of what sits behind it (public/thumb/door-*.webp).
export type Door = { href: string; n: string; label: string; title: string; desc?: string; thumb?: string };

export default function DoorLanding({
  eyebrow, title, accent, intro, doors,
}: { eyebrow: string; title: string; accent: string; intro: string; doors: Door[] }) {
  const locale = useLocale();
  return (
    <CardIndex
      eyebrow={eyebrow} title={title} accent={accent} intro={intro}
      cols={doors.length >= 3 ? 3 : 2}
      enterLabel={locale === "ko" ? "들어가기" : "Enter"}
      previewLabel={locale === "ko" ? "미리보기" : "Preview"}
      items={doors.map((d) => ({ href: d.href, code: d.label, num: d.n, title: d.title, short: d.desc, thumb: d.thumb, ghost: d.n }))}
    />
  );
}
