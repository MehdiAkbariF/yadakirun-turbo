// packages/design-system/src/components/atoms/SliderProductCard/SliderProductCard.tsx
import React from 'react';
import Image from 'next/image';
import { SliderProductCardProps } from './SliderProductCard.types';
import { Label } from '../Label/Label';
import { Badge } from '../Badge/Badge';
import { RatingStars } from '../RatingStars/RatingStars';
import { PriceDisplay } from '../PriceDisplay/PriceDisplay';
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

  return (
    <a href={href} className={classNames}>
      
      <div className="slider-product-card__image-container">
        <Image src={imgSrc} alt={title} fill sizes="(max-width: 768px) 50vw, 33vw" className="slider-product-card__image" />
      </div>
      
      <div className="slider-product-card__details">
        {typeof rating === 'number' && <RatingStars rating={rating} />}
        
        <Label as="h3" size="sm" weight="semi-bold" color="primary" className="slider-product-card__title">
          {title}
        </Label>
        
        <div className="slider-product-card__footer">
          <PriceDisplay price={price} originalPrice={originalPrice} />
        </div>
      </div>
    </a>
  );
};