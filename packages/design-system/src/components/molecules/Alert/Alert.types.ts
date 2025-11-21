import { ReactNode, HTMLAttributes } from 'react';

export type AlertVariant = 'error' | 'success' | 'warning' | 'info';

export interface AlertProps extends HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  icon?: ReactNode;
  onClose?: () => void;
  /**
   * مدت زمان نمایش پیام به میلی‌ثانیه.
   * اگر مقدار داده شود، نوار تایمر نمایش داده می‌شود و پس از اتمام، onClose صدا زده می‌شود.
   */
  duration?: number;
}