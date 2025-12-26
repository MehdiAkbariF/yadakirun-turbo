import { CarPageData, Product, PaginatedResponse } from '../types/car';
import { API_CONFIG } from '../config';

// ✅ تعریف تایپ برای پشتیبانی از تنظیمات Next.js بدون نیاز به any
interface NextFetchRequestConfig extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

// تنظیم آدرس پایه برای بخش خودروها در قسمت Front
const BASE_URL = `${API_CONFIG.BASE_URL}/Front`;

/**
 * تابع کمکی برای فراخوانی APIهای مربوط به خودرو
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
      // لاگ کردن جزئیات خطا برای دیباگ سریع‌تر در محیط توسعه
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
   * دریافت جزئیات یک خودروی خاص (اطلاعات مدل، بنرها، متادیتا)
   * آدرس نهایی: [API_URL]/api/Front/CarPage
   */
  getCarDetails: async (carId: string | number): Promise<CarPageData | null> => {
    try {
      const url = `${BASE_URL}/CarPage?CarId=${carId}`;
      
      return await apiFetch<CarPageData>(url, { 
        next: { revalidate: 3600 } // کش برای یک ساعت
      });
    } catch (error) {
      // در صورت بروز خطا در دریافت جزئیات، null برمی‌گردانیم تا صفحه 404 یا پیام مناسب نمایش داده شود
      return null;
    }
  },

  /**
   * دریافت لیست محصولات مرتبط با یک خودرو به صورت صفحه‌بندی شده
   * آدرس نهایی: [API_URL]/api/Front/Products
   */
  getCarProducts: async (
    carId: string | number, 
    page = 1, 
    pageSize = 30
  ): Promise<PaginatedResponse<Product>> => {
    try {
      const url = `${BASE_URL}/Products?CarId=${carId}&PageNumber=${page}&PageSize=${pageSize}`;
      
      return await apiFetch<PaginatedResponse<Product>>(url, { 
        cache: "no-store" // محصولات معمولاً سریع تغییر می‌کنند، پس کش نمی‌کنیم
      });
    } catch (error) {
      // در صورت خطا، یک پاسخ خالی استاندارد برمی‌گردانیم تا برنامه کرش نکند
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