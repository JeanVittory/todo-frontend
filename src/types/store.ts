export type User = {
  email: string;
  name: string;
};

export type AuthState = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  getCurrentUser: () => User | null;
};
