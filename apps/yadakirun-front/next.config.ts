/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    // این خط ارورهای TypeScript موقع بیلد رو نادیده می‌گیره (خطرناکه، فقط موقتاً استفاده کن)
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api-yadakirun.yadakchi.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api-yadakirun.yadakchi.com/api/:path*',
      },
    ];
  },
};

export default nextConfig;  // اگر قبلاً module.exports بود، به export default تغییر بده