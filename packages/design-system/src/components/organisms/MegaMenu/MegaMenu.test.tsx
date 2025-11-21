import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';
import { MegaMenu } from './MegaMenu';
import { CategoryItem, BrandItem } from './MegaMenu.types';

// داده‌های ساختگی برای تست
const mockCategories: CategoryItem[] = [
  { id: 'cat-1', title: 'کمک فنر', href: '/cat/1' },
];
const mockBrands: BrandItem[] = [
  { id: 'brand-1', title: 'رنو', href: '/brand/1', subItems: [
    { id: 'sub-1', title: 'مگان', href: '/car/1' },
  ]},
  { id: 'brand-2', title: 'پژو', href: '/brand/2', subItems: [] },
];

describe('MegaMenu Component', () => {
  test('should be hidden by default', () => {
    render(<MegaMenu triggerText="دسته‌بندی" categories={mockCategories} brands={mockBrands} />);
    
    const dropdown = screen.getByTestId('mega-menu-dropdown');
    expect(dropdown).not.toHaveClass('mega-menu__dropdown--open');
  });

  test('should open on mouse enter and close on mouse leave', async () => {
    const user = userEvent.setup();
    render(<MegaMenu triggerText="دسته‌بندی" categories={mockCategories} brands={mockBrands} />);

    const megaMenuContainer = screen.getByTestId('mega-menu');
    const dropdown = screen.getByTestId('mega-menu-dropdown');

    // هاور روی کانتینر
    await user.hover(megaMenuContainer);
    expect(dropdown).toHaveClass('mega-menu__dropdown--open');
    expect(screen.getByText('کمک فنر')).toBeInTheDocument();
    expect(screen.getByText('رنو')).toBeInTheDocument();

    // ترک کردن کانتینر
    await user.unhover(megaMenuContainer);
    expect(dropdown).not.toHaveClass('mega-menu__dropdown--open');
  });

  test('should show submenu on brand hover', async () => {
    const user = userEvent.setup();
    render(<MegaMenu triggerText="دسته‌بندی" categories={mockCategories} brands={mockBrands} />);

    const megaMenuContainer = screen.getByTestId('mega-menu');
    await user.hover(megaMenuContainer);

    const brandWithSubmenu = screen.getByText('رنو');
    const submenu = screen.getByTestId('submenu-brand-1');
    
    // در ابتدا زیرمنو فعال نیست
    expect(submenu).not.toHaveClass('mega-menu__sub-menu--active');

    // هاور روی برند دارای زیرمنو
    await user.hover(brandWithSubmenu);
    expect(submenu).toHaveClass('mega-menu__sub-menu--active');
    expect(screen.getByText('مگان')).toBeInTheDocument();
  });
});