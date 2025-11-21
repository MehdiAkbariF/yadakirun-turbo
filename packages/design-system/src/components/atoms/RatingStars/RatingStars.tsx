import React from 'react';
import { Star } from 'lucide-react';
import './RatingStars.scss';

export const RatingStars = ({ rating = 0, totalStars = 5, className }: { rating?: number; totalStars?: number; className?: string }) => {
  const roundedRating = Math.round(rating);
  const classNames = ['rating-stars', className].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      {[...Array(totalStars)].map((_, index) => (
        <Star
          key={index}
          className={`rating-stars__star ${index < roundedRating ? 'rating-stars__star--filled' : ''}`}
          size={16}
        />
      ))}
    </div>
  );
};