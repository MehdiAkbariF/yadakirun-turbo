export interface ProductCardProps {
  /**
   * عنوان محصول
   */
  title: string;
  /**
   * آدرس لینکی که کارت به آن اشاره می‌کند
   */
  href: string;
  /**
   * آدرس تصویر محصول
   */
  imgSrc: string;
  /**
   * قیمت نهایی محصول
   */
  price?: number;
  /**
   * قیمت اصلی محصول (قبل از تخفیف)
   */
  originalPrice?: number;
  /**
   * امتیاز محصول (عددی بین ۰ تا ۵)
   */
  rating?: number;
  /**
   * متنی که به عنوان بج روی کارت نمایش داده می‌شود
   */
  badgeText?: string;
  /**
   * کلاس‌های CSS اضافی
   */
  className?: string;
     onAddToCart?: () => void;
}