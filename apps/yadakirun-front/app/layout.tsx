// مسیر: apps/yadakirun-front/src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/src/context/ThemeProvider";
// استایل‌های گلوبال و توکن‌های دیزاین سیستم رو اینجا ایمپورت می‌کنیم
import "@monorepo/design-system/src/styles/global.scss";
// استایل‌های پیش‌فرض Tailwind رو هم ایمپورت می‌کنیم
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="fa" dir="rtl">
      <body className={inter.className}>
        <ThemeProvider> {/* ✅ Provider را اینجا اضافه کنید */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}