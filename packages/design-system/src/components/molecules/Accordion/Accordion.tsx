"use client";
import React, { useState } from 'react';
import { ChevronDown, List } from 'lucide-react';
import { Label } from '../../atoms/Label/Label';
import './Accordion.scss';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export const Accordion = ({ 
  title, 
  children, 
  defaultOpen = false, 
  icon,
  className 
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`accordion ${isOpen ? 'accordion--open' : ''} ${className || ''}`}>
      <button 
        className="accordion__header" 
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2">
          {/* اگر آیکون پاس داده نشد، پیش‌فرض نمایش داده شود. اگر null پاس داده شد، هیچی نمایش نده */}
          {icon === undefined ? <List size={20} className="text-brand-primary" /> : icon}
          <Label weight="bold" size="xs">{title}</Label>
        </div>
        <ChevronDown 
          size={20} 
          className="accordion__chevron" 
        />
      </button>
      
      <div className="accordion__content-wrapper">
        <div className="accordion__inner">
          <div className="accordion__content">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};