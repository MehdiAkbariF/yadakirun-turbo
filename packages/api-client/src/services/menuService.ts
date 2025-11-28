import { MenuData } from '../types/menu.types';

const BASE_URL = "https://api-yadakirun.yadakchi.com/api";

// یک ساختار پیش‌فرض خالی برای زمانی که API خطا می‌دهد
const defaultMenuData: MenuData = {
  carManufacturers: [],
  productCategories: [],
};

export const menuService = {
  getMenuData: async (): Promise<MenuData> => {
    try {
      const response = await fetch(`${BASE_URL}/Front/Menu`, {
        // داده‌های منو به ندرت تغییر می‌کنند، پس می‌توانیم آن را برای یک روز کامل کش کنیم
        next: { revalidate: 86400 }, // 24 hours in seconds
      } as any); // `as any` برای حل خطای تایپ next.js

      if (!response.ok) {
        console.error("Failed to fetch menu data:", response.statusText);
        return defaultMenuData;
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching menu data:", error);
      return defaultMenuData; // در صورت بروز خطا، منوی خالی برمی‌گردانیم تا سایت خراب نشود
    }
  },
};