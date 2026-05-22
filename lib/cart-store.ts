import { create } from "zustand";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
};

// ============================================
// غيّر الوقت ده لما تبدأ العرض
// ============================================
export const SALE_START_TIME = new Date("2026-05-23T00:00:00");
export const SALE_END_TIME = new Date("2026-05-23T12:00:00");
export function getDiscount(itemCount: number): {
  rate: number;
  label: string | null;
  isFlash: boolean;
} {
  const now = new Date();
  const isFlash = now >= SALE_START_TIME && now <= SALE_END_TIME;
  if (isFlash && itemCount >= 2) {
    return { rate: 0.35, label: "Flash Sale 🔥 — 35% Off", isFlash: true };
  }
  if (itemCount >= 3) {
    return { rate: 0.25, label: "Buy 3+ — 25% Off", isFlash: false };
  }
  if (itemCount === 2) {
    return { rate: 0.15, label: "Buy 2 — 15% Off", isFlash: false };
  }
  return { rate: 0, label: null, isFlash: false };
}

type CartStore = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  itemCount: () => number;
  total: () => number;
  discountedTotal: () => { subtotal: number; discountAmount: number; total: number; discount: ReturnType<typeof getDiscount> };
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (item) => {
    const existingItem = get().items.find(
      (i) => i.id === item.id && i.size === item.size
    );
    if (existingItem) {
      set({
        items: get().items.map((i) =>
          i.id === item.id && i.size === item.size
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        ),
      });
    } else {
      set({ items: [...get().items, item] });
    }
  },

  removeItem: (id, size) => {
    set({
      items: get().items.filter((i) => !(i.id === id && i.size === size)),
    });
  },

  updateQuantity: (productId, size, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId, size);
      return;
    }
    set({
      items: get().items.map((item) =>
        item.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      ),
    });
  },

  itemCount: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  total: () => {
    return get().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },

  // ← الدالة الجديدة اللي بتحسب الخصم
  discountedTotal: () => {
    const items = get().items;
    const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const discount = getDiscount(itemCount);
    const discountAmount = subtotal * discount.rate;
    return {
      subtotal,
      discountAmount,
      total: subtotal - discountAmount,
      discount,
    };
  },

  clearCart: () => set({ items: [] }),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
}));