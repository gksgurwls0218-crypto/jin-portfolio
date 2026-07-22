import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  // Defaults to ".next" (used by Vercel). Overridable via env for sandboxed
  // builds where the mounted ".next" folder is read-only.
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
