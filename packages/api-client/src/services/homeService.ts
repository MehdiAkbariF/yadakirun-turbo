import { HomePageData } from '../types/home.types';
import { API_CONFIG } from '../config';

// تعریف تایپ برای پشتیبانی از تنظیمات Next.js
interface NextFetchRequestConfig extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

const BASE_URL = `${API_CONFIG.BASE_URL}/Front`;

export const homeService = {
  getHomePageData: async (): Promise<HomePageData | null> => {
    try {
      const response = await fetch(`${BASE_URL}/HomePage`, {
        next: { revalidate: 3600 }, // کش برای یک ساعت
        headers: {
          'Accept': 'application/json',
          // ❌ بدون Authorization
        }
      } as NextFetchRequestConfig);

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