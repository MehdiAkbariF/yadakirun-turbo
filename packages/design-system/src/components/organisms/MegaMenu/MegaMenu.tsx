import React, { useState } from 'react';
import { ChevronDown, ChevronLeft } from 'lucide-react';
import { MegaMenuProps } from './MegaMenu.types';
import { Label } from '../../atoms/Label/Label';
import './MegaMenu.scss';

export const MegaMenu = ({ triggerText, categories, brands }: MegaMenuProps) => {
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
      <div className={`mega-menu__trigger ${isOpen ? 'mega-menu__trigger--active' : ''}`}>
        <Label as="span" size="sm" weight="medium" color="secondary">
          {triggerText}
        </Label>
        <ChevronDown size={16} className="mega-menu__chevron" />
      </div>

      <div className={`mega-menu__dropdown ${isOpen ? 'mega-menu__dropdown--open' : ''}`} data-testid="mega-menu-dropdown">
        <div className="mega-menu__content">
          <div className="mega-menu__column">
            <Label as="h3" size="sm" weight="bold" color="primary" className="mega-menu__title">
              قطعات خودرو
            </Label>
            <ul className="mega-menu__list">
              {categories.map((item) => (
                <li key={item.id}>
                  <a href={item.href} className="mega-menu__link">
                    <Label as="span" size="sm">{item.title}</Label>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mega-menu__column">
            <Label as="h3" size="sm" weight="bold" color="primary" className="mega-menu__title">
              برند خودرو
            </Label>
            <ul className="mega-menu__list">
              {brands.map((item) => (
                <li key={item.id} onMouseEnter={() => item.subItems.length > 0 && setActiveSubMenu(item.id)}>
                  <a href={item.href} className="mega-menu__link mega-menu__link--parent">
                    <Label as="span" size="sm">{item.title}</Label>
                    {item.subItems.length > 0 && <ChevronLeft size={16} />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mega-menu__sub-menu-column">
            {brands.map((brand) => (
              brand.subItems.length > 0 && (
                <div
                  key={`sub-${brand.id}`}
                  className={`mega-menu__sub-menu ${activeSubMenu === brand.id ? 'mega-menu__sub-menu--active' : ''}`}
                  data-testid={`submenu-${brand.id}`}
                >
                  <Label as="h3" size="sm" weight="bold" color="primary" className="mega-menu__title">
                    مدل‌های {brand.title}
                  </Label>
                  <div className="mega-menu__sub-list">
                    {brand.subItems.map((subItem) => (
                      <a key={subItem.id} href={subItem.href} className="mega-menu__link">
                        <Label as="span" size="sm">{subItem.title}</Label>
                      </a>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};