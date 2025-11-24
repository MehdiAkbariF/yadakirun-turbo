"use client";

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Home, LayoutGrid, ShoppingCart, BookOpen, User } from 'lucide-react';
import { MobileBottomNav } from '@monorepo/design-system/src/components/organisms/MobileBottomNav/MobileBottomNav';
import { MobileNavItem } from '@monorepo/design-system/src/components/organisms/MobileBottomNav/MobileBottomNav.types';

export const AppMobileNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  
  // Mock Data (در پروژه واقعی از Context بخوانید)
  const isAuthenticated = false; 
  const cartItemsCount = 2; 
  const totalPrice = 3500000; // مبلغ کل فرضی

  // اگر در صفحه سبد خرید هستیم، پنل شناور را نشان ندهیم (چون خودش دکمه پرداخت دارد)
  const isCartPage = pathname.startsWith('/checkout');

  const getActiveId = () => {
    if (pathname === '/') return 'home';
    if (pathname.startsWith('/products-category')) return 'category';
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
      badgeCount: cartItemsCount > 0 ? cartItemsCount : undefined,
    },
    {
      id: 'category',
      label: 'دسته‌بندی',
      icon: <LayoutGrid size={20} />,
      href: '/products-category',
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
      // ✅ تنظیم alwaysOpen برای صفحه checkout
      cartSummary={cartItemsCount > 0 ? {
        itemCount: cartItemsCount,
        totalPrice: totalPrice,
        onCheckout: () => router.push('/checkout'), // یا لاجیک پرداخت نهایی
        alwaysOpen: isCartPage // اگر در صفحه سبد خریدیم، همیشه باز باشد
      } : undefined}
    />
  );
};