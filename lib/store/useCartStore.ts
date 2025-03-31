import { create } from 'zustand'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  expiry?: string
  manufacturer?: string
}

interface CartState {
  items: CartItem[]
  // 操作方法
  addItem: (item: CartItem) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  // 计算属性
  totalAmount: number
  totalItems: number
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id)
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + (item.quantity || 1) }
              : i
          ),
        }
      }
      return { items: [...state.items, item] }
    }),

  removeItem: (itemId) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== itemId),
    })),

  updateQuantity: (itemId, quantity) =>
    set((state) => ({
      items: state.items.map((i) => (i.id === itemId ? { ...i, quantity } : i)),
    })),

  clearCart: () => set({ items: [] }),

  get totalAmount() {
    return get().items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
  },

  get totalItems() {
    return get().items.reduce((sum, item) => sum + item.quantity, 0)
  },
}))
