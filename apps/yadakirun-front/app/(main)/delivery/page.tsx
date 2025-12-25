import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { Truck, RefreshCw, AlertCircle, Clock, MapPin, CheckCircle2 } from 'lucide-react';

// --- Design System Imports ---
import { Container } from '@monorepo/design-system/src/components/organisms/Container/Container';
import { ContentSection } from '@monorepo/design-system/src/components/molecules/ContentSection/ContentSection';
import { Label } from '@monorepo/design-system/src/components/atoms/Label/Label';

// --- Local Components ---
import { DeliveryActions } from '@/src/components/delivery/DeliveryActions';

export const metadata: Metadata = {
  title: 'نحوه ارسال و مرجوعی کالا | یدکی‌ران',
  description: 'اطلاع از شرایط ارسال سفارشات در تهران و شهرستان، روش‌های پرداخت هزینه حمل و نقل و قوانین مرجوعی کالا در فروشگاه یدکی‌ران.',
};

export default function DeliveryPage() {
  return (
    <div className="bg-bg-body min-h-screen pb-20">
      
      {/* === بخش ۱: بنر تمام‌عرض === */}
      <section className="relative w-full h-64 lg:h-80">
        <Image 
            src="/aboutus.png" 
            alt="ارسال و مرجوعی یدکی‌ران"
            fill
            className="object-cover"
            priority
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
            <Truck size={48} className="text-brand-primary mb-4" />
            <Label as="h1" size="4x" weight="black" className="text-white drop-shadow-md text-center">
              نحوه ارسال و مرجوعی کالا
            </Label>
        </div>
      </section>

      <Container>
        <div className="relative z-10 -mt-12 lg:-mt-16 mb-10">
            <div className="bg-surface rounded-3xl shadow-xl border border-border-secondary p-6 md:p-10 lg:p-12">
                
                <div className="space-y-12">
                    
                    {/* مقدمه */}
                    <div className="text-center max-w-3xl mx-auto">
                        <Label as="p" size="lg" weight="medium" className="leading-loose text-text-primary">
                            در یدکی‌ران، تلاش ما بر این است که سفارشات شما در سریع‌ترین زمان ممکن و با بهترین روش‌های ارسال، به دستتان برسد.
                        </Label>
                    </div>

                    {/* شرایط ارسال */}
                    <ContentSection title="شرایط ارسال سفارشات">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-brand-primary">
                                    <CheckCircle2 size={20} />
                                    <Label weight="bold">روش پرداخت هزینه ارسال</Label>
                                </div>
                                <Label as="p" size="sm" color="secondary" className="leading-loose text-justify">
                                    تمامی سفارش‌ها به‌صورت **پس کرایه** ارسال می‌شوند. این بدان معناست که هزینه ارسال بر عهده مشتری است و هنگام دریافت کالا، مستقیماً به مأمور تحویل‌دهنده پرداخت می‌شود.
                                </Label>
                            </div>

                            <div className="space-y-4 bg-bg-secondary p-5 rounded-2xl border border-border-secondary">
                                <div className="flex items-center gap-2 text-brand-accent">
                                    <MapPin size={20} />
                                    <Label weight="bold">ارسال در تهران</Label>
                                </div>
                                <ul className="space-y-3">
                                    <li className="flex gap-2 text-text-secondary">
                                        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-2 shrink-0"></span>
                                        <Label size="sm">ثبت سفارش قبل از ساعت ۱۴: ارسال همان روز.</Label>
                                    </li>
                                    <li className="flex gap-2 text-text-secondary">
                                        <span className="w-1.5 h-1.5 rounded-full bg-text-placeholder mt-2 shrink-0"></span>
                                        <Label size="sm">ثبت سفارش بعد از ساعت ۱۴: ارسال روز کاری بعد.</Label>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </ContentSection>

                    <hr className="border-border-secondary" />

                    {/* شرایط مرجوعی */}
                    <ContentSection title="شرایط مرجوعی کالا">
                        <div className="bg-bg-secondary border border-secondary-bg p-6 rounded-2xl mb-8">
                            <div className="flex items-center gap-3 mb-3 text-orange-700">
                                <Clock size={24} />
                                <Label weight="black">مهلت ۲۴ ساعته</Label>
                            </div>
                            <Label as="p" size="sm" className="text-orange-900 leading-loose">
                                حداکثر تا **۲۴ ساعت** پس از دریافت کالا، فرصت دارید درخواست مرجوعی خود را در پنل کاربری ثبت کنید.
                            </Label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div>
                                <Label weight="bold" className="mb-4 block">شرایط مرجوعی:</Label>
                                <ul className="space-y-4">
                                    {[
                                        "کالا در بسته‌بندی اصلی و بدون آسیب باشد.",
                                        "عدم نصب یا استفاده بر روی خودرو.",
                                        "ارائه فاکتور خرید معتبر."
                                    ].map((text, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <CheckCircle2 size={18} className="text-utility-success shrink-0 mt-1" />
                                            <Label size="sm" color="secondary">{text}</Label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-bg-secondary p-6 rounded-2xl">
                                <Label weight="bold" className="mb-4 block text-brand-primary">فرآیند بازگشت وجه:</Label>
                                <Label size="sm" color="secondary" className="leading-loose">
                                    پس از دریافت قطعه توسط تیم فنی و تأیید سلامت آن، مبلغ پرداختی ظرف مدت ۴۸ ساعت کاری به حساب مشتری عودت داده خواهد شد.
                                </Label>
                            </div>
                        </div>
                    </ContentSection>

                    {/* ✅ بخش توجه نهایی اصلاح شده با دکمه‌های تعاملی ✅ */}
                    <div className="flex items-start gap-4 p-8 bg-bg-secondary rounded-3xl">
                        <AlertCircle className="text-blue-600 shrink-0" size={28} />
                        <div className="w-full">
                            <Label weight="black" size="lg" className="text-blue-900 mb-2 block">📌 راهنمایی بیشتر نیاز دارید؟</Label>
                            <Label size="sm" className="leading-loose ">
                                در صورتی که در مورد روش‌های ارسال سوالی دارید یا نیاز به هماهنگی جهت مرجوعی کالا دارید، می‌توانید از طریق سیستم تیکتینگ یا صفحه تماس با ما، با کارشناسان یدکی‌ران در ارتباط باشید.
                            </Label>
                            
                            {/* ✅ فراخوانی کامپوننت کلاینت دکمه‌ها ✅ */}
                            <DeliveryActions />
                        </div>
                    </div>

                </div>

            </div>
        </div>
      </Container>

    </div>
  );
}