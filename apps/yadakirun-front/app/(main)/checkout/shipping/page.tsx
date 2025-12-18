"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Truck, CheckCircle, Plus } from 'lucide-react';

// --- Stores & Services ---
import { useAddressStore } from '@/src/stores/addressStore';
import { useBasketStore } from '@/src/stores/basketStore';
import { checkoutService } from '@monorepo/api-client/src/services/checkoutService';
import type { ShippingMethod } from '@monorepo/api-client/src/types/checkout.types';

// --- Components ---
import { Container } from '@monorepo/design-system/src/components/organisms/Container/Container';
import { Label } from '@monorepo/design-system/src/components/atoms/Label/Label';
import { Button } from '@monorepo/design-system/src/components/atoms/Button/Button';
import { OrderSummary } from '@monorepo/design-system/src/components/organisms/OrderSummary/OrderSummary';
import { AddressManager } from '@monorepo/design-system/src/components/organisms/AddressManager/AddressManager';

export default function ShippingPage() {
  const router = useRouter();

  const { addresses, isLoading: isAddressLoading, fetchAddresses, addAddress, updateAddress, deleteAddress, openAddModal, closeAddModal, isAddModalOpen } = useAddressStore();
  const { totalOriginalPrice, totalFinalPrice } = useBasketStore();
  
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | string | null>(null);
  const [selectedShippingMethodId, setSelectedShippingMethodId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // واکشی داده‌های اولیه
  useEffect(() => {
    fetchAddresses();
    checkoutService.getShippingMethods().then(methods => {
      setShippingMethods(methods);
    });
  }, [fetchAddresses]);

  // ✅✅✅ تغییر اصلی اینجاست ✅✅✅
  // یک useEffect جداگانه برای انتخاب مقادیر پیش‌فرض
  // این افکت به تغییرات addresses و shippingMethods گوش می‌دهد
  useEffect(() => {
    // انتخاب اولین آدرس به عنوان پیش‌فرض، فقط اگر آدرسی وجود داشت و هنوز چیزی انتخاب نشده بود
    if (addresses.length > 0 && !selectedAddressId) {
      setSelectedAddressId(addresses[0].id);
    }
    // انتخاب اولین روش ارسال به عنوان پیش‌فرض
    if (shippingMethods.length > 0 && !selectedShippingMethodId) {
      setSelectedShippingMethodId(shippingMethods[0].id);
    }
  }, [addresses, shippingMethods, selectedAddressId, selectedShippingMethodId]);

  const handleSubmitOrder = async () => {
    if (!selectedAddressId || !selectedShippingMethodId) {
      alert('لطفا آدرس و روش ارسال را انتخاب کنید.');
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await checkoutService.finalizeCheckout({
        userLocationId: Number(selectedAddressId),
        shipmentMethodId: selectedShippingMethodId,
      });
      window.location.href = result.paymentUrl;
    } catch (e) {
      alert('خطا در نهایی کردن سفارش.');
      setIsSubmitting(false);
    }
  };

  const discount = totalOriginalPrice - totalFinalPrice;
  const selectedShipping = shippingMethods.find(s => s.id === selectedShippingMethodId);
  const finalTotal = totalFinalPrice + (selectedShipping?.price || 0);

  return (
    <Container className="py-8">
      <div className="sr-only">
        <AddressManager 
          addresses={addresses}
          isLoading={isAddressLoading}
          isAddModalOpen={isAddModalOpen}
          onOpenAddModal={openAddModal}
          onCloseAddModal={closeAddModal}
          onAddAddress={addAddress}
          onUpdateAddress={updateAddress}
          onDeleteAddress={deleteAddress}
        />
      </div>

      <Label as="h1" size="2x" weight="bold" className="mb-8">تکمیل سفارش</Label>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <div className="lg:col-span-8 space-y-8">
          <AddressManager
            variant="selection"
            title="۱. انتخاب آدرس"
            addresses={addresses}
            isLoading={isAddressLoading}
            selectedId={selectedAddressId}
            onSelectAddress={setSelectedAddressId}
            onAddAddress={addAddress}
            onUpdateAddress={updateAddress}
            onDeleteAddress={deleteAddress}
          />

          <div className="bg-surface p-6 rounded-2xl border border-border-secondary">
            <div className="flex items-center gap-3 mb-4">
              <Truck className="text-brand-primary" />
              <Label as="h2" weight="bold">۲. انتخاب روش ارسال</Label>
            </div>
            <div className="space-y-3">
              {shippingMethods.map(method => (
                <div key={method.id} onClick={() => setSelectedShippingMethodId(method.id)} className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedShippingMethodId === method.id ? 'border-brand-primary bg-brand-secondary ring-2 ring-brand-primary' : 'border-border-secondary hover:border-border-primary'}`}>
                  <div className="flex items-center justify-between">
                    <Label weight="bold">{method.name}</Label>
                    {selectedShippingMethodId === method.id && <CheckCircle className="text-brand-primary" />}
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <Label size="sm" color="secondary">{method.deliveryTime}</Label>
                    <Label size="sm" weight="bold">{method.price > 0 ? `${method.price.toLocaleString('fa-IR')} تومان` : 'رایگان'}</Label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 sticky top-24">
          <OrderSummary 
            subtotal={totalOriginalPrice}
            discount={discount}
            shippingCost={selectedShipping?.price || 0}
            total={finalTotal}
            buttonText="پرداخت و نهایی کردن"
            onCheckout={handleSubmitOrder}
            isLoading={isSubmitting}
            disabled={!selectedAddressId || !selectedShippingMethodId}
          />
        </div>
      </div>
    </Container>
  );
}