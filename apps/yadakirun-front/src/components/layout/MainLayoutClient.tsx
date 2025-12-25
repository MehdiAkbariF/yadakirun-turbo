"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
import { useMediaQuery } from '@/src/hooks/useMediaQuery';

interface MainLayoutClientProps {
  menuData: MenuData;
  footerData: FooterProps;
  children: React.ReactNode;
  showVideoBanner?: boolean; // ✅ اضافه شدن آپشن نمایش بنر
}

export function MainLayoutClient({ 
  menuData, 
  footerData, 
  children, 
  showVideoBanner = true // ✅ پیش‌فرض نمایش داده شود
}: MainLayoutClientProps) {
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const { isCartDrawerOpen, closeCartDrawer } = useUIStore();
  const { 
    items, 
    totalFinalPrice, 
    fetchBasket, 
    removeItem, 
    updateItemQuantity, 
    clearCart 
  } = useBasketStore();

  useEffect(() => {
    fetchBasket();
  }, [fetchBasket]);

  return (
    <>
      <React.Suspense fallback={null}>
        <ProgressBar />
      </React.Suspense>
    
      <div className="flex flex-col min-h-screen">
        {/* ✅ نمایش شرطی بنر ویدیو */}
        {showVideoBanner && <VideoBanner />}
        
        <div className="relative flex flex-col flex-1">
          <div className="sticky top-0 z-20">
            <MainHeader menuData={menuData} />
          </div>
          
          <main className=" flex-grow">
            {children}
          </main>
        
          <div className='mt-auto pt-16'>
            <Footer {...footerData} />
          </div>
        </div>
        
        <AppMobileNav />
      </div>

      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={closeCartDrawer}
        items={items.map(item => ({
          id: item.productId,
          title: item.productName,
          imgSrc: item.productImage,
          price: item.unitPrice,
          quantity: item.quantity,
          onIncrease: () => updateItemQuantity(item.productId, item.quantity + 1),
          onDecrease: () => updateItemQuantity(item.productId, item.quantity - 1),
          onRemove: () => removeItem({ productId: item.productId, quantity: item.quantity }),
        }))}
        totalPrice={totalFinalPrice}
        onCheckout={() => {
          router.push('/checkout');
          closeCartDrawer();
        }}
        onClearCart={clearCart}
      />
    </>
  );
}