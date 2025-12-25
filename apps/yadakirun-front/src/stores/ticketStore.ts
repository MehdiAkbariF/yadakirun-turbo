import { create } from 'zustand';
import { ticketService } from '@monorepo/api-client/src/services/ticketService';
import { Ticket } from '@monorepo/api-client/src/types/ticket.types';

// تعریف تایپ پیام برای استور
interface Message {
  id: number | string;
  text: string;
  sender: 'user' | 'support' | 'system';
  timestamp: string;
}

interface TicketState {
  tickets: Ticket[];
  chatMessages: Message[]; // ✅ لیست پیام‌های چت فعلی
  isLoading: boolean;
  error: string | null;
  currentView: 'list' | 'chat' | 'create';
  selectedTicketId: number | string | null;
  selectedCategory: any | null; // برای تیکت جدید

  // اکشن‌ها
  fetchTickets: (page?: number, status?: number) => Promise<void>;
  fetchChatMessages: (ticketId: number | string) => Promise<void>; // دریافت پیام‌ها از سرور
  viewTicket: (id: number | string) => void;
  goBackToList: () => void;
  openCreateView: () => void;
  setCategory: (category: any) => void;
  sendMessage: (text: string) => Promise<void>; // ارسال پیام جدید
}

export const useTicketStore = create<TicketState>((set, get) => ({
  tickets: [],
  chatMessages: [],
  isLoading: false,
  error: null,
  currentView: 'list',
  selectedTicketId: null,
  selectedCategory: null,

  fetchTickets: async (page = 1, status) => {
    set({ isLoading: true, error: null });
    try {
      const response = await ticketService.getTickets(page, 30, status);
      set({ tickets: response.items, isLoading: false });
    } catch (err) {
      set({ error: 'خطا در دریافت تیکت‌ها', isLoading: false });
    }
  },

  // شبیه‌سازی دریافت پیام‌های یک تیکت
  fetchChatMessages: async (ticketId) => {
    set({ isLoading: true });
    // در آینده: const messages = await ticketService.getMessages(ticketId);
    setTimeout(() => {
      set({ 
        chatMessages: [
          { id: 1, text: 'سلام، چطور می‌توانم کمکتان کنم؟', sender: 'support', timestamp: '۱۰:۳۰' }
        ],
        isLoading: false 
      });
    }, 500);
  },

  viewTicket: (id) => {
    set({ currentView: 'chat', selectedTicketId: id });
    get().fetchChatMessages(id); // به محض باز کردن تیکت، پیام‌ها را لود کن
  },

  goBackToList: () => set({ 
    currentView: 'list', 
    selectedTicketId: null, 
    chatMessages: [],
    selectedCategory: null 
  }),

  openCreateView: () => set({ 
    currentView: 'create',
    selectedTicketId: null,
    chatMessages: [],
    selectedCategory: null
  }),

  setCategory: (category) => set({ selectedCategory: category }),

  sendMessage: async (text) => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })
    };

    // بروزرسانی خوش‌بینانه UI (Optimistic Update)
    set((state) => ({ 
      chatMessages: [...state.chatMessages, newMessage] 
    }));

    try {
      // در آینده فراخوانی API:
      // await ticketService.sendNewMessage(get().selectedTicketId, text);
      console.log("Message sent to server:", text);
    } catch (err) {
      console.error("Failed to send message");
    }
  },
}));