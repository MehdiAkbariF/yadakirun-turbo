import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Store, Star } from 'lucide-react';
import { SimpleProductCardProps } from './SimpleProductCard.types';
import { Label } from '../../atoms/Label/Label';
import { Badge } from '../../atoms/Badge/Badge';
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
  
  // فرمت قیمت
  const formatPrice = (val: string | number) => 
    val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // محاسبه درصد تخفیف
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
      
      {/* --- بخش تصویر (راست در موبایل، بالا در دسکتاپ) --- */}
      <div className="simple-product-card__image-wrapper">
        <Image 
          src={imgSrc} 
          alt={title} 
          fill 
          className="simple-product-card__image" 
        />
      </div>

      {/* --- بخش محتوا (چپ در موبایل، پایین در دسکتاپ) --- */}
      <div className="simple-product-card__content">
        
        {/* هدر کارت: برند و امتیاز */}
        <div className="flex justify-between items-start mb-2">
           {brand && (
             <Label size="xs" color="secondary" className="bg-bg-secondary px-2 py-0.5 rounded hidden sm:block">
               {brand}
             </Label>
           )}
           {rating && (
             <div className="flex items-center gap-1 mr-auto sm:mr-0">
               <Label weight='bold' color='warning'>{rating}</Label>
               <Star size={15} className="fill-utility-warning " />
             </div>
           )}
        </div>

        <Label className="simple-product-card__title" >
          {title}
        </Label>

        <div className="simple-product-card__meta">
          <Store size={14} />
          <Label size='xs'>{seller}</Label>
        </div>

        {/* بخش قیمت و موجودی (چسبیده به پایین) */}
        <div className="mt-auto">
          {inStock ? (
            <div className="simple-product-card__price-section">
              {originalPrice && discountPercent > 0 && (
                <div className="simple-product-card__discount-wrapper">
                  <Badge variant="error" className="text-[10px] px-1.5 py-0.5 rounded-md">
                    {discountPercent}%
                  </Badge>
                  <Label className="simple-product-card__old-price">
                    {formatPrice(originalPrice)}
                  </Label>
                </div>
              )}
              
              <div className="simple-product-card__price flex items-center gap-2">
                {formatPrice(price)} <Label size='sm'>تومان</Label>
              </div>
            </div>
          ) : (
            <div className="simple-product-card__out-of-stock">
              <Label color='secondary' weight='bold'>
                       ناموجود
              </Label>
       
            </div>
          )}
        </div>
      </div>

    </Link>
  );
};