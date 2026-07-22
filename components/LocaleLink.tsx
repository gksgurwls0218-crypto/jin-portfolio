"use client";
import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useLocale } from "@/lib/useLocale";
import { withLocale } from "@/lib/i18n";

/** Drop-in replacement for next/link that prefixes internal hrefs with the
 *  active locale, so navigation always stays inside /en or /ko. Hash links,
 *  mailto:, and external URLs pass through unchanged. */
export default function LocaleLink({ href, ...props }: ComponentProps<typeof NextLink>) {
  const locale = useLocale();
  const localized = typeof href === "string" ? withLocale(locale, href) : href;
  return <NextLink href={localized} {...props} />;
}
