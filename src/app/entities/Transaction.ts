import { Category } from "./Category";

export enum TransactionType {
  EXPENSE = "EXPENSE",
  INCOME = "INCOME",
}

export type Transaction = {
  id: string;
  name: string;
  categoryId: string;
  bankAccountId: string;
  value: number;
  date: string;
  type: TransactionType;
  category?: Omit<Category, "type">;
};

export type TransactionFilters = {
  month: number;
  year: number;
  bankAccountId?: string;
  type?: TransactionType;
};

export interface CreateTransactionParams extends Omit<Transaction, "id"> {}

export interface UpdateTransactionParams extends Transaction {}

export interface TransactionsResponse extends Array<Transaction> {}
