import { create } from "zustand";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (productId: string) => void;
  clear: () => void;
}

export const useCart = create<CartState>((set) => ({
  items: [],

  add: (item) =>
  set((state) => {
    console.log("ADDING TO CART:", item);
    console.log("CURRENT ITEMS:", state.items);

    const exists = state.items.find((x) => x.productId === item.productId);
    if (exists) {
      return {
        items: state.items.map((x) =>
          x.productId === item.productId
            ? { ...x, quantity: x.quantity + item.quantity }
            : x
        ),
      };
    }
    return { items: [...state.items, item] };
  }),

  remove: (productId) =>
    set((state) => ({
      items: state.items.filter((x) => x.productId !== productId),
    })),

  clear: () => set({ items: [] }),
}));
