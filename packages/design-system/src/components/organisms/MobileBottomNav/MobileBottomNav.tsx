import React from 'react';
import Link from 'next/link';
import { MobileBottomNavProps } from './MobileBottomNav.types';
import { Label } from '../../atoms/Label/Label';
import './MobileBottomNav.scss';

export const MobileBottomNav = ({ items, activeId, className }: MobileBottomNavProps) => {
  const classNames = ['mobile-bottom-nav', className].filter(Boolean).join(' ');

  return (
    <nav className={classNames}>
      {items.map((item) => {
        const isActive = activeId === item.id;
        const itemClass = `mobile-bottom-nav__item ${isActive ? 'mobile-bottom-nav__item--active' : ''}`;

        // محتوای داخلی آیتم
        const content = (
          <>
            <div className="mobile-bottom-nav__icon-wrapper">
              {item.icon}
              {item.badgeCount ? (
                <span className="mobile-bottom-nav__badge">
                  {item.badgeCount > 9 ? '+9' : item.badgeCount}
                </span>
              ) : null}
            </div>
            <Label 
              size="xs" 
              weight={isActive ? 'bold' : 'medium'}
              className="mt-1"
              color={isActive ? 'primary' : 'secondary'}
            >
              {item.label}
            </Label>
          </>
        );

        // اگر لینک باشد از Link استفاده می‌کنیم، اگر نه دکمه
        if (item.href) {
          return (
            <Link key={item.id} href={item.href} className={itemClass}>
              {content}
            </Link>
          );
        }

        return (
          <button key={item.id} onClick={item.onClick} className={itemClass}>
            {content}
          </button>
        );
      })}
    </nav>
  );
};