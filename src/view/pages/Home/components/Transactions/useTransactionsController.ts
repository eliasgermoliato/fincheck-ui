import { useState } from "react";
import { useHome } from "../HomeContext/useHome";

export function useTransactionsController() {
  const { areValuesVisible } = useHome();

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(true);

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  return {
    areValuesVisible,
    isInitialLoading: false,
    isLoading: false,
    transactions: [0],
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
  };
}
