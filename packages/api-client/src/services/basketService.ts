import { BasketResponse, UpdateBasketPayload } from '../types/basket.types';
import { getAuthToken } from '../utils/authToken';
import { API_CONFIG } from '../config'; // استفاده از کانفیگ مرکزی

// ✅ تعریف تایپ برای پشتیبانی از تنظیمات Next.js بدون ارور TypeScript
interface NextFetchRequestConfig extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

// استفاده از آدرس پایه داینامیک (سرور: Absolute / کلاینت: Relative)
const BASE_URL = API_CONFIG.BASE_URL; 

async function apiFetch<T>(url: string, options: NextFetchRequestConfig = {}): Promise<T> {
  const token = getAuthToken();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...options.headers,
    // ✅ استفاده از تکنیک Spread برای امنیت تایپ و ارسال داینامیک توکن
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };

  try {
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      const errorBody = await response.text();
      console.error("API Basket Error Response:", errorBody);
      throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }
    const text = await response.text();
    // اگر پاسخ موفقیت‌آمیز بود ولی بدنه نداشت (مثلاً در حذف)، یک آبجکت موفقیت برمی‌گردانیم
    return text ? JSON.parse(text) as T : { success: true } as T;
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);
    throw error;
  }
}

export const basketService = {
  /**
   * دریافت اطلاعات کامل سبد خرید کاربر
   * آدرس نهایی: [BASE_URL]/Front/Basket
   */
  getBasket: (): Promise<BasketResponse> => {
    return apiFetch<BasketResponse>(`${BASE_URL}/Front/Basket`, {
      method: 'GET',
      cache: 'no-store', // سبد خرید نباید کش شود
    });
  },

  /**
   * افزودن یک محصول به سبد خرید
   * آدرس نهایی: [BASE_URL]/Front/Basket
   */
  addToBasket: (payload: UpdateBasketPayload): Promise<any> => {
    return apiFetch(`${BASE_URL}/Front/Basket`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  /**
   * حذف یا کاهش تعداد یک محصول از سبد خرید
   * آدرس نهایی: [BASE_URL]/Front/Basket
   */
  removeFromBasket: (payload: UpdateBasketPayload): Promise<any> => {
    return apiFetch(`${BASE_URL}/Front/Basket`, {
      method: 'DELETE',
      body: JSON.stringify(payload),
    });
  },
};