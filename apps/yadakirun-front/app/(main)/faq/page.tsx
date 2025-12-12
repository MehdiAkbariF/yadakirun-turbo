import React from 'react';
import { Metadata } from 'next';
import { CircleHelp, MessageCircleQuestion } from 'lucide-react';
import { faqService } from '@monorepo/api-client/src/services/faqService'; // ✅ ایمپورت سرویس

// --- Design System Imports ---
import { Container } from '@monorepo/design-system/src/components/organisms/Container/Container';
import { Label } from '@monorepo/design-system/src/components/atoms/Label/Label';
import { Accordion } from '@monorepo/design-system/src/components/molecules/Accordion/Accordion';

// --- Metadata (داینامیک) ---
export async function generateMetadata(): Promise<Metadata> {
  const faqData = await faqService.getFaqPageData();

  if (!faqData) {
    return {
      title: 'پرسش‌های متداول | یدکی‌ران',
      description: 'پاسخ به سوالات متداول کاربران فروشگاه اینترنتی یدکی‌ران.',
    };
  }

  return {
    title: faqData.metaTitle,
    description: faqData.metaDescription,
    alternates: {
      canonical: faqData.canonicalUrl,
    },
  };
}


// ✅ کامپوننت به async تبدیل شد
export default async function FaqPage() {

  // دریافت داده‌ها در سرور
  const faqPageData = await faqService.getFaqPageData();
  
  // اگر داده‌ای نبود، یک آرایه خالی در نظر می‌گیریم تا صفحه کرش نکند
  const faqCategories = faqPageData?.faqCategories || [];

  return (
    <div className="bg-body min-h-screen pb-20">
      
      {/* --- Header Banner --- */}
      <section className="bg-surface border-b border-border-secondary py-12 mb-10">
        <Container>
          <div className="flex flex-col items-center text-center gap-4">
             <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary mb-2">
                <MessageCircleQuestion size={32} />
             </div>
             <Label as="h1" size="3x" weight="extra-bold" color="heading">
               پرسش‌های متداول
             </Label>
             <Label as="p" size="lg" color="secondary" className="max-w-2xl">
               پاسخ به سوالاتی که شاید برای شما هم پیش آمده باشد
             </Label>
          </div>
        </Container>
      </section>

      <Container>
        <div className="max-w-3xl mx-auto space-y-8">
          
          {/* 
            --- FAQ List ---
            حالا بر اساس دسته‌بندی‌های دریافتی از API رندر می‌کنیم
          */}
          {faqCategories.length > 0 ? (
            faqCategories.map((category, catIndex) => (
              <div key={catIndex} className="bg-surface rounded-2xl shadow-sm border border-border-secondary p-6 md:p-8">
                {/* نمایش عنوان دسته‌بندی */}
                <Label as="h2" size="xl" weight="bold" className="mb-6 border-r-4 border-brand-primary pr-4">
                  {category.title}
                </Label>

                {category.faQs.map((item, itemIndex) => (
                  <Accordion 
                    key={itemIndex} 
                    title={item.question}
                    icon={<CircleHelp size={20} className="text-brand-primary" />}
                    // اولین آیتم از اولین دسته‌بندی باز باشد
                    defaultOpen={catIndex === 0 && itemIndex === 0}
                    className="last:mb-0"
                  >
                    <Label 
                      as="p" 
                      size="base" 
                      color="secondary" 
                      className="leading-loose text-justify"
                    >
                      {item.answer}
                    </Label>
                  </Accordion>
                ))}
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-surface rounded-xl border border-border-secondary">
              <Label color="secondary">موردی برای نمایش یافت نشد.</Label>
            </div>
          )}

        </div>
      </Container>
    </div>
  );
}