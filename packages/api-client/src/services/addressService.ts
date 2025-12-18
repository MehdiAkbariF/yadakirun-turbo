import { getAuthToken } from '../utils/authToken';
import { ApiAddressItem, AddAddressPayload, UpdateAddressPayload } from '../types/address.types';

const BASE_URL = "/api/UserPanel";

async function apiFetchFormData<T>(url: string, formData: FormData, method: 'POST' | 'PUT' = 'POST'): Promise<T> {
  const token = getAuthToken();
  const headers: HeadersInit = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, { method, headers, body: formData });
    if (!response.ok) {
      const errorBody = await response.text();
      console.error("API Error Response body:", errorBody); // لاگ کردن بدنه خطا
      throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }
    const text = await response.text();
    return text ? JSON.parse(text) as T : {} as T;
  } catch (error) {
    console.error(`Error in apiFetchFormData to ${url}:`, error);
    throw error;
  }
}

async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
    const token = getAuthToken();
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
        ...(token && { 'Authorization': `Bearer ${token}` }),
    };
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      const errorBody = await response.text();
      console.error("API Error Response body:", errorBody);
      throw new Error(`API call failed: ${response.statusText}`);
    }
    const text = await response.text();
    return text ? JSON.parse(text) as T : {} as T;
}

export const addressService = {
  fetchAddresses: (): Promise<ApiAddressItem[]> => {
    return apiFetch<ApiAddressItem[]>(`${BASE_URL}/UserLocations`);
  },

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

  // ✅✅✅ تابع updateAddress به طور کامل پیاده‌سازی شد ✅✅✅
  updateAddress: (data: UpdateAddressPayload): Promise<any> => {
    const formData = new FormData();
    
    // فیلد اجباری Id
    formData.append('Id', String(data.id));

    // افزودن بقیه فیلدها فقط در صورتی که مقداری داشته باشند
    // API ویرایش معمولا فقط فیلدهایی که قرار است تغییر کنند را می‌پذیرد
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

  deleteAddress: (id: number | string): Promise<any> => {
    return apiFetch(`${BASE_URL}/UserLocation`, {
      method: 'DELETE',
      body: JSON.stringify({ id: Number(id) }),
    });
  },
};