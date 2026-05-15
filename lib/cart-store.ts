import { create } from "zustand";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];

  addItem: (item: CartItem) => void;

removeItem: (id: string, size: string) => void;
  updateQuantity: (
    id: string,
    size: string,
    quantity: number

  ) => void;

  itemCount: () => number;

  total: () => number;

  isOpen: boolean;

  openCart: () => void;

  closeCart: () => void;
};

export const useCartStore =
  create<CartStore>((set, get) => ({

    items: [],

    isOpen: false,

    addItem: (item) => {

      const existingItem =
        get().items.find(
          (i) =>
            i.id === item.id &&
            i.size === item.size
        );

      if (existingItem) {

        set({
          items: get().items.map((i) =>
            i.id === item.id &&
            i.size === item.size
              ? {
                  ...i,
                  quantity:
                    i.quantity + item.quantity,
                }
              : i
          ),
        });

      } else {

        set({
          items: [...get().items, item],
        });

      }
    },
removeItem: (id, size) => {
  set({
    items: get().items.filter(
      (i) =>
        !(
          i.id === id &&
          i.size === size
        )
    ),
  });
},

    updateQuantity: (
      productId,
      size,
      quantity
    ) => {

      set({
        items: get().items.map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity,
              }
            : item
        ),
      });

    },

    itemCount: () => {

      return get().items.reduce(
        (total, item) =>
          total + item.quantity,
        0
      );

    },

    total: () => {

   return get().items.reduce(
  (total, item) =>
    total + item.price * item.quantity,
  0
);

    },

    openCart: () =>
      set({ isOpen: true }),

    closeCart: () =>
      set({ isOpen: false }),

  }));  