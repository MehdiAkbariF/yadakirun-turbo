import { ManufacturerPageData } from '../types/manufacturer.types';
import { Product, PaginatedResponse } from '../types/car';
import { API_CONFIG } from '../config';

interface NextFetchRequestConfig extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

const BASE_URL = `${API_CONFIG.BASE_URL}/Front`;

// ✅ تابع کمکی برای استخراج ID از Slug (مثال: "5-bmw" -> "5")
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
   * دریافت جزئیات یک برند
   * آدرس نهایی: [API_URL]/api/Front/CarManufacturerPage
   */
  getManufacturerDetails: async (slugOrId: string | number): Promise<ManufacturerPageData | null> => {
    try {
      const id = extractIdFromSlug(slugOrId);
      const url = `${BASE_URL}/CarManufacturerPage?CarManufacturerId=${id}`;
      
      return await apiFetch<ManufacturerPageData>(url, {
        next: { revalidate: 86400 }, // کش برای ۲۴ ساعت
      });
    } catch (error) {
      console.error("Error fetching manufacturer details:", error);
      return null;
    }
  },

  /**
   * دریافت محصولات یک برند
   * آدرس نهایی: [API_URL]/api/Front/Products
   */
  getManufacturerProducts: async (
    slugOrId: string | number, 
    page = 1, 
    pageSize = 30
  ): Promise<PaginatedResponse<Product>> => {
    try {
      const id = extractIdFromSlug(slugOrId);
      const url = `${BASE_URL}/Products?CarManufacturerId=${id}&PageNumber=${page}&PageSize=${pageSize}`;
      
      return await apiFetch<PaginatedResponse<Product>>(url, { 
        cache: "no-store" 
      });
    } catch (error) {
      console.error("Error fetching manufacturer products:", error);
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