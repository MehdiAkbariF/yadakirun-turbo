import React from 'react';
import Link from 'next/link';
import { Megaphone, ChevronLeft } from 'lucide-react';
import { Label } from '../../atoms/Label/Label';
import './CallToActionBanner.scss';

interface CallToActionBannerProps {
  title: string;
  description: string;
  link: string;
}

export const CallToActionBanner = ({ title, description, link }: CallToActionBannerProps) => {
  return (
    <div className="cta-banner">
      <Link href={link} className="cta-banner__button group">
        <div className="flex items-center gap-3">
          <Megaphone size={24} className="animate-pulse" />
          <Label size="lg" weight="bold" color="on-brand">{title}</Label>
        </div>
        <ChevronLeft size={24} className="transition-transform group-hover:-translate-x-1" />
      </Link>
      <Label size="sm" color="secondary" className="mt-3 leading-relaxed">
        {description}
      </Label>
    </div>
  );
};