"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

import { ProductCard } from "@monorepo/design-system/src/components/atoms/ProductCard/ProductCard";
import { CountdownTimer } from "@monorepo/design-system/src/components/molecules/CountdownTimer/CountdownTimer";
import { Label } from "@monorepo/design-system/src/components/atoms/Label/Label";

const specialOfferData = [
  {
    id: 1,
    title: "کمک فنر حرفه‌ای رنو تالیسمان",
    href: "/product/item-1",
    imgSrc: "/Renault.svg",
    price: "۱,۲۵۰,۰۰۰ تومان",
    carName: "رنو تالیسمان",
  },
  {
    id: 2,
    title: "دیسک ترمز خنک شونده پژو",
    href: "/product/item-2",
    imgSrc: "/Renault.svg",
    price: "۸۹۰,۰۰۰ تومان",
    carName: "پژو 206",
  },
  {
    id: 3,
    title: "کیت کامل جلوبندی MVM",
    href: "/product/item-3",
    imgSrc: "/Renault.svg",
    price: "۳,۴۰۰,۰۰۰ تومان",
    carName: "MVM X33",
  },
  {
    id: 4,
    title: "چراغ ال‌ای‌دی آفرودی Pro",
    href: "/product/item-4",
    imgSrc: "/Renault.svg",
    price: "۲,۱۰۰,۰۰۰ تومان",
    carName: "تویوتا هایلوکس",
  },
  {
    id: 5,
    title: "پمپ بنزین اصلی جک S5",
    href: "/product/item-5",
    imgSrc: "/Renault.svg",
    price: "۱,۷۰۰,۰۰۰ تومان",
    carName: "جک S5",
  },
  {
    id: 6,
    title: "شمع ایریدیوم سوزنی NGK",
    href: "/product/item-6",
    imgSrc: "/Renault.svg",
    price: "۶۵۰,۰۰۰ تومان",
    carName: "کیا سراتو",
  },
];

export const SpecialOffers = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 1,
    hours: 10,
    minutes: 24,
    seconds: 59,
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 1);
    targetDate.setHours(23, 59, 59, 999);

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
  }, []);

  return (
    <section className="w-full">
      <div className="bg-highlight rounded-2xl shadow-lg overflow-hidden my-10">
        <div className="p-4 lg:p-8">
          <Swiper
            dir="rtl"
            modules={[Navigation, FreeMode]}
            navigation
            spaceBetween={16}
            slidesPerView="auto"
            freeMode={true}
            className="!py-4"
          >
            <SwiperSlide key="special-offer-intro" className="!w-auto">
              <div className="">
                <Image
                  src="/takhfif.webp"
                  alt="تخفیفات ویژه"
                  width={120}
                  height={120}
                  priority={true}
                />
                <Label as="h2" size="3x" weight="extra-bold" className="mt-4" color="on-brand">
                  تخفیفات ویژه
                </Label>
                <div className="mt-6 flex items-center justify-center gap-x-2">
                  <Clock size={20} />
                  <Label as="span" size="base" weight="semi-bold" color="on-brand">
                    زمان باقی مانده:
                  </Label>
                </div>
                <CountdownTimer {...timeLeft} />
              </div>
            </SwiperSlide>

            {specialOfferData.map((product) => (
              <SwiperSlide key={product.id} className="!w-64">
                <ProductCard
                  href={product.href}
                  title={product.title}
                  imgSrc={product.imgSrc}
                  price={product.price}
                  badgeText={product.carName}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      
      <style jsx>{`
        .bg-highlight {
          /* ✅✅✅ اصلاح اصلی اینجاست ✅✅✅ */
          /* از متغیرهای CSS که در دیزاین سیستم تعریف شده‌اند، استفاده می‌کنیم */
          background: linear-gradient(135deg, var(--color-brand-accent), var(--color-brand-primary));
        }
        .intro-card {
          width: 18rem;
          color: var(--color-text-on-brand); /* ✅ رنگ متن هم داینامیک شد */
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          height: 100%;
          justify-content: center;
          padding: 1rem;
        }
        
        :global(.swiper-button-next),
        :global(.swiper-button-prev) {
          color: var(--color-text-on-brand); /* ✅ رنگ آیکون‌ها هم داینامیک شد */
          background-color: rgba(0, 0, 0, 0.3);
          border-radius: 50%;
          width: 40px;
          height: 40px;
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