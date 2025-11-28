// تایپ‌های مربوط به ریسپانس API

export interface CarManufacturer {
  id: number;
  name: string;
  englishName: string;
}

export interface CarPageData {
  id: number;
  modelName: string;
  englishName: string;
  imageUrl: string;
  imageAlt: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  carManufacturer: CarManufacturer;
  // این فیلد در آینده از بک‌اند می‌آید
  description?: string; 
}

export interface Product {
  id: number;
  title: string;
  price: number;
  oldPrice?: number;
  mainImage: string;
  stockStatus: boolean;
  rating?: number;
  // ... هر فیلد دیگری که از API می‌آید
}

export interface PaginatedResponse<T> {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  items: T[];
  searchParams: any | null;
}