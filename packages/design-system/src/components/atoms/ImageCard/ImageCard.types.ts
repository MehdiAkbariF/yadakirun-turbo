// packages/design-system/src/components/atoms/ImageCard/ImageCard.types.ts
export interface ImageCardProps {
  /**
   * آدرس تصویر
   */
  src: string;
  /**
   * متن جایگزین برای تصویر (برای دسترسی‌پذیری)
   */
  alt: string;
  /**
   * آدرس لینکی که کارت به آن اشاره می‌کند
   */
  href: string;
  /**
   * نسبت ابعاد تصویر (aspect ratio)
   * @default '16 / 9'
   */
  aspectRatio?: string;
  /**
   * کلاس‌های CSS اضافی
   */
  className?: string;
}