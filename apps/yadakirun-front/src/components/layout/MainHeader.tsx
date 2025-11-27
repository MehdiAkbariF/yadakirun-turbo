"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingCart, User, Search } from 'lucide-react';

import { Header } from '@monorepo/design-system/src/components/organisms/Header/Header';
import { MegaMenu } from '@monorepo/design-system/src/components/organisms/MegaMenu/MegaMenu';
import { ThemeToggle } from '@monorepo/design-system/src/components/atoms/ThemeToggle/ThemeToggle';
import { Input } from '@monorepo/design-system/src/components/atoms/Input/Input';
import { Label } from '@monorepo/design-system/src/components/atoms/Label/Label';
import { CartDrawer } from '@monorepo/design-system/src/components/organisms/CartDrawer/CartDrawer'; 
import { useTheme } from '@/src/context/ThemeProvider';
import { toPersianDigits } from '@monorepo/design-system/src/utils/persian';

// منبع داده واحد برای تمام آیتم‌های منو
const navigationItems = [
  { 
    id: "categories", 
    title: "دسته‌بندی فروشگاه", 
    href: "/products-category",
    children: [
      {
        id: "parts",
        title: "قطعات خودرو",
        href: "/parts",
        children: [
          { id: "cat-1", title: "کمک فنر", href: "/category/shocks" },
          { id: "cat-2", title: "دیسک و صفحه", href: "/category/disc-plate" },
        ]
      },
      {
        id: "brands",
        title: "برند خودرو",
        href: "/brands",
        children: [
          {
            id: "brand-1", title: "رنو", href: "/brand/renault",
            children: [
              { id: "sub-1-1", title: "مگان", href: "/car/renault-megane" },
              { id: "sub-1-2", title: "ال 90", href: "/car/renault-l90" },
              { id: "sub-1-3", title: "ال 90", href: "/car/renault-l90" },
               { id: "sub-1-4", title: "ال 90", href: "/car/renault-l90" },
                { id: "sub-1-5", title: "ال 90", href: "/car/renault-l90" },
                 { id: "sub-1-6", title: "ال 90", href: "/car/renault-l90" },
            ],
          },
        ]
      }
    ]
  },
  { id: "blog", title: "بلاگ", href: "/blog" },
  { id: "about", title: "درباره ما", href: "/about-us" },
  { id: "faq", title: "تماس با ما", href: "/faq" },
  { id: "track-order", title: "پیگیری سفارش", href: "/track-order", mobileOnly: true },
  { id: "support", title: "پشتیبانی آنلاین", href: "/support", mobileOnly: true },
];

// داده‌های اولیه سبد خرید (برای نمایش عملکرد)
const initialCartItems = [
  { id: "1", title: "کیت تسمه تایم اصلی رنو تندر 90", price: 2300000, imgSrc: "/disk.webp", quantity: 1 },
  { id: "2", title: "لنت ترمز جلو پراید سرامیکی", price: 750000, imgSrc: "/news4.webp", quantity: 2 },
];

export const MainHeader = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  // --- State مدیریت سبد خرید ---
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(initialCartItems);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // بستن دراور هنگام تغییر مسیر
  useEffect(() => {
    setIsCartOpen(false);
  }, [pathname]);

  // --- هندلرهای سبد خرید ---
  const handleIncrease = (id: string | number) => {
    setCartItems(items => items.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const handleDecrease = (id: string | number) => {
    setCartItems(items => items.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
  };

  const handleRemove = (id: string | number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const isHomePage = pathname === "/";
  const headerClassName = isHomePage && !isScrolled ? "bg-[#E5E3DF]" : "";

  // کامپوننت‌های اسلات‌ها
  const searchComponent = (
    <div className="header-action header-action--search">
      <Input
        id="header-search"
        type="search"
        placeholder="جستجو..."
        leftIcon={<Search size={18} />}
        containerClassName="w-48 xl:w-72"
      />
    </div>
  );

  const cartComponent = (
    <button 
      className="header-action header-action--cart relative" 
      onClick={() => setIsCartOpen(true)}
    >
      <ShoppingCart size={22} />
      {cartItems.length > 0 && (
        <span className="cart-badge">
          {toPersianDigits(cartItems.length)}
        </span>
      )}
    </button>
  );
  
  const themeToggleComponent = (
    <>
      <div className="">
        <ThemeToggle
          variant="icon"
          className="header-action header-action--theme-toggle"
          isDarkMode={theme === 'dark-blue'}
          onToggle={toggleTheme}
        />
      </div>
    </>
  );

  const userLinkComponent = (
    <Link href="/login" className="header-action header-action--user-link">
      <User size={22} />
      <Label as="span" size="sm" weight="semi-bold" color="primary" className="hidden md:inline">
        ورود | ثبت‌نام
      </Label>
    </Link>
  );
  
  // استخراج داده‌های مورد نیاز برای MegaMenu
  const megaMenuItem = navigationItems.find(item => item.id === 'categories');
  const categoriesForMegaMenu = megaMenuItem?.children?.find(c => c.id === 'parts')?.children || [];
  const brandsForMegaMenu = megaMenuItem?.children?.find(c => c.id === 'brands')?.children || [];

  return (
    <>
      <Header
        isScrolled={isScrolled}
        activePath={pathname}
        className={headerClassName}
        logo={
          <Link href="/">
            <Image src="/logo.webp" alt="لوگوی یاداکیرون" width={150} height={50} className="h-auto"/>
          </Link>
        }
        megaMenuSlot={
          megaMenuItem && (
            <MegaMenu 
              triggerText={megaMenuItem.title} 
              categories={categoriesForMegaMenu}
              brands={brandsForMegaMenu.map(brand => ({
                ...brand,
                subItems: brand.children || []
              }))}
            />
          )
        }
        navLinks={navigationItems}
        searchSlot={searchComponent}
        cartSlot={cartComponent}
        themeToggleSlot={themeToggleComponent}
        userSlot={userLinkComponent}
      />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems.map(item => ({
           ...item,
           onIncrease: () => handleIncrease(item.id),
           onDecrease: () => handleDecrease(item.id),
           onRemove: () => handleRemove(item.id),
        }))}
        totalPrice={totalPrice}
        onCheckout={() => {
           setIsCartOpen(false);
           router.push('/checkout');
        }}
        onClearCart={handleClearCart}
      />
    </>
  );
};