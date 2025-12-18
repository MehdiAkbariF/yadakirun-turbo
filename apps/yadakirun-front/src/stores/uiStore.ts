import { create } from 'zustand';

interface UIState {
  isCartDrawerOpen: boolean;
  toggleCartDrawer: () => void;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  // ✅ اکشن جدید
  openCartDrawerOnDesktop: (isDesktop: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isCartDrawerOpen: false,
  toggleCartDrawer: () => set((state) => ({ isCartDrawerOpen: !state.isCartDrawerOpen })),
  openCartDrawer: () => set({ isCartDrawerOpen: true }),
  closeCartDrawer: () => set({ isCartDrawerOpen: false }),

  // ✅ پیاده‌سازی اکشن جدید
  openCartDrawerOnDesktop: (isDesktop) => {
    if (isDesktop) {
      set({ isCartDrawerOpen: true });
    }
    // اگر isDesktop برابر false باشد، هیچ کاری انجام نمی‌دهد
  },
}));