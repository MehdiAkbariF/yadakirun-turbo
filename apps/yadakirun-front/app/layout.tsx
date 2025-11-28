import React from 'react';
import type { Metadata } from "next";

// --- کامپوننت‌های عمومی و سراسری ---
import { ThemeProvider } from "@/src/context/ThemeProvider";
import { ThemeScript } from "@/src/components/layout/ThemeScript";

// --- استایل‌های سراسری ---
import "@monorepo/design-system/src/styles/global.scss";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yadakirun",
  description: "Your Learning Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>
        {/* ThemeProvider کل اپلیکیشن را در بر می‌گیرد */}
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}