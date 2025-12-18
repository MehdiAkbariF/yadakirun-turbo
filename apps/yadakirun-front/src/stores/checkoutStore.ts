import { create } from 'zustand';
import { checkoutService } from '@monorepo/api-client/src/services/checkoutService';
import type { ShippingMethod } from '@monorepo/api-client/src/types/checkout.types';

interface CheckoutState {
  shippingMethods: ShippingMethod[];
  selectedAddressId: number | string | null;
  selectedShippingMethodId: number | null;
  isLoading: boolean;
  fetchShippingMethods: () => Promise<void>;
  selectAddress: (id: number | string) => void;
  selectShippingMethod: (id: number) => void;
  submitOrder: () => Promise<void>;
}

export const useCheckoutStore = create<CheckoutState>((set, get) => ({
  shippingMethods: [],
  selectedAddressId: null,
  selectedShippingMethodId: null,
  isLoading: false,

  fetchShippingMethods: async () => {
    set({ isLoading: true });
    try {
      const methods = await checkoutService.getShippingMethods();
      set({ shippingMethods: methods, isLoading: false });
    } catch (e) {
      set({ isLoading: false });
    }
  },

  selectAddress: (id) => set({ selectedAddressId: id }),
  selectShippingMethod: (id) => set({ selectedShippingMethodId: id }),

  submitOrder: async () => {
    const { selectedAddressId, selectedShippingMethodId } = get();
    if (!selectedAddressId || !selectedShippingMethodId) {
      alert('لطفا آدرس و روش ارسال را انتخاب کنید.');
      return;
    }
    set({ isLoading: true });
    try {
      const result = await checkoutService.finalizeCheckout({
        userLocationId: Number(selectedAddressId),
        shipmentMethodId: selectedShippingMethodId,
      });
      // هدایت کاربر به درگاه پرداخت
      window.location.href = result.paymentUrl;
    } catch (e) {
      alert('خطا در نهایی کردن سفارش.');
      set({ isLoading: false });
    }
  },
}));