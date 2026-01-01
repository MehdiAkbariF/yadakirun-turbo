import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ❌ بخش eslint حذف شد چون در Next.js جدید پشتیبانی نمی‌شود
  
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api-yadakirun.yadakchi.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.API_REMOTE_URL || "https://api-yadakirun.yadakchi.com"}/api/:path*`,
      },
      {
        source: '/api-proxy/:path*',
        destination: 'https://api-yadakirun.yadakchi.com/api/:path*',
      },
    ];
  },
};

export default nextConfig;