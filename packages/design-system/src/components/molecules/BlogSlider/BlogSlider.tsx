"use client";

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BlogCard } from '../BlogCard/BlogCard';
import { BlogCardProps } from '../BlogCard/BlogCard.types';

// استایل‌های Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './BlogSlider.scss';

interface BlogSliderProps {
  items: BlogCardProps[];
  uniqueId?: string;
}

export const BlogSlider = ({ items, uniqueId = 'blog-slider' }: BlogSliderProps) => {
  const prevClass = `blog-slider-prev-${uniqueId}`;
  const nextClass = `blog-slider-next-${uniqueId}`;

  return (
    <div className="blog-slider-wrapper">
      {/* دکمه‌های نویگیشن سفارشی (بالا سمت چپ) */}
      <div className="blog-slider__controls">
        <button className={`blog-slider__btn ${nextClass}`}>
          <ChevronRight size={20} />
        </button>
        <button className={`blog-slider__btn ${prevClass}`}>
          <ChevronLeft size={20} />
        </button>
      </div>

      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        spaceBetween={24}
        slidesPerView={1.2} // موبایل: قسمتی از کارت بعدی دیده شود
        navigation={{
          prevEl: `.${prevClass}`,
          nextEl: `.${nextClass}`,
        }}
        pagination={{ clickable: true, dynamicBullets: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 5 },
          560: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
          1280: { slidesPerView: 5, spaceBetween: 24 },
        }}
        className="blog-slider"
      >
        {items.map((item, index) => (
          // نکته مهم: height-auto و flex برای هم‌اندازه شدن کارت‌ها
          <SwiperSlide key={index} className="!h-auto !flex">
            <BlogCard 
              {...item} 
              className="w-full h-full" // کارت باید ارتفاع والد را پر کند
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};