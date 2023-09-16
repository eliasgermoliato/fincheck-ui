export enum BankAccountType {
  CHECKING = "CHECKING",
  INVESTMENT = "INVESTMENT",
  CASH = "CASH",
}

export interface BankAccountParams {
  name: string;
  initialBalance: string;
  color: string;
  type: BankAccountType;
}

export interface BankAccountParamsFormatted
  extends Omit<BankAccountParams, "initialBalance"> {
  initialBalance: number;
}
