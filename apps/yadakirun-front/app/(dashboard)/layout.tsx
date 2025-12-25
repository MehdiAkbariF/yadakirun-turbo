import React from 'react';
import Image from 'next/image';
import { Wrench, ShieldCheck, Headphones } from 'lucide-react';

// --- سرویس‌های API ---
import { menuService } from '@monorepo/api-client/src/services/menuService';
import { footerService } from '@monorepo/api-client/src/services/footerService';

// --- کامپوننت کلاینت اصلی ---
import { MainLayoutClient } from '@/src/components/layout/MainLayoutClient';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. دریافت داده‌ها در سرور
  let menuData = null;
  let footerApiData = null;

  try {
      const data = await Promise.all([
        menuService.getMenuData(),
        footerService.getFooterData()
      ]);
      menuData = data[0];
      footerApiData = data[1];
  } catch (error) {
      console.error("Error fetching dashboard layout data:", error);
  }

  const safeFooterServices = footerApiData?.saleServices || [];
  const safeFooterLinks = footerApiData?.footerLinks || [];

  // 2. آماده‌سازی داده‌های فوتر
  const footerData = {
    logo: <Image src="/logo.webp" alt="لوگوی یاداکیرون" width={80} height={80} />,
    companyName: "فروشگاه آنلاین لوازم یدکی خودرو",
    tagline: "یدکی ران",
    description: "یدکی‌ران، دسترسی به قطعات یدکی تمامی خودروهای موجود در بازار ایران، آسان‌تر از همیشه است!",
    supportPhone1: "021-33988013",
    supportPhone2: "09357744749",
    workHours: ["شنبه تا چهارشنبه، ۹ الی ۱۷", "پنجشنبه ها، ۹ الی ۱۳"],
    trustSeals: [
        { src: "/samandehi-1.png", alt: "ساماندهی", href:"#" },
        { src: "/enamad-1.png", alt: "نماد اعتماد", href:"#" },
        { src: "/jokmmpnlmlpk-1.png", alt: "نشان ملی", href:"#" },
    ],
    copyrightText: "تمام حقوق برای یدکی‌ران محفوظ است.",
    
    serviceCards: safeFooterServices.length > 0 ? safeFooterServices.map((service: any) => {
      let icon = <Wrench />;
      if (service.title?.includes("گارانتی")) icon = <ShieldCheck />;
      if (service.title?.includes("پشتیبانی")) icon = <Headphones />;
      return { icon, title: service.title, description: service.description };
    }) : [
        { icon: <Wrench />, title: "نصب فوری", description: "نصب توسط تکنسین‌های مجرب" },
        { icon: <ShieldCheck />, title: "گارانتی اصالت", description: "ضمانت کیفیت قطعات" },
        { icon: <Headphones />, title: "پشتیبانی ۲۴/۷", description: "پشتیبانی آنلاین" },
    ],

    footerButtons: safeFooterLinks.length > 0 
      ? safeFooterLinks.map((link: any) => ({ text: link.title, href: link.url }))
      : [
          { text: "درباره ما", href: "/about-us" },
          { text: "تماس با ما", href: "/contact" },
      ]
  };

  // 3. ✅ استفاده از MainLayoutClient برای فعال کردن تمام قابلیت‌های کلاینتی
  // مقدار showVideoBanner را false می‌گذاریم چون در داشبورد بنر ویدیو نمی‌خواهیم.
  return (
    <MainLayoutClient 
      menuData={menuData} 
      footerData={footerData} 
      showVideoBanner={false}
    >
      {children}
    </MainLayoutClient>
  );
}