"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { NewsCard } from "../../atoms/NewsCard/NewsCard";
import { NewsCardProps } from "../../atoms/NewsCard/NewsCard.types";

import "swiper/css";
import "swiper/css/navigation";

interface NewsSliderProps {
  items: Omit<NewsCardProps, "className">[];
  direction?: "horizontal" | "vertical";
  uniqueId: string;
}

export const NewsSlider = ({
  items,
  direction = "horizontal",
  uniqueId,
}: NewsSliderProps) => {
  const isVertical = direction === "vertical";

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Navigation, Autoplay]}
        direction={direction}
        // تنظیمات ریسپانسیو
        slidesPerView={1.2} // پیش‌فرض موبایل
        spaceBetween={16}
        navigation={
          !isVertical
            ? {
                nextEl: `.news-slider-next-${uniqueId}`,
                prevEl: `.news-slider-prev-${uniqueId}`,
              }
            : false
        }
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={
          isVertical
            ? {}
            : {
                480: { slidesPerView: 1.5, spaceBetween: 16 },
                640: { slidesPerView: 2.2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 24 }, // در دسکتاپ 3 تایی
                1280: { slidesPerView: 4, spaceBetween: 24 }, // در مانیتور بزرگ 4 تایی
              }
        }
        // ✅ پدینگ پایین برای دکمه‌های نویگیشن
        className="!pb-12" 
      >
        {items.map((article, index) => (
          <SwiperSlide 
            key={`${article.href}-${index}`} 
            // ✅✅✅ نکته کلیدی برای هم‌اندازه شدن: !h-auto
            // این باعث می‌شود اسلاید ارتفاع کانتینر را پر کند (که برابر با بلندترین کارت است)
            className="!h-auto !flex"
          >
            {/* کارت با ارتفاع 100% که قبلا در SCSS تنظیم کردیم */}
            <NewsCard {...article} className="w-full" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* دکمه‌های کنترلی */}
      {!isVertical && (
        <>
          <div className={`news-slider-next-${uniqueId} swiper-button-next !w-10 !h-10 after:!text-xl`}></div>
          <div className={`news-slider-prev-${uniqueId} swiper-button-prev !w-10 !h-10 after:!text-xl`}></div>
        </>
      )}
    </div>
  );
};