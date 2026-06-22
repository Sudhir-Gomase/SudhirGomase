import type { NextConfig } from "next";

/** Dev uses `.next-dev` to avoid Windows EPERM locks on `.next/trace` after production builds */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  images: { unoptimized: true },
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;
