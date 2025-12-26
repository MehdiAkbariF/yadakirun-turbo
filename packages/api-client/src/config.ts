// تشخیص اینکه آیا کد در سمت سرور اجرا می‌شود یا کلاینت
const isServer = typeof window === 'undefined';

export const API_CONFIG = {
  // در سمت سرور باید آدرس کامل (Absolute) باشد
  // در سمت کلاینت آدرس نسبی (Relative) برای استفاده از پروکسی
  BASE_URL: isServer
    ? (process.env.API_REMOTE_URL ? `${process.env.API_REMOTE_URL}/api` : 'https://api-yadakirun.yadakchi.com/api')
    : (process.env.NEXT_PUBLIC_API_BASE_URL || '/api'),
};