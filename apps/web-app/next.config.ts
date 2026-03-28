import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  transpilePackages: ["@repo/eslint-config", "your-other-package"],
  turbopack: {
    root: "../../",
  },
};

export default nextConfig;