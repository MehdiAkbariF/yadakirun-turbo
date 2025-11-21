"use client";

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Home, LayoutGrid, ShoppingCart, BookOpen, User } from 'lucide-react'; // استفاده از آیکون‌های استاندارد Lucide
import { MobileBottomNav } from '@monorepo/design-system/src/components/organisms/MobileBottomNav/MobileBottomNav';
import { MobileNavItem } from '@monorepo/design-system/src/components/organisms/MobileBottomNav/MobileBottomNav.types';

export const AppMobileNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  
  // TODO: این‌ها باید از کانتکست واقعی خوانده شوند
  const isAuthenticated = false; 
  const cartItemsCount = 3; 

  // تشخیص تب فعال بر اساس مسیر
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
      href: '/checkout', // یا اگر مودال است onClick هندل شود
      badgeCount: cartItemsCount > 0 ? cartItemsCount : undefined,
    },
    {
      id: 'category',
      label: 'دسته‌بندی',
      icon: <LayoutGrid size={20} />, // جایگزین BiSolidCategoryAlt
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
    />
  );
};