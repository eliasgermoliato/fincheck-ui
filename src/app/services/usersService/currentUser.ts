import { CurrentUserResponse } from "../../entities/CurrentUser";
import { httpClient } from "../../utils/httpClient";

export async function currentUser() {
  const { data } =
    await httpClient.get<CurrentUserResponse>("/users/currentUser");

  return data;
}
