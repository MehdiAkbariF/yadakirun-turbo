// packages/api-client/src/services/returnService.ts

import { API_CONFIG } from '../config';
import { getAuthToken } from '../utils/authToken';
import { ReturnRequestsResponse } from '../types/return.types'; // ← فقط response

const BASE_URL = `${API_CONFIG.BASE_URL}/UserPanel`;

interface NextFetchRequestConfig extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

async function apiFetch<T>(url: string, options: NextFetchRequestConfig = {}): Promise<T> {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Accept': 'application/json',
    ...options.headers,
    ...(token && { 'Authorization': `Bearer ${token}` }),
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
      let url = `${BASE_URL}/ReturnRequests?PageNumber=${pageNumber}&PageSize=${pageSize}`;
      if (status && status !== 'none') {
        url += `&Status=${status}`;
      }

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