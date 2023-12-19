import { UpdateTransactionParams } from "../../entities/Transaction";
import { httpClient } from "../../utils/httpClient";

export async function update({ id, ...params }: UpdateTransactionParams) {
  const { data } = await httpClient.put(`/transactions/${id}`, params);

  return data;
}
