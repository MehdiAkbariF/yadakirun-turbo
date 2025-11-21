// packages/design-system/src/components/atoms/ProductCard/ProductCard.tsx
import React from 'react';
import Image from 'next/image';
import { ProductCardProps } from './ProductCard.types';
import { Label } from '../Label/Label';
import { Badge } from '../Badge/Badge'; // ✅ ایمپورت کردن کامپوننت Badge
import './ProductCard.scss';

export const ProductCard = ({ title, href, imgSrc, price, badgeText, className }: ProductCardProps) => {
  const classNames = ['product-card', className].filter(Boolean).join(' ');

  return (
    <a href={href} className={classNames}>
      {/* ✅✅✅ استفاده از کامپوننت Badge به جای div ساده */}
      {badgeText && (
        <Badge variant="primary" className="product-card__badge">
          <Label size='xs' color='brand-secondarys'>
             {badgeText}
          </Label>
         
        </Badge>
      )}
      
      <div className="product-card__image-container">
        <Image src={imgSrc} alt={title} fill className="product-card__image" />
      </div>
      <div className="product-card__details">
        <Label as="h3" size="sm" weight="semi-bold" className="product-card__title">
          {title}
        </Label>
        <Label as="p" size="lg" weight="bold" color="primary" className="mt-2">
          {price}
        </Label>
      </div>
    </a>
  );
};