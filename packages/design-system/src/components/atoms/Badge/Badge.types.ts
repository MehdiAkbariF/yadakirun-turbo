// packages/design-system/src/components/atoms/Badge/Badge.types.ts
import { ReactNode } from 'react';

export type BadgeVariant = 'primary' | 'secondary' | 'success' | 'error' | 'warning';

export interface BadgeProps {
  /**
   * محتوای بج
   */
  children: ReactNode;
  /**
   * نوع ظاهری بج
   * @default 'primary'
   */
  variant?: BadgeVariant;
  /**
   * کلاس‌های CSS اضافی
   */
  className?: string;
}