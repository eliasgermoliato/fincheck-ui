import { createContext, useMemo } from "react";

interface AuthContextValue {
  signedIn: boolean;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const authValue = useMemo(() => ({ signedIn: true }), []);

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}
