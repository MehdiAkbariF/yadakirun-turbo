import { ReactNode, ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  /**
   * نوع ظاهری دکمه
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  /**
   * اندازه دکمه
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * آیا دکمه تمام عرض والد را بگیرد؟
   * @default false
   */
  fullWidth?: boolean;
  /**
   * وضعیت لودینگ
   * @default false
   */
  isLoading?: boolean;
  /**
   * آیکون سمت چپ
   */
  leftIcon?: ReactNode;
  /**
   * آیکون سمت راست
   */
  rightIcon?: ReactNode;
}