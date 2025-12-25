import React from 'react';
import type { Metadata } from "next";

import { ThemeProvider } from "@/src/context/ThemeProvider";
import { ThemeScript } from "@/src/components/layout/ThemeScript";
import { AuthProvider } from "@/src/context/AuthContext";

import "@monorepo/design-system/src/styles/global.scss";
import "./globals.css";

export const metadata: Metadata = {
  title: "یدکی ران - فروشگاه آنلاین لوازم یدکی خودرو",
  description: "فروش تخصصی قطعات یدکی اصلی خودرو با گارانتی اصالت کالا.",
  // اختیاری: برای بهتر شدن SEO و PWA
  manifest: "/manifest.json",
  icons: {
    icon: ["/icons/icon-192x192.png", "/icons/icon-512x512.png"],
    apple: "/icons/icon-192x192.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
      <script
  dangerouslySetInnerHTML={{
    __html: `
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('SW registered: ', reg))
            .catch(err => console.log('SW registration failed: ', err));
        });
      }
    `,
  }}
/>
        {/* اسکریپت تم (برای جلوگیری از FOUC) */}
        <ThemeScript />

        {/* === تگ‌های ضروری PWA === */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* آیکون‌های مختلف برای دستگاه‌های مختلف */}
        <link rel="icon" href="/icons/icon-192x192.png" sizes="192x192" />
        <link rel="icon" href="/icons/icon-512x512.png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />

        {/* رنگ تم نوار آدرس در مرورگرهای موبایل */}
        <meta name="theme-color" content="#ff6600" /> {/* رنگ برندت رو اینجا بگذار، مثلاً نارنجی */}

        {/* برای iOS - امکان نصب به عنوان اپ و حالت تمام‌صفحه */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="یدکی ران" />

        {/* اختیاری: برای بهتر شدن تجربه PWA در اندروید */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content="یدکی ران" />
        <meta name="msapplication-TileColor" content="#ff6600" />
        <meta name="msapplication-TileImage" content="/icons/icon-192x192.png" />
      </head>
      <body>
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}