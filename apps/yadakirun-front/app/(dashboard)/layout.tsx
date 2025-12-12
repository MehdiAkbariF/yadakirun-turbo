import React from 'react';
import Image from 'next/image';
import { Wrench, ShieldCheck, Headphones } from 'lucide-react';

// --- سرویس‌های API ---
import { menuService } from '@monorepo/api-client/src/services/menuService';
import { footerService } from '@monorepo/api-client/src/services/footerService';

// --- ایمپورت کامپوننت‌های UI ---
import { MainHeader } from '@/src/components/layout/MainHeader';
import { Footer } from '@monorepo/design-system/src/components/organisms/Footer/Footer';
import { VideoBanner } from '@/src/components/layout/VideoBanner'; // اگر ویدیو بنر را می‌خواهید

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. فراخوانی موازی APIها در سرور (با مدیریت خطا)
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
      console.error("Error fetching layout data:", error);
      // در صورت خطا، متغیرها null می‌مانند و MainHeader به خاطر اصلاحات بالا هندل می‌کند
  }

  // 2. آماده‌سازی داده‌ها برای فوتر (با چک کردن وجود دیتا)
  const safeFooterServices = footerApiData?.saleServices || [];
  const safeFooterLinks = footerApiData?.footerLinks || [];

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
        { src: "/enamad-1.png", alt: "نماد اعتماد الکترونیکی", href:"#" },
        { src: "/jokmmpnlmlpk-1.png", alt: "نشان ملی ثبت رسانه‌های دیجیتال", href:"#" },
        { src: "/samandehi-1.png", alt: "ساماندهی", href:"#" },
    ],
    copyrightText: "تمام حقوق برای یدکی‌ران محفوظ بوده و استفاده از محتوای این وبسایت تنها با ذکر نام و درج لینک مستقیم مجاز است.",
    
    // تبدیل دیتای داینامیک سرویس‌ها
    serviceCards: safeFooterServices.length > 0 ? safeFooterServices.map((service: any) => {
      let icon = <Wrench />;
      if (service.title?.includes("گارانتی")) icon = <ShieldCheck />;
      if (service.title?.includes("پشتیبانی")) icon = <Headphones />;
      return { icon, title: service.title, description: service.description };
    }) : [ // فال‌بک استاتیک اگر API کار نکرد
        { icon: <Wrench />, title: "نصب فوری", description: "نصب توسط تکنسین‌های مجرب" },
        { icon: <ShieldCheck />, title: "گارانتی اصالت", description: "ضمانت کیفیت تمامی قطعات" },
        { icon: <Headphones />, title: "پشتیبانی ۲۴/۷", description: "پشتیبانی تلفنی و آنلاین" },
    ],

    // تبدیل دیتای داینامیک لینک‌ها
    footerButtons: safeFooterLinks.length > 0 
      ? safeFooterLinks.map((link: any) => ({ text: link.title, href: link.url }))
      : [
          { text: "مجوزها", href: "/licenses" },
          { text: "درباره ما", href: "/about-us" },
          { text: "تماس با ما", href: "/contact" },
      ]
  };

  return (
    <div className="flex flex-col min-h-screen">
   

       <div className="relative flex-1 z-10 flex flex-col">
          {/* هدر چسبان */}
          <div className="sticky top-0 z-20">
             {/* ✅ پاس دادن دیتای ایمن (حتی اگر null باشد، MainHeader هندل می‌کند) */}
             <MainHeader menuData={menuData || undefined} />
          </div>

          <main className="py-8 flex-grow px-5">
            {children}
          </main>

          <Footer {...footerData} />
       </div>
    </div>
  );
}