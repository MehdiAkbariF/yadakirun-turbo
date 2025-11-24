"use client";
import React, { useEffect, useRef, useState } from 'react';
import { X, ShoppingCart, Trash2 } from 'lucide-react';
import { Label } from '../../atoms/Label/Label';
import { Button } from '../../atoms/Button/Button';
import { Modal } from '../Modal/Modal'; // ✅ ایمپورت مودال
import { CartItemCard, CartItemProps } from '../../molecules/CartItemCard/CartItemCard';
import './CartDrawer.scss';

export interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItemProps[]; // توجه: CartItemProps خودش شامل متد onRemove هست
  totalPrice: number;
  onCheckout: () => void;
  onClearCart?: () => void;
}

export const CartDrawer = ({ 
  isOpen, 
  onClose, 
  items, 
  totalPrice, 
  onCheckout,
  onClearCart 
}: CartDrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  
  // ✅ استیت‌های مدیریت مودال حذف
  const [itemToDelete, setItemToDelete] = useState<string | number | null>(null);
  const [isClearingCart, setIsClearingCart] = useState(false);

  // بستن با دکمه Escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // جلوگیری از اسکرول بادی
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  // هندل کردن حذف تکی
  const handleConfirmDelete = () => {
    if (itemToDelete !== null) {
      // پیدا کردن آیتم و صدا زدن متد onRemove خودش
      const item = items.find(i => i.id === itemToDelete);
      if (item && item.onRemove) {
        item.onRemove();
      }
      setItemToDelete(null);
    }
  };

  // هندل کردن حذف کل سبد
  const handleConfirmClear = () => {
    if (onClearCart) {
      onClearCart();
    }
    setIsClearingCart(false);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`cart-drawer-backdrop ${isOpen ? 'cart-drawer-backdrop--open' : ''}`}
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div 
        className={`cart-drawer ${isOpen ? 'cart-drawer--open' : ''}`}
        ref={drawerRef}
      >
        {/* Header */}
        <div className="cart-drawer__header">
          <div className="flex items-center gap-3">
            <ShoppingCart size={24} className="text-brand-primary" />
            <Label size="lg" weight="bold">سبد خرید</Label>
            <span className="cart-drawer__count">{items.length}</span>
          </div>
          <button onClick={onClose} className="cart-drawer__close-btn">
            <X size={24} />
          </button>
        </div>

        {/* Body (List) */}
        <div className="cart-drawer__body custom-scrollbar">
          {items.length > 0 ? (
            <div className="space-y-4">
               {items.map((item) => (
                 <div key={item.id} className="cart-drawer__item">
                    <CartItemCard 
                      {...item} 
                      // ✅ اورراید کردن متد حذف برای باز کردن مودال
                      onRemove={() => setItemToDelete(item.id)}
                    />
                 </div>
               ))}
            </div>
          ) : (
            <div className="cart-drawer__empty">
               <div className="w-20 h-20 bg-bg-secondary rounded-full flex items-center justify-center mb-4 mx-auto">
                  <ShoppingCart size={40} className="text-text-placeholder" />
               </div>
               <Label color="secondary" className="text-center">سبد خرید شما خالی است</Label>
               <Button variant="outline" size="sm" onClick={onClose} className="mt-4">
                 بازگشت به فروشگاه
               </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="flex justify-between items-center mb-4">
              <Label color="secondary">مبلغ قابل پرداخت:</Label>
              <div className="text-left">
                 <Label size="lg" weight="extra-bold" color="brand-primary">
                   {totalPrice.toLocaleString('fa-IR')}
                 </Label>
                 <Label size="xs" color="secondary">تومان</Label>
              </div>
            </div>
            
            <div className="flex gap-3">
               {onClearCart && (
                 <Button 
                   variant="ghost" 
                   onClick={() => setIsClearingCart(true)} // باز کردن مودال حذف همه
                   className="text-utility-error hover:bg-utility-error/10 p-3"
                 >
                    <Trash2 size={20} />
                 </Button>
               )}
               <Button fullWidth size="lg" onClick={onCheckout}>
                 نهایی کردن خرید
               </Button>
            </div>
          </div>
        )}
      </div>

      {/* ✅✅✅ Modal 1: حذف آیتم تکی ✅✅✅ */}
      <Modal
        isOpen={itemToDelete !== null}
        onClose={() => setItemToDelete(null)}
        title="حذف کالا از سبد"
        footer={
          <>
            <Button variant="secondary" onClick={() => setItemToDelete(null)}>
              انصراف
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              بله، حذف کن
            </Button>
          </>
        }
      >
        <Label>آیا از حذف این کالا از سبد خرید اطمینان دارید؟</Label>
      </Modal>

      {/* ✅✅✅ Modal 2: حذف کل سبد ✅✅✅ */}
      <Modal
        isOpen={isClearingCart}
        onClose={() => setIsClearingCart(false)}
        title="خالی کردن سبد خرید"
        footer={
          <>
            <Button variant="secondary" onClick={() => setIsClearingCart(false)}>
              انصراف
            </Button>
            <Button variant="danger" onClick={handleConfirmClear}>
              بله، همه را حذف کن
            </Button>
          </>
        }
      >
        <Label>آیا مطمئن هستید که می‌خواهید تمام کالاها را از سبد خرید حذف کنید؟</Label>
      </Modal>

    </>
  );
};