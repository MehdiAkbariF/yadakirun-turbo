import { CarPageData, Product, PaginatedResponse } from '../types/car';

const BASE_URL = "https://api-yadakirun.yadakchi.com/api";

// یک تابع کمکی برای مدیریت بهتر fetch
async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }
    return await response.json() as T;
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);
    throw error;
  }
}

export const carService = {
  getCarDetails: async (carId: string | number): Promise<CarPageData | null> => {
    try {
      const url = `${BASE_URL}/Front/CarPage?CarId=${carId}`;
  
      
      const res = await fetch(url, { next: { revalidate: 3600 } } as any);
      
      if (!res.ok) {
       
        return null;
      }
      
      const data = await res.json();
    
      return data;
    } catch (error) {
    
      return null;
    }
  },
  getCarProducts: async (
    carId: string | number, 
    page = 1, 
    pageSize = 30
  ): Promise<PaginatedResponse<Product>> => {
    try {
      return await apiFetch<PaginatedResponse<Product>>(
        `${BASE_URL}/Front/Products?CarId=${carId}&PageNumber=${page}&PageSize=${pageSize}`,
        // محصولات نباید برای مدت طولانی کش شوند
        { cache: "no-store" }
      );
    } catch {
      // در صورت خطا، یک پاسخ خالی استاندارد برمی‌گردانیم
      return { currentPage: 1, totalPages: 0, pageSize, totalCount: 0, items: [], searchParams: null };
    }
  }
};