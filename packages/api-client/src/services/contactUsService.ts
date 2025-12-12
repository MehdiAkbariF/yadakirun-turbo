import { ContactUsPageData } from '../types/contact.types';

const BASE_URL = "https://api-yadakirun.yadakchi.com/api";

export const contactUsService = {
  getContactUsPageData: async (): Promise<ContactUsPageData | null> => {
    try {
      const response = await fetch(`${BASE_URL}/Front/ContactUsPage`, {
        next: { revalidate: 86400 }, // کش برای ۲۴ ساعت
      } as any);

      if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
      }
      
      return await response.json() as ContactUsPageData;
    } catch (error) {
      console.error('Error fetching Contact Us page data:', error);
      return null;
    }
  },
};