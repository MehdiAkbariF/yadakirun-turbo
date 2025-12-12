import React from 'react';
import Image from 'next/image';
import { Label } from '../../atoms/Label/Label';
import './PageHeader.scss';

interface PageHeaderProps {
  title: string;
  imageSrc: string;
  height?: string;
}

export const PageHeader = ({ title, imageSrc, height = '300px' }: PageHeaderProps) => {
  return (
    <section className="page-header" style={{ height }}>
      <Image 
        src={imageSrc} 
        alt={title} 
        fill 
        className="page-header__image"
        priority
      />
      <div className="page-header__overlay" />
      <div className="page-header__content">
        <Label as="h1" size="4x" weight="extra-bold" color="on-brand">
          {title}
        </Label>
        {/* یک خط تزئینی زیر عنوان */}
        <div className="page-header__divider" />
      </div>
    </section>
  );
};