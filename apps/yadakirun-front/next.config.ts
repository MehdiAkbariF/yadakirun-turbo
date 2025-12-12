// مسیر: apps/yadakirun-front/next.config.ts

/** @type {import('next').NextConfig} */
const nextConfig = {
  
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅✅✅ این بخش باید اضافه شود ✅✅✅
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
};

module.exports = nextConfig;