import { useHome } from "../../HomeContext/useHome";

export function useNewTransactionModalController() {
  const {
    isNewTransactionModalOpen,
    newTransactionType,
    closeNewTransactionModalOpen,
  } = useHome();

  return {
    isNewTransactionModalOpen,
    newTransactionType,
    closeNewTransactionModalOpen,
  };
}
