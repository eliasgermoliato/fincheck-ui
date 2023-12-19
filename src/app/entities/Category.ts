import { TransactionType } from "./Transaction";

export type Category = {
  id: string;
  name: string;
  icon: string;
  type: TransactionType;
};

export interface CategoriesResponse extends Array<Category> {}
