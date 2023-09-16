import { BankAccountParamsFormatted } from "../../../interfaces/BankAccount";
import { httpClient } from "../../utils/httpClient";

export async function create(body: BankAccountParamsFormatted) {
  const { data } = await httpClient.post("/bank-accounts", body);

  return data;
}
