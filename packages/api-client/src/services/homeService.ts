import { HomePageData } from '../types/home.types';

const BASE_URL = "https://api-yadakirun.yadakchi.com/api";

export const homeService = {
  getHomePageData: async (): Promise<HomePageData | null> => {
    try {
      // ✅✅✅ اصلاح اصلی اینجاست ✅✅✅
      // ما آبجکت تنظیمات fetch را به صورت "as any" پاس می‌دهیم
      // تا TypeScript از پراپرتی next که مختص Next.js است، ایراد نگیرد.
      const response = await fetch(`${BASE_URL}/Front/HomePage`, {
        next: { revalidate: 3600 },
      } as any);

      if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
      }
      
      return await response.json() as HomePageData;
    } catch (error) {
      console.error('Error fetching home page data:', error);
      return null;
    }
  },
};