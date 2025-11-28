"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// فرض می‌کنم تایپ تم شما به این شکل است
type Theme = 'light-orange' | 'dark-blue';

interface ThemeProviderState {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined);

// ✨ 1. کلید localStorage را به یک متغیر ثابت تبدیل می‌کنیم
const THEME_STORAGE_KEY = 'theme';

export function ThemeProvider({ children }: { children: ReactNode }) {
  // ✨ 2. یک استیت برای جلوگیری از اجرای افکت در اولین رندر اضافه می‌کنیم
  const [isMounted, setIsMounted] = useState(false);
  
  // مقدار اولیه state را null یا undefined می‌گذاریم
  const [theme, setTheme] = useState<Theme | null>(null);

  // ✨ 3. این افکت فقط یک بار بعد از مانت شدن اجرا می‌شود
  useEffect(() => {
    setIsMounted(true);
    
    // تم را از localStorage می‌خوانیم و در state قرار می‌دهیم
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      // اگر تمی وجود نداشت، تم پیش‌فرض را بر اساس سیستم عامل تنظیم کن
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark-blue' : 'light-orange');
    }
  }, []);

  // ✨ 4. این افکت فقط زمانی اجرا می‌شود که تم *تغییر کند*
  useEffect(() => {
    // اگر کامپوننت هنوز مانت نشده یا تم مقدار ندارد، کاری انجام نده
    if (!isMounted || !theme) return;
    
    // تم را در localStorage ذخیره کن
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    
    // کلاس را به تگ <html> اعمال کن
    document.documentElement.className = theme;
    
  }, [theme, isMounted]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light-orange' ? 'dark-blue' : 'light-orange');
  };

  // ✨ 5. تا زمانی که تم از کلاینت خوانده نشده، هیچ UI ای که به تم وابسته است را رندر نکن
  if (!isMounted || !theme) {
    // می‌توانید یک لودر ساده اینجا برگردانید، اما null بهتر است تا از پرش جلوگیری شود
    return null; 
  }
  
  const value = { theme, toggleTheme };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};