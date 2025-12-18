// اینترفیس برای یک آیتم آدرس که از API دریافت می‌شود
export interface ApiAddressItem {
  id: number;
  title: string;
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  postalCode: string;
  plaque: number;
  unit?: number;
  floor?: number;
  isDefault: boolean;
  // ... سایر فیلدهای مربوط به گیرنده
}

// اینترفیس برای داده‌هایی که هنگام افزودن آدرس جدید ارسال می‌شوند
export interface AddAddressPayload {
  title: string;
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  postalCode: string;
  plaque: number;
  unit?: number;
  floor?: number;
  isDefault?: boolean;
  isUserReciever: boolean;
  receiverName?: string;
  receiverLastName?: string;
  receiverMobile?: string;
}
export interface UpdateAddressPayload {
  id: number | string;
  title?: string;
  latitude?: number;
  longitude?: number;
  address?: string;
  city?: string;
  postalCode?: string;
  plaque?: number;
  unit?: number;
  floor?: number;
  isDefault?: boolean;
  receiverName?: string;
  receiverLastName?: string;
  receiverMobile?: string;
}