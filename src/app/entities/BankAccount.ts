export enum BankAccountType {
  CHECKING = "CHECKING",
  INVESTMENT = "INVESTMENT",
  CASH = "CASH",
}

export type BankAccount = {
  id: string;
  name: string;
  initialBalance: number;
  type: BankAccountType;
  color: string;
  currentBalance: number;
};

export interface CreateBankAccountParams
  extends Omit<BankAccount, "id" | "currentBalance"> {}

export interface UpdateBankAccountParams
  extends Omit<BankAccount, "currentBalance"> {}

export interface BankAccountsResponse extends Array<BankAccount> {}
