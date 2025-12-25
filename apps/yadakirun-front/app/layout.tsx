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