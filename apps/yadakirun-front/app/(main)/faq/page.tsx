import React from 'react';
import { Metadata } from 'next';
import { CircleHelp, MessageCircleQuestion } from 'lucide-react';

// --- Design System Imports ---
import { Container } from '@monorepo/design-system/src/components/organisms/Container/Container';
import { Label } from '@monorepo/design-system/src/components/atoms/Label/Label';
import { Accordion } from '@monorepo/design-system/src/components/molecules/Accordion/Accordion';

// --- Metadata ---
export const metadata: Metadata = {
  title: 'پرسش‌های متداول | یدکی‌ران',
  description: 'پاسخ به سوالات متداول کاربران درباره نحوه ارسال، ضمانت اصالت، بازگشت کالا و پیگیری سفارشات در فروشگاه اینترنتی یدکی‌ران.',
};

// --- FAQ Data ---
const faqData = [
  {
    question: 'چگونه می‌توانم از اصالت کالا مطمئن شوم؟',
    answer: 'تمام قطعات یدکی موجود در یدکی‌ران دارای تضمین کیفیت و اصالت هستند. ما کالاها را مستقیماً از تأمین‌کنندگان معتبر تهیه می‌کنیم و برای تمامی قطعات اصلی (Genuine) ضمانت اصالت کالا ارائه می‌دهیم. در صورت وجود هرگونه مغایرت، امکان مرجوعی کالا وجود دارد.',
  },
  {
    question: 'زمان و نحوه ارسال سفارشات چگونه است؟',
    answer: 'سفارش‌های تهران در صورت ثبت قبل از ساعت ۱۶، همان روز با پیک ارسال می‌شوند. سفارش‌های شهرستان‌ها از طریق تیپاکس یا باربری ارسال شده و معمولاً بین ۲۴ تا ۷۲ ساعت کاری (بسته به مسافت) به دست شما می‌رسند.',
  },
  {
    question: 'آیا امکان مرجوع کردن کالا وجود دارد؟',
    answer: 'بله، رضایت مشتری اولویت ماست. شما تا ۷ روز پس از تحویل کالا فرصت دارید تا در صورت وجود نقص فنی، مغایرت با توضیحات سایت یا عدم اصالت، درخواست مرجوعی خود را ثبت کنید. لطفاً توجه داشته باشید که جعبه و بسته‌بندی کالا باید سالم باشد.',
  },
  {
    question: 'چگونه می‌توانم سفارشم را پیگیری کنم؟',
    answer: 'پس از ثبت و پردازش سفارش، کد رهگیری پستی یا تیپاکس برای شما پیامک خواهد شد. همچنین می‌توانید با ورود به پنل کاربری خود و مراجعه به بخش "سفارش‌های من"، وضعیت لحظه‌ای سفارش خود را مشاهده کنید.',
  },
  {
    question: 'آیا امکان خرید حضوری نیز وجود دارد؟',
    answer: 'در حال حاضر، یدکی‌ران با هدف کاهش هزینه‌ها و ارائه بهترین قیمت به مشتریان، به صورت کاملاً آنلاین فعالیت می‌کند و امکان خرید حضوری در انبار مرکزی وجود ندارد.',
  },
  {
    question: 'هزینه ارسال چگونه محاسبه می‌شود؟',
    answer: 'هزینه ارسال بر اساس وزن و ابعاد مرسوله و همچنین شهر مقصد محاسبه می‌شود. برای خریدهای بالای ۵ میلیون تومان، ارسال به سراسر کشور رایگان است.',
  },
];

export default function FaqPage() {
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
        <div className="max-w-3xl mx-auto">
          
          {/* --- FAQ List --- */}
          <div className="bg-surface rounded-2xl shadow-sm border border-border-secondary p-6 md:p-8">
            {faqData.map((item, index) => (
              <Accordion 
                key={index} 
                title={item.question}
                // آیکون اختصاصی برای هر سوال
                icon={<CircleHelp size={20} className="text-brand-primary" />}
                // اولین آیتم به صورت پیش‌فرض باز باشد
                defaultOpen={index === 0}
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

          {/* --- Contact CTA --- */}
         

        </div>
      </Container>
    </div>
  );
}