import { AboutUsPageData } from '../types/about.types';
import { API_CONFIG } from '../config'; 

interface NextFetchRequestConfig extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

const BASE_URL = API_CONFIG.BASE_URL;

export const aboutUsService = {
  getAboutUsPageData: async (): Promise<AboutUsPageData | null> => {
    try {
      const response = await fetch(`${BASE_URL}/Front/AboutUsPage`, {
        next: { revalidate: 86400 }, 
        headers: {
          'Accept': 'application/json',
          // ❌ هیچ هدر Authorization اینجا نیست
        }
      } as NextFetchRequestConfig); 

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