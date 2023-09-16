import { CreateBankAccountParams } from "../../entities/BankAccount";
import { httpClient } from "../../utils/httpClient";

export async function create(body: CreateBankAccountParams) {
  const { data } = await httpClient.post("/bank-accounts", body);

  return data;
}
