import React from 'react';
import { Label } from '../Label/Label';
import { Badge } from '../Badge/Badge';
import './PriceDisplay.scss';

const formatPrice = (num?: number) => {
  if (typeof num !== 'number') return "";
  return `${num.toLocaleString("fa-IR")} `;
};

export const PriceDisplay = ({ price, originalPrice, className }: { price?: number; originalPrice?: number; className?: string }) => {
  const hasDiscount = typeof price === 'number' && typeof originalPrice === 'number' && originalPrice > price;
  const discountPercentage = hasDiscount ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div className={`price-display ${className || ''}`}>
      {!price ? (
        <Label color="primary" weight="bold">ناموجود</Label>
      ) : hasDiscount ? (
        <>
          <div className="price-display__discount-section">
            <Label as="span" color="secondary" className="price-display__original-price">
              {formatPrice(originalPrice)}
            </Label>
            <Badge variant="error">{discountPercentage}%</Badge>
          </div>
          <Label weight="bold" color="primary">{formatPrice(price)}</Label>
        </>
      ) : (
        <Label weight="bold" color="primary">{formatPrice(price)}</Label>
      )}
    </div>
  );
};