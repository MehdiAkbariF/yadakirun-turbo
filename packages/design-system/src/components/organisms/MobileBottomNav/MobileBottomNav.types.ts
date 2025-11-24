import { ReactNode } from 'react';

export interface MobileNavItem {
  id: string;
  label: string;
  icon: ReactNode;
  href?: string;
  onClick?: () => void;
  badgeCount?: number;
}

export interface CartSummaryProps {
  totalPrice: number;
  itemCount: number;
  onCheckout: () => void;
  
  /**
   * آیا کانتینر همیشه باز باشد و بسته نشود؟ (برای صفحه چک‌اوت)
   * @default false
   */
  alwaysOpen?: boolean;
}

export interface MobileBottomNavProps {
  items: MobileNavItem[];
  activeId?: string;
  className?: string;
  // ✅ پراپ جدید برای خلاصه سبد خرید
  cartSummary?: CartSummaryProps;
}