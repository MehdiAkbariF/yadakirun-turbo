import { ReactNode } from 'react';

export interface NavLinkItem {
  id?: string; // برای آکاردئون
  title: string;
  href: string;
   mobileOnly?: boolean;
  children?: NavLinkItem[]; // برای زیرمنوها
}

export interface HeaderProps {
  /**
   * اسلات برای نمایش لوگو.
   */
  logo: ReactNode;

  /**
   * آرایه‌ای از لینک‌های اصلی منو.
   */
  navLinks?: NavLinkItem[];

  /**
   * اسلات برای نمایش مگا منو.
   */
  megaMenuSlot?: ReactNode;

  /**
   * اسلات برای بخش جستجو.
   */
  searchSlot?: ReactNode;

  /**
   * اسلات برای بخش سبد خرید.
   */
  cartSlot?: ReactNode;

  /**
   * اسلات برای بخش کاربر (فقط لینک ورود/پروفایل).
   */
  userSlot?: ReactNode;

  /**
   * اسلات اختصاصی برای تاگل تغییر تم.
   */
  themeToggleSlot?: ReactNode;

  /**
   * کلاس‌های CSS اضافی برای استایل‌دهی سفارشی.
   */
  className?: string;
  
  /**
   * آیا صفحه اسکرول خورده است؟
   */
  isScrolled?: boolean;

  /**
   * مسیر فعلی برای هایلایت کردن لینک فعال.
   */
  activePath?: string;
}