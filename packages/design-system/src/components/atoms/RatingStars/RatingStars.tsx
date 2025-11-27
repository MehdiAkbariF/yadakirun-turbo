import React from 'react';
import { Star } from 'lucide-react';
import { RatingStarsProps } from './RatingStars.types';
import './RatingStars.scss';

export const RatingStars = ({
  rating = 0,
  totalStars = 5,
  size = 'sm',
  variant = 'warning',
  className,
}: RatingStarsProps) => {
  const roundedRating = Math.round(rating);
  
  const classNames = [
    'rating-stars',
    `rating-stars--size-${size}`,
    `rating-stars--variant-${variant}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} aria-label={`${rating} از ${totalStars} ستاره`}>
      {[...Array(totalStars)].map((_, index) => (
        <Star
          key={index}
          className={`rating-stars__star ${index < roundedRating ? 'rating-stars__star--filled' : 'rating-stars__star--empty'}`}
          // سایز توسط CSS کنترل می‌شود، اما برای SVG stroke-width مناسب مقدار پیش‌فرض می‌دهیم
          strokeWidth={index < roundedRating ? 0 : 1.5} 
        />
      ))}
    </div>
  );
};