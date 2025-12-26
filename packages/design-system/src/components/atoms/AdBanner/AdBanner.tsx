import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Megaphone } from 'lucide-react';
import { Label } from '../Label/Label';
import { AdBannerProps } from './AdBanner.types'; // ✅ ایمپورت از فایل جداگانه
import './AdBanner.scss';

export const AdBanner = ({
  href = '#',
  src,
  alt = 'تبلیغات',
  title = 'محل تبلیغات شما',
  subTitle = 'برای رزرو تماس بگیرید',
  className,
  ...props
}: AdBannerProps) => {
  
  const content = (
    <>
      {src ? (
        <Image 
          src={src} 
          alt={alt} 
          fill 
          className="ad-banner__image" 
        />
      ) : (
        <div className="ad-banner__placeholder">
          <div className="ad-banner__icon-wrapper">
            <Megaphone size={24} />
          </div>
          <div className="text-center">
            <Label weight="bold" size="lg" className="ad-banner__title">
              {title}
            </Label>
            <Label size="xs" color="secondary" className="mt-1">
              {subTitle}
            </Label>
          </div>
          <div className="ad-banner__cta">
            کلیک کنید
          </div>
        </div>
      )}
    </>
  );

  return (
    <Link 
      href={href} 
      className={`ad-banner ${className || ''}`} 
      {...props}
    >
      {content}
    </Link>
  );
};