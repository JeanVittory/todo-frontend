import { create } from "zustand";
import type { AuthState, User } from "../types/store";

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  setUser: (user: User) => set({ user }),
  clearUser: () => set({ user: null }),
  getCurrentUser: () => get().user,
}));
