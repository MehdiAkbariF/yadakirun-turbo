import { FooterData } from '../types/footer.types';
import { API_CONFIG } from '../config';

interface NextFetchRequestConfig extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

const BASE_URL = `${API_CONFIG.BASE_URL}/Front`;

// داده‌های پیش‌فرض برای جلوگیری از کرش کردن
const defaultFooterData: FooterData = {
  // دقت کنید که این نام‌ها باید دقیقاً با اینترفیس FooterData یکی باشند
  SaleServices: [], 
  footerLinks: [],
};

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
      console.error(`Footer API Error [${response.status}]:`, errorBody);
      throw new Error(`API call failed: ${response.statusText}`);
    }

    return await response.json() as T;
  } catch (error) {
    console.error(`Network or Parsing Error in apiFetch for ${url}:`, error);
    throw error;
  }
}

export const footerService = {
  /**
   * دریافت اطلاعات فوتر
   * آدرس نهایی: [API_URL]/api/Front/Footer
   */
  getFooterData: async (): Promise<FooterData> => {
    try {
      const url = `${BASE_URL}/Footer`;
      
      return await apiFetch<FooterData>(url, {
        next: { revalidate: 86400 }, // کش برای ۲۴ ساعت
      });
    } catch (error) {
      console.error("Error fetching footer data:", error);
      return defaultFooterData;
    }
  },
};