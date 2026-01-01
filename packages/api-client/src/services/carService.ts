import { CarPageData, Product, PaginatedResponse } from '../types/car';
import { API_CONFIG } from '../config';

interface NextFetchRequestConfig extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

const BASE_URL = `${API_CONFIG.BASE_URL}/Front`;

async function apiFetch<T>(url: string, options: NextFetchRequestConfig = {}): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Accept': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Car API Error [${response.status}]:`, errorBody);
      throw new Error(`API call failed: ${response.statusText}`);
    }

    return await response.json() as T;
  } catch (error) {
    console.error(`Network or Parsing Error in apiFetch for ${url}:`, error);
    throw error;
  }
}

export const carService = {
  /**
   * دریافت جزئیات یک خودرو
   * اگر ورودی عدد باشد -> CarId
   * اگر ورودی متن باشد -> EnglishName (یا EnglishTitle)
   */
  getCarDetails: async (slugOrId: string | number): Promise<CarPageData | null> => {
    try {
      const inputStr = String(slugOrId);
      // تشخیص عدد بودن ورودی
      const isId = /^\d+$/.test(inputStr);
      
      const queryParams = new URLSearchParams();

      if (isId) {
        queryParams.append("CarId", inputStr);
      } else {
        // دیکد کردن برای تبدیل کاراکترهای URL
        queryParams.append("EnglishName", decodeURIComponent(inputStr));
      }

      const url = `${BASE_URL}/CarPage?${queryParams.toString()}`;
      
      return await apiFetch<CarPageData>(url, { 
        next: { revalidate: 3600 } 
      });
    } catch (error) {
      return null;
    }
  },

  /**
   * دریافت محصولات یک خودرو
   * نکته: این متد انتظار دارد ID واقعی خودرو ارسال شود
   */
  getCarProducts: async (
    carId: string | number, 
    page = 1, 
    pageSize = 30
  ): Promise<PaginatedResponse<Product>> => {
    try {
      // اینجا فرض می‌کنیم همیشه ID ارسال می‌شود (چون در Page کنترل می‌کنیم)
      const url = `${BASE_URL}/Products?CarId=${carId}&PageNumber=${page}&PageSize=${pageSize}`;
      
      return await apiFetch<PaginatedResponse<Product>>(url, { 
        cache: "no-store" 
      });
    } catch (error) {
      return { 
        currentPage: 1, 
        totalPages: 0, 
        pageSize, 
        totalCount: 0, 
        items: [], 
        searchParams: null 
      };
    }
  }
};