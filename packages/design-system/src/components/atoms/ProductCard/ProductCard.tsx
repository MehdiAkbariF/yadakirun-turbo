import React from 'react';
import Image from 'next/image';
import { ProductCardProps } from './ProductCard.types';
import { Label } from '../Label/Label';
import { Badge } from '../Badge/Badge';
import './ProductCard.scss';

export const ProductCard = ({
  title,
  href,
  imgSrc,
  price,
  originalPrice,
  rating,
  badgeText,
  className,
}: ProductCardProps) => {
  const classNames = ['product-card', className].filter(Boolean).join(' ');

  // فرمت قیمت
  const formatPrice = (val: string | number) => 
    val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // محاسبه درصد تخفیف
  const discountPercent = originalPrice 
    ? Math.round(((Number(originalPrice) - Number(price)) / Number(originalPrice)) * 100) 
    : 0;

  return (
    <a href={href} className={classNames}>
      
      {badgeText && (
        <div className="product-card__badge">
          <Badge variant="secondary" className="text-[10px] px-2 py-0.5 font-bold shadow-sm">
            {badgeText}
          </Badge>
        </div>
      )}
      
      <div className="product-card__image-container">
        <Image 
          src={imgSrc} 
          alt={title} 
          fill 
          className="product-card__image" 
        />
      </div>
      
      <div className="product-card__details">
        {/* تایتل: بالا سمت راست */}
        <Label as="h3" className="product-card__title">
          {title}
        </Label>

        <div className="product-card__footer">
          
          {/* سمت راست: قیمت خط‌خورده و بج تخفیف */}
          {originalPrice && discountPercent > 0 && (
            <div className="product-card__discount-section">
              <Badge variant="error" className="product-card__discount-badge">
                {discountPercent}%
              </Badge>
              <Label className="product-card__old-price">
                {formatPrice(originalPrice)}
              </Label>
            </div>
          )}

          {/* سمت چپ: قیمت نهایی */}
          <div className="product-card__price-section">
            <Label className="product-card__price">
              {formatPrice(price)}
            </Label>
            <span className="product-card__currency">تومان</span>
          </div>

        </div>
      </div>
    </a>
  );
};