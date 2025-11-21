// packages/design-system/src/components/atoms/Loader/Loader.types.ts

export type LoaderSize = 'sm' | 'md' | 'lg' | 'xl';
export type LoaderVariant = 'primary' | 'secondary' | 'light' | 'dark';

export interface LoaderProps {
  /**
   * اندازه لودر
   * @default 'md'
   */
  size?: LoaderSize;
  /**
   * رنگ لودر
   * @default 'primary'
   */
  variant?: LoaderVariant;
  /**
   * متنی که برای screen reader ها نمایش داده می‌شود
   * @default 'در حال بارگذاری...'
   */
  screenReaderText?: string;
  /**
   * آیا لودر کل صفحه را می‌پوشاند؟
   * @default false
   */
  fullscreen?: boolean;
  /**
   * کلاس‌های CSS اضافی
   */
  className?: string;
}