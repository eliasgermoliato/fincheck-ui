import { useEffect, useState } from "react";
import { useHome } from "../HomeContext/useHome";
import useTransactionsQuery from "../../../../../app/hooks/useFetches/useTransactionsQuery";
import { TransactionFilters } from "../../../../../app/entities/Transaction";

export function useTransactionsController() {
  const { areValuesVisible } = useHome();

  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);

  const [filters, setFilters] = useState<TransactionFilters>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const {
    data: transactions = [],
    isInitialLoading,
    isFetching: isLoading,
    refetch,
  } = useTransactionsQuery(filters);

  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  function handleChangeFilters<TFilter extends keyof TransactionFilters>(
    filter: TFilter,
  ) {
    return (value: TransactionFilters[TFilter]) => {
      if (value === filters[filter]) return;

      setFilters((prevState) => ({
        ...prevState,
        [filter]: value,
      }));
    };
  }

  function handleOpenFiltersModal() {
    setIsFiltersModalOpen(true);
  }

  function handleCloseFiltersModal() {
    setIsFiltersModalOpen(false);
  }

  function handleApplyFilters({
    bankAccountId,
    year,
  }: {
    bankAccountId: string | undefined;
    year: number;
  }) {
    handleChangeFilters("bankAccountId")(bankAccountId);
    handleChangeFilters("year")(year);
    setIsFiltersModalOpen(false);
  }

  return {
    filters,
    areValuesVisible,
    isInitialLoading,
    isLoading,
    transactions,
    isFiltersModalOpen,
    handleChangeFilters,
    handleOpenFiltersModal,
    handleCloseFiltersModal,
    handleApplyFilters,
  };
}
