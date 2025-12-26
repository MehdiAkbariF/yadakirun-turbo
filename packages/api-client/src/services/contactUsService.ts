import { ContactUsPageData } from '../types/contact.types';
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

/**
 * تابع کمکی برای فراخوانی APIهای مربوط به تماس با ما
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
      // لاگ کردن جزئیات خطا برای دیباگ راحت‌تر
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
   * دریافت اطلاعات صفحه تماس با ما (آدرس، تلفن‌ها، نقشه‌ و متادیتا)
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
      // در صورت بروز خطا null برمی‌گردانیم تا لایه نمایش بتواند حالت جایگزین را مدیریت کند
      return null;
    }
  },
};