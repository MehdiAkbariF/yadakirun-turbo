// packages/api-client/src/services/basketService.ts

import { BasketResponse, UpdateBasketPayload } from '../types/basket.types';
import { getAuthToken } from '../utils/authToken';

const BASE_URL = "/api"; 

async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();

  // ✅✅✅ راه حل مشکل تایپ‌اسکریپت اینجاست ✅✅✅
  // ما کل شیء هدر را در یک مرحله و به صورت شرطی می‌سازیم.
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...options.headers,
    // این تکنیک به صورت شرطی پراپرتی Authorization را اضافه می‌کند:
    // اگر توکن وجود داشته باشد، آبجکت { Authorization: ... } به هدرها اضافه می‌شود.
    // اگر توکن null باشد، هیچ چیزی اضافه نمی‌شود.
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };

  try {
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      const errorBody = await response.text();
      console.error("API Error Response:", errorBody);
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
  getBasket: (): Promise<BasketResponse> => {
    return apiFetch<BasketResponse>(`${BASE_URL}/Front/Basket`, {
      method: 'GET',
      cache: 'no-store', 
    });
  },

  addToBasket: (payload: UpdateBasketPayload): Promise<any> => {
    return apiFetch(`${BASE_URL}/Front/Basket`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  removeFromBasket: (payload: UpdateBasketPayload): Promise<any> => {
    return apiFetch(`${BASE_URL}/Front/Basket`, {
      method: 'DELETE',
      body: JSON.stringify(payload),
    });
  },
};