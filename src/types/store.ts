export type User = {
  email: string;
  name: string;
};

export type AuthState = {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  getCurrentUser: () => User | null;
  verifyAuth: () => void;
};
