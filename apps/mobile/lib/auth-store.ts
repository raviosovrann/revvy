import { Session } from '@supabase/supabase-js';
import { create } from 'zustand';
import { apiClient } from './api-client';
import { supabase } from './supabase';

export type UserRole =
  'OWNER' | 'MANAGER' | 'FRONT_DESK' | 'TECHNICIAN' | 'CUSTOMER';

export type ShopContext = {
  shopId: string;
  shopName: string;
  role: UserRole;
  status?: string;
};

type AuthState = {
  session: Session | null;
  userId: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  activeShop: ShopContext | null;
  shops: ShopContext[];
  initialize: () => Promise<() => void>;
  refreshShops: () => Promise<ShopContext[]>;
  setActiveShop: (shop: ShopContext) => void;
  clearAuth: () => Promise<void>;
};

async function applySession(session: Session | null) {
  apiClient.setToken(session?.access_token || null);
  useAuthStore.setState({
    session,
    userId: session?.user.id || null,
    isAuthenticated: Boolean(session),
    ...(session ? {} : { shops: [], activeShop: null }),
  });
}

export const useAuthStore = create<AuthState>((set, get) => ({
  session: null,
  userId: null,
  isAuthenticated: false,
  isInitialized: false,
  activeShop: null,
  shops: [],

  initialize: async () => {
    const { data } = await supabase.auth.getSession();
    await applySession(data.session);
    if (data.session) {
      await get()
        .refreshShops()
        .catch(() => set({ shops: [], activeShop: null }));
    }
    set({ isInitialized: true });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        void applySession(session).then(() => {
          if (session) {
            void get()
              .refreshShops()
              .catch(() => set({ shops: [], activeShop: null }));
          }
        });
      },
    );
    return () => listener.subscription.unsubscribe();
  },

  refreshShops: async () => {
    const session =
      get().session || (await supabase.auth.getSession()).data.session;
    if (!session) return [];
    await applySession(session);
    const response = await apiClient.get<{ shops: ShopContext[] }>('/me/shops');
    const currentShopId = get().activeShop?.shopId;
    const activeShop =
      response.shops.find((shop) => shop.shopId === currentShopId) ||
      response.shops[0] ||
      null;
    set({ shops: response.shops, activeShop });
    return response.shops;
  },

  setActiveShop: (shop) => set({ activeShop: shop }),

  clearAuth: async () => {
    await supabase.auth.signOut();
    apiClient.setToken(null);
    set({
      session: null,
      userId: null,
      isAuthenticated: false,
      activeShop: null,
      shops: [],
    });
  },
}));
