import { getAuthToken } from '../utils/authToken';
import { API_CONFIG } from '../config';
import { ApiAddressItem, AddAddressPayload, UpdateAddressPayload } from '../types/address.types';

// ✅ تعریف تایپ برای پشتیبانی از تنظیمات Next.js (مانند سایر سرویس‌ها)
interface NextFetchRequestConfig extends RequestInit {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

// ترکیب آدرس پایه با بخش پنل کاربری
// خروجی در سرور: https://api-yadakirun.yadakchi.com/api/UserPanel
// خروجی در کلاینت: /api/UserPanel
const BASE_URL = `${API_CONFIG.BASE_URL}/UserPanel`;

async function apiFetchFormData<T>(url: string, formData: FormData, method: 'POST' | 'PUT' = 'POST'): Promise<T> {
  const token = getAuthToken();
  
  // استفاده از تکنیک Spread برای جلوگیری از خطای ایندکس تایپ‌اسکریپت در HeadersInit
  const headers: HeadersInit = {
    ...(token && { 'Authorization': `Bearer ${token}` }),
    // نکته: برای FormData نباید Content-Type ست کنیم، خود مرورگر Boundary را تنظیم می‌کند
  };

  try {
    const response = await fetch(url, { method, headers, body: formData });
    if (!response.ok) {
      const errorBody = await response.text();
      console.error("API FormData Error Response:", errorBody);
      throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }
    const text = await response.text();
    return text ? JSON.parse(text) as T : { success: true } as T;
  } catch (error) {
    console.error(`Error in apiFetchFormData to ${url}:`, error);
    throw error;
  }
}

async function apiFetch<T>(url: string, options: NextFetchRequestConfig = {}): Promise<T> {
    const token = getAuthToken();
    
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
        ...(token && { 'Authorization': `Bearer ${token}` }),
    };

    try {
      const response = await fetch(url, { ...options, headers });
      if (!response.ok) {
        const errorBody = await response.text();
        console.error("API JSON Error Response:", errorBody);
        throw new Error(`API call failed: ${response.status} ${response.statusText}`);
      }
      const text = await response.text();
      return text ? JSON.parse(text) as T : { success: true } as T;
    } catch (error) {
      console.error(`Error in apiFetch to ${url}:`, error);
      throw error;
    }
}

export const addressService = {
  /**
   * دریافت تمام آدرس‌های کاربر
   * آدرس نهایی: [BASE_URL]/UserLocations
   */
  fetchAddresses: (): Promise<ApiAddressItem[]> => {
    return apiFetch<ApiAddressItem[]>(`${BASE_URL}/UserLocations`, {
      cache: 'no-store'
    });
  },

  /**
   * افزودن آدرس جدید
   * آدرس نهایی: [BASE_URL]/UserLocation
   */
  addAddress: (data: AddAddressPayload): Promise<any> => {
    const formData = new FormData();
    formData.append('Title', data.title);
    formData.append('Latitude', String(data.latitude));
    formData.append('Longitude', String(data.longitude));
    formData.append('Address', data.address);
    formData.append('City', data.city);
    formData.append('PostalCode', data.postalCode);
    formData.append('Plaque', String(data.plaque));
    formData.append('IsUserReciever', String(data.isUserReciever));
    
    if (data.unit) formData.append('Unit', String(data.unit));
    if (data.floor) formData.append('Floor', String(data.floor));
    if (data.isDefault) formData.append('IsDefault', String(data.isDefault));
    if (data.receiverName) formData.append('ReceiverName', data.receiverName);
    if (data.receiverLastName) formData.append('ReceiverLastName', data.receiverLastName);
    if (data.receiverMobile) formData.append('ReceiverMobile', data.receiverMobile);

    return apiFetchFormData(`${BASE_URL}/UserLocation`, formData, 'POST');
  },

  /**
   * ویرایش آدرس موجود
   * آدرس نهایی: [BASE_URL]/UserLocation
   */
  updateAddress: (data: UpdateAddressPayload): Promise<any> => {
    const formData = new FormData();
    
    formData.append('Id', String(data.id));

    if (data.title) formData.append('Title', data.title);
    if (data.latitude) formData.append('Latitude', String(data.latitude));
    if (data.longitude) formData.append('Longitude', String(data.longitude));
    if (data.address) formData.append('Address', data.address);
    if (data.city) formData.append('City', data.city);
    if (data.postalCode) formData.append('PostalCode', data.postalCode);
    if (data.plaque) formData.append('Plaque', String(data.plaque));
    if (data.unit) formData.append('Unit', String(data.unit));
    if (data.floor) formData.append('Floor', String(data.floor));
    if (typeof data.isDefault === 'boolean') formData.append('IsDefault', String(data.isDefault));
    if (data.receiverName) formData.append('ReceiverName', data.receiverName);
    if (data.receiverLastName) formData.append('ReceiverLastName', data.receiverLastName);
    if (data.receiverMobile) formData.append('ReceiverMobile', data.receiverMobile);

    return apiFetchFormData(`${BASE_URL}/UserLocation`, formData, 'PUT');
  },

  /**
   * حذف آدرس
   * آدرس نهایی: [BASE_URL]/UserLocation
   */
  deleteAddress: (id: number | string): Promise<any> => {
    return apiFetch(`${BASE_URL}/UserLocation`, {
      method: 'DELETE',
      body: JSON.stringify({ id: Number(id) }),
    });
  },
};