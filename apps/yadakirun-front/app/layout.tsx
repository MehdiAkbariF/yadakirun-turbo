import React from 'react';
import type { Metadata } from "next";

// --- کامپوننت‌های عمومی و سراسری ---
import { ThemeProvider } from "@/src/context/ThemeProvider";
import { ThemeScript } from "@/src/components/layout/ThemeScript";
// ✅ 1. AuthProvider را اینجا ایمپورت کنید
import { AuthProvider } from "@/src/context/AuthContext";

// --- استایل‌های سراسری ---
import "@monorepo/design-system/src/styles/global.scss";
import "./globals.css";

export const metadata: Metadata = {
  // اطلاعات متا را می‌توانید مطابق با پروژه خودتان تغییر دهید
  title: "یدکی ران - فروشگاه آنلاین لوازم یدکی خودرو",
  description: "فروش تخصصی قطعات یدکی اصلی خودرو با گارانتی اصالت کالا.",
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
        <ThemeProvider>
          {/* ✅ 2. AuthProvider را اینجا قرار دهید تا تمام فرزندان (children) را پوشش دهد */}
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}