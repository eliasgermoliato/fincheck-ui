import { CategoriesResponse } from "../../entities/Category";
import { httpClient } from "../../utils/httpClient";

export async function getAll() {
  const { data } = await httpClient.get<CategoriesResponse>("/categories");

  return data;
}
