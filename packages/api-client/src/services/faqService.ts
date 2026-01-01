import { FAQPageData } from '../types/faq.types';
import { API_CONFIG } from '../config';

// تعریف تایپ برای پشتیبانی از تنظیمات Next.js
interface NextFetchRequestConfig extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

// تنظیم آدرس پایه برای بخش Front
const BASE_URL = `${API_CONFIG.BASE_URL}/Front`;

/**
 * تابع کمکی برای فراخوانی API
 */
async function apiFetch<T>(url: string, options: NextFetchRequestConfig = {}): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Accept': 'application/json',
        // ❌ بدون Authorization
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`FAQ API Error [${response.status}]:`, errorBody);
      throw new Error(`API call failed: ${response.statusText}`);
    }

    return await response.json() as T;
  } catch (error) {
    console.error(`Network or Parsing Error in apiFetch for ${url}:`, error);
    throw error;
  }
}

export const faqService = {
  /**
   * دریافت اطلاعات صفحه سوالات متداول
   * آدرس نهایی: [API_URL]/api/Front/FAQPage
   */
  getFaqPageData: async (): Promise<FAQPageData | null> => {
    try {
      const url = `${BASE_URL}/FAQPage`;
      
      return await apiFetch<FAQPageData>(url, {
        next: { revalidate: 86400 }, // کش برای ۲۴ ساعت
      });
    } catch (error) {
      console.error('Error fetching FAQ page data:', error);
      return null;
    }
  },
};