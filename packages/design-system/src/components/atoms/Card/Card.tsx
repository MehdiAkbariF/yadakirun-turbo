import React from 'react';
import Image from 'next/image';
import { CardProps } from './Card.types';
import { Label } from '../Label/Label';
import './Card.scss';

export const Card = ({ title, imgSrc, href, isMore = false, className }: CardProps) => {
  const classNames = ['card', className].filter(Boolean).join(' ');

  return (
    <a href={href} className={classNames}>
      <div className="card__image-container">
        {!isMore && imgSrc && (
          <Image
            src={imgSrc}
            alt={typeof title === 'string' ? title : ''}
            fill
            sizes="(max-width: 768px) 40vw, (max-width: 1200px) 30vw, 20vw"
            className="card__image"
          />
        )}
      </div>
      <div className="card__title-container">
        <Label as="h3" size="sm" weight="bold" color="primary">
          {title}
        </Label>
      </div>
    </a>
  );
};