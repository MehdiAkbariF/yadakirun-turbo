"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { NewsCard } from "../../atoms/NewsCard/NewsCard";
import { NewsCardProps } from "../../atoms/NewsCard/NewsCard.types";

import "swiper/css";
import "swiper/css/navigation";

interface NewsSliderProps {
  items: Omit<NewsCardProps, "className">[];
  /**
   * جهت اسلایدر.
   * نکته: اگر vertical انتخاب شود، در موبایل به صورت خودکار به horizontal تبدیل می‌شود تا لی‌اوت خراب نشود.
   */
  direction?: "horizontal" | "vertical";
  uniqueId: string;
}

export const NewsSlider = ({
  items,
  direction = "horizontal",
  uniqueId,
}: NewsSliderProps) => {
  // استیت برای تشخیص سایز صفحه
  const [isLargeScreen, setIsLargeScreen] = useState(true); // پیش‌فرض دسکتاپ فرض می‌کنیم تا پرش اولیه کم باشد
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // تابع تشخیص عرض صفحه (BreakPoint lg: 1024px)
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    // چک کردن اولیه
    checkScreenSize();

    // لیسنر برای تغییر سایز
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // منطق هوشمند: اگر ورودی عمودی بود اما صفحه کوچک بود، افقی شود
  // اگر ورودی افقی بود، همیشه افقی بماند
  const effectiveDirection = direction === "vertical" && !isLargeScreen ? "horizontal" : direction;
  
  const isVertical = effectiveDirection === "vertical";

  // جلوگیری از ارور هیدراسیون (Hydration Mismatch)
  if (!mounted) return null; 

  return (
    <div 
      className={`relative w-full transition-all duration-300 ${
        isVertical ? "h-[600px]" : "h-auto"
      }`}
    >
      <Swiper
        modules={[Navigation, Autoplay]}
        direction={effectiveDirection}
        // در حالت عمودی (دسکتاپ) ۳ آیتم، در حالت افقی (موبایل) ۱.۲ آیتم
        slidesPerView={isVertical ? 3 : 1.2}
        spaceBetween={25}
        navigation={
      
          !isVertical
            ? {
                nextEl: `.news-slider-next-${uniqueId}`,
                prevEl: `.news-slider-prev-${uniqueId}`,
              }
            : false
        }
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={
          isVertical
            ? {} 
            : {
                480: { slidesPerView: 1.5 },
                640: { slidesPerView: 2.2 },
                1024: { slidesPerView: 4 }, // اگر افقی بود در دسکتاپ
              }
        }
        className={isVertical ? "!h-full" : "!pb-10"} // پدینگ پایین برای دکمه‌های نویگیشن در حالت افقی
      >
        {items.map((article, index) => (
          <SwiperSlide key={`${article.href}-${index}`} className={isVertical ? "!h-auto py-2" : ""}>
            <NewsCard {...article} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* دکمه‌های کنترلی فقط در حالت افقی نمایش داده شوند */}
      {!isVertical && (
        <>
          <div className={`news-slider-next-${uniqueId} swiper-button-next !text-brand-primary !w-8 !h-8 after:!text-lg`}></div>
          <div className={`news-slider-prev-${uniqueId} swiper-button-prev !text-brand-primary !w-8 !h-8 after:!text-lg`}></div>
        </>
      )}
    </div>
  );
};