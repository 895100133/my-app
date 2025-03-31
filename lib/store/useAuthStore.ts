import { create } from 'zustand'

interface User {
  id: string
  name: string
  company: string
  avatar?: string
}

interface AuthState {
  isLoggedIn: boolean
  user: User | null
  token: string | null
  // 操作方法
  login: (token: string, user: User) => void
  logout: () => void
  updateUser: (user: Partial<User>) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  token: null,

  login: (token, user) => set({ isLoggedIn: true, token, user }),

  logout: () => set({ isLoggedIn: false, token: null, user: null }),

  updateUser: (userUpdate) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...userUpdate } : null,
    })),
}))
