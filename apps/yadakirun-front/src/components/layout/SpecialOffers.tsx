"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, ChevronLeft } from "lucide-react"; // اضافه کردن ChevronLeft برای موبایل

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

import { ProductCard } from "@monorepo/design-system/src/components/atoms/ProductCard/ProductCard";
import { ProductCardProps } from "@monorepo/design-system/src/components/atoms/ProductCard/ProductCard.types";
import { CountdownTimer } from "@monorepo/design-system/src/components/molecules/CountdownTimer/CountdownTimer";
import { Label } from "@monorepo/design-system/src/components/atoms/Label/Label";

// داده‌های پیش‌فرض
const defaultOfferData = [
  {
    id: 1,
    title: "کمک فنر حرفه‌ای رنو تالیسمان",
    href: "/product/item-1",
    imgSrc: "/Renault.svg",
    price: 1250000,
    originalPrice: 1500000,
    rating: 4.5,
    badgeText: "۲۰٪ تخفیف",
  },
];

interface SpecialOffersProps {
  products?: (Omit<ProductCardProps, 'className'> & { id: string | number })[];
  title?: string;
  endTime?: number;
}

export const SpecialOffers = ({ 
  products = defaultOfferData as any, 
  title = "تخفیفات ویژه",
  endTime 
}: SpecialOffersProps) => {
  
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const targetDate = endTime ? new Date(endTime) : new Date();
    if (!endTime) {
       targetDate.setDate(targetDate.getDate() + 1);
       targetDate.setHours(23, 59, 59, 999);
    }

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  if (!products || products.length === 0) return null;

  return (
    <section className="w-full">
      <div className="bg-highlight rounded-2xl shadow-lg overflow-hidden my-10">
        <div className="p-2 lg:p-4">
          
          {/* ✅✅✅ هدر موبایل (فقط در موبایل نمایش داده می‌شود) ✅✅✅ */}
          {/* بدون عکس و تایمر، در بالای اسلایدر */}
          <div className="flex items-center justify-between px-2 mb-4 lg:hidden">
            <div className="flex items-center gap-2">
               {/* آیکون کوچک ساعت برای جذابیت (اختیاری) */}
               <Clock size={20} className="text-white" />
               <Label as="h2" size="xl" weight="extra-bold" color="on-brand">
                 {title}
               </Label>
            </div>
           
          </div>

          <Swiper
            dir="rtl"
            modules={[Navigation, FreeMode]}
            navigation
            spaceBetween={16}
            slidesPerView="auto"
            freeMode={true}
            className="!py-1"
          >
            {/* ✅✅✅ اسلاید معرفی (فقط در دسکتاپ نمایش داده می‌شود) ✅✅✅ */}
            {/* کلاس hidden lg:flex باعث مخفی شدن در موبایل می‌شود */}
            <SwiperSlide key="special-offer-intro" className="!hidden lg:!flex !w-auto !h-auto items-center">
              <div className="intro-card flex flex-col justify-center items-center gap-2 h-full">
                <Image
                  src="/TAKHFIF.webp"
                  alt={title}
                  width={120}
                  height={120}
                  priority={true}
                />
                <Label as="h2" size="xl" weight="extra-bold" className="mt-4 text-center" color="on-brand">
                  {title}
                </Label>
                <div className="mt-6 flex items-center justify-center gap-x-2">
                  <Clock size={20} className="text-white" />
                  <Label as="span" size="sm" weight="semi-bold" color="on-brand">
                    زمان باقی مانده:
                  </Label>
                </div>
                <CountdownTimer {...timeLeft} />
                
                <Link href="/products/special-offers" className="mt-6 text-white text-sm font-bold border border-white/50 rounded-full px-6 py-2 hover:bg-white/20 transition-colors">
                  مشاهده همه
                </Link>
              </div>
            </SwiperSlide>

            {/* اسلایدهای محصولات */}
            {products.map((product: any) => (
              <SwiperSlide 
                key={product.id} 
                className="!w-64 !h-auto !flex"
              >
                <ProductCard
                  href={product.href}
                  title={product.title}
                  imgSrc={product.imgSrc}
                  price={product.price}
                  originalPrice={product.originalPrice} 
                  rating={product.rating}
                  badgeText={product.badgeText || product.carName} 
                  className="w-full h-full"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      
      <style jsx>{`
        .bg-highlight {
          background: linear-gradient(135deg, var(--color-brand-accent), var(--color-brand-primary));
        }
        .intro-card {
          min-width: 18rem;
          color: var(--color-text-on-brand);
          padding: 1rem;
        }
        
        :global(.swiper-button-next),
        :global(.swiper-button-prev) {
          color: var(--color-text-on-brand);
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 50%;
          width: 44px;
          height: 44px;
          backdrop-filter: blur(4px);
          transition: background-color 0.2s;
        }
        :global(.swiper-button-next:hover),
        :global(.swiper-button-prev:hover) {
           background-color: rgba(0, 0, 0, 0.4);
        }
        :global(.swiper-button-next::after),
        :global(.swiper-button-prev::after) {
          font-size: 1.25rem;
          font-weight: 900;
        }
      `}</style>
    </section>
  );
};