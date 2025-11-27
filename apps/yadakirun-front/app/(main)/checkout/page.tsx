"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Trash2, ShoppingBag } from "lucide-react";

// --- Design System Imports ---
import { Container } from "@monorepo/design-system/src/components/organisms/Container/Container";
import { Label } from "@monorepo/design-system/src/components/atoms/Label/Label";
import { Button } from "@monorepo/design-system/src/components/atoms/Button/Button"; // ✅ ایمپورت دکمه
import { CartItemCard } from "@monorepo/design-system/src/components/molecules/CartItemCard/CartItemCard";
import { OrderSummary } from "@monorepo/design-system/src/components/organisms/OrderSummary/OrderSummary";
import { Modal } from "@monorepo/design-system/src/components/organisms/Modal/Modal";
import { BestSellersSlider } from "@/src/components/layout/BestSellersSlider";
import { CartDrawer } from '@monorepo/design-system/src/components/organisms/CartDrawer/CartDrawer'; // ✅ ایمپورت جدید

// --- Mock Data & Types ---
interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

const initialCartItems: CartItem[] = [
  { id: "1", title: "کیت تسمه تایم اصلی رنو تندر 90", price: 2300000, image: "/Renault.svg", quantity: 1 },
  { id: "2", title: "لنت ترمز جلو پراید سرامیکی", price: 750000, image: "/Renault.svg", quantity: 2 },
];

const suggestedProducts = [
    { id: '1', title: 'کمک فنر حرفه‌ای رنو', href: '#', imgSrc: '/Renault.svg', price: 1250000, originalPrice: 1500000, rating: 4, badgeText: 'رنو' },
    { id: '2', title: 'دیسک ترمز خنک شونده', href: '#', imgSrc: '/Renault.svg', price: 890000, rating: 5, badgeText: 'پژو' },
        { id: '2', title: 'دیسک ترمز خنک شونده', href: '#', imgSrc: '/Renault.svg', price: 890000, rating: 5, badgeText: 'پژو' },
            { id: '2', title: 'دیسک ترمز خنک شونده', href: '#', imgSrc: '/Renault.svg', price: 890000, rating: 5, badgeText: 'پژو' },
                { id: '2', title: 'دیسک ترمز خنک شونده', href: '#', imgSrc: '/Renault.svg', price: 890000, rating: 5, badgeText: 'پژو' },
                    { id: '2', title: 'دیسک ترمز خنک شونده', href: '#', imgSrc: '/Renault.svg', price: 890000, rating: 5, badgeText: 'پژو' },
];

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<string | null>(null);

  const updateQuantity = (id: string, newQty: number) => {
    setCartItems(items => items.map(item => item.id === id ? { ...item, quantity: Math.max(1, newQty) } : item));
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
    setIsModalOpen(false);
    setItemToRemove(null);
  };

  const clearCart = () => {
    setCartItems([]);
    setIsModalOpen(false);
    setItemToRemove(null);
  };

  const handleRemoveClick = (id?: string) => {
    if (id) {
      setItemToRemove(id);
    } else {
      setItemToRemove('ALL');
    }
    setIsModalOpen(true);
  };

  const confirmRemove = () => {
    if (itemToRemove === 'ALL') {
      clearCart();
    } else if (itemToRemove) {
      removeItem(itemToRemove);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = 122000; 
  const shippingCost = 0;
  const total = subtotal - discount;

  // --- Empty Cart View ---

  return (
    <div className="bg-body min-h-screen pb-5 mt-6">
      <Container>
        <div className=" border-b border-border-secondary mb-4 flex justify-between items-center ">
          <div className="flex items-center gap-3">
             <Label as="h1" size="xl" weight="extra-bold">سبد خرید</Label>
             <span className="bg-brand-primary/10 text-brand-primary text-xs font-bold px-3 py-1 rounded-full">
                {cartItems.length} کالا
             </span>
          </div>
          
          {/* ✅ دکمه حذف همه با کامپوننت Button (Ghost) */}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => handleRemoveClick()} 
            className="text-utility-error hover:bg-utility-error/10 hover:text-utility-error"
            leftIcon={<Trash2 size={16} />}
          >
             حذف همه
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
           <div className="lg:col-span-8 space-y-4">
              {cartItems.map((item) => (
                 <CartItemCard
                   key={item.id}
                   id={item.id}
                   title={item.title}
                   imgSrc={item.image}
                   price={item.price}
                   quantity={item.quantity}
                   onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                   onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                   onRemove={() => handleRemoveClick(item.id)}
                 />
              ))}
           </div>

           <div className="lg:col-span-4">
              <OrderSummary 
                 subtotal={subtotal}
                 discount={discount}
                 shippingCost={shippingCost}
                 total={total}
                 onCheckout={() => alert('رفتن به درگاه پرداخت...')}
              />
           </div>
        </div>

        <div className="mt-10 border-t border-border-secondary ">
           <BestSellersSlider title="شاید از این‌ها هم خوشتان بیاید" items={suggestedProducts} uniqueId="checkout-slider" />
        </div>

      </Container>

      {/* ✅✅✅ Modal با دکمه‌های استاندارد ✅✅✅ */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={itemToRemove === 'ALL' ? "حذف تمام کالاها" : "حذف کالا از سبد"}
        footer={
          <>
             <Button 
               variant="secondary" 
               onClick={() => setIsModalOpen(false)}
             >
               انصراف
             </Button>
             <Button 
               variant="danger" 
               onClick={confirmRemove}
             >
               بله، حذف کن
             </Button>
          </>
        }
      >
         <Label size="sm" weight="medium">
            {itemToRemove === 'ALL' 
              ? "آیا مطمئن هستید که می‌خواهید تمام کالاها را از سبد خرید حذف کنید؟" 
              : "آیا از حذف این محصول از سبد خرید اطمینان دارید؟"
            }
         </Label>
      </Modal>
    </div>
  );
}