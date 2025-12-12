import { AboutUsPageData } from '../types/about.types';

const BASE_URL = "https://api-yadakirun.yadakchi.com/api";

export const aboutUsService = {
  getAboutUsPageData: async (): Promise<AboutUsPageData | null> => {
    try {
      const response = await fetch(`${BASE_URL}/Front/AboutUsPage`, {
        next: { revalidate: 86400 }, // کش برای ۲۴ ساعت
      } as any);

      if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
      }
      
      return await response.json() as AboutUsPageData;
    } catch (error) {
      console.error('Error fetching About Us page data:', error);
      return null;
    }
  },
};