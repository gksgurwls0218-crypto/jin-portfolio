"use client";
import { usePathname } from "next/navigation";
import { isLocale, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";

/** Read the active locale from the URL (first path segment). */
export function useLocale(): Locale {
  const pathname = usePathname() || "/";
  const seg = pathname.split("/")[1];
  return isLocale(seg) ? seg : DEFAULT_LOCALE;
}
