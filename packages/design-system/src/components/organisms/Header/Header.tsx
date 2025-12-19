import React, { useState, useEffect, ElementType } from 'react';
// ❌ حذف import Link from 'next/link'; (دیزاین سیستم نباید وابسته باشد)
import { Menu, X } from 'lucide-react';
import { HeaderProps, NavLinkItem } from './Header.types';
import { Label } from '../../atoms/Label/Label';
import { AccordionMenu } from '../../molecules/AccordionMenu/AccordionMenu';
import './Header.scss';

export const Header = ({
  logo,
  navLinks = [],
  megaMenuSlot,
  searchSlot,
  cartSlot,
  userSlot,
  themeToggleSlot,
  className,
  isScrolled,
  activePath,
  linkComponent: LinkComponent = 'a' // ✅ اضافه شدن پراپ برای تزریق Link
}: HeaderProps & { linkComponent?: ElementType }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const handleCloseMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenAccordions({});
  };

  const renderNavItems = (items: NavLinkItem[], isSubmenu = false) => {
    return items.map((item) => {
      if (item.children && item.children.length > 0 && item.id) {
        return (
          <AccordionMenu
            key={item.id}
            title={<Label as="span" size={isSubmenu ? "sm" : "base"} weight="semi-bold">{item.title}</Label>}
            isOpen={!!openAccordions[item.id]}
            onToggle={() => setOpenAccordions(prev => ({ ...prev, [item.id!]: !prev[item.id!] }))}
          >
            <div className={isSubmenu ? "mobile-menu__sublist--nested" : "mobile-menu__sublist"}>
              {renderNavItems(item.children, true)}
            </div>
          </AccordionMenu>
        );
      }
      return (
        /* ✅ استفاده از LinkComponent تزریق شده */
        <LinkComponent 
          key={item.href} 
          href={item.href} 
          onClick={handleCloseMenu} 
          className={`mobile-menu__link ${isSubmenu ? 'mobile-menu__link--sub' : ''}`}
        >
          <Label as="span" size={isSubmenu ? "sm" : "base"} weight="semi-bold">{item.title}</Label>
        </LinkComponent>
      );
    });
  };

  return (
    <>
      <header className={`header ${className || ''} ${isScrolled ? 'header--scrolled' : ''}`}>
        <div className="header__container">
          <div className="header__left">
            <div className="header__actions-mobile">{searchSlot}</div>
            {/* ✅ لوگو هم باید LinkComponent باشد (اگر از بیرون به عنوان المنت نیاید) */}
            {logo}
            <nav className="header__nav">
              {megaMenuSlot}
              {navLinks
                .filter(link => !link.mobileOnly && !link.children)
                .map((link) => (
                  /* ✅ استفاده از LinkComponent تزریق شده */
                  <LinkComponent 
                    key={link.href} 
                    href={link.href} 
                    className={`header__nav-link ${activePath === link.href ? 'header__nav-link--active' : ''}`}
                  >
                    <Label as="span" size="sm" weight="bold">{link.title}</Label>
                  </LinkComponent>
                ))}
            </nav>
          </div>
          <div className="header__right">
            <div className="header__actions-desktop">{searchSlot}{cartSlot}{themeToggleSlot}{userSlot}</div>
            <button className="header__mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>
      <div className={`mobile-menu-backdrop ${isMobileMenuOpen ? 'mobile-menu-backdrop--visible' : ''}`} onClick={handleCloseMenu} />
      <div className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu--open' : ''}`}>
        <div className="mobile-menu__content">
          <div className="mobile-menu__scroll-area">
            <nav className="mobile-menu__nav">{renderNavItems(navLinks)}</nav>
          </div>
          <div className="mobile-menu__footer">{themeToggleSlot}{userSlot}</div>
        </div>
      </div>
    </>
  );
};