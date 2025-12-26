import { FooterData } from '../types/footer.types';
import { API_CONFIG } from '../config';

// ✅ تعریف تایپ برای پشتیبانی از تنظیمات Next.js بدون نیاز به any
interface NextFetchRequestConfig extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

// تنظیم آدرس پایه برای بخش Front
const BASE_URL = `${API_CONFIG.BASE_URL}/Front`;

// داده‌های پیش‌فرض برای جلوگیری از کرش کردن سایت در صورت خطای API
const defaultFooterData: FooterData = {
  SaleServices: [],
  footerLinks: [],
};

/**
 * تابع کمکی برای فراخوانی APIهای مربوط به فوتر
 */
async function apiFetch<T>(url: string, options: NextFetchRequestConfig = {}): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Accept': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      // لاگ کردن جزئیات خطا برای دیباگ در محیط توسعه
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

  getFooterData: async (): Promise<FooterData> => {
    try {
      const url = `${BASE_URL}/Footer`;
      
      return await apiFetch<FooterData>(url, {
        next: { revalidate: 86400 }, // کش برای ۲۴ ساعت (داده‌های فوتر به ندرت تغییر می‌کنند)
      });
    } catch (error) {
      console.error("Error fetching footer data:", error);
      // در صورت بروز هرگونه خطا، ساختار خالی استاندارد برمی‌گردانیم تا چیدمان سایت به هم نریزد
      return defaultFooterData;
    }
  },
};