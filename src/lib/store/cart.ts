import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/types/product";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  open: () => void;
  close: () => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (product) => {
        const existing = get().items.find((i) => i.product.id === product.id);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({ items: [...get().items, { product, quantity: 1 }] });
        }
        set({ isOpen: true });
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i.product.id !== productId) });
      },
      setQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        });
      },
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      clear: () => set({ items: [] }),
    }),
    { name: "lux-calyra-cart", skipHydration: true }
  )
);

export function useCartTotals() {
  const items = useCartStore((s) => s.items);
  const subtotal = items.reduce(
    (sum, i) => sum + (i.product.salePrice ?? i.product.price) * i.quantity,
    0
  );
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  return { subtotal, itemCount };
}
