import { MenuData } from '../types/menu.types';
import { API_CONFIG } from '../config';

// ✅ تعریف تایپ برای پشتیبانی از تنظیمات Next.js بدون نیاز به any
interface NextFetchRequestConfig extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

// تنظیم آدرس پایه برای بخش Front (منوی اصلی)
const BASE_URL = `${API_CONFIG.BASE_URL}/Front`;

// داده‌های پیش‌فرض برای جلوگیری از شکستن هدر سایت در صورت خطای API
const defaultMenuData: MenuData = {
  carManufacturers: [],
  productCategories: [],
};

/**
 * تابع کمکی برای فراخوانی APIهای مربوط به منو
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
      // لاگ کردن بدنه خطا برای دیباگ در محیط توسعه
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
   * دریافت اطلاعات منوی اصلی (لیست برندها و دسته‌بندی‌های محصولات)
   * آدرس نهایی: [API_URL]/api/Front/Menu
   */
  getMenuData: async (): Promise<MenuData> => {
    try {
      const url = `${BASE_URL}/Menu`;
      
      return await apiFetch<MenuData>(url, {
        next: { revalidate: 86400 }, // کش برای ۲۴ ساعت (داده‌های منو به ندرت تغییر می‌کنند)
      });
    } catch (error) {
      console.error("Error fetching menu data:", error);
      // در صورت بروز هرگونه خطا، ساختار منوی خالی برمی‌گردانیم تا سایت کرش نکند
      return defaultMenuData;
    }
  },
};