import { create } from 'zustand';
import { addressService } from '@monorepo/api-client/src/services/addressService';
import type { AddAddressPayload, UpdateAddressPayload } from '@monorepo/api-client/src/types/address.types';
import type { AddressItem, AddressFormData } from '@monorepo/design-system/src/components/organisms/AddressManager/AddressManager';

// ✅ 1. اینترفیس AddressState با پراپرتی‌های جدید برای کنترل مودال آپدیت شد
interface AddressState {
  addresses: AddressItem[];
  isLoading: boolean;
  error: string | null;
  isAddModalOpen: boolean; // وضعیت باز یا بسته بودن مودال افزودن
  
  fetchAddresses: () => Promise<void>;
  addAddress: (data: Omit<AddressFormData, 'id'>) => Promise<void>;
  deleteAddress: (id: number | string) => Promise<void>;
  updateAddress: (data: AddressFormData) => Promise<void>;
  openAddModal: () => void; // اکشن برای باز کردن مودال
  closeAddModal: () => void; // اکشن برای بستن مودال
}

export const useAddressStore = create<AddressState>((set, get) => ({
  addresses: [],
  isLoading: false,
  error: null,
  isAddModalOpen: false, // مقدار اولیه

  // ✅ 2. اکشن‌های جدید برای کنترل مودال
  openAddModal: () => set({ isAddModalOpen: true }),
  closeAddModal: () => set({ isAddModalOpen: false }),

  fetchAddresses: async () => {
    set({ isLoading: true, error: null });
    try {
      const apiAddresses = await addressService.fetchAddresses();
      const uiAddresses: AddressItem[] = apiAddresses.map(addr => ({
        id: addr.id,
        title: addr.title,
        fullAddress: addr.address,
        postalCode: addr.postalCode,
        location: { lat: addr.latitude, lng: addr.longitude },
        city: addr.city,
        plaque: String(addr.plaque),
        unit: String(addr.unit),
        floor: String(addr.floor),
        isDefault: addr.isDefault,
      }));
      set({ addresses: uiAddresses, isLoading: false });
    } catch (e) {
      set({ error: 'خطا در دریافت آدرس‌ها', isLoading: false });
    }
  },

  addAddress: async (newAddressData: Omit<AddressFormData, 'id'>) => {
    set({ isLoading: true, error: null });
    try {
      const payload: AddAddressPayload = {
        title: newAddressData.title,
        address: newAddressData.fullAddress,
        postalCode: newAddressData.postalCode,
        latitude: newAddressData.location.lat,
        longitude: newAddressData.location.lng,
        city: newAddressData.city,
        plaque: Number(newAddressData.plaque),
        unit: newAddressData.unit ? Number(newAddressData.unit) : undefined,
        floor: newAddressData.floor ? Number(newAddressData.floor) : undefined,
        isDefault: newAddressData.isDefault,
        isUserReciever: newAddressData.isUserReciever,
        receiverName: newAddressData.receiverName,
        receiverLastName: newAddressData.receiverLastName,
        receiverMobile: newAddressData.receiverMobile,
      };
      await addressService.addAddress(payload);
      // ✅ 3. پس از افزودن موفقیت‌آمیز، لیست آدرس‌ها را دوباره واکشی کرده و مودال را می‌بندیم
      await get().fetchAddresses();
      set({ isAddModalOpen: false });
    } catch (e) {
      // در صورت خطا، فقط لودینگ را false می‌کنیم تا مودال باز بماند و کاربر بتواند خطا را اصلاح کند
      set({ isLoading: false, error: 'خطا در افزودن آدرس' });
      console.error(e);
      throw e;
    }
  },

  updateAddress: async (data: AddressFormData) => {
    set({ isLoading: true, error: null });
    try {
      const payload: UpdateAddressPayload = {
        id: data.id!,
        title: data.title,
        address: data.fullAddress,
        postalCode: data.postalCode,
        latitude: data.location.lat,
        longitude: data.location.lng,
        city: data.city,
        plaque: Number(data.plaque),
        unit: data.unit ? Number(data.unit) : undefined,
        floor: data.floor ? Number(data.floor) : undefined,
        isDefault: data.isDefault,
      };
      await addressService.updateAddress(payload);
      await get().fetchAddresses();
    } catch (e) {
      set({ isLoading: false, error: 'خطا در ویرایش آدرس' });
      console.error(e);
      throw e;
    }
  },

  deleteAddress: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await addressService.deleteAddress(id);
      await get().fetchAddresses();
    } catch (e) {
      set({ isLoading: false, error: 'خطا در حذف آدرس' });
      console.error(e);
    }
  },
}));