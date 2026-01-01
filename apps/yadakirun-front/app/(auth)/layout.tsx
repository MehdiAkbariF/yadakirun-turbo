"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@monorepo/design-system/src/components/organisms/Container/Container';
import { Label } from '@monorepo/design-system/src/components/atoms/Label/Label';
import { ProgressBar } from '@/src/components/layout/ProgressBar';
// ❌ ایمپورت useTheme حذف شد
import { ThemeToggle } from '@monorepo/design-system/src/components/atoms/ThemeToggle/ThemeToggle';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  // ❌ هوک useTheme و منطق مربوط به آن کامل حذف شد

  return (
    <div className="min-h-screen bg-bg-body flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative transition-colors duration-300">
      
      {/* دکمه تغییر تم (بدون نیاز به پراپ) */}
      <div className="absolute top-6 left-6 z-10">
        <ThemeToggle 
          variant="icon"
          className="bg-bg-surface border border-border-secondary shadow-sm hover:shadow-md !p-3 !w-12 !h-12 !rounded-xl" isDarkMode={false} onToggle={function (): void {
            throw new Error('Function not implemented.');
          } }        />
      </div>

      <React.Suspense fallback={null}>
        <ProgressBar />
      </React.Suspense>
      
      <Container className="!max-w-xl w-full !px-5">
        <div className="bg-surface py-8 px-6 shadow-xl rounded-3xl border border-border-secondary sm:px-8">
           <div className="flex flex-col items-center">
            <Link href="/">
              <div className="relative w-50 h-20">
                 <Image src="/logo.webp" alt="یدکی‌ران" fill className="object-contain" />
              </div>
            </Link>
          </div>
          {children}
        </div>

        <div className="mt-6 text-center px-4">
           <Label size="xs" color="placeholder" className="leading-relaxed">
             با ورود به یدکی‌ران، شرایط و قوانین استفاده از سرویس‌های سایت را می‌پذیرید.
           </Label>
        </div>
      </Container>
    </div>
  );
}