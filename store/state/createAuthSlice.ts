import { StateCreator } from 'zustand';

export type AuthState = {
  user: string | null;
  setUser: (user: string | null) => void;
  logout: () => void;
};

export const createAuthSlice: StateCreator<AuthState> = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null })
});
