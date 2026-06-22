import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

/** Dev uses `.next-dev` to avoid Windows EPERM locks on `.next/trace` after production builds */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  distDir: process.env.NEXT_DIST_DIR || ".next",
};

export default nextConfig;

initOpenNextCloudflareForDev();
