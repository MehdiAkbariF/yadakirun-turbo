import { BasketResponse, UpdateBasketPayload } from '../types/basket.types';
import { API_CONFIG } from '../config'; 


interface NextFetchRequestConfig extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

const BASE_URL = API_CONFIG.BASE_URL; 

async function apiFetch<T>(url: string, options: NextFetchRequestConfig = {}): Promise<T> {
  
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...options.headers,
    
  };

  try {
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      const errorBody = await response.text();
      console.error("API Basket Error Response:", errorBody);
      throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }
    const text = await response.text();
    
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
      cache: 'no-store', 
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