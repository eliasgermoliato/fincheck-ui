import { CreateTransactionParams } from "../../entities/Transaction";
import { httpClient } from "../../utils/httpClient";

export async function create(body: CreateTransactionParams) {
  const { data } = await httpClient.post("/transactions", body);

  return data;
}
