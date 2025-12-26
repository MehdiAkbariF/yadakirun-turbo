

export type ReturnStatus = 'New' | 'Confirmed' | 'SentBack' | 'PaidBack' | 'Denied' | 'None';

export interface ReturnRequestItem {
  id: number;
  orderId: number;
  orderNumber?: string;
  status: ReturnStatus;
  createdDate: string;
  
  
  
}

export interface ReturnRequestsResponse {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  items: ReturnRequestItem[];
  searchParams: any | null;
}

export interface CreateReturnRequest {
  orderId: number;
  items: Array<{
    orderItemId: number;
    reasonId: number;
    quantity: number;
    description?: string;
    images?: string[];
  }>;
}