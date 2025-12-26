import { create } from 'zustand';
import { orderService } from '@monorepo/api-client/src/services/orderService';
import { OrderItem, OrdersResponse } from '@monorepo/api-client/src/types/order.types';

type OrderStatusFilter = 'all' | 'WaitingForPayment' | 'WaitingForShipment' | 'Sent' | 'Delivered' | 
  'ReturnRequestInProgress' | 'PartialReturned' | 'FullyReturned' | 
  'UserCancelled' | 'AdminCancelled' | 'SystemCancelled';

interface OrderState {
  orders: OrderItem[];
  isLoading: boolean;
  selectedStatus: OrderStatusFilter;

  // اقدامات
  fetchOrders: (status?: OrderStatusFilter) => Promise<void>;
  setSelectedStatus: (status: OrderStatusFilter) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  isLoading: false,
  selectedStatus: 'all',

  setSelectedStatus: (status) => set({ selectedStatus: status }),

  fetchOrders: async (status = 'all') => {
    set({ isLoading: true });
    try {
      const response: OrdersResponse = await orderService.getOrders(
        1,
        30,
        status === 'all' ? undefined : status
      );

      set({
        orders: response.items,
        isLoading: false,
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
      set({
        orders: [],
        isLoading: false,
      });
    }
  },
}));