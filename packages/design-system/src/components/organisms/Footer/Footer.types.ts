import { ReactNode } from 'react';

// این تایپ‌ها ممکن است در جاهای دیگر هم استفاده شوند، پس آنها را هم export می‌کنیم
export interface ServiceCardData {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface FooterLink {
  text: string;
  href: string;
}

export interface TrustSealData {
    src: string;
    alt: string;
    href: string;
}

// ✨✨✨ 1. کلمه کلیدی export اضافه شد ✨✨✨
export interface FooterProps {
  logo: ReactNode;
  companyName: string;
  tagline: string;
  description: string;
  supportPhone1: string;
  supportPhone2: string;
  workHours: string[];
  trustSeals: TrustSealData[];
  copyrightText: string;
  serviceCards: ServiceCardData[];
  footerButtons: FooterLink[];
}