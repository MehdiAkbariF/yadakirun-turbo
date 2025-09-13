// apps/admin-panel/src/app/layout.tsx

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@monorepo/design-system/src/styles/global.scss';// <-- وارد کردن استایل‌های گلوبال از design-system

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Admin Panel',
  description: 'Centralized administration dashboard for your project.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}