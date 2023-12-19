import { createContext, useCallback, useMemo, useState } from "react";
import usePersistedState from "../../../../../app/hooks/usePersistedState";
import { localStorageKeys } from "../../../../../app/config/localStorageKeys";
import { TransactionType } from "../../../../../app/entities/Transaction";
import { BankAccount } from "../../../../../app/entities/BankAccount";

interface HomeContextValue {
  areValuesVisible: boolean;
  isNewAccountModalOpen: boolean;
  isNewTransactionModalOpen: boolean;
  newTransactionType: TransactionType | null;
  isEditAccountModalOpen: boolean;
  accountBeingEdit: null | BankAccount;
  toggleValueVisibility(): void;
  openNewAccountModalOpen(): void;
  closeNewAccountModalOpen(): void;
  openNewTransactionModalOpen(type: TransactionType): void;
  closeNewTransactionModalOpen(): void;
  openEditAccountModal(bankAccount: BankAccount): void;
  closeEditAccountModal(): void;
}

export const HomeContext = createContext({} as HomeContextValue);

export function HomeProvider({ children }: { children: React.ReactNode }) {
  const [areValuesVisible, setAreValuesVisible] = usePersistedState(
    localStorageKeys.ARE_VALUES_VISIBLE.key,
    localStorageKeys.ARE_VALUES_VISIBLE.initialValue,
  );

  const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);

  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
    useState(false);

  const [newTransactionType, setNewTransactionType] =
    useState<TransactionType | null>(null);

  const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
  const [accountBeingEdit, setAccountBeingEdit] = useState<null | BankAccount>(
    null,
  );

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
    [setNewTransactionType, setIsNewTransactionModalOpen],
  );

  const closeNewTransactionModalOpen = useCallback(() => {
    setNewTransactionType(null);
    setIsNewTransactionModalOpen(false);
  }, [setNewTransactionType, setIsNewTransactionModalOpen]);

  const openEditAccountModal = useCallback(
    (bankAccount: BankAccount) => {
      setAccountBeingEdit(bankAccount);
      setIsEditAccountModalOpen(true);
    },
    [setAccountBeingEdit, setIsEditAccountModalOpen],
  );

  const closeEditAccountModal = useCallback(() => {
    setAccountBeingEdit(null);
    setIsEditAccountModalOpen(false);
  }, [setAccountBeingEdit, setIsEditAccountModalOpen]);

  const homeContextValue = useMemo(
    () => ({
      areValuesVisible,
      isNewAccountModalOpen,
      isNewTransactionModalOpen,
      newTransactionType,
      isEditAccountModalOpen,
      accountBeingEdit,
      toggleValueVisibility,
      openNewAccountModalOpen,
      closeNewAccountModalOpen,
      openNewTransactionModalOpen,
      closeNewTransactionModalOpen,
      openEditAccountModal,
      closeEditAccountModal,
    }),
    [
      areValuesVisible,
      isNewAccountModalOpen,
      isNewTransactionModalOpen,
      newTransactionType,
      isEditAccountModalOpen,
      accountBeingEdit,
      toggleValueVisibility,
      openNewAccountModalOpen,
      closeNewAccountModalOpen,
      openNewTransactionModalOpen,
      closeNewTransactionModalOpen,
      openEditAccountModal,
      closeEditAccountModal,
    ],
  );

  return (
    <HomeContext.Provider value={homeContextValue}>
      {children}
    </HomeContext.Provider>
  );
}
