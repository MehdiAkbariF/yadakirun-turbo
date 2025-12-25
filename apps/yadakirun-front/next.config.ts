/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

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
        // اگر API_REMOTE_URL تعریف شده باشه از اون استفاده کن، وگرنه سرور اصلی
        destination: `${process.env.API_REMOTE_URL || "https://api-yadakirun.yadakchi.com"}/api/:path*`,
      },
      
    ];
  },
};

export default nextConfig;