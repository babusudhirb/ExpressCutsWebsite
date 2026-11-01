import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  /* Export hair/index.html, not hair.html: Next also writes a hair/ folder of route
     data, and a folder with no index answers 403 on Hostinger. */
  trailingSlash: true,
  images: {
    /* Static hosting: scripts/optimize-images.mjs writes these widths after the build */
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [640, 828, 1200, 1920],
    imageSizes: [256, 384],
    qualities: [75, 85],
    /* Google reviewer photos, shown only where supplied (unoptimized, no referrer) */
    remotePatterns: [{ protocol: "https", hostname: "lh3.googleusercontent.com" }],
  },
  /**
   * Testing on a real phone goes through a tunnel, so the dev server is reached
   * from a hostname that is not localhost. Without this, Next refuses the dev
   * runtime for that origin and the page renders but never becomes interactive.
   * Patterns only — never a single temporary tunnel hostname.
   */
  allowedDevOrigins: [
    "*.trycloudflare.com",
    "*.loca.lt",
    "*.ngrok-free.app",
    "*.ngrok.io",
    "192.168.*.*",
    "10.*.*.*",
  ],
  // The legacy /offers-2 redirect is handled by public/.htaccess.
};

export default nextConfig;
