// packages/api-client/src/services/orderService.ts

import { API_CONFIG } from '../config';
import { getAuthToken } from '../utils/authToken';
import { OrdersResponse } from '../types/order.types';

const BASE_URL = `${API_CONFIG.BASE_URL}/UserPanel`;

async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
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
      console.error(`Order API Error [${response.status}]:`, errorText);
      throw new Error(`API call failed: ${response.statusText}`);
    }
    const text = await response.text();
    return text ? (JSON.parse(text) as T) : ({} as T);
  } catch (error) {
    console.error(`Error in apiFetch for ${url}:`, error);
    throw error;
  }
}

export const orderService = {
  /**
   * دریافت لیست سفارشات
   */
  getOrders: async (
    pageNumber: number = 1,
    pageSize: number = 30,
    status?: string
  ): Promise<OrdersResponse> => {
    try {
      let url = `${BASE_URL}/Orders?PageNumber=${pageNumber}&PageSize=${pageSize}`;
      if (status && status !== 'all') {
        url += `&Status=${status}`;
      }

      return await apiFetch<OrdersResponse>(url, {
        cache: 'no-store',
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
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