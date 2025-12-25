import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { ShieldCheck, Award, ThumbsUp, Clock } from 'lucide-react';

// --- Design System Imports ---
import { Container } from '@monorepo/design-system/src/components/organisms/Container/Container';
import { ContentSection } from '@monorepo/design-system/src/components/molecules/ContentSection/ContentSection';
import { Label } from '@monorepo/design-system/src/components/atoms/Label/Label';

// --- Metadata (استاتیک) ---
export const metadata: Metadata = {
  title: 'اعتبار و اعتماد | فروشگاه اینترنتی یدکی‌ران',
  description: 'چرا مشتریان به یدکی‌ران اعتماد می‌کنند؟ بررسی مجوزها، ضمانت‌ها و تعهدات ما به شما.',
};

// --- داده‌های نمونه برای کارت‌های اعتماد ---
const trustCards = [
  {
    id: 1,
    title: "ضمانت اصالت کالا",
    description: "تضمین بازگشت وجه در صورت عدم اصالت قطعه",
    imgSrc: "/SGA-banner.webp",
    icon: <ShieldCheck className="text-brand-primary" size={20} />
  },
  {
    id: 2,
    title: "نماد اعتماد الکترونیکی",
    description: "دارای تاییدیه رسمی از وزارت صنعت و معدن",
    imgSrc: "/enamad-1.png",
    icon: <Award className="text-brand-primary" size={20} />
  },
  {
    id: 3,
    title: "رضایت مشتریان",
    description: "بیش از ۹۸٪ رضایت خریداران در سال گذشته",
    imgSrc: "/aisin-clutch-banner.webp",
    icon: <ThumbsUp className="text-brand-primary" size={20} />
  },
  {
    id: 4,
    title: "پشتیبانی سریع",
    description: "پاسخگویی و مشاوره تخصصی در تمام ایام هفته",
    imgSrc: "/SGA-banner.webp",
    icon: <Clock className="text-brand-primary" size={20} />
  },
];

export default function TrustUsPage() {
  return (
    <div className="bg-bg-body min-h-screen pb-20">
      
      {/* === بخش ۱: بنر تمام‌عرض (استاتیک) === */}
      <section className="relative w-full h-64 lg:h-96">
        <Image 
            src="/aboutus.png" 
            alt="اعتماد به یدکی‌ران"
            fill
            className="object-cover"
            priority
        />
        {/* لایه تیره روی عکس برای خوانایی متن */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="absolute inset-0 flex items-center justify-center z-10">
            <Label as="h1" size="4x" weight="black" className="text-white drop-shadow-md text-center">
               اعتبار و اعتماد در یدکی‌ران
            </Label>
        </div>
      </section>

      {/* === بخش ۲: محتوای اصلی === */}
      <Container>
        <div className="relative z-10 -mt-12 lg:-mt-20 mb-10">
            <div className="bg-surface rounded-3xl shadow-xl border border-border-secondary p-6 md:p-10 lg:p-14">
                
                <div className="space-y-16">
                    {/* معرفی و متن اصلی */}
                    <ContentSection title="تعهد ما، سرمایه ماست">
                        <Label as="p" size="lg" className="mb-6 leading-loose text-justify text-text-primary font-medium">
                            در دنیای قطعات خودرو، اعتماد حرف اول را می‌زند. ما در یدکی‌ران می‌دانیم که امنیت خودروی شما به کیفیت قطعه‌ای بستگی دارد که از ما می‌خرید.
                        </Label>
                        <Label as="p" size="base" className="leading-loose text-justify text-text-secondary">
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. ما متعهد هستیم که تجربه‌ای امن و مطمئن از خرید آنلاین لوازم یدکی را برای شما رقم بزنیم.
                        </Label>
                    </ContentSection>

                    {/* === بخش کارت‌های اعتماد (Title بالا، Image پایین) === */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {trustCards.map((card) => (
                            <div 
                                key={card.id} 
                                className="group flex flex-col bg-bg-secondary rounded-2xl overflow-hidden border border-border-secondary transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                            >
                                {/* بخش بالا: عنوان و توضیحات کوتاه */}
                                <div className="p-6 flex-grow bg-surface border-b border-border-secondary">
                                    <div className="flex items-center gap-2 mb-3">
                                        {card.icon}
                                        <Label weight="extra-bold" size="base" className="group-hover:text-brand-primary transition-colors">
                                            {card.title}
                                        </Label>
                                    </div>
                                    <Label size="xs" color="secondary" className="leading-relaxed">
                                        {card.description}
                                    </Label>
                                </div>

                                {/* بخش پایین: تصویر */}
                                <div className="relative h-44 w-full overflow-hidden">
                                    <Image 
                                        src={card.imgSrc}
                                        alt={card.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    {/* یک لایه رنگی بسیار ملایم روی عکس در حالت عادی */}
                                    <div className="absolute inset-0 bg-brand-primary/5 group-hover:bg-transparent transition-colors"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* بخش فوتر محتوا: اینفوگرافیک یا متن پایانی */}
                    <div className="bg-bg-secondary rounded-2xl p-8 border border-dashed border-border-primary text-center">
                        <Label as="h3" weight="bold" size="lg" className="mb-4">خریدی با اطمینان کامل</Label>
                        <Label as="p" size="sm" color="secondary" className="max-w-2xl mx-auto leading-loose">
                            تمامی فعالیت‌های یدکی‌ران تحت نظارت مراجع قانونی بوده و دارای کلیه مجوزهای لازم برای فعالیت در فضای مجازی می‌باشد. ما اصالت هر قطعه‌ای که ارسال می‌شود را پیش از بسته‌بندی به دقت بررسی می‌کنیم.
                        </Label>
                    </div>
                </div>

            </div>
        </div>
      </Container>

    </div>
  );
}