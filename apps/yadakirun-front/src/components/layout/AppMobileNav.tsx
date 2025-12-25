"use client";

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Home, LayoutGrid, ShoppingCart, BookOpen, User } from 'lucide-react';
import { MobileBottomNav } from '@monorepo/design-system/src/components/organisms/MobileBottomNav/MobileBottomNav';
import { MobileNavItem } from '@monorepo/design-system/src/components/organisms/MobileBottomNav/MobileBottomNav.types';
// ✅ 1. ایمپورت store سبد خرید
import { useBasketStore } from '@/src/stores/basketStore';
import { toPersianDigits } from '@monorepo/design-system/src/utils/persian';

export const AppMobileNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  
  // ✅ 2. اتصال به basketStore و دریافت داده‌های داینامیک
  const { totalQuantity, totalFinalPrice } = useBasketStore();

  // داده‌های مربوط به احراز هویت را می‌توان بعداً از یک store دیگر خواند
  const isAuthenticated = false; 

  // اگر در صفحه سبد خرید هستیم، پنل شناور را همیشه باز نگه می‌داریم
  const isCartPage = pathname.startsWith('/checkout');

  const getActiveId = () => {
    if (pathname === '/') return 'home';
    if (pathname.startsWith('/categories')) return 'category';
    if (pathname.startsWith('/blog')) return 'blog';
    if (pathname.startsWith('/checkout')) return 'cart';
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/login')) return 'profile';
    return '';
  };

  const navItems: MobileNavItem[] = [
    {
      id: 'profile',
      label: isAuthenticated ? 'پروفایل' : 'ورود',
      icon: <User size={20} />,
      href: isAuthenticated ? '/dashboard' : '/login',
    },
    {
      id: 'blog',
      label: 'بلاگ',
      icon: <BookOpen size={20} />,
      href: '/blog',
    },
    {
      id: 'cart',
      label: 'سبد خرید',
      icon: <ShoppingCart size={20} />,
      href: '/checkout',
      // ✅ 3. badgeCount حالا از totalQuantity خوانده می‌شود
      badgeCount: totalQuantity > 0 ? toPersianDigits(totalQuantity) : undefined,
    },
    {
      id: 'category',
      label: 'دسته‌بندی',
      icon: <LayoutGrid size={20} />,
      href: '/categories',
    },
    {
      id: 'home',
      label: 'خانه',
      icon: <Home size={20} />,
      href: '/',
    },
  ];

  return (
    <MobileBottomNav 
      items={navItems} 
      activeId={getActiveId()} 
      // ✅ 4. cartSummary به طور کامل داینامیک شد
      cartSummary={totalQuantity > 0 ? {
        itemCount: totalQuantity,
        totalPrice: totalFinalPrice,
        onCheckout: () => router.push('/checkout'),
        alwaysOpen: isCartPage
      } : undefined}
    />
  );
};