"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, User, Search } from "lucide-react";

import { Header } from "@monorepo/design-system/src/components/organisms/Header/Header";
import { MegaMenu } from "@monorepo/design-system/src/components/organisms/MegaMenu/MegaMenu";
import { ThemeToggle } from "@monorepo/design-system/src/components/atoms/ThemeToggle/ThemeToggle";
import { Input } from "@monorepo/design-system/src/components/atoms/Input/Input";
import { Label } from "@monorepo/design-system/src/components/atoms/Label/Label";
import { CartDrawer } from "@monorepo/design-system/src/components/organisms/CartDrawer/CartDrawer";
import { useTheme } from "@/src/context/ThemeProvider";
import { toPersianDigits } from "@monorepo/design-system/src/utils/persian";
import { MenuData } from "@monorepo/api-client/src/types/menu.types";

// داده‌های اولیه سبد خرید
const initialCartItems = [
  {
    id: "1",
    title: "کیت تسمه تایم اصلی رنو تندر 90",
    price: 2300000,
    imgSrc: "/disk.webp",
    quantity: 1,
  },
  {
    id: "2",
    title: "لنت ترمز جلو پراید سرامیکی",
    price: 750000,
    imgSrc: "/news4.webp",
    quantity: 2,
  },
];

interface MainHeaderProps {
  menuData?: MenuData; // علامت سوال اضافه شد تا در صورت نبود دیتا ارور ندهد
}

export const MainHeader = ({ menuData }: MainHeaderProps) => {
  console.log("--- MainHeader Component Rendered ---");
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState(initialCartItems);

  const navigationItems = useMemo(() => {
    // ✅ ایمن‌سازی دیتا: اگر menuData نال بود، آبجکت‌های خالی جایگزین شوند
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
          // ✅ استفاده از متغیر ایمن شده
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
          // ✅ استفاده از متغیر ایمن شده
          children: safeCarManufacturers.map((brand) => ({
            id: `brand-${brand.id}`,
            title: brand.name,
            href: `/CarManufacturerPage/${brand.id}`,
            // ✅ استفاده از Optional Chaining برای children داخلی
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
      {
        id: "track-order",
        title: "پیگیری سفارش",
        href: "/track-order",
        mobileOnly: true,
      },
      {
        id: "support",
        title: "پشتیبانی آنلاین",
        href: "/support",
        mobileOnly: true,
      },
    ];

    return [categoriesNode, ...staticLinks];
  }, [menuData]); // وابستگی به menuData صحیح است

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsCartOpen(false);
  }, [pathname]);

  const handleIncrease = (id: string | number) =>
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  const handleDecrease = (id: string | number) =>
    setCartItems((items) =>
      items.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  const handleRemove = (id: string | number) =>
    setCartItems((items) => items.filter((item) => item.id !== id));
  const handleClearCart = () => setCartItems([]);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const isHomePage = pathname === "/";
  const headerClassName = isHomePage && !isScrolled ? "bg-[#E5E3DF]" : "";

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
        <span className="cart-badge">{toPersianDigits(cartItems.length)}</span>
      )}
    </button>
  );
  const themeToggleComponent = (
    <>
      <div className="">
        <ThemeToggle
          variant="icon"
          className="header-action header-action--theme-toggle"
          isDarkMode={theme === "dark-blue"}
          onToggle={toggleTheme}
        />
      </div>
    </>
  );
  const userLinkComponent = (
    <Link href="/login" className="header-action header-action--user-link">
      <User size={22} />
      <Label
        as="span"
        size="sm"
        weight="semi-bold"
        color="primary"
        className="hidden md:inline"
      >
        ورود | ثبت‌نام
      </Label>
    </Link>
  );

  const megaMenuItem = navigationItems.find((item) => item.id === "categories");
  // ✅ ایمن‌سازی دسترسی به children
  const categoriesForMegaMenu =
    megaMenuItem?.children?.find((c: any) => c.id === "parts")?.children || [];
  const brandsForMegaMenu =
    megaMenuItem?.children?.find((c: any) => c.id === "brands")?.children || [];

  return (
    <>
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

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems.map((item) => ({
          ...item,
          onIncrease: () => handleIncrease(item.id),
          onDecrease: () => handleDecrease(item.id),
          onRemove: () => handleRemove(item.id),
        }))}
        totalPrice={totalPrice}
        onCheckout={() => {
          setIsCartOpen(false);
          router.push("/checkout");
        }}
        onClearCart={handleClearCart}
      />
    </>
  );
};