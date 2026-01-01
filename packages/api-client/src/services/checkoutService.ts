import { ShippingMethod, FinalizeCheckoutPayload } from '../types/checkout.types';
import { API_CONFIG } from '../config';

// تعریف تایپ برای پشتیبانی از تنظیمات Next.js
interface NextFetchRequestConfig extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

// تنظیم آدرس پایه
const BASE_URL = `${API_CONFIG.BASE_URL}/Front`;

/**
 * تابع کمکی برای فراخوانی API
 */
async function apiFetch<T>(url: string, options: NextFetchRequestConfig = {}): Promise<T> {
  // ❌ حذف دریافت توکن دستی

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...options.headers,
    // ❌ حذف هدر Authorization (کوکی‌ها خودکار ارسال می‌شوند)
  };

  try {
    const response = await fetch(url, { ...options, headers });
    
    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Checkout API Error [${response.status}]:`, errorBody);
      throw new Error(`API call failed: ${response.statusText}`);
    }

    const text = await response.text();
    return text ? (JSON.parse(text) as T) : ({ success: true } as T);
  } catch (error) {
    console.error(`Network or Parsing Error in apiFetch for ${url}:`, error);
    throw error;
  }
}

export const checkoutService = {
  /**
   * دریافت روش‌های ارسال موجود
   * آدرس نهایی: [API_URL]/api/Front/ShipmentMethods
   */
  getShippingMethods: (): Promise<ShippingMethod[]> => {
    return apiFetch<ShippingMethod[]>(`${BASE_URL}/ShipmentMethods`, {
      method: 'GET',
      next: {
        revalidate: 3600, 
      }
    });
  },

  /**
   * نهایی کردن سفارش و دریافت لینک درگاه پرداخت
   * آدرس نهایی: [API_URL]/api/Front/BasketPayment
   */
  finalizeCheckout: (payload: FinalizeCheckoutPayload): Promise<{ paymentUrl: string }> => {
    return apiFetch<{ paymentUrl: string }>(`${BASE_URL}/BasketPayment`, {
      method: 'POST',
      body: JSON.stringify(payload),
      cache: 'no-store',
    });
  },

  /**
   * آماده‌سازی سبد خرید برای مرحله تسویه حساب
   * آدرس نهایی: [API_URL]/api/Front/CheckoutBasket
   */
  prepareBasketForCheckout: (): Promise<any> => {
    return apiFetch(`${BASE_URL}/CheckoutBasket`, { 
      method: 'POST',
      cache: 'no-store',
    });
  },

  /**
   * تایید نهایی تراکنش (کال‌بک بانک)
   * آدرس نهایی: [API_URL]/api/Front/SamanCallback
   */
  verifySamanPayment: (data: { refNum: string; status: number; token: string }): Promise<any> => {
    return apiFetch(`${BASE_URL}/SamanCallback`, {
      method: 'POST',
      body: JSON.stringify(data),
      cache: 'no-store',
    });
  },
};