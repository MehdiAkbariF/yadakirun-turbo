import React from 'react';
import { Label } from '../../atoms/Label/Label';
import './ContactItem.scss';

interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  href?: string;
  isAddress?: boolean; // برای استایل متفاوت آدرس‌های طولانی
}

export const ContactItem = ({ icon, title, value, href, isAddress }: ContactItemProps) => {
  const Content = () => (
    <div className={`contact-item ${isAddress ? 'contact-item--address' : ''}`}>
      <div className="contact-item__icon-box">
        {icon}
      </div>
      <div className="contact-item__info">
        <Label size="sm" color="secondary" className="mb-1">{title}</Label>
        <Label size="sm" weight="semi-bold" color="primary" className={isAddress ? 'leading-loose' : ''}>
          {value}
        </Label>
      </div>
    </div>
  );

  if (href) {
    return <a href={href} className="block w-full">{<Content />}</a>;
  }
  return <Content />;
};