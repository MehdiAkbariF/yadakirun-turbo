export interface PWAInstallPromptProps {
  /**
   * متن اصلی نوتیفیکیشن
   * @default "این وبسایت را به صفحه اصلی گوشی خود اضافه کنید"
   */
  message?: string;

  /**
   * متن دکمه نصب
   * @default "نصب کن"
   */
  installText?: string;

  /**
   * متن دکمه رد کردن
   * @default "بعداً"
   */
  dismissText?: string;

  /**
   * حداقل زمان انتظار قبل از نمایش (ثانیه)
   * @default 30
   */
  delaySeconds?: number;

  className?: string;
}