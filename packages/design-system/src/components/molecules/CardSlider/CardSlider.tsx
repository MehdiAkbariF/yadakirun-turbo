import React from 'react';
import { Card } from '../../atoms/Card/Card';
import { CardSliderProps } from './CardSlider.types';
import './CardSlider.scss';

export const CardSlider = ({ items }: CardSliderProps) => {
  return (
    <div className="card-slider" dir="rtl">
      {items.map((item) => (
        <div key={item.href} className="card-slider__item">
          <Card {...item} />
        </div>
      ))}
    </div>
  );
};