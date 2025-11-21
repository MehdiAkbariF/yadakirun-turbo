// packages/design-system/src/components/molecules/ContentSection/ContentSection.types.ts
import { ReactNode, ElementType } from 'react';

export interface ContentSectionProps {
  /**
   * عنوان بخش
   */
  title: ReactNode;
  /**
   * محتوای اصلی بخش که می‌تواند شامل هر عنصری باشد
   */
  children: ReactNode;
  /**
   * تگ HTML که باید برای عنوان استفاده شود
   * @default 'h2'
   */
  titleAs?: ElementType;
  /**
   * کلاس‌های CSS اضافی برای تگ <section> اصلی
   */
  className?: string;
}