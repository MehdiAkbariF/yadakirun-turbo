import { ReactNode } from 'react';

export type MessageSender = 'user' | 'support' | 'system';

export interface ChatMessage {
  id: number | string;
  text: string;
  sender: MessageSender;
  timestamp: string;
  imageUrl?: string; 
}

export interface ChatCategory {
  title: string;
  id: string | number;
  name: string; 
  description?: string;
  isActive?: boolean;
  icon?: ReactNode; 
}

export interface TicketChatProps {
  /** لیست پیام‌های چت */
  messages: ChatMessage[];

  /** لیست دسته‌بندی‌های تیکت (فقط برای تیکت جدید) */
  categories: ChatCategory[];

  /** آیا در حالت ایجاد تیکت جدید هستیم؟ */
  isNewTicket?: boolean;

  /** اطلاعات تیکت (فقط برای حالت مشاهده چت) */
  ticketInfo?: {
    id?: string | number;
    subject?: string;
    statusLabel?: string;
  };

  /** وقتی کاربر پیام می‌فرسته */
onSendMessage: (text: string, attachedFile?: File) => void;

  /** وقتی کاربر دسته‌بندی انتخاب می‌کنه (فقط در حالت جدید) */
  onSelectCategory?: (category: ChatCategory) => void;

  /** وقتی کاربر فایل پیوست می‌کنه */
  onAttachFile?: () => void;

  /** وضعیت لودینگ پیام‌ها */
  isLoading?: boolean;

  /** وضعیت لودینگ دسته‌بندی‌ها */
  isLoadingCategories?: boolean;
}