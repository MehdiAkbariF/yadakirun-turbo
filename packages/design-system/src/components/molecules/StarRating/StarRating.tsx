"use client";
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import './StarRating.scss';

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: number;
  readOnly?: boolean;
  onChange?: (rating: number) => void;
  className?: string;
}

export const StarRating = ({
  rating,
  maxStars = 5,
  size = 20,
  readOnly = false,
  onChange,
  className,
}: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (index: number) => {
    if (!readOnly) setHoverRating(index);
  };

  const handleMouseLeave = () => {
    if (!readOnly) setHoverRating(0);
  };

  const handleClick = (index: number) => {
    if (!readOnly && onChange) onChange(index);
  };

  return (
    <div className={`star-rating ${readOnly ? 'star-rating--readonly' : ''} ${className || ''}`} dir="ltr">
      {[...Array(maxStars)].map((_, i) => {
        const index = i + 1;
        const isFilled = index <= (hoverRating || rating);
        
        return (
          <Star
            key={index}
            size={size}
            className={`star-rating__icon ${isFilled ? 'star-rating__icon--filled' : ''}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(index)}
          />
        );
      })}
    </div>
  );
};