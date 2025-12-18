// مسیر: apps/yadakirun-front/next.config.ts

/** @type {import('next').NextConfig} */
const nextConfig = {
  
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api-yadakirun.yadakchi.com',
        port: '',
        pathname: '/**', // اجازه لود تمام عکس‌ها از این دامنه
      },
    ],
  },

  // ✅✅✅ این بخش برای حل مشکل CORS اضافه شده است ✅✅✅
  async rewrites() {
    return [
      {
        // هر درخواستی که در اپلیکیشن به آدرسی شبیه "/api/Front/Basket" ارسال شود...
        source: '/api/:path*',
        // ...سرور توسعه Next.js آن را به صورت پنهانی به این آدرس کامل ارسال می‌کند.
        destination: 'https://api-yadakirun.yadakchi.com/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;