import { createContext, useCallback, useMemo, useState } from "react";
import usePersistedState from "../../../../../app/hooks/usePersistedState";
import { localStorageKeys } from "../../../../../app/config/localStorageKeys";

interface HomeContextValue {
  areValuesVisible: boolean;
  toggleValueVisibility(): void;
  isNewAccountModalOpen: boolean;
  openNewAccountModalOpen(): void;
  closeNewAccountModalOpen(): void;
}

export const HomeContext = createContext({} as HomeContextValue);

export function HomeProvider({ children }: { children: React.ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = usePersistedState(
    localStorageKeys.ARE_VALUES_VISIBLE.key,
    localStorageKeys.ARE_VALUES_VISIBLE.initialValue,
  );
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(true);

  const toggleValueVisibility = useCallback(() => {
    setAreValuesVisible((prevState) => !prevState);
  }, [setAreValuesVisible]);

  const openNewAccountModalOpen = useCallback(() => {
    setIsNewAccountModalOpen(true);
  }, [setIsNewAccountModalOpen]);

  const closeNewAccountModalOpen = useCallback(() => {
    setIsNewAccountModalOpen(false);
  }, [setIsNewAccountModalOpen]);

  const homeContextValue = useMemo(
    () => ({
      areValuesVisible,
      toggleValueVisibility,
      isNewAccountModalOpen,
      openNewAccountModalOpen,
      closeNewAccountModalOpen,
    }),
    [
      areValuesVisible,
      toggleValueVisibility,
      isNewAccountModalOpen,
      openNewAccountModalOpen,
      closeNewAccountModalOpen,
    ],
  );

  return (
    <HomeContext.Provider value={homeContextValue}>
      {children}
    </HomeContext.Provider>
  );
}
