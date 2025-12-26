export interface TicketMessage {
  id: number;
  text: string;
  ticketId: string | number;
  creatorId: string;
  isRead: boolean;
  creator?: any; // یا تایپ دقیق کاربر
  attachments?: any[];
}

export interface Ticket {
  id: string | number;
  ticketNumber: number;
  title: string;
  orderNumber: number;
  categoryId: string;
  resolvedAt: string | null;
  hasAdminUnread: boolean;
  hasUserUnread: boolean;
  category: {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
  } | null;
  createdDate: string;
  status: number; // 1 = open, 2 = pending, etc.

  // ✅ این خط رو اضافه کن
  messages: TicketMessage[];
}