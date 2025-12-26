"use client";

import React, { useState, ElementType } from 'react';
import { ChevronDown, ChevronLeft } from 'lucide-react';
import { MegaMenuProps } from './MegaMenu.types';
import { Label } from '../../atoms/Label/Label';
import './MegaMenu.scss';

// اضافه کردن linkComponent و href به اینترفیس محلی (یا می‌توانید در فایل .types.ts هم اضافه کنید)
export const MegaMenu = ({ 
  triggerText, 
  categories, 
  brands,
  href, // ✅ اضافه شدن پراپ href برای لینک اصلی
  linkComponent: LinkComponent = 'a' 
}: MegaMenuProps & { linkComponent?: ElementType; href?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

  const handleMouseLeave = () => {
    setIsOpen(false);
    setActiveSubMenu(null);
  };

  return (
    <div
      className="mega-menu"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={handleMouseLeave}
      data-testid="mega-menu"
    >
      {/* ✅ اصلاح اصلی: تبدیل trigger از div به LinkComponent برای قابلیت کلیک */}
      <LinkComponent 
        href={href || '#'} 
        className={`mega-menu__trigger ${isOpen ? 'mega-menu__trigger--active' : ''}`}
      >
        <Label as="span" size="sm" weight="bold" color="primary">
          {triggerText}
        </Label>
        <ChevronDown size={16} className="mega-menu__chevron" />
      </LinkComponent>

      <div className={`mega-menu__dropdown ${isOpen ? 'mega-menu__dropdown--open' : ''}`}>
        <div className="mega-menu__content">
          
          {/* ستون اول: دسته‌بندی قطعات */}
          <div className="mega-menu__column" onMouseEnter={() => setActiveSubMenu(null)}>
            <Label as="h3" size="sm" weight="bold" color="primary" className="mega-menu__title">
              قطعات خودرو
            </Label>
            <ul className="mega-menu__list">
              {categories.map((item) => (
                <li key={item.id}>
                  <LinkComponent href={item.href} className="mega-menu__link">
                    <Label as="span" size="sm">{item.title}</Label>
                  </LinkComponent>
                </li>
              ))}
            </ul>
          </div>

          {/* ستون دوم: برندها */}
          <div className="mega-menu__column">
            <Label as="h3" size="sm" weight="bold" color="primary" className="mega-menu__title">
              برند خودرو
            </Label>
            <ul className="mega-menu__list">
              {brands.map((item) => (
                <li key={item.id} onMouseEnter={() => setActiveSubMenu(item.id)}>
                  <LinkComponent 
                    href={item.href} 
                    className={`mega-menu__link mega-menu__link--parent ${activeSubMenu === item.id ? 'mega-menu__link--active' : ''}`}
                  >
                    <Label as="span" size="sm">{item.title}</Label>
                    {item.subItems && item.subItems.length > 0 && <ChevronLeft size={16} />}
                  </LinkComponent>
                </li>
              ))}
            </ul>
          </div>

          {/* ستون سوم: مدل‌ها (Submenus) */}
          <div className={`mega-menu__sub-menu-column ${activeSubMenu ? 'mega-menu__sub-menu-column--open' : ''}`}>
            {brands.map((brand) => {
              if (!brand.subItems || brand.subItems.length === 0) return null;
              
              return (
                <div
                  key={`sub-${brand.id}`}
                  className={`mega-menu__sub-menu ${activeSubMenu === brand.id ? 'mega-menu__sub-menu--active' : ''}`}
                >
                  <Label as="h3" size="sm" weight="bold" color="primary" className="mega-menu__title">
                    مدل‌های {brand.title}
                  </Label>
                  <div className="mega-menu__sub-list">
                    {brand.subItems.map((subItem: any) => (
                      <LinkComponent key={subItem.id} href={subItem.href} className="mega-menu__link">
                        <Label as="span" size="sm">{subItem.title}</Label>
                      </LinkComponent>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};