import { createContext, useCallback, useMemo, useState } from "react";
import usePersistedState from "../../../../../app/hooks/usePersistedState";
import { localStorageKeys } from "../../../../../app/config/localStorageKeys";
import { TransactionType } from "../../../../../interfaces/TransactionType";

interface HomeContextValue {
  areValuesVisible: boolean;
  isNewAccountModalOpen: boolean;
  isNewTransactionModalOpen: boolean;
  newTransactionType: TransactionType | null;
  toggleValueVisibility(): void;
  openNewAccountModalOpen(): void;
  closeNewAccountModalOpen(): void;
  openNewTransactionModalOpen(type: TransactionType): void;
  closeNewTransactionModalOpen(): void;
}

export const HomeContext = createContext({} as HomeContextValue);

export function HomeProvider({ children }: { children: React.ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = usePersistedState(
    localStorageKeys.ARE_VALUES_VISIBLE.key,
    localStorageKeys.ARE_VALUES_VISIBLE.initialValue,
  );
  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(true);
  const [newTransactionType, setNewTransactionType] =
    useState<TransactionType | null>(null);

  const toggleValueVisibility = useCallback(() => {
    setAreValuesVisible((prevState) => !prevState);
  }, [setAreValuesVisible]);

  const openNewAccountModalOpen = useCallback(() => {
    setIsNewAccountModalOpen(true);
  }, [setIsNewAccountModalOpen]);

  const closeNewAccountModalOpen = useCallback(() => {
    setIsNewAccountModalOpen(false);
  }, [setIsNewAccountModalOpen]);

  const openNewTransactionModalOpen = useCallback(
    (type: TransactionType) => {
      setNewTransactionType(type);
      setIsNewTransactionModalOpen(true);
    },
    [setIsNewTransactionModalOpen],
  );

  const closeNewTransactionModalOpen = useCallback(() => {
    setNewTransactionType(null);
    setIsNewTransactionModalOpen(false);
  }, [setIsNewTransactionModalOpen]);

  const homeContextValue = useMemo(
    () => ({
      areValuesVisible,
      isNewAccountModalOpen,
      isNewTransactionModalOpen,
      newTransactionType,
      toggleValueVisibility,
      openNewAccountModalOpen,
      closeNewAccountModalOpen,
      openNewTransactionModalOpen,
      closeNewTransactionModalOpen,
    }),
    [
      areValuesVisible,
      isNewAccountModalOpen,
      isNewTransactionModalOpen,
      newTransactionType,
      toggleValueVisibility,
      openNewAccountModalOpen,
      closeNewAccountModalOpen,
      openNewTransactionModalOpen,
      closeNewTransactionModalOpen,
    ],
  );

  return (
    <HomeContext.Provider value={homeContextValue}>
      {children}
    </HomeContext.Provider>
  );
}
