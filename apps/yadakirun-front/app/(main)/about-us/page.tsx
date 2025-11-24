import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';

// --- Design System Imports ---
import { Container } from '@monorepo/design-system/src/components/organisms/Container/Container';
import { ContentSection } from '@monorepo/design-system/src/components/molecules/ContentSection/ContentSection';
import { Label } from '@monorepo/design-system/src/components/atoms/Label/Label';

export const metadata: Metadata = {
  title: 'درباره ما | فروشگاه اینترنتی یدکی‌ران',
  description: 'آشنایی با داستان شکل‌گیری، اهداف و تعهدات فروشگاه اینترنتی یدکی‌ران در ارائه قطعات یدکی خودرو.',
};

export default function AboutPage() {
  return (
    <div className="bg-bg-body min-h-screen pb-20">
      
      {/* === بخش ۱: بنر تمام‌عرض (Hero Section) === */}
      <section className="relative w-full h-64 lg:h-80">
        {/* تصویر پس‌زمینه */}
        <Image 
            src="/aboutus.png" // اطمینان حاصل کنید عکس در پوشه public موجود است
            alt="درباره فروشگاه یدکی‌ران"
            fill
            className="object-cover"
            priority
        />
        
        {/* لایه تاریک روی عکس */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        {/* عنوان وسط بنر */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
            <Label as="h1" size="4x" weight="black" className="text-white drop-shadow-md">
              درباره یدکی‌ران
            </Label>
        </div>
      </section>

      {/* === بخش ۲: کانتینر محتوا (Overlap Card) === */}
      <Container>
        <div className="relative z-10 -mt-16 lg:-mt-24 mb-10">
            <div className="bg-surface rounded-3xl shadow-xl border border-border-secondary p-6 md:p-10 lg:p-14">
                
                <div className="space-y-12">
                    {/* داستان ما */}
                    <ContentSection title="داستان ما">
                        <Label as="p" size="base" className="mb-4 leading-loose text-justify text-text-secondary">
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد.
                        </Label>
                        <Label as="p" size="base" className="leading-loose text-justify text-text-secondary">
                            کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد.
                        </Label>
                    </ContentSection>

                    {/* تصویر میانی (اختیاری - برای تنوع بصری) */}
                    <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-md">
                        <Image 
                           src="/SGA-banner.webp" // یک عکس مرتبط از پوشه public
                           alt="تیم یدکی‌ران"
                           fill
                           className="object-cover"
                        />
                    </div>

                    {/* تعهد ما */}
                    <ContentSection title="تعهد ما به مشتریان">
                        <Label as="p" size="base" className="mb-6 leading-loose text-justify text-text-secondary">
                            در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
                        </Label>

                        {/* لیست ویژگی‌ها */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            {[
                                "تضمین اصالت و کیفیت کالا",
                                "ارائه مشاوره تخصصی و رایگان",
                                "ارسال سریع به سراسر کشور",
                                "قیمت‌گذاری منصفانه و رقابتی"
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-3 p-4 bg-bg-secondary rounded-xl">
                                    <CheckCircle className="text-utility-success" size={24} />
                                    <Label weight="bold" size="sm">{item}</Label>
                                </div>
                            ))}
                        </div>
                    </ContentSection>
                </div>

            </div>
        </div>
      </Container>

    </div>
  );
}