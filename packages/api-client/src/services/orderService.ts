import { API_CONFIG } from '../config';
import { OrdersResponse } from '../types/order.types';

// ✅ تعریف تایپ برای پشتیبانی از تنظیمات Next.js
interface NextFetchRequestConfig extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

const BASE_URL = `${API_CONFIG.BASE_URL}/UserPanel`;

async function apiFetch<T>(url: string, options: NextFetchRequestConfig = {}): Promise<T> {
  // ❌ حذف دریافت توکن دستی

  const headers: HeadersInit = {
    'Accept': 'application/json',
    'Content-Type': 'application/json', // معمولاً بودن این هدر بهتر است
    ...options.headers,
    // ❌ حذف هدر Authorization (کوکی‌ها خودکار ارسال می‌شوند)
  };

  try {
    const response = await fetch(url, { ...options, headers });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Order API Error [${response.status}]:`, errorText);
      throw new Error(`API call failed: ${response.statusText}`);
    }
    
    const text = await response.text();
    return text ? (JSON.parse(text) as T) : ({} as T);
  } catch (error) {
    console.error(`Error in apiFetch for ${url}:`, error);
    throw error;
  }
}

export const orderService = {
  /**
   * دریافت لیست سفارشات کاربر
   * آدرس نهایی: [API_URL]/api/UserPanel/Orders
   */
  getOrders: async (
    pageNumber: number = 1,
    pageSize: number = 30,
    status?: string
  ): Promise<OrdersResponse> => {
    try {
      // ساخت کوئری استرینگ
      const queryParams = new URLSearchParams({
        PageNumber: pageNumber.toString(),
        PageSize: pageSize.toString(),
      });

      if (status && status !== 'all') {
        queryParams.append('Status', status);
      }

      const url = `${BASE_URL}/Orders?${queryParams.toString()}`;

      return await apiFetch<OrdersResponse>(url, {
        cache: 'no-store', // سفارشات باید همیشه به‌روز باشند
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
      // بازگشت آبجکت خالی استاندارد در صورت خطا
      return {
        currentPage: pageNumber,
        totalPages: 0,
        pageSize,
        totalCount: 0,
        items: [],
        searchParams: null,
      };
    }
  },
};