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
   * دریافت جزئیات یک برند (تولیدکننده)
   * اگر ورودی عدد باشد -> CarManufacturerId
   * اگر ورودی متن باشد -> EnglishName
   */
  getManufacturerDetails: async (slugOrId: string | number): Promise<ManufacturerPageData | null> => {
    try {
      const inputStr = String(slugOrId);
      // تشخیص اینکه آیا ورودی فقط شامل اعداد است (ID) یا خیر (Slug)
      const isId = /^\d+$/.test(inputStr);
      
      const queryParams = new URLSearchParams();

      if (isId) {
        queryParams.append("CarManufacturerId", inputStr);
      } else {
        // دیکد کردن نام برای اطمینان (تبدیل %20 به فاصله و ...)
        queryParams.append("EnglishName", decodeURIComponent(inputStr));
      }

      const url = `${BASE_URL}/CarManufacturerPage?${queryParams.toString()}`;
      
      return await apiFetch<ManufacturerPageData>(url, {
        next: { revalidate: 86400 }, 
      });
    } catch (error) {
      console.error("Error fetching manufacturer details:", error);
      return null;
    }
  },

  /**
   * دریافت محصولات یک برند
   * نکته: برای اطمینان، همیشه ID واقعی برند باید به این تابع پاس داده شود
   */
  getManufacturerProducts: async (
    manufacturerId: string | number, 
    page = 1, 
    pageSize = 30
  ): Promise<PaginatedResponse<Product>> => {
    try {
      // در اینجا فرض می‌کنیم همیشه ID ارسال می‌شود (چون در Page کنترل می‌کنیم)
      const url = `${BASE_URL}/Products?CarManufacturerId=${manufacturerId}&PageNumber=${page}&PageSize=${pageSize}`;
      
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