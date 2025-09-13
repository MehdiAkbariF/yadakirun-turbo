// مسیر: apps/admin-panel/src/app/(auth)/layout.tsx
import React from 'react';

export const metadata = {
  title: 'Auth | Admin Panel',
  description: 'Authentication pages for Admin Panel',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f2f5' }}>
      {children}
    </div>
  );
}