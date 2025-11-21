"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';

type Theme = 'light-orange' | 'dark-blue'; // می‌توانید تم‌های دیگر را هم اضافه کنید

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light-orange'); // تم پیش‌فرض

  useEffect(() => {
    // در اولین رندر، تم ذخیره شده یا تم سیستم را می‌خوانیم
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (storedTheme) {
      setTheme(storedTheme);
    } else if (prefersDark) {
      setTheme('dark-blue');
    }
  }, []);

  useEffect(() => {
    // هر بار که تم تغییر کرد، کلاس را روی <html> اعمال و در localStorage ذخیره می‌کنیم
    const root = document.documentElement;
    const isDark = theme === 'dark-blue';
    
    root.classList.remove(isDark ? 'light-orange' : 'dark-blue');
    root.classList.add(theme);
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light-orange' ? 'dark-blue' : 'light-orange'));
  };

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};