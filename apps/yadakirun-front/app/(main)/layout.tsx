import React from 'react';
import Image from 'next/image';
import { Wrench, ShieldCheck, Headphones } from 'lucide-react'; // آیکون‌های استاندارد از lucide-react

// ایمپورت کردن کامپوننت‌های اصلی از محل صحیح
import { MainHeader } from '@/src/components/layout/MainHeader';
import { VideoBanner } from '@/src/components/layout/VideoBanner';
import { Footer } from '@monorepo/design-system/src/components/organisms/Footer/Footer'; // ✅ ایمپورت فوتر جدید
import { AppMobileNav } from '@/src/components/layout/AppMobileNav'; // ✅ ایمپورت جدید
// ✅ داده‌های فوتر را در لی‌اوت تعریف می‌کنیم
const footerData = {
  logo: <Image src="/logo.webp" alt="لوگوی یاداکیرون" width={80} height={80} />,
  companyName: "فروشگاه آنلاین لوازم یدکی خودرو",
  tagline: "یدکی ران",
  description: "یدکی‌ران، دسترسی به قطعات یدکی تمامی خودروهای موجود در بازار ایران، آسان‌تر از همیشه است! ما متعهد هستیم که با ارائه‌ی قطعات اصلی، قیمت‌های رقابتی و ارسال سریع، تجربه‌ای مطمئن و راحت برای شما رقم بزنیم.",
  supportPhone1: "021-33988013",
  supportPhone2: "09357744749",
  workHours: ["شنبه تا چهارشنبه، ۹ الی ۱۷", "پنجشنبه ها، ۹ الی ۱۳"],
  serviceCards: [
    { icon: <Wrench />, title: "نصب فوری", description: "نصب توسط تکنسین‌های مجرب" },
    { icon: <ShieldCheck />, title: "گارانتی اصالت", description: "ضمانت کیفیت تمامی قطعات" },
    { icon: <Headphones />, title: "پشتیبانی ۲۴/۷", description: "پشتیبانی تلفنی و آنلاین" },
  ],
  footerButtons: [
    { text: "مجوزها", href: "/licenses" },
    { text: "درباره ما", href: "/about-us" },
    { text: "تماس با ما", href: "/contact" },
    { text: "سوالات متداول", href: "/faq" },
    { text: "دسته بندی ها", href: "/categories" },
    { text: "نحوه ارسال و مرجوعی", href: "/shipping-policy" },
  ],
  trustSeals: [
    { src: "/samandehi-1.png", alt: "انجمن صنفی کسب و کارهای اینترنتی", href:"#" },
    { src: "/samandehi-1.png", alt: "نماد اعتماد الکترونیکی", href:"#" },
    { src: "/samandehi-1.png", alt: "نشان ملی ثبت رسانه‌های دیجیتال", href:"#" },
    { src: "/samandehi-1.png", alt: "ساماندهی", href:"#" },
  ],
  copyrightText: "تمام حقوق برای یدکی‌ران محفوظ بوده و استفاده از محتوای این وبسایت تنها با ذکر نام و درج لینک مستقیم مجاز است.",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="">
      <VideoBanner />
      <div className="relative    flex flex-col">
        <div className="sticky top-0 z-20">
          <MainHeader />
        </div>
        
        <main className="py-1 ">
          {children}
        </main>
      </div>

      <div className='mt-15'>
        <Footer {...footerData} />
      </div>
      
       <AppMobileNav />
    </div>
  );
}