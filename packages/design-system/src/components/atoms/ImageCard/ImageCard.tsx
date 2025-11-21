// packages/design-system/src/components/atoms/ImageCard/ImageCard.tsx
import React from 'react';
import Image from 'next/image';
import { ImageCardProps } from './ImageCard.types';
import './ImageCard.scss';

export const ImageCard = ({
  src,
  alt,
  href,
  aspectRatio = '16 / 9',
  className,
}: ImageCardProps) => {
  const classNames = ['image-card', className].filter(Boolean).join(' ');

  // متغیر CSS برای aspect-ratio را به صورت inline style پاس می‌دهیم
  const style = { '--aspect-ratio': aspectRatio } as React.CSSProperties;

  return (
    <a href={href} className={classNames} style={style}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw" // مقدار sizes را می‌توان از بیرون هم دریافت کرد
        className="image-card__image"
      />
      <div className="image-card__overlay" />
    </a>
  );
};