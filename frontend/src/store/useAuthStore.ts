import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id?: number;
  name: string;
  email: string;
  role: string;
  token?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: (userData: User, token: string) => {
        localStorage.setItem('user', JSON.stringify({ ...userData, token }));
        set({ user: userData, token });
      },

      logout: () => {
        localStorage.removeItem('user');
        set({ user: null, token: null });
      },
    }),
    {
      name: 'delivery-auth-storage',
    }
  )
);
