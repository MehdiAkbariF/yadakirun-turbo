"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, ShoppingBag } from 'lucide-react';
import { MobileBottomNavProps } from './MobileBottomNav.types';
import { Label } from '../../atoms/Label/Label';
import './MobileBottomNav.scss';

export const MobileBottomNav = ({ items, activeId, className, cartSummary }: MobileBottomNavProps) => {
  const hasCartItems = cartSummary && cartSummary.itemCount > 0;
  const isAlwaysOpen = cartSummary?.alwaysOpen;

  // اگر alwaysOpen باشد، مقدار اولیه true است
  const [isCartOpen, setIsCartOpen] = useState(isAlwaysOpen || false);

  // اگر پراپ alwaysOpen تغییر کرد، استیت را آپدیت کن
  useEffect(() => {
    if (isAlwaysOpen) {
      setIsCartOpen(true);
    }
  }, [isAlwaysOpen]);

  const classNames = ['mobile-bottom-nav', className].filter(Boolean).join(' ');

  return (
    <div className="mobile-bottom-nav-wrapper">
      
      {/* ✅ بخش سبد خرید */}
      {hasCartItems && (
        <>
          {/* دکمه باز کردن (فقط وقتی alwaysOpen نیست و بسته است نمایش داده شود) */}
          {!isAlwaysOpen && !isCartOpen && (
            <button 
              className="floating-cart__toggle-btn"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={16} />
              <Label color='on-brand' weight='medium' size="xs"> تکمیل خرید ({cartSummary.itemCount}) </Label>
              <ChevronUp size={16} />
            </button>
          )}

          {/* پنل باز شونده */}
          <div className={`floating-cart ${isCartOpen ? 'floating-cart--expanded' : 'floating-cart--collapsed'}`}>
            
            {/* هدر پنل (دکمه بستن فقط وقتی alwaysOpen نیست نمایش داده شود) */}
            <div className="floating-cart__header">
              <Label size="sm" color="secondary" weight='bold'>
                {cartSummary.itemCount} کالا در سبد شما
              </Label>
              
              {!isAlwaysOpen && (
                <button onClick={() => setIsCartOpen(false)} className="text-text-secondary p-1 bg-transparent border-none cursor-pointer">
                   <ChevronDown size={20} />
                </button>
              )}
            </div>

            <button className="floating-cart__checkout-btn" onClick={cartSummary.onCheckout}>
              <Label size="sm" color='on-brand' weight="bold">ثبت سفارش</Label>
              <Label size="sm" color='on-brand' weight="bold">{cartSummary.totalPrice.toLocaleString('fa-IR')} تومان</Label>
            </button>
          </div>
        </>
      )}

      {/* نویگیشن بار اصلی */}
      <nav className={classNames}>
        {items.map((item) => {
          const isActive = activeId === item.id;
          const itemClass = `mobile-bottom-nav__item ${isActive ? 'mobile-bottom-nav__item--active' : ''}`;

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
    </div>
  );
};