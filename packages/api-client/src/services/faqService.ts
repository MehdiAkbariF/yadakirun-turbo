import { FAQPageData } from '../types/faq.types';

const BASE_URL = "https://api-yadakirun.yadakchi.com/api";

export const faqService = {
  getFaqPageData: async (): Promise<FAQPageData | null> => {
    try {
      const response = await fetch(`${BASE_URL}/Front/FAQPage`, {
        // داده‌های FAQ را می‌توان برای مدت طولانی‌تری کش کرد
        next: { revalidate: 86400 }, // 24 ساعت
      } as any);

      if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
      }
      
      return await response.json() as FAQPageData;
    } catch (error) {
      console.error('Error fetching FAQ page data:', error);
      return null;
    }
  },
};