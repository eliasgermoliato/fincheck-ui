import { createContext, useCallback, useMemo, useState } from "react";
import usePersistedState from "../hooks/usePersistedState";
import { localStorageKeys } from "../config/localStorageKeys";

interface AuthContextValue {
  signedIn: boolean;
  signin(accessToken: string): void;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [persistedAccessToken, setPersistedAccessToken] = usePersistedState(
    localStorageKeys.ACCESS_TOKEN.key,
    localStorageKeys.ACCESS_TOKEN.initialValue,
  );

  const [signedIn, setSignedIn] = useState<boolean>(() => {
    return !!persistedAccessToken;
  });

  const signin = useCallback(
    (accessToken: string) => {
      setPersistedAccessToken(accessToken);
      setSignedIn(true);
    },
    [setPersistedAccessToken],
  );

  const authValue = useMemo(() => ({ signedIn, signin }), [signedIn, signin]);

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}
