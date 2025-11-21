// ServiceCard.tsx
import React from 'react';
import { Label } from '../Label/Label';
import './ServiceCard.scss';

export const ServiceCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="service-card">
      <div className="service-card__icon">{icon}</div>
      <div>
        <Label as="h4" weight="semi-bold" size="sm" color="primary" className="service-card__title">{title}</Label>
        <Label as="p" size="xs" color="secondary" className="service-card__description">{description}</Label>
      </div>
    </div>
  );
};