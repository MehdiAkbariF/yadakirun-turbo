import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus } from 'lucide-react';
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
  onAddToCart,
}: SliderProductCardProps) => {
  const classNames = ['slider-product-card', className].filter(Boolean).join(' ');

  const addCommas = (val: string | number) => 
    val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const handleAddToCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.();
  };

  return (
    <div className={classNames}>
      
      {/* ✅ 1. بخش جدید برای المان‌های بالای کارت */}
      <div className="slider-product-card__top-actions">
        {/* بج (تخفیف یا متن خاص) */}
        <div className="slider-product-card__badge-wrapper">
          {badgeText && (
            <Badge variant="error" className="text-[10px] px-2 py-0.5 font-bold shadow-sm">
              {badgeText}
            </Badge>
          )}
        </div>
        
        {/* ✅ 2. دکمه افزودن به سبد خرید به اینجا منتقل شد */}
        <div className="slider-product-card__add-btn-wrapper">
          {onAddToCart && (
            <button 
              className="slider-product-card__add-btn" 
              onClick={handleAddToCartClick}
              aria-label={`افزودن ${title} به سبد خرید`}
            >
              <Plus size={20} />
            </button>
          )}
        </div>
      </div>
      
      {/* لینک اصلی بدون تغییر */}
      <Link href={href} className="slider-product-card__main-link">
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
          <div className="slider-product-card__rating">
             {typeof rating === 'number' && <RatingStars rating={rating} />}
          </div>
          
          <Label as="h3" className="slider-product-card__title">
            {title}
          </Label>
        </div>
      </Link>
      
      {/* ✅ 3. فوتر به حالت اولیه خود بازگشت (فقط قیمت) */}
      <div className="slider-product-card__footer">
        <div className="slider-product-card__old-price-wrapper">
          {originalPrice && (
            <Label as="span" className="slider-product-card__old-price">
              {addCommas(originalPrice)}
            </Label>
          )}
        </div>

        <div className="slider-product-card__price-wrapper">
          <Label as="span" className="slider-product-card__price">
            {addCommas(price ?? 0)}
          </Label>
          <Label as="span" className="slider-product-card__currency">
            تومان
          </Label>
        </div>
      </div>
    </div>
  );
};