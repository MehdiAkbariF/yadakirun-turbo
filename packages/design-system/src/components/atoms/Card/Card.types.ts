import { ReactNode } from 'react';

export interface CardProps {
  /**
   * عنوان کارت
   */
  title: ReactNode;
  /**
   * آدرس تصویر کارت
   */
  imgSrc?: string;
  /**
   * آدرس لینکی که کارت به آن اشاره می‌کند
   */
  href: string;
  /**
   * آیا این یک کارت "بیشتر" است (بدون تصویر)؟
   */
  isMore?: boolean;
  /**
   * کلاس‌های CSS اضافی
   */
  className?: string;
}