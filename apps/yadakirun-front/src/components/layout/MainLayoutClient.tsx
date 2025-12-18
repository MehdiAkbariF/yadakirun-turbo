"use client";

import React, { useEffect } from 'react'; // ✅ useEffect را برای فراخوانی اولیه لازم داریم
import { useRouter } from 'next/navigation'; // ✅ برای هدایت به صفحه تسویه حساب

// --- کامپوننت‌های لی‌اوت ---
import { MainHeader } from '@/src/components/layout/MainHeader';
import { VideoBanner } from '@/src/components/layout/VideoBanner';
import { Footer, FooterProps } from '@monorepo/design-system/src/components/organisms/Footer/Footer';
import { AppMobileNav } from '@/src/components/layout/AppMobileNav';
import { ProgressBar } from '@/src/components/layout/ProgressBar';
import { CartDrawer } from '@monorepo/design-system/src/components/organisms/CartDrawer/CartDrawer';

// --- تایپ‌ها و Store ها ---
import { MenuData } from '@monorepo/api-client/src/types/menu.types';
import { useBasketStore } from '@/src/stores/basketStore';
import { useUIStore } from '@/src/stores/uiStore';

// پراپس‌هایی که این کامپوننت از لی‌اوت سرور دریافت می‌کند
interface MainLayoutClientProps {
  menuData: MenuData;
  footerData: FooterProps;
  children: React.ReactNode;
}

export function MainLayoutClient({ menuData, footerData, children }: MainLayoutClientProps) {
  const router = useRouter();

  // ✅ 1. اتصال به store ها برای دریافت وضعیت و اکشن‌ها
  const { isCartDrawerOpen, closeCartDrawer } = useUIStore();
  const { 
    items, 
    totalFinalPrice, 
    fetchBasket, 
    removeItem, 
    updateItemQuantity, 
    clearCart 
  } = useBasketStore();

  // ✅ 2. فراخوانی اطلاعات سبد خرید در اولین بارگذاری اپلیکیشن
  // این اطمینان می‌دهد که سبد خرید کاربر همیشه به‌روز است.
  useEffect(() => {
    fetchBasket();
  }, [fetchBasket]);

  return (
    <>
      <React.Suspense fallback={null}>
        <ProgressBar />
      </React.Suspense>
    
      <div className="">
        <VideoBanner />
        <div className="relative flex flex-col min-h-screen">
          <div className="sticky top-0 z-20">
            <MainHeader menuData={menuData} />
          </div>
          
          <main className="py-1 flex-grow">
            {children}
          </main>
        
          <div className='mt-auto pt-16'> {/* mt-auto فوتر را به پایین هل می‌دهد */}
            <Footer {...footerData} />
          </div>
        </div>
        
        <AppMobileNav />
      </div>

      {/* ✅ 3. رندر کردن CartDrawer سراسری و تزریق داده‌ها و اکشن‌ها از store */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={closeCartDrawer}
        items={items.map(item => ({
          // تبدیل داده‌های API به پراپ‌های مورد انتظار کامپوننت
          id: item.productId,
          title: item.productName,
          imgSrc: item.productImage,
          price: item.unitPrice,
          quantity: item.quantity,
          // اتصال اکشن‌های UI به اکشن‌های store
          onIncrease: () => updateItemQuantity(item.productId, item.quantity + 1),
          onDecrease: () => updateItemQuantity(item.productId, item.quantity - 1),
          onRemove: () => removeItem({ productId: item.productId, quantity: item.quantity }),
        }))}
        totalPrice={totalFinalPrice}
        onCheckout={() => {
          router.push('/checkout'); // هدایت به صفحه تسویه حساب
          closeCartDrawer();
        }}
        onClearCart={clearCart}
      />
    </>
  );
}