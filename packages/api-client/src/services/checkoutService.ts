import { getAuthToken } from '../utils/authToken';
import { ShippingMethod, FinalizeCheckoutPayload } from '../types/checkout.types';

const BASE_URL = "/api/Front"; // بیس API برای این بخش

// (تابع apiFetch را از یک سرویس دیگر کپی کنید)
async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
    
}

export const checkoutService = {
  // این یک API فرضی است، باید با بک‌اند هماهنگ شود
  getShippingMethods: (): Promise<ShippingMethod[]> => {
    // return apiFetch<ShippingMethod[]>(`${BASE_URL}/ShippingMethods`);
    // شبیه‌سازی تا زمان آماده شدن API
    return Promise.resolve([
      { id: 1, name: 'پست پیشتاز', deliveryTime: '۳ تا ۵ روز کاری', price: 45000 },
      { id: 2, name: 'تیپاکس (پس‌کرایه)', deliveryTime: '۲ تا ۳ روز کاری', price: 0 },
      { id: 3, name: 'پیک موتوری (فقط تهران)', deliveryTime: 'کمتر از ۳ ساعت', price: 80000 },
    ]);
  },

  // این تابع API واقعی شما برای پرداخت است
  finalizeCheckout: (payload: FinalizeCheckoutPayload): Promise<{ paymentUrl: string }> => {
    return apiFetch(`/api/Front/BasketPayment`, { // آدرس کامل پروکسی
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
  prepareBasketForCheckout: (): Promise<any> => {
    return apiFetch(`/api/Front/CheckoutBasket`, { method: 'POST' });
  },
  verifySamanPayment: (data: { refNum: string; status: number; token: string }): Promise<any> => {
    return apiFetch(`/api/Front/SamanCallback`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};