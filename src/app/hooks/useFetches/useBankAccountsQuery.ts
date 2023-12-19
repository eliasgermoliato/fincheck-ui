import { useQuery } from "@tanstack/react-query";
import { bankAccountsService } from "../../services/bankAccountsService";

export default function useBankAccountsQuery() {
  const query = useQuery({
    queryKey: ["bankAccounts"],
    queryFn: bankAccountsService.getAll,
    staleTime: Infinity,
  });

  return { ...query };
}
