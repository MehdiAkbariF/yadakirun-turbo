"use client";

import React from 'react';
import { MainHeader } from '@/src/components/layout/MainHeader';
import { VideoBanner } from '@/src/components/layout/VideoBanner';
import { Footer, FooterProps } from '@monorepo/design-system/src/components/organisms/Footer/Footer';
import { AppMobileNav } from '@/src/components/layout/AppMobileNav';
import { ProgressBar } from '@/src/components/layout/ProgressBar';
import { MenuData } from '@monorepo/api-client/src/types/menu.types';

// پراپس‌هایی که این کامپوننت از لی‌اوت سرور دریافت می‌کند
interface MainLayoutClientProps {
  menuData: MenuData;
  footerData: FooterProps;
  children: React.ReactNode;
}

export function MainLayoutClient({ menuData, footerData, children }: MainLayoutClientProps) {
  return (
    <>
      {/* ProgressBar به Suspense نیاز دارد چون از هوک‌های ناوبری استفاده می‌کند */}
      <React.Suspense fallback={null}>
        <ProgressBar />
      </React.Suspense>
    
      <div className="">
        <VideoBanner />
        <div className="relative flex flex-col">
          <div className="sticky top-0 z-20">
            {/* MainHeader یک کامپوننت کلاینت است و داده‌ها را به عنوان prop می‌گیرد */}
            <MainHeader menuData={menuData} />
          </div>
          
          <main className="py-1 ">
            {children}
          </main>
        </div>

        <div className='mt-15'>
          {/* Footer یک کامپوننت کلاینت است */}
          <Footer {...footerData} />
        </div>
        
         <AppMobileNav />
      </div>
    </>
  );
}