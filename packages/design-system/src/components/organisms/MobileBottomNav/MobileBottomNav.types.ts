import { ReactNode } from 'react';

export interface MobileNavItem {
  id: string;
  label: string;
  icon: ReactNode;
  href?: string; // اگر لینک باشد
  onClick?: () => void; // اگر دکمه باشد (مثل سبد خرید که شاید مودال باز کند)
  badgeCount?: number;
}

export interface MobileBottomNavProps {
  items: MobileNavItem[];
  activeId?: string; // آیدی آیتم فعال
  className?: string;
}