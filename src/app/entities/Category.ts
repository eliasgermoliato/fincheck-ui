export type Category = {
  id: string;
  name: string;
  icon: string;
  type: "INCOME" | "EXPENSE";
};

export interface CategoriesResponse extends Array<Category> {}
