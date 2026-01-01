import { API_CONFIG } from '../config';
import { ReturnRequestsResponse } from '../types/return.types';

const BASE_URL = `${API_CONFIG.BASE_URL}/UserPanel`;

interface NextFetchRequestConfig extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

async function apiFetch<T>(url: string, options: NextFetchRequestConfig = {}): Promise<T> {
  // ❌ حذف دریافت توکن دستی

  const headers: HeadersInit = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...options.headers,
    // ❌ حذف هدر Authorization (کوکی‌ها خودکار ارسال می‌شوند)
  };

  try {
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Return API Error [${response.status}]:`, errorText);
      throw new Error(`API call failed: ${response.statusText}`);
    }
    const text = await response.text();
    return text ? (JSON.parse(text) as T) : ({} as T);
  } catch (error) {
    console.error(`Error in apiFetch for ${url}:`, error);
    throw error;
  }
}

export const returnService = {
  /**
   * دریافت لیست درخواست‌های مرجوعی
   */
  getReturnRequests: async (
    pageNumber: number = 1,
    pageSize: number = 30,
    status?: string
  ): Promise<ReturnRequestsResponse> => {
    try {
      // ساخت کوئری استرینگ
      const queryParams = new URLSearchParams({
        PageNumber: pageNumber.toString(),
        PageSize: pageSize.toString(),
      });

      if (status && status !== 'none') {
        queryParams.append('Status', status);
      }

      const url = `${BASE_URL}/ReturnRequests?${queryParams.toString()}`;

      return await apiFetch<ReturnRequestsResponse>(url, {
        cache: 'no-store',
      });
    } catch (error) {
      console.error("Error fetching return requests:", error);
      return {
        currentPage: pageNumber,
        totalPages: 0,
        pageSize,
        totalCount: 0,
        items: [],
        searchParams: null,
      };
    }
  },
};