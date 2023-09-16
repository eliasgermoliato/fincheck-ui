import { BankAccountsResponse } from "../../../interfaces/BankAccount";
import { httpClient } from "../../utils/httpClient";

export async function getAll() {
  const { data } = await httpClient.get<BankAccountsResponse>("/bank-accounts");

  return data;
}
