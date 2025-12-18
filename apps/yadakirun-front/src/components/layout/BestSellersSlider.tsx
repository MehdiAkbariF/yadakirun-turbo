"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import { SliderProductCard } from "@monorepo/design-system/src/components/atoms/SliderProductCard/SliderProductCard";
import { Label } from "@monorepo/design-system/src/components/atoms/Label/Label";
import { SliderProductCardProps } from "@monorepo/design-system/src/components/atoms/SliderProductCard/SliderProductCard.types";

// ✅ 1. ایمپورت هر دو store و هوک useMediaQuery
import { useBasketStore } from "@/src/stores/basketStore";
import { useUIStore } from "@/src/stores/uiStore";
import { useMediaQuery } from '@/src/hooks/useMediaQuery';

// تایپ دقیق برای آیتم‌های اسلایدر که حتما ID داشته باشند
type ProductSliderItem = Omit<SliderProductCardProps, "className" | "onAddToCart"> & {
  id: string | number;
};

interface BestSellersSliderProps {
  title: string;
  items: ProductSliderItem[];
  uniqueId: string;
}

export const BestSellersSlider = ({ title, items, uniqueId }: BestSellersSliderProps) => {
  // ✅ 2. دسترسی به اکشن‌های هر دو store
  const { addItem } = useBasketStore();
  const { openCartDrawerOnDesktop } = useUIStore();
  
  // ✅ 3. تشخیص وضعیت دسکتاپ با استفاده از هوک سفارشی
  // 1024px معمولاً breakpoint 'lg' است
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  
  if (!items || items.length === 0) {
    return null;
  }

  // ✅ 4. ساخت یک تابع هندلر جدید برای مدیریت هر دو عملیات
  const handleAddToCart = async (productId: string | number) => {
    await addItem({ 
      productId: Number(productId),
      quantity: 1
    });
    
    // حالا از اکشن هوشمند استفاده می‌کنیم که وضعیت دسکتاپ را به عنوان ورودی می‌گیرد
    openCartDrawerOnDesktop(isDesktop);
  };

  const nextButtonClass = `swiper-button-next-${uniqueId}`;
  const prevButtonClass = `swiper-button-prev-${uniqueId}`;

  return (
    <section className="bestsellers-section">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-right border-r-4 border-accent pr-4 pt-2">
            <Label as="h2" size="xl" weight="extra-bold">{title}</Label>
        </div>
      </div>
      <div className="w-full relative container mx-auto" dir="rtl">
        <Swiper
          modules={[Autoplay, Navigation]}
          loop={items.length > 5}
          autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          navigation={{ 
            nextEl: `.${nextButtonClass}`, 
            prevEl: `.${prevButtonClass}` 
          }}
          spaceBetween={0} 
          breakpoints={{
            320: { slidesPerView: "auto" },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          className="!px-10"
        >
          {items.map((item) => (
            <SwiperSlide key={item.id} className="bestseller-slide">
              <SliderProductCard
                href={item.href}
                title={item.title}
                imgSrc={item.imgSrc}
                price={item.price}
                originalPrice={item.originalPrice}
                rating={item.rating}
                badgeText={item.badgeText}
                onAddToCart={() => handleAddToCart(item.id)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={`${nextButtonClass} swiper-button-next`}></div>
        <div className={`${prevButtonClass} swiper-button-prev`}></div>
      </div>
       <style jsx global>{`
        .bestsellers-section {
          width: 100%;
          padding-top: 1rem;
          padding-bottom: 1rem;
          margin-top: 2rem;
          margin-bottom: 2rem;
          background-color: var(--color-bg-secondary);
          border-radius: 1rem;
          border: 1px solid var(--color-border-secondary);
          overflow: hidden;
        }
        
        .border-accent {
          border-color: var(--color-brand-accent);
        }

        .bestseller-slide {
          min-width: 230px; 
          width: auto !important; 
          border-left: 1px solid var(--color-border-secondary);
        }

        .swiper-rtl .bestseller-slide:last-of-type {
          border-left: none;
        }

        .swiper-button-next, .swiper-button-prev {
            color: var(--color-text-primary);
            transition: color 0.2s;
            width: 44px;
            height: 44px;
            background-color: rgba(var(--color-bg-surface-rgb), 0.8);
            border-radius: 50%;
            backdrop-filter: blur(4px);
        }
        .swiper-button-next:hover, .swiper-button-prev:hover {
            color: var(--color-brand-primary);
            background-color: var(--color-bg-secondary);
        }
        .swiper-button-next::after, .swiper-button-prev::after {
            font-size: 1.25rem;
            font-weight: 900;
        }
       `}</style>
    </section>
  );
};