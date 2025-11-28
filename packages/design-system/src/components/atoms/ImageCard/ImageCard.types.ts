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

  /**
   * ✨ پراپ جدید: آیا این تصویر باید با اولویت بالا بارگذاری شود؟
   * برای تصاویری که در بالای صفحه (Above the Fold) قرار دارند استفاده شود.
   * @default false
   */
  priority?: boolean;
}