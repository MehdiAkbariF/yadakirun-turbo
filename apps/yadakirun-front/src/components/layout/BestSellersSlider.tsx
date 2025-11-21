"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// ✅✅✅ ایمپورت کامپوننت جدید
import { SliderProductCard } from "@monorepo/design-system/src/components/atoms/SliderProductCard/SliderProductCard";
import { Label } from "@monorepo/design-system/src/components/atoms/Label/Label";
import { SliderProductCardProps } from "@monorepo/design-system/src/components/atoms/SliderProductCard/SliderProductCard.types";

interface BestSellersSliderProps {
  title: string;
  items: Omit<SliderProductCardProps, 'className'>[];
  uniqueId: string;
}

// داده‌های نمونه را می‌توانیم خارج از کامپوننت نگه داریم


export const BestSellersSlider = ({ title, items = sampleData, uniqueId }: BestSellersSliderProps) => {
  if (!items || items.length === 0) return null;

  const nextButtonClass = `swiper-button-next-${uniqueId}`;
  const prevButtonClass = `swiper-button-prev-${uniqueId}`;

  return (
    // ✅✅✅ اصلاح اصلی اینجاست ✅✅✅
    <section className="bestsellers-section">
      <div className="container mx-auto px-4 bo">
        <div className="mb-8 text-right border-r-4 border-accent pr-4 pt-2">
            <Label as="h2" size="xl" weight="extra-bold">{title}</Label>
        </div>
      </div>
      <div className="w-full relative container mx-auto  pb-5" dir="rtl">
        <Swiper
          modules={[Autoplay, Navigation]}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          navigation={{ 
            nextEl: `.${nextButtonClass}`, 
            prevEl: `.${prevButtonClass}` 
          }}
          spaceBetween={0}
          breakpoints={{
            320: { slidesPerView: 1.3 },
            480: { slidesPerView: 2.1 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          className="!px-10"
        >
          {items.map((item, index) => (
            <SwiperSlide key={item.id || index}>
              <SliderProductCard
                href={item.href}
                title={item.title}
                imgSrc={item.imgSrc}
                price={item.price}
                originalPrice={item.originalPrice}
                rating={item.rating}
                badgeText={item.badgeText}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={`${nextButtonClass} swiper-button-next `}></div>
        <div className={`${prevButtonClass} swiper-button-prev`}></div>
      </div>
       <style jsx global>{`
        /* ✅ استایل برای بخش اصلی با استفاده از متغیر CSS */
        .bestsellers-section {
          width: 100%;
          padding-top: 1rem;
          padding-bottom: 1rem;
          margin-top: 2rem;
          margin-bottom: 2rem;
          background-color: var(--color-bg-surface);
          border-radius: 1rem; /* 16px */
        }
        
        /* استایل برای عنوان "پرفروش‌ترین‌ها" */
        .border-accent {
          border-color: var(--color-brand-accent);
        }

        .swiper-button-next, .swiper-button-prev {
            color: var(--color-text-primary);
            transition: color 0.2s;
        }
        .swiper-button-next:hover, .swiper-button-prev:hover {
            color: var(--color-brand-primary);
        }
       `}</style>
    </section>
  );
};