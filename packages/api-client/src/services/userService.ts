import { UserProfile } from '../types/user.types';
import { API_CONFIG } from '../config';

// ❌ ایمپورت cookies از next/headers حذف شد

interface NextFetchRequestConfig extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

const BASE_URL = `${API_CONFIG.BASE_URL}/Front`;

async function apiFetch<T>(url: string, options: NextFetchRequestConfig = {}): Promise<T> {
  const headers: HeadersInit = {
    'Accept': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      if (response.status === 401) {
         console.warn("User Unauthorized (401) in userService");
         // به جای پرتاب خطا، نال برمی‌گردانیم تا کلاینت بتواند مدیریت کند
         return null as T; 
      }
      
      const errorBody = await response.text();
      console.error(`User API Error [${response.status}]:`, errorBody);
      throw new Error(`API call failed: ${response.statusText}`);
    }

    return await response.json() as T;
  } catch (error) {
    console.error(`Network Error in apiFetch for ${url}:`, error);
    throw error;
  }
}

export const userService = {
  /**
   * دریافت اطلاعات کاربر جاری
   * @param cookieHeader (اختیاری) - فقط برای استفاده در کامپوننت‌های سرور
   */
  getCurrentUser: async (cookieHeader?: string): Promise<UserProfile | null> => {
    try {
      const options: NextFetchRequestConfig = {
        cache: 'no-store',
        headers: {}
      };

      // ✅ اگر کوکی از سمت سرور پاس داده شده بود، آن را ست می‌کنیم
      if (cookieHeader && options.headers) {
        (options.headers as Record<string, string>)['Cookie'] = cookieHeader;
      }

      return await apiFetch<UserProfile>(`${BASE_URL}/FrontGetUser`, options);
    } catch (error) {
      return null;
    }
  },
};