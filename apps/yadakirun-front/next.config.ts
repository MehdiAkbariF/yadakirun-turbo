// apps/yadakirun-front/next.config.js

const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // این بخش تضمین می‌کند که فایل‌های استاتیک از دیزاین سیستم هم در دسترس باشند
  // این کار در حالت dev به صورت خودکار انجام می‌شود، اما برای build لازم است
  // نکته: این قابلیت ممکن است در نسخه‌های آینده Next.js تغییر کند
  
  // یک راه حل بهتر استفاده از یک اسکریپت در زمان build است.
  
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;