import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  // Defaults to ".next" (used by Vercel). Overridable via env for sandboxed
  // builds where the mounted ".next" folder is read-only.
  distDir: process.env.NEXT_DIST_DIR || ".next",

  // The philosophy page (/approach) and the essay diagram embeds load large
  // static HTML files directly from /public via <iframe src="...">, outside
  // Next.js's own hashed-asset pipeline. Browsers were caching those files
  // indefinitely (no explicit Cache-Control), so after an edit a visitor who
  // had already loaded the old copy — e.g. by switching EN -> KO -> EN on
  // /approach — kept seeing the stale version instead of the redeployed one.
  // "no-cache" forces the browser to revalidate with the server on every
  // load (a fast 304 if unchanged) instead of trusting a local copy blindly.
  async headers() {
    return [
      {
        source: "/variation-philosophy.html",
        headers: [{ key: "Cache-Control", value: "no-cache, must-revalidate" }],
      },
      {
        source: "/variation-philosophy.ko.html",
        headers: [{ key: "Cache-Control", value: "no-cache, must-revalidate" }],
      },
      {
        source: "/anim/:path*",
        headers: [{ key: "Cache-Control", value: "no-cache, must-revalidate" }],
      },
    ];
  },
};

export default nextConfig;
