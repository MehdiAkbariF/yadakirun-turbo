// NewsletterForm.tsx
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Label } from '../../atoms/Label/Label';
import { Input } from '../../atoms/Input/Input';
import { Button } from '../../atoms/Button/Button';
import './NewsletterForm.scss';

export const NewsletterForm = ({ title }: { title: string }) => {
  return (
    <div className="newsletter-form">
      <Label as="h4" weight="semi-bold" color="primary" className="newsletter-form__title">
        {title}
      </Label>
      <div className="newsletter-form__wrapper">
        <Input
          id="newsletter-email"
          type="email"
          placeholder="ایمیل خود را وارد کنید"
          containerClassName="w-full"
        />
        <Button variant="primary" size="sm" className="newsletter-form__submit-button">
          <ArrowLeft size={20} />
        </Button>
      </div>
    </div>
  );
};