import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi } from 'vitest';
import { Header } from './Header';
import { User } from 'lucide-react';

const mockNavLinks = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/about' },
];
const mockLogo = <a href="/">Logo</a>;
const mockUserSlot = <a href="/login"><User /> Login</a>;
const mockSearchSlot = <button>Search</button>;
const mockCartSlot = <button>Cart</button>;
const mockThemeToggleSlot = <button>ThemeToggle</button>;

const setupMatchMedia = (matches: boolean) => {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(), removeListener: vi.fn(),
    addEventListener: vi.fn(), removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
};

describe('Header Component', () => {

  test('should render logo, nav links, and slots correctly on desktop', () => {
    setupMatchMedia(true);
    render(
      <Header 
        logo={mockLogo} 
        navLinks={mockNavLinks} 
        userSlot={mockUserSlot} 
        searchSlot={mockSearchSlot} 
        cartSlot={mockCartSlot}
        themeToggleSlot={mockThemeToggleSlot}
      />
    );

    const desktopNav = screen.getByTestId('desktop-nav');
    expect(within(desktopNav).getByText('Home')).toBeInTheDocument();
    expect(within(desktopNav).getByText('About')).toBeInTheDocument();
    
    expect(screen.getByText('Logo')).toBeInTheDocument();

    const desktopActions = screen.getByTestId('desktop-actions');
    expect(within(desktopActions).getByText('Login')).toBeInTheDocument();
    expect(within(desktopActions).getByText('Search')).toBeInTheDocument();
    expect(within(desktopActions).getByText('Cart')).toBeInTheDocument();
    expect(within(desktopActions).getByText('ThemeToggle')).toBeInTheDocument();
  });

  test('should show mobile toggle button on mobile', () => {
    setupMatchMedia(false);
    render(<Header logo={mockLogo} />);
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
  });

  test('should open and close mobile menu on click', async () => {
    const user = userEvent.setup();
    setupMatchMedia(false);
    render(
      <Header 
        logo={mockLogo} 
        navLinks={mockNavLinks} 
        userSlot={mockUserSlot}
        cartSlot={mockCartSlot}
        searchSlot={mockSearchSlot}
        themeToggleSlot={mockThemeToggleSlot}
      />
    );

    const openButton = screen.getByRole('button', { name: /open menu/i });
    
    const mobileMenuContainer = screen.getByTestId('mobile-menu-container');
    expect(mobileMenuContainer).not.toHaveClass('mobile-menu--open');

    await user.click(openButton);
    
    expect(mobileMenuContainer).toHaveClass('mobile-menu--open');
    
    const mobileNav = screen.getByTestId('mobile-nav');
    expect(within(mobileNav).getByText('Home')).toBeInTheDocument();
    
    expect(within(mobileMenuContainer).getByText('Login')).toBeInTheDocument();
    expect(within(mobileMenuContainer).getByText('Cart')).toBeInTheDocument();
    
    // جستجو و تاگل تم نباید در منوی کشویی باشند
    expect(within(mobileMenuContainer).queryByText('Search')).toBeNull();
    expect(within(mobileMenuContainer).queryByText('ThemeToggle')).toBeNull();

    const closeButton = screen.getByRole('button', { name: /close menu/i });
    await user.click(closeButton);

    expect(mobileMenuContainer).not.toHaveClass('mobile-menu--open');
  });

  test('should apply active class to the correct nav link on desktop', () => {
    setupMatchMedia(true);
    render(<Header logo={mockLogo} navLinks={mockNavLinks} activePath="/about" />);
    
    const desktopNav = screen.getByTestId('desktop-nav');

    const homeLink = within(desktopNav).getByText('Home');
    const aboutLink = within(desktopNav).getByText('About');

    expect(homeLink.closest('a')).not.toHaveClass('header__nav-link--active');
    expect(aboutLink.closest('a')).toHaveClass('header__nav-link--active');
  });
});