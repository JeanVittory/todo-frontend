import { createContext, useContext, useState } from "react";
import type { AuthProviderProps } from "../types/providers";

type AuthContextType = {
  isSignedIn: boolean | undefined;
  signIn: () => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isSignedIn: false,
  signIn: () => {},
  signOut: () => {},
});

export default function AuthProvider({
  children,
  isSignedIn: initialAuthState,
}: AuthProviderProps) {
  const [isSignedIn, setIsSignedIn] = useState(initialAuthState);
  const signIn = () => setIsSignedIn(true);
  const signOut = () => setIsSignedIn(false);
  return (
    <AuthContext.Provider value={{ isSignedIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("UseAuth must be used within a AuthProvider");
  }
  return context;
};
