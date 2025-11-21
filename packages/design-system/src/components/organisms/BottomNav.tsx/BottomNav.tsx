// BottomNav.tsx
import React from 'react';
import './BottomNav.scss';

export interface BottomNavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  isActive?: boolean;
}

export interface BottomNavProps {
  items: BottomNavItemProps[];
}

export const BottomNav = ({ items }: BottomNavProps) => {
  return (
    <nav className="bottom-nav">
      {items.map((item) => (
        <a key={item.href} href={item.href} className={`bottom-nav__item ${item.isActive ? 'bottom-nav__item--active' : ''}`}>
          <div className="bottom-nav__icon">{item.icon}</div>
          <span className="bottom-nav__label">{item.label}</span>
        </a>
      ))}
    </nav>
  );
};