// apps/admin-panel/src/app/layout.tsx
"use client";
import { Inter } from 'next/font/google';
import '@monorepo/design-system/src/styles/global.scss';
import { AuthProvider } from '@/hooks/useAuth';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}