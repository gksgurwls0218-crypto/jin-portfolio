import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["en", "ko"] as const;

/** Detect the visitor's preferred language: Korean browsers land on /ko,
 *  everyone else defaults to /en. */
function detectLocale(req: NextRequest): "en" | "ko" {
  const accept = req.headers.get("accept-language")?.toLowerCase() ?? "";
  // Korean speakers → Korean; every other language → English default.
  return accept.startsWith("ko") || accept.includes(",ko") || accept.includes(" ko") || /(^|[,;\s])ko\b/.test(accept)
    ? "ko"
    : "en";
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Already locale-prefixed → let it through.
  const hasLocale = LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return NextResponse.next();

  // Redirect the bare path to the detected locale, preserving the rest of the path.
  const locale = detectLocale(req);
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals, API, and any path that looks like a file (has an extension).
  matcher: ["/((?!_next|api|.*\\.).*)"],
};
