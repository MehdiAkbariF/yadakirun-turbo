import React from 'react';
import Image from 'next/image';
import Link from 'next/link'; // ✅ ایمپورت Link برای ناوبری
import { Plus } from 'lucide-react'; // ✅ ایمپورت آیکون دکمه
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
  badgeText,
  className,
  onAddToCart, // ✅ پراپ جدید برای مدیریت کلیک
}: ProductCardProps) => {
  const classNames = ['product-card', className].filter(Boolean).join(' ');

  const formatPrice = (val: string | number) => 
    val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const discountPercent = originalPrice 
    ? Math.round(((Number(originalPrice) - Number(price)) / Number(originalPrice)) * 100) 
    : 0;
    
  // ✅ هندلر کلیک روی دکمه افزودن
  const handleAddToCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.();
  };

  return (
    // ✅ تگ اصلی به div تغییر کرد تا بتواند شامل لینک و دکمه باشد
    <div className={classNames}>
      
      {badgeText && (
        <div className="product-card__badge">
          <Badge variant="primary">
            <Label size='xs' weight='black' color='on-brand'>{badgeText}</Label>
          </Badge>
        </div>
      )}
      
      <div className="product-card__image-container">
        {/* لینک حالا فقط دور عکس است */}
        <Link href={href} className="product-card__image-link">
          <Image 
            src={imgSrc} 
            alt={title} 
            fill 
            className="product-card__image" 
          />
        </Link>

        {/* ✅✅✅ دکمه افزودن به سبد خرید اینجا اضافه شد ✅✅✅ */}
        {onAddToCart && (
          <button 
            className="product-card__add-btn" 
            onClick={handleAddToCartClick}
            aria-label={`افزودن ${title} به سبد خرید`}
          >
            <Plus size={22} />
          </button>
        )}
      </div>
      
      <div className="product-card__details">
        {/* لینک حالا دور عنوان هم هست */}
        <Link href={href} className="product-card__title-link">
          <Label as="h3" className="product-card__title">
            {title}
          </Label>
        </Link>

        <div className="product-card__footer">
          {originalPrice && discountPercent > 0 && (
            <div className="product-card__discount-section">
              <Badge variant="error" className="product-card__discount-badge" >
                <Label size='xs' color='on-brand' weight='bold'>
                   {discountPercent.toLocaleString("FA")}%
                </Label>
              </Badge>
              <Label className="product-card__old-price">
                {formatPrice(originalPrice)}
              </Label>
            </div>
          )}

          <div className="product-card__price-section">
            <Label className="product-card__price">
              {formatPrice(price)}
            </Label>
            <span className="product-card__currency">تومان</span>
          </div>
        </div>
      </div>
    </div>
  );
};