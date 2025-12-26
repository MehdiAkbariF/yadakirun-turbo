import { create } from 'zustand';
import { ticketService, TicketCategory } from '@monorepo/api-client/src/services/ticketService';
import { Ticket } from '@monorepo/api-client/src/types/ticket.types';

interface Message {
  id: number | string;
  text: string;
  sender: 'user' | 'support' | 'system';
  timestamp: string;
  imageUrl?: string;
}

interface TicketState {
  tickets: Ticket[];
  categories: TicketCategory[];
  chatMessages: Message[];
  isLoading: boolean;
  isLoadingCategories: boolean;
  currentView: 'list' | 'chat' | 'create';
  selectedTicketId: number | string | null;
  selectedCategory: TicketCategory | null;

  fetchTickets: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  viewTicket: (id: number | string, userId?: string) => Promise<void>;
  goBackToList: () => void;
  openCreateView: () => void;
  setCategory: (category: TicketCategory) => void;
  createAndOpenNewTicket: (title: string, text: string) => Promise<void>;
  sendMessageToExistingTicket: (text: string) => Promise<void>;
}

export const useTicketStore = create<TicketState>((set, get) => ({
  tickets: [],
  categories: [],
  chatMessages: [],
  isLoading: false,
  isLoadingCategories: false,
  currentView: 'list',
  selectedTicketId: null,
  selectedCategory: null,

  fetchTickets: async () => {
    set({ isLoading: true });
    try {
      const response = await ticketService.getTickets();
      set({ tickets: response.items, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  fetchCategories: async () => {
    set({ isLoadingCategories: true });
    try {
      const cats = await ticketService.getTicketCategories();
      set({ categories: cats, isLoadingCategories: false });
    } catch {
      set({ isLoadingCategories: false });
    }
  },

  viewTicket: async (id, userIdFromDashboard) => {
    console.log('🔍 viewTicket called with id:', id);
    console.log('🔑 userId from dashboard:', userIdFromDashboard);

    set({ isLoading: true });
    try {
      const ticketDetails = await ticketService.getTicketDetails(id);
      if (ticketDetails) {
        console.log('📨 Raw messages from API:', ticketDetails.messages);

        const messages = ticketDetails.messages.map(m => {
          const isUser = userIdFromDashboard && m.creatorId === userIdFromDashboard;
          console.log(`Message ${m.id}: creatorId=${m.creatorId} === userId=${userIdFromDashboard} → isUser=${isUser}`);

          return {
            id: m.id,
            text: m.text || '',
            sender: isUser ? 'user' : 'support',
            timestamp: new Date().toLocaleTimeString('fa-IR', {
              hour: '2-digit',
              minute: '2-digit'
            }),
          };
        });

        console.log('✅ Final mapped messages:', messages);

        set({
          currentView: 'chat',
          selectedTicketId: id,
          chatMessages: messages,
          isLoading: false
        });
      } else {
        set({ isLoading: false });
      }
    } catch (err) {
      console.error('❌ Error fetching ticket details:', err);
      set({ isLoading: false });
    }
  },

sendMessageToExistingTicket: async (text: string, attachedFile?: File) => {
  const state = get();
  if (!state.selectedTicketId) return;

  const tempId = Date.now();
  const newMessage: Message = {
    id: tempId,
    text,
    sender: 'user',
    timestamp: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
    imageUrl: attachedFile && attachedFile.type.startsWith('image/') 
      ? URL.createObjectURL(attachedFile) 
      : undefined
  };

  set((state) => ({
    chatMessages: [...state.chatMessages, newMessage],
    isLoading: true
  }));

  const result = await ticketService.sendMessageToTicket(state.selectedTicketId, text, attachedFile);

  if (result) {
    set((state) => ({
      chatMessages: state.chatMessages.map(m =>
        m.id === tempId ? { ...m, id: result.id } : m
      ),
      isLoading: false
    }));
  } else {
    set((state) => ({
      chatMessages: state.chatMessages.filter(m => m.id !== tempId),
      isLoading: false
    }));
  }
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

  createAndOpenNewTicket: async (title, text) => {
    const state = get();
    if (!state.selectedCategory) return;

    set({ isLoading: true });
    const result = await ticketService.createTicket(
      state.selectedCategory.id,
      title,
      text
    );

    if (result) {
      const newTicket: Ticket = {
        id: result.id,
        title: result.title,
        createdDate: new Date().toISOString(),
        status: 1,
        ticketNumber: result.ticketNumber,
        orderNumber: 0,
        resolvedAt: null,
        hasAdminUnread: true,
        hasUserUnread: false,
        categoryId: state.selectedCategory.id,
        category: state.selectedCategory,
        messages: result.messages
      };

      const newMessages: Message[] = result.messages.map(m => ({
        id: m.id,
        text: m.text || '',
        sender: 'user',
        timestamp: new Date().toLocaleTimeString('fa-IR', {
          hour: '2-digit',
          minute: '2-digit'
        })
      }));

      set({
        tickets: [newTicket, ...state.tickets],
        chatMessages: newMessages,
        currentView: 'chat',
        selectedTicketId: result.id,
        selectedCategory: null,
        isLoading: false
      });
    } else {
      set({ isLoading: false });
    }
  },
}));