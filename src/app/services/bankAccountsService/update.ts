import { UpdateBankAccountParams } from "../../entities/BankAccount";
import { httpClient } from "../../utils/httpClient";

export async function update({ id, ...params }: UpdateBankAccountParams) {
  const { data } = await httpClient.put(`/bank-accounts/${id}`, params);

  return data;
}
