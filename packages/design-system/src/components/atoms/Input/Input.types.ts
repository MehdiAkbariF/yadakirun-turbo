// packages/design-system/src/components/atoms/Input/Input.types.ts
import { InputHTMLAttributes, ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * شناسه منحصر به فرد برای اتصال لیبل
   */
  id: string;
  /**
   * متن لیبل که بالای اینپوت نمایش داده می‌شود
   */
  label?: string;
  /**
   * آیکونی که در سمت چپ اینپوت نمایش داده می‌شود
   */
  leftIcon?: ReactNode;
  /**
   * آیا اینپوت دارای خطا است؟
   */
  error?: string;
  /**
   * کلاس‌های CSS اضافی برای کانتینر اصلی
   */
  containerClassName?: string;
}