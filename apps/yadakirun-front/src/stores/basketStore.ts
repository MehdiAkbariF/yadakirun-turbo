import { create } from 'zustand';
import { basketService } from '@monorepo/api-client/src/services/basketService';
// ✅ ایمپورت تایپ‌های دقیق از فایل تایپ‌ها
import type { BasketItem, UpdateBasketPayload, BasketResponse } from '@monorepo/api-client/src/types/basket.types';

/**
 * تابعی کمکی برای محاسبه مجموع تعداد کالاها در سبد
 */
const calculateTotalQuantity = (items: BasketItem[]): number => {
  return items.reduce((total, item) => total + item.quantity, 0);
};

/**
 * اینترفیس وضعیت (State) و اکشن‌های مربوط به سبد خرید
 */
interface BasketState {
  // --- State Properties ---
  items: BasketItem[];
  totalFinalPrice: number;
  totalOriginalPrice: number;
  totalQuantity: number;
  isLoading: boolean;
  error: string | null;

  // --- Actions ---
  fetchBasket: () => Promise<void>;
  addItem: (payload: UpdateBasketPayload) => Promise<void>;
  removeItem: (payload: UpdateBasketPayload) => Promise<void>;
  updateItemQuantity: (productId: number, newQuantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useBasketStore = create<BasketState>((set, get) => ({
  // --- Initial State ---
  items: [],
  totalFinalPrice: 0,
  totalOriginalPrice: 0,
  totalQuantity: 0,
  isLoading: true,
  error: null,

  // --- Actions Implementation ---

  fetchBasket: async () => {
    set({ isLoading: true, error: null });
    try {
      // ✅ دریافت داده‌ها با تایپ دقیق BasketResponse
      const data: BasketResponse = await basketService.getBasket();

      // ✅ تبدیل ساختار داده تو در توی API به یک ساختار تخت و تمیز برای استفاده در فرانت‌اند
      const mappedItems: BasketItem[] = data.basketItems.map(apiItem => {
        // ایمن‌سازی در برابر تقسیم بر صفر
        const unitPrice = apiItem.quantity > 0 ? apiItem.finalPrice / apiItem.quantity : 0;
        
        return {
          productId: apiItem.product.productNumber,
          productName: apiItem.product.title,
          // API آدرس نسبی می‌دهد، ما آن را با دامنه اصلی کامل می‌کنیم
          productImage: `https://api-yadakirun.yadakchi.com${apiItem.product.imageUrl}`,
          quantity: apiItem.quantity,
          unitPrice: unitPrice,
          totalPrice: apiItem.finalPrice,
          originalPrice: apiItem.originalPrice,
        };
      });

      set({
        items: mappedItems,
        totalFinalPrice: data.totalFinalPrice,
        totalOriginalPrice: data.totalOriginalPrice,
        totalQuantity: calculateTotalQuantity(mappedItems),
        isLoading: false,
      });
    } catch (e) {
      const errorMessage = 'خطا در دریافت اطلاعات سبد خرید';
      set({ error: errorMessage, isLoading: false, items: [], totalQuantity: 0 });
      console.error(errorMessage, e);
    }
  },

  addItem: async (payload) => {
    const existingItem = get().items.find(item => item.productId === payload.productId);

    if (existingItem) {
      const newQuantity = existingItem.quantity + payload.quantity;
      await get().updateItemQuantity(payload.productId, newQuantity);
      return;
    }

    set({ isLoading: true, error: null });
    try {
      await basketService.addToBasket(payload);
      await get().fetchBasket();
    } catch (e) {
      const errorMessage = 'خطا در افزودن محصول به سبد';
      set({ error: errorMessage, isLoading: false });
      console.error(errorMessage, e);
    }
  },

  updateItemQuantity: async (productId, newQuantity) => {
    const currentItem = get().items.find(item => item.productId === productId);
    if (!currentItem || newQuantity < 0) return;

    if (newQuantity === 0) {
      await get().removeItem({ productId, quantity: currentItem.quantity });
      return;
    }

    const difference = newQuantity - currentItem.quantity;
    if (difference === 0) return;

    set({ isLoading: true, error: null });
    try {
      if (difference > 0) {
        await basketService.addToBasket({ productId, quantity: difference });
      } else {
        await basketService.removeFromBasket({ productId, quantity: -difference });
      }
      await get().fetchBasket();
    } catch (e) {
      const errorMessage = 'خطا در به‌روزرسانی تعداد محصول';
      set({ error: errorMessage, isLoading: false });
      console.error(errorMessage, e);
    }
  },

  removeItem: async (payload) => {
    set({ isLoading: true, error: null });
    try {
      await basketService.removeFromBasket(payload);
      await get().fetchBasket();
    } catch (e) {
      const errorMessage = 'خطا در حذف محصول از سبد';
      set({ error: errorMessage, isLoading: false });
      console.error(errorMessage, e);
    }
  },

  clearCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const removalPromises = get().items.map(item =>
        basketService.removeFromBasket({ productId: item.productId, quantity: item.quantity })
      );
      await Promise.all(removalPromises);
      await get().fetchBasket();
    } catch (e) {
      const errorMessage = 'خطا در خالی کردن سبد خرید';
      set({ error: errorMessage, isLoading: false });
      console.error(errorMessage, e);
    }
  },
}));