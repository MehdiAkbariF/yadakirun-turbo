import { ProductPageData } from '../types/product.types';
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
   * دریافت جزئیات محصول
   * این تابع هوشمند است: اگر ورودی عدد باشد، با ID جستجو می‌کند.
   * اگر متن باشد، با EnglishName جستجو می‌کند.
   */
  getProductDetails: async (slugOrId: string | number): Promise<ProductPageData | null> => {
    try {
      const inputStr = String(slugOrId);
      
      // ✅ تشخیص اینکه ورودی عدد است یا متن
      // اگر تمام کاراکترها عدد باشند، فرض می‌کنیم ID است
      const isId = /^\d+$/.test(inputStr);

      const queryParams = new URLSearchParams();

      if (isId) {
        // جستجو با ID
        queryParams.append("ProductId", inputStr);
      } else {
        // جستجو با English Name
        // دیکد کردن برای تبدیل %20 به فاصله و ...
        queryParams.append("EnglishName", decodeURIComponent(inputStr));
      }

      const url = `${BASE_URL}/ProductPage?${queryParams.toString()}`;
      
      return await apiFetch<ProductPageData>(url, {
        cache: "no-store",
      });
    } catch (error) {
      console.error("Error fetching product details:", error);
      return null;
    }
  },
};