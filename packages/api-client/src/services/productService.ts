import { ProductPageData } from '../types/product.types';
import { API_CONFIG } from '../config';

interface NextFetchRequestConfig extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

const BASE_URL = `${API_CONFIG.BASE_URL}/Front`;

// ✅ تابع کمکی برای استخراج ID از Slug
const extractIdFromSlug = (slugOrId: string | number): string => {
  if (!slugOrId) return '';
  const parts = String(slugOrId).split('-');
  return parts[0];
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
   * آدرس نهایی: [API_URL]/api/Front/ProductPage
   */
  getProductDetails: async (slugOrId: string | number): Promise<ProductPageData | null> => {
    try {
      const id = extractIdFromSlug(slugOrId);
      const url = `${BASE_URL}/ProductPage?ProductId=${id}`;
      
      return await apiFetch<ProductPageData>(url, {
        cache: "no-store",
      });
    } catch (error) {
      console.error("Error fetching product details:", error);
      return null;
    }
  },
};