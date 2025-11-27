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
          
            className="card__image"
          />
        )}
      </div>
      <div className="card__title-container">
        <Label  size="xs" weight="bold" color="primary">
          {title}
        </Label>
      </div>
    </a>
  );
};