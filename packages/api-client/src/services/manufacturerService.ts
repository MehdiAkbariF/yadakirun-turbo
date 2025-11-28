import { ManufacturerPageData } from '../types/manufacturer.types';
import { Product, PaginatedResponse } from '../types/car';
const BASE_URL = "https://api-yadakirun.yadakchi.com/api";

export const manufacturerService = {
  getManufacturerDetails: async (manufacturerId: string | number): Promise<ManufacturerPageData | null> => {
    try {
      const response = await fetch(`${BASE_URL}/Front/CarManufacturerPage?CarManufacturerId=${manufacturerId}`, {
        // این داده‌ها به ندرت تغییر می‌کنند، پس برای یک روز کش می‌شوند
        next: { revalidate: 86400 }, // 24 hours
      } as any);

      if (!response.ok) {
        console.error("Failed to fetch manufacturer details:", response.statusText);
        return null;
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching manufacturer details:", error);
      return null;
    }
  },

  getManufacturerProducts: async (
    manufacturerId: string | number, 
    page = 1, 
    pageSize = 30
  ): Promise<PaginatedResponse<Product>> => {
    try {
      const response = await fetch(
        `${BASE_URL}/Front/Products?CarManufacturerId=${manufacturerId}&PageNumber=${page}&PageSize=${pageSize}`,
        { cache: "no-store" }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch manufacturer products");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching manufacturer products:", error);
      // در صورت خطا، یک پاسخ خالی استاندارد برمی‌گردانیم
      return { currentPage: 1, totalPages: 0, pageSize, totalCount: 0, items: [], searchParams: null };
    }
  }
};