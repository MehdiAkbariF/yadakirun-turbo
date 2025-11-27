// مسیر: apps/yadakirun-front/src/app/layout.tsx
import type { Metadata } from "next";

import { ThemeProvider } from "@/src/context/ThemeProvider";


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
    <html lang="fa" dir="rtl">

      <body >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}