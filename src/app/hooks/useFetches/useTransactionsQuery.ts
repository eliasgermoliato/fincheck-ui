import { useQuery } from "@tanstack/react-query";
import { transactionsService } from "../../services/transactionsService";

export default function useTransactionsQuery() {
  const query = useQuery({
    queryKey: ["transactions"],
    queryFn: () =>
      transactionsService.getAll({
        month: 11,
        year: 2023,
      }),
  });

  return { ...query };
}
