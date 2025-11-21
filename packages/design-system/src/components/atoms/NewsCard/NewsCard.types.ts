export interface NewsCardProps {
  /**
   * عنوان مقاله
   */
  title: string;
  /**
   * تاریخ انتشار مقاله
   */
  date?: string;
  /**
   * خلاصه یا توضیحات کوتاه مقاله
   */
  description?: string;
  /**
   * آدرس لینکی که کارت به آن اشاره می‌کند
   */
  href: string;
  /**
   * آدرس تصویر مقاله
   */
  imgSrc: string;
  /**
   * کلاس‌های CSS اضافی
   */
  className?: string;
}