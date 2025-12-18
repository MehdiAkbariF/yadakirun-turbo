"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, Search } from "lucide-react";

// --- Design System Components ---
import { Header } from "@monorepo/design-system/src/components/organisms/Header/Header";
import { MegaMenu } from "@monorepo/design-system/src/components/organisms/MegaMenu/MegaMenu";
import { ThemeToggle } from "@monorepo/design-system/src/components/atoms/ThemeToggle/ThemeToggle";
import { Input } from "@monorepo/design-system/src/components/atoms/Input/Input";
import { Label } from "@monorepo/design-system/src/components/atoms/Label/Label";

// --- Hooks & Utils ---
import { useTheme } from "@/src/context/ThemeProvider";
import { toPersianDigits } from "@monorepo/design-system/src/utils/persian";

// --- Global Stores ---
import { useBasketStore } from "@/src/stores/basketStore";
import { useUIStore } from "@/src/stores/uiStore";
// ✅ 1. ایمپورت هوک سفارشی احراز هویت
import { useAuth } from "@/src/context/AuthContext";

// --- Types ---
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
  // ✅ 2. دریافت وضعیت احراز هویت و لودینگ از AuthContext
  const { isAuthenticated, isLoading } = useAuth();

  const navigationItems = useMemo(() => {
    const safeProductCategories = menuData?.productCategories || [];
    const safeCarManufacturers = menuData?.carManufacturers || [];

    const categoriesNode = {
      id: "categories",
      title: "دسته‌بندی فروشگاه",
      href: "/products-category",
      children: [
        {
          id: "parts",
          title: "قطعات خودرو",
          href: "/parts",
          children: safeProductCategories.map((cat) => ({
            id: `cat-${cat.id}`,
            title: cat.name,
            href: `/ProductCategoryPage/${cat.id}`,
          })),
        },
        {
          id: "brands",
          title: "برند خودرو",
          href: "/brands",
          children: safeCarManufacturers.map((brand) => ({
            id: `brand-${brand.id}`,
            title: brand.name,
            href: `/CarManufacturerPage/${brand.id}`,
            children: brand.cars?.map((car) => ({
              id: `car-${car.id}`,
              title: car.modelName,
              href: `/CarPage/${car.id}`,
            })) || [],
          })),
        },
      ],
    };

    const staticLinks = [
      { id: "blog", title: "بلاگ", href: "/blog" },
      { id: "about", title: "درباره ما", href: "/about-us" },
      { id: "faq", title: "تماس با ما", href: "/contact-us" },
      { id: "track-order", title: "پیگیری سفارش", href: "/track-order", mobileOnly: true },
      { id: "support", title: "پشتیبانی آنلاین", href: "/support", mobileOnly: true },
    ];

    return [categoriesNode, ...staticLinks];
  }, [menuData]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = pathname === "/";
  const headerClassName = isHomePage && !isScrolled ? "bg-[#E5E3DF]" : "";

  // --- Slot Components ---

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
      onClick={openCartDrawer}
    >
      <ShoppingCart size={22} />
      {totalQuantity > 0 && (
        <span className="cart-badge">{toPersianDigits(totalQuantity)}</span>
      )}
    </button>
  );

  const themeToggleComponent = (
    <div className="">
      <ThemeToggle
        variant="icon"
        className="header-action header-action--theme-toggle"
        isDarkMode={theme === "dark-blue"}
        onToggle={toggleTheme}
      />
    </div>
  );

  // ✅ 3. کامپوننت لینک کاربر حالا کاملاً داینامیک است
  const userLinkComponent = isLoading ? (
    // در حالت لودینگ اولیه، یک placeholder نمایش می‌دهیم تا UI نپرد
    <div className="header-action header-action--user-link w-[110px] h-[22px]" />
  ) : (
    <Link 
      href={isAuthenticated ? "/dashboard" : "/login"} 
      className="header-action header-action--user-link"
    >
      <User size={22} />
      <Label as="span" size="sm" weight="semi-bold" color="primary" className="hidden md:inline">
        {isAuthenticated ? "پروفایل من" : "ورود | ثبت‌نام"}
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
      className={headerClassName}
      logo={
        <Link href="/">
          <Image
            src="/logo.webp"
            alt="لوگوی یاداکیرون"
            width={150}
            height={50}
            className="h-auto"
          />
        </Link>
      }
      megaMenuSlot={
        megaMenuItem && (
          <MegaMenu
            triggerText={megaMenuItem.title}
            categories={categoriesForMegaMenu}
            brands={brandsForMegaMenu.map((brand: any) => ({
              ...brand,
              subItems: brand.children || [],
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
  );
};