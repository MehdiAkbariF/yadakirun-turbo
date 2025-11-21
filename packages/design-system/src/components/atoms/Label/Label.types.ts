import { ReactNode, ElementType, HTMLAttributes } from 'react';

// لیستی از سایزها و وزن‌های موجود در توکن‌ها
export type FontSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2x' | '3x' | '4x' | '5xl';
export type FontWeight = 'light' | 'normal' | 'medium' | 'semi-bold' | 'bold' | 'extra-bold' | 'black';

// ✅ گسترش رنگ‌ها شامل رنگ‌های متنی، برند و کاربردی
export type FontColor = 
  // رنگ‌های متنی معنایی (Semantic Text)
  | 'primary' 
  | 'secondary' 
  | 'placeholder' 
  | 'on-brand' 
  | 'link' 
  | 'heading' 
  | 'disabled'
  // رنگ‌های برند (Brand)
  | 'brand-primary'
  | 'brand-secondary'
  | 'brand-accent'
  // رنگ‌های کاربردی (Utility)
  | 'success'
  | 'error'
  | 'warning'
  | 'info';

export interface LabelProps extends HTMLAttributes<HTMLElement> {
  /**
   * محتوای متنی که نمایش داده می‌شود
   */
  children: ReactNode;
  
  /**
   * تگ HTML که باید برای لیبل استفاده شود
   * @default 'p'
   */
  as?: ElementType;

  /**
   * سایز فونت
   * @default 'base'
   */
  size?: FontSize;
  
  /**
   * وزن فونت
   * @default 'normal'
   */
  weight?: FontWeight;

  /**
   * رنگ متن بر اساس متغیرهای سیستم دیزاین
   * @default 'primary'
   */
  color?: FontColor;

  /**
   * پراپرتی htmlFor برای زمانی که تگ label است
   */
  htmlFor?: string;
}