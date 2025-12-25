"use client"; // این خط حیاتی است

import React from 'react';
import { ThemeProvider } from "@/src/context/ThemeProvider";
import { AuthProvider } from "@/src/context/AuthContext";

// این کامپوننت تمام پروایدرهای کلاینتی شما را در خود نگه می‌دارد
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}