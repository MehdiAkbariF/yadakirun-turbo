import { ReactNode } from 'react';

export interface FooterLink { text: string; href: string; }
export interface ServiceCardData { icon: ReactNode; title: string; description: string; }
export interface TrustSealData { src: string; alt: string; href: string; }

export interface FooterProps {
  logo: ReactNode;
  companyName: string;
  tagline: string;
  description: string;
  supportPhone1: string;
  supportPhone2: string;
  workHours: string[];
  serviceCards: ServiceCardData[];
  footerButtons: FooterLink[];
  trustSeals: TrustSealData[];
  copyrightText: string;
}