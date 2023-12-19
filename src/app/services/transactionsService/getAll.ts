import {
  TransactionFilters,
  TransactionsResponse,
} from "../../entities/Transaction";
import { httpClient } from "../../utils/httpClient";

export async function getAll(filters: TransactionFilters) {
  const { data } = await httpClient.get<TransactionsResponse>("/transactions", {
    params: filters,
  });

  return data;
}
