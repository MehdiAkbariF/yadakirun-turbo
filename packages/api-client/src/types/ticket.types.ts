// مسیر: packages/api-client/src/types/ticket.types.ts
// ✅ اینترفیس برای آیتم تیکت خام از API (بر اساس ساختار ریسپانس نمونه)
export interface Ticket {
  id: number;
  ticketNumber: string;
  createdDate: string;
  subject: string;
  status: number;
  // ✅ فیلدهای اضافی اگر در آینده از API بیایند، اینجا اضافه شوند
}