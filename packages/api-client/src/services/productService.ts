import { ProductPageData } from '../types/product.types';
import { API_CONFIG } from '../config';

// ✅ تعریف تایپ برای پشتیبانی از تنظیمات Next.js بدون نیاز به any
interface NextFetchRequestConfig extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

// تنظیم آدرس پایه برای بخش محصولات در قسمت Front
const BASE_URL = `${API_CONFIG.BASE_URL}/Front`;

/**
 * تابع کمکی برای فراخوانی APIهای مربوط به محصولات
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
      console.error(`Product API Error [${response.status}]:`, errorBody);
      throw new Error(`API call failed: ${response.statusText}`);
    }

    return await response.json() as T;
  } catch (error) {
    console.error(`Network or Parsing Error in apiFetch for ${url}:`, error);
    throw error;
  }
}

export const productService = {
  /**
   * دریافت جزئیات کامل یک محصول (مشخصات فنی، قیمت، گالری تصاویر، نظرات و متادیتا)
   * آدرس نهایی: [API_URL]/api/Front/ProductPage
   */
  getProductDetails: async (productId: string | number): Promise<ProductPageData | null> => {
    try {
      const url = `${BASE_URL}/ProductPage?ProductId=${productId}`;
      
      // برای صفحه محصول، از cache: "no-store" استفاده می‌کنیم تا قیمت و موجودی همیشه لحظه‌ای باشد
      return await apiFetch<ProductPageData>(url, {
        cache: "no-store",
      });
    } catch (error) {
      console.error("Error fetching product details:", error);
      // در صورت بروز خطا null برمی‌گردانیم تا لایه نمایش بتواند وضعیت 404 یا پیام خطا را مدیریت کند
      return null;
    }
  },
};