import React from 'react';
import Image from 'next/image';
import { SliderProductCardProps } from './SliderProductCard.types';
import { Label } from '../Label/Label';
import { Badge } from '../Badge/Badge'; // ✅ ایمپورت بج
import { RatingStars } from '../RatingStars/RatingStars';
import './SliderProductCard.scss';

export const SliderProductCard = ({
  title,
  href,
  imgSrc,
  price,
  originalPrice,
  rating,
  badgeText,
  className,
}: SliderProductCardProps) => {
  const classNames = ['slider-product-card', className].filter(Boolean).join(' ');

  // فرمت قیمت (جدا کردن سه رقم)
  const formatPrice = (val: string | number) => 
    val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <a href={href} className={classNames}>
      
      {/* ✅ نمایش بج (مثلاً 20% تخفیف) */}
      {badgeText && (
        <div className="slider-product-card__badge">
          {/* از کلاس‌های یوتیلیتی یا استایل داخلی برای تنظیم فونت ریز استفاده می‌کنیم */}
          <Badge variant="primary" className="text-[10px] px-2 py-0.5 font-bold shadow-sm">
            
            {badgeText}
          </Badge>
        </div>
      )}

      <div className="slider-product-card__image-container">
        <Image 
          src={imgSrc} 
          alt={title} 
          fill 
          sizes="(max-width: 768px) 100vw, 250px" 
          className="slider-product-card__image" 
        />
      </div>
      
      <div className="slider-product-card__details">
        {typeof rating === 'number' && <RatingStars rating={rating} />}
        
        <Label as="h3" size="base" weight="semi-bold" color="primary" className="slider-product-card__title">
          {title}
        </Label>
        
        <div className="slider-product-card__footer">
          
          {/* سمت راست (در RTL): قیمت قدیمی */}
          <div className="slider-product-card__old-price-wrapper">
            {originalPrice && (
              <Label className="slider-product-card__old-price">
                {formatPrice(originalPrice)}
              </Label>
            )}
          </div>

          {/* سمت چپ (در RTL): قیمت نهایی */}
          <div className="slider-product-card__price-wrapper">
            <Label className="slider-product-card__price">
              {/* ✅ استفاده از ?? 0 برای رفع خطای تایپ‌اسکریپت */}
              {formatPrice(price ?? 0)}
            </Label>
            <Label className="slider-product-card__currency">تومان</Label>
          </div>
          
        </div>
      </div>
    </a>
  );
};