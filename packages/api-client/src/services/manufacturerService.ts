import { ManufacturerPageData } from '../types/manufacturer.types';
import { Product, PaginatedResponse } from '../types/car';
import { API_CONFIG } from '../config';

// ✅ تعریف تایپ برای پشتیبانی از تنظیمات Next.js بدون نیاز به any
interface NextFetchRequestConfig extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

// تنظیم آدرس پایه برای بخش Front (تولیدکنندگان)
const BASE_URL = `${API_CONFIG.BASE_URL}/Front`;

/**
 * تابع کمکی برای فراخوانی APIهای مربوط به تولیدکنندگان
 */
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
      // لاگ کردن جزئیات خطا برای دیباگ در محیط توسعه
      const errorBody = await response.text();
      console.error(`Manufacturer API Error [${response.status}]:`, errorBody);
      throw new Error(`API call failed: ${response.statusText}`);
    }

    return await response.json() as T;
  } catch (error) {
    console.error(`Network or Parsing Error in apiFetch for ${url}:`, error);
    throw error;
  }
}

export const manufacturerService = {
  /**
   * دریافت جزئیات یک برند/تولیدکننده (نام، لوگو، لیست خودروها و متادیتا)
   * آدرس نهایی: [API_URL]/api/Front/CarManufacturerPage
   */
  getManufacturerDetails: async (manufacturerId: string | number): Promise<ManufacturerPageData | null> => {
    try {
      const url = `${BASE_URL}/CarManufacturerPage?CarManufacturerId=${manufacturerId}`;
      
      return await apiFetch<ManufacturerPageData>(url, {
        next: { revalidate: 86400 }, // کش برای ۲۴ ساعت
      });
    } catch (error) {
      console.error("Error fetching manufacturer details:", error);
      // در صورت خطا null برمی‌گردانیم تا صفحه 404 یا پیام خطا نمایش داده شود
      return null;
    }
  },

  /**
   * دریافت لیست محصولات یک برند خاص به صورت صفحه‌بندی شده
   * آدرس نهایی: [API_URL]/api/Front/Products
   */
  getManufacturerProducts: async (
    manufacturerId: string | number, 
    page = 1, 
    pageSize = 30
  ): Promise<PaginatedResponse<Product>> => {
    try {
      const url = `${BASE_URL}/Products?CarManufacturerId=${manufacturerId}&PageNumber=${page}&PageSize=${pageSize}`;
      
      return await apiFetch<PaginatedResponse<Product>>(url, { 
        cache: "no-store" // محصولات برند نباید کش شوند تا قیمت‌ها دقیق بماند
      });
    } catch (error) {
      console.error("Error fetching manufacturer products:", error);
      // در صورت خطا، یک پاسخ خالی استاندارد برمی‌گردانیم تا گرید محصولات کرش نکند
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