import React from 'react';
import Image from 'next/image';
import { Wrench, ShieldCheck, Headphones } from 'lucide-react';

// --- سرویس‌های API ---
import { menuService } from '@monorepo/api-client/src/services/menuService';
import { footerService } from '@monorepo/api-client/src/services/footerService';

// --- کامپوننت کلاینت جدید ---
import { MainLayoutClient } from '@/src/components/layout/MainLayoutClient';

// این کامپوننت حالا فقط یک کامپوننت سرور `async` است
export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. فراخوانی موازی APIها در سرور
  const [menuData, footerApiData] = await Promise.all([
    menuService.getMenuData(),
    footerService.getFooterData()
  ]);

  // 2. آماده‌سازی داده‌ها برای فوتر
  const footerData = {
    logo: <Image src="/logo.webp" alt="لوگوی یاداکیرون" width={80} height={80} />,
    companyName: "فروشگاه آنلاین لوازم یدکی خودرو",
    tagline: "یدکی ران",
    description: "یدکی‌ران، دسترسی به قطعات یدکی تمامی خودروهای موجود در بازار ایران، آسان‌تر از همیشه است! ما متعهد هستیم که با ارائه‌ی قطعات اصلی، قیمت‌های رقابتی و ارسال سریع، تجربه‌ای مطمئن و راحت برای شما رقم بزنیم.",
    supportPhone1: "021-33988013",
    supportPhone2: "09357744749",
    workHours: ["شنبه تا چهارشنبه، ۹ الی ۱۷", "پنجشنبه ها، ۹ الی ۱۳"],
    trustSeals: [
        { src: "/samandehi-1.png", alt: "انجمن صنفی کسب و کارهای اینترنتی", href:"#" },
        { src: "/samandehi-1.png", alt: "نماد اعتماد الکترونیکی", href:"#" },
        { src: "/samandehi-1.png", alt: "نشان ملی ثبت رسانه‌های دیجیتال", href:"#" },
        { src: "/samandehi-1.png", alt: "ساماندهی", href:"#" },
    ],
    copyrightText: "تمام حقوق برای یدکی‌ران محفوظ بوده و استفاده از محتوای این وبسایت تنها با ذکر نام و درج لینک مستقیم مجاز است.",
    serviceCards: footerApiData.saleServices.map(service => {
      let icon = <Wrench />;
      if (service.title.includes("گارانتی")) icon = <ShieldCheck />;
      if (service.title.includes("پشتیبانی")) icon = <Headphones />;
      return { icon, title: service.title, description: service.description };
    }),
    footerButtons: footerApiData.footerLinks.map(link => ({ text: link.title, href: link.url })),
  };

  // 3. رندر کردن کامپوننت کلاینت و پاس دادن تمام داده‌ها و children به آن
  return (
    <MainLayoutClient menuData={menuData} footerData={footerData}>
      {children}
    </MainLayoutClient>
  );
}