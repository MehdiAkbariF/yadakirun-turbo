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
  priority = false, // ✨ 1. دریافت پراپ جدید با مقدار پیش‌فرض false
}: ImageCardProps) => {
  const classNames = ['image-card', className].filter(Boolean).join(' ');
  const style = { '--aspect-ratio': aspectRatio } as React.CSSProperties;

  return (
    <a href={href} className={classNames} style={style}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="image-card__image"
        // ✨ 2. پاس دادن پراپ به کامپوننت Image
        priority={priority}
      />
      <div className="image-card__overlay" />
    </a>
  );
};