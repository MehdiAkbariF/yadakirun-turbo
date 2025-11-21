import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { HeaderProps } from './Header.types';
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
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const handleCloseMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenAccordion(null);
  };

  const handleAccordionToggle = (id: string) => {
    setOpenAccordion(prevId => (prevId === id ? null : id));
  };

  const classNames = ['header', className, isScrolled ? 'header--scrolled' : ''].filter(Boolean).join(' ');

  return (
    <>
      <header className={classNames}>
        <div className="header__container">
          <div className="header__left">
            <div className="header__actions-mobile">
              {searchSlot}
            
            </div>
            {logo}
            <nav className="header__nav" data-testid="desktop-nav">
              {megaMenuSlot}
              {navLinks
                .filter(link => !link.mobileOnly && !link.children)
                .map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`header__nav-link ${activePath === link.href ? 'header__nav-link--active' : ''}`}
                  >
                    <Label as="span" size="sm" weight="medium" color="secondary">{link.title}</Label>
                  </a>
                ))}
            </nav>
          </div>

          <div className="header__right">
            <div className="header__actions-desktop" data-testid="desktop-actions">
              {searchSlot}
              {cartSlot}
              {themeToggleSlot}
              {userSlot}
            </div>
            <button
              className="header__mobile-toggle"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>
      
      <div
        className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu--open' : ''}`}
        onClick={handleCloseMenu}
        data-testid="mobile-menu-container"
      >
        <div className="mobile-menu__content" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-menu__header">
            {logo}
            <button onClick={handleCloseMenu} aria-label="Close menu">
              <X size={24} />
            </button>
          </div>
          <nav className="mobile-menu__nav" data-testid="mobile-nav">
            {navLinks.map((item) => {
              if (item.children && item.children.length > 0 && item.id) {
                return (
                  <AccordionMenu
                    key={item.id}
                    title={<Label as="span" size="base" weight="semi-bold">{item.title}</Label>}
                    isOpen={openAccordion === item.id}
                    onToggle={() => handleAccordionToggle(item.id!)}
                  >
                    <div className="mobile-menu__sublist">
                      {item.children.map((child) => (
                        <a key={child.href} href={child.href} onClick={handleCloseMenu} className="mobile-menu__link mobile-menu__link--sub">
                          <Label as="span" size="sm">{child.title}</Label>
                        </a>
                      ))}
                    </div>
                  </AccordionMenu>
                );
              }
              return (
                <a key={item.href} href={item.href} onClick={handleCloseMenu} className="mobile-menu__link">
                  <Label as="span" size="base" weight="semi-bold">{item.title}</Label>
                </a>
              );
            })}
          </nav>
          <div className="mobile-menu__footer">
            {themeToggleSlot}
            {userSlot}
          </div>
        </div>
      </div>
    </>
  );
};