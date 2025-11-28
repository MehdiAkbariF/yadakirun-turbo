"use client";

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import NProgress from 'nprogress';

// ایمپورت کردن استایل‌های سفارشی
import './ProgressBar.css';

export function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // ✨✨✨ اصلاح اصلی اینجاست: منطق معکوس شده ✨✨✨

    
    NProgress.done();

    return () => {
      NProgress.start();
    };
  }, [pathname, searchParams]); 


  return null;
}