
// مسیر: packages/api-client/src/types/checkout.types.ts

/**
 * ✅ اینترفیس اصلاح شده برای روش‌های ارسال، مطابق با پاسخ واقعی API.
 */
export interface ShippingMethod {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

/**
 * اینترفیس برای داده‌هایی که برای نهایی کردن سفارش به سرور ارسال می‌شوند.
 * ✅✅✅ اصلاح اصلی اینجاست: `addressId` به `userLocationId` تغییر کرد.
 */
export interface FinalizeCheckoutPayload {
  userLocationId: number; // نام پراپرتی مطابق با API اصلاح شد
  shipmentMethodId: number;
  discountCode?: string;
  description?: string;
}