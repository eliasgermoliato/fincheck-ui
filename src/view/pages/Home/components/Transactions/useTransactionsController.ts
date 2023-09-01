import { useHome } from "../HomeContext/useHome";

export function useTransactionsController() {
  const { areValuesVisible } = useHome();

  return {
    areValuesVisible,
    isLoading: false,
    transactions: [],
  };
}
