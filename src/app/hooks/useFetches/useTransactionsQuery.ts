import { useQuery } from "@tanstack/react-query";
import { transactionsService } from "../../services/transactionsService";
import { TransactionFilters } from "../../entities/Transaction";

export default function useTransactionsQuery(filters: TransactionFilters) {
  const query = useQuery({
    queryKey: ["transactions"],
    queryFn: () => transactionsService.getAll(filters),
  });

  return { ...query };
}
