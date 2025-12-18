"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Trash2, ShoppingBag, Loader2 } from "lucide-react";
import { useRouter } from 'next/navigation';

// --- Services ---
// ✅ 1. ایمپورت سرویس جدید برای آماده‌سازی سبد خرید
import { checkoutService } from "@monorepo/api-client/src/services/checkoutService";

// --- Design System Imports ---
import { Container } from "@monorepo/design-system/src/components/organisms/Container/Container";
import { Label } from "@monorepo/design-system/src/components/atoms/Label/Label";
import { Button } from "@monorepo/design-system/src/components/atoms/Button/Button";
import { CartItemCard } from "@monorepo/design-system/src/components/molecules/CartItemCard/CartItemCard";
import { OrderSummary } from "@monorepo/design-system/src/components/organisms/OrderSummary/OrderSummary";
import { Modal } from "@monorepo/design-system/src/components/organisms/Modal/Modal";
import { BestSellersSlider } from "@/src/components/layout/BestSellersSlider";

// --- Global Stores ---
import { useBasketStore } from "@/src/stores/basketStore";
import { toPersianDigits } from "@monorepo/design-system/src/utils/persian";

const suggestedProducts = [
    { id: '1', title: 'کمک فنر حرفه‌ای رنو', href: '#', imgSrc: '/Renault.svg', price: 1250000, originalPrice: 1500000, rating: 4, badgeText: 'رنو' },
];

export default function CheckoutPage() {
    const router = useRouter();
    const {
        items: cartItems,
        totalOriginalPrice,
        totalFinalPrice,
        isLoading,
        fetchBasket,
        updateItemQuantity,
        removeItem,
        clearCart,
    } = useBasketStore();
  
    // ✅ 2. تعریف یک وضعیت لودینگ محلی برای دکمه "ادامه"
    const [isPreparing, setIsPreparing] = useState(false);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [itemToRemove, setItemToRemove] = useState<{ productId: number; quantity: number } | 'ALL' | null>(null);

    useEffect(() => {
        fetchBasket();
    }, [fetchBasket]);
  
    const handleRemoveClick = (item?: { productId: number; quantity: number }) => {
        setItemToRemove(item ?? 'ALL');
        setIsModalOpen(true);
    };

    const confirmRemove = () => {
        if (itemToRemove === 'ALL') {
            clearCart();
        } else if (itemToRemove) {
            removeItem({ productId: itemToRemove.productId, quantity: itemToRemove.quantity });
        }
        setIsModalOpen(false);
        setItemToRemove(null);
    };

    // ✅ 3. تابع جدید برای مدیریت کلیک روی دکمه "ادامه"
    const handleProceedToShipping = async () => {
        setIsPreparing(true);
        try {
            // فراخوانی API برای آماده‌سازی سبد خرید
            await checkoutService.prepareBasketForCheckout();
            // در صورت موفقیت، هدایت به صفحه بعد
            router.push('/checkout/shipping');
        } catch (error) {
            console.error("Failed to prepare basket for checkout:", error);
            alert('خطا در آماده‌سازی سبد خرید. ممکن است موجودی یکی از کالاها تمام شده باشد. لطفا دوباره تلاش کنید.');
        } finally {
            setIsPreparing(false);
        }
    };

    const discount = totalOriginalPrice - totalFinalPrice;

    if (isLoading && cartItems.length === 0) {
        return (
            <Container className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="animate-spin text-brand-primary" size={48} />
                <Label size="lg" weight="medium" className="mt-4">در حال بارگذاری سبد خرید شما...</Label>
            </Container>
        );
    }

    if (!isLoading && cartItems.length === 0) {
        return (
            <Container className="flex flex-col items-center justify-center min-h-[60vh] text-center py-10">
                <div className="w-24 h-24 bg-bg-secondary rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag size={50} className="text-text-placeholder" />
                </div>
                <Label as="h2" size="2x" weight="bold" className="mb-2">سبد خرید شما خالی است!</Label>
                <Label color="secondary" className="max-w-md mb-8">برای مشاهده و افزودن محصولات به فروشگاه سر بزنید.</Label>
                <Button asChild size="lg">
                    <Link href="/">بازگشت به فروشگاه</Link>
                </Button>
            </Container>
        );
    }

    return (
        <div className="bg-body min-h-screen pb-5 mt-6">
            <Container>
                <div className="border-b border-border-secondary mb-6 pb-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Label as="h1" size="xl" weight="extra-bold">سبد خرید</Label>
                        <span className="bg-brand-primary/10 text-brand-primary text-xs font-bold px-3 py-1 rounded-full">
                            {toPersianDigits(cartItems.length)} کالا
                        </span>
                    </div>
                    
                    <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleRemoveClick()} 
                        className="text-utility-error hover:bg-utility-error/10 hover:text-utility-error"
                        leftIcon={<Trash2 size={16} />}
                        disabled={isLoading || isPreparing}
                    >
                        حذف همه
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-8 space-y-4">
                        {cartItems.map((item) => (
                            <CartItemCard
                                key={item.productId}
                                id={item.productId}
                                title={item.productName}
                                imgSrc={item.productImage}
                                price={item.unitPrice}
                                quantity={item.quantity}
                                onIncrease={() => updateItemQuantity(item.productId, item.quantity + 1)}
                                onDecrease={() => updateItemQuantity(item.productId, item.quantity - 1)}
                                onRemove={() => handleRemoveClick({ productId: item.productId, quantity: item.quantity })}
                            />
                        ))}
                    </div>

                    <div className="lg:col-span-4 sticky top-24">
                        <OrderSummary 
                            subtotal={totalOriginalPrice}
                            discount={discount}
                            shippingCost={0}
                            total={totalFinalPrice}
                            // ✅ 4. اتصال به تابع و وضعیت لودینگ جدید
                            onCheckout={handleProceedToShipping}
                            isLoading={isPreparing} // فقط از isLoading محلی استفاده می‌کنیم
                            buttonText="ادامه و ثبت سفارش"
                        />
                    </div>
                </div>

                <div className="mt-16 border-t border-border-secondary pt-8">
                    <BestSellersSlider title="شاید از این‌ها هم خوشتان بیاید" items={suggestedProducts} uniqueId="checkout-slider" />
                </div>
            </Container>

            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)}
                title={itemToRemove === 'ALL' ? "حذف تمام کالاها" : "حذف کالا از سبد"}
                footer={
                    <>
                        <Button variant="secondary" onClick={() => setIsModalOpen(false)}>انصراف</Button>
                        {/* ✅ 5. دکمه تایید حذف نیز باید از isLoading سراسری استفاده کند */}
                        <Button variant="danger" onClick={confirmRemove} isLoading={isLoading}>
                            {isLoading ? '...' : 'بله، حذف کن'}
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