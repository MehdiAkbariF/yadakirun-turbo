import { CarPageData, Product, PaginatedResponse } from '../types/car';
import { API_CONFIG } from '../config';

interface NextFetchRequestConfig extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

const BASE_URL = `${API_CONFIG.BASE_URL}/Front`;

// ✅ تابع کمکی برای استخراج ID از Slug (برای پشتیبانی از URLهای سئو فرندلی)
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
   * آدرس نهایی: [API_URL]/api/Front/CarPage
   */
  getCarDetails: async (slugOrId: string | number): Promise<CarPageData | null> => {
    try {
      const id = extractIdFromSlug(slugOrId);
      const url = `${BASE_URL}/CarPage?CarId=${id}`;
      
      return await apiFetch<CarPageData>(url, { 
        next: { revalidate: 3600 } 
      });
    } catch (error) {
      return null;
    }
  },

  /**
   * دریافت محصولات یک خودرو
   * آدرس نهایی: [API_URL]/api/Front/Products
   */
  getCarProducts: async (
    slugOrId: string | number, 
    page = 1, 
    pageSize = 30
  ): Promise<PaginatedResponse<Product>> => {
    try {
      const id = extractIdFromSlug(slugOrId);
      const url = `${BASE_URL}/Products?CarId=${id}&PageNumber=${page}&PageSize=${pageSize}`;
      
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