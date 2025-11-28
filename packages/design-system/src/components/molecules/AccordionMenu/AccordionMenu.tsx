import React from 'react';
import { ChevronDown } from 'lucide-react';
import { AccordionMenuProps } from './AccordionMenu.types';
import './AccordionMenu.scss';

export const AccordionMenu = ({ title, children, isOpen, onToggle, className }: AccordionMenuProps) => {
  const classNames = ['accordion-menu', className].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      {/* ✨ 1. نام کلاس‌ها برای هماهنگی با SCSS اصلاح شد */}
      <button className="accordion-menu__trigger" onClick={onToggle} aria-expanded={isOpen}>
        <div className="accordion-menu__title">{title}</div>
        <ChevronDown 
          className={`accordion-menu__chevron ${isOpen ? 'accordion-menu__chevron--open' : ''}`} 
          size={20} 
        />
      </button>

      {/* ✨ 2. ساختار HTML برای انیمیشن grid اصلاح شد */}
      <div className={`accordion-menu__content ${isOpen ? 'accordion-menu__content--open' : ''}`}>
        <div className="accordion-menu__content-inner">
          {children}
        </div>
      </div>
    </div>
  );
};