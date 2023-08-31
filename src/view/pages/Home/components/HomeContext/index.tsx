import { createContext, useCallback } from "react";
import usePersistedState from "../../../../../app/hooks/usePersistedState";
import { localStorageKeys } from "../../../../../app/config/localStorageKeys";

interface HomeContextValue {
  areValuesVisible: boolean;
  toggleValueVisibility(): void;
}

export const HomeContext = createContext({} as HomeContextValue);

export function HomeProvider({ children }: { children: React.ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = usePersistedState(
    localStorageKeys.ARE_VALUES_VISIBLE.key,
    localStorageKeys.ARE_VALUES_VISIBLE.initialValue,
  );

  const toggleValueVisibility = useCallback(() => {
    setAreValuesVisible((prevState) => !prevState);
  }, [setAreValuesVisible]);

  return (
    <HomeContext.Provider value={{ areValuesVisible, toggleValueVisibility }}>
      {children}
    </HomeContext.Provider>
  );
}
