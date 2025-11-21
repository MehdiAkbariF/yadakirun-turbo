import React from 'react';
import { Label } from '../../atoms/Label/Label';
import './ServiceFeatures.scss';

export interface ServiceItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface ServiceFeaturesProps {
  items: ServiceItem[];
}

export const ServiceFeatures = ({ items }: ServiceFeaturesProps) => {
  return (
    <div className="service-features">
      {items.map((item, index) => (
        <div key={index} className="service-features__card">
          <div className="service-features__icon">{item.icon}</div>
          <div>
            <Label size="sm" weight="bold" className="mb-1">{item.title}</Label>
            <Label size="xs" color="secondary" className="leading-relaxed">{item.description}</Label>
          </div>
        </div>
      ))}
    </div>
  );
};