import { useMemo, useState } from "react";
import { useScreenSize } from "../../../../../app/hooks/useScreenSize";
import { useHome } from "../HomeContext/useHome";
import useBankAccountsQuery from "../../../../../app/hooks/useFetches/useBankAccountsQuery";

export function useAccountsController() {
  const { areValuesVisible, toggleValueVisibility, openNewAccountModalOpen } =
    useHome();
  const screenSize = useScreenSize();

  const [sliderState, setSliderState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const { data = [], isFetching } = useBankAccountsQuery();

  const currentBalance = useMemo(() => {
    if (!data) return 0;

    return data.reduce((total, account) => total + account.currentBalance, 0);
  }, [data]);

  return {
    areValuesVisible,
    screenSize,
    sliderState,
    accounts: data,
    isLoading: isFetching,
    currentBalance,
    toggleValueVisibility,
    setSliderState,
    openNewAccountModalOpen,
  };
}
