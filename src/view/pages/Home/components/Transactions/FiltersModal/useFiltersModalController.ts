import { useState } from "react";
import useBankAccountsQuery from "../../../../../../app/hooks/useFetches/useBankAccountsQuery";

export function useFiltersModal() {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<
    undefined | string
  >(undefined);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const { data: accounts = [] } = useBankAccountsQuery();

  function handleSelectBankAccount(bankAccountId: string) {
    setSelectedBankAccountId((prevState) =>
      prevState === bankAccountId ? undefined : bankAccountId,
    );
  }

  function handleChangeYear(step: number) {
    setSelectedYear((prevState) => prevState + step);
  }

  return {
    selectedBankAccountId,
    selectedYear,
    accounts,
    handleSelectBankAccount,
    handleChangeYear,
  };
}
