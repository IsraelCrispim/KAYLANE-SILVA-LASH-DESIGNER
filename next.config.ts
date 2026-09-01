import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [],
  },
  sassOptions: {
    includePaths: ["./node_modules"],
  },
};

export default nextConfig;
