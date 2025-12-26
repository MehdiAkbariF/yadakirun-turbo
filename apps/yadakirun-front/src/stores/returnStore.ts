// apps/yadakirun-front/src/stores/returnStore.ts

import { create } from 'zustand';
import { returnService } from '@monorepo/api-client/src/services/returnService';
import { ReturnRequestItem, ReturnRequestsResponse } from '@monorepo/api-client/src/types/return.types';

type ReturnStatusFilter = 'none' | 'New' | 'Confirmed' | 'SentBack' | 'PaidBack' | 'Denied';

interface ReturnState {
  returns: ReturnRequestItem[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  selectedStatus: ReturnStatusFilter;

  fetchReturns: (status?: ReturnStatusFilter) => Promise<void>;
  setSelectedStatus: (status: ReturnStatusFilter) => void;
}

export const useReturnStore = create<ReturnState>((set) => ({
  returns: [],
  isLoading: false,
  currentPage: 1,
  totalPages: 0,
  selectedStatus: 'none',

  setSelectedStatus: (status) => set({ selectedStatus: status }),

  fetchReturns: async (status = 'none') => {
    set({ isLoading: true });
    try {
      const response: ReturnRequestsResponse = await returnService.getReturnRequests(
        1,
        30,
        status === 'none' ? undefined : status
      );
      set({
        returns: response.items,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        isLoading: false,
      });
    } catch {
      set({ isLoading: false, returns: [] });
    }
  },
}));