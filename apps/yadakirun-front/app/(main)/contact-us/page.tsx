import React from 'react';
import { Metadata } from 'next';
import { contactUsService } from '@monorepo/api-client/src/services/contactUsService';
// ✅ ایمپورت کامپوننت کلاینت جدید
import { ContactUsClient } from '@/src/components/ContactUsPage/ContactUsClient';

// --- Metadata (داینامیک) ---
export async function generateMetadata(): Promise<Metadata> {
  const pageData = await contactUsService.getContactUsPageData();

  if (!pageData) {
    return {
      title: 'تماس با ما | یدکی‌ران',
      description: 'راه‌های ارتباطی با فروشگاه اینترنتی لوازم یدکی یدکی‌ران.',
    };
  }

  return {
    title: pageData.metaTitle,
    description: pageData.metaDescription,
    alternates: {
      canonical: pageData.canonicalUrl,
    },
  };
}

// کامپوننت سرور (فقط برای دریافت داده)
export default async function ContactUsPage() {
  // دریافت داده‌ها در سرور
  const pageData = await contactUsService.getContactUsPageData();
  
  // پاس دادن داده‌ها به کامپوننت کلاینت برای رندر شدن
  return <ContactUsClient pageData={pageData} />;
}