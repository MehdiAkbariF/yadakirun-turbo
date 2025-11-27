import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Store } from 'lucide-react'; // ❌ Star حذف شد چون از کامپوننت RatingStars استفاده می‌کنیم
import { SimpleProductCardProps } from './SimpleProductCard.types';
import { Label } from '../../atoms/Label/Label';
import { Badge } from '../../atoms/Badge/Badge';
import { RatingStars } from '../RatingStars/RatingStars'; // ✅ ایمپورت کامپوننت ستاره‌ها
import { toPersianDigits } from '../../../utils/persian';
import './SimpleProductCard.scss';

export const SimpleProductCard = ({
  title,
  imgSrc,
  price,
  originalPrice,
  rating,
  brand,
  seller = "یدکی‌ران",
  inStock = true,
  href,
  className
}: SimpleProductCardProps) => {
  
  const formatPrice = (val: string | number) => {
    const withCommas = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return toPersianDigits(withCommas);
  };

  const calculateDiscountPercentage = (current: string | number, original: string | number) => {
    if (!original || !current) return 0;
    const currVal = typeof current === 'string' ? parseFloat(current.replace(/,/g, '')) : current;
    const origVal = typeof original === 'string' ? parseFloat(original.replace(/,/g, '')) : original;
    if (origVal <= currVal) return 0;
    return Math.round(((origVal - currVal) / origVal) * 100);
  };

  const discountPercent = originalPrice ? calculateDiscountPercentage(price, originalPrice) : 0;

  return (
    <Link href={href} className={`simple-product-card ${className || ''}`}>
      
      <div className="simple-product-card__image-wrapper">
        <Image 
          src={imgSrc} 
          alt={title} 
          fill 
          className="simple-product-card__image" 
        />
      </div>

      <div className="simple-product-card__content">
        
        <div className="flex justify-between items-center mb-2">
           {brand && (
             <Label size="xs" color="secondary" className="bg-bg-secondary px-2 py-0.5 rounded hidden sm:block">
               {brand}
             </Label>
           )}
           {rating && (
             <div className="flex items-center gap-1 mr-auto sm:mr-0">
               {/* عدد امتیاز */}
               <Label as="span" size="xs" weight="semi-bold" color="brand-primary">
                 {rating}
               </Label>
               
               {/* ✅ نمایش ستاره‌ها به جای آیکون تکی */}
               {/* با کلاس scale کمی کوچکش می‌کنیم تا در کارت‌های کوچک جا شود */}
               <div className="scale-75 origin-left rtl:origin-right">
                  <RatingStars rating={rating} size='xs' variant='primary'/>
               </div>
             </div>
           )}
        </div>

        <h3 className="simple-product-card__title" title={title}>
          {title}
        </h3>

        <div className="simple-product-card__meta">
          <Store size={14} />
          <Label  size="xs" color="secondary" weight='bold'>
            {seller}
          </Label>
        </div>

        <div className="mt-auto">
          {inStock ? (
            <div className="simple-product-card__price-section">
              {originalPrice && discountPercent > 0 && (
                <div className="simple-product-card__discount-wrapper">
                  <Badge variant="error" className="text-[10px] px-1.5 py-0.5 rounded-md">
                    {toPersianDigits(discountPercent)}%
                  </Badge>
                  <Label as="span" className="simple-product-card__old-price">
                    {formatPrice(originalPrice)}
                  </Label>
                </div>
              )}
              
              <div className="simple-product-card__price">
                 <Label as="span" size="base" weight="bold" color="primary">
                   {formatPrice(price)}
                 </Label>
                 <Label as="span" size="xs" color="secondary" className="mr-1">
                   تومان
                 </Label>
              </div>
            </div>
          ) : (
            <div className="simple-product-card__out-of-stock">
              <Label size="sm" weight="bold" color="disabled">ناموجود</Label>
            </div>
          )}
        </div>
      </div>

    </Link>
  );
};