import { MenuData } from '../types/menu.types';
import { API_CONFIG } from '../config';

// تعریف تایپ برای پشتیبانی از تنظیمات Next.js
interface NextFetchRequestConfig extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

const BASE_URL = `${API_CONFIG.BASE_URL}/Front`;

// داده‌های پیش‌فرض
const defaultMenuData: MenuData = {
  carManufacturers: [],
  productCategories: [],
};

async function apiFetch<T>(url: string, options: NextFetchRequestConfig = {}): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Accept': 'application/json',
        // ❌ بدون Authorization
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Menu API Error [${response.status}]:`, errorBody);
      throw new Error(`API call failed: ${response.statusText}`);
    }

    return await response.json() as T;
  } catch (error) {
    console.error(`Network or Parsing Error in apiFetch for ${url}:`, error);
    throw error;
  }
}

export const menuService = {
  /**
   * دریافت اطلاعات منوی اصلی
   * آدرس نهایی: [API_URL]/api/Front/Menu
   */
  getMenuData: async (): Promise<MenuData> => {
    try {
      const url = `${BASE_URL}/Menu`;
      
      return await apiFetch<MenuData>(url, {
        next: { revalidate: 86400 }, // کش برای ۲۴ ساعت
      });
    } catch (error) {
      console.error("Error fetching menu data:", error);
      return defaultMenuData;
    }
  },
};