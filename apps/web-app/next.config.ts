import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  transpilePackages: ["@repo/eslint-config"],
  turbopack: {
    root: "../../",
  },
};

export default nextConfig;