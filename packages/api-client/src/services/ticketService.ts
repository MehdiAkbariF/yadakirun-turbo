// مسیر: packages/api-client/src/services/ticketService.ts
import { PaginatedResponse } from '../types/car'; // ایمپورت PaginatedResponse عمومی از car.ts
import { Ticket } from '../types/ticket.types'; // ایمپورت تایپ Ticket

const BASE_URL = "https://api-yadakirun.yadakchi.com/api";

export const ticketService = {
  getTickets: async (
    token: string, // ✅ توکن برای احراز هویت کاربر پنل
    pageNumber: number = 1,
    pageSize: number = 30,
    status?: number // ✅ پارامتر اختیاری Status برای فیلتر بر اساس وضعیت
  ): Promise<PaginatedResponse<Ticket>> => {
    try {
      let url = `${BASE_URL}/UserPanel/Tickets?PageNumber=${pageNumber}&PageSize=${pageSize}`;
      if (status !== undefined) {
        url += `&Status=${status}`;
      }

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': '*/*',
        },
        cache: 'no-store' // ✅ بدون کش برای داده‌های پویا و شخصی کاربر
      });

      if (!response.ok) {
        throw new Error("Failed to fetch tickets");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching tickets:", error);
      return { currentPage: 1, totalPages: 0, pageSize, totalCount: 0, items: [], searchParams: null };
    }
  }
};