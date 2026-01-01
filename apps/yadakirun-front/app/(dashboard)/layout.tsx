import React from 'react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers'; // ✅ اینجا مجاز است چون فایل app/ است

import { Wrench, ShieldCheck, Headphones } from 'lucide-react';
import { menuService } from '@monorepo/api-client/src/services/menuService';
import { footerService } from '@monorepo/api-client/src/services/footerService';
import { userService } from '@monorepo/api-client/src/services/userService';
import { MainLayoutClient } from '@/src/components/layout/MainLayoutClient';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. دریافت کوکی‌ها در سرور
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  // 2. پاس دادن کوکی به سرویس
  const user = await userService.getCurrentUser(cookieHeader);

  // 3. بررسی نقش کاربر
  const isAnonymous = !user || user.roles?.some(role => role.name === 'Anonymous');

  if (isAnonymous) {
    redirect('/login');
  }

  // --- ادامه کد بدون تغییر ---
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