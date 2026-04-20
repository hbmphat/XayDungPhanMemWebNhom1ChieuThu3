import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: 'standalone',
  transpilePackages: ["@repo/eslint-config"],
  turbopack: {
    root: path.resolve(__dirname, "../../"),
  },
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        pathname: '/api/**',
      },
    ],
  },
  typescript: {
    tsconfigPath: "./tsconfig.build.json",
    ignoreBuildErrors: true
  },
};

export default nextConfig;