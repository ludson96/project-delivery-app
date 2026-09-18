import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  urlImage?: string;
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalPrice: 0,

      addItem: (product, quantity = 1) => {
        const { items } = get();
        const existingIndex = items.findIndex((item) => item.id === product.id);

        let newItems = [...items];
        if (existingIndex >= 0) {
          newItems[existingIndex] = {
            ...newItems[existingIndex],
            quantity: newItems[existingIndex].quantity + quantity,
          };
        } else {
          newItems.push({
            ...product,
            price: Number(product.price),
            quantity,
          });
        }

        const totalPrice = newItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
        set({ items: newItems, totalPrice: Number(totalPrice.toFixed(2)) });
      },

      removeItem: (id: number) => {
        const { items } = get();
        const newItems = items.filter((item) => item.id !== id);
        const totalPrice = newItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
        set({ items: newItems, totalPrice: Number(totalPrice.toFixed(2)) });
      },

      updateQuantity: (id: number, quantity: number) => {
        const { items } = get();
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }

        const newItems = items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );

        const totalPrice = newItems.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
        set({ items: newItems, totalPrice: Number(totalPrice.toFixed(2)) });
      },

      clearCart: () => {
        set({ items: [], totalPrice: 0 });
      },
    }),
    {
      name: 'delivery-cart-storage',
    }
  )
);
