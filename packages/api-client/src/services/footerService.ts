import { FooterData } from '../types/footer.types';

const BASE_URL = "https://api-yadakirun.yadakchi.com/api";

// یک ساختار پیش‌فرض خالی برای زمانی که API خطا می‌دهد
const defaultFooterData: FooterData = {
  saleServices: [],
  footerLinks: [],
};

export const footerService = {
  getFooterData: async (): Promise<FooterData> => {
    try {
      const response = await fetch(`${BASE_URL}/Front/Footer`, {
        // داده‌های فوتر هم به ندرت تغییر می‌کنند، پس می‌توانیم آن را برای یک روز کامل کش کنیم
        next: { revalidate: 86400 }, // 24 hours
      } as any);

      if (!response.ok) {
        console.error("Failed to fetch footer data:", response.statusText);
        return defaultFooterData;
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching footer data:", error);
      return defaultFooterData;
    }
  },
};