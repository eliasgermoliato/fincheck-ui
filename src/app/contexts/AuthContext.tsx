import { createContext, useCallback, useMemo, useState } from "react";
import usePersistedState from "../hooks/usePersistedState";
import { localStorageKeys } from "../config/localStorageKeys";
import useCurrentUserQuery from "../hooks/useFetches/useCurrentUserQuery";

interface AuthContextValue {
  signedIn: boolean;
  signin(accessToken: string): void;
  signout(): void;
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
    [setPersistedAccessToken, setSignedIn],
  );

  const signout = useCallback(() => {
    setPersistedAccessToken("");
    setSignedIn(false);
  }, [setPersistedAccessToken, setSignedIn]);

  const authValue = useMemo(
    () => ({ signedIn, signin, signout }),
    [signedIn, signin, signout],
  );

  const { isSuccess } = useCurrentUserQuery(signedIn);

  console.log({ isSuccess });

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}
