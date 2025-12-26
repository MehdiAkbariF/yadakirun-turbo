// packages/api-client/src/types/order.types.ts

export type OrderStatus = 
  'WaitingForPayment' | 
  'WaitingForShipment' | 
  'Sent' | 
  'Delivered' | 
  'ReturnRequestInProgress' | 
  'PartialReturned' | 
  'FullyReturned' | 
  'UserCancelled' | 
  'AdminCancelled' | 
  'SystemCancelled';

export interface OrderItem {
  id: number;
  orderNumber: string;
  createdDate: string;
  totalPrice: string; // یا number اگر عدد بود
  status: OrderStatus;
  // فیلدهای بیشتر اگر در پاسخ بود
}

export interface OrdersResponse {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  items: OrderItem[];
  searchParams: any | null;
}