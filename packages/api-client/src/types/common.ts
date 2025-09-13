// مسیر: packages/api-client/src/types/common.ts

export interface PaginationParams {
  PageNumber?: number;
  PageSize?: number;
}

export interface ApiResponse<T> {
  data?: T;
  message?: string;
  success?: boolean;
  errors?: string[];
  // هر فیلد دیگه‌ای که در ریسپانس هست
}


export interface DeleteDTO {
  id?: string;
}