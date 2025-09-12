import { ReactNode } from 'react';

export interface ButtonProps {
  /**
   * محتوای دکمه چه چیزی باشد؟
   */
  children: ReactNode;
  /**
   * نوع ظاهری دکمه
   */
  variant?: 'primary' | 'secondary' | 'danger';
  /**
   * اندازه دکمه
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * آیا دکمه غیرفعال است؟
   */
  disabled?: boolean;
  /**
   * تابع کلیک
   */
  onClick?: () => void;
}