"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Truck, CheckCircle } from 'lucide-react';
import Image from 'next/image';

// --- Stores & Services ---
import { useAddressStore } from '@/src/stores/addressStore';
import { useBasketStore } from '@/src/stores/basketStore';
import { checkoutService } from '@monorepo/api-client/src/services/checkoutService';
import type { ShippingMethod } from '@monorepo/api-client/src/types/checkout.types';

// --- Components ---
import { Container } from '@monorepo/design-system/src/components/organisms/Container/Container';
import { Label } from '@monorepo/design-system/src/components/atoms/Label/Label';
import { OrderSummary } from '@monorepo/design-system/src/components/organisms/OrderSummary/OrderSummary';
import { AddressManager } from '@monorepo/design-system/src/components/organisms/AddressManager/AddressManager';

export default function ShippingPage() {
  const router = useRouter();

  const { addresses, isLoading: isAddressLoading, fetchAddresses, addAddress, updateAddress, deleteAddress } = useAddressStore();
  const { totalOriginalPrice, totalFinalPrice } = useBasketStore();
  
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState<number | string | null>(null);
  const [selectedShippingMethodId, setSelectedShippingMethodId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsDataLoading(true);
      try {
        await fetchAddresses();
        const methods = await checkoutService.getShippingMethods();
        setShippingMethods(methods);
      } catch (error) {
        console.error("Failed to fetch shipping page data:", error);
      } finally {
        setIsDataLoading(false);
      }
    }
    fetchData();
  }, [fetchAddresses]);

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      setSelectedAddressId(addresses[0].id);
    }
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
      // ✅✅✅ اصلاح اصلی اینجاست: استفاده از `userLocationId` ✅✅✅
      const result = await checkoutService.finalizeCheckout({
        userLocationId: Number(selectedAddressId), // نام پراپرتی مطابق با API اصلاح شد
        shipmentMethodId: selectedShippingMethodId,
      });
      window.location.href = result.paymentUrl;
    } catch (e) {
      alert('خطا در نهایی کردن سفارش.');
      setIsSubmitting(false);
    }
  };

  const discount = totalOriginalPrice - totalFinalPrice;
  const shippingCost = 0;
  const finalTotal = totalFinalPrice + shippingCost;

  return (
    <Container className="py-8">
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
            {isDataLoading ? (
              <div className="space-y-3">
                <div className="h-20 bg-gray-100 rounded-lg animate-pulse" />
                <div className="h-20 bg-gray-100 rounded-lg animate-pulse" />
              </div>
            ) : (
              <div className="space-y-3">
                {shippingMethods.map(method => (
                  <div 
                    key={method.id} 
                    onClick={() => setSelectedShippingMethodId(method.id)} 
                    className={`p-4 border rounded-lg cursor-pointer transition-all flex items-center gap-4 ${selectedShippingMethodId === method.id ? 'border-brand-primary bg-brand-secondary ring-2 ring-brand-primary' : 'border-border-secondary hover:border-border-primary'}`}
                  >
                    <Image 
                      src={`https://api-yadakirun.yadakchi.com${method.imageUrl}`}
                      alt={method.title}
                      width={48}
                      height={48}
                      className="rounded-md"
                    />
                    <div className="flex-grow">
                      <div className="flex items-center justify-between">
                        <Label weight="bold">{method.title}</Label>
                        {selectedShippingMethodId === method.id && <CheckCircle className="text-brand-primary" />}
                      </div>
                      <Label size="sm" color="secondary" className="mt-1 block">{method.description}</Label>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 sticky top-24">
          <OrderSummary 
            subtotal={totalOriginalPrice}
            discount={discount}
            shippingCost={shippingCost}
            total={finalTotal}
            buttonText="پرداخت و نهایی کردن"
            onCheckout={handleSubmitOrder}
            isLoading={isSubmitting}
            disabled={!selectedAddressId || !selectedShippingMethodId || isDataLoading}
          />
        </div>
      </div>
    </Container>
  );
}