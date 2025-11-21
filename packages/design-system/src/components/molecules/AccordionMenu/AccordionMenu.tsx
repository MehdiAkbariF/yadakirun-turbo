// packages/design-system/src/components/molecules/AccordionMenu/AccordionMenu.tsx
import React from 'react';
import { ChevronDown } from 'lucide-react';
import { AccordionMenuProps } from './AccordionMenu.types';
import './AccordionMenu.scss';

export const AccordionMenu = ({ title, children, isOpen, onToggle }: AccordionMenuProps) => {
  return (
    <div className="accordion-menu">
      <button className="accordion-menu__trigger" onClick={onToggle} aria-expanded={isOpen}>
        <div className="accordion-menu__title">{title}</div>
        <ChevronDown className={`accordion-menu__chevron ${isOpen ? 'accordion-menu__chevron--open' : ''}`} size={20} />
      </button>
      <div className={`accordion-menu__content ${isOpen ? 'accordion-menu__content--open' : ''}`}>
        <div className="accordion-menu__content-inner">
          {children}
        </div>
      </div>
    </div>
  );
};