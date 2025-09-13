import { ReactNode, ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * محتوای دکمه چه چیزی باشد؟
   */
  children: ReactNode;
  /**
   * نوع ظاهری دکمه
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'danger';
  /**
   * اندازه دکمه
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
}