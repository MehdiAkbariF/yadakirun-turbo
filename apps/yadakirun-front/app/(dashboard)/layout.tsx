import React from 'react';
import Image from 'next/image';
import { Wrench, ShieldCheck, Headphones } from 'lucide-react';

// ایمپورت هدر و فوتر
import { MainHeader } from '@/src/components/layout/MainHeader';
import { Footer } from '@monorepo/design-system/src/components/organisms/Footer/Footer';
import { Container } from '@monorepo/design-system/src/components/organisms/Container/Container';

// داده‌های فوتر (مشابه لی‌اوت اصلی)
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
    { src: "/eanjoman-1.png", alt: "انجمن صنفی کسب و کارهای اینترنتی", href:"#" },
    { src: "/enamad-1.png", alt: "نماد اعتماد الکترونیکی", href:"#" },
    { src: "/jokmmpnlmlpk-1.png", alt: "نشان ملی ثبت رسانه‌های دیجیتال", href:"#" },
    { src: "/samandehi-1.png", alt: "ساماندهی", href:"#" },
  ],
  copyrightText: "تمام حقوق برای یدکی‌ران محفوظ بوده و استفاده از محتوای این وبسایت تنها با ذکر نام و درج لینک مستقیم مجاز است.",
};

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-bg-body min-h-screen flex flex-col">
      {/* هدر چسبان */}
      <div className="sticky top-0 z-20">
        <MainHeader />
      </div>
      
      {/* 
          محتوای اصلی
          نکته: VideoBanner اینجا وجود ندارد ✅
      */}
      <main className="flex-grow mt-20 mb-50">
        <Container >
        {children}
        </Container>
      </main>

      {/* فوتر */}
      <Footer {...footerData} />
    </div>
  );
}