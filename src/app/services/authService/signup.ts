import { SignupData, SignupResponse } from "../../entities/Signup";
import { httpClient } from "../../utils/httpClient";

export async function signup(body: SignupData) {
  const { data } = await httpClient.post<SignupResponse>("/auth/signup", body);

  return data;
}
