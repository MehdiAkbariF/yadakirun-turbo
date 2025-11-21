"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Mousewheel } from "swiper/modules";
import { CalendarDays, ChevronLeft } from "lucide-react";
import { Label } from "../../atoms/Label/Label";

import "swiper/css";
import "./SidebarNewsSlider.scss";

interface NewsItem {
  title: string;
  date: string;
  imgSrc: string;
  href: string;
}

interface SidebarNewsSliderProps {
  items: NewsItem[];
  title?: string;
}

export const SidebarNewsSlider = ({ items, title }: SidebarNewsSliderProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="sidebar-news-slider">
      {title && (
        <div className="sidebar-news-slider__header">
          <Label weight="bold" size="lg">{title}</Label>
        </div>
      )}

      <Swiper
        modules={[Autoplay, Mousewheel]}
        direction="vertical" // ✅ همیشه عمودی
        slidesPerView={4}    // ✅ همیشه ۴ آیتم نمایش داده شود
        spaceBetween={12}    // فاصله بین آیتم‌ها
        mousewheel={true}    // اسکرول با ماوس یا تاچ پد
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className="sidebar-news-slider__swiper"
        // ✅ ارتفاع فیکس برای اینکه اسکرول عمودی کار کند (هم موبایل هم دسکتاپ)
        style={{ height: "400px" }} 
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className="sidebar-news-slider__slide">
            <Link href={item.href} className="mini-news-card group">
              
              {/* تصویر بندانگشتی */}
              <div className="mini-news-card__image-wrapper">
                <Image
                  src={item.imgSrc}
                  alt={item.title}
                  fill
                  className="mini-news-card__image"
                />
              </div>

              {/* محتوا */}
              <div className="mini-news-card__content">
                <Label 
                  as="h4" 
                  size="sm" 
                  weight="semi-bold" 
                  className="mini-news-card__title group-hover:text-brand-primary transition-colors"
                >
                  {item.title}
                </Label>
                
                <div className="mini-news-card__meta">
                  <CalendarDays size={12} />
                  <span>{item.date}</span>
                </div>
              </div>
              
              {/* آیکون فلش */}
              <div className="mini-news-card__arrow">
                <ChevronLeft size={16} />
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};