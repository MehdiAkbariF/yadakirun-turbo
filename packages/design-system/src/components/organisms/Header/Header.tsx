import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // ✨ 1. ایمپورت کامپوننت Link
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
}: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleToggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleCloseMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenAccordions({});
  };

  const handleAccordionToggle = (id: string) => {
    setOpenAccordions(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const classNames = [
    'header', className, isScrolled ? 'header--scrolled' : '',
    isMobileMenuOpen ? 'header--menu-open' : ''
  ].filter(Boolean).join(' ');

  const renderNavItems = (items: NavLinkItem[], isSubmenu = false) => {
    return items.map((item) => {
      if (item.children && item.children.length > 0 && item.id) {
        return (
          <AccordionMenu
            key={item.id}
            className={isSubmenu ? 'accordion-menu--nested' : ''}
            title={
              <Label as="span" size={isSubmenu ? "sm" : "base"} weight="semi-bold" color='primary'>
                {item.title}
              </Label>
            }
            isOpen={!!openAccordions[item.id]}
            onToggle={() => handleAccordionToggle(item.id!)}
          >
            <div className={isSubmenu ? "mobile-menu__sublist--nested" : "mobile-menu__sublist"}>
              {renderNavItems(item.children, true)}
            </div>
          </AccordionMenu>
        );
      }
      // ✨ 2. جایگزینی `a` با `Link` در منوی موبایل
      return (
        <Link 
          key={item.href} 
          href={item.href} 
          onClick={handleCloseMenu} 
          className={`mobile-menu__link ${isSubmenu ? 'mobile-menu__link--sub' : ''}`}
        >
          <Label as="span" size={isSubmenu ? "sm" : "base"} weight="semi-bold">
            {item.title}
          </Label>
        </Link>
      );
    });
  };

  return (
    <>
      <header className={classNames}>
        <div className="header__container">
          <div className="header__left">
            <div className="header__actions-mobile">{searchSlot}</div>
            {logo}
            <nav className="header__nav" data-testid="desktop-nav">
              {megaMenuSlot}
              {navLinks
                .filter(link => !link.mobileOnly && !link.children)
                .map((link) => (
                  // ✨ 3. جایگزینی `a` با `Link` در منوی دسکتاپ
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    className={`header__nav-link ${activePath === link.href ? 'header__nav-link--active' : ''}`}
                  >
                    <Label as="span" size="sm" weight="bold" color="primary">{link.title}</Label>
                  </Link>
                ))}
            </nav>
          </div>
          <div className="header__right">
            <div className="header__actions-desktop">{searchSlot}{cartSlot}{themeToggleSlot}{userSlot}</div>
            <button
              className={`header__mobile-toggle ${isMobileMenuOpen ? 'header__mobile-toggle--active' : ''}`}
              onClick={handleToggleMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <div className="header__toggle-icon">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </div>
            </button>
          </div>
        </div>
      </header>
      
      <div 
        className={`mobile-menu-backdrop ${isMobileMenuOpen ? 'mobile-menu-backdrop--visible' : ''}`}
        onClick={handleCloseMenu}
      />

      <div className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu--open' : ''}`} data-testid="mobile-menu-container">
        <div className="mobile-menu__content">
          <div className="mobile-menu__scroll-area">
            <nav className="mobile-menu__nav" data-testid="mobile-nav">
              {renderNavItems(navLinks)}
            </nav>
          </div>
          <div className="mobile-menu__footer">{themeToggleSlot}{userSlot}</div>
        </div>
      </div>
    </>
  );
};