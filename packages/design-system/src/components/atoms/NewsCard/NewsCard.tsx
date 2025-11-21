import React from 'react';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { NewsCardProps } from './NewsCard.types';
import { Label } from '../Label/Label';
import './NewsCard.scss';

export const NewsCard = ({ title, date, description, href, imgSrc, className }: NewsCardProps) => {
  const classNames = ['news-card', className].filter(Boolean).join(' ');

  return (
    <a href={href} className={classNames}>
      <div className="news-card__image-container">
        <Image src={imgSrc} alt={title} fill  className="news-card__image" />
      </div>
      <div className="news-card__content">
        {date && (
          <Label as="span" size="xs" color="secondary" className="news-card__date">
            {date}
          </Label>
        )}
        <Label as="h3" weight="bold" color="primary" className="news-card__title">
          {title}
        </Label>
        {description && (
          <Label as="p" size="xs" color="secondary" className="news-card__description">
            {description}
          </Label>
        )}
        <div className="news-card__link">
          <span className="news-card__link-text--desktop">ادامه مطلب</span>
          <span className="news-card__link-text--mobile">مشاهده</span>
          <ArrowLeft size={16} />
        </div>
      </div>
    </a>
  );
};