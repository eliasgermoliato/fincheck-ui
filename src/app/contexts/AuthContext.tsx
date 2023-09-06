import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import usePersistedState from "../hooks/usePersistedState";
import { localStorageKeys } from "../config/localStorageKeys";
import useCurrentUserQuery from "../hooks/useFetches/useCurrentUserQuery";
import { toast } from "react-hot-toast";
import { LaunchScreen } from "../../view/components/LaunchScreen";

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

  const { isError, isFetching, isSuccess, remove } = useCurrentUserQuery({
    enabled: signedIn,
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
    remove();
  }, [setPersistedAccessToken, setSignedIn, remove]);

  const authContextValue = useMemo(
    () => ({ signedIn: isSuccess && signedIn, signin, signout }),
    [isSuccess, signedIn, signin, signout],
  );

  useEffect(() => {
    if (isError) {
      toast.error("Sua sessão expirou!");
      signout();
    }
  }, [isError, signout]);

  return (
    <AuthContext.Provider value={authContextValue}>
      <LaunchScreen isLoading={isFetching} />

      {!isFetching && children}
    </AuthContext.Provider>
  );
}
