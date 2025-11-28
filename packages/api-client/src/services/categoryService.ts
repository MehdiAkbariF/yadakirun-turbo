import { ProductCategoryPageData } from '../types/category.types';
// تایپ‌های مربوط به محصول و صفحه‌بندی را از فایل car ایمپورت می‌کنیم
import { Product, PaginatedResponse } from '../types/car';

const BASE_URL = "https://api-yadakirun.yadakchi.com/api";

export const categoryService = {
  getCategoryDetails: async (categoryId: string | number): Promise<ProductCategoryPageData | null> => {
    try {
      const response = await fetch(`${BASE_URL}/Front/ProductCategoryPage?ProductCategoryId=${categoryId}`, {
        next: { revalidate: 86400 }, // کش برای 24 ساعت
      } as any);

      if (!response.ok) {
        console.error("Failed to fetch category details:", response.statusText);
        return null;
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching category details:", error);
      return null;
    }
  },

  // ✨ تابع برای دریافت محصولات یک دسته‌بندی
  getCategoryProducts: async (
    categoryId: string | number, 
    page = 1, 
    pageSize = 30
  ): Promise<PaginatedResponse<Product>> => {
    try {
      const response = await fetch(
        `${BASE_URL}/Front/Products?ProductCategoryId=${categoryId}&PageNumber=${page}&PageSize=${pageSize}`,
        { cache: "no-store" }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch category products");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching category products:", error);
      return { currentPage: 1, totalPages: 0, pageSize, totalCount: 0, items: [], searchParams: null };
    }
  }
};