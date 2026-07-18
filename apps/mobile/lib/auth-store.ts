import { create } from 'zustand';

type UserRole = 'owner' | 'manager' | 'front_desk' | 'technician' | 'customer';

type ShopContext = {
  shopId: string;
  shopName: string;
  role: UserRole;
};

type AuthState = {
  userId: string | null;
  isAuthenticated: boolean;
  activeShop: ShopContext | null;
  shops: ShopContext[];
  setAuth: (userId: string, shops: ShopContext[]) => void;
  setActiveShop: (shop: ShopContext) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  userId: null,
  isAuthenticated: false,
  activeShop: null,
  shops: [],
  setAuth: (userId, shops) =>
    set({
      userId,
      isAuthenticated: true,
      shops,
      activeShop: shops.length > 0 ? shops[0] : null,
    }),
  setActiveShop: (shop) => set({ activeShop: shop }),
  clearAuth: () =>
    set({
      userId: null,
      isAuthenticated: false,
      activeShop: null,
      shops: [],
    }),
}));
