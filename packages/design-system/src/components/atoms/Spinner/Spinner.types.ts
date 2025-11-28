export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerColor = 'primary' | 'secondary' | 'on-brand';

export interface SpinnerProps {
  /**
   * اندازه اسپینر بر اساس توکن‌های فاصله‌گذاری.
   * @default 'md'
   */
  size?: SpinnerSize;

  /**
   * رنگ اسپینر بر اساس رنگ‌های معنایی تم.
   * @default 'primary'
   */
  color?: SpinnerColor;

  /**
   * متنی برای خوانایی بهتر توسط صفحه‌خوان‌ها.
   * @default 'در حال بارگذاری...'
   */
  label?: string;

  /**
   * کلاس‌های CSS اضافی برای استایل‌دهی سفارشی.
   */
  className?: string;
}