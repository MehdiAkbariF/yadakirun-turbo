"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { Phone, Mail, MapPin, Smartphone, HelpCircle, ArrowLeft } from 'lucide-react';
import { ContactForm } from '@monorepo/design-system/src/components/organisms/ContactForm/ContactForm'; // ✅ ایمپورت جدید
import { Container } from '@monorepo/design-system/src/components/organisms/Container/Container';
import { PageHeader } from '@monorepo/design-system/src/components/organisms/PageHeader/PageHeader';
import { ContactItem } from '@monorepo/design-system/src/components/molecules/ContactItem/ContactItem';
import { Label } from '@monorepo/design-system/src/components/atoms/Label/Label';
import { Button } from '@monorepo/design-system/src/components/atoms/Button/Button';

// نقشه را داینامیک ایمپورت می‌کنیم
const MapSelector = dynamic(
  () => import('@monorepo/design-system/src/components/organisms/MapSelector/MapSelector').then(mod => mod.MapSelector),
  { ssr: false, loading: () => <div className="h-[300px] bg-gray-100 rounded-xl animate-pulse" /> }
);

export default function ContactUsPage() {
  // مختصات حدودی خیابان ملت تهران (می‌توانید دقیق‌تر کنید)
  const officeLocation = { lat: 35.689997, lng: 51.426637 };

  return (
    <main>
      {/* 1. بنر تمام صفحه */}
      <PageHeader 
        title="تماس با ما" 
        imageSrc="/contact-banner.webp" // یک عکس با کیفیت در پوشه public بگذارید
        height="350px"
      />

      <Container className="my-16">
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-8 items-start">
          
          {/* --- ستون اصلی (راست - اطلاعات تماس) --- */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
               <Label as="h2" size="2x" weight="bold">راه‌های ارتباطی</Label>
               <Label color="secondary" className="leading-relaxed">
                 تیم پشتیبانی یدکی‌ران در روزهای کاری آماده پاسخگویی به سوالات شما عزیزان است.
               </Label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ContactItem 
                icon={<Phone />} 
                title="تلفن ثابت" 
                value="021-33988013" 
                href="tel:02133988013"
              />
              <ContactItem 
                icon={<Smartphone />} 
                title="موبایل" 
                value="0935 7744 749" 
                href="tel:09357744749"
              />
              <ContactItem 
                icon={<Mail />} 
                title="ایمیل سازمانی" 
                value="info@yadakirun.com" 
                href="mailto:info@yadakirun.com"
              />
              <ContactItem 
                icon={<MapPin />} 
                title="کد پستی" 
                value="1143933534" 
              />
            </div>

            {/* آدرس کامل */}
            <ContactItem 
              icon={<MapPin />} 
              title="نشانی دفتر مرکزی" 
              value="تهران، خیابان جمهوری، خیابان ملت، کوچه کاوه، کوچه افسانه، پلاک 7، واحد 10" 
              isAddress
            />
    <div className="mt-8">
               <ContactForm />
            </div>
            {/* نقشه */}
            <div className="mt-8">
                <Label weight="bold" className="mb-4 block">موقعیت روی نقشه</Label>
                <MapSelector 
                  readOnly 
                  defaultLocation={officeLocation} 
                  height="350px"
                  className="rounded-2xl"
                 zoom={16} 
                 showNavigationButton
                />
            </div>
          </div>

          {/* --- ستون کناری (چپ - استیکی) --- */}
          <div className="lg:col-span-3 lg:sticky lg:top-32">
            <div className="bg-bg-surface border border-border-secondary rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-4 text-brand-primary">
                <HelpCircle size={32} />
                <Label size="base" weight="bold">سوالات متداول</Label>
              </div>
              
              <Label color="secondary" className="leading-loose mb-6 text-justify" size='sm'>
                لطفا پیش از تماس با ما، پرسش‌های متداول را بخوانید. بسیاری از سوالات شما در آنجا پاسخ داده شده است. اگر پاسخ خود را پیدا نکردید، با خوشحالی پاسخگوی شما هستیم.
              </Label>

              <Button 
                href="/faq" 
                variant="primary" 
                fullWidth 
                size="md"
                rightIcon={<ArrowLeft size={18} />}
                className='mt-5'
              >
                مشاهده پرسش‌های متداول
              </Button>
            </div>

            {/* باکس ساعات کاری (اختیاری ولی مفید) */}
            <div className="bg-bg-secondary/50 border border-border-secondary rounded-2xl p-6 mt-6">
                <Label weight="bold" className="mb-3 block">ساعات پاسخگویی</Label>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <Label size="sm" color="secondary">شنبه تا چهارشنبه</Label>
                        <Label size="sm" weight="medium">۹:۰۰ الی ۱۷:۰۰</Label>
                    </div>
                    <div className="flex justify-between">
                        <Label size="sm" color="secondary">پنج‌شنبه‌ها</Label>
                        <Label size="sm" weight="medium">۹:۰۰ الی ۱۳:۰۰</Label>
                    </div>
                </div>
            </div>
          </div>

        </div>
      </Container>
    </main>
  );
}