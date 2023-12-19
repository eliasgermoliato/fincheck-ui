import { httpClient } from "../../utils/httpClient";

export async function remove(transactionId: string) {
  const { data } = await httpClient.delete(`/transactions/${transactionId}`);

  return data;
}
