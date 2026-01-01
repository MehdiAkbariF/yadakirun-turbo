"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, Search } from "lucide-react";

import { Header } from "@monorepo/design-system/src/components/organisms/Header/Header";
import { MegaMenu } from "@monorepo/design-system/src/components/organisms/MegaMenu/MegaMenu";
import { ThemeToggle } from "@monorepo/design-system/src/components/atoms/ThemeToggle/ThemeToggle";
import { Input } from "@monorepo/design-system/src/components/atoms/Input/Input";
import { Label } from "@monorepo/design-system/src/components/atoms/Label/Label";

import { useTheme } from "@/src/context/ThemeProvider";
import { toPersianDigits } from "@monorepo/design-system/src/utils/persian";
import { useBasketStore } from "@/src/stores/basketStore";
import { useUIStore } from "@/src/stores/uiStore";
import { useAuth } from "@/src/context/AuthContext";
import { MenuData } from "@monorepo/api-client/src/types/menu.types";

interface MainHeaderProps {
  menuData?: MenuData;
}

export const MainHeader = ({ menuData }: MainHeaderProps) => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  const { totalQuantity } = useBasketStore();
  const { openCartDrawer } = useUIStore();
  
  const { isAuthenticated, isLoading, user } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = useMemo(() => {
    const safeProductCategories = menuData?.productCategories || [];
    const safeCarManufacturers = menuData?.carManufacturers || [];

    return [
      {
        id: "categories",
        title: "دسته‌بندی فروشگاه",
        href: "/categories",
        children: [
          {
            id: "parts",
            title: "قطعات خودرو",
            href: "/parts",
            children: safeProductCategories.map((cat) => ({
              id: `cat-${cat.id}`,
              title: cat.name,
              // ✅ استفاده از EnglishName برای لینک دسته‌بندی
              // اگر englishName باشد از آن استفاده می‌کند، وگرنه ID
              href: `/ProductCategoryPage/${cat.englishName || cat.id}`,
            })),
          },
          {
            id: "brands",
            title: "برند خودرو",
            href: "/brands",
            children: safeCarManufacturers.map((brand) => ({
              id: `brand-${brand.id}`,
              title: brand.name,
              // ✅ استفاده از EnglishName برای لینک برند
              href: `/CarManufacturerPage/${brand.englishName || brand.id}`,
              children: brand.cars?.map((car) => ({
                id: `car-${car.id}`,
                title: car.modelName,
                // ✅ استفاده از EnglishName برای لینک خودرو (CarPage)
                // توجه: اگر نام پارامتر صفحه خودرو [slug] است، این لینک درست است
                href: `/CarPage/${car.englishName || car.id}`,
              })) || [],
            })),
          },
        ],
      },
      { id: "blog", title: "بلاگ", href: "/blog" },
      { id: "about", title: "درباره ما", href: "/about-us" },
      { id: "faq", title: "تماس با ما", href: "/contact-us" },
    ];
  }, [menuData]);

  // لاجیک تشخیص کاربر ناشناس
  const isAnonymousUser = user?.roles?.some((role: any) => role.name === 'Anonymous');
  const showProfileLink = isAuthenticated && !isAnonymousUser;

  const userLinkComponent = isLoading ? (
    <div className="header-action header-action--user-link w-[110px] h-[22px]" />
  ) : (
    <Link 
      href={showProfileLink ? "/dashboard" : "/login"} 
      className="header-action header-action--user-link"
    >
      <User size={22} />
      <Label as="span" size="sm" weight="semi-bold" color="primary" className="hidden md:inline">
        {showProfileLink ? "پروفایل من" : "ورود | ثبت‌نام"}
      </Label>
    </Link>
  );

  const megaMenuItem = navigationItems.find((item) => item.id === "categories");
  const categoriesForMegaMenu = megaMenuItem?.children?.find((c: any) => c.id === "parts")?.children || [];
  const brandsForMegaMenu = megaMenuItem?.children?.find((c: any) => c.id === "brands")?.children || [];

  return (
    <Header
      isScrolled={isScrolled}
      activePath={pathname}
      linkComponent={Link}
      logo={
        <Link href="/">
          <Image src="/logo.webp" alt="لوگوی یدکی‌ران" width={150} height={50} className="h-auto" priority />
        </Link>
      }
       megaMenuSlot={
        megaMenuItem && (
          <MegaMenu
            triggerText={megaMenuItem.title}
            href={megaMenuItem.href}
            categories={categoriesForMegaMenu}
            linkComponent={Link}
            brands={brandsForMegaMenu.map((brand: any) => ({
              ...brand,
              subItems: brand.children || [],
            }))}
          />
        )
      }
      navLinks={navigationItems}
      searchSlot={<div className="header-action header-action--search"><Input id="header-search" type="search" placeholder="جستجو..." leftIcon={<Search size={18} />} containerClassName="w-48 xl:w-72" /></div>}
      cartSlot={<button className="header-action header-action--cart relative" onClick={openCartDrawer}><ShoppingCart size={22} />{totalQuantity > 0 && <span className="cart-badge">{toPersianDigits(totalQuantity)}</span>}</button>}
      themeToggleSlot={<ThemeToggle variant="icon" className="header-action header-action--theme-toggle" isDarkMode={theme === "dark-blue"} onToggle={toggleTheme} />}
      userSlot={userLinkComponent}
    />
  );
};