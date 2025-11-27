import React from 'react';
import Image from 'next/image';
import { SliderProductCardProps } from './SliderProductCard.types';
import { Label } from '../Label/Label';
import { Badge } from '../Badge/Badge';
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

  // تابع کمکی فقط برای جدا کردن سه رقم (تبدیل به فارسی توسط Label انجام می‌شود)
  const addCommas = (val: string | number) => 
    val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <a href={href} className={classNames}>
      
      {/* بج (تخفیف یا متن خاص) */}
      {badgeText && (
        <div className="slider-product-card__badge">
          <Badge variant="error" className="text-[10px] px-2 py-0.5 font-bold shadow-sm">
            {badgeText}
          </Badge>
        </div>
      )}

      {/* تصویر محصول */}
      <div className="slider-product-card__image-container">
        <Image 
          src={imgSrc} 
          alt={title} 
          fill 
          sizes="(max-width: 768px) 100vw, 250px" 
          className="slider-product-card__image" 
        />
      </div>
      
      {/* جزئیات */}
      <div className="slider-product-card__details">
        
        {/* امتیاز */}
        <div className="slider-product-card__rating">
           {typeof rating === 'number' && <RatingStars rating={rating} />}
        </div>
        
       
        <Label 
          as="h3" 
          size="sm" 
          weight="semi-bold" 
          color="primary" 
    
        >
          {title}
        </Label>
        
        {/* فوتر (قیمت‌ها) */}
        <div className="slider-product-card__footer">
          
          {/* قیمت قدیمی (خط‌خورده) - سمت راست */}
          <div className="slider-product-card__old-price-wrapper">
            {originalPrice && (
              <Label 
                as="span" 
                className="slider-product-card__old-price"
              >
                {addCommas(originalPrice)}
              </Label>
            )}
          </div>

          {/* قیمت نهایی - سمت چپ */}
          <div className="slider-product-card__price-wrapper">
            <Label 
              as="span" 
              className="slider-product-card__price"
            >
              {/* استفاده از ?? 0 برای اطمینان از اینکه مقدار undefined نیست */}
              {addCommas(price ?? 0)}
            </Label>
            
            <Label 
              as="span" 
              className="slider-product-card__currency"
            >
              تومان
            </Label>
          </div>
          
        </div>
      </div>
    </a>
  );
};