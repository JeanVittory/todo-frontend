import { create } from "zustand";
import type { AuthState, User } from "../types/store";
import axios from "axios";
import { API_V1, BASE_URL, VERIFY_ENDPOINT } from "../constants";

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  setUser: (user: User) => set({ user }),
  clearUser: () => set({ user: null }),
  getCurrentUser: () => get().user,
  isUserVerified: false,
  verifyAuth: async () => {
    set({});
    try {
      const response = await axios.get(
        `${BASE_URL}${API_V1}${VERIFY_ENDPOINT}`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        set({
          user: {
            name: response.data.name,
            email: response.data.email,
          },
          isLoading: false,
          isUserVerified: true,
        });
      } else {
        set({ user: null, isLoading: false, isUserVerified: false });
      }
    } catch (error) {
      set({ user: null, isLoading: false, isUserVerified: false });
    }
  },
}));
