// این کامپوننت فقط برای قرار دادن اسکریپت در <head> است
// و نیازی به "use client" ندارد چون منطق آن در یک رشته متنی است.

import React from 'react';

// این اسکریپت به صورت یک رشته متنی در <head> قرار می‌گیرد و بلافاصله اجرا می‌شود.
const blockingScript = `
  (function() {
    // تابع برای اعمال تم
    function applyTheme(theme) {
      // ما کلاس را به تگ <html> اضافه می‌کنیم چون layout اصلی شما اینگونه است
      document.documentElement.className = theme;
    }

    try {
      // ✨ کلید صحیح که از localStorage شما گرفته شده است
      const themeKey = 'theme'; 
      const storedTheme = localStorage.getItem(themeKey);

      if (storedTheme) {
        // اگر تم در localStorage ذخیره شده بود، همان را اعمال کن
        applyTheme(storedTheme);
      } else {
        // (اختیاری) اگر تمی ذخیره نشده بود، می‌توانید تم پیش‌فرض سیستم عامل کاربر را چک کنید
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark-blue' : 'light-orange');
      }
    } catch (e) {
      // در صورت بروز خطا (مثلاً در مرورگرهای قدیمی)، کاری انجام نده
    }
  })();
`;

/**
 * این کامپوننت یک اسکریپت مسدودکننده رندر را برای جلوگیری از "فلش تم اشتباه" (FOUC)
 * در هنگام لود اولیه صفحه، به تگ <head> تزریق می‌کند.
 */
export const ThemeScript = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: blockingScript,
      }}
    />
  );
};