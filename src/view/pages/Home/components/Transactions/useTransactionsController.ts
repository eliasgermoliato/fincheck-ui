import { useState } from "react";
import { useHome } from "../HomeContext/useHome";
import useTransactionsQuery from "../../../../../app/hooks/useFetches/useTransactionsQuery";

export function useTransactionsController() {
  const { areValuesVisible } = useHome();

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  const {
    data: transactions = [],
    isInitialLoading,
    isFetching: isLoading,
  } = useTransactionsQuery();

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  return {
    areValuesVisible,
    isInitialLoading,
    isLoading,
    transactions,
    isFiltersModalOpen,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
  };
}
