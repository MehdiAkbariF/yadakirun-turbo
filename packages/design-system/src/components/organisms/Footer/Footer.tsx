"use client"
import React from 'react';
import { IoMdArrowRoundUp } from 'react-icons/io';
import { PhoneIcon, ClockIcon } from 'lucide-react';

// ✨✨✨ 2. ایمپورت کردن تایپ از فایل جداگانه ✨✨✨
import { FooterProps } from './Footer.types'; 

import { Label } from '../../atoms/Label/Label';
import { ServiceCard } from '../../atoms/ServiceCard/ServiceCard';
import { TrustSeal } from '../../atoms/TrustSeal/TrustSeal';
import { NewsletterForm } from '../../molecules/NewsletterForm/NewsletterForm';
import { Container } from '../Container/Container';
import './Footer.scss';

export const Footer = (props: FooterProps) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer" dir="rtl">
      <div className="footer__scroll-to-top">
        <button onClick={scrollToTop} aria-label="برو به بالای صفحه">
          <IoMdArrowRoundUp size={24} />
        </button>
      </div>

      <Container>
        <div className="footer__main-content">
          {/* بخش معرفی و خدمات */}
          <div className="footer__grid-top">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {props.logo}
                <Label as="p" size="sm" weight="semi-bold">
                  {props.companyName} | <span className="text-accent">{props.tagline}</span>
                </Label>
              </div>
              <Label as="p" color="secondary" className="leading-relaxed" size='sm'>{props.description}</Label>
            </div>
            <div>
              <Label as="h3" weight="semi-bold" className="mb-4">خدمات ما</Label>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {props.serviceCards.map((card, i) => <ServiceCard key={i} {...card} />)}
              </div>
            </div>
          </div>
          
          {/* بخش تماس و خبرنامه */}
          <div className="footer__grid-middle">
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="flex items-start gap-3">
                <PhoneIcon className="w-6 h-6 text-gray-500 mt-1" />
                <div>
                  <Label as="span" weight="semi-bold">تلفن پشتیبانی</Label>
                  <a href={`tel:${props.supportPhone1}`}><Label size="sm">{props.supportPhone1}</Label></a>
                  <a href={`tel:${props.supportPhone2}`}><Label size="sm">{props.supportPhone2}</Label></a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ClockIcon className="w-6 h-6 text-gray-500 mt-1" />
                <div>
                  <Label as="span" weight="semi-bold">ساعات کاری</Label>
                  {props.workHours.map(line => <Label key={line} size="sm">{line}</Label>)}
                </div>
              </div>
            </div>
            <NewsletterForm title="با ثبت ایمیل، از تخفیف‌ها با‌خبر شوید" />
          </div>

          {/* بخش دکمه‌های لینک */}
          <div className="footer__grid-links">
            {props.footerButtons.map((button, i) => (
              <a key={i} href={button.href} className="footer__link-button">
                {button.text}
              </a>
            ))}
          </div>
        </div>

        {/* بخش کپی‌رایت و نمادها */}
        <div className="footer__bottom">
          <Label as="p" size="xs" color="secondary">{props.copyrightText}</Label>
          <div className="flex items-center justify-center gap-4">
            {props.trustSeals.map((seal, i) => <TrustSeal key={i} {...seal} />)}
          </div>
        </div>
      </Container>
    </footer>
  );
};