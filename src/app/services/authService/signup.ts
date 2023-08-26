import { SignupData, SignupResponse } from "../../../interfaces/Signup";
import { httpClient } from "../../utils/httpClient";
import { sleep } from "../../utils/sleep";

export async function signup(body: SignupData) {
  await sleep(1500);
  const { data } = await httpClient.post<SignupResponse>("/auth/signup", body);

  return data;
}
