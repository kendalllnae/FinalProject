import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Forward API requests
        destination: `http://localhost:5000/api/:path*`, // Proxy to Express server
      },
    ];
  },
};

export default nextConfig;

