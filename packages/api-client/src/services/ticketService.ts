import { PaginatedResponse } from '../types/car';
import { Ticket } from '../types/ticket.types';
import { API_CONFIG } from '../config';

interface NextFetchRequestConfig extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

const BASE_URL = `${API_CONFIG.BASE_URL}/UserPanel`;

async function apiFetch<T>(url: string, options: NextFetchRequestConfig = {}): Promise<T> {
  // ❌ حذف توکن دستی
  
  const headers: HeadersInit = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...options.headers,
    // ❌ حذف هدر Authorization
  };

  try {
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Ticket API Error [${response.status}]:`, errorBody);
      throw new Error(`API call failed: ${response.statusText}`);
    }
    const text = await response.text();
    return text ? (JSON.parse(text) as T) : ({} as T);
  } catch (error) {
    console.error(`Network or Parsing Error in apiFetch for ${url}:`, error);
    throw error;
  }
}

export interface TicketCategory {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}

export interface CreateTicketResponse {
  id: string;
  ticketNumber: number;
  title: string;
  categoryId: string;
  messages: Array<{
    id: number;
    text: string;
    isRead: boolean;
  }>;
}

export const ticketService = {
  /**
   * دریافت لیست تیکت‌ها
   */
  getTickets: async (
    pageNumber: number = 1,
    pageSize: number = 30,
    status?: number
  ): Promise<PaginatedResponse<Ticket>> => {
    try {
      let url = `${BASE_URL}/Tickets?PageNumber=${pageNumber}&PageSize=${pageSize}`;
      if (status !== undefined) {
        url += `&Status=${status}`;
      }
      return await apiFetch<PaginatedResponse<Ticket>>(url, {
        cache: 'no-store',
      });
    } catch (error) {
      console.error("Error fetching tickets:", error);
      return {
        currentPage: pageNumber,
        totalPages: 0,
        pageSize,
        totalCount: 0,
        items: [],
        searchParams: null
      };
    }
  },

  /**
   * دریافت جزئیات یک تیکت
   */
  getTicketDetails: async (ticketId: number | string): Promise<Ticket | null> => {
    try {
      const url = `${BASE_URL}/Ticket?Id=${ticketId}`;
      // اینجا return داریم
      return await apiFetch<Ticket>(url, {
        cache: 'no-store',
      });
    } catch (error) {
      console.error("Error fetching ticket details:", error);
      return null;
    }
  },

  /**
   * ارسال پیام جدید به تیکت
   */
  sendMessageToTicket: async (ticketId: string | number, text: string, attachedFile?: File): Promise<any | null> => {
    try {
      const formData = new FormData();
      formData.append('Text', text);
      formData.append('TicketId', ticketId.toString());
      formData.append('WasHelpful', 'false');

      if (attachedFile) {
        formData.append('Attachments', attachedFile, attachedFile.name);
      }

      const response = await fetch(`${BASE_URL}/TicketMessage`, {
        method: 'POST',
        // ❌ بدون هدر Authorization و Content-Type
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Send message failed:', errorText);
        return null;
      }

      // ✅ حتما باید return وجود داشته باشد
      return await response.json();
    } catch (error) {
      console.error("Error sending message to ticket:", error);
      return null;
    }
  },

  /**
   * دریافت دسته‌بندی‌های تیکت
   */
  getTicketCategories: async (): Promise<TicketCategory[]> => {
    try {
      const url = `${BASE_URL}/TicketCategories`;
      return await apiFetch<TicketCategory[]>(url, {
        next: { revalidate: 3600 },
      });
    } catch (error) {
      console.error("Error fetching ticket categories:", error);
      return [];
    }
  },

  /**
   * ایجاد تیکت جدید
   */
  createTicket: async (
    categoryId: string,
    title: string,
    text: string
  ): Promise<CreateTicketResponse | null> => {
    try {
      const formData = new FormData();
      formData.append('CategoryId', categoryId);
      formData.append('Title', title);
      formData.append('Text', text);
      formData.append('OrderNumber', '0');

      const response = await fetch(`${BASE_URL}/Ticket`, {
        method: 'POST',
        // ❌ بدون هدر Authorization و Content-Type
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Create ticket failed:', errorText);
        return null;
      }

      // ✅✅✅ رفع خطای ts(2366): کلمه return اینجا الزامی است
      return await response.json() as CreateTicketResponse;
      
    } catch (error) {
      console.error("Error creating ticket:", error);
      return null;
    }
  },
};