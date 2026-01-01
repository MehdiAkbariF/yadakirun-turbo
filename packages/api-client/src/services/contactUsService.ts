import { ContactUsPageData } from '../types/contact.types';
import { API_CONFIG } from '../config';

interface NextFetchRequestConfig extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

const BASE_URL = `${API_CONFIG.BASE_URL}/Front`;

async function apiFetch<T>(url: string, options: NextFetchRequestConfig = {}): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Accept': 'application/json',
        // 'Content-Type': 'application/json', // برای درخواست‌های GET الزامی نیست
        ...options.headers,
        // ❌ بدون Authorization
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`ContactUs API Error [${response.status}]:`, errorBody);
      throw new Error(`API call failed: ${response.statusText}`);
    }

    return await response.json() as T;
  } catch (error) {
    console.error(`Network or Parsing Error in apiFetch for ${url}:`, error);
    throw error;
  }
}

export const contactUsService = {
  /**
   * دریافت اطلاعات صفحه تماس با ما
   * آدرس نهایی: [API_URL]/api/Front/ContactUsPage
   */
  getContactUsPageData: async (): Promise<ContactUsPageData | null> => {
    try {
      const url = `${BASE_URL}/ContactUsPage`;
      
      return await apiFetch<ContactUsPageData>(url, {
        next: { revalidate: 86400 }, // کش برای ۲۴ ساعت
      });
    } catch (error) {
      console.error('Error fetching Contact Us page data:', error);
      return null;
    }
  },
};